import { Outlet } from "react-router-dom"

import { usePermissions } from "@/hooks/usePermissions"
import AccessDeniedPage from "@/pages/error/AccessDeniedPage"

type PermissionRouteProps = {
  permission: string
}

export default function PermissionRoute({ permission }: PermissionRouteProps) {
  const { isPending, isError, hasPermission } = usePermissions()

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        Loading permissions...
      </div>
    )
  }

  if (isError || !hasPermission(permission)) {
    return <AccessDeniedPage />
  }

  return <Outlet />
}
