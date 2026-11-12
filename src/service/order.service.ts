import api from "@/lib/axios"
import type { getOrdersProps, OrderStatus, UpdateOrderStatusResponse } from "@/types/order"

export const getOrders = async (page: number, limit: number) => {
  const response = await api.get<getOrdersProps>("/admin/orders", {
    params: { page, limit },
  })
  return response.data
}

export const updateOrderStatus = async (
  id: string,
  status: OrderStatus,
): Promise<UpdateOrderStatusResponse> => {
  const response = await api.patch<UpdateOrderStatusResponse>(
    `/admin/orders/${id}/status`,
    { status },
  )
  return response.data
}
