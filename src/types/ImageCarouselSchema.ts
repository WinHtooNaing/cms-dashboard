import { z } from "zod"
export const titleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(50, "Title cannot exceed 50 characters"),
})

export const descriptionSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description cannot exceed 500 characters"),
})

export const buttonTitleSchema = z.object({
  buttonTitle: z
    .string()
    .trim()
    .min(1, "Button title is required")
    .max(10, "Button title cannot exceed 50 characters"),
})

export const imageSchema = z.object({
  image: z
    .custom<FileList>()
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ["image/jpeg", "image/png"].includes(files[0].type),
      "Only JPG and PNG images are allowed"
    )
    .refine(
      (files) =>
        !files || files.length === 0 || files[0].size <= 2 * 1024 * 1024,
      "Image size must be 2 MB or less"
    ),
})
export const bgImageSchema = z.object({
  bgImage: z
    .custom<FileList>()
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ["image/jpeg", "image/png"].includes(files[0].type),
      "Only JPG and PNG images are allowed"
    )
    .refine(
      (files) =>
        !files || files.length === 0 || files[0].size <= 2 * 1024 * 1024,
      "Image size must be 2 MB or less"
    ),
})
