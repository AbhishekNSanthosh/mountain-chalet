/* ============================================================
   CozyStay V3 – JavaScript (main3.js)
   ============================================================ */

"use strict";

/* ===== FULLSCREEN OVERLAY MENU ===== */
(function initOverlayMenu() {
  const overlay    = document.getElementById("v3-overlay-menu");
  const hamburger  = document.getElementById("v3-hamburger");
  const closeBtn   = document.getElementById("v3-overlay-close");
  if (!overlay || !hamburger || !closeBtn) return;

  function openOverlay() {
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("overlay-open");
  }

  function closeOverlay() {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overlay-open");
  }

  hamburger.addEventListener("click", openOverlay);
  closeBtn.addEventListener("click", closeOverlay);

  // Close when clicking any nav link inside the overlay
  overlay.querySelectorAll(".v3-overlay-link").forEach((link) => {
    link.addEventListener("click", closeOverlay);
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeOverlay();
  });
})();

/* ===== FLATPICKR DATE PICKERS ===== */
(function initDatePickers() {
  const today    = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const checkinEl  = document.getElementById("v3-checkin");
  const checkoutEl = document.getElementById("v3-checkout");
  if (!checkinEl || !checkoutEl) return;

  let checkoutPicker;

  const checkinPicker = flatpickr(checkinEl, {
    dateFormat:    "Y-m-d",
    defaultDate:   today,
    minDate:       "today",
    disableMobile: true,
    appendTo:      document.body,
    onChange: ([selected]) => {
      if (!selected) return;
      const minCO = new Date(selected);
      minCO.setDate(minCO.getDate() + 1);
      checkoutPicker.set("minDate", minCO);
      const coDate = checkoutPicker.selectedDates[0];
      if (!coDate || coDate <= selected) checkoutPicker.setDate(minCO);
    },
  });

  checkoutPicker = flatpickr(checkoutEl, {
    dateFormat:    "Y-m-d",
    defaultDate:   tomorrow,
    minDate:       tomorrow,
    disableMobile: true,
    appendTo:      document.body,
  });

  document.getElementById("v3-checkin-cell")?.addEventListener("click",  () => checkinPicker.open());
  document.getElementById("v3-checkout-cell")?.addEventListener("click", () => checkoutPicker.open());
})();

/* ===== GUEST / ROOM COUNTER ===== */
(function initGuestCounter() {
  let counts = { room: 1, adult: 1, child: 0 };

  function updateDisplay() {
    const roomsDisp  = document.getElementById("v3-rooms-display");
    const guestsDisp = document.getElementById("v3-guests-display");
    const roomCount  = document.getElementById("v3-room-count");
    const adultCount = document.getElementById("v3-adult-count");
    const childCount = document.getElementById("v3-child-count");

    if (roomCount)  roomCount.textContent  = counts.room;
    if (adultCount) adultCount.textContent = counts.adult;
    if (childCount) childCount.textContent = counts.child;

    if (roomsDisp)
      roomsDisp.textContent = counts.room + (counts.room === 1 ? " Room" : " Rooms");

    if (guestsDisp)
      guestsDisp.textContent =
        counts.adult + (counts.adult === 1 ? " Adult" : " Adults") +
        ", " +
        counts.child + (counts.child === 1 ? " Child" : " Children");
  }

  // Exposed globally for inline onclick
  window.v3UpdateGuests = function (type, delta) {
    const min = type === "room" ? 1 : type === "adult" ? 1 : 0;
    counts[type] = Math.max(min, counts[type] + delta);
    updateDisplay();
  };

  const guestsCell = document.getElementById("v3-guests-cell");
  const roomsCell  = document.getElementById("v3-rooms-cell");
  const dropdown   = document.getElementById("v3-guests-dropdown");
  const applyBtn   = document.getElementById("v3-guest-apply");

  function toggleDropdown(e) {
    e.stopPropagation();
    dropdown?.classList.toggle("open");
  }

  guestsCell?.addEventListener("click", toggleDropdown);
  roomsCell?.addEventListener("click",  toggleDropdown);

  applyBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown?.classList.remove("open");
  });

  document.addEventListener("click", (e) => {
    if (
      dropdown &&
      !dropdown.contains(e.target) &&
      e.target !== guestsCell &&
      e.target !== roomsCell
    ) {
      dropdown.classList.remove("open");
    }
  });

  updateDisplay();
})();

/* ===== CHECK AVAILABILITY CTA ===== */
(function initCTA() {
  const btn = document.getElementById("v3-check-avail");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const ci     = document.getElementById("v3-checkin")?.value   || "–";
    const co     = document.getElementById("v3-checkout")?.value  || "–";
    const rooms  = document.getElementById("v3-rooms-display")?.textContent  || "";
    const guests = document.getElementById("v3-guests-display")?.textContent || "";

    console.log(`Availability check: ${ci} → ${co} | ${rooms} | ${guests}`);

    // Brief visual feedback
    const orig = btn.textContent;
    btn.textContent = "Searching…";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig;
      btn.disabled    = false;
    }, 1600);
  });
})();

/* ===== CAROUSEL V3 SCROLL (Native) ===== */
(function initV3Carousel() {
  const track   = document.getElementById("v3-carousel-track");
  const btnPrev = document.getElementById("v3-btn-prev");
  const btnNext = document.getElementById("v3-btn-next");

  if (!track || !btnPrev || !btnNext) return;

  btnPrev.addEventListener("click", () => {
    track.scrollBy({ left: -(track.offsetWidth * 0.45), behavior: "smooth" });
  });

  btnNext.addEventListener("click", () => {
    track.scrollBy({ left:  (track.offsetWidth * 0.45), behavior: "smooth" });
  });
})();
