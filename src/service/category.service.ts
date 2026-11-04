import api from "@/lib/axios";

export async function createCategory(formData: FormData) {
  const token = localStorage.getItem("accessToken")

  const response = await api.post("/categories", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.data
}