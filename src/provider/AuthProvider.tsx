import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"

interface AuthLayoutProps {
  requireAuth?: boolean
}

export function AuthProvider({ requireAuth = true }: AuthLayoutProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return <Outlet />
}
