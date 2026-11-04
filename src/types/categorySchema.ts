import * as z from "zod"

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required.")
    .min(2, "Category name must contain at least 2 characters.")
    .max(50, "Category name cannot exceed 50 characters."),

  image: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "Category image is required.")
    .refine(
      (files) =>
        ["image/jpeg", "image/png", "image/webp"].includes(
          files?.[0]?.type
        ),
      "Only JPG, PNG, and WEBP images are allowed."
    ),
})