import { z } from "zod"

export const brandSchema = z.object({
  name: z
    .string()
    .min(2, "Brand name must be at least 2 characters.")
    .max(50, "Brand name must not exceed 50 characters."),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters.")
    .max(50, "Slug must not exceed 50 characters.")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters.")
    .max(500, "Description must not exceed 500 characters."),
})

export type BrandFormData = z.infer<typeof brandSchema>