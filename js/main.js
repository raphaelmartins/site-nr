// ========== MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const navPill = document.getElementById('navPill');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navPill.classList.toggle('active');
});

navPill.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navPill.classList.remove('active');
    });
});

// ========== HEADER SCROLL ==========
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// ========== INDUSTRY TABS ==========
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`tab-${tabId}`).classList.add('active');
    });
});

// ========== SERVICES CAROUSEL ==========
const carousel = document.getElementById('servicesCarousel');
const prevBtn = document.getElementById('servPrev');
const nextBtn = document.getElementById('servNext');
const cardWidth = 344; // card width + gap

prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
});

// Auto-scroll services
let autoScrollInterval = setInterval(() => {
    if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
        carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
}, 4000);

carousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
carousel.addEventListener('mouseleave', () => {
    autoScrollInterval = setInterval(() => {
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
    }, 4000);
});

// ========== SCROLL ANIMATIONS ==========
const animateElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

animateElements.forEach(el => observer.observe(el));

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = header.offsetHeight;
            const pos = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: pos, behavior: 'smooth' });
        }
    });
});

// ========== COUNTER ANIMATION ==========
const statValues = document.querySelectorAll('.stat-value');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const text = el.textContent;
            const match = text.match(/(\d+)/);
            if (match) {
                const target = parseInt(match[0]);
                const suffix = text.replace(match[0], '');
                let current = 0;
                const step = Math.max(1, Math.floor(target / 50));
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = current + suffix;
                }, 30);
            }
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statValues.forEach(el => counterObserver.observe(el));
