// script.js
document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Mobile Menu ---------- */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.classList.contains('active')) return;
            if (navLinks.contains(e.target) || mobileMenuBtn.contains(e.target)) return;
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    }

    /* ---------- Smooth Scrolling ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    /* ---------- Accordion ---------- */
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const allAccordionItems = document.querySelectorAll('.accordion-item');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.accordion-body');
            if (!body) return;

            allAccordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherBody = otherItem.querySelector('.accordion-body');
                    if (otherBody) otherBody.style.display = 'none';
                }
            });

            const isActive = item.classList.toggle('active');
            body.style.display = isActive ? 'block' : 'none';
        });
    });

    /* ---------- Image Error Fallback ---------- */
    // Adds a visible placeholder when an image cannot load
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => {
            img.classList.add('img-failed');
            // Hide alt-text broken icon artifact
            img.setAttribute('aria-hidden', 'true');
        });
    });

    /* ---------- Contact Form ---------- */
    const serviceSelect = document.getElementById('service');
    const packageGroup = document.getElementById('packageGroup');
    const packageSelect = document.getElementById('package');
    const contactForm = document.getElementById('contactForm');

    if (serviceSelect) {
        serviceSelect.addEventListener('change', (e) => {
            if (e.target.value === 'AI-Powered Website Development') {
                packageGroup.style.display = 'block';
                if (packageSelect) packageSelect.required = true;
            } else {
                packageGroup.style.display = 'none';
                if (packageSelect) packageSelect.required = false;
            }
        });

        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        const planParam = urlParams.get('plan');

        if (serviceParam) {
            if (serviceParam === 'web') {
                serviceSelect.value = 'AI-Powered Website Development';
                packageGroup.style.display = 'block';
                if (packageSelect) packageSelect.required = true;
                if (planParam && packageSelect) {
                    if (planParam === 'basic') packageSelect.value = 'Basic';
                    if (planParam === 'standard') packageSelect.value = 'Standard';
                    if (planParam === 'premium') packageSelect.value = 'Premium';
                }
            } else if (serviceParam === 'automation') {
                serviceSelect.value = 'AI Automation';
            } else if (serviceParam === 'calling') {
                serviceSelect.value = 'AI Calling Agent';
            }

            setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value || 'Not provided';
            const service = document.getElementById('service').value;
            const pkg = (packageSelect && packageSelect.value) || 'N/A';
            const budget = document.getElementById('budget').value || 'Not provided';
            const message = document.getElementById('message').value;

            let whatsappMessage = `*New Lead from Website*\n\n`;
            whatsappMessage += `*Name:* ${name}\n`;
            whatsappMessage += `*Email:* ${email}\n`;
            whatsappMessage += `*Company:* ${company}\n`;
            whatsappMessage += `*Service:* ${service}\n`;
            if (service === 'AI-Powered Website Development') {
                whatsappMessage += `*Plan:* ${pkg}\n`;
            }
            whatsappMessage += `*Budget:* ${budget}\n\n`;
            whatsappMessage += `*Requirements:* \n${message}`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/923466161575?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank', 'noopener');
        });
    }
});
/* ---------- Image Retry on Failure ---------- */
// If an image fails (network / cache issue), retry once after short delay
document.querySelectorAll('img[data-retry-enabled]').forEach(img => {
    // skip if already handled
});

// Auto-attach retry to project images + logo
const retryImgs = document.querySelectorAll('.project-image-wrap img, .footer-logo-image, .site-logo-image');
retryImgs.forEach(img => {
    img.addEventListener('error', function handleErr() {
        if (img.dataset.retried) return;
        img.dataset.retried = '1';
        const originalSrc = img.getAttribute('src').split('?')[0];
        // Retry with cache-buster after 800ms
        setTimeout(() => {
            img.src = originalSrc + '?retry=' + Date.now();
        }, 800);

    /* ---------- Auto-close mobile menu on scroll ---------- */
    if (navLinks && mobileMenuBtn) {
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            if (!navLinks.classList.contains('active')) return;
            const currentY = window.scrollY;
            // Close if user scrolls more than 10px in either direction
            if (Math.abs(currentY - lastScrollY) > 10) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                lastScrollY = currentY;
            }
        }, { passive: true });
    }    });
});
