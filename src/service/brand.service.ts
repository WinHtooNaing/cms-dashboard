import api from "@/lib/axios"

export type Brand = {
  id: string
  name: string
  slug: string
  imageUrl: string | null
}

export const getBrands = async (): Promise<Brand[]> => {
  const response = await api.get("/brands")

  return response.data.data.items
}

export async function getBrandById(id: string): Promise<Brand> {
  const response = await api.get(`/brands/${id}`)

  return response.data.data
}