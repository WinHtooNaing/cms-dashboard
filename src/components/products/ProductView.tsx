import { ArrowLeft, Package, Star } from "lucide-react"
import { Link, Navigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { products } from "@/data/categories"

const ProductView = () => {
  const { id } = useParams<{ id: string }>()
  const product = products.find((item) => item.id === Number(id))

  if (!product) {
    return <Navigate to="/products" replace />
  }

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
              src={product.image}
              alt={product.name}
              className="size-full object-cover"
            />
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-primary">
              Products / {product.category}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              {product.name}
            </h1>
            <p className="text-muted-foreground">{product.brand}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <p className="text-2xl font-semibold">
              {product.price.toLocaleString()} ks
            </p>
            {product.originalPrice > product.price && (
              <p className="text-muted-foreground line-through">
                {product.originalPrice.toLocaleString()} ks
              </p>
            )}
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm">
              <Star className="size-4 fill-current text-amber-500" />
              {product.rating}
            </span>
          </div>

          <p className="leading-7 text-muted-foreground">
            {product.description}
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Product information</CardTitle>
              <CardDescription>
                Current inventory and catalog details
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{product.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Brand</p>
                <p className="font-medium">{product.brand}</p>
              </div>
              <div className="flex items-center gap-2">
                <Package className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Stock</p>
                  <p className="font-medium">{product.stock} units</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Product ID</p>
                <p className="font-medium">#{product.id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProductView
