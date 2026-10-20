import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { CirclePlus, ImagePlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { dialogFields } from "@/pages/home/ImageCarousel"

export default function ImageCarouselDialog({
  field,
}: {
  field: (typeof dialogFields)[number]
}) {
  const schema = z.object({
    [field.id]:
      field.type === "file"
        ? z
            .custom<FileList>()
            .optional()
            .refine(
              (files) =>
                !files ||
                files.length === 0 ||
                ["image/jpeg", "image/png", "image/jpg"].includes(
                  files[0].type
                ),
              "Only JPEG, JPG and PNG images are allowed"
            )
        : z
            .string()
            .min(1, `${field.label} cannot be empty.`)
            .min(5, `${field.label} must be at least 5 characters`)
            .max(50, `${field.label} cannot exceed 50 characters`),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Submitted Data:", data)
  }

  const renderInput = () => {
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            id={field.id}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            rows={4}
            {...register(field.id)}
          />
        )
      case "file":
        return (
          <Input
            id={field.id}
            type="file"
            accept="image/*"
            {...register(field.id)}
          />
        )
      case "text":
      default:
        return (
          <Input
            id={field.id}
            type="text"
            placeholder={`Enter ${field.label.toLowerCase()}`}
            {...register(field.id)}
          />
        )
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Card className="cursor-pointer transition-colors hover:border-primary">
            <CardContent className="flex flex-col items-center gap-2 py-6">
              {field.type === "file" ? (
                <ImagePlus size={24} />
              ) : (
                <CirclePlus size={24} />
              )}
              <CardDescription className="text-center">
                Edit {field.label}
              </CardDescription>
            </CardContent>
          </Card>
        }
      />

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Edit {field.label}</DialogTitle>
            <DialogDescription>{field.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            {renderInput()}
            {/* Display Validation Error */}
            {errors[field.id] && (
              <p className="text-sm text-destructive">
                {errors[field.id]?.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
