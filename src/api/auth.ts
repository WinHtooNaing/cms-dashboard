import { axiosInstance } from "./axiosInstance"

export interface RegisterPayload {
  username?: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export const register = async (payload: RegisterPayload) => {
  try {
    const response = await axiosInstance.post("/auth/register", payload, {
      validateStatus: () => true,
    })
    return response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message
    }
    return "An unknown error occurred"
  }
}

export const login = async (payload: LoginPayload) => {
  try {
    const response = await axiosInstance.post("/auth/login", payload, {
      validateStatus: () => true,
    })
    return response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message
    }
    return "An unknown error occurred"
  }
}

export const checkCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me", {
      validateStatus: () => true,
    })
    return response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message
    }
    return "An unknown error occurred"
  }
}
