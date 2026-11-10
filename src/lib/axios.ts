import axios, {
  type InternalAxiosRequestConfig,
} from "axios"

import { refreshAccessToken } from "../service/auth.service"
import { clearAuthStorage } from "@/lib/auth"

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Accept: "application/json",
  },
})

let refreshPromise: Promise<string> | null = null


api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined

    if (!originalRequest) {
      return Promise.reject(error)
    }

  
    const requestUrl = originalRequest.url ?? ""

    if (
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/refresh")
    ) {
      return Promise.reject(error)
    }


    if (error.response?.status !== 401) {
      return Promise.reject(error)
    }

  
    if (originalRequest._retry) {
      return Promise.reject(error)
    }

    const refreshToken = localStorage.getItem("refreshToken")

    if (!refreshToken) {
      clearAuthStorage()
      window.location.href = "/login"

      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken()
      }

      const newAccessToken = await refreshPromise

      refreshPromise = null

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`

      return api(originalRequest)
    } catch (refreshError) {
      refreshPromise = null

      clearAuthStorage()

      window.location.href = "/login"

      return Promise.reject(refreshError)
    }
  }
)

export default api