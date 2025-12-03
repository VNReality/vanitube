
const CACHE_NAME = 'vtube-cache-v1';
const PRECACHE_URLS = [
  '/vtube_pwa/index.html',
  '/vtube_pwa/manifest.json',
  '/vtube_pwa/icons/icon-192.png',
  '/vtube_pwa/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // only handle same-origin requests for caching
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then(networkResponse => {
          // put a copy in the runtime cache
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }).catch(() => {
          // fallback to index.html for navigation requests (SPA-like)
          if (event.request.mode === 'navigate') {
            return caches.match('/vtube_pwa/index.html');
          }
        });
      })
    );
  }
});
