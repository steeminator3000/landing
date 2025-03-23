/**
 * Main JavaScript for LiquidVest Landing Page
 * Contains primary interactive functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize after all modules are loaded
    document.addEventListener('allModulesLoaded', initializeAll);
    
    // Listen for individual module loads to initialize module-specific features
    document.addEventListener('moduleLoaded', function(e) {
        const moduleId = e.detail.id;
        
        // Initialize specific module functionality
        switch(moduleId) {
            case 'header-container':
                initializeHeader();
                break;
            case 'hero-container':
                // The canvas animation will be handled by animations.js
                // Force immediate initialization if canvas is present
                const canvas = document.getElementById('liquidCanvas');
                if (canvas && typeof window.initializeCanvasAnimations === 'function') {
                    window.initializeCanvasAnimations();
                }
                break;
            case 'features-container':
                initializeFadeInElements();
                break;
            case 'how-it-works-container':
                initializeStaggeredFadeIn();
                break;
            // Add other module-specific initializations as needed
        }
    });
    
    // Header scroll effect
    function initializeHeader() {
        const header = document.querySelector('header');
        const mobileToggle = document.querySelector('.mobile-toggle');
        const nav = document.querySelector('nav');
        
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
        
        // Mobile menu toggle
        if (mobileToggle && nav) {
            mobileToggle.addEventListener('click', function() {
                nav.classList.toggle('open');
                mobileToggle.setAttribute('aria-expanded', 
                    nav.classList.contains('open') ? 'true' : 'false');
            });
        }
    }
    
    // Initialize fade-in animations
    function initializeFadeInElements() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        if (fadeElements.length > 0) {
            // Create IntersectionObserver
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Unobserve element after it's visible
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            // Observe each element
            fadeElements.forEach(element => {
                observer.observe(element);
            });
        }
    }
    
    // Initialize staggered fade-in animations
    function initializeStaggeredFadeIn() {
        const staggerContainers = document.querySelectorAll('.stagger-fade-in');
        
        if (staggerContainers.length > 0) {
            // Create IntersectionObserver
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add visible class to each child with a delay
                        const children = entry.target.children;
                        Array.from(children).forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add('visible');
                            }, index * 100);
                        });
                        // Unobserve container after children are visible
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            // Observe each container
            staggerContainers.forEach(container => {
                observer.observe(container);
            });
        }
    }
    
    // Smooth scroll for anchor links
    function initializeSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const nav = document.querySelector('nav');
                    if (nav && nav.classList.contains('open')) {
                        nav.classList.remove('open');
                        document.querySelector('.mobile-toggle').setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
    }
    
    // Initialize liquid drops animation
function initializeLiquidDrops() {
    // Find the hero section to contain drops
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    function addRandomDrops() {
        const numDrops = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < numDrops; i++) {
            const drop = document.createElement('div');
            drop.classList.add('liquid-drop');
            
            // Random position within the hero section
            const posX = Math.random() * 80 + 10; // 10% to 90% of section width
            drop.style.left = `${posX}%`;
            
            // Random delay
            const delay = Math.random() * 2;
            drop.style.animationDelay = `${delay}s`;
            
            // Append to hero section instead of body
            heroSection.appendChild(drop);
            
            // Remove after animation completes
            setTimeout(() => {
                if (heroSection.contains(drop)) {
                    heroSection.removeChild(drop);
                }
            }, 5000);
        }
        
        // Schedule next drops
        setTimeout(addRandomDrops, Math.random() * 2000 + 1000);
    }
    
    // Start liquid drops animation
    addRandomDrops();
}
    
    // Initialize all page functionality
    function initializeAll() {
        initializeHeader();
        initializeFadeInElements();
        initializeStaggeredFadeIn();
        initializeSmoothScroll();
        initializeLiquidDrops();
        
        // Ensure canvas animation is initialized
        if (typeof window.initializeCanvasAnimations === 'function') {
            window.initializeCanvasAnimations();
        }
        
        // Remove loading state if present
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.add('loaded');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
        
        console.log('LiquidVest landing page initialized');
    }
});