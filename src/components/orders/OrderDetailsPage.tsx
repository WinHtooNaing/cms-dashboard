import { useNavigate, useParams } from "react-router-dom"

import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Package,
  UserRound,
  Mail,
  Phone,
  Truck,
  ShoppingBag,
} from "lucide-react"

import { orders } from "@/data/orders"
import { products } from "@/data/categories"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import type { OrderStatus } from "../../data/orders"

function OrderDetailsPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const order = orders.find((item) => item.id === id)

  if (!order) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6">
        <Package className="size-12 text-muted-foreground" />

        <h2 className="text-xl font-semibold">Order Not Found</h2>

        <p className="text-sm text-muted-foreground">
          The order you are looking for does not exist.
        </p>

        <Button onClick={() => navigate("/order")}>
          <ArrowLeft className="mr-2 size-4" />
          Back to Orders
        </Button>
      </div>
    )
  }

  const orderItems = order.items.map((item) => {
    const product = products.find((product) => product.id === item.productId)

    return {
      product,
      quantity: item.quantity,
    }
  })

  const subtotal = orderItems.reduce((total, item) => {
    return total + (item.product?.price ?? 0) * item.quantity
  }, 0)

  const shippingFee = subtotal > 0 ? 5000 : 0

  const total = subtotal + shippingFee

  const formatPrice = (price: number) => `${price.toLocaleString("en-US")} MMK`

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"

      case "Processing":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100"

      case "Shipped":
        return "bg-purple-100 text-purple-700 hover:bg-purple-100"

      case "Delivered":
        return "bg-green-100 text-green-700 hover:bg-green-100"

      case "Cancelled":
        return "bg-red-100 text-red-700 hover:bg-red-100"

      default:
        return ""
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/order")}
          >
            <ArrowLeft className="size-4" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold">Order #{order.id}</h1>

            <p className="text-sm text-muted-foreground">
              View order information and customer details.
            </p>
          </div>
        </div>

        <Badge className={`w-fit px-3 py-1 ${getStatusColor(order.status)}`}>
          {order.status}
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <ShoppingBag className="size-6" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>

              <p className="font-semibold">#{order.id}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <CalendarDays className="size-6" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Order Date</p>

              <p className="font-semibold">{order.orderDate}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-purple-100 p-3 text-purple-600">
              <Package className="size-6" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>

              <p className="font-semibold">
                {order.items.reduce((total, item) => total + item.quantity, 0)}{" "}
                Items
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="size-5" />
                Ordered Products
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-5">
                {orderItems.map((item) => {
                  if (!item.product) {
                    return (
                      <div
                        key={item.product ?? Math.random()}
                        className="text-sm text-destructive"
                      >
                        Product information unavailable.
                      </div>
                    )
                  }

                  return (
                    <div
                      key={item.product.id}
                      className="flex flex-col gap-4 sm:flex-row sm:items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="size-20 rounded-lg border object-contain p-2"
                      />

                      <div className="min-w-0 flex-1 space-y-1">
                        <h3 className="font-semibold">{item.product.name}</h3>

                        <p className="text-sm text-muted-foreground">
                          Brand: {item.product.brand}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="font-semibold">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.product.price)} / item
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserRound className="size-5" />
                Customer Information
              </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <UserRound className="mt-1 size-4 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">Customer Name</p>

                  <p className="font-medium">{order.customer.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-1 size-4 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>

                  <p className="font-medium break-all">
                    {order.customer.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-1 size-4 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>

                  <p className="font-medium">{order.customer.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Shipping Address
                  </p>

                  <p className="font-medium">{order.customer.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>

                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping Fee</span>

                <span className="font-medium">{formatPrice(shippingFee)}</span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="font-semibold">Total</span>

                <span className="text-lg font-bold text-primary">
                  {formatPrice(total)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="size-5" />
                Order Status
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Current order status
              </p>

              <Badge className={`px-3 py-1 ${getStatusColor(order.status)}`}>
                {order.status}
              </Badge>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground">Order Date</p>

                <p className="font-medium">{order.orderDate}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsPage
