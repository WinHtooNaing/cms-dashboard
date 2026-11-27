

import api from "@/lib/axios"

import type {
  GetUsersParams,
  UsersResponse,
  CreatedUser,
  CreateUserPayload,
  User,
  UserStatus,
} from "@/types/user"

type ApiResponse<T> = {
  success: boolean
  data: T
  timestamp: string
  path: string
}


export const getUsers = async (
  params: GetUsersParams
): Promise<UsersResponse> => {
  const response = await api.get<ApiResponse<UsersResponse>>(
    "/users",
    {
      params,
    }
  )

  return response.data.data
}

// ASSIGN USER ROLE
export const assignUserRole = async (
  userId: string,
  roleId: string
) => {
  const response = await api.patch(
    `/rbac/users/${userId}/role`,
    { roleId }
  )

  return response.data
}

// CREATE USER
export const createUser = async (
  payload: CreateUserPayload
): Promise<CreatedUser> => {
  const response = await api.post<ApiResponse<CreatedUser>>(
    "/users",
    payload
  )

  return response.data.data
}




export const updateUserStatus = async (
  userId: string,
  status: UserStatus
): Promise<User> => {
  const response = await api.patch<ApiResponse<User>>(
    `/users/${userId}/status`,
    { status }
  )

  return response.data.data
}