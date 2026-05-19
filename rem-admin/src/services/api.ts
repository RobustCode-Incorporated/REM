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
 * =========================
 * REQUEST INTERCEPTOR
 * =========================
 * Inject JWT token automatically if available
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * =========================
 * RESPONSE INTERCEPTOR
 * =========================
 * Centralized error handling
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API ERROR]', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    })

    /**
     * OPTIONAL: Auto logout on 401
     */
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
    }

    return Promise.reject(error)
  }
)

/**
 * =========================
 * CLEAN API CLIENT WRAPPER
 * =========================
 * Used by stores for consistency
 */
export const apiClient = {
  get: async <T = any>(url: string) => {
    const res = await api.get<T>(url)
    return res.data
  },

  post: async <T = any>(url: string, data?: any) => {
    const res = await api.post<T>(url, data)
    return res.data
  },

  put: async <T = any>(url: string, data?: any) => {
    const res = await api.put<T>(url, data)
    return res.data
  },

  delete: async <T = any>(url: string) => {
    const res = await api.delete<T>(url)
    return res.data
  },
}

export default api