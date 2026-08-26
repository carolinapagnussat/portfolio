import AVFoundation
import Foundation

// Usage: swift compress-video.swift <input> <output> [maxWidth=1920] [bitrateMbps=2.5]
// Re-encodes to H.264, strips audio (silent), downscales so displayed width <= maxWidth,
// with an EXPLICIT average bitrate (AVAssetExportSession presets can't do this).
let args = CommandLine.arguments
guard args.count >= 3 else {
    print("usage: swift compress-video.swift <input> <output> [maxWidth=1920] [bitrateMbps=2.5]")
    exit(2)
}
let inputPath = args[1]
let outputPath = args[2]
let targetWidth: CGFloat = args.count > 3 ? CGFloat(Double(args[3]) ?? 1920) : 1920
let targetBitrate = Int((args.count > 4 ? (Double(args[4]) ?? 2.5) : 2.5) * 1_000_000)

let inURL = URL(fileURLWithPath: inputPath)
let outURL = URL(fileURLWithPath: outputPath)
try? FileManager.default.removeItem(at: outURL)

let asset = AVURLAsset(url: inURL)
let sema = DispatchSemaphore(value: 0)

Task {
    do {
        guard let vTrack = try await asset.loadTracks(withMediaType: .video).first else {
            print("no video track"); exit(1)
        }
        let naturalSize = try await vTrack.load(.naturalSize)
        let transform = try await vTrack.load(.preferredTransform)
        let displayed = naturalSize.applying(transform)
        let dispW = abs(displayed.width), dispH = abs(displayed.height)
        let scale = min(1.0, targetWidth / dispW)
        var outW = Int((dispW * scale).rounded()); if outW % 2 != 0 { outW -= 1 }
        var outH = Int((dispH * scale).rounded()); if outH % 2 != 0 { outH -= 1 }

        // Reader (video only -> silent output)
        let reader = try AVAssetReader(asset: asset)
        let readerSettings: [String: Any] = [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA]
        let readerOutput = AVAssetReaderTrackOutput(track: vTrack, outputSettings: readerSettings)
        readerOutput.alwaysCopiesSampleData = false
        reader.add(readerOutput)

        // Writer
        let writer = try AVAssetWriter(outputURL: outURL, fileType: .mp4)
        let compression: [String: Any] = [
            AVVideoAverageBitRateKey: targetBitrate,
            AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
            AVVideoMaxKeyFrameIntervalKey: 60,
        ]
        let writerSettings: [String: Any] = [
            AVVideoCodecKey: AVVideoCodecType.h264,
            AVVideoWidthKey: outW,
            AVVideoHeightKey: outH,
            AVVideoCompressionPropertiesKey: compression,
        ]
        let writerInput = AVAssetWriterInput(mediaType: .video, outputSettings: writerSettings)
        writerInput.transform = transform  // preserve display orientation
        writerInput.expectsMediaDataInRealTime = false
        writer.add(writerInput)
        writer.shouldOptimizeForNetworkUse = true

        guard writer.startWriting() else {
            print("writer.startWriting failed: \(String(describing: writer.error))"); exit(1)
        }
        guard reader.startReading() else {
            print("reader.startReading failed: \(String(describing: reader.error))"); exit(1)
        }
        writer.startSession(atSourceTime: .zero)

        print("Encoding \(outW)x\(outH) @ \(Double(targetBitrate)/1_000_000)Mbps (silent) ...")
        var appended = 0
        // Synchronous drain — keeps `reader` alive in scope (async callbacks drop it -> crash)
        while reader.status == .reading {
            if writerInput.isReadyForMoreMediaData {
                if let sb = readerOutput.copyNextSampleBuffer() {
                    writerInput.append(sb); appended += 1
                } else {
                    break
                }
            } else {
                usleep(5000)
            }
        }
        writerInput.markAsFinished()
        if reader.status == .failed {
            print("reader failed: \(String(describing: reader.error))"); exit(1)
        }
        let done = DispatchSemaphore(value: 0)
        writer.finishWriting {
            if writer.status == .completed { print("done, \(appended) frames") }
            else { print("failed: \(String(describing: writer.error))") }
            done.signal()
        }
        done.wait()
    } catch {
        print("error: \(error)"); exit(1)
    }
    sema.signal()
}
sema.wait()
