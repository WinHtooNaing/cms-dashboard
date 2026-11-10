import { useState } from "react"

import { Eye, MoreHorizontal, SquarePen, Trash2 } from "lucide-react"

import type { Order, OrderStatus } from "@/data/orders"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Dialog, DialogContent } from "@/components/ui/dialog"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import OrderDetailsDialog from "./OrderDetailsDialog"
import { useNavigate } from "react-router-dom"

type OrderActionsProps = {
  order: Order
  onUpdateStatus: (order: Order, status: OrderStatus) => void | Promise<void>
  onCancel: (order: Order) => void | Promise<void>
}

export default function OrderActions({
  order,
  onUpdateStatus,
  onCancel,
}: OrderActionsProps) {
  const navigate = useNavigate()
  const [updateOpen, setUpdateOpen] = useState(false)
  const [cancelOpen, setCancelOpen] = useState(false)

  const isFinalOrder =
    order.status === "Delivered" || order.status === "Cancelled"

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
          <DropdownMenuItem onClick={() => navigate(`/order/${order.id}`)}>
            <Eye className="mr-2 size-4" />
            View Details
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={isFinalOrder}
            onClick={() => setUpdateOpen(true)}
          >
            <SquarePen className="mr-2 size-4" />
            Update Status
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            disabled={isFinalOrder}
            onClick={() => setCancelOpen(true)}
          >
            <Trash2 className="mr-2 size-4" />
            Cancel Order
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
        <DialogContent className="max-w-md">
          <OrderDetailsDialog
            key={`${order.id}-${order.status}`}
            mode="update"
            order={order}
            onUpdateStatus={async (status) => {
              await onUpdateStatus(order, status)
              setUpdateOpen(false)
            }}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this order?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to cancel order{" "}
              <span className="font-semibold text-foreground">#{order.id}</span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Keep Order</AlertDialogCancel>

            <AlertDialogAction
              variant="destructive"
              onClick={async () => {
                await onCancel(order)
                setCancelOpen(false)
              }}
            >
              Yes, Cancel Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
