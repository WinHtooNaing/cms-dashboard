import { useState } from "react"

import FooterDescription from "@/components/footer/FooterDescription"
import FooterSocialLinks from "@/components/footer/FooterSocialLinks"
import FooterContact from "@/components/footer/FooterContact"
import FooterSupportLinks from "@/components/footer/FooterSupportLinks"
import FooterContentTable from "@/components/footer/FooterContentTable"
import FooterViewDialog, {
  type FooterViewItem,
} from "@/components/footer/FooterViewDialog"
import type { FooterDialogType } from "@/components/footer/FooterContentTable"
import { FileText, LifeBuoy, Mail, Share2 } from "lucide-react"
import type {
  FooterDescriptionValues,
  SupportLinksValues,
  FooterContactValues,
  SocialLinksValues,
} from "@/types/footerSchema"
import FooterSectionCard from "@/components/footer/FooterSectionCard"

const FooterManagement = () => {
  const [activeDialog, setActiveDialog] = useState<FooterDialogType | null>(
    null
  )
  const [selectedViewItem, setSelectedViewItem] =
    useState<FooterViewItem | null>(null)
  const [selectedSupportLink, setSelectedSupportLink] = useState<
    SupportLinksValues["supportLinks"][number] | null
  >(null)
  const [selectedSocialLink, setSelectedSocialLink] = useState<
    SocialLinksValues["socialLinks"][number] | null
  >(null)
  //const [selectedContact, setSelectedContact] = useState(null)
  const [viewDialog, setViewDialog] = useState<FooterDialogType | null>(null)
  const [description] = useState<FooterDescriptionValues["description"]>(
    "Discover quality electronics, explore the latest products, and find the right technology for your needs."
  )

  const [supportLinks] = useState<SupportLinksValues["supportLinks"]>([
    { id: 1, name: "Help Center", path: "/contact" },
    { id: 2, name: "FAQs", path: "/contact" },
    { id: 3, name: "Shipping Information", path: "/contact" },
    { id: 4, name: "Returns & Refunds", path: "/contact" },
  ])

  const [contact] = useState<FooterContactValues>({
    email: "support@techhaven.com",
    phone: "+95 9 123 456 789",
    address: "Yangon, Myanmar",
  })

  const [socialLinks] = useState<SocialLinksValues["socialLinks"]>([
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

  const openDialog = (
    type: FooterDialogType,
    item?:
      | SupportLinksValues["supportLinks"][number]
      | SocialLinksValues["socialLinks"][number]
  ) => {
    setViewDialog(null)

    if (type === "support" && item && "path" in item) {
      setSelectedSupportLink(item)
    }

    if (type === "social" && item && "url" in item) {
      setSelectedSocialLink(item)
    }

    setActiveDialog(type)
  }
  const openViewDialog = (type: FooterDialogType, item?: FooterViewItem) => {
    setActiveDialog(null)
    setSelectedViewItem(item ?? null)
    setViewDialog(type)
  }

  return (
    <div className="space-y-8 pt-4 sm:pt-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Footer Management</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your website footer description, support links, contact
          information, and social media.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <FooterViewDialog
          type={viewDialog ?? "description"}
          open={viewDialog !== null}
          onOpenChange={(open) => {
            if (!open) {
              setViewDialog(null)
              setSelectedViewItem(null)
            }
          }}
          description={description}
          supportLinks={supportLinks}
          contact={contact}
          socialLinks={socialLinks}
          selectedItem={selectedViewItem}
        />

        <FooterSectionCard
          title="Footer Description"
          icon={FileText}
          onView={() => openViewDialog("description")}
        />

        <FooterSectionCard
          title="Support Links"
          icon={LifeBuoy}
          onView={() => openViewDialog("support")}
        />

        <FooterSectionCard
          title="Contact Information"
          icon={Mail}
          onView={() => openViewDialog("contact")}
        />

        <FooterSectionCard
          title="Social Media Links"
          icon={Share2}
          onView={() => openViewDialog("social")}
        />

        <FooterDescription
          description={description}
          open={activeDialog === "description"}
          onOpenChange={(open) => setActiveDialog(open ? "description" : null)}
        />

        <FooterSupportLinks
          selectedLink={selectedSupportLink}
          open={activeDialog === "support"}
          onOpenChange={(open) => setActiveDialog(open ? "support" : null)}
        />

        <FooterContact
          contact={contact}
          open={activeDialog === "contact"}
          onOpenChange={(open) => setActiveDialog(open ? "contact" : null)}
        />

        <FooterSocialLinks
          selectedLink={selectedSocialLink}
          open={activeDialog === "social"}
          onOpenChange={(open) => setActiveDialog(open ? "social" : null)}
        />
      </div>

      <FooterContentTable
        description={description}
        supportLinks={supportLinks}
        contact={contact}
        socialLinks={socialLinks}
        onOpenDialog={openDialog}
        onView={openViewDialog}
      />
    </div>
  )
}

export default FooterManagement
