import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const RolesPageSkeleton = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>

        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="flex items-center justify-between px-5">
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-12" />
              </div>

              <Skeleton className="size-11 rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Roles Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-4 w-64 max-w-full" />
            </div>

            {/* Search Input */}
            <Skeleton className="h-10 w-full rounded-md sm:w-60" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-187.5">
              {/* Table Header */}
              <div className="flex items-center gap-4 border-b px-4 py-3">
                <Skeleton className="h-4 w-24 flex-1" />
                <Skeleton className="h-4 w-40 flex-1" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>

              {/* Table Rows */}
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border-b px-4 py-4"
                >
                  {/* Role */}
                  <div className="flex flex-1 items-center gap-2">
                    <Skeleton className="size-9 shrink-0 rounded-md" />
                    <Skeleton className="h-4 w-24" />
                  </div>

                  {/* Description */}
                  <div className="flex-1">
                    <Skeleton className="h-4 w-40 max-w-full" />
                  </div>

                  {/* Users */}
                  <div className="w-16">
                    <Skeleton className="h-4 w-8" />
                  </div>

                  {/* Permissions */}
                  <div className="w-24">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>

                  {/* Last Updated */}
                  <div className="w-24">
                    <Skeleton className="h-4 w-20" />
                  </div>

                  {/* Actions */}
                  <div className="flex w-12 justify-end">
                    <Skeleton className="size-8 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Table Footer */}
          <div className="mt-4">
            <Skeleton className="h-4 w-36" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RolesPageSkeleton
