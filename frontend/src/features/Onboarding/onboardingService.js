import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const api = axios.create({ baseURL: API_BASE_URL, headers: { 'Content-Type': 'application/json' } })

export const onboardingService = {
  async saveOnboarding(data) {
    const res = await api.post('/onboarding', data)
    return res.data
  },
}