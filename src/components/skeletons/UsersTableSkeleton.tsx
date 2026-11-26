import { Skeleton } from "@/components/ui/skeleton"
import { TableCell, TableRow } from "@/components/ui/table"

type UsersTableSkeletonProps = {
  rowCount?: number
}

export function UsersTableSkeleton({ rowCount = 5 }: UsersTableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <TableRow key={index}>
          {/* User */}
          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 shrink-0 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          </TableCell>

          {/* Role */}
          <TableCell>
            <Skeleton className="h-6 w-20 rounded-full" />
          </TableCell>

          {/* Permissions */}
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>

          {/* Joined Date */}
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>

          {/* Actions */}
          <TableCell className="text-right">
            <div className="flex justify-end">
              <Skeleton className="size-8 rounded-md" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
