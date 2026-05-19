import axios from 'axios'

/**
 * Centralized Axios instance
 * ERP Frontend API Layer
 */

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
})

/**
 * Optional: Request interceptor
 */
api.interceptors.request.use(
  (config) => {
    // future: auth token injection
    // config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Optional: Response interceptor
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API ERROR]', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    })

    return Promise.reject(error)
  }
)

/**
 * Generic helpers (clean architecture)
 */
export const apiClient = {
  get: <T = any>(url: string) =>
    api.get<T>(url).then(res => res.data),

  post: <T = any>(url: string, data?: any) =>
    api.post<T>(url, data).then(res => res.data),

  put: <T = any>(url: string, data?: any) =>
    api.put<T>(url, data).then(res => res.data),

  delete: <T = any>(url: string) =>
    api.delete<T>(url).then(res => res.data),
}

export default api