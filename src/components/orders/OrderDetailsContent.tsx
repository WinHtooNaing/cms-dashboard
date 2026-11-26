import { useState } from "react"
import type { Order, OrderStatus } from "@/data/orders"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { products } from "@/data/categories"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const orderStatuses: OrderStatus[] = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
]
const formatPrice = (price: number) => `${price.toLocaleString("en-US")} MMK`

const getStatusStyle = (status: OrderStatus) => {
  const styles: Record<OrderStatus, string> = {
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Processing: "bg-blue-100 text-blue-700 border-blue-200",
    Shipped: "bg-purple-100 text-purple-700 border-purple-200",
    Delivered: "bg-green-100 text-green-700 border-green-200",
    Cancelled: "bg-red-100 text-red-700 border-red-200",
  }

  return styles[status]
}
type OrderDetailsContentProps = {
  mode: "view" | "update"
  order: Order
  onUpdateStatus?: (status: OrderStatus) => void | Promise<void>
}

const OrderDetailsContent = ({
  mode,
  order,
  onUpdateStatus,
}: OrderDetailsContentProps) => {
  const [status, setStatus] = useState<OrderStatus>(order.status)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isViewMode = mode === "view"

  const orderTotal = order.items.reduce((total, item) => {
    const product = products.find((product) => product.id === item.productId)

    return total + (product ? product.price * item.quantity : 0)
  }, 0)

  const totalItems = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const handleUpdate = async () => {
    if (!onUpdateStatus || status === order.status) return

    try {
      setIsSubmitting(true)
      await onUpdateStatus(status)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <DialogHeader>
        <div className="flex flex-wrap items-center justify-between gap-3 pr-6">
          <DialogTitle className="text-xl">
            {isViewMode ? "Order Details" : "Update Order Status"}
          </DialogTitle>

          <Badge variant="outline" className={getStatusStyle(order.status)}>
            {order.status}
          </Badge>
        </div>

        <DialogDescription>Order ID: {order.id}</DialogDescription>
      </DialogHeader>

      {isViewMode ? (
        <div className="max-h-[70vh] scrollbar-none space-y-6 overflow-y-auto">
          <section className="space-y-3">
            <h3 className="font-semibold">Order Information</h3>

            <div className="grid grid-cols-1 gap-3 rounded-lg border p-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-medium">{order.id}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p className="font-medium">
                  {new Date(order.orderDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Order Status</p>
                <p className="font-medium">{order.status}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="font-medium">{totalItems}</p>
              </div>
            </div>
          </section>

          <Separator />

          <section className="space-y-3">
            <h3 className="font-semibold">Customer Information</h3>

            <div className="space-y-3 rounded-lg border p-4">
              <div>
                <p className="text-sm text-muted-foreground">Customer Name</p>
                <p className="font-medium">{order.customer.name}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email Address</p>
                <p className="font-medium break-all">{order.customer.email}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="font-medium">{order.customer.phone}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Delivery Address
                </p>
                <p className="font-medium">{order.customer.address}</p>
              </div>
            </div>
          </section>

          <Separator />

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Ordered Products</h3>

              <span className="text-sm text-muted-foreground">
                {totalItems} items
              </span>
            </div>

            <div className="space-y-3">
              {order.items.map((item) => {
                const product = products.find(
                  (product) => product.id === item.productId
                )

                if (!product) return null

                const subtotal = product.price * item.quantity

                return (
                  <div
                    key={item.productId}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-16 shrink-0 rounded-md border object-contain p-1"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{product.name}</p>

                      <p className="text-sm text-muted-foreground">
                        {product.brand}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {formatPrice(product.price)} × {item.quantity}
                      </p>
                    </div>

                    <p className="shrink-0 text-right text-sm font-semibold">
                      {formatPrice(subtotal)}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>

          <Separator />

          <section className="space-y-3">
            <h3 className="font-semibold">Order Summary</h3>

            <div className="rounded-lg border p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Items</span>
                <span>{totalItems}</span>
              </div>

              <Separator className="my-3" />

              <div className="flex items-center justify-between">
                <span className="font-semibold">Total Amount</span>

                <span className="text-lg font-bold text-primary">
                  {formatPrice(orderTotal)}
                </span>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-5 py-4">
          <div className="rounded-lg border p-4">
            <p className="mb-2 text-sm text-muted-foreground">Current Status</p>

            <Badge variant="outline" className={getStatusStyle(order.status)}>
              {order.status}
            </Badge>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">New Order Status</label>

            <Select
              value={status}
              onValueChange={(value) => setStatus(value as OrderStatus)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select order status" />
              </SelectTrigger>

              <SelectContent>
                {orderStatuses.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {!isViewMode && (
        <DialogFooter>
          <Button
            disabled={status === order.status || isSubmitting}
            onClick={handleUpdate}
          >
            {isSubmitting ? "Updating..." : "Save Changes"}
          </Button>
        </DialogFooter>
      )}
    </>
  )
}
export default OrderDetailsContent
