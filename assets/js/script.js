// ===== DOM ELEMENTS =====
const themeToggle = document.getElementById('theme-toggle');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

// ===== THEME TOGGLE =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    navMenu.classList.toggle('show');
    const icon = navToggle.querySelector('i');
    icon.className = navMenu.classList.contains('show') ? 'fas fa-times' : 'fas fa-bars';
}

function closeMobileMenu() {
    navMenu.classList.remove('show');
    const icon = navToggle.querySelector('i');
    icon.className = 'fas fa-bars';
}

// ===== TYPEWRITER EFFECT =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.getAttribute('data-text');
        if (text) {
            // Delay to ensure page is loaded
            setTimeout(() => {
                typeWriter(typewriterElement, text, 80);
            }, 500);
        }
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    closeMobileMenu();
                }
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
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

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.highlight, .feature-card, .plan-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        // Update for dark theme
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            if (currentScrollY > 100) {
                header.style.background = 'rgba(15, 23, 42, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
                header.style.boxShadow = 'none';
            }
        }

        lastScrollY = currentScrollY;
    });
}

// ===== FLOATING ANIMATION ENHANCEMENT =====
function enhanceFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach((element, index) => {
        // Add slight delay to each floating element for more natural movement
        element.style.animationDelay = `${index * 0.5}s`;
        
        // Add mouse interaction
        element.addEventListener('mouseenter', () => {
            element.style.animationPlayState = 'paused';
            element.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.animationPlayState = 'running';
            element.style.transform = '';
        });
    });
}

// ===== BUTTON RIPPLE EFFECT =====
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== LAZY LOADING FOR IMAGES =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== PERFORMANCE OPTIMIZATION =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== EVENT LISTENERS =====
function initEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Mobile menu
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250));
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

// ===== INITIALIZATION =====
//function init() {
//    initTheme();
//    initTypewriter();
//    initSmoothScrolling();
//    initScrollAnimations();
//    initHeaderScrollEffect();
//    enhanceFloatingAnimation();
//    addRippleEffect();
//    initLazyLoading();
//    initEventListeners();

//    // Add loaded class to body for CSS animations
//    document.body.classList.add('loaded');
//}

function init() {
    initTheme();
    initTypewriter();
    initSmoothScrolling();
    initScrollAnimations();
    initHeaderScrollEffect();
    enhanceFloatingAnimation();
    addRippleEffect();
    initLazyLoading();
    initEventListeners();
    initCarousel(); // Adicione esta linha

    document.body.classList.add('loaded');
}

// ===== CSS FOR RIPPLE EFFECT =====
const rippleCSS = `
.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.lazy {
    opacity: 0;
    transition: opacity 0.3s;
}

body.loaded .lazy {
    opacity: 1;
}
`;

// Add CSS to head
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// ===== START APPLICATION =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}


// ===== ADVANCED ANIMATIONS =====

// Enhanced scroll animations with Intersection Observer
function initAdvancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation for grid items
                if (entry.target.parentElement.classList.contains('features__grid') ||
                    entry.target.parentElement.classList.contains('plans__grid')) {
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animateElements = document.querySelectorAll(
        '.feature-card, .plan-card, .contact__card, .highlight, .product__image, .hero__content > *'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero__image-container');
    
    if (!hero || !heroImage) return;
    
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled < hero.offsetHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    }, 10));
}

// Enhanced typewriter effect with multiple texts
function initEnhancedTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;
    
    const texts = [
        'Gestão Empresarial Completa',
        'Software Profissional WPF',
        'Controle Total do Negócio',
        'Tecnologia MVVM Avançada'
    ];
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentText = texts[currentTextIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentCharIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start after page load
    setTimeout(typeEffect, 1000);
}

// Animated counter for statistics
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Mouse trail effect
function initMouseTrail() {
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        for (let i = trail.length - 1; i > 0; i--) {
            trail[i].style.left = trail[i - 1].style.left;
            trail[i].style.top = trail[i - 1].style.top;
        }
        
        trail[0].style.left = mouseX + 'px';
        trail[0].style.top = mouseY + 'px';
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

// Magnetic effect for buttons
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn--primary');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// Tilt effect for cards
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.feature-card, .plan-card');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Smooth reveal animation for sections
function initSectionReveal() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-revealed');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        observer.observe(section);
    });
}

// Dynamic background particles
function initBackgroundParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Enhanced button click effect
function enhanceButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Remove existing ripples
            const existingRipples = this.querySelectorAll('.ripple');
            existingRipples.forEach(ripple => ripple.remove());
            
            // Create new ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            `;
            
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Add success animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize all advanced animations
function initAdvancedFeatures() {
    initAdvancedScrollAnimations();
    initParallaxEffect();
    initEnhancedTypewriter();
    animateCounters();
    initMagneticEffect();
    initTiltEffect();
    initSectionReveal();
    enhanceButtonEffects();
    
    // Only add resource-intensive effects on desktop
    if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        initMouseTrail();
        initBackgroundParticles();
    }
}

