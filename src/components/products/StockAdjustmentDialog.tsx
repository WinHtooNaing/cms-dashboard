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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getApiErrorMessage } from "@/lib/api-error"
import { adjustProductStock } from "@/service/product.service"
import type { Product } from "@/types/product"

const REASONS = [
  { label: "Adjustment", value: "ADJUSTMENT" },
  { label: "Restock", value: "RESTOCK" },
  { label: "Damage", value: "DAMAGE" },
  { label: "Return", value: "RETURN" },
  { label: "Sale Correction", value: "SALE_CORRECTION" },
]

export default function StockAdjustmentDialog({
  product,
  onClose,
}: {
  product: Product
  onClose: () => void
}) {
  const [quantityChange, setQuantityChange] = useState("")
  const [reason, setReason] = useState("ADJUSTMENT")
  const [note, setNote] = useState("")
  const [error, setError] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () =>
      adjustProductStock(product.id, {
        quantityChange: Number(quantityChange),
        reason,
        note: note.trim() || undefined,
      }),
    onSuccess: () => {
      toast.success("Stock adjusted successfully")
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["product", product.id] })
      setQuantityChange("")
      setReason("ADJUSTMENT")
      setNote("")
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

    if (quantityChange === "" || Number.isNaN(Number(quantityChange))) {
      setError("Quantity change is required")
      return
    }

    const qty = Number(quantityChange)
    if (!Number.isInteger(qty) || qty === 0) {
      setError("Quantity change must be a non-zero integer")
      return
    }

    if (!reason) {
      setError("Reason is required")
      return
    }

    mutation.mutate()
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Adjust Stock</DialogTitle>
        <DialogDescription>
          Adjust stock for <strong>{product.name}</strong>. Use negative values
          to decrease (e.g. -3).
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="adj-quantity" className="text-sm font-medium">
            Quantity Change
          </label>
          <Input
            id="adj-quantity"
            type="number"
            step={1}
            value={quantityChange}
            onChange={(e) => setQuantityChange(e.target.value)}
            placeholder="e.g. -3 or 10"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Reason</label>
          <Select value={reason} onValueChange={(v) => v && setReason(v)} items={REASONS}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {REASONS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="adj-note" className="text-sm font-medium">
            Note
          </label>
          <Textarea
            id="adj-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional note"
            rows={3}
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Adjust"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
