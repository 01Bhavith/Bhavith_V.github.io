document.addEventListener('DOMContentLoaded', () => {

    const preloader = document.getElementById('preloader');

    // 1. Smart Preloader Logic (Plays on Refresh/New Visit, Skips on Back Button)
    const navEntries = performance.getEntriesByType("navigation");
    const isBackForward = navEntries.length > 0 && navEntries[0].type === "back_forward";

    if (!isBackForward) {
        // Fresh visit or page refresh: Play the animation
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);

        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.style.overflow = '';
                window.scrollTo(0, 0); 
            }, 800);
        }, 4000); // 4 seconds total preloader sequence

    } else {
        // User clicked the Back button: Instantly hide preloader, restore scroll
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'auto'; 
        }
        if (preloader) {
            preloader.style.display = 'none';
        }
        document.body.style.overflow = '';
    }

    // 2. Dynamic Footer Year
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 3. Matrix Rain Canvas Logic (Performance Upgraded)
    const canvas = document.getElementById('matrix-canvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const binary = '01';
        const characters = binary.split('');
        const fontSize = 16;
        let columns = canvas.width / fontSize;

        let drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        let lastDrawTime = 0;
        const fpsInterval = 35; // 35ms per frame

        function drawMatrix(timestamp) {
            requestAnimationFrame(drawMatrix);

            const elapsed = timestamp - lastDrawTime;
            if (elapsed > fpsInterval) {
                lastDrawTime = timestamp - (elapsed % fpsInterval);

                ctx.fillStyle = 'rgba(10, 14, 20, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#00ff41';
                ctx.font = fontSize + 'px monospace';

                for (let i = 0; i < drops.length; i++) {
                    const text = characters[Math.floor(Math.random() * characters.length)];
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }
            }
        }
        requestAnimationFrame(drawMatrix);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = canvas.width / fontSize;
            drops = [];
            for (let x = 0; x < columns; x++) {
                drops[x] = 1;
            }
        }, { passive: true });
    }

    // 4. Scroll Logic (Navbar visibility & Matrix Canvas Opacity)
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const landingHeight = window.innerHeight;

        if (navbar) {
            if (window.scrollY > landingHeight * 0.8) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        if (canvas) {
            if (window.scrollY > landingHeight * 0.3) {
                canvas.style.opacity = '0.12'; 
            } else {
                canvas.style.opacity = '0';
            }
        }
    }, { passive: true });

    // 5. 3D Tilt Effect for Project and Skill Cards
    const cards = document.querySelectorAll('.tilt-card');
    
    const isTouchDevice = () => {
        return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
    };

    if (!isTouchDevice()) {
        cards.forEach(card => {
            const glow = card.querySelector('.card-glow');

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;  

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -4; 
                const rotateY = ((x - centerX) / centerX) * 4;

                card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
                
                if(glow) {
                    glow.style.left = `${x}px`;
                    glow.style.top = `${y}px`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    // 6. Scroll Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        scrollObserver.observe(el);
    });
});