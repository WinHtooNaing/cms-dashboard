import { z } from "zod"

const imageSchema = z
  .custom<FileList>()
  .refine(
    (files) => files?.length > 0,
    "Category image is required."
  )
  .refine(
    (files) => files?.[0]?.size <= 5 * 1024 * 1024,
    "Image must be less than 5MB."
  )
  .refine(
    (files) =>
      ["image/jpeg", "image/png", "image/webp"].includes(files?.[0]?.type),
    "Only JPG, PNG, and WEBP images are allowed."
  )

const optionalImageSchema = z
  .custom<FileList>()
  .optional()
  .refine(
    (files) => !files?.[0] || files[0].size <= 5 * 1024 * 1024,
    "Image must be less than 5MB."
  )
  .refine(
    (files) =>
      !files?.[0] ||
      ["image/jpeg", "image/png", "image/webp"].includes(files[0].type),
    "Only JPG, PNG, and WEBP images are allowed."
  )

const baseCategorySchema = {
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters.")
    .max(50, "Category name must not exceed 50 characters."),
}

export const createCategorySchema = z.object({
  ...baseCategorySchema,
  image: imageSchema,
})

export const updateCategorySchema = z.object({
  ...baseCategorySchema,
  image: optionalImageSchema,
})


export const categorySchema = createCategorySchema