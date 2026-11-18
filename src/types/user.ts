export type UserRole = "ADMIN" | "STAFF" | "CUSTOMER" | string

export type User = {
  id: string
  name: string
  email: string
  phone: string | null
  roleId: string
  isActive: boolean
  status: "ACTIVE" | "INACTIVE" | string
  createdAt: string
  updatedAt: string

  role: {
    id: string
    name: UserRole
    description: string
  }
}

export type UsersPagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type UsersResponse = {
  items: User[]
  pagination: UsersPagination
}

export type GetUsersParams = {
  page?: number
  limit?: number
  search?: string
  roleId?: string
  role?: string
  status?: string
  isActive?: boolean
  sortBy?: string
  sortOrder?: "asc" | "desc"
}