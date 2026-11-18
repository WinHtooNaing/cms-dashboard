import api from "@/lib/axios"

export interface CmsCategoryItem {
  id: string
  sectionId: string
  position: number
  content?: { category?: string } | string
  createdAt?: string
  updatedAt?: string
}

export interface CmsCategoryResponse {
  success: boolean
  data: CmsCategoryItem[]
}

export const addCmsCategory = async (sectionId: string, data: FormData) => {
  const response = await api.post(`/cms/sections/${sectionId}/items`, data)
  return response.data
}

export const getCmsCategory = async (sectionId: string) => {
  const response = await api.get<CmsCategoryResponse>(
    `/cms/sections/${sectionId}/items`
  )
  return response.data
}

export const deleteCmsCategoryItem = async (itemId: string) => {
  const response = await api.delete(`/cms/items/${itemId}`)
  return response.data
}
