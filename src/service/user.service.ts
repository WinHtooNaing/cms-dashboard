import api from "@/lib/axios"
import type { GetUsersParams, UsersResponse } from "@/types/user"

type ApiResponse<T> = {
  success: boolean
  data: T
  timestamp: string
  path: string
}

export const getUsers = async (
  params: GetUsersParams
): Promise<UsersResponse> => {
  const response = await api.get<ApiResponse<UsersResponse>>("/users", {
    params,
  })

  return response.data.data
}

export const assignUserRole = async (
  userId: string,
  roleId: string
) => {
  const response = await api.patch(`/rbac/users/${userId}/role`, {
    roleId,
  })

  return response.data
}
export type CreateUserPayload = {
  name: string
  email: string
  phone: string
  password: string
  roleId: string
}
export type CreatedUser = {
  id: string
  name: string
  email: string
  phone: string | null
  roleId: string
  isActive: boolean
  status: string
  createdAt: string
  updatedAt: string
  role: {
    id: string
    name: string
    description: string
  }
}

type CreateUserResponse = {
  success: boolean
  data: CreatedUser
  timestamp: string
  path: string
}
export const createUser = async (
  payload: CreateUserPayload
): Promise<CreatedUser> => {
  const response = await api.post<CreateUserResponse>(
    "/users",
    payload
  )

  return response.data.data
}