// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Enhanced Mobile menu toggle - Replace the existing mobile menu code around line 20
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Create overlay element
const overlay = document.createElement('div');
overlay.classList.add('mobile-overlay');
document.body.appendChild(overlay);

mobileMenuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
});

// Close menu when overlay is clicked
overlay.addEventListener('click', function() {
    navLinks.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    this.classList.remove('active');
    body.classList.remove('menu-open');
});

// Close menu when navigation link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

// Close menu on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .about-item, .feature-item, .contact-item, .pricing-card, .info-card');
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Quote form handling
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.service || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your quote request! We will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
     }

    // Enhanced Services Carousel with better responsiveness
    const servicesTrack = document.querySelector('.services-track');
    const serviceCards = document.querySelectorAll('.service-card');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const dots = document.querySelectorAll('.dot');
    
    if (servicesTrack && serviceCards.length > 0) {
        let currentSlide = 0;
        const totalSlides = serviceCards.length;
        
        // Enhanced cards per view calculation
        function getCardsPerView() {
            const width = window.innerWidth;
            if (width <= 768) return 1;
            if (width <= 1200) return 2;
            return 3;
        }
        
        let cardsPerView = getCardsPerView();
        let maxSlide = Math.max(0, totalSlides - cardsPerView);
        
        // Enhanced carousel update function
        function updateCarousel() {
            const cardWidth = serviceCards[0].offsetWidth;
            const gap = parseFloat(getComputedStyle(servicesTrack).gap) || 32;
            const translateX = currentSlide * (cardWidth + gap);
            
            servicesTrack.style.transform = `translateX(-${translateX}px)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
            
            // Enhanced button state management
            updateButtonStates();
        }
        
        function updateButtonStates() {
            if (prevBtn) {
                prevBtn.disabled = currentSlide === 0;
                prevBtn.style.opacity = currentSlide === 0 ? '0.4' : '0.95';
                prevBtn.style.display = 'flex'; // Always visible
            }
            if (nextBtn) {
                nextBtn.disabled = currentSlide >= maxSlide;
                nextBtn.style.opacity = currentSlide >= maxSlide ? '0.4' : '0.95';
                nextBtn.style.display = 'flex'; // Always visible
            }
        }
        
        function nextSlide() {
            if (currentSlide < maxSlide) {
                currentSlide++;
            } else {
                currentSlide = 0; // Loop back to start
            }
            updateCarousel();
        }
        
        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = maxSlide; // Loop to end
            }
            updateCarousel();
        }
        
        function goToSlide(slideIndex) {
            if (slideIndex >= 0 && slideIndex <= maxSlide) {
                currentSlide = slideIndex;
                updateCarousel();
            }
        }
        
        // Enhanced event listeners with better touch support
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nextSlide();
            });
            nextBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                nextSlide();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                prevSlide();
            });
            prevBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                prevSlide();
            });
        }
        
        // Enhanced dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                goToSlide(index);
            });
            dot.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(index);
            });
        });
        
        // Auto-play with enhanced pause functionality
        let autoPlayInterval = setInterval(nextSlide, 5000);
        let isUserInteracting = false;
        
        function pauseAutoPlay() {
            clearInterval(autoPlayInterval);
            isUserInteracting = true;
        }
        
        function resumeAutoPlay() {
            if (isUserInteracting) {
                setTimeout(() => {
                    isUserInteracting = false;
                    autoPlayInterval = setInterval(nextSlide, 5000);
                }, 3000); // Resume after 3 seconds of no interaction
            }
        }
        
        // Enhanced interaction detection
        const carousel = document.querySelector('.services-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', pauseAutoPlay);
            carousel.addEventListener('mouseleave', resumeAutoPlay);
            carousel.addEventListener('touchstart', pauseAutoPlay);
            carousel.addEventListener('touchend', resumeAutoPlay);
        }
        
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.services-carousel')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevSlide();
                    pauseAutoPlay();
                }
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextSlide();
                    pauseAutoPlay();
                }
            }
        });
        
        // Enhanced touch/swipe support
        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;
        let isDragging = false;
        
        servicesTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            pauseAutoPlay();
        }, { passive: true });
        
        servicesTrack.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = Math.abs(currentX - startX);
            const diffY = Math.abs(currentY - startY);
            
            // Prevent vertical scroll during horizontal swipe
            if (diffX > diffY && diffX > 10) {
                e.preventDefault();
            }
        }, { passive: false });
        
        servicesTrack.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = Math.abs(startY - endY);
            
            isDragging = false;
            
            // Only trigger if horizontal swipe is dominant and significant
            if (Math.abs(diffX) > 50 && Math.abs(diffX) > diffY) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            resumeAutoPlay();
        }, { passive: true });
        
        // Enhanced resize handler with debouncing
        let resizeTimeout;
        function handleResize() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newCardsPerView = getCardsPerView();
                if (newCardsPerView !== cardsPerView) {
                    cardsPerView = newCardsPerView;
                    maxSlide = Math.max(0, totalSlides - cardsPerView);
                    if (currentSlide > maxSlide) {
                        currentSlide = maxSlide;
                    }
                }
                updateCarousel();
                
                // Ensure buttons remain visible after resize
                setTimeout(() => {
                    if (prevBtn) {
                        prevBtn.style.display = 'flex';
                        prevBtn.style.visibility = 'visible';
                    }
                    if (nextBtn) {
                        nextBtn.style.display = 'flex';
                        nextBtn.style.visibility = 'visible';
                    }
                }, 100);
            }, 250);
        }
        
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);
        
        // Initialize carousel
        updateCarousel();
        
        // Force button visibility on initialization
        setTimeout(() => {
            if (prevBtn) {
                prevBtn.style.display = 'flex';
                prevBtn.style.visibility = 'visible';
            }
            if (nextBtn) {
                nextBtn.style.display = 'flex';
                nextBtn.style.visibility = 'visible';
            }
        }, 100);
        
        // Additional safety check for button visibility
        const observer = new MutationObserver(() => {
            if (prevBtn && prevBtn.style.display === 'none') {
                prevBtn.style.display = 'flex';
            }
            if (nextBtn && nextBtn.style.display === 'none') {
                nextBtn.style.display = 'flex';
            }
        });
        
        if (prevBtn) observer.observe(prevBtn, { attributes: true, attributeFilter: ['style'] });
        if (nextBtn) observer.observe(nextBtn, { attributes: true, attributeFilter: ['style'] });
    }
});

// Parallax effect for floating elements
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Add hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click ripple effect to buttons
document.querySelectorAll('.cta-button').forEach(button => {
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

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .cta-button {
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
`;
document.head.appendChild(style);

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(90deg, #FFD700, #e6c200);
    z-index: 9999;
    transition: width 0.3s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Simple Services Carousel - Multi-card responsive version
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.simple-carousel');
    const slidesContainer = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.service-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (carousel && slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Get cards per view based on screen size
        function getCardsPerView() {
            return window.innerWidth <= 768 ? 1 : 3;
        }
        
        // Get maximum slide index
        function getMaxSlide() {
            const cardsPerView = getCardsPerView();
            return Math.max(0, totalSlides - cardsPerView);
        }
        
        // Update carousel position
        function updateCarousel() {
            const cardsPerView = getCardsPerView();
            const slideWidth = 100 / cardsPerView;
            const translateX = -currentSlide * slideWidth;
            slidesContainer.style.transform = `translateX(${translateX}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
            
            // Update button states
            const maxSlide = getMaxSlide();
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide >= maxSlide;
        }
        
        // Next slide
        function nextSlide() {
            const maxSlide = getMaxSlide();
            if (currentSlide < maxSlide) {
                currentSlide++;
            } else {
                currentSlide = 0; // Loop back to start
            }
            updateCarousel();
        }
        
        // Previous slide
        function prevSlide() {
            const maxSlide = getMaxSlide();
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = maxSlide; // Loop to end
            }
            updateCarousel();
        }
        
        // Go to specific slide
        function goToSlide(index) {
            const maxSlide = getMaxSlide();
            currentSlide = Math.min(index, maxSlide);
            updateCarousel();
        }
        
        // Handle window resize
        function handleResize() {
            const maxSlide = getMaxSlide();
            if (currentSlide > maxSlide) {
                currentSlide = maxSlide;
            }
            updateCarousel();
        }
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        window.addEventListener('resize', handleResize);
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
        
        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.simple-carousel')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevSlide();
                }
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextSlide();
                }
            }
        });
        
        // Auto-play
        let autoPlay = setInterval(nextSlide, 4000);
        
        // Pause auto-play on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoPlay);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoPlay = setInterval(nextSlide, 4000);
        });
        
        // Initialize
        updateCarousel();
    }
});

// Enhanced Quote Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Create email content
            const emailSubject = `Quote Request from ${data.firstName} ${data.lastName}`;
            const emailBody = `
New Quote Request Details:

` +
                `Name: ${data.firstName} ${data.lastName}\n` +
                `Email: ${data.email}\n` +
                `Phone: ${data.phone || 'Not provided'}\n` +
                `Company: ${data.company || 'Not provided'}\n` +
                `Service: ${data.service}\n` +
                `Budget: ${data.budget || 'Not specified'}\n` +
                `Timeline: ${data.timeline || 'Not specified'}\n` +
                `\nProject Details:\n${data.message}\n` +
                `\n\nSubmitted on: ${new Date().toLocaleString()}`;
            
            // Create Gmail compose URL
            const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=info@autech.com.au&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Open Gmail in new tab
            window.open(gmailURL, '_blank');
            
            // Show success message
            showSuccessMessage();
        });
    }
    
    function showSuccessMessage() {
        // Create success notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            font-family: Arial, sans-serif;
        `;
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Please send the email to complete your quote request.
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
});