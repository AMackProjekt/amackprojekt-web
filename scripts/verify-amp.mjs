import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const out = path.resolve('out');
const routes = ['', 'innovation', 'iwmlp', 'books', 'portals', 'careport', 'partnerships', 'media-kit', 'interest', 'reentry', 'waitlist', 'launch', 'privacy', 'terms'];
const home = fs.readFileSync(path.join(out, 'index.html'), 'utf8');
for (const name of ['I Want My Lawyer Present', 'KingMe', 'QueenMe', 'Mi Minks', 'CarePort Connect', 'Projekt Enterprise Portal Suite', 'Navigating Spiritual Warfare', 'AlphaKode', 'MackEnterprises']) {
  assert.ok(home.includes(name), `Missing restored portfolio item: ${name}`);
}
for (const route of routes) {
  const html = fs.readFileSync(path.join(out, route, 'index.html'), 'utf8');
  assert.ok(!html.includes('MackChat'), `Retired product still advertised: ${route}`);
  assert.equal((html.match(/<footer\b/g) || []).length, 1, `Expected one footer: ${route}`);
  for (const [, url] of html.matchAll(/(?:src|poster)="(\/[^"?#]+)"/g)) {
    assert.ok(fs.existsSync(path.join(out, decodeURIComponent(url))), `Missing asset ${url} on ${route}`);
  }
}
const config = JSON.parse(fs.readFileSync(path.join(out, 'staticwebapp.config.json'), 'utf8'));
assert.ok(!config.routes.some(r => r.route === '/partnerships/*' && r.rewrite), 'Page rewrite intercepts logo assets');
assert.match(config.globalHeaders['Cache-Control'], /no-cache/);
const sw = fs.readFileSync(path.join(out, 'service-worker.js'), 'utf8');
assert.ok(sw.includes('/_next/static/'), 'Service worker must limit persistent caching to versioned assets');
console.log(`AMP release verified: ${routes.length} routes, restored portfolio, local assets, routing and cache policy.`);

for (const asset of JSON.parse(fs.readFileSync('scripts/amp-assets.json', 'utf8'))) {
  const bytes = fs.readFileSync(path.join(out, asset.path));
  assert.equal(bytes.length, asset.bytes, 'Truncated brand asset: ' + asset.path);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, 'Corrupted brand asset: ' + asset.path);
}
console.log('Original brand asset integrity verified.');

const normalizedRoutes = config.routes.map(r => r.route.replace(/\/$/, '') || '/');
assert.equal(new Set(normalizedRoutes).size, normalizedRoutes.length, 'Azure treats trailing-slash routes as duplicates');
