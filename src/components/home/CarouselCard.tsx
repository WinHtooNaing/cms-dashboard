import { Eye, Pencil, Trash2, ImageIcon } from "lucide-react"

import type { Carousel } from "@/types/carousel"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface CarouselCardProps {
  carousel: Carousel
  onDelete: (carousel: Carousel) => void
  onView: (carousel: Carousel) => void
  onEdit: (carousel: Carousel) => void
}

const CarouselCard = ({
  carousel,
  onDelete,
  onView,
  onEdit,
}: CarouselCardProps) => {
  return (
    <Card className="gap-0 overflow-hidden py-0">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={carousel.image}
          alt={carousel.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />

        <Badge
          className="absolute top-3 left-3"
          variant={carousel.isActive ? "default" : "secondary"}
        >
          {carousel.isActive ? "Active" : "Inactive"}
        </Badge>

        <div className="absolute top-3 right-3 rounded-md bg-background/90 p-2">
          <ImageIcon className="size-4 text-muted-foreground" />
        </div>
      </div>

      <CardContent className="space-y-3 p-4">
        <div>
          <p className="mb-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Carousel #{String(carousel.id).padStart(2, "0")}
          </p>

          <h3 className="line-clamp-1 text-lg font-semibold">
            {carousel.title}
          </h3>
        </div>

        <p className="line-clamp-2 min-h-10 text-sm leading-relaxed text-muted-foreground">
          {carousel.description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t p-4">
        <Button variant="outline" size="sm" onClick={() => onView(carousel)}>
          <Eye className="size-4" />
          View
        </Button>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(carousel)}
            aria-label="Edit carousel"
          >
            <Pencil className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            aria-label="Delete carousel"
            onClick={() => onDelete(carousel)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CarouselCard
