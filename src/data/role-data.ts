import type { Permission, Role } from "../types/roles"

export const mockPermissions: Permission[] = [
  // Category
  { id: "1", code: "category:create", description: "Create categories" },
  { id: "2", code: "category:read", description: "View categories" },
  { id: "3", code: "category:update", description: "Update categories" },
  { id: "4", code: "category:delete", description: "Delete categories" },

  // Product
  { id: "5", code: "product:create", description: "Create products" },
  { id: "6", code: "product:read", description: "View products" },
  { id: "7", code: "product:update", description: "Update products" },
  { id: "8", code: "product:delete", description: "Delete products" },

  // Order
  { id: "9", code: "order:read", description: "View orders" },
  { id: "10", code: "order:update", description: "Update orders" },



  // User
  { id: "11", code: "user:manage", description: "Manage users" },

  // Role
  { id: "12", code: "role:manage", description: "Manage roles and permissions" },

  // Stock
  { id: "13", code: "stock:read", description: "View stock" },
  { id: "14", code: "stock:update", description: "Update stock" },

  // Media
  { id: "15", code: "media:upload", description: "Upload media files" },
]

const getPermissions = (ids: string[]) =>
  mockPermissions.filter((permission) => ids.includes(permission.id))

const now = new Date().toISOString()

export const mockRoles: Role[] = [
  {
    id: "1",
    name: "ADMIN",
    description: "Full access to manage the ecommerce system.",
    userCount: 1,
    permissions: getPermissions([
      "1", "2", "3", "4",
      "5", "6", "7", "8",
      "9", "10",
      "11", "12", "13",
      "14", "15",
      "16", "17", "18",
    ]),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "2",
    name: "STAFF",
    description: "Manage daily store operations.",
    userCount: 1,
    permissions: getPermissions([
      "2", "6", "9", "10", "12", "16", "18",
    ]),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "3",
    name: "CUSTOMER",
    description: "Standard ecommerce customer account.",
    userCount: 2,
    permissions: [],
    createdAt: now,
    updatedAt: now,
  },
]