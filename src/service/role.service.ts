import api from "@/lib/axios"
import type {
  Role,
  RoleApiResponse,
} from "@/types/roles"

type ApiResponse<T> = {
  success: boolean
  data: T
  timestamp: string
  path: string
}

export const getRoles = async (): Promise<Role[]> => {
  const response = await api.get<ApiResponse<RoleApiResponse[]>>(
    "/rbac/roles"
  )

  return response.data.data.map((role) => ({
    id: role.id,
    name: role.name,
    description: role.description,
    createdAt: role.createdAt,
    updatedAt: role.updatedAt,

    permissions: role.permissions.map(
      (item) => item.permission
    ),

    userCount: role._count.users,
  }))
}