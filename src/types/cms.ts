export type CmsDocumentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED"

export type CmsDocument = {
  id: string
  key: string
  title: string
  status: CmsDocumentStatus
  seoTitle: string | null
  seoDescription: string | null
  ogImageUrl: string | null
  ogImagePublicId: string | null
  publishedAt: string | null
  createdById: string
  publishedById: string | null
  createdAt: string
  updatedAt: string
}

export type CmsSection = {
  id: string
  documentId: string
  key: string
  type: string
  position: number
  isVisible: boolean
  content: Record<string, unknown>
  imageUrl: string | null
  imagePublicId: string | null
  createdAt: string
  updatedAt: string
  items?: CmsSectionItem[]
}

export type CmsSectionItem = {
  id: string
  sectionId: string
  key: string
  position: number
  isVisible: boolean
  content: Record<string, unknown>
  imageUrl: string | null
  imagePublicId: string | null
  createdAt: string
  updatedAt: string
}

export type IntroductionContent = {
  badge: string
  heading: string
  highlightedHeading: string
  description: string
}

export type ApiResponse<T> = {
  success: boolean
  data: T
  timestamp: string
  path: string
}

export type DocumentListResponse = {
  items: CmsDocument[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}