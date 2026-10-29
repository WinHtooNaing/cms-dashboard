import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  supportLinksSchema,
  type SupportLinksValues,
} from "@/types/footerSchema"

import FieldError from "../error/FieldError"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface FooterSupportLinksProps {
  selectedLink: SupportLinksValues["supportLinks"][number] | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const FooterSupportLinks = ({
  selectedLink,
  open,
  onOpenChange,
}: FooterSupportLinksProps) => {
  const form = useForm<SupportLinksValues>({
    resolver: zodResolver(supportLinksSchema),
    mode: "onBlur",
    defaultValues: {
      supportLinks: selectedLink ? [selectedLink] : [],
    },
  })

  useEffect(() => {
    if (open && selectedLink) {
      form.reset({
        supportLinks: [selectedLink],
      })
    }
  }, [open, selectedLink, form])

  const handleValidate = (values: SupportLinksValues) => {
    console.log("Support link validation successful:", values)
  }

  const errors = form.formState.errors.supportLinks?.[0]

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              Edit {selectedLink?.name || "Support Link"}
            </DialogTitle>

            <DialogDescription>
              Update the selected support link's name
            </DialogDescription>
          </DialogHeader>

          {selectedLink && (
            <form
              onSubmit={form.handleSubmit(handleValidate)}
              noValidate
              className="space-y-5"
            >
              <div className="space-y-4 rounded-lg border p-4">
                <div className="space-y-2">
                  <label htmlFor="support-name" className="text-sm font-medium">
                    Link Name
                  </label>

                  <Input
                    id="support-name"
                    placeholder="e.g. Help Center"
                    aria-invalid={!!errors?.name}
                    {...form.register("supportLinks.0.name")}
                  />

                  <FieldError message={errors?.name?.message} />
                </div>
              </div>

              <FieldError
                message={
                  form.formState.errors.supportLinks?.root?.message ??
                  form.formState.errors.supportLinks?.message
                }
              />

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
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default FooterSupportLinks
