const CACHE_NAME = 'jp-voice-v8.5';
const ASSETS = [
  'index.html',
  'manifest.json',
  'https://raw.githubusercontent.com/ox0114xo/Japan/refs/heads/main/IMG_20260225_194735.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((key) => {
      if (key !== CACHE_NAME) return caches.delete(key);
    })))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});
