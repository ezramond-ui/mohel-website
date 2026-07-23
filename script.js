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
