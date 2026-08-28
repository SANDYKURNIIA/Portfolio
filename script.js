/* =============================================
   SKR.DEV — Portfolio Script
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ---- Init Lucide Icons ---- */
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ---- Sticky Header ---- */
    const header = document.getElementById('header');
    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---- Mobile Menu ---- */
    const menuBtn = document.getElementById('menuBtn');
    const navbar  = document.getElementById('navbar');
    const spans   = menuBtn.querySelectorAll('span');

    menuBtn.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('open');
        // Animate hamburger → X
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity   = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity   = '';
            spans[2].style.transform = '';
        }
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
            spans[0].style.transform = '';
            spans[1].style.opacity   = '';
            spans[2].style.transform = '';
        });
    });

    /* ---- Active Nav Link on Scroll ---- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const setActiveLink = () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(sec => {
            const top    = sec.offsetTop;
            const height = sec.offsetHeight;
            const id     = sec.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${id}"]`);
                if (active) active.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', setActiveLink, { passive: true });

    /* ---- Scroll Reveal ---- */
    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));

    /* ---- Contact Form ---- */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    Swal.fire({
                        title: 'Message Sent! 🎉',
                        text: 'Thanks for reaching out. I\'ll get back to you soon.',
                        icon: 'success',
                        confirmButtonText: 'Awesome!',
                        confirmButtonColor: '#2563eb',
                        borderRadius: '12px',
                    }).then(() => form.reset());
                } else {
                    throw new Error('Server error');
                }
            } catch (err) {
                Swal.fire({
                    title: 'Oops!',
                    text: 'Something went wrong. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                    confirmButtonColor: '#2563eb',
                });
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                // Re-init icons after innerHTML change
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        });
    }

    /* ---- Smooth scroll for anchor links ---- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

});
