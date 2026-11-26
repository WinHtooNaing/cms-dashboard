import { useCurrentUser } from "@/hooks/useCurrentUser"

import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  type Permission,
} from "@/lib/permission"

export function usePermissions() {
  const {
    data: currentUser,
    isPending,
    isError,
  } = useCurrentUser()

  const permissions: Permission[] = currentUser?.permissions ?? []

  return {
    permissions,

    isPending,
    isError,

    hasPermission: (permission: Permission) =>
      hasPermission(permissions, permission),

    hasAnyPermission: (requiredPermissions: Permission[]) =>
      hasAnyPermission(permissions, requiredPermissions),

    hasAllPermissions: (requiredPermissions: Permission[]) =>
      hasAllPermissions(permissions, requiredPermissions),
  }
}