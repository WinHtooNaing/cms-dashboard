export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'

export type getOrdersProps = {
  data: {
    items: {
      id: string
      orderNumber: string
      totalAmount: number
      status: OrderStatus
      shippingName: string
      createdAt: Date
      items: []
    }
  }
}

export type UpdateOrderStatusResponse = {
  id: string
  orderNumber: string
  status: OrderStatus
  confirmedAt?: string
}
