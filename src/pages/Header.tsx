import {
  CheckCircle2,
  FileImage,
  ImageIcon,
  RotateCcw,
  Save,
  Upload,
} from "lucide-react"
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import CURRENT_LOGO from "../assets/logo/logo.png"
import DEFAULT_LOGO from "../assets/logo/choosePhoto.png"
const Header = () => {
  const REQUIRED_WIDTH = 300
  const REQUIRED_HEIGHT = 100
  const validateImageDimensions = (
    file: File
  ): Promise<{ valid: boolean; message: string }> => {
    return new Promise((resolve) => {
      const image = new Image()
      const imageURL = URL.createObjectURL(file)
      image.onload = () => {
        const { width, height } = image

        URL.revokeObjectURL(imageURL)
        if (width !== REQUIRED_WIDTH || height !== REQUIRED_HEIGHT) {
          resolve({
            valid: false,
            message: `Invalid image dimensions: ${width} × ${height}px. Please upload an image that is exactly ${REQUIRED_WIDTH} × ${REQUIRED_HEIGHT}px.`,
          })
          return
        }
        resolve({
          valid: true,
          message: "Image dimensions are valid.",
        })
      }
      image.onerror = () => {
        URL.revokeObjectURL(imageURL)
        resolve({
          valid: false,
          message:
            "Unable to read this image. Please select a valid image file.",
        })
      }
      image.src = imageURL
    })
  }
  const [logo, setLogo] = useState(DEFAULT_LOGO)
  const [previewLogo, setPreviewLogo] = useState(DEFAULT_LOGO)
  const [fileName, setFileName] = useState("logo.png")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleCancel = () => {
    setPreviewLogo(logo)
    setFileName(logo.split("/").pop() || DEFAULT_LOGO)
    setSaved(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }
  const handleSave = () => {
    setLogo(previewLogo)
    setSaved(true)

    alert("Logo updated successfully!")
  }
  const [saved, setSaved] = useState(false)
  const handleLogoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.")
      return
    }
    const result = await validateImageDimensions(file)
    if (!result.valid) {
      alert(result.message)
      event.target.value = ""
      return
    }
    const imageUrl = URL.createObjectURL(file)

    setPreviewLogo(imageUrl)
    setFileName(file.name)
    setSaved(false)
  }
  return (
    <div className="min-h-screen space-y-8 bg-background text-foreground">
      <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-primary">Header</p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-2xl">
            Header Management
          </h1>
        </div>
        <div className="flex w-fit items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-muted-foreground">Logo Settings</span>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border bg-primary/10 text-primary">
                <ImageIcon className="h-5 w-5" />
              </div>

              <div className="space-y-1">
                <CardTitle className="text-xl">Website Logo</CardTitle>

                <CardDescription>
                  Upload and manage the logo displayed on your website.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-5 sm:p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Logo Preview</h3>

                <span className="rounded-md border bg-muted/50 px-2 py-1 text-xs text-muted-foreground">
                  Live Preview
                </span>
              </div>

              <div className="relative flex min-h-52 items-center justify-center overflow-hidden rounded-xl border bg-muted/20 p-8">
                <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[18px_18px] opacity-60" />

                {previewLogo ? (
                  <img
                    src={previewLogo}
                    alt="Website logo preview"
                    className="relative z-10 max-h-32 max-w-full object-contain"
                  />
                ) : (
                  <div className="relative z-10 flex flex-col items-center gap-3 text-muted-foreground">
                    <ImageIcon className="h-12 w-12" />
                    <p className="text-sm">No logo selected</p>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Upload New Logo</h3>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  id="logo-upload"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="group flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed bg-muted/20 p-8 text-center transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-card text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Upload className="h-5 w-5" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-semibold">
                      Click to upload your logo
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Required dimensions: {REQUIRED_WIDTH} × {REQUIRED_HEIGHT}
                      px
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Accepted formats: PNG, JPG, WebP
                    </p>
                  </div>
                </button>

                <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <FileImage className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{fileName}</p>

                    <p className="text-xs text-muted-foreground">
                      Selected logo image
                    </p>
                  </div>
                  {saved && (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  )}
                </div>
              </div>
              <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
                <Button variant="outline" onClick={handleCancel}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Cancel
                </Button>

                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={previewLogo === logo}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Logo</CardTitle>

            <CardDescription>
              Overview of your website current logo
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="relative flex min-h-52 items-center justify-center overflow-hidden rounded-xl border bg-muted/20 p-8">
              <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[18px_18px] opacity-60" />

              {previewLogo ? (
                <img
                  src={CURRENT_LOGO}
                  alt="Current Website logo preview"
                  className="relative z-10 max-h-32 max-w-full object-contain"
                />
              ) : (
                <div className="relative z-10 flex flex-col items-center gap-3 text-muted-foreground">
                  <ImageIcon className="h-12 w-12" />
                  <p className="text-sm">No logo selected</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Header
