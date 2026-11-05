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
  SocialLinksValues,
} from "@/schemas/footerSchema"

export type FooterDialogType = "description" | "support" | "contact" | "social"

type FooterContentTableProps = {
  description: FooterDescriptionValues["description"]
  supportLinks: SupportLinksValues["supportLinks"]
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
  socialLinks,
  onOpenDialog,
  onView,
}: FooterContentTableProps) => {
  return (
    <Tabs defaultValue="description" className="w-full space-y-4 pb-2">
      <TabsList className="align-center grid h-auto w-full grid-cols-3 place-content-center items-center gap-1 p-1">
        <TabsTrigger
          value="description"
          className="min-w-0 px-2 py-2 text-xs sm:text-sm"
        >
          Description
        </TabsTrigger>

        <TabsTrigger
          value="supportlinks"
          className="min-w-0 px-2 py-2 text-xs sm:text-sm"
        >
          Support Links
        </TabsTrigger>

        <TabsTrigger
          value="socialMediaLinks"
          className="min-w-0 px-2 py-2 text-xs sm:text-sm"
        >
          Social Media
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description">
        <Card className="overflow-hidden border-border shadow-sm">
          <div className="border-b p-3 sm:p-4">
            <h2 className="font-semibold">Footer Description</h2>

            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Manage the description displayed in your website footer.
            </p>
          </div>

          <CardContent className="p-0">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="w-32 sm:w-40">Field</TableHead>

                    <TableHead>Content</TableHead>

                    <TableHead className="w-24 text-right sm:w-28">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow>
                    <TableCell className="align-top font-medium">
                      Description
                    </TableCell>

                    <TableCell className="min-w-0">
                      <p className="wrap-break max-w-3xl text-xs leading-6 whitespace-pre-wrap sm:text-sm sm:leading-7">
                        {description.slice(0, 89)}
                        {description.length > 89 ? "..." : ""}
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
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="supportlinks">
        <Card className="overflow-hidden border-border shadow-sm">
          <div className="border-b p-3 sm:p-4">
            <h2 className="font-semibold">Footer Support Links</h2>

            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Manage help and support links displayed in your footer.
            </p>
          </div>

          <CardContent className="p-0">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="w-16 sm:w-20">No.</TableHead>

                    <TableHead className="min-w-32 sm:min-w-40">
                      Link Name
                    </TableHead>

                    <TableHead className="min-w-32">Path</TableHead>

                    <TableHead className="w-24 text-right sm:w-32">
                      Actions
                    </TableHead>
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
                        <span className="text-xs break-all text-muted-foreground sm:text-sm">
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
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="socialMediaLinks">
        <Card className="overflow-hidden border-border shadow-sm">
          <div className="border-b p-3 sm:p-4">
            <h2 className="font-semibold">Footer Social Media Links</h2>

            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Manage your website's social media profiles.
            </p>
          </div>

          <CardContent className="p-0">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="w-16 sm:w-20">No.</TableHead>

                    <TableHead className="min-w-32 sm:min-w-40">
                      Platform
                    </TableHead>

                    <TableHead className="min-w-40">URL</TableHead>

                    <TableHead className="w-24 text-right sm:w-32">
                      Actions
                    </TableHead>
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
                        <span className="text-xs break-all text-muted-foreground sm:text-sm">
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
            </div>
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
    <div className="flex justify-end gap-0.5 sm:gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 sm:size-9"
        title="View content"
        aria-label="View content"
        onClick={onView}
      >
        <Eye className="size-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 sm:size-9"
        title="Edit content"
        aria-label="Edit content"
        onClick={onEdit}
      >
        <Pencil className="size-4" />
      </Button>
    </div>
  )
}

export default FooterContentTable
