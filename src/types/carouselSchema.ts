import { z } from "zod"

export const carouselSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Carousel title is required.")
      .min(3, "Title must contain at least 3 characters.")
      .max(60, "Title cannot exceed 60 characters."),

    description: z
      .string()
      .trim()
      .min(1, "Description is required.")
      .min(10, "Description must contain at least 10 characters.")
      .max(250, "Description cannot exceed 250 characters."),

    image: z.custom<File>(
      (value) => typeof File !== "undefined" && value instanceof File,
      "Please upload a carousel image."
    ).nullable(),

    imageUrl: z.string(),

    isActive: z.boolean(),
  })
  .refine(
    (data) => data.image !== null || data.imageUrl.trim() !== "",
    {
      message: "Carousel image is required.",
      path: ["image"],
    }
  )
  .refine(
    (data) => {
      if (!data.image) return true

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ]

      return allowedTypes.includes(data.image.type)
    },
    {
      message: "Only JPG, PNG, and WEBP images are allowed.",
      path: ["image"],
    }
  )
  .refine(
    (data) => {
      if (!data.image) return true

      return data.image.size <= 5 * 1024 * 1024
    },
    {
      message: "Image size must be less than 5MB.",
      path: ["image"],
    }
  )

export type CarouselSchemaValues = z.infer<
  typeof carouselSchema
>