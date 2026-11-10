export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"

export type Order = {
  id: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  items: {
    productId: number
    quantity: number
  }[]
  orderDate: string
  status: OrderStatus
}


export const orders: Order[] = [
  {
    id: "ORD-001",
    customer: {
      name: "Mg Mg",
      email: "mgmg@gmail.com",
      phone: "+95 9 123456789",
      address: "Sanchaung Township, Yangon, Myanmar",
    },
    items: [{ productId: 1, quantity: 1 }],
    orderDate: "2026-11-01",
    status: "Pending",
  },
  {
    id: "ORD-002",
    customer: {
      name: "Aung Aung",
      email: "aungaung@gmail.com",
      phone: "+95 9 987654321",
      address: "Hlaing Township, Yangon, Myanmar",
    },
    items: [{ productId: 4, quantity: 1 }],
    orderDate: "2026-11-01",
    status: "Delivered",
  },
  {
    id: "ORD-003",
    customer: {
      name: "Su Su",
      email: "susu@gmail.com",
      phone: "+95 9 777888999",
      address: "Tamwe Township, Yangon, Myanmar",
    },
    items: [
      { productId: 6, quantity: 1 },
      { productId: 14, quantity: 2 },
      { productId: 8, quantity: 1 },
    ],
    orderDate: "2026-11-02",
    status: "Processing",
  },
  {
    id: "ORD-004",
    customer: {
      name: "Kyaw Kyaw",
      email: "kyaw@gmail.com",
      phone: "+95 9 555666777",
      address: "Mandalay, Myanmar",
    },
    items: [{ productId: 12, quantity: 1 }],
    orderDate: "2026-11-02",
    status: "Shipped",
  },
  {
    id: "ORD-005",
    customer: {
      name: "Hnin Hnin",
      email: "hnin@gmail.com",
      phone: "+95 9 111222333",
      address: "Bahan Township, Yangon, Myanmar",
    },
    items: [
      { productId: 3, quantity: 1 },
      { productId: 13, quantity: 1 },
    ],
    orderDate: "2026-11-02",
    status: "Cancelled",
  },
]