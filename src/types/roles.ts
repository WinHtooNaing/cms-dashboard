export type Permission = {
  id: string
  code: string
  description: string
}


export type RolePermissionResponse = {
  roleId: string
  permissionId: string
  permission: Permission
}


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

export type Role = {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  permissions: Permission[]
  userCount: number
}