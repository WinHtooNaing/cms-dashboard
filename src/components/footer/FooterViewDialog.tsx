import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import type {
  FooterDescriptionValues,
  SupportLinksValues,
  FooterContactValues,
  SocialLinksValues,
} from "@/types/footerSchema"

type FooterViewType = "description" | "support" | "contact" | "social"

type FooterViewDialogProps = {
  type: FooterViewType
  open: boolean
  onOpenChange: (open: boolean) => void

  description: FooterDescriptionValues["description"]
  supportLinks: SupportLinksValues["supportLinks"]
  contact: FooterContactValues
  socialLinks: SocialLinksValues["socialLinks"]
}

const FooterViewDialog = ({
  type,
  open,
  onOpenChange,
  description,
  supportLinks,
  contact,
  socialLinks,
}: FooterViewDialogProps) => {
  const titles: Record<FooterViewType, string> = {
    description: "Footer Description",
    support: "Support Links",
    contact: "Contact Information",
    social: "Social Media Links",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{titles[type]}</DialogTitle>

          <DialogDescription>Existing footer content.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {type === "description" && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Description</h3>

              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="wrap-break text-sm leading-7 whitespace-pre-wrap">
                  {description || "No description available."}
                </p>
              </div>
            </div>
          )}

          {type === "support" && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">
                Support Links ({supportLinks.length})
              </h3>

              {supportLinks.length > 0 ? (
                supportLinks.map((link) => (
                  <div
                    key={link.id}
                    className="space-y-1 rounded-lg border p-3"
                  >
                    <p className="text-sm font-medium">{link.name}</p>

                    <p className="text-sm break-all text-muted-foreground">
                      {link.path}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No support links available.
                </p>
              )}
            </div>
          )}

          {type === "contact" && (
            <div className="space-y-3">
              <ReadOnlyField label="Email Address" value={contact.email} />

              <ReadOnlyField label="Phone Number" value={contact.phone} />

              <ReadOnlyField label="Address" value={contact.address} />
            </div>
          )}

          {type === "social" && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">
                Social Media Profiles ({socialLinks.length})
              </h3>

              {socialLinks.length > 0 ? (
                socialLinks.map((link) => (
                  <div
                    key={link.id}
                    className="space-y-1 rounded-lg border p-3"
                  >
                    <p className="text-sm font-medium">{link.name}</p>

                    <p className="text-sm break-all text-muted-foreground">
                      {link.url}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No social media links available.
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

type ReadOnlyFieldProps = {
  label: string
  value: string
}

const ReadOnlyField = ({ label, value }: ReadOnlyFieldProps) => {
  return (
    <div className="space-y-1.5">
      <p className="text-sm font-medium">{label}</p>

      <div className="rounded-md border bg-muted/30 px-3 py-2.5">
        <p className="wrap-break text-sm text-muted-foreground">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  )
}

export default FooterViewDialog
