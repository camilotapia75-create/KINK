/* DungeonKing motion system — cinematic polish, zero dependencies.
   - Scroll reveals with stagger (IntersectionObserver)
   - Kinetic headlines: per-letter rise-in on section titles
   - 3D tilt on product card images
   - Magnetic buttons
   - Cross-page fade transitions
   All motion is skipped when the user prefers reduced motion. */

(function () {
  document.documentElement.classList.add("motion");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- page transitions ---------- */
  document.addEventListener("click", (e) => {
    if (reduced) return;
    const a = e.target.closest("a[href]");
    if (!a || a.target || a.hasAttribute("download") || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
    e.preventDefault();
    document.body.classList.add("page-exit");
    setTimeout(() => { location.href = href; }, 180);
  });
  /* restore if the page is resurrected from bfcache mid-exit */
  addEventListener("pageshow", () => document.body.classList.remove("page-exit"));

  if (reduced) return;

  /* Run after every other DOMContentLoaded handler has rendered its content */
  document.addEventListener("DOMContentLoaded", () => setTimeout(init, 0));

  function init() {
    /* ---------- scroll reveals ---------- */
    const revealSel = [
      ".card", ".cat-card", ".svc-card", ".section-head", ".build-steps > div",
      ".review", ".foot-grid > div", ".trust-row span", ".quote-strip",
      ".two-col > form", ".two-col > .summary-card", ".rev-summary", ".info-body",
    ].join(",");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -4% 0px" });
    document.querySelectorAll(revealSel).forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
    /* ---------- 3D tilt on product & category cards ---------- */
    document.querySelectorAll(".card .card-img, .cat-card img, .svc-card img, .gallery .main").forEach((img) => {
      const host = img.closest(".card, .cat-card, .svc-card") || img;
      host.addEventListener("mousemove", (e) => {
        const r = img.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        img.style.transform = `perspective(700px) rotateY(${px * 10}deg) rotateX(${-py * 8}deg) scale(1.025)`;
        for (const el of [img, host]) {
          el.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
          el.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
          el.classList.add("tilting");
        }
      });
      host.addEventListener("mouseleave", () => {
        img.style.transform = "";
        img.classList.remove("tilting");
        host.classList.remove("tilting");
      });
    });

    /* ---------- magnetic buttons ---------- */
    document.querySelectorAll(".btn, .tab-btn").forEach((b) => {
      b.addEventListener("mousemove", (e) => {
        const r = b.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        b.style.transform = `translate(${dx * 0.14}px, ${dy * 0.22}px)`;
      });
      b.addEventListener("mouseleave", () => { b.style.transform = ""; });
    });
  }
})();
