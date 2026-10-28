import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Link as LinkIcon, Share2 } from "lucide-react"

import { socialLinksSchema, type SocialLinksValues } from "@/types/footerSchema"

import FieldError from "../error/FieldError"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface FooterSocialLinksProps {
  selectedLink: SocialLinksValues["socialLinks"][number] | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const FooterSocialLinks = ({
  selectedLink,
  open,
  onOpenChange,
}: FooterSocialLinksProps) => {
  const form = useForm<SocialLinksValues>({
    resolver: zodResolver(socialLinksSchema),
    mode: "onBlur",
    defaultValues: {
      socialLinks: selectedLink ? [selectedLink] : [],
    },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: "socialLinks",
    keyName: "fieldKey",
  })

  useEffect(() => {
    if (open && selectedLink) {
      form.reset({
        socialLinks: [selectedLink],
      })
    }
  }, [open, selectedLink, form])
  const handleValidate = (values: SocialLinksValues) => {
    console.log("Social links validation successful:", values)
  }

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <Share2 size={22} />
            </div>

            <div>
              <CardTitle>Social Media Links</CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="mt-auto">
          <Button type="button" className="w-full">
            <LinkIcon className="mr-2 h-4 w-4" />
            View Social Links
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Manage Social Media Links</DialogTitle>

            <DialogDescription>
              Add or update your social media profile URLs.
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
                      Social Link {index + 1}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`social-name-${index}`}
                      className="text-sm font-medium"
                    >
                      Platform Name
                    </label>

                    <Input
                      id={`social-name-${index}`}
                      placeholder="e.g. Facebook"
                      aria-invalid={
                        !!form.formState.errors.socialLinks?.[index]?.name
                      }
                      {...form.register(`socialLinks.${index}.name`)}
                    />

                    <FieldError
                      message={
                        form.formState.errors.socialLinks?.[index]?.name
                          ?.message
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`social-url-${index}`}
                      className="text-sm font-medium"
                    >
                      Profile URL
                    </label>

                    <Input
                      id={`social-url-${index}`}
                      type="url"
                      placeholder="https://www.facebook.com/yourpage"
                      aria-invalid={
                        !!form.formState.errors.socialLinks?.[index]?.url
                      }
                      {...form.register(`socialLinks.${index}.url`)}
                    />

                    <FieldError
                      message={
                        form.formState.errors.socialLinks?.[index]?.url?.message
                      }
                    />
                  </div>
                </div>
              ))}

              <FieldError
                message={
                  form.formState.errors.socialLinks?.root?.message ??
                  form.formState.errors.socialLinks?.message
                }
              />
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

export default FooterSocialLinks