// Add CSS for section reveal
const advancedCSS = `
.section-hidden {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease;
}

.section-revealed {
    opacity: 1;
    transform: translateY(0);
}

.trail-dot {
    transition: all 0.1s ease !important;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const advancedStyle = document.createElement('style');
advancedStyle.textContent = advancedCSS;
document.head.appendChild(advancedStyle);

// Update initialization
const originalInit = init;
init = function() {
    originalInit();
    initAdvancedFeatures();
};


// ===== CAROUSEL FUNCTIONALITY =====

class ImageCarousel {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.carousel-track');
        this.slides = container.querySelectorAll('.carousel-slide');
        this.prevBtn = container.querySelector('.carousel-btn--prev');
        this.nextBtn = container.querySelector('.carousel-btn--next');
        this.indicators = container.querySelectorAll('.carousel-indicator');
        this.thumbnails = document.querySelectorAll('.thumbnail');
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isAutoPlaying = true;
        this.autoPlayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startAutoPlay();
        this.updateCarousel();
    }
    
    setupEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Thumbnails
        this.thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch events
        this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.track.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Mouse events for desktop
        this.track.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.track.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.track.addEventListener('mouseleave', () => this.handleMouseLeave());
        
        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // Pause auto-play on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.container.addEventListener('mouseleave', () => this.resumeAutoPlay());
        
        // Pause auto-play when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoPlay();
            } else {
                this.resumeAutoPlay();
            }
        });
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel('next');
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel('prev');
    }
    
    goToSlide(index) {
        if (index === this.currentSlide) return;
        
        const direction = index > this.currentSlide ? 'next' : 'prev';
        this.currentSlide = index;
        this.updateCarousel(direction);
    }
    
    updateCarousel(direction = null) {
        // Update slides
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'slide-in-left', 'slide-in-right');
            
            if (index === this.currentSlide) {
                slide.classList.add('active');
                
                if (direction === 'next') {
                    slide.classList.add('slide-in-right');
                } else if (direction === 'prev') {
                    slide.classList.add('slide-in-left');
                }
            }
        });
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update thumbnails
        this.thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update track position
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Trigger custom event
        this.container.dispatchEvent(new CustomEvent('slideChange', {
            detail: { currentSlide: this.currentSlide, direction }
        }));
    }
    
    startAutoPlay() {
        if (!this.isAutoPlaying) return;
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
        
        this.container.classList.add('auto-playing');
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        this.container.classList.remove('auto-playing');
    }
    
    resumeAutoPlay() {
        if (this.isAutoPlaying && !this.autoPlayInterval) {
            this.startAutoPlay();
        }
    }
    
    toggleAutoPlay() {
        this.isAutoPlaying = !this.isAutoPlaying;
        
        if (this.isAutoPlaying) {
            this.startAutoPlay();
        } else {
            this.pauseAutoPlay();
        }
    }
    
    // Touch handling
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.pauseAutoPlay();
    }
    
    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleSwipe();
        this.resumeAutoPlay();
    }
    
    // Mouse handling for desktop
    handleMouseDown(e) {
        this.touchStartX = e.clientX;
        this.track.style.cursor = 'grabbing';
        this.pauseAutoPlay();
    }
    
    handleMouseUp(e) {
        this.touchEndX = e.clientX;
        this.handleSwipe();
        this.track.style.cursor = 'grab';
        this.resumeAutoPlay();
    }
    
    handleMouseLeave() {
        this.track.style.cursor = 'grab';
        this.resumeAutoPlay();
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = this.touchStartX - this.touchEndX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    // Keyboard navigation
    handleKeyDown(e) {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.prevSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSlide();
                break;
            case ' ':
                e.preventDefault();
                this.toggleAutoPlay();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides - 1);
                break;
        }
    }
    
    // Public methods
    destroy() {
        this.pauseAutoPlay();
        // Remove event listeners if needed
    }
    
    getCurrentSlide() {
        return this.currentSlide;
    }
    
    getTotalSlides() {
        return this.totalSlides;
    }
}

// Lightbox functionality
class ImageLightbox {
    constructor() {
        this.isOpen = false;
        this.currentImage = null;
        this.lightboxElement = null;
        this.init();
    }
    
    init() {
        this.createLightbox();
        this.setupEventListeners();
    }
    
    createLightbox() {
        this.lightboxElement = document.createElement('div');
        this.lightboxElement.className = 'lightbox';
        this.lightboxElement.innerHTML = `
            <div class="lightbox__overlay"></div>
            <div class="lightbox__content">
                <img class="lightbox__image" src="" alt="">
                <button class="lightbox__close" aria-label="Fechar lightbox">
                    <i class="fas fa-times"></i>
                </button>
                <div class="lightbox__caption"></div>
            </div>
        `;
        
        document.body.appendChild(this.lightboxElement);
    }
    
    setupEventListeners() {
        const overlay = this.lightboxElement.querySelector('.lightbox__overlay');
        const closeBtn = this.lightboxElement.querySelector('.lightbox__close');
        
        overlay.addEventListener('click', () => this.close());
        closeBtn.addEventListener('click', () => this.close());
        
        document.addEventListener('keydown', (e) => {
            if (this.isOpen && e.key === 'Escape') {
                this.close();
            }
        });
        
        // Add click listeners to carousel slides
        document.querySelectorAll('.carousel-slide').forEach(slide => {
            slide.addEventListener('click', (e) => {
                const img = slide.querySelector('.carousel-image');
                const caption = slide.querySelector('.carousel-caption');
                
                if (img) {
                    this.open(img.src, img.alt, caption?.textContent || '');
                }
            });
        });
    }
    
    open(src, alt, caption) {
        const img = this.lightboxElement.querySelector('.lightbox__image');
        const captionEl = this.lightboxElement.querySelector('.lightbox__caption');
        
        img.src = src;
        img.alt = alt;
        captionEl.textContent = caption;
        
        this.lightboxElement.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
    }
    
    close() {
        this.lightboxElement.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;
    }
}

// Initialize carousel and lightbox
//function initCarousel() {
//    const carouselContainer = document.querySelector('.carousel-container');
//    if (carouselContainer) {
//        const carousel = new ImageCarousel(carouselContainer);

//        // Store carousel instance globally for debugging
//        window.carousel = carousel;

//        // Add progress indicator
//        const progressBar = document.createElement('div');
//        progressBar.className = 'carousel-progress';
//        carouselContainer.appendChild(progressBar);

//        // Update progress on slide change
//        carouselContainer.addEventListener('slideChange', (e) => {
//            const progress = ((e.detail.currentSlide + 1) / carousel.getTotalSlides()) * 100;
//            progressBar.style.width = `${progress}%`;
//        });
//    }

//    // Initialize lightbox
//    const lightbox = new ImageLightbox();
//    window.lightbox = lightbox;
//}


function initCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return;

    // Elementos do carrossel
    const track = carouselContainer.querySelector('.carousel-track');
    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    const prevBtn = carouselContainer.querySelector('#carousel-prev');
    const nextBtn = carouselContainer.querySelector('#carousel-next');
    const indicators = Array.from(carouselContainer.querySelectorAll('.carousel-indicator'));
    const thumbnails = Array.from(document.querySelectorAll('.thumbnail'));

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Função para atualizar o carrossel
    function updateCarousel() {
        // Atualiza posição do track
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Atualiza slides ativos
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });

        // Atualiza indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });

        // Atualiza thumbnails
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === currentSlide);
        });
    }

    // Navegação
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = parseInt(indicator.getAttribute('data-slide'));
            goToSlide(index);
        });
    });

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const index = parseInt(thumbnail.getAttribute('data-slide'));
            goToSlide(index);
        });
    });

    // Inicialização
    updateCarousel();

    // Auto-play (opcional)
    let autoplay = setInterval(nextSlide, 5000);

    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplay);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoplay = setInterval(nextSlide, 5000);
    });
}

// Add lightbox CSS
const lightboxCSS = `
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.lightbox.active {
    opacity: 1;
    visibility: visible;
}

.lightbox__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    cursor: pointer;
}

.lightbox__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 90vw;
    max-height: 90vh;
    text-align: center;
}

.lightbox__image {
    max-width: 100%;
    max-height: 80vh;
    border-radius: var(--border-radius);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.lightbox__close {
    position: absolute;
    top: -50px;
    right: 0;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: var(--font-size-lg);
    cursor: pointer;
    transition: var(--transition);
}

.lightbox__close:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
}

.lightbox__caption {
    color: white;
    margin-top: var(--spacing-lg);
    font-size: var(--font-size-lg);
}

.carousel-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: var(--primary-color);
    transition: width 0.3s ease;
    z-index: 15;
}
`;

const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = lightboxCSS;
document.head.appendChild(lightboxStyle);

// Update main initialization
const originalInitAdvanced = initAdvancedFeatures;
initAdvancedFeatures = function() {
    originalInitAdvanced();
    initCarousel();
};

