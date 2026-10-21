import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Plus, LifeBuoy, Trash2, Link as LinkIcon } from "lucide-react"

import {
  supportLinksSchema,
  type SupportLinksValues,
} from "@/types/footerSchema"

import FieldError from "./FieldError"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface FooterSupportLinksProps {
  links: SupportLinksValues["supportLinks"]
  open: boolean
  onOpenChange: (open: boolean) => void
}

const FooterSupportLinks = ({
  links,
  open,
  onOpenChange,
}: FooterSupportLinksProps) => {
  const form = useForm<SupportLinksValues>({
    resolver: zodResolver(supportLinksSchema),
    mode: "onBlur",
    defaultValues: {
      supportLinks: links,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "supportLinks",
    keyName: "fieldKey",
  })

  useEffect(() => {
    if (open) {
      form.reset({ supportLinks: links })
    }
  }, [open, links, form])

  const handleValidate = (values: SupportLinksValues) => {
    console.log("Support links validation successful:", values)
  }

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <LifeBuoy size={22} />
            </div>

            <div>
              <CardTitle>Support Links</CardTitle>

              <CardDescription>Manage customer support links.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="mt-auto">
          <Button
            type="button"
            className="w-full"
            onClick={() => onOpenChange(true)}
          >
            <LinkIcon className="mr-2 h-4 w-4" />
            Manage Support Links
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Manage Support Links</DialogTitle>

            <DialogDescription>
              Add or remove links displayed in your website footer.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(handleValidate)}
            noValidate
            className="space-y-5"
          >
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.fieldKey}
                  className="space-y-3 rounded-lg border p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">
                      Support Link {index + 1}
                    </p>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={fields.length <= 1}
                      onClick={() => remove(index)}
                      aria-label={`Delete support link ${index + 1}`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`support-name-${index}`}
                      className="text-sm font-medium"
                    >
                      Link Name
                    </label>

                    <Input
                      id={`support-name-${index}`}
                      placeholder="e.g. Help Center"
                      aria-invalid={
                        !!form.formState.errors.supportLinks?.[index]?.name
                      }
                      {...form.register(`supportLinks.${index}.name`)}
                    />

                    <FieldError
                      message={
                        form.formState.errors.supportLinks?.[index]?.name
                          ?.message
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`support-path-${index}`}
                      className="text-sm font-medium"
                    >
                      URL or Route
                    </label>

                    <Input
                      id={`support-path-${index}`}
                      placeholder="/contact or https://example.com"
                      aria-invalid={
                        !!form.formState.errors.supportLinks?.[index]?.path
                      }
                      {...form.register(`supportLinks.${index}.path`)}
                    />

                    <FieldError
                      message={
                        form.formState.errors.supportLinks?.[index]?.path
                          ?.message
                      }
                    />
                  </div>
                </div>
              ))}

              <FieldError
                message={
                  form.formState.errors.supportLinks?.root?.message ??
                  form.formState.errors.supportLinks?.message
                }
              />

              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={fields.length >= 10}
                onClick={() =>
                  append({
                    id: Date.now(),
                    name: "",
                    path: "",
                  })
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Support Link
              </Button>

              <p className="text-xs text-muted-foreground">
                You can add up to 5 support links.
              </p>
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

export default FooterSupportLinks
