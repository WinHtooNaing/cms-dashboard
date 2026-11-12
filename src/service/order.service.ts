import api from "@/lib/axios"
import type { getOrdersProps } from "@/types/order"

export const getOrders = async (page: number, limit: number) => {
  const response = await api.get<getOrdersProps>("/admin/orders", {
    params: { page, limit },
  })
  return response.data
}
