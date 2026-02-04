// ===== Loader =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader')?.classList.add('hidden');
    }, 1500);
});

// ===== Custom Cursor =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows mouse directly
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Follower has more delay
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .business-card, .stat-card, .vm-card, .value-card, .org-member, .contact-card, .event-card, .team-card, .direction-item, input, textarea, select');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('hover');
        });
    });
}

// ===== Navigation =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu?.classList.toggle('active');
    document.body.style.overflow = mobileMenu?.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        mobileMenu?.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Reveal Animation on Scroll =====
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach((el, index) => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            // Add stagger delay based on element position
            setTimeout(() => {
                el.classList.add('active');
            }, index * 50);
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== Counter Animation =====
const counters = document.querySelectorAll('.stat-number[data-count]');
let countersAnimated = false;

const animateCounters = () => {
    if (countersAnimated) return;

    counters.forEach(counter => {
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            countersAnimated = true;
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        }
    });
};

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Parallax Effect for Hero Shapes =====
const heroShapes = document.querySelectorAll('.hero-shape');

if (heroShapes.length > 0) {
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        heroShapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}

// ===== Form Handling =====
const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Simple validation feedback
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span>전송 중...</span>';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '<span>전송 완료!</span>';
        contactForm.reset();

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
});

// ===== Magnetic Button Effect =====
const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ===== Text Animation on Scroll =====
const animateText = () => {
    const textElements = document.querySelectorAll('h1, h2, h3');

    textElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// ===== Tilt Effect for Cards =====
const tiltCards = document.querySelectorAll('.business-card, .stat-card, .vm-card, .org-member, .contact-card, .team-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== Dynamic Year in Footer =====
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
}

// ===== Scroll Progress Indicator =====
const createScrollProgress = () => {
    const progress = document.createElement('div');
    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progress);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progress.style.width = scrollPercent + '%';
    });
};

createScrollProgress();

// ===== Page Transition Effect =====
document.querySelectorAll('a:not([href^="#"]):not([href^="mailto"]):not([href^="tel"])').forEach(link => {
    if (link.hostname === window.location.hostname) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');

            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';

            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    }
});

// Fade in on page load
document.body.style.opacity = '0';
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.3s ease';
    }, 100);
});

// ===== Ripple Effect on Buttons =====
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
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
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Lazy Load Images =====
const lazyImages = document.querySelectorAll('img[data-src]');

const lazyLoad = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            lazyLoad.unobserve(img);
        }
    });
});

lazyImages.forEach(img => lazyLoad.observe(img));

// ===== Particle System =====
const particleCanvas = document.getElementById('particles');
if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    let mouseParticle = { x: 0, y: 0 };

    const resizeCanvas = () => {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? '#667eea' : '#764ba2';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Mouse interaction
            const dx = mouseParticle.x - this.x;
            const dy = mouseParticle.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const force = (150 - dist) / 150;
                this.x -= dx * force * 0.02;
                this.y -= dy * force * 0.02;
            }

            if (this.x < 0 || this.x > particleCanvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > particleCanvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // Create particles
    const particleCount = Math.min(100, window.innerWidth / 15);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Draw connections
    const drawConnections = () => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(102, 126, 234, ${0.15 * (1 - dist / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    };

    // Animation loop
    const animateParticles = () => {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        drawConnections();
        requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Mouse tracking for particles
    document.addEventListener('mousemove', (e) => {
        mouseParticle.x = e.clientX;
        mouseParticle.y = e.clientY;
    });
}

// ===== Typing Effect =====
const typingElements = document.querySelectorAll('.typing-text');

typingElements.forEach(el => {
    const text = el.getAttribute('data-text');
    if (!text) return;

    el.textContent = '';
    let charIndex = 0;

    const type = () => {
        if (charIndex < text.length) {
            el.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 150);
        } else {
            el.classList.add('done');
        }
    };

    // Start typing after hero animation
    setTimeout(type, 1500);
});

// ===== Mouse Trail Effect =====
const trailCanvas = document.getElementById('mouse-trail');
if (trailCanvas) {
    const trailCtx = trailCanvas.getContext('2d');
    let trailParticles = [];

    const resizeTrailCanvas = () => {
        trailCanvas.width = window.innerWidth;
        trailCanvas.height = window.innerHeight;
    };
    resizeTrailCanvas();
    window.addEventListener('resize', resizeTrailCanvas);

    class TrailParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 8 + 4;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.02;
            this.color = Math.random() > 0.5 ? '#667eea' : '#764ba2';
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
        }

        update() {
            this.life -= this.decay;
            this.x += this.vx;
            this.y += this.vy;
            this.size *= 0.96;
        }

        draw() {
            trailCtx.beginPath();
            trailCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            trailCtx.fillStyle = this.color;
            trailCtx.globalAlpha = this.life * 0.6;
            trailCtx.fill();
            trailCtx.globalAlpha = 1;
        }
    }

    let lastTrailTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTrailTime > 30) {
            trailParticles.push(new TrailParticle(e.clientX, e.clientY));
            lastTrailTime = now;
        }
    });

    const animateTrail = () => {
        trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);

        trailParticles = trailParticles.filter(p => p.life > 0);

        trailParticles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animateTrail);
    };

    animateTrail();
}

// ===== Parallax Scroll Effect =====
const parallaxSections = document.querySelectorAll('.parallax-section');

const handleParallax = () => {
    parallaxSections.forEach(section => {
        const speed = parseFloat(section.getAttribute('data-speed')) || 0.5;
        const rect = section.getBoundingClientRect();
        const scrolled = window.scrollY;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = (rect.top - window.innerHeight) * speed;
            section.style.transform = `translateY(${yPos}px)`;
        }
    });
};

let parallaxTicking = false;
window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        requestAnimationFrame(() => {
            handleParallax();
            parallaxTicking = false;
        });
        parallaxTicking = true;
    }
});

// ===== Enhanced Card Interactions =====
const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach(card => {
    // Add subtle movement on mouse move (desktop)
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        if (!card.classList.contains('touched')) {
            card.querySelector('.flip-card-inner').style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });

    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('touched')) {
            card.querySelector('.flip-card-inner').style.transform = '';
        }
    });

    // Mobile touch support
    card.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            card.classList.toggle('touched');
        }
    });
});

// ===== Scroll-triggered Animations =====
const animatedElements = document.querySelectorAll('[data-animate]');

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const animation = entry.target.getAttribute('data-animate');
            entry.target.classList.add(animation);
            animateOnScroll.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

animatedElements.forEach(el => animateOnScroll.observe(el));

// ===== Smooth Section Transitions =====
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => sectionObserver.observe(section));
