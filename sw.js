const CACHE_NAME = 'portfolio-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/about.html',
    '/projects.html',
    '/contact.html',
    '/assets/css/style.css',
    '/assets/js/main.js',
    '/assets/js/theme-toggle.js',
    '/assets/js/lang-switcher.js',
    '/assets/js/easter-egg.js',
    '/assets/js/features.js',
    '/assets/images/avatar.jpg',
    '/assets/images/project1.jpg',
    '/assets/images/project2.jpg',
    '/assets/images/project3.jpg',
    '/assets/images/blog1.jpg',
    '/manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// Install Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch Event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached response if found
                if (response) {
                    return response;
                }
                
                // Clone the request
                const fetchRequest = event.request.clone();
                
                // Make network request and cache the response
                return fetch(fetchRequest).then(response => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clone the response
                    const responseToCache = response.clone();
                    
                    // Cache the response
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                });
            })
    );
}); 