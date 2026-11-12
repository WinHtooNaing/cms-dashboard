import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  useTable,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getOrders } from "@/service/order.service"

import { columns, type OrderTableRow } from "./column"
import { features } from "./data-table-features"

const PAGE_SIZE = 10
const EMPTY_ORDERS: OrderTableRow[] = []

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null

const toFiniteNumber = (value: unknown): number | undefined => {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim() !== ""
        ? Number(value)
        : Number.NaN

  return Number.isFinite(parsed) ? parsed : undefined
}

const toPositiveInteger = (value: unknown): number | undefined => {
  const parsed = toFiniteNumber(value)
  return parsed !== undefined && Number.isInteger(parsed) && parsed > 0
    ? parsed
    : undefined
}

const getItemCount = (items: unknown[]) =>
  items.reduce<number>((total, item) => {
    if (isRecord(item)) {
      const quantity = toPositiveInteger(item.quantity)
      if (quantity !== undefined) return total + quantity
    }

    return total + 1
  }, 0)

const parseOrderPage = (response: unknown, requestedPage: number) => {
  if (!isRecord(response)) {
    throw new Error("The orders API returned an invalid response.")
  }

  let payload = isRecord(response.data) ? response.data : response
  if (!Array.isArray(payload.items) && isRecord(payload.data)) {
    payload = payload.data
  }

  const rawItems = Array.isArray(payload.items)
    ? payload.items
    : Array.isArray(response.items)
      ? response.items
      : undefined

  if (!rawItems) {
    throw new Error("The orders API response did not include an orders list.")
  }

  const items = rawItems.map((item, index): OrderTableRow => {
    if (!isRecord(item)) {
      throw new Error(`The orders API returned an invalid order at row ${index + 1}.`)
    }

    const id = typeof item.id === "string" ? item.id : undefined
    const orderNumber =
      typeof item.orderNumber === "string" ? item.orderNumber : id
    const shippingName =
      typeof item.shippingName === "string" ? item.shippingName : undefined
    const status = typeof item.status === "string" ? item.status : undefined
    const totalAmount = toFiniteNumber(item.totalAmount)
    const createdAt =
      typeof item.createdAt === "string"
        ? item.createdAt
        : item.createdAt instanceof Date
          ? item.createdAt.toISOString()
          : undefined

    if (
      !id ||
      !orderNumber ||
      shippingName === undefined ||
      status === undefined ||
      totalAmount === undefined ||
      createdAt === undefined
    ) {
      throw new Error(
        `The orders API returned incomplete data at row ${index + 1}.`
      )
    }

    return {
      id,
      orderNumber,
      shippingName,
      status,
      totalAmount,
      createdAt,
      itemCount: Array.isArray(item.items) ? getItemCount(item.items) : 0,
    }
  })

  const pagination = isRecord(payload.pagination)
    ? payload.pagination
    : isRecord(response.pagination)
      ? response.pagination
      : undefined

  return {
    items,
    page: (pagination && toPositiveInteger(pagination.page)) ?? requestedPage,
    total: pagination ? toFiniteNumber(pagination.total) : undefined,
    totalPages: pagination
      ? toPositiveInteger(pagination.totalPages)
      : undefined,
  }
}

const OrderDataTable = () => {
  const [page, setPage] = useState(1)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ["orders", page, PAGE_SIZE],
    queryFn: async () => parseOrderPage(await getOrders(page, PAGE_SIZE), page),
    placeholderData: (previousData) => previousData,
  })

  const rows = data?.items ?? EMPTY_ORDERS
  const statuses = useMemo(
    () => [...new Set(rows.map((order) => order.status))].sort(),
    [rows]
  )

  const table = useTable({
    features,
    data: rows,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  })

  const currentPage = data?.page ?? page
  const canGoNext =
    data?.totalPages !== undefined
      ? currentPage < data.totalPages
      : rows.length === PAGE_SIZE

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search order ID or customer..."
          value={
            (table.getColumn("customer")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("customer")?.setFilterValue(event.target.value)
          }
          className="sm:max-w-sm"
        />

        <Select
          value={
            (table.getColumn("status")?.getFilterValue() as string) ?? "All"
          }
          onValueChange={(value) =>
            table
              .getColumn("status")
              ?.setFilterValue(value === "All" ? undefined : value)
          }
        >
          <SelectTrigger className="sm:w-45">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Loading orders...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-destructive"
                >
                  {error instanceof Error ? error.message : "Failed to load orders."}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          Showing {table.getFilteredRowModel().rows.length} of{" "}
          {data?.total ?? rows.length} orders
          {isFetching && <span className="ml-2">Updating...</span>}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Page {currentPage}
            {data?.totalPages !== undefined ? ` of ${data.totalPages}` : ""}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage <= 1 || isFetching}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(currentPage + 1)}
            disabled={!canGoNext || isFetching}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrderDataTable
