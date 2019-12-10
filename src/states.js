import { writable } from 'svelte/store'

let states = {
  page: writable(), //used by router
}

export default states
