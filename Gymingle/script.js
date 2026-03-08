// Immediately start loading screen removal after page load
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) loadingScreen.classList.add('hidden');
        createParticles();
    }, 1500);
});

// ===================================
// Floating particles (background effect)
// ===================================
function createParticles() {
    // Avoid duplicate containers
    if (document.querySelector('.particles')) return;
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 20 + 5;
        const posX = Math.random() * 100;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particlesContainer.appendChild(particle);
    }
}

// ===================================
// Mobile menu toggle with animation
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollAnimations();
    initThemeToggle();
    initPriceTicker();
    initSafetySlider();
    initEarlyAccessForm();
    addButtonHoverEffects();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            this.classList.toggle('active');
            
            if (mobileMenu.style.display === 'block') {
                mobileMenu.style.animation = 'slideDownMenu 0.4s cubic-bezier(0.4, 0, 0.2, 1) reverse';
                setTimeout(() => {
                    mobileMenu.style.display = 'none';
                    mobileMenu.style.animation = '';
                }, 350);
            } else {
                mobileMenu.style.display = 'block';
                mobileMenu.style.animation = 'slideDownMenu 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            }
        });

        // Close menu when clicking a link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                mobileMenu.style.animation = 'slideDownMenu 0.4s cubic-bezier(0.4, 0, 0.2, 1) reverse';
                setTimeout(() => {
                    mobileMenu.style.display = 'none';
                    mobileMenu.style.animation = '';
                    mobileMenuBtn.classList.remove('active');
                    
                    const targetId = this.getAttribute('href');
                    if (targetId && targetId !== '#') {
                        const hashIndex = targetId.indexOf('#');
                        const hash = hashIndex !== -1 ? targetId.substring(hashIndex) : targetId;
                        
                        if (hash.startsWith('#')) {
                            const targetElement = document.querySelector(hash);
                            if (targetElement) {
                                window.scrollTo({
                                    top: targetElement.offsetTop - 80,
                                    behavior: 'smooth'
                                });
                            }
                        } else {
                            window.location.href = targetId;
                        }
                    }
                }, 350);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                if (mobileMenu.style.display === 'block') {
                    mobileMenu.style.animation = 'slideDownMenu 0.4s cubic-bezier(0.4, 0, 0.2, 1) reverse';
                    setTimeout(() => {
                        mobileMenu.style.display = 'none';
                        mobileMenu.style.animation = '';
                        mobileMenuBtn.classList.remove('active');
                    }, 350);
                }
            }
        });

        // Close menu on window resize if going to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                if (mobileMenu.style.display === 'block') {
                    mobileMenu.style.display = 'none';
                    mobileMenu.style.animation = '';
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    }
}

// ===================================
// Scroll animations with Intersection Observer
// ===================================
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const benefitCards = document.querySelectorAll('.benefit-card');
    const founderElements = document.querySelectorAll('.founder-image-container, .founder-bio');
    const benefitCardsPremium = document.querySelectorAll('.benefit-card-premium');
    const earlyAccessForm = document.querySelector('#early-access .mailchimp-form');
    const howItWorksCards = document.querySelectorAll('.how-it-works-card');

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));

    const cardObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.2 });
    
    benefitCards.forEach(card => cardObserver.observe(card));
    founderElements.forEach(element => cardObserver.observe(element));
    benefitCardsPremium.forEach(card => cardObserver.observe(card));
    if (earlyAccessForm) cardObserver.observe(earlyAccessForm);
    howItWorksCards.forEach(card => cardObserver.observe(card));
}

// ===================================
// Theme toggle with localStorage
// ===================================
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    const themeIcon = themeToggleBtn.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
    
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            localStorage.setItem('theme', 'dark');
        } else {
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
            localStorage.setItem('theme', 'light');
        }
    });
}

