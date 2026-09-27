// Theophilus's service worker. This is a template: the build (vite.config.ts) fills in VERSION and PRECACHE.
// The whole app is cached on install, so it works offline and loads from the device on later visits. Mounce's
// recordings are kept as they are first played; his server doesn't allow other sites to read them, so the copies are
// "opaque", which Chrome, Edge and Android can play back offline but Safari can't (there they still need a connection).

const VERSION = /* VERSION */ 'dev'
const PRECACHE = /* PRECACHE */ []
const APP_CACHE = `app-${VERSION}`
const FONT_CACHE = 'fonts'
const RECORDING_CACHE = 'recordings'

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(APP_CACHE).then((cache) => cache.addAll(PRECACHE)))
})

// A new version waits until the page asks for it (the "new version" banner), so an open page never has the files
// it was built with removed from under it.
self.addEventListener('message', (event) => {
  if (event.data === 'skip-waiting') self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith('app-') && key !== APP_CACHE) await caches.delete(key)
    }
    await self.clients.claim()
  })())
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return
  const url = new URL(request.url)

  // Pages: the network first, so a new version is seen; the cached page when offline.
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('/index.html')))
    return
  }

  // The app's own files: their names change with their contents, so a cached copy is always right.
  if (url.origin === self.location.origin) {
    event.respondWith(caches.match(request).then((hit) => hit ?? fetch(request)))
    return
  }

  // Google Fonts: the cached copy straight away, refreshed in the background.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(caches.open(FONT_CACHE).then(async (cache) => {
      const hit = await cache.match(request)
      const fresh = fetch(request).then((response) => {
        if (response.ok || response.type === 'opaque') cache.put(request, response.clone())
        return response
      })
      if (!hit) return fresh
      fresh.catch(() => {})
      return hit
    }))
  }
  // Mounce's recordings: the kept copy if there is one, otherwise the network, keeping a copy for next time.
  if (url.hostname === 'greek.billmounce.com' && url.pathname.endsWith('.mp3')) {
    event.respondWith(recording(request))
  }
  // Anything else goes to the network as usual.
})

async function recording(request) {
  const cache = await caches.open(RECORDING_CACHE)
  const hit = await cache.match(request.url)
  if (hit) return hit
  const response = await fetch(request)
  // Keep the player's own first request, which asks for the whole file from byte 0 ("bytes=0-"); Chrome only plays an
  // opaque copy back if it answered such a request. A later range (after seeking) would be partial, so isn't kept.
  const range = request.headers.get('range')
  if (!range || range === 'bytes=0-') cache.put(request.url, response.clone()).catch(() => {})
  return response
}
