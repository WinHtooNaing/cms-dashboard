import { FileImage, ImageIcon, LoaderCircle } from "lucide-react"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import CURRENT_LOGO from "../assets/logo/logo.png"
import DEFAULT_LOGO from "../assets/logo/choosePhoto.png"

import { headerSchema, type HeaderFormValues } from "@/types/headerSchema"
import { Input } from "@/components/ui/input"

const REQUIRED_WIDTH = 300
const REQUIRED_HEIGHT = 100

const Header = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewUrlRef = useRef<string | null>(null)

  const [previewLogo, setPreviewLogo] = useState<string | null>(null)
  const [fileName, setFileName] = useState("No file selected")

  const {
    register,
    setValue,
    reset,
    watch,
    clearErrors,
    trigger,
    formState: { errors, isValidating },
  } = useForm<HeaderFormValues>({
    resolver: zodResolver(headerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      logoFile: undefined,
    },
  })

  const selectedFile = watch("logoFile")

  const displayedPreview = previewLogo ?? DEFAULT_LOGO

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
      }
    }
  }, [])

  const handleLogoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
      previewUrlRef.current = null
    }

    clearErrors("logoFile")

    setValue("logoFile", file, {
      shouldDirty: true,
      shouldValidate: false,
    })

    setFileName(file.name)

    const imageUrl = URL.createObjectURL(file)

    previewUrlRef.current = imageUrl
    setPreviewLogo(imageUrl)

    await trigger("logoFile")
  }

  const handleCancel = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
      previewUrlRef.current = null
    }

    setPreviewLogo(null)
    setFileName("No file selected")

    reset({
      logoFile: undefined,
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const { ref: registeredRef, ...fileInputProps } = register("logoFile")

  return (
    <div className="min-h-screen space-y-8 bg-background pt-4 text-foreground sm:pt-6">
      <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Header Management
          </h1>

          <p className="text-sm text-muted-foreground">
            Preview and validate your website logo.
          </p>
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
                  Select an image and check whether it meets the logo
                  requirements.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold">Logo Preview</h3>

              <span className="rounded-md border bg-muted/50 px-2 py-1 text-xs text-muted-foreground">
                {previewLogo ? "Selected Image" : "No Image Selected"}
              </span>
            </div>

            <Input
              {...fileInputProps}
              ref={(element) => {
                registeredRef(element)
                fileInputRef.current = element
              }}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleLogoChange}
              className="hidden"
              id="logo-upload"
            />

            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isValidating}
              className="group relative flex min-h-52 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-muted/20 p-6 transition-colors hover:border-primary hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-70"
              aria-label="Choose a website logo"
            >
              <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[18px_18px] opacity-60" />

              <div className="relative z-10 flex w-full flex-col items-center gap-3">
                {isValidating ? (
                  <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
                ) : (
                  <img
                    src={displayedPreview}
                    alt="Selected website logo preview"
                    className="h-auto max-h-32 w-auto max-w-full object-contain"
                  />
                )}

                <div className="space-y-1 text-center">
                  <p className="text-sm font-semibold transition-colors group-hover:text-primary">
                    {isValidating
                      ? "Validating image..."
                      : previewLogo
                        ? "Click to change image"
                        : "Click to choose an image"}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Required dimensions: {REQUIRED_WIDTH} × {REQUIRED_HEIGHT}px
                  </p>

                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, or WebP · Maximum 5 MB
                  </p>
                </div>
              </div>
            </Button>

            {errors.logoFile && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <ImageIcon className="h-4 w-4" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-semibold text-destructive">
                    Logo validation failed
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {errors.logoFile.message}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <FileImage className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{fileName}</p>

                <p className="text-xs text-muted-foreground">
                  {selectedFile
                    ? `${(selectedFile.size / 1024).toFixed(1)} KB`
                    : "No image selected"}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-1.5 border-t pt-5">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Clear Selection
              </Button>
              <Button
                disabled={!selectedFile || !!errors.logoFile || isValidating}
                type="button"
              >
                Save Logo
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="text-lg">Current Logo</CardTitle>

            <CardDescription>
              Preview of the logo currently used by the website.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 p-5 sm:p-6">
            <h3 className="text-sm font-semibold">Current Logo Preview</h3>

            <div className="relative flex min-h-52 items-center justify-center overflow-hidden rounded-xl border bg-muted/20 p-6">
              <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[18px_18px] opacity-60" />

              <img
                src={CURRENT_LOGO}
                alt="Current website logo"
                className="relative z-10 h-auto max-h-32 w-auto max-w-full object-contain"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Header
