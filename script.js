document.addEventListener('DOMContentLoaded', () => {

    // --- Reading Progress Bar Logic ---
    const progressBar = document.getElementById('progressBar');
    
    const updateProgressBar = () => {
        const { scrollTop, scrollHeight } = document.documentElement;
        const scrollableHeight = scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollableHeight) * 100;
        
        progressBar.style.width = `${scrollPercent}%`;
    };
    
    window.addEventListener('scroll', updateProgressBar);

    // --- Mobile Navigation Logic ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });


    // --- Scroll Animation Logic using Intersection Observer ---
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
    
});