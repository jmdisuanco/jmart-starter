import App from './App.svelte'

const app = new App({
  target: document.body,
  props: {
    ver: '0.1.0',
  },
})

window.app = app

export default app
