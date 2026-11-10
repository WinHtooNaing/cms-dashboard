import { Skeleton } from "@/components/ui/skeleton"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Star } from "lucide-react"

type ProductTableSkeletonProps = {
  rowCount?: number
}

export default function ProductTableSkeleton({
  rowCount = 8,
}: ProductTableSkeletonProps) {
  return (
    <TableBody>
      {Array.from({ length: rowCount }).map((_, index) => (
        <TableRow key={index}>
          {/* NO */}
          <TableCell>
            <Skeleton className="h-4 w-6" />
          </TableCell>

          {/* Product Name */}
          <TableCell>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
            </div>
          </TableCell>

          {/* Description */}
          <TableCell>
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
            </div>
          </TableCell>

          {/* Category */}
          <TableCell>
            <Skeleton className="h-5 w-20 rounded-md" />
          </TableCell>

          {/* Brand */}
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>

          {/* Price */}
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>

          {/* Stock */}
          <TableCell>
            <Skeleton className="h-4 w-10" />
          </TableCell>

          {/* Rating */}
          <TableCell>
            <div className="flex items-center gap-2">
              <Star className="size-4 text-muted-foreground/30" />
              <Skeleton className="h-4 w-8" />
            </div>
          </TableCell>

          {/* Actions */}
          <TableCell>
            <Skeleton className="size-8 rounded-md" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
