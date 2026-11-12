export type getOrdersProps = {
  data: {
    items: {
      id: string
      orderNumber: string
      totalAmount: number
      status: string
      shippingName: string
      createdAt: Date
      items: []
    }
  }
}
