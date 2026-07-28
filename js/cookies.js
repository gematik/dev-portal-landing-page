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

/**
 * Cookie consent + Google Analytics gate.
 * Banner appears until a consent choice is stored (GA cookies not yet allowed).
 * Accepting enables Consent Mode analytics_storage and loads gtag.
 */
(function () {
    'use strict';

    var GA_MEASUREMENT_ID = 'G-2ZJHX6TR23';
    var CONSENT_COOKIE = 'gematik_ga_consent';
    var CONSENT_STORAGE_KEY = 'gematik_ga_consent';
    var CONSENT_MAX_AGE_DAYS = 365;
    var gaInitialized = false;

    function getStoredConsent() {
        try {
            var fromStorage = localStorage.getItem(CONSENT_STORAGE_KEY);
            if (fromStorage === 'accepted' || fromStorage === 'declined') {
                return fromStorage;
            }
        } catch (e) { /* ignore */ }

        var match = document.cookie.match(new RegExp('(?:^|; )' + CONSENT_COOKIE + '=([^;]*)'));
        if (!match) return null;
        if (match[1] === 'accepted' || match[1] === '1') return 'accepted';
        if (match[1] === 'declined' || match[1] === '0') return 'declined';
        return null;
    }

    function persistConsent(value) {
        try {
            localStorage.setItem(CONSENT_STORAGE_KEY, value);
        } catch (e) { /* ignore */ }

        var maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60;
        var secure = location.protocol === 'https:' ? '; Secure' : '';
        document.cookie = CONSENT_COOKIE + '=' + value +
            '; path=/; max-age=' + maxAge +
            '; SameSite=Lax' + secure;
    }

    function hasGaCookies() {
        return /(?:^|; )_ga(?:=|_[^=]+=)/.test(document.cookie);
    }

    function updateConsentMode(granted) {
        if (typeof gtag !== 'function') return;
        gtag('consent', 'update', {
            analytics_storage: granted ? 'granted' : 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
        });
    }

    function initGoogleAnalytics() {
        if (gaInitialized) return;
        gaInitialized = true;

        updateConsentMode(true);

        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        if (typeof gtag !== 'function') {
            window.gtag = function () { dataLayer.push(arguments); };
        }
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
    }

    function disableGoogleAnalytics() {
        updateConsentMode(false);
        // Expire common GA cookies if they were set previously
        ['_ga', '_gid', '_gat', '_ga_' + GA_MEASUREMENT_ID.replace(/^G-/, '')].forEach(function (name) {
            document.cookie = name + '=; path=/; max-age=0; SameSite=Lax';
            document.cookie = name + '=; path=/; domain=' + location.hostname + '; max-age=0; SameSite=Lax';
        });
    }

    function showBanner(openSettings) {
        var banner = document.getElementById('cookie-banner');
        var main = document.getElementById('cookie-banner-main');
        var detail = document.getElementById('cookie-banner-detail');
        if (!banner) return;

        banner.hidden = false;
        document.body.classList.add('cookie-banner-open');

        if (openSettings) {
            main.hidden = true;
            detail.hidden = false;
            var toggle = document.getElementById('cookie-analytics-toggle');
            if (toggle) toggle.checked = getStoredConsent() === 'accepted';
        } else {
            main.hidden = false;
            detail.hidden = true;
        }

        var fab = document.getElementById('cookie-fab');
        if (fab) fab.hidden = true;

        var focusTarget = banner.querySelector(openSettings
            ? '[data-cookie-action="save"]'
            : '[data-cookie-action="accept"]');
        if (focusTarget) focusTarget.focus();
    }

    function hideBanner() {
        var banner = document.getElementById('cookie-banner');
        if (banner) banner.hidden = true;
        document.body.classList.remove('cookie-banner-open');

        var main = document.getElementById('cookie-banner-main');
        var detail = document.getElementById('cookie-banner-detail');
        if (main) main.hidden = false;
        if (detail) detail.hidden = true;

        var fab = document.getElementById('cookie-fab');
        if (fab) fab.hidden = false;
    }

    function acceptAll() {
        persistConsent('accepted');
        initGoogleAnalytics();
        hideBanner();
    }

    function denyAll() {
        persistConsent('declined');
        disableGoogleAnalytics();
        hideBanner();
    }

    function saveSettings() {
        var toggle = document.getElementById('cookie-analytics-toggle');
        if (toggle && toggle.checked) {
            acceptAll();
        } else {
            denyAll();
        }
    }

    function bindEvents() {
        var banner = document.getElementById('cookie-banner');
        if (!banner) return;

        banner.addEventListener('click', function (event) {
            var actionEl = event.target.closest('[data-cookie-action]');
            if (!actionEl || !banner.contains(actionEl)) return;

            var action = actionEl.getAttribute('data-cookie-action');
            if (action === 'accept') acceptAll();
            else if (action === 'deny') denyAll();
            else if (action === 'settings') showBanner(true);
            else if (action === 'save') saveSettings();
            else if (action === 'close-settings') {
                // Backdrop closes only the settings view when a prior choice exists
                if (getStoredConsent()) hideBanner();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key !== 'Escape') return;
            if (banner.hidden) return;
            if (getStoredConsent()) hideBanner();
        });

        var fab = document.getElementById('cookie-fab');
        if (fab) {
            fab.addEventListener('click', function () {
                showBanner(true);
            });
        }

        var footerOpen = document.getElementById('cookie-settings-open');
        if (footerOpen) {
            footerOpen.addEventListener('click', function () {
                showBanner(true);
            });
        }
    }

    function boot() {
        bindEvents();

        var consent = getStoredConsent();

        if (consent === 'accepted') {
            initGoogleAnalytics();
            var fab = document.getElementById('cookie-fab');
            if (fab) fab.hidden = false;
            return;
        }

        if (consent === 'declined') {
            disableGoogleAnalytics();
            var fabDeclined = document.getElementById('cookie-fab');
            if (fabDeclined) fabDeclined.hidden = false;
            return;
        }

        // No consent choice yet (and typically no GA cookies) → show banner
        if (!hasGaCookies() || !consent) {
            showBanner(false);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    window.gematikCookieConsent = {
        open: function () { showBanner(true); },
        accept: acceptAll,
        deny: denyAll,
        getConsent: getStoredConsent
    };
})();
