import ImageCarouselDialog from "@/components/home/ImageCarouselDialog"
export const dialogFields = [
  {
    id: "title",
    label: "Title",
    description: "Edit carousel title",
    type: "text",
  },
  {
    id: "description",
    label: "Description",
    description: "Edit carousel description",
    type: "textarea",
  },
  {
    id: "buttonTitle",
    label: "Button Title",
    description: "Edit carousel button title",
    type: "text",
  },
  {
    id: "image",
    label: "Image",
    description: "Upload carousel image",
    type: "file",
  },
  {
    id: "bgImage",
    label: "Background Image",
    description: "Upload background image",
    type: "file",
  },
]

// Reusable Dialog Form Component for individual fields

export default function ImageCarousel() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 pt-4 sm:pt-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Image Carousel
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your image carousel
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        {dialogFields.map((field) => (
          <ImageCarouselDialog key={field.id} field={field} />
        ))}
      </div>
    </div>
  )
}
