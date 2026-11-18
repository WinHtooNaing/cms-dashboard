import { useEffect, useState } from "react"

import { Controller, useForm, useWatch } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { ImagePlus, Upload } from "lucide-react"

import {
  carouselSchema,
  type CarouselSchemaValues,
} from "@/schemas/carouselSchema"
import type { Carousel } from "@/types/carousel"
import { getApiErrorMessage } from "@/lib/api-error"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  onSave: (values: CarouselFormValues) => Promise<void>
}

type CarouselFormValues = CarouselSchemaValues

const emptyValues: CarouselFormValues = {
  title: "",
  description: "",
  image: null,
  imageUrl: "",
}

const CarouselFormDialog = ({
  open,
  onOpenChange,
  selectedCarousel,
  onSave,
}: CarouselFormDialogProps) => {
  const [uploadedPreview, setUploadedPreview] = useState("")

  const isEditing = selectedCarousel !== null

  const form = useForm<CarouselFormValues>({
    resolver: zodResolver(carouselSchema),
    defaultValues: emptyValues,
    mode: "onSubmit",
  })

  const existingImage = useWatch({
    control: form.control,
    name: "imageUrl",
  })

  useEffect(() => {
    if (!open) return

    if (selectedCarousel) {
      form.reset({
        title: selectedCarousel.title,
        description: selectedCarousel.description,
        image: null,
        imageUrl: selectedCarousel.imageUrl,
      })
    } else {
      form.reset(emptyValues)
    }
  }, [open, selectedCarousel, form])

  useEffect(() => {
    if (!uploadedPreview) return
    return () => URL.revokeObjectURL(uploadedPreview)
  }, [uploadedPreview])

  const preview = uploadedPreview || existingImage

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setUploadedPreview("")
    }
    onOpenChange(nextOpen)
  }

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File | null) => void
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    setUploadedPreview(URL.createObjectURL(file))
    onChange(file)

    event.target.value = ""
  }

  const onSubmit = async (values: CarouselFormValues) => {
    try {
      await onSave(values)
      toast.success(
        isEditing
          ? "Carousel updated successfully."
          : "Carousel created successfully."
      )
      handleOpenChange(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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

          <div className="flex justify-end gap-3 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
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
