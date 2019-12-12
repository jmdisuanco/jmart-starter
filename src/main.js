import App from './App.svelte'
let url = new URLSearchParams(window.location)
let app = new App({
  target: document.body,
  props: {
    setPage: '/index',
  },
})

window.app = app

export default app
