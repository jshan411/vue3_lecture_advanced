import axios from 'axios'

function create(baseURL, options) {
  const instance = axios.create({
    baseURL: baseURL,
    ...options
  })
  return instance
}

export const postsApi = create('http://localhost:3000/api/posts')
