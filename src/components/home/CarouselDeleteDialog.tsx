import { Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import type { Carousel } from "@/types/carousel"
import { getApiErrorMessage } from "@/lib/api-error"
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

interface CarouselDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  carousel: Carousel | null
  onDelete: (carousel: Carousel) => Promise<void>
}

const CarouselDeleteDialog = ({
  open,
  onOpenChange,
  carousel,
  onDelete,
}: CarouselDeleteDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!carousel) return

    try {
      setIsDeleting(true)
      await onDelete(carousel)
      toast.success("Carousel deleted successfully.")
      onOpenChange(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    } finally {
      setIsDeleting(false)
    }
  }

  if (!carousel) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-destructive/10">
            <Trash2 className="size-6 text-destructive" />
          </div>

          <AlertDialogTitle>Delete Carousel?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to permanently delete “{carousel.title}”?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-destructive-foreground bg-destructive text-white hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete Carousel"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CarouselDeleteDialog
