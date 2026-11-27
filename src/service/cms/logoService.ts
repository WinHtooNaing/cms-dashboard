import api from "@/lib/axios"

interface ApiResponse<T> {
  success: boolean
  data: T
}

export interface SiteSettingsSection {
  key: string
  type: string
  position: number
  content: {
    alt?: string
  }
  imageUrl: string | null
  items: unknown[]
}

interface SiteSettingsResponse {
  key: string
  title: string
  sections: SiteSettingsSection[]
}

export interface SiteLogo {
  imageUrl: string | null
  alt: string
}

export const getSiteLogo = async (): Promise<SiteLogo | null> => {
  const response = await api.get<ApiResponse<SiteSettingsResponse>>(
    "/cms/pages/site-settings"
  )

  const headerSection = response.data.data.sections.find(
    (section) => section.key === "header"
  )

  if (!headerSection) return null

  return {
    imageUrl: headerSection.imageUrl,
    alt: headerSection.content.alt ?? "Company Logo",
  }
}