import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProductViewSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Back Button */}
      <Button variant="ghost" disabled>
        <ArrowLeft />
        Back to products
      </Button>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Product Image Skeleton */}
        <Card className="overflow-hidden">
          <Skeleton className="aspect-square w-full rounded-none" />
        </Card>

        {/* Product Details Skeleton */}
        <div className="flex flex-col gap-6">
          {/* Category, Name and Brand */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-5 w-28" />
          </div>

          {/* Price and Rating */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-7 w-16 rounded-full" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Product Information Card */}
          <Card>
            <CardHeader className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64 max-w-full" />
            </CardHeader>

            <CardContent className="grid gap-6 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-32" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
