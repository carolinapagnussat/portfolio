// Shared behaviour: mobile nav toggle, Porto Alegre inline clock, active link state.

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  // Close the mobile menu after choosing a link (esp. the in-page #work anchor).
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Scroll-spy: the "Work" link is active only while the work list is the
// dominant section — the hero (above) and the closing/footer (below) stay
// neutral. Uses scroll position so it turns off reliably at the page bottom,
// regardless of viewport height. Homepage only.
function initWorkScrollSpy() {
  const workSection = document.getElementById("work");
  const closing = document.querySelector(".closing");
  const workLink = document.querySelector('.nav-links a[href="/work"]');
  if (!workSection || !workLink) return;

  function update() {
    const mid = window.innerHeight * 0.5;
    const workTop = workSection.getBoundingClientRect().top;
    // Active once the work section has scrolled up past the middle, and only
    // until the closing CTA reaches the middle (i.e. you've moved past work).
    const closingTop = closing ? closing.getBoundingClientRect().top : Infinity;
    const active = workTop < mid && closingTop > mid;
    workLink.classList.toggle("active", active);
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

function initClock() {
  const timeEls = document.querySelectorAll("[data-clock-time]");
  if (!timeEls.length) return;

  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo"
  });

  function tick() {
    const formatted = formatter.format(new Date());
    timeEls.forEach((el) => { el.textContent = formatted; });
  }

  tick();
  setInterval(tick, 15000);
}

function highlightActiveNavLink() {
  // Clean paths: /about, /contact, /work. The homepage (/) and case pages
  // (/case-*) leave Work to the scroll-spy instead of a static highlight.
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === path) link.classList.add("active");
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  const vh = window.innerHeight;
  items.forEach((el) => {
    const r = el.getBoundingClientRect();
    // Anything already on screen at load reveals immediately — including tall
    // blocks (e.g. the About portrait) whose 15% wouldn't meet the observer
    // threshold. A rAF lets the entrance transition still play (staggered hero).
    if (r.top < vh && r.bottom > 0) {
      requestAnimationFrame(() => el.classList.add("in"));
    } else {
      observer.observe(el);
    }
  });
}

// On touch (no hover), reveal work rows one at a time as they scroll — the row
// nearest the viewport centre lights up. Replaces the hover the phone can't do.
function initWorkTouchReveal() {
  if (!window.matchMedia || !window.matchMedia("(hover: none)").matches) return;
  const rows = Array.prototype.slice.call(document.querySelectorAll(".work-row"));
  if (!rows.length) return;

  function update() {
    const mid = window.innerHeight / 2;
    let best = null;
    let bestDist = Infinity;
    rows.forEach((row) => {
      const r = row.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= window.innerHeight) return;
      const dist = Math.abs(r.top + r.height / 2 - mid);
      if (dist < bestDist) { bestDist = dist; best = row; }
    });
    rows.forEach((row) => row.classList.toggle("revealed", row === best));
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

// Charges the experience timeline's vertical line as it scrolls through
// the viewport, and lights up each node once the line reaches it.
function initTimelineCharge() {
  const timeline = document.getElementById("timeline");
  const progress = document.getElementById("timeline-progress");
  if (!timeline || !progress) return;

  // The "Download CV" link after the timeline auto-animates once the line
  // finishes charging (see .bubble-link.cv-charged in the CSS).
  const cvLink = document.querySelector("#timeline + p .bubble-link");

  function update() {
    const items = timeline.querySelectorAll(".timeline-item");
    const rect = timeline.getBoundingClientRect();
    // Read line sits low in the viewport so the line charges all the way to
    // the last dot as you finish reading the last item — not only once you
    // scroll into the footer. The timeline is taller than the viewport, so a
    // higher line would never fully complete within reachable scroll.
    const readLine = window.innerHeight * 0.72;
    const filled = Math.max(0, Math.min(rect.height, readLine - rect.top));
    const pct = rect.height > 0 ? (filled / rect.height) * 100 : 0;
    progress.style.height = pct + "%";

    items.forEach((item) => {
      const dot = item.querySelector(".timeline-dot");
      if (!dot) return;
      const dotOffset = item.offsetTop + dot.offsetTop;
      item.classList.toggle("charged", filled >= dotOffset);
    });

    if (cvLink) cvLink.classList.toggle("cv-charged", filled >= rect.height - 1);
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

// Activates the closing CTA (bubble + accent color) whenever it scrolls into
// view, and resets when it leaves — so the animation "refreshes" each time you
// scroll up and back down.
function initCtaReveal() {
  const cta = document.querySelector(".closing a.big-link");
  if (!cta) return;

  if (!("IntersectionObserver" in window)) {
    cta.classList.add("cta-in");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        cta.classList.toggle("cta-in", entry.isIntersecting);
      });
    },
    { threshold: 0.9 }
  );
  observer.observe(cta);
}

// The Work nav item points at /work (a rewrite of the homepage). On the
// homepage we intercept it for a smooth in-page scroll and update the URL;
// arriving at /work directly just brings the work section into view.
function initWorkLink() {
  const workSection = document.getElementById("work");
  if (!workSection) return; // only present on the homepage
  if (window.location.pathname.replace(/\/+$/, "") === "/work") {
    requestAnimationFrame(() => workSection.scrollIntoView());
  }
  document.querySelectorAll('a[href="/work"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      workSection.scrollIntoView({ behavior: "smooth" });
      history.pushState({}, "", "/work");
    });
  });
}

// Auto-updating year counts (e.g. "10 years in design") — ticks up every
// January. Each span carries its start year in data-years-since; the markup
// also holds the current value as a no-JS fallback.
function initYearCounters() {
  const now = new Date().getFullYear();
  document.querySelectorAll("[data-years-since]").forEach((el) => {
    const start = parseInt(el.getAttribute("data-years-since"), 10);
    if (!isNaN(start)) el.textContent = String(now - start);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initClock();
  initYearCounters();
  highlightActiveNavLink();
  initWorkScrollSpy();
  initWorkLink();
  initReveal();
  initWorkTouchReveal();
  initCtaReveal();
  // Timeline items render async (js/experience.js), give them a tick first.
  requestAnimationFrame(initTimelineCharge);
});
