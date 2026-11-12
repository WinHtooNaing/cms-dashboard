import { Eye, MoreHorizontal, SquarePen, Trash2 } from "lucide-react"

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
type OrderActionsProps = {
  id: string
  status: string
}
export default function OrderActions({ status, id }: OrderActionsProps) {
  const [updateOpen, setUpdateOpen] = useState(false)

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

          <DropdownMenuItem onClick={() => setUpdateOpen(true)}>
            <SquarePen className="mr-2 size-4" />
            Update Status
          </DropdownMenuItem>

          {status == "PENDING" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2 className="mr-2 size-4" />
                Cancel Order
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-4">
            <Input
              type="text"
              value={status}
              readOnly
              className="border-2 border-yellow-500"
            />
            <Label>to</Label>
            <Input
              type="text"
              value={status}
              readOnly
              className="border-2 border-green-500"
            />
          </div>
          <Button>Update</Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
