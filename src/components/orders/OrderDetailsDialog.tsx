import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import type { Order, OrderStatus } from "@/data/orders"
import { products } from "@/data/categories"

type OrderDetailsDialogProps = {
  order: Order | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

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

const OrderDetailsDialog = ({
  order,
  open,
  onOpenChange,
}: OrderDetailsDialogProps) => {
  if (!order) return null

  const orderTotal = order.items.reduce((total, item) => {
    const product = products.find((product) => product.id === item.productId)

    return total + (product ? product.price * item.quantity : 0)
  }, 0)

  const totalItems = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden sm:max-w-2xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center justify-between gap-3 pr-6">
            <DialogTitle className="text-xl">Order Details</DialogTitle>

            <Badge variant="outline" className={getStatusStyle(order.status)}>
              {order.status}
            </Badge>
          </div>

          <DialogDescription>Order ID: {order.id}</DialogDescription>
        </DialogHeader>

        <div className="scrollbar-none space-y-6 overflow-y-auto">
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
      </DialogContent>
    </Dialog>
  )
}

export default OrderDetailsDialog
