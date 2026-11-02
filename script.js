/* Sandy Kurnia Ramadhan — portfolio behaviour.
   No dependencies. Everything degrades to a working page without JS. */

(function () {
    'use strict';

    /* ---------------------------------------------------------- nav menu -- */

    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('nav');

    function closeNav() {
        if (!toggle || !nav) return;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Buka menu');
        nav.classList.remove('is-open');
        document.documentElement.classList.remove('nav-open');
    }

    function openNav() {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Tutup menu');
        nav.classList.add('is-open');
        document.documentElement.classList.add('nav-open');
    }

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            if (toggle.getAttribute('aria-expanded') === 'true') closeNav();
            else openNav();
        });

        nav.addEventListener('click', function (e) {
            if (e.target.closest('a')) closeNav();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeNav();
        });

        document.addEventListener('click', function (e) {
            if (!nav.classList.contains('is-open')) return;
            if (nav.contains(e.target) || toggle.contains(e.target)) return;
            closeNav();
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 780) closeNav();
        });
    }

    /* --------------------------------------------------------- scrollspy -- */

    var links = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
    var targets = links
        .map(function (link) {
            return document.getElementById(link.getAttribute('data-nav'));
        })
        .filter(Boolean);

    if ('IntersectionObserver' in window && targets.length) {
        var visible = Object.create(null);

        var spy = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    visible[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
                });

                var bestId = null;
                var bestRatio = 0;
                Object.keys(visible).forEach(function (id) {
                    if (visible[id] > bestRatio) {
                        bestRatio = visible[id];
                        bestId = id;
                    }
                });

                links.forEach(function (link) {
                    var on = bestId && link.getAttribute('data-nav') === bestId;
                    link.classList.toggle('is-current', !!on);
                    if (on) link.setAttribute('aria-current', 'true');
                    else link.removeAttribute('aria-current');
                });
            },
            { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
        );

        targets.forEach(function (t) {
            spy.observe(t);
        });
    }

    /* --------------------------------------------------------- scroll-in -- */

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Tagged in JS, so with scripting off nothing is ever hidden. */
    var revealGroups = [
        ['.section__head'],
        ['.filters'],
        ['.ledger .entry'],
        ['.awards .award'],
        ['.certs .cert'],
        ['.timeline .timeline__row'],
        ['.orgs'],
        ['.skills .skills__row'],
        ['.contact__side', '.form'],
        ['.spec__row'],
        ['.case__shot', '.case__block', '.case__facts']
    ];

    var revealSet = [];

    revealGroups.forEach(function (group) {
        group.forEach(function (selector) {
            Array.prototype.slice.call(document.querySelectorAll(selector)).forEach(function (el, i) {
                el.classList.add('reveal');
                el.style.setProperty('--i', Math.min(i, 6));
                revealSet.push(el);
            });
        });
    });

    if ('IntersectionObserver' in window && revealSet.length) {
        var revealer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-in');
                    revealer.unobserve(entry.target);
                });
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0 }
        );

        revealSet.forEach(function (el) {
            revealer.observe(el);
        });
    } else {
        revealSet.forEach(function (el) {
            el.classList.add('is-in');
        });
    }

    /* ------------------------------------------------------------ tilt -- */

    var tiltBox = document.querySelector('.plate');

    if (tiltBox && !reduced && window.matchMedia('(hover: hover)').matches) {
        var frame = 0;

        tiltBox.addEventListener('pointermove', function (e) {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(function () {
                var r = tiltBox.getBoundingClientRect();
                var x = (e.clientX - r.left) / r.width - 0.5;
                var y = (e.clientY - r.top) / r.height - 0.5;
                tiltBox.classList.add('is-tilting');
                tiltBox.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg');
                tiltBox.style.setProperty('--rx', (-y * 9).toFixed(2) + 'deg');
                tiltBox.style.setProperty('--rz', '18px');
                tiltBox.style.setProperty('--gx', (50 + x * 100).toFixed(2) + '%');
                tiltBox.style.setProperty('--gy', (50 + y * 100).toFixed(2) + '%');
            });
        });

        tiltBox.addEventListener('pointerleave', function () {
            cancelAnimationFrame(frame);
            tiltBox.classList.remove('is-tilting');
            tiltBox.style.setProperty('--ry', '0deg');
            tiltBox.style.setProperty('--rx', '0deg');
            tiltBox.style.setProperty('--rz', '0px');
        });
    }

    /* ------------------------------------------------------------ filter -- */

    var chips = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
    var entries = Array.prototype.slice.call(document.querySelectorAll('.entry'));
    var status = document.getElementById('filterStatus');

    var labels = {
        semua: 'Semua',
        web: 'Web',
        mobile: 'Mobile',
        desktop: 'Desktop',
        eksperimen: 'Eksperimen'
    };

    if (chips.length && entries.length) {
        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                var key = chip.getAttribute('data-filter');
                var shown = 0;

                chips.forEach(function (c) {
                    var on = c === chip;
                    c.classList.toggle('is-on', on);
                    c.setAttribute('aria-pressed', on ? 'true' : 'false');
                });

                entries.forEach(function (entry) {
                    var match = key === 'semua' || entry.getAttribute('data-kind') === key;
                    entry.hidden = !match;
                    if (match) shown += 1;
                });

                if (status) {
                    status.textContent =
                        shown === 0
                            ? 'Belum ada proyek di kategori ini.'
                            : 'Menampilkan ' + shown + ' proyek ' + (labels[key] || key).toLowerCase() + '.';
                }
            });
        });
    }

    /* -------------------------------------------------------------- form -- */

    var form = document.getElementById('contactForm');
    var sendBtn = document.getElementById('sendBtn');
    var formStatus = document.getElementById('formStatus');

    if (form) {
        var rules = [
            {
                id: 'nama',
                err: 'err-nama',
                test: function (v) {
                    return v.trim().length >= 2;
                },
                message: 'Tulis nama Anda, minimal 2 karakter.'
            },
            {
                id: 'surel',
                err: 'err-surel',
                test: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
                },
                message: 'Alamat email belum benar. Contoh: nama@domain.com'
            },
            {
                id: 'subjek',
                err: 'err-subjek',
                test: function (v) {
                    return v.trim().length >= 3;
                },
                message: 'Tulis subjek singkat, minimal 3 karakter.'
            },
            {
                id: 'pesan',
                err: 'err-pesan',
                test: function (v) {
                    return v.trim().length >= 10;
                },
                message: 'Pesan terlalu pendek — minimal 10 karakter.'
            }
        ];

        function setError(rule, show) {
            var input = document.getElementById(rule.id);
            var box = document.getElementById(rule.err);
            var field = input.closest('.field');

            field.classList.toggle('is-invalid', show);
            input.setAttribute('aria-invalid', show ? 'true' : 'false');

            if (!box) return;
            box.hidden = !show;
            box.textContent = show ? rule.message : '';
        }

        function validate() {
            var firstBad = null;

            rules.forEach(function (rule) {
                var input = document.getElementById(rule.id);
                var ok = rule.test(input.value);
                setError(rule, !ok);
                if (!ok && !firstBad) firstBad = input;
            });

            if (firstBad) {
                firstBad.focus();
                return false;
            }
            return true;
        }

        rules.forEach(function (rule) {
            var input = document.getElementById(rule.id);
            if (!input) return;
            input.addEventListener('blur', function () {
                if (input.value.trim() === '') return;
                setError(rule, !rule.test(input.value));
            });
            input.addEventListener('input', function () {
                var field = input.closest('.field');
                if (!field.classList.contains('is-invalid')) return;
                setError(rule, !rule.test(input.value));
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (formStatus) {
                formStatus.textContent = '';
                formStatus.className = 'form__status mono';
            }

            if (!validate()) {
                if (formStatus) {
                    formStatus.textContent = 'Ada kolom yang perlu diperbaiki sebelum dikirim.';
                    formStatus.className = 'form__status mono is-err';
                }
                return;
            }

            if (sendBtn) {
                sendBtn.setAttribute('aria-busy', 'true');
                sendBtn.disabled = true;
            }
            if (formStatus) formStatus.textContent = 'Mengirim…';

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            })
                .then(function (response) {
                    if (response.ok) {
                        form.reset();
                        if (formStatus) {
                            formStatus.textContent =
                                'Terkirim. Terima kasih — saya balas ke email yang Anda tulis.';
                            formStatus.className = 'form__status mono is-ok';
                        }
                    } else {
                        return response.json().then(function (data) {
                            var detail =
                                data && data.errors
                                    ? data.errors
                                        .map(function (err) {
                                            return err.message;
                                        })
                                        .join(' ')
                                    : '';
                            throw new Error(detail || 'server');
                        });
                    }
                })
                .catch(function () {
                    if (formStatus) {
                        formStatus.textContent =
                            'Gagal terkirim. Periksa koneksi Anda, atau email langsung ke sandybkng@gmail.com.';
                        formStatus.className = 'form__status mono is-err';
                    }
                })
                .then(function () {
                    if (sendBtn) {
                        sendBtn.removeAttribute('aria-busy');
                        sendBtn.disabled = false;
                    }
                });
        });
    }
})();