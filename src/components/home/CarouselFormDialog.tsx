import { useEffect, useState } from "react"

import { Controller, useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { ImagePlus, Upload } from "lucide-react"

import type { Carousel, CarouselFormValues } from "@/types/carousel"

import { carouselSchema } from "@/schemas/carouselSchema"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CarouselFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedCarousel: Carousel | null
}

const emptyValues: CarouselFormValues = {
  title: "",
  description: "",
  image: null,
  imageUrl: "",
  isActive: true,
}

const CarouselFormDialog = ({
  open,
  onOpenChange,
  selectedCarousel,
}: CarouselFormDialogProps) => {
  const [preview, setPreview] = useState("")

  const isEditing = selectedCarousel !== null

  const form = useForm<CarouselFormValues>({
    resolver: zodResolver(carouselSchema),
    defaultValues: emptyValues,
    mode: "onSubmit",
  })

  const selectedImage = form.watch("image")

  const existingImage = form.watch("imageUrl")

  useEffect(() => {
    if (!open) return

    if (selectedCarousel) {
      form.reset({
        title: selectedCarousel.title,
        description: selectedCarousel.description,
        image: null,
        imageUrl: selectedCarousel.image,
        isActive: selectedCarousel.isActive,
      })
    } else {
      form.reset(emptyValues)
    }
  }, [open, selectedCarousel, form])

  useEffect(() => {
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage)

      setPreview(imageUrl)

      return () => {
        URL.revokeObjectURL(imageUrl)
      }
    }

    setPreview(existingImage)
  }, [selectedImage, existingImage])

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File | null) => void
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    onChange(file)

    event.target.value = ""
  }

  const onSubmit = async (_values: CarouselFormValues) => {
    console.log("Form submitted with values:", _values)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditing ? "Edit Carousel" : "Add New Carousel"}
          </DialogTitle>

          <DialogDescription>
            {isEditing
              ? "Update your carousel information and image."
              : "Add a new image carousel to your homepage."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="scrollbar-none space-y-6 overflow-y-auto"
        >
          <Controller
            control={form.control}
            name="image"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Carousel Image</FieldLabel>

                <div className="space-y-3">
                  {preview ? (
                    <div className="relative overflow-hidden rounded-lg border">
                      <img
                        src={preview}
                        alt="Carousel preview"
                        className="aspect-video w-full object-cover"
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="carousel-image"
                      className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 text-center transition-colors hover:bg-muted/50"
                    >
                      <div className="rounded-full bg-primary/10 p-3">
                        <ImagePlus className="size-6 text-primary" />
                      </div>

                      <div>
                        <p className="text-sm font-medium">
                          Click to upload an image
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          PNG, JPG or WEBP (Maximum 5MB)
                        </p>
                      </div>

                      <Input
                        id="carousel-image"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(event) =>
                          handleImageChange(event, field.onChange)
                        }
                      />
                    </label>
                  )}

                  {preview && (
                    <label
                      htmlFor="carousel-image-replace"
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted"
                    >
                      <Upload className="size-4" />
                      Replace Image
                      <Input
                        id="carousel-image-replace"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(event) =>
                          handleImageChange(event, field.onChange)
                        }
                      />
                    </label>
                  )}
                </div>

                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Carousel Title</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  placeholder="Enter carousel title"
                  maxLength={60}
                  aria-invalid={fieldState.invalid}
                />

                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>

                <Textarea
                  {...field}
                  id={field.name}
                  placeholder="Write a short carousel description..."
                  className="min-h-28 resize-none"
                  maxLength={250}
                  aria-invalid={fieldState.invalid}
                />

                <div className="flex justify-between">
                  <FieldError>{fieldState.error?.message}</FieldError>

                  <span className="text-xs text-muted-foreground">
                    {field.value.length}/250
                  </span>
                </div>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="isActive"
            render={({ field, fieldState }) => (
              <Field
                orientation="horizontal"
                data-invalid={fieldState.invalid}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <FieldLabel htmlFor="carousel-status">
                    Carousel Status
                  </FieldLabel>

                  <p className="text-xs text-muted-foreground">
                    Enable or disable this carousel.
                  </p>
                </div>

                <Switch
                  id="carousel-status"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                />
              </Field>
            )}
          />

          <div className="flex justify-end gap-3 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Add Carousel"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CarouselFormDialog
