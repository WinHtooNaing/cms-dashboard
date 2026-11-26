import { Card, CardContent } from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"

const CategorySkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="overflow-hidden py-0">
          <Skeleton className="aspect-4/3 w-full rounded-none" />
          <CardContent className="flex items-center justify-between gap-2 p-3">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex gap-1">
              <Skeleton className="size-8 rounded-md" />
              <Skeleton className="size-8 rounded-md" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default CategorySkeleton
