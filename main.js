// ------- Hero Carousel -------
(function () {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  const vid = document.getElementById("hero-video");
  let current = 0;
  let timer;

  function goTo(n) {
    if (!slides.length) return;
    if (slides[current].classList.contains("is-video") && vid) {
      vid.pause();
      vid.currentTime = 0;
    }
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (n + slides.length) % slides.length;
    const s = slides[current];
    if (!s.classList.contains("is-video")) {
      s.style.animation = "none";
      s.offsetHeight;
      s.style.animation = "";
    }
    s.classList.add("active");
    dots[current].classList.add("active");
    if (s.classList.contains("is-video") && vid) {
      vid.play().catch(() => {});
    }
  }

  dots.forEach((dot, i) =>
    dot.addEventListener("click", () => {
      clearInterval(timer);
      goTo(i);
      timer = setInterval(() => goTo(current + 1), 6500);
    }),
  );
  timer = setInterval(() => goTo(current + 1), 6500);
})();

// ------- Testimonials Carousel -------
(function () {
  const testimonials = [
    {
      quote:
        '"A great deal for the space and location. The restaurants available were all very good. Friendly staff, helpful disposition made our overall experience wonderful, a great deal for the space and location. We will be going again next year."',
      author: "Joseph Hart",
      source: "TripAdvisor",
    },
    {
      quote:
        '"Absolutely breathtaking views and impeccable service. The chalet exceeded every expectation — cosy interiors, gourmet meals, and a team that genuinely cares. A once-in-a-lifetime stay."',
      author: "Amélie Dubois",
      source: "Booking.com",
    },
    {
      quote:
        '"The most peaceful retreat I have ever experienced. Waking up to snow-capped peaks, fresh mountain air and a crackling fireplace is something I will never forget. Cannot recommend highly enough."',
      author: "Marcus Lehner",
      source: "Google Reviews",
    },
  ];
  const quoteEl = document.getElementById("testimonial-quote");
  const authorEl = document.getElementById("testimonial-author");
  const sourceEl = document.getElementById("testimonial-source");
  const tdots = document.querySelectorAll(".testi-dot");
  let tCurrent = 0;
  let tTimer;

  function tGoTo(n) {
    if (!testimonials.length) return;
    tCurrent = (n + testimonials.length) % testimonials.length;
    const t = testimonials[tCurrent];
    [quoteEl, authorEl, sourceEl].forEach((el) => (el.style.opacity = "0"));
    setTimeout(() => {
      quoteEl.textContent = t.quote;
      authorEl.textContent = t.author;
      sourceEl.textContent = t.source;
      [quoteEl, authorEl, sourceEl].forEach((el) => (el.style.opacity = "1"));
    }, 400);
    tdots.forEach((d, i) => d.classList.toggle("active", i === tCurrent));
  }

  tdots.forEach((dot, i) =>
    dot.addEventListener("click", () => {
      clearInterval(tTimer);
      tGoTo(i);
      tTimer = setInterval(() => tGoTo(tCurrent + 1), 7000);
    }),
  );
  tTimer = setInterval(() => tGoTo(tCurrent + 1), 7000);
})();

// ------- Page Loader -------
(function () {
  const loader = document.getElementById("page-loader");
  function dismiss() {
    if (!loader) return;
    loader.classList.add("fade-out");
    setTimeout(() => loader.remove(), 900);
  }
  if (document.readyState === "complete") {
    setTimeout(dismiss, 300);
  } else {
    window.addEventListener("load", () => setTimeout(dismiss, 300));
  }
})();

// ------- Navbar hide on scroll down, show on scroll up -------
const navbar = document.getElementById("navbar");
let lastScrollY = window.scrollY;
window.addEventListener(
  "scroll",
  () => {
    if (!navbar) return;
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > 80) {
      navbar.classList.add("nav-hidden");
    } else {
      navbar.classList.remove("nav-hidden");
    }
    navbar.classList.toggle("scrolled", currentY > 10);
    lastScrollY = currentY;
  },
  { passive: true },
);

// ------- Mobile menu -------
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () =>
    mobileMenu.classList.toggle("open"),
  );
  mobileMenu
    .querySelectorAll("a")
    .forEach((a) =>
      a.addEventListener("click", () =>
        mobileMenu.classList.remove("open"),
      ),
    );
}

// ------- Back to top -------
const backTop = document.getElementById("back-top");
if (backTop) {
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 400) {
        backTop.style.opacity = "1";
        backTop.style.pointerEvents = "auto";
      } else {
        backTop.style.opacity = "0";
        backTop.style.pointerEvents = "none";
      }
    },
    { passive: true },
  );
  backTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

// ------- Scroll reveal -------
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
revealEls.forEach((el) => observer.observe(el));

