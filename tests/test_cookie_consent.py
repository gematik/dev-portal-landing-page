#!/usr/bin/env python3
# Copyright 2026, gematik GmbH
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# *******
#
# For additional notes and disclaimer from gematik and in case of changes
# by gematik, find details in the "Readme" file.

"""Tests for cookie consent banner + Google Analytics gating."""

from __future__ import annotations

import re
import shutil
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
COOKIES_JS = ROOT / "js" / "cookies.js"
I18N_JS = ROOT / "js" / "i18n.js"
STYLE_CSS = ROOT / "css" / "style.css"
RUNTIME_TEST = Path(__file__).resolve().parent / "cookie_consent_runtime.mjs"

GA_ID = "G-2ZJHX6TR23"
COOKIE_I18N_KEYS = (
    "cookie.title",
    "cookie.text",
    "cookie.accept",
    "cookie.deny",
    "cookie.settings",
    "cookie.settingsTitle",
    "cookie.settingsIntro",
    "cookie.essential",
    "cookie.essentialDesc",
    "cookie.alwaysOn",
    "cookie.analytics",
    "cookie.analyticsDesc",
    "cookie.save",
    "cookie.fab",
    "footer.privacy",
    "footer.cookies",
)


class CookieConsentContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.index = INDEX.read_text(encoding="utf-8")
        cls.cookies_js = COOKIES_JS.read_text(encoding="utf-8")
        cls.i18n_js = I18N_JS.read_text(encoding="utf-8")
        cls.style_css = STYLE_CSS.read_text(encoding="utf-8")

    def test_consent_mode_defaults_denied_in_head(self) -> None:
        head = self.index.split("</head>", 1)[0]
        self.assertIn("gtag('consent', 'default'", head)
        self.assertIn("analytics_storage: 'denied'", head)
        self.assertIn("ad_storage: 'denied'", head)
        self.assertIn("ad_user_data: 'denied'", head)
        self.assertIn("ad_personalization: 'denied'", head)

    def test_ga_is_not_loaded_unconditionally(self) -> None:
        # Must not ship a hard-coded async GA loader outside cookies.js
        unconditional = re.findall(
            r'<script[^>]+src="https://www\.googletagmanager\.com/gtag/js[^"]*"',
            self.index,
        )
        self.assertEqual(
            unconditional,
            [],
            "Google Analytics must only load after consent via cookies.js",
        )
        self.assertNotIn(f"gtag('config', '{GA_ID}')", self.index)

    def test_cookies_script_is_included(self) -> None:
        self.assertIn('src="js/cookies.js"', self.index)
        # cookies.js should run after i18n so translations are available
        i18n_pos = self.index.find('src="js/i18n.js"')
        cookies_pos = self.index.find('src="js/cookies.js"')
        self.assertGreater(i18n_pos, 0)
        self.assertGreater(cookies_pos, i18n_pos)

    def test_banner_markup_and_actions(self) -> None:
        required_ids = (
            "cookie-banner",
            "cookie-banner-main",
            "cookie-banner-detail",
            "cookie-analytics-toggle",
            "cookie-fab",
            "cookie-settings-open",
        )
        for element_id in required_ids:
            self.assertIn(f'id="{element_id}"', self.index)

        for action in ("accept", "deny", "settings", "save"):
            self.assertIn(f'data-cookie-action="{action}"', self.index)

        self.assertIn('role="dialog"', self.index)
        self.assertIn('aria-modal="true"', self.index)
        self.assertIn("hidden", self.index[self.index.find('id="cookie-banner"') :])

    def test_privacy_policy_link_present(self) -> None:
        self.assertIn("https://www.gematik.de/datenschutz", self.index)

    def test_cookies_js_gates_ga(self) -> None:
        self.assertIn(f"GA_MEASUREMENT_ID = '{GA_ID}'", self.cookies_js)
        self.assertIn("CONSENT_COOKIE = 'gematik_ga_consent'", self.cookies_js)
        self.assertIn("function initGoogleAnalytics", self.cookies_js)
        self.assertIn("analytics_storage: granted ? 'granted' : 'denied'", self.cookies_js)
        self.assertIn(
            "https://www.googletagmanager.com/gtag/js?id=",
            self.cookies_js,
        )
        self.assertIn("window.gematikCookieConsent", self.cookies_js)

    def test_i18n_keys_for_en_and_de(self) -> None:
        for lang in ("en:", "de:"):
            self.assertIn(lang, self.i18n_js)

        for key in COOKIE_I18N_KEYS:
            occurrences = self.i18n_js.count(f"'{key}':")
            self.assertGreaterEqual(
                occurrences,
                2,
                f"Expected EN+DE translations for {key}, found {occurrences}",
            )

        self.assertIn("'cookie.accept': 'Alles akzeptieren'", self.i18n_js)
        self.assertIn("'cookie.deny': 'Ablehnen'", self.i18n_js)

    def test_cookie_banner_styles_exist(self) -> None:
        for selector in (
            ".cookie-banner",
            ".cookie-banner__dialog",
            ".cookie-fab",
            ".footer__cookie-link",
        ):
            self.assertIn(selector, self.style_css)


@unittest.skipUnless(shutil.which("node"), "Node.js is required for runtime cookie tests")
class CookieConsentRuntimeTests(unittest.TestCase):
    def test_runtime_accept_deny_and_persistence(self) -> None:
        result = subprocess.run(
            ["node", str(RUNTIME_TEST)],
            cwd=str(ROOT),
            capture_output=True,
            text=True,
            check=False,
        )
        if result.returncode != 0:
            self.fail(
                "cookie_consent_runtime.mjs failed\n"
                f"stdout:\n{result.stdout}\n"
                f"stderr:\n{result.stderr}"
            )
        self.assertIn("OK", result.stdout)


def main() -> int:
    suite = unittest.defaultTestLoader.loadTestsFromModule(sys.modules[__name__])
    result = unittest.TextTestRunner(verbosity=2).run(suite)
    return 0 if result.wasSuccessful() else 1


if __name__ == "__main__":
    raise SystemExit(main())
