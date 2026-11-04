import { CheckCircle2, CircleOff, ImagePlus, Images, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { carouselData } from "@/data/carouselData"
import type { Carousel } from "@/types/carousel"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import CarouselCard from "@/components/home/CarouselCard"
import CarouselDeleteDialog from "@/components/home/CarouselDeleteDialog"
import CarouselViewDialog from "@/components/home/CarouselViewDialog"
import CarouselFormDialog from "@/components/home/CarouselFormDialog"
const CarouselManagement = () => {
  const [carousels] = useState<Carousel[]>(carouselData)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const totalCarousels = carousels.length
  const [selectedCarousel, setSelectedCarousel] = useState<Carousel | null>(
    null
  )
  const activeCarousels = carousels.filter(
    (carousel) => carousel.isActive
  ).length
  const handleDelete = (carousel: Carousel) => {
    setSelectedCarousel(carousel)
    setDeleteOpen(true)
  }
  const viewDialog = (carousel: Carousel) => {
    setSelectedCarousel(carousel)
    setViewOpen(true)
  }
  const handleEdit = (carousel: Carousel) => {
    setSelectedCarousel(carousel)
    setFormOpen(true)
  }
  const handleAdd = () => {
    setSelectedCarousel(null)
    setFormOpen(true)
  }
  const inactiveCarousels = totalCarousels - activeCarousels
  const stats = [
    {
      title: "Total Carousels",
      value: totalCarousels,
      icon: Images,
      description: "All homepage carousels",
    },
    {
      title: "Active Carousels",
      value: activeCarousels,
      icon: CheckCircle2,
      description: "Currently enabled",
    },
    {
      title: "Inactive Carousels",
      value: inactiveCarousels,
      icon: CircleOff,
      description: "Currently disabled",
    },
  ]

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 pt-4 sm:pt-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Carousel Management
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage your homepage carousel images, titles, and descriptions.
          </p>
        </div>

        <Button onClick={handleAdd}>
          <Plus className="size-4" />
          Add New Carousel
        </Button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <Card key={stat.title}>
              <CardContent className="flex items-center justify-between px-5 py-0.5">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>

                  <h2 className="text-2xl font-semibold">
                    {stat.value.toString().padStart(2, "0")}
                  </h2>

                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>

                <div className="rounded-xl bg-primary/10 p-3">
                  <Icon className="size-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Homepage Carousels</h2>

            <p className="text-sm text-muted-foreground">
              View and manage your existing carousel content.
            </p>
          </div>
        </div>
        {carousels.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-full bg-muted p-4">
                <ImagePlus className="size-8 text-muted-foreground" />
              </div>

              <h3 className="text-lg font-semibold">No Carousels Found</h3>

              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                You haven't added any homepage carousels yet. Start by creating
                your first carousel.
              </p>

              <Button className="mt-5">
                <Plus className="size-4" />
                Add Your First Carousel
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {carousels.map((carousel) => (
              <CarouselCard
                key={carousel.id}
                carousel={carousel}
                onDelete={handleDelete}
                onView={viewDialog}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
      <CarouselDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        carousel={selectedCarousel}
      />
      <CarouselFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        selectedCarousel={selectedCarousel}
      />
      <CarouselViewDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        carousel={selectedCarousel}
      />
    </div>
  )
}

export default CarouselManagement
