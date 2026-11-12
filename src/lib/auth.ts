export type AuthUser = {
  id: string
  name: string
  email: string
  phone: string | null
  roleId: string
  role: string
  isActive: boolean
}

export function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem("refreshToken"))
}

export function getCurrentUser(): AuthUser | null {
  const user = localStorage.getItem("user")

  if (!user) return null

  try {
    return JSON.parse(user) as AuthUser
  } catch {
    return null
  }
}

export function clearAuthStorage() {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("user")
}