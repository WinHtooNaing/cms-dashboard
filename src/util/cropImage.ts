export interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()

    image.addEventListener("load", () => resolve(image))
    image.addEventListener("error", reject)

    image.src = url
  })

export const getCroppedImage = async (
  imageSrc: string,
  cropArea: CropArea
): Promise<File> => {
  const image = await createImage(imageSrc)

  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")

  if (!context) {
    throw new Error("Could not create image canvas.")
  }

  // Final logo dimensions
  canvas.width = 900
  canvas.height = 300

  // Preserve transparency
  context.clearRect(0, 0, canvas.width, canvas.height)

  context.drawImage(
    image,
    cropArea.x,
    cropArea.y,
    cropArea.width,
    cropArea.height,
    0,
    0,
    canvas.width,
    canvas.height
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to generate cropped image."))
          return
        }

        const file = new File([blob], "website-logo.png", {
          type: "image/png",
          lastModified: Date.now(),
        })

        resolve(file)
      },
      "image/png"
    )
  })
}