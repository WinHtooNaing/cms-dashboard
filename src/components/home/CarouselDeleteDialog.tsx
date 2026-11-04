import { Trash2 } from "lucide-react"

import type { Carousel } from "@/types/carousel"

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
}

const CarouselDeleteDialog = ({
  open,
  onOpenChange,
  carousel,
}: CarouselDeleteDialogProps) => {
  const handleDelete = () => {
    onOpenChange(false)
    console.log("Carousel deleted:", carousel?.id)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-destructive/10">
            <Trash2 className="size-6 text-destructive" />
          </div>

          <AlertDialogTitle>Delete Carousel?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to permanently delete this carousel??
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
          >
            Delete Carousel
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CarouselDeleteDialog
