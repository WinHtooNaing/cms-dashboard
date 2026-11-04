import type { Carousel } from "@/types/carousel"

import { Badge } from "@/components/ui/badge"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CarouselViewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  carousel: Carousel | null
}

const CarouselViewDialog = ({
  open,
  onOpenChange,
  carousel,
}: CarouselViewDialogProps) => {
  if (!carousel) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Carousel Details</DialogTitle>

          <DialogDescription>
            View complete carousel information.
          </DialogDescription>
        </DialogHeader>

        <div className="scrollbar-none space-y-6 overflow-y-auto">
          <div className="overflow-hidden rounded-lg border">
            <img
              src={carousel.image}
              alt={carousel.title}
              className="aspect-video w-full object-cover"
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Carousel Title
            </p>

            <h3 className="text-lg font-semibold">{carousel.title}</h3>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Description
            </p>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {carousel.description}
            </p>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <span className="text-sm font-medium">Carousel Status</span>

            <Badge variant={carousel.isActive ? "default" : "secondary"}>
              {carousel.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CarouselViewDialog
