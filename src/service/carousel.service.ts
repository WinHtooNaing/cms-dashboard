import api from "@/lib/axios"
import type {
  CarouselItemResponse,
  CarouselResponseProps,
} from "@/types/carousel"

export const createImageCarousel = async (
  sectionId: string,
  data: FormData
) => {
  const response = await api.post<CarouselItemResponse>(
    `/cms/sections/${sectionId}/items`,
    data
  )
  return response.data
}

export const getImageCarousel = async (sectionId: string) => {
  const response = await api.get<CarouselResponseProps>(
    `/cms/sections/${sectionId}/items`
  )
  return response.data
}

export const getImageCarouselById = async (itemId: string) => {
  const response = await api.get<CarouselItemResponse>(`/cms/items/${itemId}`)
  return response.data
}
export const updateImageCarousel = async (itemId: string, data: FormData) => {
  const response = await api.patch<CarouselItemResponse>(
    `/cms/items/${itemId}`,
    data
  )
  return response.data
}

export const deleteImageCarousel = async (itemId: string) => {
  const response = await api.delete(`/cms/items/${itemId}`)
  return response.data
}
