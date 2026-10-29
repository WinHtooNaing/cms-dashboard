import { z } from "zod"
export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "username is required")
    .min(6, { message: "Username must be at least 6 characters" })
    .max(32, { message: "Username must be at most 32 characters" })
    .optional(),
  email: z.email(),
  password: z
    .string()
    .trim()
    .min(1, "password is required")
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password must be at most 32 characters" }),
  confirm_password: z
    .string()
    .trim()
    .min(1, "password is required")
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password must be at most 32 characters" })
    .optional(),
})
