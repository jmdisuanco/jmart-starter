import Fetch from './fetch'

let url = ''

const list = async () => {
  let result = await Fetch('GET', url)
  return result
}

const pick = async (args) => {
  let result = await Fetch('GET', `${url}?limit=${args[0]}&skip=${args[1]}`)
  return result
}

const get = async (args) => {
  let result = await Fetch('GET', `${url}/${args[0]}`)
  return result
}

const create = async (arg) => {
  let result = await Fetch('POST', `${url}`, arg[0])
  return result
}

const update = async (arg) => {
  let result = await Fetch('PUT', `${url}/${arg[0]}`, arg[1])
  return result
}

const destroy = async (arg) => {
  let result = await Fetch('DELETE', `${url}/${arg[0]}`)
  return result
}

const count = async () => {
  let result = await Fetch('GET', `${url}/count`)
  return result
}

const action = { count, create, destroy, get, list, pick, update }

const service = (endpoint) => (fn, ...args) => {
  url = endpoint
  return action[fn](args)
}

export default service
