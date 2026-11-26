import { z } from "zod"
export const introductionSchema = z.object({
  badge: z
    .string()
    .trim()
    .min(2, "Badge text must contain at least 2 characters.")
    .max(40, "Badge text cannot exceed 40 characters."),

  heading: z
    .string()
    .trim()
    .min(5, "Heading must contain at least 5 characters.")
    .max(80, "Heading cannot exceed 80 characters."),

  highlightedHeading: z
    .string()
    .trim()
    .min(3, "Highlighted heading is required.")
    .max(60, "Highlighted heading cannot exceed 60 characters."),

  description: z
    .string()
    .trim()
    .min(30, "Description must contain at least 30 characters.")
    .max(300, "Description cannot exceed 300 characters."),
})
export const featureContentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must contain at least 3 characters.")
    .max(80, "Title cannot exceed 80 characters."),

})

export type featureContentFormValues = z.infer<
  typeof featureContentSchema
>

export const aboutContentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must contain at least 3 characters.")
    .max(80, "Title cannot exceed 80 characters."),

  description: z
    .string()
    .trim()
    .min(10, "Description must contain at least 10 characters.")
    .max(500, "Description cannot exceed 500 characters."),
})

export type AboutContentFormValues = z.infer<
  typeof aboutContentSchema
>
export const whoWeAreSchema = z.object({
  badge: z
    .string()
    .trim()
    .min(3, "Badge must contain at least 3 characters.")
    .max(50, "Badge cannot exceed 50 characters."),

  heading: z
    .string()
    .trim()
    .min(3, "Heading must contain at least 3 characters.")
    .max(100, "Heading cannot exceed 100 characters."),

  highlightedHeading: z
    .string()
    .trim()
    .min(3, "Highlighted heading must contain at least 3 characters.")
    .max(100, "Highlighted heading cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .min(10, "Description must contain at least 10 characters.")
    .max(500, "Description cannot exceed 500 characters."),

  secondaryDescription: z
    .string()
    .trim()
    .min(10, "Secondary description must contain at least 10 characters.")
    .max(500, "Secondary description cannot exceed 500 characters."),
})

export type WhoWeAreFormValues = z.infer<typeof whoWeAreSchema>
export type IntroductionFormValues = z.infer<
  typeof introductionSchema
>