// ===================================
// Price ticker (rotating prices)
// ===================================
function initPriceTicker() {
    const items = document.querySelectorAll('.price-item');
    if (!items.length) return;
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    items.forEach((item, index) => {
        item.classList.remove('active');
        if (index === 0) item.classList.add('active');
    });
    
    setInterval(function() {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalItems;
        items[currentIndex].classList.add('active');
    }, 2000);
}

// ===================================
// Safety section synced slider
// ===================================
function initSafetySlider() {
    const safetySection = document.getElementById('safety');
    if (!safetySection) return;
    
    const slides = safetySection.querySelectorAll('.sv-slide');
    const images = safetySection.querySelectorAll('.sv-img');
    const dots = safetySection.querySelectorAll('.sv-dot');
    
    if (!slides.length || !images.length || !dots.length) return;
    
    let currentIndex = 0;
    let intervalId = null;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }
    
    showSlide(0);
    
    intervalId = setInterval(() => {
        let nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    }, 3000);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            showSlide(index);
            setTimeout(() => {
                if (!intervalId) {
                    intervalId = setInterval(() => {
                        let nextIndex = (currentIndex + 1) % slides.length;
                        showSlide(nextIndex);
                    }, 3000);
                }
            }, 3000);
        });
    });
    
    const cardArea = safetySection.querySelector('.sv-card');
    const imageArea = safetySection.querySelector('.sv-images-container');
    
    [cardArea, imageArea].forEach(area => {
        if (area) {
            area.addEventListener('mouseenter', () => {
                if (intervalId) clearInterval(intervalId);
                intervalId = null;
            });
            area.addEventListener('mouseleave', () => {
                if (!intervalId) {
                    intervalId = setInterval(() => {
                        let nextIndex = (currentIndex + 1) % slides.length;
                        showSlide(nextIndex);
                    }, 3000);
                }
            });
        }
    });
}

