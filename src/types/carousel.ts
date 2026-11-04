export interface Carousel {
  id: number
  title: string
  description: string
  image: string
  isActive: boolean
}

export interface CarouselFormValues {
  title: string
  description: string
  image: File | null
  imageUrl: string
  isActive: boolean
}