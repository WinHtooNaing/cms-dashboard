import { z } from "zod"

export const ProductSchema = z
  .object({
    name: z.string().min(1, "Product name is required"),

    sku: z.string().min(1, "SKU is required"),

    brandId: z.string().min(1, "Please select a brand"),

    category: z.string().min(1, "Please select a category"),

    price: z.number().positive("Price must be greater than 0"),

    originalPrice: z.number().positive().optional(),

    image: z.any().optional(),

    description: z.string().min(1, "Description is required"),
  })
  .refine(
    (data) =>
      data.originalPrice === undefined ||
      data.originalPrice > data.price,
    {
      message: "Original price must be greater than selling price",
      path: ["originalPrice"],
    }
  )