import App from './App.svelte';
/*
Service Worker
*/

let registerSW = async () => {
  if ('serviceWorker' in navigator) { // (2)
    try {
      console.log('add')
      await navigator.serviceWorker.register('./sw.js'); // (3)
    } catch (e) {

      console.log('ServiceWorker registration failed. Sorry about that.',e); // (4)
    }
  }
}

window.addEventListener('load', (e) => {
  registerSW()
})
let url = new URLSearchParams(window.location)
let app = new App({
  target: document.body,
  props: {
    setPage: '/index',
  },
})

window.app = app

export default app
