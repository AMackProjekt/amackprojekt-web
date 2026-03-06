const CACHE_NAME = 'mackprojekt-v1';
const urlsToCache = [
  '/',
  '/logos/amp-logo.jpeg',
  '/manifest.json'
];

// Only cache HTTP/HTTPS requests
const isCacheableRequest = (request) => {
  const url = new URL(request.url);
  // Only cache http and https schemes
  return url.protocol === 'http:' || url.protocol === 'https:';
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  // Skip non-cacheable requests (chrome-extension, etc.)
  if (!isCacheableRequest(event.request)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          (response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            // Only cache if it's a cacheable request
            if (isCacheableRequest(event.request)) {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache).catch((err) => {
                    console.warn('Cache put failed:', err);
                  });
                })
                .catch((err) => {
                  console.warn('Cache open failed:', err);
                });
            }

            return response;
          }
        ).catch((err) => {
          console.warn('Fetch failed:', err);
          // Try to return cached response on network error
          return caches.match(event.request);
        });
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
