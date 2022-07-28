// Service Worker
const cacheName = 'sw-v5';

self.addEventListener('install', (event) => {
  const preCache = async () => {
    const cache = await caches.open(cacheName);
    return cache.addAll(['/']);
  };
  event.waitUntil(preCache());
});

self.addEventListener('fetch', (event) => {
  // Prevent the default, and handle the request ourselves.
  event.respondWith(
    (async function () {
      // Try to get the response from a cache.
      const cachedResponse = await caches.match(event.request);
      // Return it if we found one.
      if (cachedResponse) return cachedResponse;
      // If we didn't find a match in the cache, use the network.
      return fetch(event.request);
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