// ===================================
// Early Access Form Handler with Confetti, Success Message & Notification Popup
// ===================================
function initEarlyAccessForm() {
    const form = document.getElementById('earlyAccessForm');
    if (!form) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const fitnessSelect = document.getElementById('fitness_interest');
    const submitBtn = document.getElementById('earlyAccessSubmit');
    const buttonText = submitBtn?.querySelector('.button-text');
    const buttonLoader = submitBtn?.querySelector('.button-loader');
    const feedbackDiv = document.getElementById('formFeedback');
    const successMessage = document.getElementById('successMessage');
    const notification = document.getElementById('successNotification');
    
    // Load canvas-confetti library if not present
    if (typeof confetti === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1';
        document.head.appendChild(script);
    }
    
    function showFeedback(message, type) {
        if (!feedbackDiv) return;
        feedbackDiv.textContent = message;
        feedbackDiv.className = 'form-feedback ' + type;
        feedbackDiv.style.display = 'block';
        
        if (type === 'success') {
            setTimeout(() => {
                feedbackDiv.style.display = 'none';
                feedbackDiv.textContent = '';
                feedbackDiv.className = 'form-feedback';
            }, 5000);
        }
    }
    
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function triggerConfetti() {
        if (typeof confetti !== 'function') return;
        
        // First burst - main confetti
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#F6B16E', '#FFB84C', '#FFD700', '#FFA07A', '#FF8C42']
        });
        
        // Second burst - left side
        setTimeout(() => {
            confetti({
                particleCount: 80,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.5 },
                colors: ['#F6B16E', '#FFB84C', '#FFD700']
            });
        }, 150);
        
        // Third burst - right side
        setTimeout(() => {
            confetti({
                particleCount: 80,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.5 },
                colors: ['#F6B16E', '#FFB84C', '#FFD700']
            });
        }, 150);
        
        // Fourth burst - top shower
        setTimeout(() => {
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.2 },
                startVelocity: 25,
                colors: ['#F6B16E', '#FFB84C', '#FFFFFF']
            });
        }, 300);
    }
    
    // Function to show notification popup
    function showNotification() {
        if (!notification) return;
        
        notification.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
        
        // Add progress bar to popup root
        const progressBar = document.createElement('div');
        progressBar.className = 'notification-progress';
        notification.appendChild(progressBar);
        
        // Remove progress bar after animation
        setTimeout(() => {
            if (progressBar && progressBar.parentNode) {
                progressBar.remove();
            }
        }, 5000);
    }
    
    // In-memory flag to prevent duplicate submissions within the same page session
    let formAlreadySubmitted = false;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Prevent duplicate submission within the same page session
        if (formAlreadySubmitted) return;
        
        if (!nameInput.value.trim()) {
            showFeedback('Please enter your name', 'error');
            nameInput.focus();
            return;
        }
        
        if (!emailInput.value.trim()) {
            showFeedback('Please enter your email address', 'error');
            emailInput.focus();
            return;
        }
        
        if (!validateEmail(emailInput.value.trim())) {
            showFeedback('Please enter a valid email address', 'error');
            emailInput.focus();
            return;
        }
        
        // Disable button and show sending state
        if (submitBtn) {
            submitBtn.disabled = true;
            if (buttonText) buttonText.textContent = 'Sending...';
            if (buttonLoader) buttonLoader.style.display = 'inline-block';
            submitBtn.classList.add('btn-submitting');
        }
        
        // Clear any previous feedback
        if (feedbackDiv) {
            feedbackDiv.style.display = 'none';
            feedbackDiv.textContent = '';
        }
        
        const formData = new FormData(form);
        
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });
            
            if (response.ok) {
                // Hide form, show success message
                form.style.display = 'none';
                if (successMessage) {
                    successMessage.style.display = 'block';
                }
                
                // Show success feedback
                showFeedback('✅ You have successfully joined! Thank you for signing up.', 'success');
                
                // Show beautiful notification popup
                showNotification();
                
                // Trigger confetti celebration
                triggerConfetti();
                
                // Set in-memory flag to prevent duplicate submission
                formAlreadySubmitted = true;
                
                form.reset();
                console.log('Form submitted successfully!');
            } else {
                showFeedback('❌ Something went wrong. Please try again.', 'error');
                
                // Re-enable button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    if (buttonText) buttonText.textContent = 'Save my spot';
                    if (buttonLoader) buttonLoader.style.display = 'none';
                    submitBtn.classList.remove('btn-submitting');
                }
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            showFeedback('❌ Network error. Please check your connection and try again.', 'error');
            
            // Re-enable button
            if (submitBtn) {
                submitBtn.disabled = false;
                if (buttonText) buttonText.textContent = 'Save my spot';
                if (buttonLoader) buttonLoader.style.display = 'none';
                submitBtn.classList.remove('btn-submitting');
            }
        }
    });
    
    // Clear feedback when user starts typing
    function clearErrorFeedback() {
        const feedback = document.querySelector('.form-feedback.error');
        if (feedback) {
            feedback.style.display = 'none';
            feedback.textContent = '';
            feedback.className = 'form-feedback';
        }
    }
    
    if (nameInput) {
        nameInput.addEventListener('input', clearErrorFeedback);
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', clearErrorFeedback);
    }
    
    if (fitnessSelect) {
        fitnessSelect.addEventListener('change', clearErrorFeedback);
    }
}

// Global function to close notification
function closeNotification() {
    const notification = document.getElementById('successNotification');
    if (notification) {
        notification.classList.remove('show');
        
        // Remove progress bar if exists
        const progressBar = notification.querySelector('.notification-progress');
        if (progressBar) {
            progressBar.remove();
        }
    }
}

// ===================================
// Button hover effects
// ===================================
function addButtonHoverEffects() {
    document.querySelectorAll('.btn-primary, .btn-premium-primary, .btn-support, .prototype-button').forEach(button => {
        button.addEventListener('mouseenter', function() { 
            this.style.transform = 'translateY(-5px)'; 
        });
        button.addEventListener('mouseleave', function() { 
            this.style.transform = 'translateY(0)'; 
        });
    });
}

// Console log initialization
console.log('Gymingle script initialized successfully');