import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { getApiErrorMessage } from "@/lib/api-error"
import { initializeProductStock } from "@/service/product.service"
import type { Product } from "@/types/product"

export default function StockInitializeDialog({
  product,
  onClose,
}: {
  product: Product
  onClose: () => void
}) {
  const [quantity, setQuantity] = useState("")
  const [error, setError] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (qty: number) => initializeProductStock(product.id, qty),
    onSuccess: () => {
      toast.success("Stock initialized successfully")
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["product", product.id] })
      setQuantity("")
      setError(null)
      onClose()
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err))
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (quantity === "" || Number.isNaN(Number(quantity))) {
      setError("Quantity is required")
      return
    }

    const qty = Number(quantity)
    if (!Number.isInteger(qty) || qty < 0) {
      setError("Quantity must be a non-negative integer")
      return
    }

    mutation.mutate(qty)
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Initialize Stock</DialogTitle>
        <DialogDescription>
          Set initial stock quantity for <strong>{product.name}</strong>.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="init-quantity" className="text-sm font-medium">
            Quantity
          </label>
          <Input
            id="init-quantity"
            type="number"
            min={0}
            step={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Initialize"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
