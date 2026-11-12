import { Eye, MoreHorizontal, SquarePen, Trash2, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { updateOrderStatus } from "@/service/order.service"
import type { OrderStatus } from "@/types/order"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["CONFIRMED"],
  CONFIRMED: ["PROCESSING"],
  PROCESSING: ["SHIPPED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
}

type OrderActionsProps = {
  id: string
  status: OrderStatus
}

export default function OrderActions({ status, id }: OrderActionsProps) {
  const [updateOpen, setUpdateOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "">("")
  const queryClient = useQueryClient()

  const allowedNextStatuses = ALLOWED_TRANSITIONS[status] || []

  const updateStatusMutation = useMutation({
    mutationFn: (newStatus: OrderStatus) => updateOrderStatus(id, newStatus),
    onSuccess: () => {
      toast.success("Order status updated successfully")
      setUpdateOpen(false)
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
    onError: () => {
      toast.error("Failed to update order status")
    },
  })

  const cancelMutation = useMutation({
    mutationFn: () => updateOrderStatus(id, "CANCELLED"),
    onSuccess: () => {
      toast.success("Order cancelled successfully")
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
    onError: () => {
      toast.error("Failed to cancel order")
    },
  })

  const handleStatusChange = (value: OrderStatus | "" | null) => {
    if (value === null) return
    setSelectedStatus(value)
  }

  const handleUpdate = () => {
    if (!selectedStatus) return
    updateStatusMutation.mutate(selectedStatus)
  }

  const handleCancel = () => {
    cancelMutation.mutate()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-6" />
              <span className="sr-only">Open order actions</span>
            </Button>
          }
        />

        <DropdownMenuContent align="end" className="w-48">
          <Link to={`/order/${id}`}>
            <DropdownMenuItem>
              <Eye className="mr-2 size-4" />
              View Details
            </DropdownMenuItem>
          </Link>

          {allowedNextStatuses.length > 0 && (
            <DropdownMenuItem onClick={() => setUpdateOpen(true)}>
              <SquarePen className="mr-2 size-4" />
              Update Status
            </DropdownMenuItem>
          )}

          {status === "PENDING" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={handleCancel} disabled={cancelMutation.isPending}>
                <Trash2 className="mr-2 size-4" />
                {cancelMutation.isPending ? "Cancelling..." : "Cancel Order"}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Current status: {status}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Input
                type="text"
                value={status}
                readOnly
                className="border-2 border-yellow-500"
              />
              <Label>→</Label>
              <Select
                value={selectedStatus}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select next status" />
                </SelectTrigger>
                <SelectContent>
                  {allowedNextStatuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleUpdate} disabled={updateStatusMutation.isPending || !selectedStatus}>
              {updateStatusMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : "Update"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
