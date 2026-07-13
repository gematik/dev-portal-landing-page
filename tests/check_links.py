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

"""Check external URLs in project files using HTTP HEAD requests.

Falls back to a GET request when a server rejects HEAD (e.g. 405).
"""

from __future__ import annotations

import argparse
import re
import socket
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Iterable
from urllib import request
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit

URL_PATTERN = re.compile(r"https?://[^\s<>'\"()]+", re.IGNORECASE)
SUPPORTED_SUFFIXES = {".html", ".htm", ".md", ".js", ".css", ".svg"}
DEFAULT_TIMEOUT_SECONDS = 10
DEFAULT_WORKERS = 8
DEFAULT_ALLOWLIST_PATH = Path("tests/linkcheck-allowlist.yml")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Validate external links with HTTP HEAD requests."
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=Path("."),
        help="Project root folder to scan (default: current directory).",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=DEFAULT_TIMEOUT_SECONDS,
        help=f"Timeout in seconds for each HEAD request (default: {DEFAULT_TIMEOUT_SECONDS}).",
    )
    parser.add_argument(
        "--workers",
        type=int,
        default=DEFAULT_WORKERS,
        help=f"Number of parallel workers (default: {DEFAULT_WORKERS}).",
    )
    parser.add_argument(
        "--allowlist",
        type=Path,
        default=DEFAULT_ALLOWLIST_PATH,
        help=(
            "YAML file with URLs to ignore "
            f"(default: {DEFAULT_ALLOWLIST_PATH})."
        ),
    )
    return parser.parse_args()


def iter_candidate_files(root: Path) -> Iterable[Path]:
    for path in root.rglob("*"):
        if not path.is_file():
            continue
        if any(part.startswith(".git") for part in path.parts):
            continue
        if path.suffix.lower() in SUPPORTED_SUFFIXES:
            yield path


def extract_urls(path: Path) -> set[str]:
    try:
        content = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        content = path.read_text(encoding="utf-8", errors="ignore")
    return set(URL_PATTERN.findall(content))


def normalize_url(url: str) -> str:
    return url.rstrip(".,;:!?)]]")


def load_allowlist(path: Path) -> set[str]:
    if not path.exists():
        return set()

    entries: set[str] = set()
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("- "):
            value = line[2:].strip().strip("'\"")
            if value:
                entries.add(normalize_url(value))
    return entries


# Status codes that indicate the server rejects the HTTP method itself
# rather than the resource being unavailable. In these cases we retry
# with a GET request, since many servers do not implement HEAD.
METHOD_FALLBACK_STATUS = {403, 405, 501}


def _request_url(url: str, method: str, timeout: float) -> tuple[bool, str]:
    req = request.Request(
        url,
        method=method,
        headers={"User-Agent": "link-checker/1.0"},
    )
    try:
        with request.urlopen(req, timeout=timeout) as response:
            status = response.getcode()
            return 200 <= status < 400, str(status)
    except HTTPError as err:
        return False, str(err.code)
    except (URLError, TimeoutError, socket.timeout) as err:
        return False, f"ERROR: {err}"
    except Exception as err:  # pragma: no cover
        return False, f"ERROR: {err}"


def validate_url(url: str, timeout: float) -> tuple[str, bool, str]:
    normalized = normalize_url(url)
    try:
        parts = urlsplit(normalized)
    except ValueError as err:
        return normalized, False, f"ERROR: {err}"
    if parts.scheme not in {"http", "https"}:
        return normalized, True, "SKIPPED"

    ok, status = _request_url(normalized, "HEAD", timeout)

    # Some servers do not allow HEAD requests and answer with 405 (or
    # 403/501). Retry with GET so these links are not reported as broken.
    if not ok and status.isdigit() and int(status) in METHOD_FALLBACK_STATUS:
        ok, status = _request_url(normalized, "GET", timeout)

    return normalized, ok, status


def main() -> int:
    args = parse_args()
    root = args.root.resolve()
    allowlist_path = args.allowlist.resolve()
    allowlisted_urls = load_allowlist(allowlist_path)

    urls: set[str] = set()
    for file_path in iter_candidate_files(root):
        urls.update(extract_urls(file_path))

    if not urls:
        print("No external URLs found.")
        return 0

    if allowlisted_urls:
        print(
            f"Loaded {len(allowlisted_urls)} allowlisted URL(s) from {allowlist_path}."
        )

    print(f"Checking {len(urls)} unique URLs with HEAD requests...")
    failures: list[tuple[str, str]] = []

    with ThreadPoolExecutor(max_workers=max(1, args.workers)) as pool:
        futures = {pool.submit(validate_url, url, args.timeout): url for url in sorted(urls)}
        for future in as_completed(futures):
            url, ok, status = future.result()
            if url in allowlisted_urls:
                print(f"[ALLOWLISTED] {status} {url}")
                continue
            icon = "OK" if ok else "FAIL"
            print(f"[{icon}] {status} {url}")
            if not ok:
                failures.append((url, status))

    print()
    if failures:
        print(f"Broken URLs found: {len(failures)}")
        for url, status in failures:
            print(f"- {status} {url}")
        return 1

    print("All URLs responded successfully to HEAD.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
