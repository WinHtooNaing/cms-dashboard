import type { Order, OrderStatus } from "@/data/orders"
import OrderDetailsContent from "./OrderDetailsContent"
export type OrderDetailsDialogProps = {
  mode: "view" | "update"
  order: Order | null
  onUpdateStatus?: (status: OrderStatus) => void | Promise<void>
}

const OrderDetailsDialog = ({
  mode,
  order,
  onUpdateStatus,
}: OrderDetailsDialogProps) => {
  if (!order) return null

  return (
    <>
      <OrderDetailsContent
        mode={mode}
        order={order}
        onUpdateStatus={onUpdateStatus}
      />
    </>
  )
}

export default OrderDetailsDialog
