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

// --------------------------------------------------
// Footer description
// --------------------------------------------------

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

// --------------------------------------------------
// Support links
// --------------------------------------------------

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
    .max(5, "You can add up to 5 support links."),
})

export type SupportLinksValues = z.infer<
  typeof supportLinksSchema
>

// --------------------------------------------------
// Contact information
// --------------------------------------------------

export const footerContactSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Please enter a valid email address.")
    .max(254, "Email address is too long."),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required.")
    .regex(
      /^\+?[0-9][0-9\s().-]*$/,
      "Enter a valid phone number.",
    )
    .refine(
      (value) => {
        const digitCount = value.replace(/\D/g, "").length

        return digitCount >= 7 && digitCount <= 15
      },
      {
        message: "Phone number must contain 7–15 digits.",
      },
    ),

  address: z
    .string()
    .trim()
    .min(3, "Address must contain at least 3 characters.")
    .max(150, "Address cannot exceed 150 characters."),
})

export type FooterContactValues = z.infer<
  typeof footerContactSchema
>


// Social media links


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
    .max(4, "You can add up to 4 social media links."),
})

export type SocialLinksValues = z.infer<
  typeof socialLinksSchema
>
