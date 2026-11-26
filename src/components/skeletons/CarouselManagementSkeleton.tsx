import { Skeleton } from "@/components/ui/skeleton"

const CarouselManagementSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Table Header */}
      <div className="flex items-center justify-between gap-4 border-b px-4 py-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Table Rows */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center gap-4 border-b px-4 py-4">
          {/* Image */}
          <Skeleton className="h-14 w-20 shrink-0 rounded-md" />

          {/* Title */}
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>

          {/* Description */}
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-full max-w-48" />
            <Skeleton className="h-3 w-32" />
          </div>

          {/* Position */}
          <Skeleton className="h-6 w-12 rounded-md" />

          {/* Actions */}
          <Skeleton className="size-8 shrink-0 rounded-md" />
        </div>
      ))}
    </div>
  )
}

export default CarouselManagementSkeleton
