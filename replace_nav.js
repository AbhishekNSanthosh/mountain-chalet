const fs = require('fs');
const base = 'c:/Users/ABHISHEK/Documents/Projects/mountain-chalet/mountain chalet/';

const targetNav = `<nav id="navbar" class="fixed-top w-100 z-50 bg-white">
      <div
        class="d-flex align-items-center justify-content-between nav-inner-height navbar-inner-padding"
      >
        <div class="d-flex justify-content-start flex-grow-1">
          <a
            href="#"
            class="text-decoration-none font-serif fs-4 tracking-widest fw-semibold text-charcoal d-flex flex-column align-items-center justify-content-center lh-1 position-relative"
          >
            COZYSTAY
            <span class="text-gold tracking-widest mt-1 navbar-logo-stars"
              >\u2605 \u2605 \u2605 \u2605 \u2605</span
            >
          </a>
        </div>

        <!-- Desktop Nav -->
        <div
          class="d-none d-lg-flex flex-grow-2 align-items-center justify-content-end gap-5"
        >
          <ul
            class="d-flex align-items-center gap-4 text-charcoal m-0 p-0 list-unstyled fw-semibold tracking-widest text-uppercase nav-list"
          >
            <li>
              <a
                href="index.html"
                class="text-decoration-none text-charcoal hover-text-forest transition-colors"
              >
                <span class="nav-active pb-1">HOME</span>
              </a>
            </li>
            <li class="custom-dropdown position-relative">
              <a
                href="#rooms"
                class="text-decoration-none text-charcoal hover-text-forest transition-colors d-flex align-items-center gap-1"
              >
                <span class="pb-1">ROOMS</span>
                <svg
                  class="nav-dropdown-chevron"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
              <div class="custom-dropdown-menu">
            <a href="rooms.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">Rooms Page</a>
            <a href="room-details-top-image.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">Room Details \u2013 Top Image</a>
            <a href="room-details-top-gallery.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">Room Details \u2013 Top Gallery 1</a>
            <a href="room-details-top-gallery-2.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">Room Details \u2013 Top Gallery 2</a>
            <a href="room-details-left-booking.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">Room Details \u2013 Left Booking Form</a>
            <a href="room-details-booking-rules.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">Room Details \u2013 Booking Rules Example</a>
            <a href="cart.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">Cart</a>
            <a href="checkout.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">Checkout</a>
            <a href="my-account.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">My account</a>
          </div>
            </li>
            <li class="custom-dropdown position-relative">
              <a
                href="#"
                class="text-decoration-none text-charcoal hover-text-forest transition-colors d-flex align-items-center gap-1"
              >
                <span class="pb-1">PAGES</span>
                <svg
                  class="nav-dropdown-chevron"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
              <div class="custom-dropdown-menu">
            <a href="about.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">About the hotel</a>
            <a href="restaurants-bars.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">Restaurants & Bars</a>
            <a href="restaurant.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">The Restaurant</a>
            <a href="menu.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">Menu Page</a>
            <a href="spa-wellness.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">Spa & Wellness</a>
            <a href="events-meetings.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">Events & Meetings</a>
            <a href="activities.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">Local Activities</a>
            <a href="activity-detail.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">Activity Detail Page</a>
            <a href="contact.html" class="d-block px-4 py-2 text-decoration-none text-charcoal hover-text-forest hover-bg-cream transition-colors nav-dropdown-link">Contact</a>
          </div>
            </li>
            <li>
              <a
                href="blog.html"
                class="text-decoration-none text-charcoal hover-text-forest transition-colors"
                ><span class="pb-1">BLOG</span></a
              >
            </li>
            <li
              class="fw-normal text-charcoal ms-2 nav-phone"
            >
              Tel: +41 22 345 67 88
            </li>
          </ul>

          <a
            href="#booking"
            class="btn bg-forest hover-bg-forest text-white text-uppercase rounded-0 px-4 py-3 fw-semibold tracking-widest transition-all ms-3 nav-enquire-btn"
          >
            Enquire Now
          </a>
        </div>

        <!-- Mobile hamburger -->
        <button
          id="menu-btn"
          class="d-lg-none btn border-0 text-charcoal p-2"
          aria-label="Open menu"
        >
          <svg
            class="nav-hamburger-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div id="mobile-menu" class="d-lg-none bg-white border-top border-light">
        <div
          class="px-4 py-3 d-flex flex-column gap-2 mobile-menu-inner"
        >
          <a href="index.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">Home</a>
                    <a href="rooms.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">Rooms Page</a>
          <a href="room-details-top-image.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">Room Details \u2013 Top Image</a>
          <a href="room-details-top-gallery.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">Room Details \u2013 Top Gallery 1</a>
          <a href="room-details-top-gallery-2.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">Room Details \u2013 Top Gallery 2</a>
          <a href="room-details-left-booking.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">Room Details \u2013 Left Booking Form</a>
          <a href="room-details-booking-rules.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">Room Details \u2013 Booking Rules Example</a>
          <a href="cart.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">Cart</a>
          <a href="checkout.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">Checkout</a>
          <a href="my-account.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">My account</a>
                    <a href="about.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">About the hotel</a>
          <a href="restaurants-bars.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">Restaurants & Bars</a>
          <a href="restaurant.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">The Restaurant</a>
          <a href="menu.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">Menu Page</a>
          <a href="spa-wellness.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">Spa & Wellness</a>
          <a href="events-meetings.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">Events & Meetings</a>
          <a href="activities.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">Local Activities</a>
          <a href="activity-detail.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">Activity Detail Page</a>
          <a href="contact.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">Contact</a>
          <a href="blog.html" class="text-decoration-none text-charcoal hover-text-forest py-2 border-bottom border-light">Blog</a>
          <a href="#booking" class="btn bg-forest text-white w-100 rounded-0 py-2 mt-2 tracking-widest text-uppercase">Enquire Now</a>
        </div>
      </div>
    </nav>`;

const files = ['index.html','contact.html','restaurant.html','events-meetings.html','spa-wellness.html','menu.html','my-account.html','cart.html','room-details-booking-rules.html','room-details-left-booking.html','room-details-top-gallery-2.html','room-details-top-gallery.html','room-details-top-image.html','services.html','family-suite.html','double-suite.html','deluxe-room.html','blog.html'];

let successCount = 0;
files.forEach(f => {
  const path = base + f;
  if (!fs.existsSync(path)) { console.log('SKIP (not found):', f); return; }
  const content = fs.readFileSync(path, 'utf8');
  const start = content.indexOf('<nav id="navbar"');
  if (start === -1) { console.log('NO NAV:', f); return; }

  let depth = 0, end = -1, i = start;
  while (i < content.length) {
    if (content.startsWith('<nav', i)) { depth++; i += 4; }
    else if (content.startsWith('</nav>', i)) {
      depth--;
      if (depth === 0) { end = i + 6; break; }
      i += 6;
    } else { i++; }
  }
  if (end === -1) { console.log('NO CLOSE:', f); return; }

  const newContent = content.substring(0, start) + targetNav + content.substring(end);
  fs.writeFileSync(path, newContent, 'utf8');
  successCount++;
  console.log('DONE:', f);
});
console.log('Total updated:', successCount);
