import { Card, CardContent } from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { FooterViewItem } from "@/components/footer/FooterViewDialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"

import { Eye, Pencil } from "lucide-react"

import type {
  FooterDescriptionValues,
  SupportLinksValues,
  FooterContactValues,
  SocialLinksValues,
} from "@/types/footerSchema"

export type FooterDialogType = "description" | "support" | "contact" | "social"

type FooterContentTableProps = {
  description: FooterDescriptionValues["description"]
  supportLinks: SupportLinksValues["supportLinks"]
  contact: FooterContactValues
  socialLinks: SocialLinksValues["socialLinks"]
  onOpenDialog: (
    type: FooterDialogType,
    item?:
      | SupportLinksValues["supportLinks"][number]
      | SocialLinksValues["socialLinks"][number]
  ) => void
  onView: (type: FooterDialogType, item?: FooterViewItem) => void
}

const FooterContentTable = ({
  description,
  supportLinks,
  contact,
  socialLinks,
  onOpenDialog,
  onView,
}: FooterContentTableProps) => {
  return (
    <Tabs defaultValue="description" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2 gap-2 p-2 sm:h-auto sm:grid-cols-4">
        <TabsTrigger
          value="description"
          className="flex items-center gap-2 py-2"
        >
          <span>Description</span>
        </TabsTrigger>

        <TabsTrigger
          value="supportlinks"
          className="flex items-center gap-2 py-2"
        >
          <span>Support Links</span>
        </TabsTrigger>

        <TabsTrigger
          value="contactInformations"
          className="flex items-center gap-2 py-2"
        >
          <span>Contact Information</span>
        </TabsTrigger>

        <TabsTrigger
          value="socialMediaLinks"
          className="flex items-center gap-2 py-2"
        >
          <span>Social Media</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description">
        <Card className="overflow-hidden border-border shadow-sm">
          <div className="border-b p-4">
            <h2 className="font-semibold">Footer Description</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage the description displayed in your website footer.
            </p>
          </div>

          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="w-40">Field</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead className="w-28 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell className="align-top font-medium">
                    Description
                  </TableCell>

                  <TableCell>
                    <p className="wrap-break max-w-3xl text-sm leading-7 whitespace-pre-wrap">
                      {description}
                    </p>
                  </TableCell>

                  <TableCell>
                    <ActionButtons
                      onView={() => onView("description")}
                      onEdit={() => onOpenDialog("description")}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="supportlinks">
        <Card className="overflow-hidden border-border shadow-sm">
          <div className="border-b p-4">
            <h2 className="font-semibold">Footer Support Links</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage help and support links displayed in your footer.
            </p>
          </div>

          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="w-16">No.</TableHead>
                  <TableHead>Link Name</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead className="w-36 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {supportLinks.map((link, index) => (
                  <TableRow key={link.id}>
                    <TableCell className="text-muted-foreground">
                      {index + 1}
                    </TableCell>

                    <TableCell className="font-medium">{link.name}</TableCell>

                    <TableCell>
                      <span className="text-sm break-all text-muted-foreground">
                        {link.path}
                      </span>
                    </TableCell>

                    <TableCell>
                      <ActionButtons
                        onView={() => onView("support", link)}
                        onEdit={() => onOpenDialog("support", link)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="contactInformations">
        <Card className="overflow-hidden border-border shadow-sm">
          <div className="border-b p-4">
            <h2 className="font-semibold">Footer Contact Information</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage the email, phone number, and address shown in your footer.
            </p>
          </div>

          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="w-40">Field</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead className="w-28 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Email</TableCell>
                  <TableCell className="break-all">{contact.email}</TableCell>
                  <TableCell>
                    <ActionButtons
                      onView={() => onView("contact")}
                      onEdit={() => onOpenDialog("contact")}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Phone</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>
                    <ActionButtons
                      onView={() => onView("contact")}
                      onEdit={() => onOpenDialog("contact")}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Address</TableCell>
                  <TableCell>{contact.address}</TableCell>
                  <TableCell>
                    <ActionButtons
                      onView={() => onView("contact")}
                      onEdit={() => onOpenDialog("contact")}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="socialMediaLinks">
        <Card className="overflow-hidden border-border shadow-sm">
          <div className="border-b p-4">
            <h2 className="font-semibold">Footer Social Media Links</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your website's social media profiles.
            </p>
          </div>

          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="w-16">No.</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="w-36 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {socialLinks.map((link, index) => (
                  <TableRow key={link.id}>
                    <TableCell className="text-muted-foreground">
                      {index + 1}
                    </TableCell>

                    <TableCell className="font-medium">{link.name}</TableCell>

                    <TableCell>
                      <span className="text-sm break-all text-muted-foreground">
                        {link.url}
                      </span>
                    </TableCell>

                    <TableCell>
                      <ActionButtons
                        onView={() => onView("social", link)}
                        onEdit={() => onOpenDialog("social", link)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

type ActionButtonsProps = {
  onView: () => void
  onEdit: () => void
}

const ActionButtons = ({ onView, onEdit }: ActionButtonsProps) => {
  return (
    <div className="flex justify-end gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        title="View content"
        aria-label="View content"
        onClick={onView}
      >
        <Eye className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        title="Edit content"
        aria-label="Edit content"
        onClick={onEdit}
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default FooterContentTable
