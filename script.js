/* ==========================================
   DEVELOPER PORTFOLIO - ABHAY SINGH CHAUHAN
   DYNAMIC SCRIPT LOGIC (VANILLA JS)
========================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------
       1. THEME SWITCHER (DARK / LIGHT MODE)
    -------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('.class-toggle-icon');
    const body = document.body;

    // Retrieve saved theme preference, default to dark
    const currentTheme = localStorage.getItem('selected-theme') || 'dark';
    
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    // Toggle click event
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('selected-theme', 'dark');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('selected-theme', 'light');
        }
        
        // Trigger subtle haptic effect / micro-animation trigger
        themeToggleBtn.style.transform = 'scale(0.9) rotate(30deg)';
        setTimeout(() => {
            themeToggleBtn.style.transform = '';
        }, 200);
    });


    /* --------------------------------------
       2. MOBILE MENU DRAWER CONTROLLERS
    -------------------------------------- */
    const navToggleBtn = document.getElementById('nav-toggle-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const toggleIcon = navToggleBtn.querySelector('i');

    // Drawer toggler
    navToggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('menu-active');
        
        if (navMenu.classList.contains('menu-active')) {
            toggleIcon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            toggleIcon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Close mobile menu whenever clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('menu-active');
            toggleIcon.classList.replace('fa-xmark', 'fa-bars');
        });
    });


    /* --------------------------------------
       3. DYNAMIC HEADER SCROLL & TOP SCROLL
    -------------------------------------- */
    const header = document.querySelector('.header');
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        // Floating Top-Scroll visibility
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('btn-active');
        } else {
            scrollToTopBtn.classList.remove('btn-active');
        }

        // Header pill movement animation logic (disappears slightly on scroll down, reappears scroll up)
        if (window.scrollY > 100) {
            if (window.scrollY > lastScrollY && !navMenu.classList.contains('menu-active')) {
                // Scrolling down
                header.style.top = '-100px';
            } else {
                // Scrolling up
                header.style.top = '24px';
            }
        } else {
            header.style.top = '24px';
        }
        
        lastScrollY = window.scrollY;
    });


    /* --------------------------------------
       4. TYPING TEXT ENGINE
    -------------------------------------- */
    const typingTarget = document.querySelector('.typing-target');
    const words = ["B.Tech CSE Student", "Web Developer", "Problem Solver", "Tech Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function handleTyping() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingTarget.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Speed up deletion
        } else {
            typingTarget.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // Word typing complete
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Long pause at completion
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 400; // Small delay before next word
        }

        setTimeout(handleTyping, typingSpeed);
    }

    // Start text animation if target container is present
    if (typingTarget) {
        setTimeout(handleTyping, 1000);
    }


    /* --------------------------------------
       5. ACTIVE NAVIGATION ITEM HIGHLIGHTER
    -------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActiveHighlight() {
        const scrollY = window.scrollY;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 180;
            const sectionId = current.getAttribute('id');
            const correspondingNavLink = document.getElementById(`nav-${sectionId}`);
            
            if (correspondingNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingNavLink.classList.add('active-link');
                } else {
                    correspondingNavLink.classList.remove('active-link');
                }
            }
        });
    }
    
    window.addEventListener('scroll', scrollActiveHighlight);


    /* --------------------------------------
       6. SCROLL REVEAL & SKILLS PROGRESS ANIMATOR
    -------------------------------------- */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    const skillsSection = document.getElementById('skills');

    // Trigger skills bar loading animation
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const finalWidth = bar.getAttribute('data-progress');
            bar.style.width = finalWidth;
        });
    }

    // Scroll trigger intersection observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                
                // If it's the skills section, animate the bars
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                // Stop observing once animation triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Also observe the primary section containers
    if (skillsSection) {
        revealObserver.observe(skillsSection);
    }


    /* --------------------------------------
       7. CLICK-TO-COPY & TOAST NOTIFICATION
    -------------------------------------- */
    const emailCard = document.getElementById('email-card');
    const phoneCard = document.getElementById('phone-card');
    const toast = document.getElementById('toast-message');
    const toastText = document.getElementById('toast-text');

    function triggerToast(text) {
        toastText.textContent = text;
        toast.classList.add('toast-active');
        
        setTimeout(() => {
            toast.classList.remove('toast-active');
        }, 2500);
    }

    if (emailCard) {
        emailCard.addEventListener('click', () => {
            const emailTextVal = document.getElementById('email-text').textContent;
            navigator.clipboard.writeText(emailTextVal)
                .then(() => {
                    triggerToast('📧 Email copied to clipboard!');
                    
                    // Card ripple feedback visual click
                    emailCard.style.transform = 'scale(0.97)';
                    setTimeout(() => emailCard.style.transform = '', 150);
                })
                .catch(err => {
                    console.error('Failed to copy email:', err);
                });
        });
    }

    if (phoneCard) {
        phoneCard.addEventListener('click', () => {
            const phoneTextVal = document.getElementById('phone-text').textContent;
            navigator.clipboard.writeText(phoneTextVal)
                .then(() => {
                    triggerToast('📱 Phone number copied!');
                    
                    // Card feedback
                    phoneCard.style.transform = 'scale(0.97)';
                    setTimeout(() => phoneCard.style.transform = '', 150);
                })
                .catch(err => {
                    console.error('Failed to copy phone:', err);
                });
        });
    }


    /* --------------------------------------
       8. CONTACT FORM SIMULATOR
    -------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const formSubmitBtn = document.getElementById('form-submit-btn');
    const submitText = formSubmitBtn.querySelector('.submit-text');
    const submitSpinner = formSubmitBtn.querySelector('.submit-spinner');
    const formFeedback = document.getElementById('form-feedback');
    const feedbackMsg = formFeedback.querySelector('.feedback-msg');
    const feedbackIcon = formFeedback.querySelector('.feedback-icon');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop page reload
            
            // Toggle dynamic buttons
            submitText.classList.add('hidden');
            submitSpinner.classList.remove('hidden');
            formSubmitBtn.disabled = true;
            formFeedback.classList.add('hidden');
            
            // Emulate premium network delays (1.5 seconds)
            setTimeout(() => {
                // Success actions
                submitText.classList.remove('hidden');
                submitSpinner.classList.add('hidden');
                formSubmitBtn.disabled = false;
                
                // Display positive UI result elements
                formFeedback.classList.remove('hidden');
                formFeedback.className = 'form-feedback feedback-success';
                feedbackIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
                feedbackMsg.textContent = 'Thank you! Your message has been sent successfully.';
                
                // Clear fields
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formFeedback.classList.add('hidden');
                }, 5000);
                
            }, 1600);
        });
    }

    /* --------------------------------------
       9. CYBERPUNK INTERACTIVE LIGHTING ENGINE (HTML5 CANVAS)
    -------------------------------------- */
    const canvas = document.getElementById('cyber-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Active state trackers
        let scrollVelocity = 0;
        let lastScrollY = window.scrollY;
        let scrollIntensity = 0; // 0 to 1, decays slowly

        // Handle resize
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // Tracking scroll velocity & direction
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const diff = currentScrollY - lastScrollY;
            
            if (diff !== 0) {
                scrollVelocity = diff * 0.15; // raw velocity
                scrollIntensity = Math.min(scrollIntensity + Math.abs(diff) * 0.05, 5); // caps glow boost
            }
            
            lastScrollY = currentScrollY;
        });

        // Floating Backdrop Orb Class
        class BackgroundOrb {
            constructor(color, size, speed) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.baseSize = size;
                this.size = size;
                this.speedX = (Math.random() - 0.5) * speed;
                this.speedY = (Math.random() - 0.5) * speed;
                this.color = color;
                this.alpha = Math.random() * 0.15 + 0.08;
                this.angle = Math.random() * Math.PI * 2;
                this.angleSpeed = Math.random() * 0.01 + 0.005;
            }

            update(scrollOffset, intensity) {
                // Slow ambient drift
                this.x += this.speedX;
                this.y += this.speedY;

                // React to scroll direction & velocity (Parallax push)
                this.y += scrollOffset * 0.55;

                // Keep orbs inside screen borders cleanly
                if (this.x < -this.size) this.x = width + this.size;
                if (this.x > width + this.size) this.x = -this.size;
                if (this.y < -this.size) this.y = height + this.size;
                if (this.y > height + this.size) this.y = -this.size;

                // Breathing animation
                this.angle += this.angleSpeed;
                const breath = Math.sin(this.angle) * 15;
                this.size = this.baseSize + breath;

                // Scroll intensity boosting size/alpha glow
                this.currentAlpha = Math.min(this.alpha + intensity * 0.06, 0.45);
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.currentAlpha;
                const gradient = ctx.createRadialGradient(this.x, this.y, 2, this.x, this.y, this.size);
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(0.3, this.color);
                gradient.addColorStop(1, 'transparent');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        // Initialize background orbs
        const orbs = [
            new BackgroundOrb('#00f0ff', 240, 0.25), // Cyan
            new BackgroundOrb('#3a7bd5', 280, 0.2),  // Blue
            new BackgroundOrb('#7952b3', 220, 0.3),  // Purple
            new BackgroundOrb('#00f0ff', 180, 0.35)  // Cyan small
        ];

        // Animation Loop
        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Exponential decay of scroll velocity and intensity
            scrollVelocity *= 0.92;
            scrollIntensity *= 0.94;

            // Draw and update Orbs
            orbs.forEach(orb => {
                orb.update(scrollVelocity, scrollIntensity);
                orb.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();
    }

    /* --------------------------------------
       10. TIMELINE SCROLL PROGRESS & CARD VIEWPORT OBSERVER
    -------------------------------------- */
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineLineFill = document.querySelector('.timeline-line-fill');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (timelineContainer && timelineLineFill) {
        function updateTimelineScroll() {
            const containerRect = timelineContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate how much of the timeline container has entered/left the screen viewport
            const totalHeight = containerRect.height;
            const scrollStart = windowHeight * 0.75; // begins filling when container reaches 75% screen height
            const scrolledAmount = scrollStart - containerRect.top;
            
            let percent = 0;
            if (scrolledAmount > 0) {
                percent = Math.min((scrolledAmount / (totalHeight - containerRect.height * 0.15)) * 100, 100);
            }
            
            timelineContainer.style.setProperty('--timeline-scroll', `${percent}%`);
        }

        window.addEventListener('scroll', updateTimelineScroll);
        updateTimelineScroll(); // initial load calculation
    }

    if (timelineItems.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active-card');
                } else {
                    entry.target.classList.remove('active-card');
                }
            });
        }, {
            // Trigger when card occupies center 45% of viewport
            rootMargin: "-25% 0px -30% 0px",
            threshold: 0.1
        });

        timelineItems.forEach(item => {
            cardObserver.observe(item);
        });
    }

    /* --------------------------------------
       11. CERTIFICATES SHOWCASE (DYNAMIC RENDER & LIGHTBOX PREVIEW)
    -------------------------------------- */
    const certificates = [
        {
            title: "Oracle AI Foundations Associate",
            issuer: "Oracle",
            image: "images/certificates/oracle-ai.png",
            desc: "Professional credential validating foundational knowledge in AI concepts, machine learning algorithms, deep learning neural networks, and Oracle Cloud Infrastructure AI services.",
            icon: "fa-solid fa-brain"
        },
        {
            title: "Deloitte Data Analytics Job Simulation",
            issuer: "Forage / Deloitte",
            image: "images/certificates/deloitte.png",
            desc: "Completed a rigorous job simulation focusing on data analytics strategies, dashboard visualization modeling, and forensic technology solutions.",
            icon: "fa-solid fa-chart-pie"
        }
    ];

    const certificatesGrid = document.getElementById('certificates-grid');
    const lightboxModal = document.getElementById('cert-lightbox');
    const lightboxImg = document.getElementById('cert-lightbox-img-target');
    const lightboxTitle = document.getElementById('cert-lightbox-title-target');
    const lightboxIssuer = document.getElementById('cert-lightbox-issuer-target');
    const lightboxCloseBtn = document.getElementById('cert-lightbox-close-btn');
    const lightboxBackdrop = document.querySelector('.cert-lightbox-backdrop');

    if (certificatesGrid && lightboxModal && lightboxImg) {
        // Clear placeholder items
        certificatesGrid.innerHTML = '';

        // Inject certificate cards dynamically
        certificates.forEach(cert => {
            const card = document.createElement('div');
            card.className = 'cert-card scroll-reveal';
            card.setAttribute('data-cert-image', cert.image);
            card.setAttribute('data-cert-title', cert.title);
            card.setAttribute('data-cert-issuer', cert.issuer);

            card.innerHTML = `
                <div class="cert-card-border-glow"></div>
                <div class="cert-image-wrapper">
                    <!-- Cybernetic Decrypt Cover Placeholder -->
                    <div class="cert-cover-placeholder">
                        <div class="cert-cover-glow"></div>
                        <i class="${cert.icon}"></i>
                        <span class="cert-cover-text">Tap to decrypt</span>
                    </div>

                    <img src="${cert.image}" alt="${cert.title}" class="cert-thumb" loading="lazy">
                    
                    <div class="cert-image-overlay">
                        <i class="fa-solid fa-expand"></i>
                        <span>Click to View</span>
                    </div>
                </div>
                <div class="cert-card-content">
                    <span class="cert-issuer-badge">${cert.issuer}</span>
                    <h3 class="cert-card-title">${cert.title}</h3>
                    <p class="cert-card-desc">${cert.desc}</p>
                </div>
            `;

            // Open Lightbox on card click
            card.addEventListener('click', () => {
                lightboxImg.src = cert.image;
                lightboxImg.alt = cert.title;
                lightboxTitle.textContent = cert.title;
                lightboxIssuer.textContent = cert.issuer;

                lightboxModal.classList.add('modal-active');
                document.body.style.overflow = 'hidden'; // Lock background scrolling
            });

            certificatesGrid.appendChild(card);

            // Register card for scroll-reveal animation
            if (typeof revealObserver !== 'undefined') {
                revealObserver.observe(card);
            }
        });

        // Close Lightbox Preview
        function closeCertLightbox() {
            lightboxModal.classList.remove('modal-active');
            document.body.style.overflow = ''; // Restore background scrolling
            
            // Clear image source after transition closes to prevent flash
            setTimeout(() => {
                lightboxImg.src = '';
                lightboxImg.alt = '';
            }, 300);
        }

        if (lightboxCloseBtn) {
            lightboxCloseBtn.addEventListener('click', closeCertLightbox);
        }

        if (lightboxBackdrop) {
            lightboxBackdrop.addEventListener('click', closeCertLightbox);
        }

        // Close on clicking outside lightbox content panel
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeCertLightbox();
            }
        });

        // ESC Key listener
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('modal-active')) {
                closeCertLightbox();
            }
        });
    }
    
});
