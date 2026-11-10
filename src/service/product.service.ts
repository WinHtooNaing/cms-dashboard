import api from "@/lib/axios"

import type {
  Product,
  ProductListResponse,
  ProductQueryParams,
} from "@/types/product"

export async function getProducts(
  params: ProductQueryParams = {},
) {
  const response = await api.get("/products", {
    params,
  })

  return response.data.data as ProductListResponse
}
export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`)
  return response.data.data
}


export type CreateProductPayload = {
  name: string
  slug: string
  brandId: string
  sku: string
  description: string
  price: number
  originalPrice?: number
  categoryId: string
  image?: File
}

export const createProduct = async (data: CreateProductPayload) => {
  const formData = new FormData()

  formData.append("name", data.name)
  formData.append("slug", data.slug)
  formData.append("brandId", data.brandId)
  formData.append("sku", data.sku)
  formData.append("description", data.description)
  formData.append("price", String(data.price))
  formData.append("categoryId", data.categoryId)

  if (data.originalPrice !== undefined) {
    formData.append("originalPrice", String(data.originalPrice))
  }

  if (data.image) {
    formData.append("image", data.image)
  }

  const response = await api.post("/products", formData)

  return response.data.data
}