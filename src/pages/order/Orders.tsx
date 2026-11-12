import { Card, CardContent } from "@/components/ui/card"
import OrderDataTable from "@/components/orders/OrderDataTable"

const Orders = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold">Orders</h1>
      <p className="text-sm text-muted-foreground">
        Manage and track your customer orders.
      </p>
    </div>

    <Card>
      <CardContent className="p-5">
        <OrderDataTable />
      </CardContent>
    </Card>
  </div>
)

export default Orders
