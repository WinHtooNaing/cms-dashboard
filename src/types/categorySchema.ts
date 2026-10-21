import { z } from "zod"

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  image: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, {
      message: "Image is required",
    })
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ["image/jpeg", "image/png", "image/jpg"].includes(files[0].type),
      "Only JPEG, JPG and PNG images are allowed"
    ),
})
