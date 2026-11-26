import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const FooterManagementSkeleton = () => {
  return (
    <div className="space-y-6 pt-4 sm:pt-6">
      {/* Page Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="flex items-center justify-between p-5">
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-3 w-40" />
              </div>

              <Skeleton className="size-11 rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="grid h-auto w-full grid-cols-3 gap-1 rounded-lg bg-muted p-1">
        <Skeleton className="h-9 rounded-md" />
        <Skeleton className="h-9 rounded-md" />
        <Skeleton className="h-9 rounded-md" />
      </div>

      {/* Description Section */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-64 max-w-full" />
          </div>

          <Skeleton className="h-9 w-20 rounded-md" />
        </CardHeader>

        <CardContent>
          <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[60%]" />

            <div className="flex justify-end">
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Links Section */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-64 max-w-full" />
          </div>

          <Skeleton className="h-9 w-24 rounded-md" />
        </CardHeader>

        <CardContent className="space-y-0 p-0">
          {/* Table Header */}
          <div className="flex items-center gap-4 border-y bg-muted/40 px-4 py-3">
            <Skeleton className="h-4 w-8 shrink-0" />
            <Skeleton className="h-4 w-8 shrink-0" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28 flex-1" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Table Rows */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-b px-4 py-4"
            >
              <Skeleton className="size-8 shrink-0 rounded-md" />
              <Skeleton className="h-4 w-8 shrink-0" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 max-w-40 min-w-0 flex-1" />

              <div className="flex shrink-0 gap-1">
                <Skeleton className="size-8 rounded-md" />
                <Skeleton className="size-8 rounded-md" />
                <Skeleton className="size-8 rounded-md" />
              </div>
            </div>
          ))}
        </CardContent>

        <div className="border-t px-6 py-3">
          <Skeleton className="h-3 w-44" />
        </div>
      </Card>

      {/* Social Media Section */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-64 max-w-full" />
          </div>

          <Skeleton className="h-9 w-28 rounded-md" />
        </CardHeader>

        <CardContent className="space-y-0 p-0">
          {/* Table Header */}
          <div className="flex items-center gap-4 border-y bg-muted/40 px-4 py-3">
            <Skeleton className="h-4 w-8 shrink-0" />
            <Skeleton className="h-4 w-8 shrink-0" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32 flex-1" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Table Rows */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-b px-4 py-4"
            >
              <Skeleton className="size-8 shrink-0 rounded-md" />
              <Skeleton className="h-4 w-8 shrink-0" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 max-w-48 min-w-0 flex-1" />

              <div className="flex shrink-0 gap-1">
                <Skeleton className="size-8 rounded-md" />
                <Skeleton className="size-8 rounded-md" />
                <Skeleton className="size-8 rounded-md" />
              </div>
            </div>
          ))}
        </CardContent>

        <div className="border-t px-6 py-3">
          <Skeleton className="h-3 w-48" />
        </div>
      </Card>
    </div>
  )
}

export default FooterManagementSkeleton
