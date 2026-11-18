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