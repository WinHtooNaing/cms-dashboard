import { Clock3, Mail, MapPin, Phone } from "lucide-react"

import type { ContactUsValues } from "@/types/contactUsSchema"

import { formatBusinessHours } from "@/util/formatBusinessHours"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Separator } from "@/components/ui/separator"

type GetInTouchViewDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  contact: ContactUsValues
}

const GetInTouchViewDialog = ({
  open,
  onOpenChange,
  contact,
}: GetInTouchViewDialogProps) => {
  const sections = [
    {
      title: contact.emailTitle,
      description: contact.emailDescription,
      value: contact.email,
      icon: Mail,
    },
    {
      title: contact.phoneTitle,
      description: contact.phoneDescription,
      value: contact.phone,
      icon: Phone,
    },
    {
      title: contact.addressTitle,
      description: contact.addressDescription,
      value: contact.address,
      icon: MapPin,
    },
    {
      title: contact.businessHoursTitle,
      description: contact.businessHoursDescription,
      value: formatBusinessHours(contact),
      icon: Clock3,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Get in Touch Details</DialogTitle>

          <DialogDescription>
            Preview the contact information displayed on your website.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {sections.map((section, index) => {
            const Icon = section.icon

            return (
              <div key={section.title}>
                <div className="flex gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="font-semibold">{section.title}</h3>

                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>

                    <p className="wrap-break text-sm font-medium">
                      {section.value}
                    </p>
                  </div>
                </div>

                {index < sections.length - 1 && <Separator className="mt-5" />}
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default GetInTouchViewDialog
