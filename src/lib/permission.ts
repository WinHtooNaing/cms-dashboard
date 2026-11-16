export type Permission = string

export function hasPermission(
  permissions: Permission[],
  permission: Permission
): boolean {
  return permissions.includes(permission)
}

export function hasAnyPermission(
  permissions: Permission[],
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.some((permission) =>
    permissions.includes(permission)
  )
}

export function hasAllPermissions(
  permissions: Permission[],
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.every((permission) =>
    permissions.includes(permission)
  )
}