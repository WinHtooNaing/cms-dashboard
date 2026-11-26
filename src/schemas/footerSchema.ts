import { z } from "zod"

const footerUrlSchema = z
  .string()
  .trim()
  .min(1, "URL is required.")
  .refine(
    (value) => {

      if (value.startsWith("/") && !value.startsWith("//")) {
        return true
      }

   
      try {
        const url = new URL(value)

        return (
          (url.protocol === "http:" || url.protocol === "https:") &&
          Boolean(url.hostname)
        )
      } catch {
        return false
      }
    },
    {
      message:
        "Enter a valid URL, such as /contact or https://example.com.",
    },
  )




export const footerDescriptionSchema = z.object({
  description: z
    .string()
    .trim()
    .min(20, "Description must contain at least 20 characters.")
    .max(300, "Description cannot exceed 300 characters."),
})

export type FooterDescriptionValues = z.infer<
  typeof footerDescriptionSchema
>;




export const supportLinkSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .trim()
    .min(2, "Link name must contain at least 2 characters.")
    .max(40, "Link name cannot exceed 40 characters."),
  path: footerUrlSchema,
})

export const supportLinksSchema = z.object({
  supportLinks: z
    .array(supportLinkSchema)
    .min(1, "Add at least one support link.")
    .max(4, "You can add up to 4 support links."),
})

export type SupportLinksValues = z.infer<
  typeof supportLinksSchema
>



export const socialLinkSchema = z.object({
  id: z.number(),

  name: z
    .string()
    .trim()
    .min(2, "Platform name must contain at least 2 characters.")
    .max(30, "Platform name cannot exceed 30 characters."),

  url: z
    .string()
    .trim()
    .min(1, "Profile URL is required.")
    .url("Please enter a valid profile URL.")
    .refine(
      (value) => {
        try {
          const url = new URL(value)

          return (
            (url.protocol === "http:" || url.protocol === "https:") &&
            Boolean(url.hostname)
          )
        } catch {
          return false
        }
      },
      {
        message: "Profile URL must start with http:// or https://.",
      },
    ),
})

export const socialLinksSchema = z.object({
  socialLinks: z
    .array(socialLinkSchema)
    .max(3, "Only three link can be accepted"),
})

export type SocialLinksValues = z.infer<
  typeof socialLinksSchema
>
