import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Mail, MapPin, Pencil, Phone } from "lucide-react"

import {
  footerContactSchema,
  type FooterContactValues,
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

interface FooterContactProps {
  contact: FooterContactValues
  open: boolean
  onOpenChange: (open: boolean) => void
}

const FooterContact = ({ contact, open, onOpenChange }: FooterContactProps) => {
  const form = useForm<FooterContactValues>({
    resolver: zodResolver(footerContactSchema),
    mode: "onBlur",
    defaultValues: contact,
  })

  useEffect(() => {
    if (open) {
      form.reset(contact)
    }
  }, [open, contact, form])

  const handleSubmit = (data: FooterContactValues) => {
    console.log("Form validation successful:", data)
  }

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <MapPin size={22} />
            </div>

            <div>
              <CardTitle>Contact Information</CardTitle>

              <CardDescription>
                Manage your business contact details.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="mt-auto">
          <Button
            type="button"
            className="w-full"
            onClick={() => onOpenChange(true)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Contact Information
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Contact Information</DialogTitle>

            <DialogDescription>
              Update the information customers use to contact you.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            noValidate
            className="space-y-4"
          >
            <div className="space-y-2">
              <label
                htmlFor="footer-email"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Mail size={16} />
                Email Address
              </label>

              <Input
                id="footer-email"
                type="email"
                placeholder="support@example.com"
                aria-invalid={!!form.formState.errors.email}
                {...form.register("email")}
              />

              <FieldError message={form.formState.errors.email?.message} />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="footer-phone"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Phone size={16} />
                Phone Number
              </label>

              <Input
                id="footer-phone"
                type="tel"
                placeholder="+95 9 123 456 789"
                aria-invalid={!!form.formState.errors.phone}
                {...form.register("phone")}
              />

              <FieldError message={form.formState.errors.phone?.message} />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="footer-address"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <MapPin size={16} />
                Address
              </label>

              <Input
                id="footer-address"
                placeholder="Yangon, Myanmar"
                aria-invalid={!!form.formState.errors.address}
                {...form.register("address")}
              />

              <FieldError message={form.formState.errors.address?.message} />
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

export default FooterContact
