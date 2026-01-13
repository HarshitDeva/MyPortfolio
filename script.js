    // Toggle Menu Function
    function toggleMenu() {
        const menu = document.querySelector(".menu-links");
        const icon = document.querySelector(".hamburger-icon");
        menu.classList.toggle("open");
        icon.classList.toggle("open");
    }

    // Typing Animation
    document.addEventListener('DOMContentLoaded', function() {
        const greeting = "Hello, I'm";
        const name = "Harshit Deva";
        const role = "Full Stack Developer";
        
        const greetingElement = document.getElementById('greeting');
        const nameElement = document.getElementById('name');
        const roleElement = document.getElementById('role');
        
        function typeText(element, text, delay) {
            return new Promise(resolve => {
                let currentText = '';
                let index = 0;
                
                function type() {
                    if (index < text.length) {
                        currentText += text.charAt(index);
                        element.textContent = currentText;
                        index++;
                        setTimeout(type, 100);
                    } else {
                        element.classList.add('cursor');
                        setTimeout(() => {
                            element.classList.remove('cursor');
                            resolve();
                        }, 500);
                    }
                }
                
                setTimeout(() => {
                    type();
                }, delay);
            });
        }
        
        async function startTyping() {
            await typeText(greetingElement, greeting, 0);
            await typeText(nameElement, name, 100);
            await typeText(roleElement, role, 100);
        }
        
        startTyping();

        // Enhanced External Link Handler
        document.addEventListener('click', function(e) {
            // Handle all anchor tags
            if (e.target.tagName === 'A') {
                const link = e.target;
                
                // Check if it's an external link (not a hash link for navigation)
                if (link.href && !link.href.startsWith('#') && !link.href.includes(window.location.hostname)) {
                    // If target is not set, set it to _blank for external links
                    if (!link.target) {
                        e.preventDefault();
                        window.open(link.href, '_blank', 'noopener,noreferrer');
                    }
                }
            }
            
            // Handle button clicks with URLs
            if (e.target.classList.contains('project-btn') || e.target.classList.contains('btn')) {
                const onclickAttr = e.target.getAttribute('onclick');
                if (onclickAttr && onclickAttr.includes('location.href')) {
                    e.preventDefault();
                    // Extract URL from location.href
                    const urlMatch = onclickAttr.match(/location\.href=['"]([^'"]+)['"]/);
                    if (urlMatch && urlMatch[1]) {
                        // Check if it's an external URL
                        if (urlMatch[1].startsWith('http')) {
                            window.open(urlMatch[1], '_blank', 'noopener,noreferrer');
                        } else {
                            // For internal links like #contact, navigate normally
                            window.location.href = urlMatch[1];
                        }
                    }
                }
            }
        });

        // Project Filter Functionality
        const tabButtons = document.querySelectorAll('.tab-btn');
        const projectItems = document.querySelectorAll('.project-item');

        // Show all projects initially
        projectItems.forEach(item => {
            item.classList.add('show');
        });

        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filter = this.getAttribute('data-filter');
                
                // Filter projects with animation
                projectItems.forEach(item => {
                    item.classList.remove('show');
                    
                    setTimeout(() => {
                        if (filter === 'all') {
                            item.classList.add('show');
                        } else if (item.getAttribute('data-category') === filter) {
                            item.classList.add('show');
                        }
                    }, 100);
                });
            });
        });

        // Smooth Scroll for Navigation Links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId !== '#' && targetId.length > 1) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Parallax Effect for Background Symbols
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const symbols = document.querySelectorAll('.symbol');
            
            symbols.forEach((symbol, index) => {
                const speed = 0.5 + (index * 0.1);
                symbol.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
            });
        });

        // Add Hover Effect to Skills
        const articles = document.querySelectorAll('article');
        
        articles.forEach(article => {
            article.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) translateY(-3px)';
            });
            
            article.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) translateY(0)';
            });
        });

        // Enhanced Project Card Hover
        const projectCards = document.querySelectorAll('.project-item');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.zIndex = '1';
            });
        });

        // Glitch Effect Enhancement on Profile Image
        const profileImg = document.querySelector('.section__pic-container img');
        
        if (profileImg) {
            profileImg.addEventListener('mouseenter', function() {
                this.style.animation = 'glitch 0.5s infinite';
            });
            
            profileImg.addEventListener('mouseleave', function() {
                this.style.animation = 'glitch 10s infinite';
            });
        }

        // Dynamic Navigation Highlight
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').slice(1) === current) {
                    item.style.color = '#1F51FF';
                    item.style.textShadow = '0 0 10px #1F51FF';
                } else {
                    item.style.color = '';
                    item.style.textShadow = '';
                }
            });
        });

        // Add Loading Animation to Buttons
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                if (!this.classList.contains('loading')) {
                    // Add ripple effect
                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple');
                    this.appendChild(ripple);
                    
                    const x = e.clientX - this.offsetLeft;
                    const y = e.clientY - this.offsetTop;
                    
                    ripple.style.left = `${x}px`;
                    ripple.style.top = `${y}px`;
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                }
            });
        });

        // Intersection Observer for Fade-in Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all sections for fade-in
        const elementsToObserve = document.querySelectorAll('.details-container, .about-pic, article');
        
        elementsToObserve.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s ease';
            observer.observe(element);
        });

        // Dynamic Year in Footer
        const currentYear = new Date().getFullYear();
        const footerText = document.querySelector('footer p');
        if (footerText) {
            footerText.textContent = `Copyright © ${currentYear} Harshit Deva. All Rights Reserved.`;
        }

        // Console Easter Egg
        console.log('%c Welcome to My Portfolio! 🚀', 'color: #1F51FF; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(31,81,255,0.3);');
        console.log('%c Looking for a developer? Let\'s connect! 💻', 'color: #0ff; font-size: 14px;');
        console.log('%c Email: harshit.deva3005@gmail.com', 'color: #fff; font-size: 12px;');
        
        // Add security attributes to all external links
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(link => {
            if (!link.hasAttribute('rel')) {
                link.setAttribute('rel', 'noopener noreferrer');
            }
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
            }
        });
    });