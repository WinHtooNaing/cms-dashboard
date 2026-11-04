import { useEffect, useState } from "react"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import * as z from "zod"

import { ImagePlus, X } from "lucide-react"
import { toast } from "sonner"

import { categorySchema } from "@/types/categorySchema"

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import axios from "axios"

type CategoryItem = {
  id: number
  name: string
  image: string
}

type CategoryFormValues = z.infer<typeof categorySchema>

type CategoryDialogProps = {
  mode: "create" | "update"
  category?: CategoryItem
  onSave: (formData: FormData) => Promise<void>
}

export default function CategoryDialog({
  mode,
  category,
  onSave,
}: CategoryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [preview, setPreview] = useState<string | null>(category?.image ?? null)

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? "",
      image: undefined,
    },
  })

  const selectedImage = form.watch("image")

  useEffect(() => {
    if (selectedImage?.[0]) {
      const imageUrl = URL.createObjectURL(selectedImage[0])

      setPreview(imageUrl)

      return () => URL.revokeObjectURL(imageUrl)
    }
  }, [selectedImage])

  function generateSlug(name: string) {
    return name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  async function onSubmit(data: CategoryFormValues) {
    try {
      setIsSubmitting(true)

      const formData = new FormData()

      formData.append("name", data.name.trim())
      formData.append("slug", generateSlug(data.name))
      formData.append("description", "")
      formData.append("isActive", "true")

      if (data.image?.[0]) {
        formData.append("image", data.image[0])
      }

      await onSave(formData)

      toast.success(
        mode === "create"
          ? "Category created successfully!"
          : "Category updated successfully!"
      )

      form.reset()
      setPreview(null)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Backend error:", error.response?.data)

        toast.error(
          error.response?.data?.message || "Failed to create category."
        )
      } else {
        console.error(error)
        toast.error("Something went wrong.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>
          {mode === "create" ? "Create Category" : "Update Category"}
        </DialogTitle>

        <DialogDescription>
          {mode === "create"
            ? "Add a new category to your store."
            : "Update your category information."}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="py-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Category Name</FieldLabel>

                <Input
                  {...field}
                  placeholder="e.g. Gaming Accessories"
                  className={fieldState.error ? "border-red-500" : ""}
                />

                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="image"
            control={form.control}
            render={({ field: { onChange, ...field }, fieldState }) => (
              <Field>
                <FieldLabel>Category Image</FieldLabel>

                <div className="space-y-3">
                  <div className="relative flex size-28 items-center justify-center overflow-hidden rounded-lg border bg-muted">
                    {preview ? (
                      <>
                        <img
                          src={preview}
                          alt="Category preview"
                          className="size-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            setPreview(null)
                            onChange(undefined)
                          }}
                          className="absolute top-1 right-1 rounded-full bg-black/70 p-1 text-white"
                        >
                          <X className="size-3" />
                        </button>
                      </>
                    ) : (
                      <ImagePlus className="size-7 text-muted-foreground" />
                    )}
                  </div>

                  <Input
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(event) => {
                      onChange(event.target.files)
                    }}
                    className={fieldState.error ? "border-red-500" : ""}
                  />

                  <FieldDescription>
                    Upload JPG, PNG, or WEBP. Recommended image ratio: 1:1.
                  </FieldDescription>

                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </div>
              </Field>
            )}
          />
        </FieldGroup>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" type="button" />}>
            Cancel
          </DialogClose>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : mode === "create"
                ? "Create Category"
                : "Update Category"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
