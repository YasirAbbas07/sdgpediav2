
document.addEventListener('DOMContentLoaded', () => {
    // Create back to top button
    const backButton = document.createElement('a');
    backButton.href = '#';
    backButton.className = 'fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg z-50 hover:bg-secondary transition opacity-0 pointer-events-none';
    backButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 15l-6-6-6 6"/>
        </svg>
    `;
    document.body.appendChild(backButton);

    // Show/hide button based on scroll position
    function toggleBackButton() {
        if (window.scrollY > 300) {
            backButton.classList.remove('opacity-0', 'pointer-events-none');
            backButton.classList.add('opacity-100', 'pointer-events-auto');
        } else {
            backButton.classList.add('opacity-0', 'pointer-events-none');
            backButton.classList.remove('opacity-100', 'pointer-events-auto');
        }
    }

    // Initialize check
    toggleBackButton();

    // Listen for scroll events with debounce
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(toggleBackButton, 50);
    }, { passive: true });

    // Scroll to top when clicked
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Enable smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
