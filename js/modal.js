// Case-study "box": opens a project over the dimmed homepage, can be
// maximized or closed, and keeps the URL shareable via /case-<slug>.
(function () {
  let backdrop, modal, body, maximizeBtn, closeBtn;
  let lightbox, lightboxContent;
  let currentSlug = null;
  let nextprevObserver = null;

  // The shareable case URL is the clean path /case-<slug> (served by a Vercel
  // rewrite). Old ?case=<slug> links are still honoured for backward compat.
  function slugFromLocation() {
    const m = window.location.pathname.match(/^\/case-([a-z0-9-]+)\/?$/i);
    if (m) return m[1];
    return new URLSearchParams(window.location.search).get("case");
  }

  const EXPAND_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M6 3H3v3M10 3h3v3M6 13H3v-3M10 13h3v-3"/></svg>';
  const COLLAPSE_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M3 6h3V3M13 6h-3V3M3 10h3v3M13 10h-3v3"/></svg>';
  const CLOSE_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9"/></svg>';

  // A missing `src` renders a labeled placeholder box naming the screen/photo
  // to drop in, so the layout is complete before the real assets exist.
  function placeholderBox(note) {
    return `<span class="ph"><span class="ph-tag">Image placeholder</span><span class="ph-note">${note || "Image"}</span></span>`;
  }

  // Wrap an <img>/<video> so it can be clicked/tapped to open enlarged in the
  // lightbox, with a small corner icon signalling it. The click is handled by
  // delegation in initModal; this markup only carries the affordance + a11y.
  function zoomable(inner) {
    return `<span class="cs-zoom" role="button" tabindex="0" aria-label="View full size">${inner}<span class="cs-zoom-ic" aria-hidden="true">${EXPAND_ICON}</span></span>`;
  }

  function imgTag(src, alt) {
    return `<img src="${src}" alt="${alt}" loading="lazy">`;
  }

  // Silent, looping autoplay clip (e.g. a phone screen or a dashboard walkthrough).
  function videoTag(src, alt) {
    return `<video src="${src}" autoplay loop muted playsinline preload="metadata" aria-label="${alt}"></video>`;
  }

  function renderMedia(media, alt) {
    if (!media) return "";
    const caption = media.caption ? `<figcaption class="cs-caption">${media.caption}</figcaption>` : "";

    // Stacked full-width images, each optionally captioned — for showing a
    // sequence of related screenshots (e.g. the three nav entry points).
    if (media.type === "stack") {
      return media.items.map((it) => {
        const cap = it.caption ? `<figcaption class="cs-caption">${it.caption}</figcaption>` : "";
        if (it.src) {
          const inner = it.video ? videoTag(it.src, alt) : imgTag(it.src, alt);
          return `<figure class="cs-media">${zoomable(inner)}${cap}</figure>`;
        }
        return `<figure class="cs-media placeholder">${placeholderBox(it.note)}${cap}</figure>`;
      }).join("");
    }

    // A centered row of N items (e.g. a set of phone screenshots). An item with
    // `video: true` renders as a clip instead of an image.
    if (media.type === "row") {
      const cells = media.items.map((it) => {
        const cap = it.caption ? `<figcaption class="cs-caption">${it.caption}</figcaption>` : "";
        if (it.src && it.video) {
          return `<div>${zoomable(videoTag(it.src, it.alt || alt))}${cap}</div>`;
        }
        if (it.src) {
          return `<div>${zoomable(imgTag(it.src, it.alt || alt))}${cap}</div>`;
        }
        return `<div class="ph-cell">${placeholderBox(it.note)}</div>`;
      }).join("");
      return `<figure class="cs-media row${media.variant ? " " + media.variant : ""}">${cells}${caption}</figure>`;
    }

    if (media.type === "split") {
      const notes = Array.isArray(media.note) ? media.note : [media.note, media.note];
      const cells = [0, 1].map((i) => {
        if (media.src && media.src[i]) {
          return `<div>${zoomable(imgTag(media.src[i], alt))}</div>`;
        }
        return `<div class="ph-cell">${placeholderBox(notes[i])}</div>`;
      }).join("");
      return `<figure class="cs-media split${media.variant ? " " + media.variant : ""}">${cells}${caption}</figure>`;
    }

    if (media.src) {
      // A full-width `single` can be a clip (e.g. a dashboard walkthrough) by
      // setting `video: true`, otherwise it's a still image.
      const inner = media.video ? videoTag(media.src, alt) : imgTag(media.src, alt);
      const cls = media.video ? "cs-media cs-media-video" : "cs-media";
      return `<figure class="${cls}">${zoomable(inner)}${caption}</figure>`;
    }
    return `<figure class="cs-media placeholder">${placeholderBox(media.note)}${caption}</figure>`;
  }

  function renderProject(project) {
    const { prev, next } = getAdjacentProjects(project.slug);

    const disciplinesHtml = project.disciplines
      ? `<p class="cs-disciplines mono">${project.disciplines.join(" · ")}</p>`
      : "";

    const factLabels = [["role", "Role"], ["timeline", "Timeline"], ["team", "Team"], ["platform", "Platform"], ["tools", "Tools"]];
    const factsHtml = `
      <div class="cs-facts">
        ${factLabels.filter(([key]) => project.facts[key]).map(([key, label]) => `
          <div class="cs-fact"><span class="cs-fact-label mono">${label}</span><span class="cs-fact-value">${project.facts[key]}</span></div>
        `).join("")}
      </div>`;

    const chaptersHtml = project.sections.map((section) => {
      const bodyHtml = (section.body || []).map((p) => `<p>${p}</p>`).join("");
      const quotes = section.quote ? (Array.isArray(section.quote) ? section.quote : [section.quote]) : [];
      const quoteHtml = quotes.map((q) => `<blockquote class="cs-quote">${q}</blockquote>`).join("");
      let pointsHtml = "";
      if (section.points) {
        // If any point carries its own media, render points as blocks with the
        // image below each; otherwise keep the compact bold-lead list.
        if (section.points.some((pt) => pt.media)) {
          pointsHtml = section.points.map((pt) => `
            <div class="cs-point-block"><strong>${pt.title}</strong><p>${pt.text}</p></div>
            ${pt.media ? renderMedia(pt.media, `${project.title} — ${pt.title}`) : ""}
          `).join("");
        } else {
          pointsHtml = `
            <ul class="cs-points">
              ${section.points.map((pt) => `<li><strong>${pt.title}</strong>${pt.text}</li>`).join("")}
            </ul>`;
        }
      }
      // A normal closing paragraph after the points (not a faint footnote).
      const closeHtml = section.close
        ? (Array.isArray(section.close) ? section.close : [section.close]).map((p) => `<p class="cs-close">${p}</p>`).join("")
        : "";
      const footnoteHtml = section.footnote ? `<p class="cs-footnote">${section.footnote}</p>` : "";
      return `
        <div class="cs-chapter">
          <p class="mono">${section.heading}</p>
          ${quoteHtml}
          ${bodyHtml}
          ${pointsHtml}
          ${closeHtml}
          ${footnoteHtml}
        </div>
        ${renderMedia(section.media, `${project.title} — ${section.heading}`)}
      `;
    }).join("");

    const coverHtml = typeof project.cover === "string"
      ? `<div class="cs-media"><img src="${project.cover}" alt="${project.title} cover" loading="lazy"></div>`
      : renderMedia({ type: "single", src: project.cover && project.cover.src, note: (project.cover && project.cover.note) || "Cover image", caption: project.cover && project.cover.caption }, `${project.title} cover`);

    body.innerHTML = `
      <div class="cs-top">
        ${disciplinesHtml}
        <h1 class="cs-title">${project.title}</h1>
        ${factsHtml}
        <p class="lede cs-overview">${project.overview}</p>
      </div>
      ${coverHtml}
      ${chaptersHtml}
      <div class="cs-nextprev">
        <div class="cs-nextprev-item">
          <p class="mono">Previous</p>
          <button type="button" class="modal-nav-btn bubble-link" data-slug="${prev.slug}">${prev.title}<span class="bubble" aria-hidden="true"></span></button>
        </div>
        <div class="cs-nextprev-item">
          <p class="mono">Next</p>
          <button type="button" class="modal-nav-btn bubble-link" data-slug="${next.slug}">${next.title}<span class="bubble" aria-hidden="true"></span></button>
        </div>
      </div>
    `;

    body.querySelectorAll(".modal-nav-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        openModal(e.currentTarget.dataset.slug);
      });
    });

    // Auto-reveal the prev/next accent bubble when it scrolls into view — mirrors
    // the homepage "Let's talk" CTA, so the affordance shows on touch (no hover).
    if (nextprevObserver) nextprevObserver.disconnect();
    const navBtns = body.querySelectorAll(".cs-nextprev .bubble-link");
    if ("IntersectionObserver" in window) {
      nextprevObserver = new IntersectionObserver((entries) => {
        entries.forEach((e) => e.target.classList.toggle("in-view", e.isIntersecting));
      }, { root: body, threshold: 0.5 });
      navBtns.forEach((btn) => nextprevObserver.observe(btn));
    } else {
      navBtns.forEach((btn) => btn.classList.add("in-view"));
    }

    body.scrollTop = 0;
    body.dataset.case = project.slug; // enables per-case styling (e.g. media borders)
    currentSlug = project.slug;
  }

  function openModal(slug, opts) {
    opts = opts || {};
    const project = getProjectBySlug(slug);
    if (!project) return;

    renderProject(project);
    backdrop.classList.add("open");
    modal.classList.add("open");
    document.body.classList.add("modal-open");
    document.title = `${project.title} — Carolina Pagnussat`;

    if (opts.push !== false) {
      history.pushState({ case: slug }, "", `/case-${slug}`);
    }
  }

  function closeModal(opts) {
    opts = opts || {};
    backdrop.classList.remove("open");
    modal.classList.remove("open", "maximized");
    maximizeBtn.innerHTML = EXPAND_ICON;
    document.body.classList.remove("modal-open");
    document.title = "Carolina Pagnussat — Product Designer";
    currentSlug = null;

    if (opts.push !== false) {
      history.pushState({}, "", "/");
    }
  }

  function toggleMaximize() {
    const isMax = modal.classList.toggle("maximized");
    maximizeBtn.innerHTML = isMax ? COLLAPSE_ICON : EXPAND_ICON;
  }

  // Build the shared lightbox overlay once and append it to <body>. It sits
  // above the case-study modal and holds one enlarged image or video at a time.
  function initLightbox() {
    lightbox = document.createElement("div");
    lightbox.className = "cs-lightbox";
    lightbox.innerHTML = `<button type="button" class="cs-lightbox-close" aria-label="Close">${CLOSE_ICON}</button><div class="cs-lightbox-content"></div>`;
    document.body.appendChild(lightbox);
    lightboxContent = lightbox.querySelector(".cs-lightbox-content");
    lightbox.addEventListener("click", (e) => {
      // Close on the backdrop or the close button, but not on the media itself.
      if (e.target === lightbox || e.target.closest(".cs-lightbox-close")) closeLightbox();
    });
  }

  // Open an enlarged copy of a clicked <img>/<video>. Rotating a phone to
  // landscape lets the overlay reflow wider; videos carry controls (which
  // include the OS fullscreen button) so wide clips stay readable.
  function openLightbox(el) {
    if (!el || !lightbox) return;
    const src = el.getAttribute("src");
    if (!src) return;
    lightboxContent.innerHTML = el.tagName === "VIDEO"
      ? `<video src="${src}" autoplay loop muted playsinline controls></video>`
      : `<img src="${src}" alt="${el.getAttribute("alt") || ""}">`;
    lightbox.classList.add("open");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.classList.remove("lightbox-open");
    lightboxContent.innerHTML = "";
  }

  function initModal() {
    backdrop = document.querySelector(".modal-backdrop");
    modal = document.querySelector(".cs-modal");
    body = document.querySelector(".cs-modal-body");
    if (!backdrop || !modal || !body) return;

    closeBtn = modal.querySelector(".close-btn");
    maximizeBtn = modal.querySelector(".maximize-btn");
    maximizeBtn.innerHTML = EXPAND_ICON;
    closeBtn.innerHTML = CLOSE_ICON;

    initLightbox();

    // Any media in the case body is click/tap-to-enlarge (delegated, so it
    // covers every media type and survives re-renders).
    body.addEventListener("click", (e) => {
      const zoom = e.target.closest(".cs-zoom");
      if (zoom) openLightbox(zoom.querySelector("img, video"));
    });
    body.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const zoom = e.target.closest(".cs-zoom");
      if (zoom) { e.preventDefault(); openLightbox(zoom.querySelector("img, video")); }
    });

    closeBtn.addEventListener("click", () => closeModal());
    maximizeBtn.addEventListener("click", toggleMaximize);
    backdrop.addEventListener("click", () => closeModal());

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      // The lightbox sits on top, so close it first if it's open.
      if (lightbox && lightbox.classList.contains("open")) closeLightbox();
      else if (modal.classList.contains("open")) closeModal();
    });

    document.addEventListener("click", (e) => {
      const row = e.target.closest(".work-row");
      if (!row) return;
      e.preventDefault();
      openModal(row.dataset.slug);
    });

    window.addEventListener("popstate", () => {
      const slug = slugFromLocation();
      if (slug && slug !== currentSlug) {
        openModal(slug, { push: false });
      } else if (!slug && currentSlug) {
        closeModal({ push: false });
      }
    });

    const initialSlug = slugFromLocation();
    if (initialSlug) {
      openModal(initialSlug, { push: false });
      // Upgrade an old shared ?case=<slug> link to the clean /case-<slug> path.
      if (/[?&]case=/.test(window.location.search)) {
        history.replaceState({ case: initialSlug }, "", `/case-${initialSlug}`);
      }
    }
  }

  document.addEventListener("DOMContentLoaded", initModal);
})();
