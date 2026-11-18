import api from "@/lib/axios"

import type {
  ApiResponse,
  DocumentListResponse,
} from "@/types/cms"

export const getDocuments = async () => {
  const response = await api.get<ApiResponse<DocumentListResponse>>(
    "/cms/documents"
  )

  return response.data.data.items
}