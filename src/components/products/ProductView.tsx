import {
  ArrowLeft,
  CalendarDays,
  Package,
  Tag,
  Boxes,
  Barcode,
  Building2,
  FolderOpen,
  CircleCheck,
  CircleX,
} from "lucide-react"

import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"

import { Card, CardContent } from "@/components/ui/card"

import ProductViewSkeleton from "@/components/skeletons/ProductViewSkeleton"

import { getProductById } from "@/service/product.service"
import { getCategories } from "@/service/category.service"
import { getBrands } from "@/service/brand.service"

const formatPrice = (price: string | number) => {
  return `${Number(price).toLocaleString()} Ks`
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const ProductView = () => {
  const { id } = useParams<{ id: string }>()

  // Fetch product
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

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  // Fetch brands
  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  })

  if (isLoading) {
    return <ProductViewSkeleton />
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <Package className="size-12 text-muted-foreground" />

        <div className="text-center">
          <h2 className="text-lg font-semibold">Product not found</h2>

          <p className="text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "The requested product could not be found."}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          render={<Link to="/products" />}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to products
        </Button>
      </div>
    )
  }

  // Resolve category and brand names
  const categoryName =
    product.category?.name ??
    categories.find((category) => category.id === product.categoryId)?.name ??
    "Unknown"

  const brandName =
    product.brand?.name ??
    brands.find((brand) => brand.id === product.brandId)?.name ??
    "Unknown"

  // Discount calculation
  const hasDiscount =
    product.originalPrice != null &&
    product.discountPercentage != null &&
    Number(product.originalPrice) > Number(product.price) &&
    Number(product.discountPercentage) > 0

  const isActive = product.isActive

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 pb-10">
      {/* Header */}
      <div className="space-y-4">
        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          render={<Link to="/products" />}
          className="-ml-2 text-muted-foreground"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to products
        </Button>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Product Details
            </h1>

            <p className="text-sm text-muted-foreground">
              View and manage your product information.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                isActive
                  ? "bg-green-500/10 text-green-600"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {isActive ? (
                <CircleCheck className="size-3.5" />
              ) : (
                <CircleX className="size-3.5" />
              )}

              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column - Product Image */}
        <div className="space-y-6 lg:col-span-5">
          <Card className="overflow-hidden border shadow-sm">
            <div className="flex aspect-square items-center justify-center bg-muted/40 p-8 sm:p-12">
              <img
                src={product.imageUrl ?? "/placeholder.png"}
                alt={product.name}
                className="size-full object-contain"
              />
            </div>

            <CardContent className="border-t bg-background p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{product.name}</p>

                  <p className="text-xs text-muted-foreground">Product image</p>
                </div>

                <Package className="size-5 shrink-0 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Inventory Card */}
          <Card className="shadow-sm">
            <CardContent className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Inventory</h3>

                  <p className="text-xs text-muted-foreground">
                    Current stock availability
                  </p>
                </div>

                <div className="rounded-lg bg-primary/10 p-2">
                  <Boxes className="size-5 text-primary" />
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold tracking-tight">
                    {product.stock?.availableQuantity ?? 0}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Available units
                  </p>
                </div>

                <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
                  In Stock
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-6 lg:col-span-7">
          {/* Basic Information */}
          <Card className="shadow-sm">
            <CardContent className="space-y-5 p-5 sm:p-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    {categoryName}
                  </span>

                  {hasDiscount && (
                    <span className="rounded-md bg-destructive/10 px-2.5 py-1 text-xs font-semibold text-destructive">
                      {product.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {product.name}
                </h2>

                <p className="text-sm text-muted-foreground">{brandName}</p>
              </div>

              <div className="h-px bg-border" />

              {/* Pricing */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Product Pricing
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-3xl font-bold tracking-tight text-primary">
                    {formatPrice(product.price)}
                  </span>

                  {hasDiscount && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice!)}
                    </span>
                  )}
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-semibold">Description</h3>

                <p className="text-sm leading-7 whitespace-pre-line text-muted-foreground">
                  {product.description || "No description available."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Product Information */}
          <Card className="shadow-sm">
            <CardContent className="space-y-5 p-5 sm:p-6">
              <div>
                <h3 className="font-semibold">Product Information</h3>

                <p className="text-sm text-muted-foreground">
                  General product specifications and details.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* SKU */}
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Barcode className="size-4 text-muted-foreground" />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <p className="text-xs text-muted-foreground">SKU</p>

                    <p className="text-sm font-semibold break-all">
                      {product.sku || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Brand */}
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Building2 className="size-4 text-muted-foreground" />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <p className="text-xs text-muted-foreground">Brand</p>

                    <p className="text-sm font-semibold">{brandName}</p>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <FolderOpen className="size-4 text-muted-foreground" />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <p className="text-xs text-muted-foreground">Category</p>

                    <p className="text-sm font-semibold">{categoryName}</p>
                  </div>
                </div>

                {/* Product ID */}
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Tag className="size-4 text-muted-foreground" />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <p className="text-xs text-muted-foreground">Product ID</p>

                    <p className="text-sm font-semibold break-all">
                      {product.id}
                    </p>
                  </div>
                </div>

                {/* Created Date */}
                <div className="flex items-start gap-3 sm:col-span-2">
                  <div className="rounded-lg bg-muted p-2">
                    <CalendarDays className="size-4 text-muted-foreground" />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <p className="text-xs text-muted-foreground">Created At</p>

                    <p className="text-sm font-semibold">
                      {formatDate(product.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProductView
