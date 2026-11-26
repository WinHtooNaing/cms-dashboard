import api from "@/lib/axios"
import type { ApiResponse } from "@/types/cms"

import {
  CMS_DOCUMENT_KEYS,
  SITE_SETTING_SECTION_KEYS,
} from "@/constants/cms"

type CmsDocument = {
  id: string
  key: string
  title: string
}

export type HeaderSection = {
  id: string
  key: string
  documentId: string
  type: string
  imageUrl: string | null
  imagePublicId: string | null
  content: Record<string, unknown>
  isVisible: boolean
  position: number
}

export const getHeaderSection = async (): Promise<HeaderSection> => {
 
  const documentResponse = await api.get<ApiResponse<CmsDocument>>(
    `/cms/documents/by-key/${CMS_DOCUMENT_KEYS.SITE_SETTINGS}`
  )

  const document = documentResponse.data.data


  const sectionsResponse = await api.get<ApiResponse<HeaderSection[]>>(
    `/cms/documents/${document.id}/sections`
  )

  const sections = sectionsResponse.data.data

  const headerSection = sections.find(
    (section) => section.key === SITE_SETTING_SECTION_KEYS.HEADER
  )

  if (!headerSection) {
    throw new Error("Header section was not found.")
  }

  return headerSection
}


export const updateHeaderLogo = async (
  sectionId: string,
  logoFile: File
): Promise<HeaderSection> => {
  const formData = new FormData()

  formData.append("image", logoFile)

  const response = await api.patch<ApiResponse<HeaderSection>>(
    `/cms/sections/${sectionId}`,
    formData
  )

  return response.data.data
}