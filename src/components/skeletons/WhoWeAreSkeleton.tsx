import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

const WhoWeAreSkeleton = () => {
  return (
    <div className="space-y-8 pt-4 sm:pt-6">
      {/* Page Header */}
      <div className="flex items-start gap-3">
        <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />

        <div className="flex-1 space-y-2">
          <Skeleton className="h-7 w-64 max-w-full" />
          <Skeleton className="h-4 w-full max-w-lg" />
        </div>
      </div>

      {/* Section Information Skeleton */}
      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-64 max-w-full" />
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-9 w-20 rounded-md" />
            <Skeleton className="h-9 w-32 rounded-md" />
          </div>
        </div>

        <CardContent className="p-0">
          {/* Table Header */}
          <div className="flex gap-8 border-b bg-muted/40 px-5 py-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="divide-y">
            {/* Badge */}
            <div className="flex items-center gap-8 px-5 py-5">
              <Skeleton className="h-4 w-24 shrink-0" />
              <Skeleton className="h-7 w-32 rounded-full" />
            </div>

            {/* Main Heading */}
            <div className="flex items-center gap-8 px-5 py-5">
              <Skeleton className="h-4 w-24 shrink-0" />
              <Skeleton className="h-5 w-64 max-w-full" />
            </div>

            {/* Highlighted Heading */}
            <div className="flex items-center gap-8 px-5 py-5">
              <Skeleton className="h-4 w-24 shrink-0" />
              <Skeleton className="h-5 w-52 max-w-full" />
            </div>

            {/* Description */}
            <div className="flex items-start gap-8 px-5 py-5">
              <Skeleton className="mt-1 h-4 w-24 shrink-0" />

              <div className="w-full max-w-3xl space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[70%]" />
              </div>
            </div>

            {/* Secondary Description */}
            <div className="flex items-start gap-8 px-5 py-5">
              <Skeleton className="mt-1 h-4 w-24 shrink-0" />

              <div className="w-full max-w-3xl space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[85%]" />
                <Skeleton className="h-4 w-[60%]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Management Skeleton */}
      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
          <div className="space-y-2">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-4 w-72 max-w-full" />
          </div>
        </div>

        <CardContent className="p-0">
          {/* Table Header */}
          <div className="flex items-center justify-between border-b bg-muted/40 px-5 py-3">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Feature Rows */}
          <div className="divide-y">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 px-5 py-5"
              >
                <Skeleton className="h-4 w-6" />

                <Skeleton className="h-5 w-48 max-w-[50%]" />

                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        {/* Footer */}
        <div className="border-t px-5 py-3">
          <Skeleton className="h-3 w-28" />
        </div>
      </Card>
    </div>
  )
}

export default WhoWeAreSkeleton
