#!/usr/bin/env node
/**
 * Copyright 2026, gematik GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Runtime checks for js/cookies.js using a minimal DOM/storage mock.
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const COOKIES_JS = path.join(ROOT, 'js', 'cookies.js');
const GA_ID = 'G-2ZJHX6TR23';

function matches(el, selector) {
  if (selector.startsWith('#')) return el.id === selector.slice(1);
  const attr = selector.match(/^\[([^=\]]+)(?:=["']?([^"'\]]+)["']?)?\]$/);
  if (attr) {
    const value = el.getAttribute(attr[1]);
    if (attr[2] == null) return value != null;
    return value === attr[2];
  }
  return false;
}

function find(root, selector) {
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (matches(node, selector)) return node;
    for (const child of node.children || []) stack.push(child);
  }
  return null;
}

function createElement(tag, attrs = {}) {
  const listeners = {};
  const el = {
    tagName: String(tag).toUpperCase(),
    attrs: { ...attrs },
    children: [],
    style: {},
    hidden: Boolean(attrs.hidden),
    classList: {
      _vals: new Set(),
      add(v) { this._vals.add(v); },
      remove(v) { this._vals.delete(v); },
      contains(v) { return this._vals.has(v); },
    },
    setAttribute(name, value) { this.attrs[name] = String(value); },
    getAttribute(name) { return Object.prototype.hasOwnProperty.call(this.attrs, name) ? this.attrs[name] : null; },
    addEventListener(type, fn) { (listeners[type] ||= []).push(fn); },
    dispatchEvent(event) { for (const fn of listeners[event.type] || []) fn(event); },
    focus() {},
    appendChild(child) { this.children.push(child); return child; },
    querySelector(selector) { return find(this, selector); },
    get checked() { return Boolean(this._checked); },
    set checked(v) { this._checked = Boolean(v); },
  };

  if ('id' in attrs) el.id = attrs.id;

  Object.defineProperty(el, 'src', {
    configurable: true,
    enumerable: true,
    get() { return this._src || this.attrs.src || ''; },
    set(v) { this._src = String(v); this.attrs.src = this._src; },
  });
  Object.defineProperty(el, 'async', {
    configurable: true,
    enumerable: true,
    get() { return Boolean(this._async); },
    set(v) { this._async = Boolean(v); },
  });

  return el;
}

function buildDom() {
  const banner = createElement('div', { id: 'cookie-banner', hidden: true });
  const main = createElement('div', { id: 'cookie-banner-main' });
  const detail = createElement('div', { id: 'cookie-banner-detail', hidden: true });
  const toggle = createElement('input', { id: 'cookie-analytics-toggle' });
  const fab = createElement('button', { id: 'cookie-fab', hidden: true });
  const footerOpen = createElement('button', { id: 'cookie-settings-open' });
  const accept = createElement('button', { 'data-cookie-action': 'accept' });
  const save = createElement('button', { 'data-cookie-action': 'save' });

  banner.children.push(main, detail);
  main.children.push(accept);
  detail.children.push(toggle, save);

  const body = createElement('body');
  body.children.push(banner, fab, footerOpen);
  body.classList = {
    _vals: new Set(),
    add(v) { this._vals.add(v); },
    remove(v) { this._vals.delete(v); },
    contains(v) { return this._vals.has(v); },
  };

  const head = createElement('head');
  const byId = {
    'cookie-banner': banner,
    'cookie-banner-main': main,
    'cookie-banner-detail': detail,
    'cookie-analytics-toggle': toggle,
    'cookie-fab': fab,
    'cookie-settings-open': footerOpen,
  };

  const document = {
    body,
    head,
    documentElement: createElement('html'),
    readyState: 'complete',
    getElementById(id) { return byId[id] || null; },
    createElement(tag) { return createElement(tag); },
    addEventListener() {},
  };

  return { document, banner, fab };
}

function createContext(initialConsent) {
  const storage = new Map();
  if (initialConsent) storage.set('gematik_ga_consent', initialConsent);

  const gtagCalls = [];
  const appendedScripts = [];
  const { document, banner, fab } = buildDom();

  let cookieJar = '';
  if (initialConsent === 'accepted') cookieJar = 'gematik_ga_consent=accepted';
  if (initialConsent === 'declined') cookieJar = 'gematik_ga_consent=declined';

  Object.defineProperty(document, 'cookie', {
    configurable: true,
    get() { return cookieJar; },
    set(value) {
      const [pair] = String(value).split(';');
      const eq = pair.indexOf('=');
      const name = pair.slice(0, eq).trim();
      const val = pair.slice(eq + 1).trim();
      const parts = cookieJar ? cookieJar.split('; ').filter(Boolean) : [];
      const next = parts.filter((p) => !p.startsWith(`${name}=`));
      if (!String(value).includes('max-age=0')) next.push(`${name}=${val}`);
      cookieJar = next.join('; ');
    },
  });

  document.head.appendChild = function appendChild(child) {
    appendedScripts.push(child);
    return child;
  };

  function gtag() {
    gtagCalls.push(Array.from(arguments));
  }

  const context = {
    document,
    location: { protocol: 'http:', hostname: 'localhost' },
    localStorage: {
      getItem(key) { return storage.has(key) ? storage.get(key) : null; },
      setItem(key, value) { storage.set(key, String(value)); },
      removeItem(key) { storage.delete(key); },
    },
    gtag,
    dataLayer: [],
    console,
  };
  context.window = context;

  return { context, gtagCalls, appendedScripts, storage, document, banner, fab };
}

function load(ctx) {
  const code = fs.readFileSync(COOKIES_JS, 'utf8');
  vm.runInNewContext(code, ctx.context, { filename: 'cookies.js' });
}

function main() {
  {
    const ctx = createContext(null);
    load(ctx);
    assert.equal(ctx.banner.hidden, false, 'banner should show without consent');
    assert.equal(ctx.appendedScripts.length, 0, 'GA must not load before consent');
    assert.ok(ctx.context.gematikCookieConsent, 'public API should exist');
  }

  {
    const ctx = createContext(null);
    load(ctx);
    ctx.context.gematikCookieConsent.accept();
    assert.equal(ctx.storage.get('gematik_ga_consent'), 'accepted');
    assert.match(ctx.document.cookie, /gematik_ga_consent=accepted/);
    assert.equal(ctx.banner.hidden, true);
    assert.equal(ctx.appendedScripts.length, 1);
    assert.equal(ctx.appendedScripts[0].src, `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
    const update = ctx.gtagCalls.find((c) => c[0] === 'consent' && c[1] === 'update');
    assert.ok(update);
    assert.equal(update[2].analytics_storage, 'granted');
    const config = ctx.gtagCalls.find((c) => c[0] === 'config');
    assert.ok(config);
    assert.equal(config[1], GA_ID);
  }

  {
    const ctx = createContext(null);
    load(ctx);
    ctx.context.gematikCookieConsent.deny();
    assert.equal(ctx.storage.get('gematik_ga_consent'), 'declined');
    assert.equal(ctx.appendedScripts.length, 0);
    assert.equal(ctx.banner.hidden, true);
    const update = ctx.gtagCalls.find((c) => c[0] === 'consent' && c[1] === 'update');
    assert.ok(update);
    assert.equal(update[2].analytics_storage, 'denied');
  }

  {
    const ctx = createContext('accepted');
    load(ctx);
    assert.equal(ctx.banner.hidden, true);
    assert.equal(ctx.appendedScripts.length, 1);
    assert.equal(ctx.fab.hidden, false);
  }

  {
    const ctx = createContext('declined');
    load(ctx);
    assert.equal(ctx.banner.hidden, true);
    assert.equal(ctx.appendedScripts.length, 0);
    assert.equal(ctx.context.gematikCookieConsent.getConsent(), 'declined');
  }

  console.log('OK cookie consent runtime');
}

main();
