export interface CarouselContent {
  title: string
  description: string
  imageUrl: string
  imagePublicId?: string
}

export interface CarouselApiItem {
  id: string
  sectionId: string
  position: number
  content: CarouselContent
  createdAt: string
  updatedAt: string
}

export interface Carousel {
  id: string
  sectionId: string
  position: number
  title: string
  description: string
  imageUrl: string
  imagePublicId?: string
}

export interface CarouselResponseProps {
  success: boolean
  data: CarouselApiItem[]
}

export interface CarouselItemResponse {
  success: boolean
  data: CarouselApiItem
}
