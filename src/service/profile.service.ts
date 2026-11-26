import api from "@/lib/axios"

export type UserProfile = {
  id: string
  name: string
  email: string
  phone: string | null
  roleId: string
  isActive: boolean
  status: "ACTIVE" | "INACTIVE"
  createdAt: string
  updatedAt: string
  role: {
    id: string
    name: string
    description: string
  }
}

export type UpdateProfilePayload = {
  name: string
  phone: string
}

export async function getMyProfile(): Promise<UserProfile> {
  const { data } = await api.get("/users/me")

  return data.data
}

export async function updateMyProfile(
  payload: UpdateProfilePayload
): Promise<UserProfile> {
  const { data } = await api.patch("/users/me", payload)

  return data.data
}