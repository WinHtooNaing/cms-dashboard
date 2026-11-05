import { z } from "zod"

const REQUIRED_WIDTH = 300
const REQUIRED_HEIGHT = 100
const MAX_FILE_SIZE = 5 * 1024 * 1024

const ACCEPTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webP",
]

const validateImageDimensions = (
  file: File
): Promise<{ valid: boolean; message?: string }> => {
  return new Promise((resolve) => {
    const image = new Image()
    const imageURL = URL.createObjectURL(file)

    image.onload = () => {
      const { width, height } = image

      URL.revokeObjectURL(imageURL)

      if (width !== REQUIRED_WIDTH || height !== REQUIRED_HEIGHT) {
        resolve({
          valid: false,
          message: `Your image is ${width} × ${height}px. The required dimensions are ${REQUIRED_WIDTH} × ${REQUIRED_HEIGHT}px.`,
        })
        return
      }

      resolve({ valid: true })
    }

    image.onerror = () => {
      URL.revokeObjectURL(imageURL)

      resolve({
        valid: false,
        message:
          "The selected file could not be read as an image. Please choose another file.",
      })
    }

    image.src = imageURL
  })
}

export const headerSchema = z.object({
  logoFile: z
  .custom<File>((value)=>
    typeof File !== "undefined" && value instanceof File,
  {
    message: "Please select a logo image.",
  }

  ).refine((file)=> ACCEPTED_TYPES.includes(file.type), {
      message: "Only PNG, JPG, and JPEG images are allowed.",
    })
     .refine((file) => file.size > 0, {
      message: "The selected file is empty.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "The logo image must not exceed 5 MB.",
    })
    .superRefine(async (file, ctx)=>{
      if (
        !ACCEPTED_TYPES.includes(file.type) ||
        file.size === 0 ||
        file.size > MAX_FILE_SIZE
      ) {
        return
      }
       const result = await validateImageDimensions(file)

      if (!result.valid) {
        ctx.addIssue({
          code: "custom",
          message: result.message ?? "Invalid image dimensions.",
        })
      }
    
    }),
})
export type HeaderFormValues = z.infer<typeof headerSchema>