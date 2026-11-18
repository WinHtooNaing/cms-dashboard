import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"

import CarouselDeleteDialog from "@/components/home/carousel/CarouselDeleteDialog"
import CarouselFormDialog from "@/components/home/carousel/CarouselFormDialog"
import { getCarouselColumns } from "@/components/home/carousel/columns"
import { DataTable } from "@/components/home/carousel/data-table"
import { Button } from "@/components/ui/button"
import { getApiErrorMessage } from "@/lib/api-error"
import {
  createImageCarousel,
  deleteImageCarousel,
  getImageCarousel,
  updateImageCarousel,
} from "@/service/carousel.service"
import type { Carousel } from "@/types/carousel"
import type { CarouselSchemaValues } from "@/schemas/carouselSchema"

const sectionId = "51f6ac36-14e0-448e-894c-448f6d579934"
const queryKey = ["carousels", sectionId]

const createRandomPosition = (items: Carousel[]) => {
  const maxPosition = 2_147_483_647
  const existingPositions = new Set(items.map((item) => item.position))
  let position = Math.floor(Math.random() * maxPosition) + 1

  while (existingPositions.has(position)) {
    position = (position % maxPosition) + 1
  }

  return position
}

const CarouselManagement = () => {
  const queryClient = useQueryClient()
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedCarousel, setSelectedCarousel] = useState<Carousel | null>(
    null
  )

  const {
    data: carousels = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getImageCarousel(sectionId)
      return response.data.map((item) => ({
        id: item.id,
        sectionId: item.sectionId,
        position: item.position,
        ...item.content,
      }))
    },
  })

  const handleAdd = () => {
    setSelectedCarousel(null)
    setFormOpen(true)
  }

  const handleEdit = (carousel: Carousel) => {
    setSelectedCarousel(carousel)
    setFormOpen(true)
  }

  const handleDeletePrompt = (carousel: Carousel) => {
    setSelectedCarousel(carousel)
    setDeleteOpen(true)
  }

  const handleSave = async (values: CarouselSchemaValues) => {
    const position =
      selectedCarousel?.position ?? createRandomPosition(carousels)
    const formData = new FormData()
    formData.append("position", String(position))
    formData.append(
      "content",
      JSON.stringify({
        title: values.title,
        description: values.description,
        imageUrl: values.imageUrl,
      })
    )

    if (values.image) {
      formData.append("image", values.image)
    } else if (!selectedCarousel) {
      throw new Error("Please upload a carousel image.")
    }

    if (selectedCarousel) {
      await updateImageCarousel(selectedCarousel.id, formData)
    } else {
      await createImageCarousel(sectionId, formData)
    }

    await queryClient.invalidateQueries({ queryKey })
  }

  const handleDelete = async (carousel: Carousel) => {
    await deleteImageCarousel(carousel.id)
    await queryClient.invalidateQueries({ queryKey })
    setSelectedCarousel(null)
  }

  const columns = getCarouselColumns(handleEdit, handleDeletePrompt)

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

      <div className="container mx-auto">
        {isLoading ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Loading carousels...
          </p>
        ) : isError ? (
          <div className="space-y-3 py-12 text-center">
            <p className="text-sm text-destructive">
              {getApiErrorMessage(error)}
            </p>
            <Button variant="outline" onClick={() => void refetch()}>
              Try again
            </Button>
          </div>
        ) : carousels.length === 0 ? (
          <div className="rounded-md border py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No carousels yet. Add one to get started.
            </p>
            <Button className="mt-4" onClick={handleAdd}>
              <Plus className="size-4" />
              Add New Carousel
            </Button>
          </div>
        ) : (
          <DataTable columns={columns} data={carousels} />
        )}
      </div>

      <CarouselFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) setSelectedCarousel(null)
        }}
        selectedCarousel={selectedCarousel}
        onSave={handleSave}
      />
      <CarouselDeleteDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open)
          if (!open) setSelectedCarousel(null)
        }}
        carousel={selectedCarousel}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default CarouselManagement
