export type CategoryItem = {
  id: number
  name: string
  image: string
}

export const categories: CategoryItem[] = [
  {
    id: 1,
    name: "Watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  },
  {
    id: 2,
    name: "TV & Entertainment",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400",
  },
  {
    id: 4,
    name: "Mobile Phones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
  },
  {
    id: 5,
    name: "Laptops & Computers",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
  },
  {
    id: 6,
    name: "Audio & Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  },
  {
    id: 7,
    name: "Cameras",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
  },
  {
    id: 8,
    name: "Gaming",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400",
  },
  {
    id: 9,
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400",
  },
  {
    id: 10,
    name: "Smart Home",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400",
  },
]

export const details = [
  {
    id: 1,
    title: "name",
    visible: true,
  },
  {
    id: 2,
    title: "image",
    visible: true,
  },
  {
    id: 3,
    title: "description",
    visible: false,
  },
  {
    id: 4,
    title: "price",
    visible: true,
  },
  {
    id: 5,
    title: "quantity",
    visible: false,
  },
  {
    id: 6,
    title: "category",
    visible: false,
  },
]

export type Product = {
  id: number
  name: string
  brand: string
  price: number
  originalPrice: number
  image: string
  category: string
  description: string
  stock: number
  rating: number
}
export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    price: 1599000,
    originalPrice: 1699000,
    image:
      "https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202409/10/00194612500283____4__1200x1200.jpg",
    category: "Smartphone",
    description:
      "Experience powerful performance with the A18 Pro chip, a stunning 6.9-inch display, an advanced camera system, and long-lasting battery life.",
    stock: 12,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    price: 1499000,
    originalPrice: 1599000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc72bcLp_CVvfhSV1pxsBn4Cwb6EDaZPPVIevz9QYzKQ&s=10",
    category: "Smartphone",
    description:
      "Discover premium mobile technology with a large Dynamic AMOLED display, advanced Galaxy AI features, a versatile camera system, and powerful everyday performance.",
    stock: 8,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Google Pixel 9 Pro",
    brand: "Google",
    price: 1199000,
    originalPrice: 1299000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuoxIN3jzL3SEUSUhALGcg5lS4p73GRzTzbUhQ05uswg&s=10",
    category: "Smartphone",
    description:
      "Capture detailed photos with Google's advanced camera technology and enjoy a smooth display, intelligent AI features, and a clean Android experience.",
    stock: 10,
    rating: 4.7,
  },
  {
    id: 4,
    name: "MacBook Air M4",
    brand: "Apple",
    price: 2499000,
    originalPrice: 2699000,
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-air-og-202503",
    category: "Laptop",
    description:
      "Work, create, and multitask with the Apple M4 chip, a lightweight design, a brilliant Liquid Retina display, and impressive battery life.",
    stock: 6,
    rating: 4.9,
  },
  {
    id: 5,
    name: "Dell XPS 13",
    brand: "Dell",
    price: 2199000,
    originalPrice: 2399000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbWZ9UiR5hdn9g2jvtuQQcp5wqE-0_IFR5sUvdvmJl4w&s=10",
    category: "Laptop",
    description:
      "A sleek and portable laptop designed for productivity, featuring a premium build, a sharp display, and responsive performance for everyday work.",
    stock: 7,
    rating: 4.6,
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    brand: "Sony",
    price: 499000,
    originalPrice: 549000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2_hTryW9-qbFjBuGDqMcA6Z1SUWRKaI-x5yebbhjMRQ&s=10",
    category: "Headphones",
    description:
      "Enjoy immersive listening with advanced noise cancellation, rich sound quality, comfortable ear cushions, and clear hands-free calls.",
    stock: 15,
    rating: 4.7,
  },
  {
    id: 7,
    name: "AirPods Pro 2",
    brand: "Apple",
    price: 399000,
    originalPrice: 449000,
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MQD83",
    category: "Headphones",
    description:
      "Experience rich audio with active noise cancellation, Transparency mode, a compact charging case, and seamless integration with Apple devices.",
    stock: 20,
    rating: 4.8,
  },
  {
    id: 8,
    name: "Apple Watch Series 10",
    brand: "Apple",
    price: 699000,
    originalPrice: 749000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6SeUDqWb0UC2o_bIaNeCXSLtKE3QrsSD_KNfJN6Tyw&s=10",
    category: "Watches",
    description:
      "Track your daily activity, monitor health metrics, receive notifications, and stay connected with a stylish smartwatch and a bright display.",
    stock: 9,
    rating: 4.8,
  },
  {
    id: 9,
    name: "Samsung Galaxy Watch Ultra",
    brand: "Samsung",
    price: 599000,
    originalPrice: 649000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ-6MXlHpHO_LvO7uOYfuwiEAGVLedWvdn7HPrvmsR1A&s=10",
    category: "Watches",
    description:
      "Built for active lifestyles, this rugged smartwatch offers fitness tracking, outdoor activity features, health monitoring, and a durable design.",
    stock: 11,
    rating: 4.6,
  },
  {
    id: 10,
    name: "Samsung 55-inch 4K Smart TV",
    brand: "Samsung",
    price: 1899000,
    originalPrice: 2099000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx0BWLWFMlnj2ezFyC_LeiBrVuiZLLswtjWNTWTtYVcA&s=10",
    category: "TV & Entertainment",
    description:
      "Upgrade your home entertainment with a large 4K display, vibrant colors, smart TV apps, and an immersive viewing experience for movies and shows.",
    stock: 5,
    rating: 4.7,
  },
  {
    id: 11,
    name: "LG OLED C4 55-inch TV",
    brand: "LG",
    price: 2799000,
    originalPrice: 2999000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzUoawrHlF2AmY9iGQr41Hn8PM6X5mufhji4bWTmXMAQ&s=10",
    category: "TV & Entertainment",
    description:
      "Enjoy deep blacks, vivid colors, and detailed 4K visuals with OLED picture quality, smooth motion, and smart entertainment features.",
    stock: 4,
    rating: 4.9,
  },
  {
    id: 12,
    name: "Sony PlayStation 5",
    brand: "Sony",
    price: 1899000,
    originalPrice: 1999000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgxoQdAs-oxNALVLmP7CQ8qjhJfK0G9w9kIklgw_efQA&s=10",
    category: "Gaming",
    description:
      "Explore immersive gaming with fast loading, detailed graphics, responsive gameplay, and support for a wide range of PlayStation 5 games.",
    stock: 8,
    rating: 4.9,
  },
  {
    id: 13,
    name: "Canon EOS R50",
    brand: "Canon",
    price: 1599000,
    originalPrice: 1699000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-bNIa6TstlfN--mCEH8MGrITumxnkPnQG5TPihpBKog&s=10",
    category: "Cameras",
    description:
      "Create sharp photos and high-quality videos with a compact mirrorless camera designed for beginners, content creators, and everyday photography.",
    stock: 6,
    rating: 4.7,
  },
  {
    id: 14,
    name: "JBL Charge 5",
    brand: "JBL",
    price: 249000,
    originalPrice: 279000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvz6sRjkBdDXnTZDScqlxHBaiKUWtUzG99p4zAe-uTzA&s=10",
    category: "Speakers",
    description:
      "Bring powerful portable sound anywhere with bold bass, a durable waterproof design, and a rechargeable battery for outdoor listening.",
    stock: 18,
    rating: 4.6,
  },
  {
    id: 15,
    name: "Dyson V15 Detect",
    brand: "Dyson",
    price: 1299000,
    originalPrice: 1399000,
    image:
      "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/447000-01.png",
    category: "Home & Kitchen",
    description:
      "Clean your home efficiently with powerful cordless suction, intelligent dust detection, and versatile attachments for different floor types and surfaces.",
    stock: 5,
    rating: 3.8,
  },
]
