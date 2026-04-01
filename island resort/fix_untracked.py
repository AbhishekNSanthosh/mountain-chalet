import os
import re

with open('v3-activities.html', 'r', encoding='utf-8') as f:
    activities_html = f.read()

# Extract from activities: head part, overlay, navbar
# Extract footer and below
head_match = re.search(r'(<head>.*?</head>)', activities_html, re.DOTALL)
overlay_nav_match = re.search(r'(<!-- ==================== FULLSCREEN OVERLAY MENU ==================== -->.*?<!-- ==================== PAGE TITLE ==================== -->)', activities_html, re.DOTALL)
footer_match = re.search(r'(<!-- ==================== FOOTER ==================== -->.*</html>)', activities_html, re.DOTALL)

with open('v3-activity-detail.html', 'r', encoding='utf-8') as f:
    detail_html = f.read()

# Replace the broken parts in detail_html
# In v3-activity-detail.html, from <!-- OVERLAY --> up to <!-- HERO -->
detail_hero_start = detail_html.find('<!-- HERO -->')
detail_body_start = detail_html.find('<body>')

if detail_hero_start != -1 and detail_body_start != -1:
    new_top = activities_html[activities_html.find('<body>') + 6 : activities_html.find('<!-- ==================== PAGE TITLE ==================== -->')]
    # We want to replace everything from <body> to <!-- HERO --> with the new_top
    detail_html = detail_html[:detail_body_start + 6] + '\n' + new_top + '\n' + detail_html[detail_hero_start:]

# Replace footer: from <!-- FOOTER --> to end
detail_footer_start = detail_html.find('<!-- FOOTER -->')
if detail_footer_start != -1:
    detail_html = detail_html[:detail_footer_start] + footer_match.group(1)

with open('v3-activity-detail.html', 'w', encoding='utf-8') as f:
    f.write(detail_html)

print("v3-activity-detail.html restored successfully.")

# NOW RECREATE v3-room-details-top-gallery.html
with open('v3-room-details-top-image.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('<!-- Bootstrap 5 -->', '<!-- Swiper CSS -->\n    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />\n\n    <!-- Bootstrap 5 -->')

hero_old = """    <!-- ==================== HERO ==================== -->
    <section class="rd-hero">
      <img
        src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2000&auto=format&fit=crop"
        alt="Premier Oceanview Villa"
      />
    </section>"""

hero_new = """    <!-- ==================== HERO GALLERY ==================== -->
    <section class="rd-hero-gallery" style="position: relative; width: 100%; height: 62vh; min-height: 480px; overflow: hidden; background: #000;">
      <style>
        .rd-gallery-swiper { width: 100%; height: 100%; }
        .rd-gallery-swiper .swiper-slide {
          width: 70%;
          height: 100%;
          opacity: 0.5;
          transition: opacity 0.4s ease;
        }
        .rd-gallery-swiper .swiper-slide-active {
          opacity: 1;
        }
        .rd-gallery-swiper .swiper-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .rd-gallery-swiper .swiper-button-next,
        .rd-gallery-swiper .swiper-button-prev {
          background: rgba(255, 255, 255, 0.95);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          color: #1e1c18;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .rd-gallery-swiper .swiper-button-next::after,
        .rd-gallery-swiper .swiper-button-prev::after {
          font-size: 14px;
          font-weight: bold;
        }
        .rd-gallery-swiper .swiper-pagination-bullet {
          background: #fff;
          opacity: 0.6;
        }
        .rd-gallery-swiper .swiper-pagination-bullet-active {
          background: #fff;
          opacity: 1;
        }
      </style>
      <div class="swiper rd-gallery-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2000&auto=format&fit=crop" alt="Gallery Image 1" />
          </div>
          <div class="swiper-slide">
            <img src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2000&auto=format&fit=crop" alt="Gallery Image 2" />
          </div>
          <div class="swiper-slide">
            <img src="https://images.unsplash.com/photo-1574643003056-11f8e136b6f6?q=80&w=2000&auto=format&fit=crop" alt="Gallery Image 3" />
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
        <!-- Add Navigation -->
        <div class="swiper-button-next" style="right: 11%;"></div>
        <div class="swiper-button-prev" style="left: 11%;"></div>
      </div>
    </section>"""

if hero_old in html:
    html = html.replace(hero_old, hero_new)

html = html.replace('Oceanview Villa', 'Beachfront Suite')
html = html.replace('Ocean View / Single Level', 'Beachfront Access / Private Pool')
html = html.replace('From <span>$599</span>/night', 'From <span>$399</span>/night')
html = html.replace('>$599<', '>$399<')
html = html.replace('const baseNight = 599;', 'const baseNight = 399;')

js_str = """    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>"""
js_new = """    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
    <script>
      new Swiper('.rd-gallery-swiper', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    </script>"""
if js_str in html:
    html = html.replace(js_str, js_new)

with open('v3-room-details-top-gallery.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("v3-room-details-top-gallery.html recreated successfully.")
