import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const handlers = {};
const deleted = [];
const stored = new Map();
let networkCalls = 0;
const cache = {match: async request => stored.get(request.url), put: async (request, response) => stored.set(request.url, response)};
const context = {
  URL,
  self: {location: {origin: 'https://mackprojekt.com'}, addEventListener: (name, fn) => handlers[name] = fn, skipWaiting: async () => {}, clients: {claim: async () => {}}},
  caches: {keys: async () => ['mackprojekt-v1', 'mackprojekt-v2', 'mackprojekt-v3', 'other-app'], delete: async name => deleted.push(name), open: async () => cache},
  fetch: async () => {const version = ++networkCalls; return {ok: true, version, clone() {return this;}};},
};
vm.runInNewContext(fs.readFileSync('public/service-worker.js', 'utf8'), context);
let activation;
handlers.activate({waitUntil: promise => activation = promise});
await activation;
assert.deepEqual(deleted, ['mackprojekt-v1', 'mackprojekt-v2']);
const request = async (pathname, mode = 'cors', method = 'GET', origin = 'https://mackprojekt.com') => {
  let response;
  handlers.fetch({request: {url: origin + pathname, mode, method}, respondWith: promise => response = promise});
  return response;
};
for (const [url, mode] of [['/', 'navigate'], ['/innovation/index.txt?_rsc=old', 'cors'], ['/api/profile', 'cors'], ['/brand/amp-logo.jpg', 'cors']]) {
  const first = await request(url, mode);
  const second = await request(url, mode);
  assert.ok(second.version > first.version, `Stale response reused for ${url}`);
}
const staticFirst = await request('/_next/static/chunks/build-hash.js');
const staticSecond = await request('/_next/static/chunks/build-hash.js');
assert.equal(staticFirst.version, staticSecond.version);
assert.equal(await request('/api/contact', 'cors', 'POST'), undefined);
assert.equal(await request('/asset.js', 'cors', 'GET', 'https://other.example'), undefined);
console.log('Cache regression checks passed: fresh navigation/data/assets, versioned asset caching, scoped cleanup.');
