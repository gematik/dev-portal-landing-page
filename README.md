<img align="right" width="250" src="assets/svg/logo-gematik-developer-portal.svg"/><br/>

# gematik Developer Portal — Landing Page

The landing page for the gematik Developer Portal, providing a central hub for developers working with the Telematikinfrastruktur (TI).

**Live:** [https://developer.gematik.solutions](https://developer.gematik.solutions)

## Overview

A single-page website linking to:

- **[Developer Portal](https://portal.developer.gematik.solutions)** — API docs, interactive exploration, sandbox environments
- **Contract Testing** — API contract validation and compliance checks
- **[gemSpec Pages](https://gemspec.gematik.de/)** — TI specifications and implementation guides
- **[GitHub](https://github.com/gematik)** — Open source repos, code examples, and tools
- **[Blog & News](https://www.gematik.de/newsroom/news)** — Latest updates and announcements
- **[gemmunity Forum](https://www.gemmunity.de/community)** — Developer community

## Getting started

Serve the files with any static file server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js (npx)
npx serve .
```

Then open [http://localhost:8000](http://localhost:8000).

## Developing

This project build with:

- Pure HTML, CSS, JavaScript
- Google Fonts (Inter)
- Deployed via GitHub Pages

No specific build tool is needed.

### Project Structure

```txt
├── index.html                  # Main landing page
├── css/
│   └── style.css               # All styles
├── js/
│   └── main.js                 # Interactions & animations
├── assets/
│   └── favicon.svg             # Favicon
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment
└── README.md
```

### Tests

Run the link check script to verify all external URLs in the repository.
The script sends `HEAD` requests only.

```bash
python3 tests/check_links.py
```

Optional flags:

- `--root <path>` to scan a different folder
- `--timeout <seconds>` to change request timeout
- `--workers <n>` to control parallel checks
- `--allowlist <path>` to ignore known URLs (defaults to `tests/linkcheck-allowlist.yml`)

Run cookie consent tests (HTML/JS contract checks + Node runtime for accept/deny/GA gating).
Requires Python 3 and Node.js.

```bash
python3 tests/test_cookie_consent.py
```

## Deployment

The site is automatically deployed to GitHub Pages on every push to `main` via the workflow in `.github/workflows/deploy.yml`.

To set up GitHub Pages:

1. Go to repository **Settings → Pages**
2. Set source to **GitHub Actions**
3. Push to `main` — the workflow will handle the rest

## Contributing

If you want to contribute, please check our [CONTRIBUTING.md](./CONTRIBUTING.md).

## Release Notes

See [ReleaseNotes.md](./ReleaseNotes.md) for all information regarding the (latest) releases.

## License

Copyright 2026 gematik GmbH

Apache License, Version 2.0

See the [LICENSE](./LICENSE) for the specific language governing permissions and limitations under the License.

### Additional Notes and Disclaimer from gematik GmbH

1. Copyright notice: Each published work result is accompanied by an explicit statement of the license conditions for
   use. These are regularly typical conditions in connection with open source or free software. Programs
   described/provided/linked here are free software, unless otherwise stated.
2. Permission notice: Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
   associated documentation files (the "Software"), to deal in the Software without restriction, including without
   limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
   Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    1. The copyright notice (Item 1) and the permission notice (Item 2) shall be included in all copies or substantial
       portions of the Software.
    2. The software is provided "as is" without warranty of any kind, either express or implied, including, but not
       limited to, the warranties of fitness for a particular purpose, merchantability, and/or non-infringement. The
       authors or copyright holders shall not be liable in any manner whatsoever for any damages or other claims arising
       from, out of or in connection with the software or the use or other dealings with the software, whether in an
       action of contract, tort, or otherwise.
    3. The software is the result of research and development activities, therefore not necessarily quality assured and
       without the character of a liable product. For this reason, gematik does not provide any support or other user
       assistance (unless otherwise stated in individual cases and without justification of a legal obligation).
       Furthermore, there is no claim to further development and adaptation of the results to a more current state of
       the art.
3. Gematik may remove published results temporarily or permanently from the place of publication at any time without
   prior notice or justification.
4. Please note: Parts of this code may have been generated using AI-supported technology. Please take this into account,
   especially when troubleshooting, for security analyses and possible adjustments.