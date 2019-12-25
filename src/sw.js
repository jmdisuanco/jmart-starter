
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js')
workbox.setConfig({ debug: false });
const cacheName = 'JMart-App';
const precacheCacheName = workbox.core.cacheNames.precache
const runtimeCacheName = workbox.core.cacheNames.runtime

let pwa = () => {
  workbox.core.setCacheNameDetails({
    prefix: 'jmart',
    suffix: 'v1',
  })

workbox.precaching.precacheAndRoute([]);
  

  workbox.routing.registerRoute(
    new RegExp('/'),
    workbox.strategies.cacheFirst()
  )

  workbox.routing.registerRoute(
    new RegExp('.*\.html'),
    workbox.strategies.cacheFirst()
  )
  workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.cacheFirst()
  )


  workbox.routing.registerRoute(
    // Cache CSS files
    /.*\.css/,
    // Use cache but update in the background ASAP
    workbox.strategies.staleWhileRevalidate({
      // Use a custom cache name
      cacheName: 'css-cache',
    })
  )

  workbox.routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    // Use the cache if it's available
    workbox.strategies.cacheFirst({
      // Use a custom cache name
      cacheName: 'jmart-image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images
          maxEntries: 60,
          // Cache for a maximum of a month
          maxAgeSeconds: 30 * 24 * 60 * 60,
        })
      ],
    })
  )
  

}



if (workbox) {
  pwa()
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}