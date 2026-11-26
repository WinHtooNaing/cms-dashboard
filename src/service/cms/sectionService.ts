import api from "@/lib/axios"

import type {
  ApiResponse,
  CmsSection,
} from "@/types/cms"


export const getDocumentSections = async (
  documentId: string
) => {
  const response = await api.get<ApiResponse<CmsSection[]>>(
    `/cms/documents/${documentId}/sections`
  )

  return response.data.data
}


export type UpdateSectionPayload = {
  content: Record<string, unknown>
  image?: File | null
}


export const updateSection = async (
  sectionId: string,
  payload: UpdateSectionPayload
) => {
  const formData = new FormData()

  formData.append(
    "content",
    JSON.stringify(payload.content)
  )

  if (payload.image) {
    formData.append("image", payload.image)
  }

  const response = await api.patch<ApiResponse<CmsSection>>(
    `/cms/sections/${sectionId}`,
    formData
  )

  return response.data.data
}