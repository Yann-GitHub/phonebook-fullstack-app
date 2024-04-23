import axios from 'axios'

// const baseURL = 'http://localhost:3000/persons' // for json-server
//const baseURL = 'http://localhost:3002/api/persons' // for node.js server
const baseURL = '/api/persons' // when dist folder is copied to backend-phonebook - relative path / if it's use in development mode with vite - proxy to the server in vite.config.js

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then((response) => response.data)
}

const create = (newObj) => {
  const request = axios.post(baseURL, newObj)
  return request.then((response) => response.data)
}

// const eraze = (id) => {
//   axios.delete(`${baseURL}/${id}`)
// }

const eraze = async (id) => {
  await axios.delete(`${baseURL}/${id}`)
  return `Successfully deleted item with id ${id}`
}

const update = (id, newObj) => {
  const request = axios.put(`${baseURL}/${id}`, newObj)
  return request.then((response) => response.data)
}

export default { getAll, create, eraze, update }
