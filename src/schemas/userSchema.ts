import { z } from "zod"

export const createUserSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    phone: z
      .string()
      .min(1, "Phone number is required")
      .max(20, "Phone number must not exceed 20 characters"),

    roleId: z
      .string()
      .min(1, "Please select a role"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type CreateUserFormValues = z.infer<typeof createUserSchema>