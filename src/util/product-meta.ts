export function getProductBrand(name: string) {
  const brands = [
    "ASUS",
    "TP-Link",
    "Dell",
    "LG",
    "Sony",
    "Canon",
    "Nintendo",
    "Keychron",
    "Logitech",
    "Samsung",
    "Apple",
    "Lenovo",
  ]

  return (
    brands.find((brand) =>
      name.toLowerCase().startsWith(brand.toLowerCase()),
    ) ?? "Other"
  )
}

export function getProductRating(productId: string) {
  // Static demo rating between 4.0 and 5.0.
  const hash = productId
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0)

  return Number((4 + (hash % 11) / 10).toFixed(1))
}