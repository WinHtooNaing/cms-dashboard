import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

const DescriptionSkeleton = () => {
  return (
    <div className="space-y-8 pt-4 sm:pt-6">
      {/* Page Header Skeleton */}
      <div className="flex items-start gap-3">
        <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />

        <div className="flex-1 space-y-2">
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-4 w-full max-w-lg" />
        </div>
      </div>

      {/* Content Card Skeleton */}
      <Card className="overflow-hidden border-border shadow-sm">
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
          <div className="space-y-2">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-4 w-64" />
          </div>

          <Skeleton className="h-9 w-40 rounded-md" />
        </div>

        {/* Table Skeleton */}
        <CardContent className="p-0">
          <div className="border-b bg-muted/40 px-5 py-3">
            <div className="flex gap-8">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y">
            {/* Badge Text */}
            <div className="flex items-center gap-8 px-5 py-5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-32 rounded-full" />
            </div>

            {/* Main Heading */}
            <div className="flex items-center gap-8 px-5 py-5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-64 max-w-full" />
            </div>

            {/* Highlighted Heading */}
            <div className="flex items-center gap-8 px-5 py-5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-52 max-w-full" />
            </div>

            {/* Description */}
            <div className="flex items-start gap-8 px-5 py-5">
              <Skeleton className="mt-1 h-4 w-24 shrink-0" />

              <div className="w-full max-w-3xl space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%] max-w-full" />
                <Skeleton className="h-4 w-[70%] max-w-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DescriptionSkeleton
