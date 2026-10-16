import { z } from "zod"
export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .trim()
    .min(1, "password is required")
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password must be at most 32 characters" }),
})
