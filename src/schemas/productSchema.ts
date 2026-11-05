import * as z from "zod"

export const ProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(5, "Name must be at least 5 characters")
    .max(50, "Name cannot exceed 50 characters"),
  brand: z
    .string()
    .min(1, "Brand name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  price: z.number().min(1, "Price is required"),
  originalPrice: z.number().min(1, "Original price is required").optional(),
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
  category: z.string().min(1, "Category is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description cannot exceed 500 characters"),
  stock: z.number().min(1, "Stock is required"),
  rating: z.number().min(1, "Rating is required"),
})
