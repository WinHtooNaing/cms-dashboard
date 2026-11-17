import api from "@/lib/axios"
import type { ApiResponse } from "@/types/cms"

export type CmsSectionItem = {
  id: string
  sectionId: string
  position: number
  isVisible: boolean
  content: {
    title?: string
    description?: string
    [key: string]: unknown
  }
  imageUrl: string | null
  imagePublicId: string | null
  createdAt: string
  updatedAt: string
}

export type UpdateItemPayload = {
  content: Record<string, unknown>
  image?: File | null
}

export const getSectionItems = async (
  sectionId: string
): Promise<CmsSectionItem[]> => {
  const response = await api.get<ApiResponse<CmsSectionItem[]>>(
    `/cms/sections/${sectionId}/items`
  )

  return response.data.data
}


export const getItemById = async (
  itemId: string
): Promise<CmsSectionItem> => {
  const response = await api.get<ApiResponse<CmsSectionItem>>(
    `/cms/items/${itemId}`
  )

  return response.data.data
}


export const updateItem = async (
  itemId: string,
  payload: UpdateItemPayload
): Promise<CmsSectionItem> => {
  const formData = new FormData()

  formData.append("content", JSON.stringify(payload.content))

  if (payload.image) {
    formData.append("image", payload.image)
  }

  const response = await api.patch<ApiResponse<CmsSectionItem>>(
    `/cms/items/${itemId}`,
    formData
  )

  return response.data.data
}