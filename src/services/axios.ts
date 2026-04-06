// src/services/axios.ts
import axios from 'axios'
import { useAuthStore } from '@/stores/auth.store'
import router from '@/router'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
})

const PUBLIC_URLS = [
  '/auth/verify-email',
  '/auth/login',
  '/auth/register',
  '/auth/resend-verify-email',
  '/auth/refresh',
  '/auth/forgot-password',
  '/auth/reset-password',
]

// REQUEST INTERCEPTOR - Gắn token vào header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')

  // Chỉ gắn khi token thực sự hợp lệ, tránh gửi "Bearer undefined"
  if (token && token !== 'undefined' && token !== 'null') {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// RESPONSE INTERCEPTOR - Tự động refresh khi 401
let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (err: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)))
  failedQueue = []
}

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config

    // Bỏ qua interceptor cho các public routes
    if (PUBLIC_URLS.some((url) => originalRequest.url?.includes(url))) {
      return Promise.reject(error)
    }

    // Không phải 401 hoặc đã retry rồi → bỏ qua
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    // Nếu không có accessToken thì user chưa đăng nhập → không cần refresh, bỏ qua
    const token = localStorage.getItem('accessToken')
    if (!token || token === 'undefined' || token === 'null') {
      return Promise.reject(error)
    }

    // Đang refresh → đưa vào hàng đợi chờ token mới
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`
        return axiosInstance(originalRequest)
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const authStore = useAuthStore()
      await authStore.refreshToken()
      const newToken = authStore.accessToken!

      originalRequest.headers.Authorization = `Bearer ${newToken}`
      processQueue(null, newToken)

      return axiosInstance(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      const authStore = useAuthStore()
      await authStore.logout()
      // Sau khi refresh thất bại, về trang chủ (không force về login)
      router.push({ name: 'home' })
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

export default axiosInstance