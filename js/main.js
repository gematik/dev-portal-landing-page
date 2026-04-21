/*
 * Copyright 2026, gematik GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * *******
 *
 * For additional notes and disclaimer from gematik and in case of changes
 * by gematik, find details in the "Readme" file.
 */

/* ============================================
   gematik Developer Portal — JavaScript
   ============================================ */

(function () {
    'use strict';

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleNavbarScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 10) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });


    // --- Mobile navigation toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function () {
            const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isOpen);
            mainNav.classList.toggle('navbar__nav--open');
        });

        // Close nav when clicking a link
        mainNav.querySelectorAll('.navbar__link').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('navbar__nav--open');
            });
        });
    }


    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- Intersection Observer for scroll animations ---
    const animateElements = document.querySelectorAll('.section__header, .feature-card, .resource-card, .spec-card, .ecosystem-link, .cta__card');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate--visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        animateElements.forEach(function (el, index) {
            el.classList.add('animate');
            // Stagger delay based on position within parent grid
            const siblings = el.parentElement.querySelectorAll(':scope > .animate');
            const siblingIndex = Array.from(siblings).indexOf(el);
            if (siblingIndex > 0) {
                el.classList.add('animate--delay-' + Math.min(siblingIndex, 5));
            }
            observer.observe(el);
        });
    }


    // --- Active nav link highlighting ---
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.navbar__link');

    function updateActiveNav() {
        const scrollY = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('navbar__link--active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('navbar__link--active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // --- Feature detail panel toggle ---
    var featureToggles = document.querySelectorAll('[data-feature-toggle]');
    var featureDetails = document.querySelectorAll('.feature-detail');
    var featureCards = document.querySelectorAll('.feature-card[data-feature]');
    var featuresContainer = document.querySelector('.features > .container');
    var featuresGrid = document.querySelector('.features__grid');

    function isMobileLayout() {
        return window.matchMedia('(max-width: 1024px)').matches;
    }

    function resetPanelPositions() {
        // Move all panels back to their default position (after the grid)
        featureDetails.forEach(function (panel) {
            if (panel.parentElement !== featuresContainer) {
                featuresContainer.insertBefore(panel, featuresGrid.nextSibling);
            }
        });
    }

    function closeAllDetails() {
        featureDetails.forEach(function (panel) {
            panel.classList.remove('feature-detail--open');
            panel.setAttribute('aria-hidden', 'true');
        });
        featureCards.forEach(function (card) {
            card.classList.remove('feature-card--active');
        });
    }

    featureToggles.forEach(function (card) {
        card.addEventListener('click', function (e) {
            var featureId = card.getAttribute('data-feature-toggle');
            var panel = document.getElementById('feature-detail-' + featureId);
            if (!panel) return;

            var isOpen = panel.classList.contains('feature-detail--open');
            closeAllDetails();
            resetPanelPositions();

            if (!isOpen) {
                // On mobile, move panel right after the card inside the grid
                if (isMobileLayout()) {
                    card.after(panel);
                }
                panel.classList.add('feature-detail--open');
                panel.setAttribute('aria-hidden', 'false');
                card.classList.add('feature-card--active');
                setTimeout(function () {
                    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });

        // Allow keyboard activation
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // On resize, reset panel positions if switching to desktop
    window.addEventListener('resize', function () {
        if (!isMobileLayout()) {
            resetPanelPositions();
        }
    });

    featureDetails.forEach(function (panel) {
        var closeBtn = panel.querySelector('.feature-detail__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                closeAllDetails();
            });
        }
    });


    // --- Interactive Lifecycle Diagram ---
    // FHIR flags for validate steps (positional, not translatable)
    var validateFhirFlags = [true, true, false, false, false, false, false];

    function t(key) {
        var lang = document.documentElement.getAttribute('data-lang') || 'en';
        var i18n = window.__i18n;
        return (i18n && i18n[lang] && i18n[lang][key]) || (i18n && i18n.en && i18n.en[key]) || '';
    }

    function buildLifecycleDescriptions() {
        return {
            design: {
                title: t('lifecycle.design.title') || 'Design',
                text: t('lifecycle.design.text'),
                type: 'text'
            },
            validate: {
                title: t('lifecycle.validate.title') || 'Validate',
                text: t('lifecycle.validate.text'),
                type: 'steps',
                steps: (t('lifecycle.validate.steps') || '').split('|').map(function(label, i) {
                    return { label: label, fhirOnly: validateFhirFlags[i] || false };
                }),
                result: t('lifecycle.validate.result')
            },
            publish: {
                title: t('lifecycle.publish.title') || 'Publish',
                text: t('lifecycle.publish.text'),
                type: 'steps',
                steps: (t('lifecycle.publish.steps') || '').split('|').map(function(label) {
                    return { label: label, fhirOnly: false };
                }),
                split: (t('lifecycle.publish.split') || '').split('|').map(function(label) {
                    return { label: label };
                })
            },
            implementation: {
                title: t('lifecycle.implementation.title') || 'Implementation',
                text: t('lifecycle.implementation.text'),
                type: 'text'
            },
            testing: {
                title: t('lifecycle.testing.title') || 'Testing',
                text: t('lifecycle.testing.text'),
                type: 'steps',
                steps: (t('lifecycle.testing.steps') || '').split('|').map(function(label) {
                    return { label: label, fhirOnly: false };
                }),
                result: t('lifecycle.testing.result')
            },
            iteration: {
                title: t('lifecycle.iteration.title') || 'Iteration',
                text: t('lifecycle.iteration.text'),
                type: 'text'
            },
            devportal: {
                title: t('lifecycle.devportal.title') || 'Dev-Portal',
                text: t('lifecycle.devportal.text'),
                type: 'text'
            }
        };
    }

    var lifecycleDescriptions = buildLifecycleDescriptions();

    // Rebuild descriptions on language change
    document.addEventListener('langchange', function() {
        lifecycleDescriptions = buildLifecycleDescriptions();
    });

    var arrowSvg = '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 2v10M4 8l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    function renderLifecycleSteps(desc) {
        var html = '';
        if (desc.steps) {
            html += '<div class="lifecycle-pipeline">';
            desc.steps.forEach(function(step, i) {
                html += '<div class="pipeline-item' + (step.fhirOnly ? ' pipeline-item--fhir' : '') + '">';
                html += '<div class="pipeline-item__marker">';
                html += '<span class="pipeline-item__number">' + (i + 1) + '</span>';
                html += '</div>';
                html += '<div class="pipeline-item__content">';
                html += '<span class="pipeline-item__label">' + step.label + '</span>';
                if (step.fhirOnly) html += '<span class="pipeline-item__badge">FHIR</span>';
                html += '</div>';
                html += '</div>';
            });
            if (desc.result) {
                html += '<div class="pipeline-item pipeline-item--result">';
                html += '<div class="pipeline-item__marker">';
                html += '<span class="pipeline-item__icon">&#10003;</span>';
                html += '</div>';
                html += '<div class="pipeline-item__content">';
                html += '<span class="pipeline-item__label">' + desc.result + '</span>';
                html += '</div>';
                html += '</div>';
            }
            if (desc.split) {
                html += '<div class="pipeline-item pipeline-item--split-header">';
                html += '<div class="pipeline-item__marker"><span class="pipeline-item__icon">&#8599;</span></div>';
                html += '<div class="pipeline-item__content"><span class="pipeline-item__label">' + (t('lifecycle.devportal.title') || 'Dev-Portal') + '</span></div>';
                html += '</div>';
                html += '<div class="pipeline-split">';
                desc.split.forEach(function(s) {
                    html += '<div class="pipeline-split__item">' + s.label + '</div>';
                });
                html += '</div>';
            }
            html += '</div>';
        }
        return html;
    }

    var lifecycleBubbles = document.querySelectorAll('.lifecycle-bubble');
    var lifecycleDetail = document.getElementById('lifecycle-detail');

    if (lifecycleDetail) {
        var detailBody = lifecycleDetail.querySelector('.lifecycle-detail__body');
        var detailTitle = lifecycleDetail.querySelector('.lifecycle-detail__title');
        var detailDesc = lifecycleDetail.querySelector('.lifecycle-detail__desc');
        var detailSteps = lifecycleDetail.querySelector('.lifecycle-detail__steps');
        var detailClose = lifecycleDetail.querySelector('.lifecycle-detail__close');

        var container = document.querySelector('.lifecycle-container');

        function closeLifecycleDetail() {
            lifecycleDetail.classList.remove('lifecycle-detail--visible');
            lifecycleDetail.setAttribute('aria-hidden', 'true');
            lifecycleBubbles.forEach(function(b) { b.classList.remove('lifecycle-bubble--active'); });
            if (container) container.classList.remove('lifecycle-container--has-detail');
        }

        function updateDetailContent(desc, bubble) {
            detailTitle.textContent = desc.title;
            detailDesc.textContent = desc.text;
            detailSteps.innerHTML = desc.type === 'steps' ? renderLifecycleSteps(desc) : '';
            lifecycleBubbles.forEach(function(b) { b.classList.remove('lifecycle-bubble--active'); });
            bubble.classList.add('lifecycle-bubble--active');
        }

        lifecycleBubbles.forEach(function(bubble) {
            bubble.addEventListener('click', function(e) {
                e.stopPropagation();
                var key = bubble.getAttribute('data-lifecycle');
                var desc = lifecycleDescriptions[key];
                if (!desc) return;

                var wasActive = bubble.classList.contains('lifecycle-bubble--active');
                var panelOpen = lifecycleDetail.classList.contains('lifecycle-detail--visible');

                if (wasActive) {
                    // Close the panel
                    closeLifecycleDetail();
                } else if (panelOpen) {
                    // Switch content with cross-fade + smooth height
                    var oldHeight = lifecycleDetail.scrollHeight;
                    lifecycleDetail.style.height = oldHeight + 'px';
                    lifecycleDetail.style.transition = 'height 0.35s ease';
                    lifecycleDetail.classList.add('lifecycle-detail--fading');
                    setTimeout(function() {
                        updateDetailContent(desc, bubble);
                        // Measure unconstrained height
                        lifecycleDetail.style.height = 'auto';
                        var newHeight = lifecycleDetail.scrollHeight;
                        lifecycleDetail.style.height = oldHeight + 'px';
                        // Force reflow then animate to new height
                        lifecycleDetail.offsetHeight; // eslint-disable-line no-unused-expressions
                        lifecycleDetail.style.height = newHeight + 'px';
                        lifecycleDetail.classList.remove('lifecycle-detail--fading');
                        setTimeout(function() {
                            lifecycleDetail.style.height = '';
                            lifecycleDetail.style.transition = '';
                        }, 400);
                    }, 400);
                } else {
                    // Open fresh — fade in content after panel expands
                    lifecycleDetail.classList.add('lifecycle-detail--fading');
                    updateDetailContent(desc, bubble);
                    if (container) container.classList.add('lifecycle-container--has-detail');
                    lifecycleDetail.classList.add('lifecycle-detail--visible');
                    lifecycleDetail.setAttribute('aria-hidden', 'false');
                    setTimeout(function() {
                        lifecycleDetail.classList.remove('lifecycle-detail--fading');
                    }, 400);
                }
            });
        });

        if (detailClose) {
            detailClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeLifecycleDetail();
            });
        }
    }


    // Copy-to-clipboard buttons
    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        return Promise.resolve();
    }

    document.querySelectorAll('.code-copy-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var code = btn.closest('.getting-started__code-wrapper').querySelector('code');
            if (!code) return;
            copyToClipboard(code.textContent).then(function() {
                btn.classList.add('code-copy-btn--copied');
                btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                setTimeout(function() {
                    btn.classList.remove('code-copy-btn--copied');
                    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" stroke-width="1.5"/></svg>';
                }, 2000);
            });
        });
    });

})();
