import { Skeleton } from "@/components/ui/skeleton"
import { TableCell, TableRow } from "@/components/ui/table"

type NewCollectionTableSkeletonProps = {
  rowCount?: number
}

const NewCollectionTableSkeleton = ({
  rowCount = 5,
}: NewCollectionTableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <TableRow key={index}>
          {/* Name */}
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>

          {/* Image */}
          <TableCell>
            <Skeleton className="h-16 w-16 rounded-md" />
          </TableCell>

          {/* Select */}
          <TableCell>
            <Skeleton className="h-6 w-11 rounded-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

export default NewCollectionTableSkeleton
