import api from "@/lib/axios"
import type { ProductListResponse } from "@/types/product"

export interface NewCollectionItem {
  id: string
  sectionId: string
  position: number
  content?: { productId?: string } | string
  createdAt?: string
  updatedAt?: string
}

export interface NewCollectionResponse {
  success: boolean
  data: NewCollectionItem[]
}

export const addNewCollection = async (sectionId: string, data: FormData) => {
  const response = await api.post(`/cms/sections/${sectionId}/items`, data)
  return response.data
}

export const getNewCollection = async (sectionId: string) => {
  const response = await api.get<NewCollectionResponse>(
    `/cms/sections/${sectionId}/items`
  )
  return response.data
}

export const deleteNewCollectionItem = async (itemId: string) => {
  const response = await api.delete(`/cms/items/${itemId}`)
  return response.data
}

export const getNewCollectionProduct = async () => {
  const response = await api.get(
    `/products?page=1&limit=20&sortBy=createdAt&sortOrder=desc`
  )
  return response.data.data as ProductListResponse
}
