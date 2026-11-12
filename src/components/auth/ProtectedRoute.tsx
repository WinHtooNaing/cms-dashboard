import { Navigate, Outlet } from "react-router-dom"
import { useCurrentUser } from "@/hooks/useCurrentUser"

export function ProtectedRoute() {
  const hasRefreshToken = Boolean(localStorage.getItem("refreshToken"))

  const { data, isPending, isError } = useCurrentUser()

  if (!hasRefreshToken) {
    return <Navigate to="/login" replace />
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading your account...
      </div>
    )
  }

  if (isError || !data?.user.isActive) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
