import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

const ContactUsSkeleton = () => {
  return (
    <div className="space-y-8 pt-4 sm:pt-6">
      {/* Page Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full max-w-lg" />
      </div>

      {/* Get in Touch Card */}
      <Card className="overflow-hidden">
        {/* Card Header */}
        <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-72 max-w-full" />
          </div>

          <Skeleton className="h-10 w-24 rounded-md" />
        </div>

        {/* Contact Information Cards */}
        <CardContent className="p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex min-w-0 gap-4 rounded-xl border p-4 sm:p-5"
              >
                {/* Icon Placeholder */}
                <Skeleton className="size-11 shrink-0 rounded-lg" />

                {/* Text Placeholder */}
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-40 max-w-full" />
                  <Skeleton className="h-4 w-full max-w-52" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContactUsSkeleton
