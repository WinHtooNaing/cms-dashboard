import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  footerDescriptionSchema,
  type FooterDescriptionValues,
} from "@/types/footerSchema"

import FieldError from "../error/FieldError"

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Textarea } from "@/components/ui/textarea"

interface FooterDescriptionProps {
  description: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

const FooterDescription = ({
  description,
  open,
  onOpenChange,
}: FooterDescriptionProps) => {
  const form = useForm<FooterDescriptionValues>({
    resolver: zodResolver(footerDescriptionSchema),
    mode: "onBlur",
    defaultValues: {
      description,
    },
  })

  const currentDescription = form.watch("description") ?? ""

  useEffect(() => {
    if (open) {
      form.reset({ description })
    }
  }, [open, description, form])

  const handleValidate = (values: FooterDescriptionValues) => {
    console.log("Footer description validation successful:", values)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Footer Description</DialogTitle>

            <DialogDescription>
              Update the description displayed in your website footer.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(handleValidate)}
            noValidate
            className="space-y-4"
          >
            <div className="space-y-2">
              <label
                htmlFor="footer-description"
                className="text-sm font-medium"
              >
                Description
              </label>

              <Textarea
                id="footer-description"
                placeholder="Enter your footer description..."
                rows={5}
                maxLength={300}
                aria-invalid={!!form.formState.errors.description}
                {...form.register("description")}
              />

              <div className="flex items-start justify-between gap-3">
                <FieldError
                  message={form.formState.errors.description?.message}
                />

                <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                  {currentDescription.length}/300
                </span>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>

              <Button type="submit">Validate Form</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default FooterDescription
