import { useMemo, useState } from "react"

import { Clock, CheckCircle2, Truck, ShoppingBag } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

import OrderDataTable from "@/components/orders/OrderDataTable"
import OrderDetailsDialog from "@/components/orders/OrderDetailsDialog"

import { orders } from "@/data/orders"
import { products } from "@/data/categories"

import type { Order } from "@/data/orders"
import OverviewCard from "./OverviewCard"

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const orderData = useMemo(() => {
    return orders.map((order) => {
      const totalAmount = order.items.reduce((total, item) => {
        const product = products.find(
          (product) => product.id === item.productId
        )

        return total + (product ? product.price * item.quantity : 0)
      }, 0)

      const totalItems = order.items.reduce(
        (total, item) => total + item.quantity,
        0
      )

      return {
        ...order,
        totalAmount,
        totalItems,
      }
    })
  }, [])

  const totalOrders = orders.length

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-sm text-muted-foreground">
          Manage and track your customer orders.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          title="Total Orders"
          value={totalOrders}
          icon={<ShoppingBag />}
        />

        <OverviewCard
          title="Pending Orders"
          value={pendingOrders}
          icon={<Clock />}
        />

        <OverviewCard
          title="Processing Orders"
          value={processingOrders}
          icon={<Truck />}
        />

        <OverviewCard
          title="Delivered Orders"
          value={deliveredOrders}
          icon={<CheckCircle2 />}
        />
      </div>

      <Card>
        <CardContent className="p-5">
          <OrderDataTable data={orderData} onView={setSelectedOrder} />
        </CardContent>
      </Card>

      <OrderDetailsDialog
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={(open) => {
          if (!open) setSelectedOrder(null)
        }}
      />
    </div>
  )
}

export default Orders
