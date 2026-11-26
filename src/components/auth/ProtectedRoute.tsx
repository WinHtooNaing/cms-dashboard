import { Navigate, Outlet } from "react-router-dom"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import FullPageLoader from "../skeletons/FullPageLoader"

export function ProtectedRoute() {
  const hasRefreshToken = Boolean(localStorage.getItem("refreshToken"))

  const { data, isPending, isError } = useCurrentUser()

  if (!hasRefreshToken) {
    return <Navigate to="/login" replace />
  }

  if (isPending) {
    return <FullPageLoader />
  }

  if (isError || !data?.user?.isActive) {
    return <Navigate to="/login" replace />
  }

  if (data.user.role === "CUSTOMER") {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
