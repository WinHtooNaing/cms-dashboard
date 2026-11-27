import { useCallback, useState } from "react"

import Cropper, { type Area } from "react-easy-crop"

import { ZoomIn, ZoomOut, RotateCcw, ImageIcon } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { getCroppedImage } from "@/util/cropImage"

interface LogoCropDialogProps {
  open: boolean
  imageSrc: string | null
  onOpenChange: (open: boolean) => void
  onApplyCrop: (file: File) => void
}

const LogoCropDialog = ({
  open,
  imageSrc,
  onOpenChange,
  onApplyCrop,
}: LogoCropDialogProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  const onCropComplete = useCallback((_: Area, croppedArea: Area) => {
    setCroppedAreaPixels(croppedArea)
  }, [])

  const handleReset = () => {
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setError("")
  }

  const handleApply = async () => {
    if (!imageSrc || !croppedAreaPixels) return

    try {
      setIsProcessing(true)
      setError("")

      const croppedFile = await getCroppedImage(imageSrc, croppedAreaPixels)

      onApplyCrop(croppedFile)

      onOpenChange(false)
    } catch (error) {
      console.error("Image cropping failed:", error)

      setError("Unable to crop this image. Please try another image.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-6">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ImageIcon className="h-5 w-5" />
            </div>

            <div>
              <DialogTitle>Crop Website Logo</DialogTitle>

              <DialogDescription className="mt-1">
                Adjust your image to fit the website logo dimensions.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Crop Area */}
        <div className="space-y-3">
          <div className="relative h-75 w-full overflow-hidden rounded-lg border bg-muted">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={3}
                minZoom={1}
                maxZoom={3}
                zoomSpeed={0.5}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                restrictPosition
                showGrid
              />
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Drag the image to adjust its position.</span>

            <span>Aspect ratio: 3:1</span>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Zoom Image</label>

            <span className="text-sm text-muted-foreground">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ZoomOut className="h-4 w-4 shrink-0 text-muted-foreground" />

            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(event) => setZoom(Number(event.target.value))}
              className="h-2 w-full cursor-pointer accent-primary"
              aria-label="Zoom image"
            />

            <ZoomIn className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              disabled={isProcessing}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Crop
            </Button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        {/* Dialog Footer */}
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleApply}
            disabled={!croppedAreaPixels || isProcessing}
          >
            {isProcessing ? "Processing..." : "Apply Crop"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LogoCropDialog
