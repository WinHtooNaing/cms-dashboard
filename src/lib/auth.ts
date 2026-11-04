export type AuthUser = {
  id: number
  name: string
  email: string
  phone: string
  role: "ADMIN" | "CUSTOMER"
  isActive: boolean
}

export function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem("accessToken"))
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

export function logout() {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("user")
}