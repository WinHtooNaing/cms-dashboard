import { Skeleton } from "@/components/ui/skeleton"
import { TableCell, TableRow } from "@/components/ui/table"

type OrderTableSkeletonProps = {
  columnCount: number
  rowCount?: number
}

const OrderTableSkeleton = ({
  columnCount,
  rowCount = 5,
}: OrderTableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columnCount }).map((_, columnIndex) => (
            <TableCell key={columnIndex}>
              <Skeleton
                className={`h-4 ${
                  columnIndex === 0
                    ? "w-24"
                    : columnIndex === 1
                      ? "w-32"
                      : columnIndex === 2
                        ? "w-16"
                        : columnIndex === 3
                          ? "w-20"
                          : columnIndex === 4
                            ? "w-24"
                            : "w-28"
                }`}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export default OrderTableSkeleton
