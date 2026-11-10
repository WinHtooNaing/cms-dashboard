export type UserRole = "ADMIN" | "STAFF" | "CUSTOMER"

export type User = {
  id: string
  name: string
  email: string
  phone: string | null
  role: string
  createdAt: string
}