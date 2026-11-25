import { Skeleton } from "@/components/ui/skeleton"
import { TableCell, TableRow } from "@/components/ui/table"

type BrandTableSkeletonProps = {
  columnCount: number
  rowCount?: number
}

const BrandTableSkeleton = ({
  columnCount,
  rowCount = 5,
}: BrandTableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columnCount }).map((_, columnIndex) => (
            <TableCell key={columnIndex}>
              {columnIndex === 0 ? (
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 shrink-0 rounded-md" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ) : columnIndex === columnCount - 1 ? (
                <Skeleton className="size-8 rounded-md" />
              ) : (
                <Skeleton
                  className={`h-4 ${
                    columnIndex === 1
                      ? "w-24"
                      : columnIndex === 2
                        ? "w-40"
                        : columnIndex === 3
                          ? "w-16"
                          : "w-28"
                  }`}
                />
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export default BrandTableSkeleton
