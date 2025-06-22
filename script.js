// ===== PORTFOLIO JAVASCRIPT FUNCTIONALITY =====

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    initializeLucideIcons();
    initializeThemeToggle();
    initializeMobileMenu();
    initializeScrollspy();
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeContactForm();
    initializeNavbarScroll();
    initializeParallaxEffects();
}

// ===== LUCIDE ICONS INITIALIZATION =====
function initializeLucideIcons() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ===== THEME TOGGLE FUNCTIONALITY =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme, themeIcon);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition class for smooth theme change
        document.body.style.transition = 'all 0.3s ease';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme, iconElement) {
    if (theme === 'dark') {
        iconElement.setAttribute('data-lucide', 'moon');
    } else {
        iconElement.setAttribute('data-lucide', 'sun');
    }
    
    // Re-initialize icons after changing
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ===== MOBILE MENU FUNCTIONALITY =====

function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = mobileMenuToggle.querySelector('.menu-icon');
    const navbar = document.querySelector('.navbar');

    // Store the original icon name to toggle between
    const originalIcon = menuIcon.getAttribute('data-lucide') || 'menu';
    const closeIcon = 'x';

    // Function to update menu and icon state
    function updateMenuState(isActive) {
        if (isActive) {
            navMenu.classList.add('active');
            menuIcon.removeAttribute("data-lucide", originalIcon)
            menuIcon.setAttribute('data-lucide', closeIcon);
        } else {
            navMenu.classList.remove('active');
            menuIcon.removeAttribute("data-lucide", closeIcon)
            menuIcon.setAttribute('data-lucide', originalIcon);
        }
        
        // Always remove and recreate the icon to ensure proper rendering
        if (typeof lucide !== 'undefined') {
            // First remove any existing icon
            const iconElement = menuIcon.querySelector('svg');
            if (iconElement) {
                iconElement.remove();
            }
            // Then create new icon
            lucide.createIcons();
        }
    }

    // Toggle menu on button click
    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = !navMenu.classList.contains('active');
        updateMenuState(isActive);
    });

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            updateMenuState(false);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navbar && navbar.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            updateMenuState(false);
        }
    });

    // Prevent clicks inside the menu from closing it
    navMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Initialize with the correct icon
    updateMenuState(false);
}

// ===== SCROLLSPY FUNCTIONALITY =====
function initializeScrollspy() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===== SMOOTH SCROLL FUNCTIONALITY =====
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Helper function for scrolling to sections
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.expertise-item, .project-card, .skill-category, .about-card');
    
    // Add animation classes
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== SKILL BARS ANIMATION =====
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                
                // Animate progress bar
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 200);
                
                // Stop observing this element
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function initializeNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===== PARALLAX EFFECTS =====
function initializeParallaxEffects() {
    const imageDecoration = document.querySelector('.image-decoration');
    
    if (imageDecoration) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            imageDecoration.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
}

// ===== CONTACT FORM HANDLING =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission(this);
        });
    }
}

function handleContactFormSubmission(form) {
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validate form
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('.form-submit');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i data-lucide="loader-2"></i> Sending...';
    submitButton.disabled = true;
    
    // Re-initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Create mailto link (since we can't use backend)
    const mailtoLink = `mailto:adewoyeayomide1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Simulate form processing
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Re-initialize icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Open mailto link
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Thank you for your message! Your email client should open now.', 'success');
        
        // Reset form
        form.reset();
    }, 1000);
}

// ===== RESUME DOWNLOAD FUNCTIONALITY =====
function downloadResume() {
  const a = document.createElement('a');
  a.href = './resume/triple.pdf';
  a.download = 'Adewoye_Ayomide_Matthew_Resume.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  showNotification('Resume downloaded successfully!', 'success');
}

// ===== UTILITY FUNCTIONS =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i data-lucide="${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-primary);
        color: var(--text-primary);
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-heavy);
        border: 1px solid var(--border-color);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add type-specific styles
    if (type === 'success') {
        notification.style.borderLeft = '4px solid #10b981';
    } else if (type === 'error') {
        notification.style.borderLeft = '4px solid #ef4444';
    } else {
        notification.style.borderLeft = '4px solid #6366f1';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'x-circle';
        case 'warning': return 'alert-triangle';
        default: return 'info';
    }
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const menuIcon = mobileMenuToggle.querySelector('.menu-icon');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuIcon.setAttribute('data-lucide', 'menu');
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimize scroll events
window.addEventListener('scroll', throttle(function() {
    // This runs at most once every 16ms (60fps)
}, 16));

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Skip to main content functionality
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--accent-primary);
            color: var(--bg-primary);
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1002;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.appendChild(skipLink);
        skipLink.focus();
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
    // Could implement error reporting here
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', throttle(function() {
    // Handle any resize-specific logic
    const navMenu = document.getElementById('nav-menu');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const menuIcon = mobileMenuToggle.querySelector('.menu-icon');
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuIcon.setAttribute('data-lucide', 'menu');
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}, 250));

// ===== PRELOADER (Optional) =====
window.addEventListener('load', function() {
    // Remove any loading states
    document.body.classList.remove('loading');
    
    // Initialize any final animations
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 0.8s ease forwards';
    }
});

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.scrollToSection = scrollToSection;
window.downloadResume = downloadResume;