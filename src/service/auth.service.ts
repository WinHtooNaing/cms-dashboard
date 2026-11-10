

import api from "@/lib/axios"
import type { AuthUser } from "@/lib/auth"
import { clearAuthStorage } from "@/lib/auth"
export interface LoginResponse {
  user: AuthUser
  accessToken: string
  refreshToken: string
}

export interface LoginPayload {
  email: string
  password: string
}

interface ApiResponse<T> {
  success: boolean
  data: T
  timestamp: string
  path: string
}

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await api.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    payload
  )

  const loginData = response.data.data

  localStorage.setItem("accessToken", loginData.accessToken)
  localStorage.setItem("refreshToken", loginData.refreshToken)
  localStorage.setItem("user", JSON.stringify(loginData.user))

  return loginData
}

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken")

  if (!refreshToken) {
    throw new Error("Refresh token not found")
  }



  const response = await api.post<ApiResponse<{
    accessToken: string
    refreshToken: string
  }>>(
    `/auth/refresh`,
    {
      refreshToken,
    }
  )

  const tokens = response.data.data

  localStorage.setItem("accessToken", tokens.accessToken)
  localStorage.setItem("refreshToken", tokens.refreshToken)

  return tokens.accessToken
}

export async function logoutUser() {
  const refreshToken = localStorage.getItem("refreshToken")

  if (!refreshToken) {
    throw new Error("Refresh token not found")
  }
 try {
  const response = await api.post(
    "/auth/logout",
    {
      refreshToken,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  )

  return response
  } finally {
    clearAuthStorage()
  }
}
