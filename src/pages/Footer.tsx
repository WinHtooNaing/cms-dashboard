import { useState } from "react"

import FooterDescription from "@/components/footer/FooterDescription"

import type {
  FooterDescriptionValues,
  SupportLinksValues,
  FooterContactValues,
  SocialLinksValues,
} from "@/types/footerSchema"
import FooterSocialLinks from "@/components/footer/FooterSocialLinks"
import FooterContact from "@/components/footer/FooterContact"
import FooterSupportLinks from "@/components/footer/FooterSupportLinks"

type ActiveDialog = "description" | "support" | "contact" | "social" | null

const FooterManagement = () => {
  const [activeDialog, setActiveDialog] = useState<ActiveDialog>(null)

  const [description, setDescription] = useState<
    FooterDescriptionValues["description"]
  >(
    "Discover quality electronics, explore the latest products, and find the right technology for your needs."
  )

  const [supportLinks, setSupportLinks] = useState<
    SupportLinksValues["supportLinks"]
  >([
    { id: 1, name: "Help Center", path: "/contact" },
    { id: 2, name: "FAQs", path: "/contact" },
    { id: 3, name: "Shipping Information", path: "/contact" },
    { id: 4, name: "Returns & Refunds", path: "/contact" },
  ])

  const [contact, setContact] = useState<FooterContactValues>({
    email: "support@techhaven.com",
    phone: "+95 9 123 456 789",
    address: "Yangon, Myanmar",
  })

  const [socialLinks, setSocialLinks] = useState<
    SocialLinksValues["socialLinks"]
  >([
    {
      id: 1,
      name: "Facebook",
      url: "https://www.facebook.com/",
    },
    {
      id: 2,
      name: "Instagram",
      url: "https://www.instagram.com/",
    },
    {
      id: 3,
      name: "GitHub",
      url: "https://github.com/",
    },
  ])

  return (
    <div className="space-y-8 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Footer Management</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your website footer description, support links, contact
          information, and social media.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <FooterDescription
          description={description}
          open={activeDialog === "description"}
          onOpenChange={(open) => setActiveDialog(open ? "description" : null)}
        />

        <FooterSupportLinks
          links={supportLinks}
          open={activeDialog === "support"}
          onOpenChange={(open) => setActiveDialog(open ? "support" : null)}
        />

        <FooterContact
          contact={contact}
          open={activeDialog === "contact"}
          onOpenChange={(open) => setActiveDialog(open ? "contact" : null)}
        />

        <FooterSocialLinks
          links={socialLinks}
          open={activeDialog === "social"}
          onOpenChange={(open) => setActiveDialog(open ? "social" : null)}
        />
      </div>
    </div>
  )
}

export default FooterManagement
