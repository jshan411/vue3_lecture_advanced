import { postsApi } from '.'

export function getPosts(params) {
  return postsApi.get('/', { params })
}

export function getPostById(id) {
  return postsApi.get(`/${id}`)
}

export function createPost(data) {
  return postsApi.post('', data)
}

export function updatePost(id, data) {
  return postsApi.put(`/${id}`, data)
}

export function deletePost(id) {
  return postsApi.delete(`/${id}`)
}
