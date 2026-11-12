import api from "@/lib/axios"

export type Brand = {
  id: string
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
  imagePublicId: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type BrandListResponse = {
  items: Brand[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export type GetBrandsParams = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
  search?: string
}

export type CreateBrandPayload = {
  name: string
  slug: string
  description: string
}

export type UpdateBrandPayload = Partial<CreateBrandPayload>

export const getBrands = async (params: GetBrandsParams = {}): Promise<BrandListResponse> => {
  const response = await api.get("/brands", { params })
  return response.data.data
}

export const createBrand = async (payload: CreateBrandPayload): Promise<Brand> => {
  const response = await api.post("/brands", payload)
  return response.data.data
}

export const updateBrand = async (id: string, payload: UpdateBrandPayload): Promise<Brand> => {
  const response = await api.patch(`/brands/${id}`, payload)
  return response.data.data
}

export const deleteBrand = async (id: string): Promise<void> => {
  await api.delete(`/brands/${id}`)
}