// ===== SMOOTH SCROLL NAVIGATION =====
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

// ===== NAVBAR BACKGROUND ON SCROLL =====
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(248, 136, 66, 0.95)';
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = '#f88842';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
});

// ===== ACTIVE NAVBAR LINK HIGHLIGHTING =====
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ===== CARD ANIMATION ON SCROLL (Intersection Observer) =====
const cards = document.querySelectorAll('.card');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = `slideUp 0.6s ease-out forwards`;
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

cards.forEach(card => {
    observer.observe(card);
});

// ===== DYNAMIC EVENT FILTERING =====
function filterEvents(category) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'slideUp 0.6s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== MOBILE MENU TOGGLE =====
function toggleMobileMenu() {
    const navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle('mobile-active');
    
    // Create hamburger menu if it doesn't exist
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.classList.toggle('active');
    }
}

// ===== DATE COUNTDOWN TIMER =====
function updateCountdown(eventDate, elementId) {
    const countdownElement = document.getElementById(elementId);
    
    function calculateTime() {
        const eventTime = new Date(eventDate).getTime();
        const currentTime = new Date().getTime();
        const timeLeft = eventTime - currentTime;
        
        if (timeLeft < 0) {
            countdownElement.innerHTML = 'Event Ended';
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m`;
    }
    
    calculateTime();
    setInterval(calculateTime, 60000); // Update every minute
}

// ===== FORM VALIDATION (for future contact form) =====
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ff0000';
                isValid = false;
            } else {
                input.style.borderColor = '#00cc00';
            }
        });
        
        if (isValid) {
            console.log('Form is valid! Ready to submit.');
            // Add your form submission logic here
        }
    });
}

// ===== SCROLL TO TOP BUTTON =====
function createScrollTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.id = 'scrollTopBtn';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #f88842;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#ff7700';
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#f88842';
        button.style.transform = 'scale(1)';
    });
}

// ===== PARALLAX EFFECT (Header) =====
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        header.style.backgroundPosition = `center ${window.scrollY * 0.5}px`;
    }
});

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    createScrollTopButton();
    
    // Example: Update countdown for events
    // updateCountdown('2026-04-11', 'countdown-upgrade');
    
    // Mobile menu toggle setup (if you add a hamburger menu)
    // const hamburger = document.querySelector('.hamburger');
    // if (hamburger) {
    //     hamburger.addEventListener('click', toggleMobileMenu);
    // }
});

// ===== CSS ANIMATIONS (add to style.css or keep here) =====
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .card {
        animation: slideUp 0.6s ease-out;
    }
    
    #scrollTopBtn:hover {
        box-shadow: 0 4px 15px rgba(248, 136, 66, 0.4);
    }
`;
document.head.appendChild(style);
