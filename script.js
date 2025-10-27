document.addEventListener('DOMContentLoaded', () => {

    // --- Optimized Reading Progress Bar Logic ---
    // This can run immediately, no changes needed here.
    const progressBar = document.getElementById('progressBar');
    let ticking = false;
    
    const updateProgressBar = () => {
        const { scrollTop, scrollHeight } = document.documentElement;
        const scrollableHeight = scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollableHeight) * 100;
        
        progressBar.style.width = `${scrollPercent}%`;
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateProgressBar);
            ticking = true;
        }
    });

    // --- Mobile Navigation Logic ---
    // This can also run immediately, no changes needed here.
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        const isActive = nav.classList.contains('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
        burger.setAttribute('aria-expanded', isActive);
        burger.setAttribute('aria-label', isActive ? 'Close navigation menu' : 'Open navigation menu');
    });


    // --- THIS IS THE CRITICAL CHANGE ---
    // We now wait for all fonts to be ready before setting up the scroll animation.
    document.fonts.ready.then(() => {
    
        // --- Scroll Animation Logic using Intersection Observer ---
        // This code now runs ONLY AFTER the fonts are loaded.
        const animatedElements = document.querySelectorAll('[data-animate]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1 
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });

    }); // The .then() block for fonts.ready ends here.

    // --- Ultra-Modern Card Glow Effect ---
    const cards = document.querySelectorAll('.next-step-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
    
});

