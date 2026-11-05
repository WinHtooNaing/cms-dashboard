import api from "@/lib/axios";
import type {
  Category,
  CategoryApiResponse,
} from "@/types/category"

export async function createCategory(formData: FormData) {
  const token = localStorage.getItem("accessToken")

  const response = await api.post("/categories", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.data
}

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<CategoryApiResponse>("/categories")

  return response.data.data
}

export async function getCategoryById(id: number): Promise<Category> {
  const response = await api.get(`/categories/${id}`)

  return response.data.data
}


export async function updateCategory(id: number, formData: FormData) {
  const token = localStorage.getItem("accessToken")

  const response = await api.patch(`/categories/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.data
}
export async function deleteCategory(id: number) {
  const token = localStorage.getItem("accessToken")

  const response = await api.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.data
}