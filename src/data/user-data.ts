import type { User } from "../types/user"

export const mockUsers: User[] = [
  {
    id: "user-001",
    name: "Aye Aye",
    email: "ayeaye@gmail.com",
    phone: "09 123456789",
    role: "CUSTOMER",
    createdAt: "2026-10-30T08:00:00.000Z",
  },
  {
    id: "user-002",
    name: "Mg Mg",
    email: "mgmg@gmail.com",
    phone: "09 987654321",
    role: "STAFF",
    createdAt: "2026-10-29T08:00:00.000Z",
  },
  {
    id: "user-003",
    name: "Su Su",
    email: "susu@gmail.com",
    phone: null,
    role: "ADMIN",
    createdAt: "2026-10-25T08:00:00.000Z",
  },
  {
    id: "user-004",
    name: "Kyaw Kyaw",
    email: "kyaw@gmail.com",
    phone: "09 111222333",
    role: "CUSTOMER",
    createdAt: "2026-10-20T08:00:00.000Z",
  },
]