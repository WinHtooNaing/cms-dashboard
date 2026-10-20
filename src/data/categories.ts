export type CategoryItem = {
  id: number
  name: string
  image: string
}

export const categories: CategoryItem[] = [
  { id: 1, name: "Watches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
  { id: 2, name: "TV & Entertainment", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400" },
  { id: 3, name: "Home & Kitchen", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400" },
  { id: 4, name: "Mobile Phones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400" },
  { id: 5, name: "Laptops & Computers", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" },
  { id: 6, name: "Audio & Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  { id: 7, name: "Cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400" },
  { id: 8, name: "Gaming", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400" },
  { id: 9, name: "Accessories", image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400" },
  { id: 10, name: "Smart Home", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400" },
]

export const HOME_CATEGORIES_KEY = "cms-home-category-ids"

export function getHomeCategoryIds() {
  if (typeof window === "undefined") return []
  const saved = window.localStorage.getItem(HOME_CATEGORIES_KEY)
  if (!saved) return []
  try { return JSON.parse(saved) as number[] } catch { return [] }
}
