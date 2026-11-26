// export type Permission = {
//   id: string
//   code: string
//   description: string
// }


// export type RolePermissionResponse = {
//   roleId: string
//   permissionId: string
//   permission: Permission
// }


// export type RoleApiResponse = {
//   id: string
//   name: string
//   description: string
//   createdAt: string
//   updatedAt: string
//   permissions: RolePermissionResponse[]
//   _count: {
//     users: number
//   }
// }

// export type Role = {
//   id: string
//   name: string
//   description: string
//   createdAt: string
//   updatedAt: string
//   permissions: Permission[]
//   userCount: number
// }
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

export type RoleDetailsPayload = {
  name: string
  description: string
}

export type SetRolePermissionsPayload = {
  permissionIds: string[]
}

export type AssignUserRolePayload = {
  roleId: string
}

export type RoleMutationResponse = {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export type AssignUserRoleResponse = {
  id: string
  role: {
    id: string
    name: string
    description: string
    createdAt: string
    updatedAt: string
  }
}