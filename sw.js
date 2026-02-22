const CACHE_NAME = 'jp-speech-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 安裝 Service Worker 並快取核心檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截網路請求，若有快取則返回快取，否則發送網路請求
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
