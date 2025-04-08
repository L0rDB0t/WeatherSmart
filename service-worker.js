const CACHE_NAME = 'weather-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/img/clear.jpg',
  '/img/rain.jpg',
  '/img/clouds.jpg',
  '/img/snow.jpg',
  '/img/thunder.jpg',
  '/img/default.jpg'
];

// Instalar el Service Worker y guardar en caché los archivos esenciales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptar peticiones y responder desde la caché si es posible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

window.addEventListener('offline', () => {
    alert("🚫 Estás sin conexión. Estás viendo una versión en caché.");
  });
  
