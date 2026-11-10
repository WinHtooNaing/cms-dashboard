export type Permission = {
  id: string
  code: string
  description: string
}

// Original API permission structure
export type RolePermissionResponse = {
  roleId: string
  permissionId: string
  permission: Permission
}

// Original API role structure
export type RoleApiResponse = {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  permissions: RolePermissionResponse[]
  _count: {
    users: number
  }
}

// Simplified structure for frontend UI
export type Role = {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  permissions: Permission[]
  userCount: number
}