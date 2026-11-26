import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

const AboutContentSkeleton = () => {
  return (
    <div className="space-y-8 pt-4 sm:pt-6">
      {/* Page Header */}
      <div className="flex items-start gap-3">
        <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />

        <div className="flex-1 space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-full max-w-lg" />
        </div>
      </div>

      {/* Content Card */}
      <Card className="overflow-hidden">
        {/* Card Header */}
        <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="space-y-2">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-4 w-64 max-w-full" />
          </div>
        </div>

        <CardContent className="p-0">
          {/* Table Header */}
          <div className="flex items-center gap-6 border-b bg-muted/40 px-5 py-3">
            <Skeleton className="h-4 w-8 shrink-0" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-32" />
            <div className="ml-auto">
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-6 px-5 py-5">
                {/* Number */}
                <Skeleton className="h-4 w-6 shrink-0" />

                {/* Title */}
                <div className="w-40 shrink-0">
                  <Skeleton className="h-5 w-full" />
                </div>

                {/* Description */}
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-full max-w-md" />
                  <Skeleton className="h-4 w-[70%] max-w-sm" />
                </div>

                {/* Actions */}
                <div className="ml-auto flex shrink-0 gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AboutContentSkeleton
