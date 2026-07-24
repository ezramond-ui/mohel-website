/* =========================================================
   Mohel Practice — Shared JavaScript
   Small, dependency-free. Handles:
   - Mobile nav toggle (accessible)
   - Current year in footer
   - Gallery lightbox (click-to-enlarge, keyboard-closable)
   The FAQ uses native <details>/<summary>, so it needs no JS
   and is keyboard-accessible by default.
   ========================================================= */
(function () {
  "use strict";

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close the menu after tapping a link (mobile)
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---- Scroll & load motion (progressive enhancement) ----
     Headings, images, features and cards ease into place as you scroll.
     Cards within the same grid stagger for a lively, hand-built feel.
     Content stays fully visible with no JS or with reduced-motion. */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

    // [selector, animation (a string, or an array to alternate through), stagger-ms]
    // Order matters: earlier entries claim an element first.
    var plan = [
      // The hero sequences upward as the page loads
      [".hero .eyebrow, .hero h1, .hero .lede, .hero .hero-actions, .hero .hero-trust", "up", 110],
      [".page-hero .eyebrow, .page-hero h1, .page-hero .lede", "up", 90],

      // Titles and headings glide in from the left
      [".section-head", "left", 0],
      [".prose > h2", "left", 0],

      // Paired columns converge from opposite sides
      [".grid-2 .about-photo", "left", 0],
      [".grid-2 .about-photo + div", "right", 0],
      [".compare-yes", "left", 0],
      [".compare-no", "right", 0],

      // Feature cards pop forward off the page
      [".feature", "pop", 0],

      // Sequential steps march in from the left
      [".step", "left", 90],

      // Card grids alternate sides as they stagger
      [".quicklink", ["left", "right"], 80],
      [".area-card", ["left", "right"], 60],
      [".value", ["left", "right"], 80],
      [".quote", ["left", "right"], 90],
      [".faq details", ["left", "right"], 45],

      // Gallery photos scale up into place
      // (portrait photos animate via their .about-photo wrapper above)
      [".gallery-item", "scale", 45],

      [".cta-band .eyebrow, .cta-band h2, .cta-band .cta-phone", "up", 90]
    ];

    plan.forEach(function (cfg) {
      var nodes = document.querySelectorAll(cfg[0]);
      var anim = cfg[1], stagger = cfg[2] || 0;
      var parents = [], counts = [];   // parallel arrays keep this dependency-free
      Array.prototype.forEach.call(nodes, function (el) {
        if (el.hasAttribute("data-anim")) { return; }   // never double-tag

        // Index within this element's own parent, so each grid restarts
        var p = el.parentElement;
        var slot = parents.indexOf(p);
        if (slot === -1) { parents.push(p); counts.push(0); slot = parents.length - 1; }
        var i = counts[slot]++;

        el.setAttribute("data-anim", typeof anim === "string" ? anim : anim[i % anim.length]);
        if (stagger) {
          var d = Math.min(i * stagger, 420);
          if (d) { el.style.setProperty("--d", d + "ms"); }
        }
        io.observe(el);
      });
    });
  }

  /* ---- Gallery lightbox ---- */
  var gallery = document.querySelector(".gallery");
  if (gallery) {
    // Build the lightbox overlay once
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Enlarged photo");
    lb.innerHTML =
      '<button class="lightbox-close" aria-label="Close">×</button>' +
      '<div class="lb-content"></div>';
    document.body.appendChild(lb);

    var lbContent = lb.querySelector(".lb-content");
    var lbClose = lb.querySelector(".lightbox-close");
    var lastFocused = null;

    function openLightbox(node) {
      lbContent.innerHTML = "";
      lbContent.appendChild(node);
      lb.classList.add("open");
      lastFocused = document.activeElement;
      lbClose.focus();
      document.body.style.overflow = "hidden";
    }
    function closeLightbox() {
      lb.classList.remove("open");
      lbContent.innerHTML = "";
      document.body.style.overflow = "";
      if (lastFocused) { lastFocused.focus(); }
    }

    gallery.addEventListener("click", function (e) {
      var item = e.target.closest(".gallery-item");
      if (!item) { return; }
      var img = item.querySelector("img");
      if (img) {
        // Real photo: clone it into the lightbox
        var big = document.createElement("img");
        big.src = img.getAttribute("data-full") || img.src;
        big.alt = img.alt;
        openLightbox(big);
      } else {
        // Placeholder tile: show a matching placeholder in the lightbox
        var fig = document.createElement("div");
        fig.className = "lb-figure";
        fig.textContent = item.getAttribute("data-caption") || "Photo placeholder";
        openLightbox(fig);
      }
    });

    lbClose.addEventListener("click", closeLightbox);
    lb.addEventListener("click", function (e) {
      if (e.target === lb) { closeLightbox(); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lb.classList.contains("open")) { closeLightbox(); }
    });
  }
})();
