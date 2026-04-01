document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('v3-booking-modal');
    if (!modal) return;
    const closeBtn = document.getElementById('v3-bm-close');
    
    const bookBtns = document.querySelectorAll('.v3-book-btn, .v3-overlay-book');
    bookBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
        });
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });
});
