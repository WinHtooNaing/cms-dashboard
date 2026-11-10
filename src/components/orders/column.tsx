import { createColumnHelper } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import OrderActions from "./OrderAction"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import type { Order, OrderStatus } from "@/data/orders"
import type { OrderTableFeatures } from "./data-table-features"

type OrderTableData = Order & {
  totalAmount: number
  totalItems: number
}

type ColumnsProps = {
  onUpdateStatus: (order: Order, status: OrderStatus) => void | Promise<void>

  onCancel: (order: Order) => void | Promise<void>
}

const columnHelper = createColumnHelper<OrderTableFeatures, OrderTableData>()
export const getStatusStyle = (status: OrderStatus) => {
  const styles: Record<OrderStatus, string> = {
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Processing: "bg-blue-100 text-blue-700 border-blue-200",
    Shipped: "bg-purple-100 text-purple-700 border-purple-200",
    Delivered: "bg-green-100 text-green-700 border-green-200",
    Cancelled: "bg-red-100 text-red-700 border-red-200",
  }

  return styles[status]
}

export const formatPrice = (price: number) =>
  `${price.toLocaleString("en-US")} MMK`

export const columns = ({ onUpdateStatus, onCancel }: ColumnsProps) =>
  columnHelper.columns([
    // Order ID
    columnHelper.accessor("id", {
      header: "Order ID",
      cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
    }),

    // Customer
    // The accessor includes ID, name, and email for searching.
    columnHelper.accessor(
      (row) => `${row.id} ${row.customer.name} ${row.customer.email}`,
      {
        id: "customer",
        header: "Customer",
        filterFn: "includesString",
        cell: ({ row }) => (
          <div className="space-y-1">
            <p className="font-medium">{row.original.customer.name}</p>
            <p className="text-xs text-muted-foreground">
              {row.original.customer.email}
            </p>
          </div>
        ),
      }
    ),

    // Products
    columnHelper.accessor("totalItems", {
      header: "Products",
      cell: ({ row }) => <span>{row.original.totalItems} items</span>,
    }),

    // Order Date
    columnHelper.accessor("orderDate", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Date
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span>{new Date(row.original.orderDate).toLocaleDateString()}</span>
      ),
    }),

    // Total Amount
    columnHelper.accessor("totalAmount", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Amount
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-semibold">
          {formatPrice(row.original.totalAmount)}
        </span>
      ),
    }),

    // Status
    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={getStatusStyle(row.original.status)}
        >
          {row.original.status}
        </Badge>
      ),
    }),

    // Actions
    columnHelper.display({
      id: "actions",
      header: "Actions",
      enableSorting: false,

      cell: ({ row }) => (
        <OrderActions
          order={row.original}
          onUpdateStatus={onUpdateStatus}
          onCancel={onCancel}
        />
      ),
    }),
  ])
