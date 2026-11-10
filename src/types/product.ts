export interface ProductCategory {
  id: string
  name: string
  slug: string
  imageUrl: string | null
}
export type Brand = {
  id: string
  name: string
  slug: string
  imageUrl: string | null
}
export interface ProductStock {
  availableQuantity: number
  inStock: boolean
  updatedAt?: string
}

export interface Product {
  id: string
  categoryId?: string
  name: string
  slug: string
  sku: string
  description: string
  price: string

  
  originalPrice?: string | null
  discountPercentage?: number | null

  imageUrl: string | null
  imagePublicId: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string

 brand: Brand | null

  category?: {
    id: string
    name: string
    slug: string
    imageUrl: string | null
  } | null

  stock?: {
    availableQuantity: number
    inStock: boolean
    updatedAt?: string
  } | null
}

export interface ProductPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ProductListResponse {
  items: Product[]
  pagination: ProductPagination
}

export interface ProductQueryParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}