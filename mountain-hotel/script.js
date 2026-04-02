/* CozyStay – Shared JS (script.js) */

// ---- Mobile Menu Right Drawer ----
(function () {
  const btn = document.getElementById("v3-hamburger");
  const menu = document.getElementById("mobile-menu-v2");
  const overlay = document.getElementById("mobile-menu-overlay");
  const closeBtn = document.getElementById("mobile-menu-close");
  if (!btn || !menu) return;

  function openMenu() {
    menu.classList.add("open");
    if (overlay) overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menu.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  btn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (overlay) overlay.addEventListener("click", closeMenu);
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
})();

// ---- Navbar scroll effect ----
(function () {
  var navbar = document.getElementById("navbar-v2");
  if (!navbar) return;
  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add("header-scrolled");
    } else {
      navbar.classList.remove("header-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// ---- Scroll reveal ----
(function () {
  var revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  if (!revealEls.length) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { observer.observe(el); });
})();
