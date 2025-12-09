document.addEventListener('DOMContentLoaded', () => {

    // 1. Reading Progress Bar
    const progressBar = document.getElementById('progressBar');
    let ticking = false;
    
    const updateProgressBar = () => {
        const { scrollTop, scrollHeight } = document.documentElement;
        const scrollableHeight = scrollHeight - window.innerHeight;
        // Prevent division by zero if page is short
        const scrollPercent = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
        
        progressBar.style.width = `${scrollPercent}%`;
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateProgressBar);
            ticking = true;
        }
    });

    // 2. Mobile Navigation Logic
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
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
        });
    }

    // 3. Scroll Animations (IntersectionObserver)
    // We wrap this in fonts.ready to ensure no layout shifts affect animation triggers
    document.fonts.ready.then(() => {
        const animatedElements = document.querySelectorAll('[data-animate]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Stop observing once visible to save resources
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px" // Triggers slightly before element hits bottom of viewport
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    });

});
