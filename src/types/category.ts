export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
  imagePublicId: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CategoryApiResponse {
  success: boolean
  data: Category[]
  timestamp: string
  path: string
}