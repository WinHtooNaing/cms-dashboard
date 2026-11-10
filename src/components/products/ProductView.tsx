import { ArrowLeft, Package, Star } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import ProductViewSkeleton from "@/components/skeletons/ProductViewSkeleton"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { getProductById } from "@/service/product.service"
import { getCategories } from "@/service/category.service"

import { getProductBrand, getProductRating } from "@/util/product-meta"

const formatPrice = (price: string | number) => {
  return `${Number(price).toLocaleString()} Ks`
}

const ProductView = () => {
  const { id } = useParams<{ id: string }>()

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
  })

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  if (isLoading) {
    return <ProductViewSkeleton />
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-lg font-medium">
          {error instanceof Error ? error.message : "Product not found."}
        </p>

        <Button variant="outline" render={<Link to="/products" />}>
          <ArrowLeft />
          Back to products
        </Button>
      </div>
    )
  }

  const categoryName =
    product.category?.name ??
    categories.find((category) => category.id === product.categoryId)?.name ??
    "Unknown"

  const brand = product.brand ?? getProductBrand(product.name)
  const rating = getProductRating(product.id)

  const hasDiscount =
    product.originalPrice !== null &&
    product.originalPrice !== undefined &&
    product.discountPercentage !== null &&
    product.discountPercentage !== undefined &&
    Number(product.originalPrice) > Number(product.price) &&
    product.discountPercentage > 0
  const brandName =
    typeof brand === "string" ? brand : (brand?.name ?? "Unknown")
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <Button variant="ghost" render={<Link to="/products" />}>
        <ArrowLeft />
        Back to products
      </Button>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="aspect-square bg-muted">
            <img
              src={product.imageUrl ?? "/placeholder.png"}
              alt={product.name}
              className="size-full object-cover"
            />
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-primary">
              Products / {categoryName}
            </p>

            <h1 className="text-3xl font-semibold tracking-tight">
              {product.name}
            </h1>

            <p className="text-muted-foreground">{brandName}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-2xl font-semibold">
                {formatPrice(product.price)}
              </p>

              {hasDiscount && (
                <>
                  <p className="text-base text-muted-foreground line-through">
                    {formatPrice(product.originalPrice!)}
                  </p>

                  <span className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-semibold text-destructive">
                    {product.discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm">
              <Star className="size-4 fill-current text-amber-500" />
              {rating}
            </span>
          </div>

          <p className="leading-7 text-muted-foreground">
            {product.description}
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>

              <CardDescription>Current catalog details</CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{categoryName}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Brand</p>
                <p className="font-medium">{brandName}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">SKU</p>
                <p className="font-medium">{product.sku}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p
                  className={
                    product.isActive
                      ? "font-medium text-green-600"
                      : "font-medium text-red-500"
                  }
                >
                  {product.isActive ? "Active" : "Inactive"}
                </p>
              </div>

              <div>
                <Package className="mb-1 size-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Product ID</p>
                <p className="font-medium break-all">{product.id}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <p className="font-medium">
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>

              {product.stock && (
                <div>
                  <p className="text-sm text-muted-foreground">
                    Available Stock
                  </p>
                  <p className="font-medium">
                    {product.stock.availableQuantity}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProductView
