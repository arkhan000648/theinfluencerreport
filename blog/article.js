document.addEventListener('DOMContentLoaded', () => {

    // --- 1. AUTOMATIC DATA POPULATION (Dates, Slugs, Schema) ---
    const initDynamicData = () => {
        // A. GET SLUG FROM URL
        const path = window.location.pathname;
        // Removes empty strings, gets the last part (folder name)
        const pathParts = path.split('/').filter(Boolean);
        let slug = pathParts[pathParts.length - 1]; 
        
        // Convert "first-demo-article" to "First Demo Article" for display
        const readableSlug = slug.replace(/-/g, ' ');

        // B. INSERT SLUG INTO BREADCRUMBS
        const breadcrumbSpan = document.getElementById('dynamicBreadcrumbSlug');
        if (breadcrumbSpan) {
            breadcrumbSpan.textContent = readableSlug;
        }

        // C. GET AUTOMATIC DATE (Last Modified)
        // On GitHub Pages, lastModified is the deploy time.
        const lastMod = new Date(document.lastModified);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = lastMod.toLocaleDateString('en-US', options);
        
        // Insert into Visible Meta
        const dateSpan = document.getElementById('dynamicDate');
        if (dateSpan) {
            dateSpan.textContent = formattedDate;
        }

        // D. GENERATE & INJECT SCHEMA (JSON-LD) AUTOMATICALLY
        // We construct the schema object based on page data
        const schemaData = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://theinfluencerreport.org/" },
                        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://theinfluencerreport.org/blog/" },
                        { "@type": "ListItem", "position": 3, "name": readableSlug, "item": window.location.href }
                    ]
                },
                {
                    "@type": "BlogPosting",
                    "mainEntityOfPage": { "@type": "WebPage", "@id": window.location.href },
                    "headline": document.title,
                    "image": document.querySelector('meta[property="og:image"]')?.content || "",
                    "author": { "@type": "Person", "name": "Md Ashikuzzaman", "url": "https://theinfluencerreport.org/about/" },
                    "publisher": { 
                        "@type": "Organization", 
                        "name": "The Influencer Report", 
                        "logo": { "@type": "ImageObject", "url": "https://theinfluencerreport.org/theinfluencerreporticon.png" } 
                    },
                    // ISO 8601 Format for Schema
                    "datePublished": "2025-10-27T08:00:00+00:00", // Fallback or keep static if needed, but modified is dynamic
                    "dateModified": lastMod.toISOString() 
                }
            ]
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schemaData);
        document.head.appendChild(script);
    };

    initDynamicData();


    // --- 2. Standard UI Logic (Progress Bar, Menu, Animation) ---
    
    // Progress Bar
    const progressBar = document.getElementById('progressBar');
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const { scrollTop, scrollHeight } = document.documentElement;
                const scrollableHeight = scrollHeight - window.innerHeight;
                const scrollPercent = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
                progressBar.style.width = `${scrollPercent}%`;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mobile Menu
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            const isActive = nav.classList.contains('nav-active');
            navLinks.forEach((link, index) => {
                link.style.animation = link.style.animation ? '' : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            });
            burger.classList.toggle('toggle');
            burger.setAttribute('aria-expanded', isActive);
        });
    }

    // Scroll Animations
    if (document.fonts) {
        document.fonts.ready.then(() => {
            const animatedElements = document.querySelectorAll('[data-animate]');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { root: null, threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
            
            animatedElements.forEach(el => observer.observe(el));
        });
    }
});
