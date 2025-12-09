document.addEventListener('DOMContentLoaded', () => {

    // --- 1. AUTOMATIC DATA POPULATION (Dates, Slugs, Schema) ---
    const initDynamicData = () => {
        // A. GET SLUG FROM URL
        const path = window.location.pathname;
        const pathParts = path.split('/').filter(Boolean);
        let slug = pathParts[pathParts.length - 1]; 
        
        // Convert "first-demo-article" to "First Demo Article"
        const readableSlug = slug ? slug.replace(/-/g, ' ') : "Article";

        // B. INSERT SLUG INTO BREADCRUMBS
        const breadcrumbSpan = document.getElementById('dynamicBreadcrumbSlug');
        if (breadcrumbSpan) {
            breadcrumbSpan.textContent = readableSlug;
        }

        // C. GET AUTOMATIC DATE (Last Modified)
        const lastMod = new Date(document.lastModified);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = lastMod.toLocaleDateString('en-US', options);
        
        // Insert into Visible Meta
        const dateSpan = document.getElementById('dynamicDate');
        if (dateSpan) {
            dateSpan.textContent = formattedDate;
        }

        // D. GENERATE & INJECT SCHEMA (JSON-LD) AUTOMATICALLY
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
                    "datePublished": "2025-10-27T08:00:00+00:00", 
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


    // --- 2. Standard UI Logic (Progress Bar & Menu) ---
    
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
});
