import api from "@/lib/axios"

import type {
  Permission,
  Role,
  RoleApiResponse,
  RoleDetailsPayload,
  RoleMutationResponse,
  SetRolePermissionsPayload,
  AssignUserRolePayload,
  AssignUserRoleResponse,
} from "@/types/roles"

type ApiResponse<T> = {
  success: boolean
  data: T
  timestamp: string
  path: string
}

// Convert backend role response into frontend Role type
const mapRole = (role: RoleApiResponse): Role => ({
  id: role.id,
  name: role.name,
  description: role.description,
  createdAt: role.createdAt,
  updatedAt: role.updatedAt,

  permissions: role.permissions.map(
    (item) => item.permission
  ),

  userCount: role._count.users,
})

// GET ALL ROLES
export const getRoles = async (): Promise<Role[]> => {
  const response = await api.get<ApiResponse<RoleApiResponse[]>>(
    "/rbac/roles"
  )

  return response.data.data.map(mapRole)
}

// GET ALL AVAILABLE PERMISSIONS
export const getPermissions = async (): Promise<Permission[]> => {
  const response = await api.get<ApiResponse<Permission[]>>(
    "/rbac/permissions"
  )

  return response.data.data
}

// CREATE ROLE
export const createRole = async (
  payload: RoleDetailsPayload
): Promise<RoleMutationResponse> => {
  const response = await api.post<ApiResponse<RoleMutationResponse>>(
    "/rbac/roles",
    payload
  )

  return response.data.data
}

// UPDATE ROLE NAME AND DESCRIPTION
export const updateRole = async (
  id: string,
  payload: RoleDetailsPayload
): Promise<RoleMutationResponse> => {
  const response = await api.patch<ApiResponse<RoleMutationResponse>>(
    `/rbac/roles/${id}`,
    payload
  )

  return response.data.data
}

export const setRolePermissions = async (
  id: string,
  payload: SetRolePermissionsPayload
): Promise<void> => {
  await api.put(
    `/rbac/roles/${id}/permissions`,
    payload
  )
}

// ASSIGN ROLE TO USER
export const assignUserRole = async (
  userId: string,
  payload: AssignUserRolePayload
): Promise<AssignUserRoleResponse> => {
  const response = await api.patch<ApiResponse<AssignUserRoleResponse>>(
    `/rbac/users/${userId}/role`,
    payload
  )

  return response.data.data
}