const STATIC_CACHE_NAME = "static-cache-v2";
const DYNAMIC_CACHE_NAME = "dynamic-cache-v2";

const ASSETS = ["/", "/index.html", "/manifest.json"];

self.addEventListener("install", async (event) => {
  const cache = await caches.open(STATIC_CACHE_NAME);
  await cache.addAll(ASSETS);
});

self.addEventListener("activate", async (event) => {
  const cachesKeysArr = await caches.keys();
  await Promise.all(
    cachesKeysArr
      .filter((key) => key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME)
      .map((key) => caches.delete(key))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  try {
    return (
      cached ??
      (await fetch(request).then((response) => {
        return networkFirst(request);
      }))
    );
  } catch (error) {
    return networkFirst(request);
  }
}
async function networkFirst(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    return cached ?? (await caches.match("/offline.html"));
  }
}
