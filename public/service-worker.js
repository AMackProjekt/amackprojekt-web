const CACHE_NAME = "mackprojekt-v3";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(
      names
        .filter((name) => name.startsWith("mackprojekt-") && name !== CACHE_NAME)
        .map((name) => caches.delete(name))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  // Only Next.js build-versioned assets are safe to keep across page visits.
  // HTML, RSC navigation payloads, API responses and unversioned files must
  // never be served from a previous release's service-worker cache.
  if (!url.pathname.startsWith("/_next/static/")) {
    event.respondWith(fetch(request, { cache: "no-cache" }));
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) {
        await cache.put(request, response.clone()).catch(() => undefined);
      }
      return response;
    })
  );
});
