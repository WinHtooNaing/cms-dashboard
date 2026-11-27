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
import { Input } from "@/components/ui/input"

import DEFAULT_LOGO from "../assets/logo/choosePhoto.png"

import { headerSchema, type HeaderFormValues } from "@/schemas/headerSchema"

import { useHeaderLogo } from "@/hooks/cms/useHeaderLogo"
import { useUpdateHeaderLogo } from "@/hooks/cms/useUpdateHeaderLogo"
import LogoCropDialog from "@/components/navbar/LogoCropDialog"

const REQUIRED_WIDTH = 900
const REQUIRED_HEIGHT = 300

const Header = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const previewUrlRef = useRef<string | null>(null)
  const cropSourceUrlRef = useRef<string | null>(null)

  const [previewLogo, setPreviewLogo] = useState<string | null>(null)

  const [cropSource, setCropSource] = useState<string | null>(null)
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false)

  const [fileName, setFileName] = useState("No file selected")

  const {
    data: headerSection,
    isLoading,
    isError,
    error,
    refetch,
  } = useHeaderLogo()

  const updateLogoMutation = useUpdateHeaderLogo()

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

  const isUploading = updateLogoMutation.isPending

  const displayedPreview = previewLogo ?? DEFAULT_LOGO

  const currentLogo = headerSection?.imageUrl ?? DEFAULT_LOGO

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
      }

      if (cropSourceUrlRef.current) {
        URL.revokeObjectURL(cropSourceUrlRef.current)
      }
    }
  }, [])

  // Clear selected preview
  const clearPreview = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
      previewUrlRef.current = null
    }

    setPreviewLogo(null)
  }

  // Clear crop source
  const clearCropSource = () => {
    if (cropSourceUrlRef.current) {
      URL.revokeObjectURL(cropSourceUrlRef.current)
      cropSourceUrlRef.current = null
    }

    setCropSource(null)
  }

  // Select Original Image
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    // Basic file validation before opening crop dialog
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"]

    if (!allowedTypes.includes(file.type)) {
      clearErrors("logoFile")

      setValue("logoFile", undefined as never)

      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setValue("logoFile", undefined as never)

      return
    }

    clearCropSource()

    const imageUrl = URL.createObjectURL(file)

    cropSourceUrlRef.current = imageUrl

    setCropSource(imageUrl)

    setIsCropDialogOpen(true)
  }

  // Apply Cropped Image
  const handleApplyCrop = async (croppedFile: File) => {
    clearPreview()

    clearErrors("logoFile")

    const imageUrl = URL.createObjectURL(croppedFile)

    previewUrlRef.current = imageUrl

    setPreviewLogo(imageUrl)

    setFileName(croppedFile.name)

    setValue("logoFile", croppedFile, {
      shouldDirty: true,
      shouldValidate: false,
    })

    await trigger("logoFile")

    clearCropSource()

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Cancel Selection
  const handleCancel = () => {
    clearPreview()
    clearCropSource()

    setIsCropDialogOpen(false)

    setFileName("No file selected")

    reset({
      logoFile: undefined,
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Save Logo
  const handleSaveLogo = async () => {
    if (!selectedFile || !headerSection) return

    try {
      await updateLogoMutation.mutateAsync({
        sectionId: headerSection.id,
        logoFile: selectedFile,
      })

      handleCancel()

      // Refresh current logo from API
      await refetch()
    } catch (error) {
      console.error("Logo upload failed:", error)
    }
  }

  const { ref: registeredRef, ...fileInputProps } = register("logoFile")

  return (
    <div className="min-h-screen space-y-8 bg-background pt-4 text-foreground sm:pt-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Header Management
          </h1>

          <p className="text-sm text-muted-foreground">
            Preview and update your website logo.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-muted-foreground">Logo Settings</span>
        </div>
      </div>

      {/* Error State */}
      {isError && (
        <div className="flex flex-col gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-destructive">
            {error instanceof Error
              ? error.message
              : "Failed to load website logo."}
          </p>

          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* Logo Upload Card */}
        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border bg-primary/10 text-primary">
                <ImageIcon className="h-5 w-5" />
              </div>

              <div className="space-y-1">
                <CardTitle className="text-xl">Website Logo</CardTitle>

                <CardDescription>
                  Select an image, crop it, and preview your website logo.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-5 sm:p-6">
            {/* Preview Header */}
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold">Logo Preview</h3>

              <span className="rounded-md border bg-muted/50 px-2 py-1 text-xs text-muted-foreground">
                {previewLogo ? "Cropped Image" : "No Image Selected"}
              </span>
            </div>

            {/* Hidden File Input */}
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

            {/* Choose Image Button */}
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || isLoading}
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
                    className="h-auto max-h-32 w-auto max-w-full rounded-lg object-contain"
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

            {/* Validation Error */}
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

            {/* Selected File Information */}
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

            {/* Actions */}
            <div className="flex justify-end gap-1.5 border-t pt-5">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isUploading}
              >
                Clear Selection
              </Button>

              <Button
                type="button"
                onClick={handleSaveLogo}
                disabled={
                  !selectedFile ||
                  !!errors.logoFile ||
                  isValidating ||
                  isUploading ||
                  isLoading ||
                  isError ||
                  !headerSection
                }
              >
                {isUploading && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}

                {isUploading ? "Uploading..." : "Save Logo"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Logo Card */}
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

              {isLoading ? (
                <LoaderCircle className="relative z-10 h-8 w-8 animate-spin text-primary" />
              ) : (
                <img
                  src={currentLogo}
                  alt="Current website logo"
                  className="relative z-10 h-auto max-h-32 w-auto max-w-full object-contain"
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logo Crop Dialog */}
      <LogoCropDialog
        open={isCropDialogOpen}
        imageSrc={cropSource}
        onOpenChange={(open) => {
          setIsCropDialogOpen(open)

          if (!open) {
            clearCropSource()

            if (fileInputRef.current) {
              fileInputRef.current.value = ""
            }
          }
        }}
        onApplyCrop={handleApplyCrop}
      />
    </div>
  )
}

export default Header
