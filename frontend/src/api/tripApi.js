import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const api = axios.create({ baseURL: API_BASE_URL, headers: { 'Content-Type': 'application/json' } })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('travelverse_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const tripApi = {
  list: () => api.get('/trips'),
  save: (data) => api.post('/trips', data),
  update: (id, data) => api.put(`/trips/${id}`, data),
  remove: (id) => api.delete(`/trips/${id}`)
}