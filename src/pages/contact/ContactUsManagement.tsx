import { useState } from "react"

import { Clock3, Mail, MapPin, Pencil, Phone } from "lucide-react"

import { formatBusinessHours } from "@/util/formatBusinessHours"
import { type ContactUsValues } from "@/schemas/contactUsSchema"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import GetInTouchFormDialog from "@/components/contactUs/GetInTouchFormDialog"

const initialContact: ContactUsValues = {
  emailTitle: "Email Us",
  emailDescription: "Send us an email anytime.",
  email: "support@techhaven.com",

  phoneTitle: "Call Us",
  phoneDescription: "Our team is ready to help.",
  phone: "+95 9 123 456 789",

  addressTitle: "Visit Us",
  addressDescription: "Come and visit our store.",
  address: "Yangon, Myanmar",

  businessHoursTitle: "Business Hours",
  businessHoursDescription: "We're available during:",

  workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],

  openingTime: "08:30",
  closingTime: "17:00",
}

const ContactUsManagement = () => {
  const [contact, setContact] = useState<ContactUsValues>(initialContact)

  const [editOpen, setEditOpen] = useState(false)

  const cards = [
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
    <div className="space-y-8 pt-4 sm:pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Contact Us Management
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage the Get in Touch section displayed on your Contact Us page.
          </p>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-semibold">Get in Touch</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your email, phone, address, and business hours.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setEditOpen(true)}>
              <Pencil className="mr-2 size-4" />
              Edit
            </Button>
          </div>
        </div>

        <CardContent className="p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card) => {
              const Icon = card.icon

              return (
                <div
                  key={card.title}
                  className="flex min-w-0 gap-4 rounded-xl border bg-card p-4 transition-colors hover:bg-muted/30 sm:p-5"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <h3 className="font-semibold">{card.title}</h3>

                    <p className="text-sm text-muted-foreground">
                      {card.description}
                    </p>

                    <p className="wrap-break text-sm font-medium">
                      {card.value}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <GetInTouchFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        contact={contact}
      />
    </div>
  )
}

export default ContactUsManagement