// ------- Room carousel (slide) -------
let roomOffset = 0;
const roomsGrid = document.getElementById("rooms-grid");
if (roomsGrid) {
  const roomCards = roomsGrid.querySelectorAll(".room-card");
  document.getElementById("prev-room")?.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      roomOffset = Math.max(roomOffset - 1, 0);
      roomsGrid.style.transform = `translateX(-${roomOffset * 100}%)`;
    }
  });
  document.getElementById("next-room")?.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      roomOffset = Math.min(roomOffset + 1, roomCards.length - 1);
      roomsGrid.style.transform = `translateX(-${roomOffset * 100}%)`;
    }
  });
}

// ------- Flatpickr Init -------
const fpCheckin = flatpickr("#checkin", {
  dateFormat: "D, d M Y",
  minDate: "today",
  disableMobile: true,
  showMonths: 1,
  onChange: function (selectedDates) {
    const nextDay = new Date(selectedDates[0]);
    nextDay.setDate(nextDay.getDate() + 1);
    fpCheckout.set("minDate", nextDay);
    // If checkout not set or is before new checkin, clear it and auto-open
    if (
      !fpCheckout.selectedDates[0] ||
      fpCheckout.selectedDates[0] <= selectedDates[0]
    ) {
      fpCheckout.clear();
      setTimeout(() => fpCheckout.open(), 300);
    }
    updateNightsDisplay();
  },
});

const fpCheckout = flatpickr("#checkout", {
  dateFormat: "D, d M Y",
  minDate: new Date().fp_incr(1),
  disableMobile: true,
  showMonths: 1,
  onChange: function () {
    updateNightsDisplay();
  },
});

function updateNightsDisplay() {
  const ci = fpCheckin.selectedDates[0];
  const co = fpCheckout.selectedDates[0];
  const checkinLabel = document.querySelector("#checkin-cell .booking-bar-label");
  const checkoutLabel = document.querySelector("#checkout-cell .booking-bar-label");
  if (ci && co && co > ci) {
    const nights = Math.round((co - ci) / 86400000);
    const suffix = nights === 1 ? "night" : "nights";
    if (checkinLabel) checkinLabel.textContent = `Check In`;
    if (checkoutLabel) checkoutLabel.textContent = `Check Out · ${nights} ${suffix}`;
  } else {
    if (checkinLabel) checkinLabel.textContent = "Check In";
    if (checkoutLabel) checkoutLabel.textContent = "Check Out";
  }
}

// Open pickers when clicking anywhere in the booking cell
document.getElementById("checkin-cell")?.addEventListener("click", () => fpCheckin.open());
document.getElementById("checkout-cell")?.addEventListener("click", () => fpCheckout.open());

// ------- Guests Dropdown -------
let guestState = { room: 1, adult: 1, child: 0 };
const guestToggle = document.getElementById("guest-toggle");
const guestDropdown = document.getElementById("guest-dropdown");
const guestDisplay = document.getElementById("guest-display");
const guestApply = document.getElementById("guest-apply");

if (guestToggle && guestDropdown) {
  guestToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    guestDropdown.classList.toggle("d-none");
  });

  guestApply.addEventListener("click", (e) => {
    e.stopPropagation();
    guestDropdown.classList.add("d-none");
  });

  document.addEventListener("click", (e) => {
    if (
      !guestDropdown.contains(e.target) &&
      !guestToggle.contains(e.target)
    ) {
      guestDropdown.classList.add("d-none");
    }
  });
}

window.updateGuests = function (type, delta) {
  if (type === "room") {
    guestState.room = Math.max(1, guestState.room + delta);
    document.getElementById("room-count").innerText = guestState.room;
  } else if (type === "adult") {
    guestState.adult = Math.max(1, guestState.adult + delta);
    document.getElementById("adult-count").innerText = guestState.adult;
  } else if (type === "child") {
    guestState.child = Math.max(0, guestState.child + delta);
    document.getElementById("child-count").innerText = guestState.child;
  }

  // Update display text
  const rText =
    guestState.room === 1 ? "1 Room" : `${guestState.room} Rooms`;
  const aText =
    guestState.adult === 1 ? "1 Adult" : `${guestState.adult} Adults`;
  const cText =
    guestState.child === 1 ? "1 Child" : `${guestState.child} Children`;
  if (guestDisplay)
    guestDisplay.innerText = `${rText}, ${aText}, ${cText}`;
};

// ------- Check Availability -------
const checkAvailBtn = document.getElementById("check-avail-btn");
if (checkAvailBtn) {
  checkAvailBtn.addEventListener("click", () => {
    const ci = document.getElementById("checkin").value;
    const co = document.getElementById("checkout").value;

    if (fpCheckin.selectedDates[0] && fpCheckout.selectedDates[0]) {
      if (fpCheckout.selectedDates[0] > fpCheckin.selectedDates[0]) {
        alert(
          `Checking availability from ${ci} to ${co} for ${guestDisplay.innerText}. We'll be in touch shortly!`,
        );
      } else {
        alert("Check Out date must be after Check In date.");
      }
    } else {
      alert("Please select valid check-in and check-out dates.");
    }
  });
}
