import { z } from "zod"

export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const

export const contactUsSchema = z
  .object({
    emailTitle: z.string().trim().min(1, "Email title is required."),
    emailDescription: z
      .string()
      .trim()
      .min(1, "Email description is required."),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address."),

    phoneTitle: z.string().trim().min(1, "Phone title is required."),
    phoneDescription: z
      .string()
      .trim()
      .min(1, "Phone description is required."),
    phone: z.string().trim().min(1, "Phone number is required."),

    addressTitle: z.string().trim().min(1, "Address title is required."),
    addressDescription: z
      .string()
      .trim()
      .min(1, "Address description is required."),
    address: z.string().trim().min(1, "Address is required."),

    businessHoursTitle: z
      .string()
      .trim()
      .min(1, "Business hours title is required."),
    businessHoursDescription: z
      .string()
      .trim()
      .min(1, "Business hours description is required."),

    workingDays: z
      .array(z.enum(daysOfWeek))
      .min(1, "Select at least one working day."),

    openingTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Select a valid opening time."),

    closingTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Select a valid closing time."),
  })
  .refine((values) => values.closingTime > values.openingTime, {
    message: "Closing time must be later than opening time.",
    path: ["closingTime"],
  })

export type ContactUsValues = z.infer<typeof contactUsSchema>