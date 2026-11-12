import { createColumnHelper } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { OrderTableFeatures } from "./data-table-features"
import OrderActions from "./OrderAction"
import type { OrderStatus } from "@/types/order"

export type OrderTableRow = {
  id: string
  orderNumber: string
  shippingName: string
  totalAmount: number
  status: OrderStatus
  createdAt: string
  itemCount: number
}

const columnHelper = createColumnHelper<OrderTableFeatures, OrderTableRow>()

const formatPrice = (price: number) => `${price.toLocaleString("en-US")}`

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-500 text-white"
    case "CONFIRMED":
      return "bg-blue-500 text-white"
    case "PROCESSING":
      return "bg-purple-500 text-white"
    case "SHIPPED":
      return "bg-indigo-500 text-white"
    case "DELIVERED":
      return "bg-green-500 text-white"
    case "CANCELLED":
      return "bg-red-500 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

export const columns = columnHelper.columns([
  columnHelper.accessor("orderNumber", {
    header: "Order ID",
    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.orderNumber.slice(0, 7)}
      </span>
    ),
  }),
  columnHelper.accessor(
    (row) => `${row.id} ${row.orderNumber} ${row.shippingName}`,
    {
      id: "customer",
      header: "Customer",
      filterFn: "includesString",
      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="font-medium">{row.original.shippingName}</p>
        </div>
      ),
    }
  ),
  columnHelper.accessor("itemCount", {
    header: "Products",
    cell: ({ row }) => <span>{row.original.itemCount} items</span>,
  }),
  columnHelper.accessor("createdAt", {
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
      <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
    ),
  }),
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
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className={getStatusColor(row.original.status)}>
        {row.original.status}
      </Badge>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <OrderActions status={row.original.status} id={row.original.id} />
    },
  }),
])
