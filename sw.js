// Update cacheName when resources change
// it will add newly resources
// and remove old one in our Cache Storage
// naming convension is: resources-yy-mm-dd_hh:mm
// Push this file after when changed resources are already deployed in server
const cacheKey = 'service-worker-example';
const cacheName = `${cacheKey}-resources-2022-06-26_12:42`;

const addResourcesToCache = async (resources) => {
    const cache = await caches.open(cacheName);
    await cache.addAll(resources);
};

const folderName = 'service-worker-example';
self.addEventListener("install", (event) => {
    event.waitUntil(
        addResourcesToCache([
            // paths needs to be written relative to the origin, not app's root directory
            `/${folderName}/`,
            `/${folderName}/index.html`,
            `/${folderName}/style.css`,
            `/${folderName}/script.js`,
        ])
    );
});

const cacheFirst = async (request) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }
    return fetch(request);
};

self.addEventListener('fetch', (event) => {
    event.respondWith(cacheFirst(event.request));
});

const deleteCache = async key => {
    await caches.delete(key)
}

const deleteOldCaches = async () => {
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter(key => key !== cacheName && key.startsWith(cacheKey));
    await Promise.all(cachesToDelete.map(deleteCache));
}

self.addEventListener('activate', (event) => {
    event.waitUntil(deleteOldCaches());
});
