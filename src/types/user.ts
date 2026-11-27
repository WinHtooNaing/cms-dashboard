
export type UserRole = "ADMIN" | "STAFF" | "CUSTOMER" | (string & {})

export type UserStatus = "ACTIVE" | "SUSPENDED" | "DEACTIVATED"

export type User = {
  id: string
  name: string
  email: string
  phone: string | null
  roleId: string
  isActive: boolean
  status: UserStatus
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
  role?: UserRole
  status?: UserStatus
  isActive?: boolean
  sortBy?: "createdAt" | "updatedAt" | "name" | "email"
  sortOrder?: "asc" | "desc"
}

export type CreateUserPayload = {
  name: string
  email: string
  phone: string
  password: string
  roleId: string
}

export type CreatedUser = User