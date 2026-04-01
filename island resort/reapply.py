import os

dir_path = '.'
html_files = [f for f in os.listdir(dir_path) if f.endswith('.html')]

modal_html = """
    <!-- ==================== BOOKING MODAL ==================== -->
    <div id="v3-booking-modal" class="v3-bm-overlay" aria-hidden="true">
      <div class="v3-bm-left"></div>
      <div class="v3-bm-right">
        <button id="v3-bm-close" class="v3-bm-close-btn" aria-label="Close booking modal">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <div class="v3-bm-content">
          <h2 class="v3-bm-title">Book Your Stay</h2>
          <p class="v3-bm-desc">
            Welcome to CozyStay Pacific Hotel. Nestled in the heart of the Pacific Islands resort, on the edge of a tranquil and beautiful Garden Island, CozyStay is a haven of warmth, tranquility and rejuvenation.
          </p>
          <div class="v3-bm-grid">
            <div class="v3-bm-input-group">
              <span class="v3-bm-input-label">Check In</span>
              <span class="v3-bm-input-val">2026-04-02 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 9l-7 7-7-7"/></svg></span>
            </div>
            <div class="v3-bm-input-group">
              <span class="v3-bm-input-label">Check Out</span>
              <span class="v3-bm-input-val">2026-04-03 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 9l-7 7-7-7"/></svg></span>
            </div>
            <div class="v3-bm-input-group">
              <span class="v3-bm-input-label">Rooms</span>
              <span class="v3-bm-input-val">1 Room <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 9l-7 7-7-7"/></svg></span>
            </div>
            <div class="v3-bm-input-group">
              <span class="v3-bm-input-label">Guests</span>
              <span class="v3-bm-input-val">1 Adult, 0 Children <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 9l-7 7-7-7"/></svg></span>
            </div>
          </div>
          <button class="v3-bm-btn">Check Availability</button>
          <div class="v3-bm-footer-rules">
            <span><b class="v3-bm-bullet">&bull;</b> Check-in: 3pm</span>
            <span><b class="v3-bm-bullet">&bull;</b> Check-out: 11am</span>
            <span><b class="v3-bm-bullet">&bull;</b> Minimum Check-in Age: 18</span>
          </div>
        </div>
      </div>
    </div>
"""

css_tag = '    <link rel="stylesheet" href="v3-booking-modal.css" />\n'
js_tag = '    <script src="v3-booking-modal.js"></script>\n'

for f_name in html_files:
    file_path = os.path.join(dir_path, f_name)
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update stay links
    content = content.replace('href="v3-stay.html"', 'href="v3-rooms.html"')
    
    # 2. Update booking links
    content = content.replace('href="#booking-v3"', 'href="v3-rooms.html"')
    content = content.replace('href="index3.html#booking-v3"', 'href="v3-rooms.html"')

    # 3. Inject modal HTML
    if 'id="v3-booking-modal"' not in content:
        content = content.replace('</body>', f"{modal_html}\n{js_tag}</body>")
    else:
        if 'v3-booking-modal.js' not in content:
            content = content.replace('</body>', f"{js_tag}</body>")
            
    # Inject modal CSS
    if 'v3-booking-modal.css' not in content:
        content = content.replace('</head>', f"{css_tag}</head>")
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Applied links and modal injection to all {len(html_files)} files.")
