import { useState } from "react"

import {
  FileText,
  LifeBuoy,
  Share2,
  Eye,
  Pencil,
  Trash2,
  Plus,
  GripVertical,
  Globe,
  Link as LinkIcon,
  CheckCircle2,
} from "lucide-react"
import { toast } from "sonner"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"

import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"
import {
  useFooter,
  useUpdateFooterDescription,
  useCreateFooterItem,
  useUpdateFooterItem,
  useDeleteFooterItem,
  useReorderFooterItems,
} from "@/hooks/cms/useFooter"

import { FOOTER_SECTION_KEYS } from "@/constants/cms"

import type {
  FooterSection,
  FooterSupportContent,
  FooterSocialContent,
  SocialPlatform,
} from "@/service/cms/footerService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getApiErrorMessage } from "@/lib/api-error"
import FooterManagementSkeleton from "@/components/footer/FooterManagementSkeleton"
type SupportDestinationType = "internal" | "external"
type SupportLink = {
  id: string
  position: number
  name: string
  destinationType: "internal" | "external"
  pageKey?: string
  url?: string
}

type SocialLink = {
  id: string
  position: number
  platform: SocialPlatform
  url: string
}

type DialogType = "description" | "support" | "social" | null

type ViewType = "description" | "support" | "social" | null

type DeleteType = "support" | "social" | null

const MAX_SUPPORT_LINKS = 4
const MAX_SOCIAL_LINKS = 5

const INTERNAL_PAGES = [
  { label: "Home", value: "home" },
  { label: "Products", value: "products" },
  { label: "About Us", value: "about" },
  { label: "Contact Us", value: "contact" },
] as const

const SOCIAL_PLATFORMS: {
  label: string
  value: SocialPlatform
}[] = [
  { label: "Facebook", value: "facebook" },
  { label: "Instagram", value: "instagram" },
  { label: "YouTube", value: "youtube" },
  { label: "TikTok", value: "tiktok" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "X", value: "x" },
  { label: "GitHub", value: "github" },
]

const FooterManagement = () => {
  const { data: sections = [], isLoading, isError, refetch } = useFooter()

  const updateDescriptionMutation = useUpdateFooterDescription()
  const createItemMutation = useCreateFooterItem()
  const updateItemMutation = useUpdateFooterItem()
  const deleteItemMutation = useDeleteFooterItem()
  const reorderItemsMutation = useReorderFooterItems()

  const [activeDialog, setActiveDialog] = useState<DialogType>(null)

  const [viewType, setViewType] = useState<ViewType>(null)

  const [selectedSupport, setSelectedSupport] = useState<SupportLink | null>(
    null
  )

  const [selectedSocial, setSelectedSocial] = useState<SocialLink | null>(null)

  const [deleteType, setDeleteType] = useState<DeleteType>(null)

  const [deleteId, setDeleteId] = useState<string | null>(null)

  const descriptionSection = sections.find(
    (section) => section.key === FOOTER_SECTION_KEYS.DESCRIPTION
  )

  const supportSection = sections.find(
    (section) => section.key === FOOTER_SECTION_KEYS.SUPPORT_LINKS
  )

  const socialSection = sections.find(
    (section) => section.key === FOOTER_SECTION_KEYS.SOCIAL_MEDIA
  )

  const description = String(descriptionSection?.content?.description ?? "")

  const supportLinks: SupportLink[] =
    supportSection?.items
      ?.map((item) => {
        const content = item.content as unknown as FooterSupportContent

        return {
          id: item.id,
          position: item.position,
          name: content.name,
          destinationType: content.destinationType,
          pageKey: content.pageKey,
          url: content.url,
        }
      })
      .sort((a, b) => a.position - b.position) ?? []

  const socialLinks: SocialLink[] =
    socialSection?.items
      ?.map((item) => {
        const content = item.content as unknown as FooterSocialContent

        return {
          id: item.id,
          position: item.position,
          platform: content.platform,
          url: content.url,
        }
      })
      .sort((a, b) => a.position - b.position) ?? []

  const handleDescriptionSave = (value: string) => {
    if (!descriptionSection) return

    updateDescriptionMutation.mutate(
      {
        sectionId: descriptionSection.id,
        description: value,
      },
      {
        onSuccess: () => {
          toast.success("Footer description updated successfully!")
          setActiveDialog(null)
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error))
        },
      }
    )
  }

  const handleSupportSave = (values: Omit<SupportLink, "id" | "position">) => {
    if (!supportSection) return

    const content: FooterSupportContent = {
      name: values.name,
      destinationType: values.destinationType,
      ...(values.destinationType === "internal"
        ? { pageKey: values.pageKey }
        : { url: values.url }),
    }

    if (selectedSupport) {
      updateItemMutation.mutate(
        {
          itemId: selectedSupport.id,
          content,
        },
        {
          onSuccess: () => {
            toast.success("Support link updated successfully!")
            setActiveDialog(null)
            setSelectedSupport(null)
          },
          onError: (error) => {
            toast.error(getApiErrorMessage(error))
          },
        }
      )
    } else {
      createItemMutation.mutate(
        {
          sectionId: supportSection.id,
          position: getNextPosition(supportLinks),
          content,
        },
        {
          onSuccess: () => {
            toast.success("Support link added successfully!")
            setActiveDialog(null)
            setSelectedSupport(null)
          },
          onError: (error) => {
            toast.error(getApiErrorMessage(error))
          },
        }
      )
    }
  }

  const handleSocialSave = (values: Omit<SocialLink, "id" | "position">) => {
    if (!socialSection) return

    const content: FooterSocialContent = {
      platform: values.platform,
      url: values.url,
    }

    if (selectedSocial) {
      updateItemMutation.mutate(
        {
          itemId: selectedSocial.id,
          content,
        },
        {
          onSuccess: () => {
            toast.success("Social profile updated successfully!")
            setActiveDialog(null)
            setSelectedSocial(null)
          },
          onError: (error) => {
            toast.error(getApiErrorMessage(error))
          },
        }
      )
    } else {
      createItemMutation.mutate(
        {
          sectionId: socialSection.id,
          position: getNextPosition(socialLinks),
          content,
        },
        {
          onSuccess: () => {
            toast.success("Social profile added successfully!")
            setActiveDialog(null)
            setSelectedSocial(null)
          },
          onError: (error) => {
            toast.error(getApiErrorMessage(error))
          },
        }
      )
    }
  }

  const handleDelete = () => {
    if (!deleteId) return

    deleteItemMutation.mutate(deleteId, {
      onSuccess: () => {
        toast.success("Footer item deleted successfully!")
        setDeleteType(null)
        setDeleteId(null)
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error))
      },
    })
  }

  const handleReorder = (section: FooterSection | undefined, ids: string[]) => {
    if (!section) return

    reorderItemsMutation.mutate(
      {
        sectionId: section.id,
        ids,
      },
      {
        onSuccess: () => {
          toast.success("Footer item order updated!")
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error))
        },
      }
    )
  }

  const openDeleteDialog = (type: DeleteType, id: string) => {
    setDeleteType(type)
    setDeleteId(id)
  }

  const openSupportDialog = (item?: SupportLink) => {
    setSelectedSupport(item ?? null)
    setActiveDialog("support")
  }

  const openSocialDialog = (item?: SocialLink) => {
    setSelectedSocial(item ?? null)
    setActiveDialog("social")
  }

  // Summary values
  const visibleLinks =
    (supportSection?.isVisible ? supportLinks.length : 0) +
    (socialSection?.isVisible ? socialLinks.length : 0)

  const totalLinks = supportLinks.length + socialLinks.length
  const getNextPosition = (items: { position: number }[]) => {
    return Math.max(0, ...items.map((item) => item.position)) + 1
  }
  if (isLoading) {
    return <FooterManagementSkeleton />
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-sm text-destructive">
          Failed to load footer configuration.
        </p>

        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    )
  }

  if (!descriptionSection || !supportSection || !socialSection) {
    return (
      <div className="space-y-4 py-10 text-center">
        <p className="text-muted-foreground">
          Some Footer sections are missing from the CMS.
        </p>

        <Button variant="outline" onClick={() => refetch()}>
          Refresh
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pt-4 sm:pt-6">
      {/* Page Header */}

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Footer Management</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your website footer description, support links, and social
          media profiles.
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          title="Support Links"
          value={supportLinks.length}
          description="Total configured support links"
          icon={LifeBuoy}
        />

        <SummaryCard
          title="Social Profiles"
          value={socialLinks.length}
          description="Total configured social profiles"
          icon={Share2}
        />

        <SummaryCard
          title="Active Links"
          value={visibleLinks}
          description={`${totalLinks} total configured links`}
          icon={CheckCircle2}
        />
      </div>

      {/* Main Tabs */}

      <Tabs defaultValue="description" className="w-full space-y-4">
        <TabsList className="grid h-auto w-full grid-cols-3">
          <TabsTrigger value="description">
            <FileText className="mr-2 size-4" />
            Description
          </TabsTrigger>

          <TabsTrigger value="support">
            <LifeBuoy className="mr-2 size-4" />
            Support Links
          </TabsTrigger>

          <TabsTrigger value="social">
            <Share2 className="mr-2 size-4" />
            Social Media
          </TabsTrigger>
        </TabsList>

        {/* Description Tab */}

        <TabsContent value="description">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <div>
                <CardTitle>Footer Description</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Manage the description displayed in your website footer.
                </p>
              </div>

              <Button size="sm" onClick={() => setActiveDialog("description")}>
                <Pencil className="mr-2 size-4" />
                Edit
              </Button>
            </CardHeader>

            <CardContent>
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-sm leading-7 whitespace-pre-wrap">
                  {description || "No description available."}
                </p>

                <div className="mt-3 flex justify-end">
                  <span className="text-xs text-muted-foreground">
                    {description.length}/300 characters
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Links Tab */}

        <TabsContent value="support">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <div>
                <CardTitle>Support Links</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Manage help and support links displayed in your footer.
                </p>
              </div>

              <Button
                size="sm"
                disabled={supportLinks.length >= MAX_SUPPORT_LINKS}
                onClick={() => openSupportDialog()}
              >
                <Plus className="mr-2 size-4" />
                Add Link
              </Button>
            </CardHeader>

            <CardContent className="p-0">
              <SupportLinksTable
                links={supportLinks}
                onView={(item) => {
                  setSelectedSupport(item)
                  setViewType("support")
                }}
                onEdit={openSupportDialog}
                onDelete={(id) => openDeleteDialog("support", id)}
                onReorder={(ids) => handleReorder(supportSection, ids)}
              />
            </CardContent>

            <div className="border-t px-6 py-3">
              <p className="text-xs text-muted-foreground">
                {supportLinks.length} of {MAX_SUPPORT_LINKS} support links
                configured.
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}

        <TabsContent value="social">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <div>
                <CardTitle>Social Media Profiles</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Manage your website's social media profiles.
                </p>
              </div>

              <Button
                size="sm"
                disabled={socialLinks.length >= MAX_SOCIAL_LINKS}
                onClick={() => openSocialDialog()}
              >
                <Plus className="mr-2 size-4" />
                Add Profile
              </Button>
            </CardHeader>

            <CardContent className="p-0">
              <SocialLinksTable
                links={socialLinks}
                onView={(item) => {
                  setSelectedSocial(item)
                  setViewType("social")
                }}
                onEdit={openSocialDialog}
                onDelete={(id) => openDeleteDialog("social", id)}
                onReorder={(ids) => handleReorder(socialSection, ids)}
              />
            </CardContent>

            <div className="border-t px-6 py-3">
              <p className="text-xs text-muted-foreground">
                {socialLinks.length} of {MAX_SOCIAL_LINKS} social profiles
                configured.
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Description Dialog */}

      <DescriptionDialog
        open={activeDialog === "description"}
        onOpenChange={(open) => setActiveDialog(open ? "description" : null)}
        description={description}
        onSave={handleDescriptionSave}
      />

      {/* Support Dialog */}

      <SupportLinkDialog
        open={activeDialog === "support"}
        onOpenChange={(open) => {
          setActiveDialog(open ? "support" : null)

          if (!open) setSelectedSupport(null)
        }}
        selectedLink={selectedSupport}
        onSave={handleSupportSave}
      />

      {/* Social Dialog */}

      <SocialLinkDialog
        open={activeDialog === "social"}
        onOpenChange={(open) => {
          setActiveDialog(open ? "social" : null)

          if (!open) setSelectedSocial(null)
        }}
        selectedLink={selectedSocial}
        existingLinks={socialLinks}
        onSave={handleSocialSave}
      />

      {/* View Dialog */}

      <ViewDialog
        type={viewType}
        open={viewType !== null}
        onOpenChange={(open) => {
          if (!open) {
            setViewType(null)
            setSelectedSupport(null)
            setSelectedSocial(null)
          }
        }}
        description={description}
        supportLink={selectedSupport}
        socialLink={selectedSocial}
      />

      {/* Delete Confirmation */}

      <AlertDialog
        open={deleteType !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteType(null)
            setDeleteId(null)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this item?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This item will be removed from your
              footer configuration.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

type SummaryCardProps = {
  title: string
  value: number
  description: string
  icon: React.ElementType
}

const SummaryCard = ({
  title,
  value,
  description,
  icon: Icon,
}: SummaryCardProps) => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>

          <p className="text-2xl font-bold">{value}</p>

          <p className="text-xs text-muted-foreground">{description}</p>
        </div>

        <div className="rounded-lg bg-primary/10 p-3 text-primary">
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  )
}

type SupportLinksTableProps = {
  links: SupportLink[]
  onView: (item: SupportLink) => void
  onEdit: (item: SupportLink) => void
  onDelete: (id: string) => void
  onReorder: (ids: string[]) => void
}

const SupportLinksTable = ({
  links,
  onView,
  onEdit,
  onDelete,
  onReorder,
}: SupportLinksTableProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = links.findIndex((item) => item.id === active.id)
    const newIndex = links.findIndex((item) => item.id === over.id)

    if (oldIndex === -1 || newIndex === -1) return

    const reorderedItems = arrayMove(links, oldIndex, newIndex)

    onReorder(reorderedItems.map((item) => item.id))
  }

  return (
    <div className="w-full overflow-x-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-12"></TableHead>
              <TableHead className="w-16">No.</TableHead>
              <TableHead>Link Name</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <SortableContext
            items={links.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <TableBody>
              {links.length === 0 ? (
                <EmptyTableRow message="No support links found." />
              ) : (
                links.map((link, index) => (
                  <SortableSupportRow
                    key={link.id}
                    link={link}
                    index={index}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))
              )}
            </TableBody>
          </SortableContext>
        </Table>
      </DndContext>
    </div>
  )
}
type SocialLinksTableProps = {
  links: SocialLink[]
  onView: (item: SocialLink) => void
  onEdit: (item: SocialLink) => void
  onDelete: (id: string) => void
  onReorder: (ids: string[]) => void
}

const SocialLinksTable = ({
  links,
  onView,
  onEdit,
  onDelete,
  onReorder,
}: SocialLinksTableProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = links.findIndex((item) => item.id === active.id)
    const newIndex = links.findIndex((item) => item.id === over.id)

    if (oldIndex === -1 || newIndex === -1) return

    const reorderedItems = arrayMove(links, oldIndex, newIndex)

    onReorder(reorderedItems.map((item) => item.id))
  }

  return (
    <div className="w-full overflow-x-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-12"></TableHead>
              <TableHead className="w-16">No.</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Profile URL</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <SortableContext
            items={links.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <TableBody>
              {links.length === 0 ? (
                <EmptyTableRow message="No social media profiles found." />
              ) : (
                links.map((link, index) => (
                  <SortableSocialRow
                    key={link.id}
                    link={link}
                    index={index}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))
              )}
            </TableBody>
          </SortableContext>
        </Table>
      </DndContext>
    </div>
  )
}

const EmptyTableRow = ({ message }: { message: string }) => {
  return (
    <TableRow>
      <TableCell
        colSpan={4}
        className="h-32 text-center text-sm text-muted-foreground"
      >
        {message}
      </TableCell>
    </TableRow>
  )
}

type DescriptionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  description: string
  onSave: (value: string) => void
}

const DescriptionDialog = ({
  open,
  onOpenChange,
  description,
  onSave,
}: DescriptionDialogProps) => {
  const [value, setValue] = useState(description)

  const handleOpenChange = (open: boolean) => {
    if (open) setValue(description)
    onOpenChange(open)
  }

  const handleSubmit = () => {
    if (!value.trim()) return

    onSave(value.trim())
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Footer Description</DialogTitle>

          <DialogDescription>
            Update the description displayed in your website footer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>

          <Textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Enter your footer description..."
            rows={5}
            maxLength={300}
          />

          <div className="flex justify-between">
            <p className="text-xs text-muted-foreground">
              Maximum 300 characters.
            </p>

            <span className="text-xs text-muted-foreground">
              {value.length}/300
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={!value.trim()}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

type SupportLinkDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedLink: SupportLink | null
  onSave: (values: Omit<SupportLink, "id" | "position">) => void
}

const SupportLinkDialog = ({
  open,
  onOpenChange,
  selectedLink,
  onSave,
}: SupportLinkDialogProps) => {
  const [name, setName] = useState("")
  const [destinationType, setDestinationType] =
    useState<SupportDestinationType>("internal")
  const [pageKey, setPageKey] = useState("")
  const [url, setUrl] = useState("")

  const [error, setError] = useState("")

  const isEditing = Boolean(selectedLink)

  const resetForm = () => {
    setName(selectedLink?.name ?? "")
    setDestinationType(selectedLink?.destinationType ?? "internal")
    setPageKey(selectedLink?.pageKey ?? "")
    setUrl(selectedLink?.url ?? "")

    setError("")
  }

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Please enter a link name.")
      return
    }

    if (destinationType === "internal" && !pageKey) {
      setError("Please select an internal page.")
      return
    }

    if (destinationType === "external") {
      try {
        const parsedUrl = new URL(url)

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          throw new Error()
        }
      } catch {
        setError("Please enter a valid HTTP or HTTPS URL.")
        return
      }
    }

    onSave({
      name: name.trim(),
      destinationType,
      pageKey: destinationType === "internal" ? pageKey : undefined,
      url: destinationType === "external" ? url.trim() : undefined,
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open) resetForm()
        onOpenChange(open)
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Support Link" : "Add Support Link"}
          </DialogTitle>

          <DialogDescription>
            Configure the name and destination of your footer support link.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Link Name */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Link Name</label>

            <Input
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                setError("")
              }}
              placeholder="e.g. Help Center"
            />
          </div>

          {/* Destination Type */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Destination Type</label>

            <Select
              value={destinationType}
              onValueChange={(value) => {
                if (!value) return

                setDestinationType(value as SupportDestinationType)
                setError("")
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select destination type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="internal">Internal Page</SelectItem>

                <SelectItem value="external">External URL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Internal Page */}

          {destinationType === "internal" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Page</label>

              <Select
                value={pageKey}
                onValueChange={(value) => {
                  if (!value) return

                  setPageKey(value)
                  setError("")
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a page" />
                </SelectTrigger>

                <SelectContent>
                  {INTERNAL_PAGES.map((page) => (
                    <SelectItem key={page.value} value={page.value}>
                      {page.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* External URL */}

          {destinationType === "external" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">External URL</label>

              <Input
                value={url}
                onChange={(event) => {
                  setUrl(event.target.value)
                  setError("")
                }}
                placeholder="https://example.com"
              />
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button onClick={handleSubmit}>
            {isEditing ? "Save Changes" : "Add Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

type SocialLinkDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedLink: SocialLink | null
  existingLinks: SocialLink[]
  onSave: (values: Omit<SocialLink, "id" | "position">) => void
}

const SocialLinkDialog = ({
  open,
  onOpenChange,
  selectedLink,
  existingLinks,
  onSave,
}: SocialLinkDialogProps) => {
  const [platform, setPlatform] = useState<SocialPlatform>("facebook")
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")

  const isEditing = Boolean(selectedLink)

  const resetForm = () => {
    setPlatform(selectedLink?.platform ?? "facebook")
    setUrl(selectedLink?.url ?? "")

    setError("")
  }

  const handleSubmit = () => {
    try {
      const parsedUrl = new URL(url)

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error()
      }
    } catch {
      setError("Please enter a valid HTTP or HTTPS URL.")
      return
    }

    const duplicate = existingLinks.some(
      (item) => item.platform === platform && item.id !== selectedLink?.id
    )

    if (duplicate) {
      setError("This social media platform already exists.")
      return
    }

    onSave({
      platform,
      url: url.trim(),
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open) resetForm()
        onOpenChange(open)
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Social Profile" : "Add Social Profile"}
          </DialogTitle>

          <DialogDescription>
            Add your social media platform and its profile URL.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Platform */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Platform</label>

            <Select
              value={platform}
              onValueChange={(value) => {
                if (!value) return

                setPlatform(value as SocialPlatform)
                setError("")
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>

              <SelectContent>
                {SOCIAL_PLATFORMS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Profile URL */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Profile URL</label>

            <Input
              value={url}
              onChange={(event) => {
                setUrl(event.target.value)
                setError("")
              }}
              placeholder="https://www.facebook.com/your-profile"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button onClick={handleSubmit}>
            {isEditing ? "Save Changes" : "Add Profile"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

type ViewDialogProps = {
  type: ViewType
  open: boolean
  onOpenChange: (open: boolean) => void
  description: string
  supportLink: SupportLink | null
  socialLink: SocialLink | null
}

const ViewDialog = ({
  type,
  open,
  onOpenChange,
  description,
  supportLink,
  socialLink,
}: ViewDialogProps) => {
  const title = {
    description: "Footer Description",
    support: "Support Link Details",
    social: "Social Profile Details",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{type ? title[type] : "Details"}</DialogTitle>

          <DialogDescription>
            View your footer content details.
          </DialogDescription>
        </DialogHeader>

        {type === "description" && (
          <ReadOnlyField label="Description" value={description} />
        )}

        {type === "support" && supportLink && (
          <div className="space-y-3">
            <ReadOnlyField label="Link Name" value={supportLink.name} />

            <ReadOnlyField
              label="Destination Type"
              value={supportLink.destinationType}
            />

            <ReadOnlyField
              label="Destination"
              value={
                supportLink.destinationType === "internal"
                  ? (INTERNAL_PAGES.find(
                      (page) => page.value === supportLink.pageKey
                    )?.label ?? "Unknown page")
                  : (supportLink.url ?? "")
              }
            />
          </div>
        )}

        {type === "social" && socialLink && (
          <div className="space-y-3">
            <ReadOnlyField label="Platform" value={socialLink.platform} />

            <ReadOnlyField label="Profile URL" value={socialLink.url} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

const ReadOnlyField = ({ label, value }: { label: string; value: string }) => {
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

type SortableSupportRowProps = {
  link: SupportLink
  index: number
  onView: (item: SupportLink) => void
  onEdit: (item: SupportLink) => void
  onDelete: (id: string) => void
}

const SortableSupportRow = ({
  link,
  index,
  onView,
  onEdit,
  onDelete,
}: SortableSupportRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: "relative" as const,
    zIndex: isDragging ? 1 : 0,
  }

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <Button
          ref={setActivatorNodeRef}
          variant="ghost"
          size="icon"
          className="cursor-grab touch-none active:cursor-grabbing"
          aria-label={`Drag ${link.name} to reorder`}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-4 text-muted-foreground" />
        </Button>
      </TableCell>

      <TableCell className="text-muted-foreground">{index + 1}</TableCell>

      <TableCell className="font-medium">{link.name}</TableCell>

      <TableCell>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {link.destinationType === "internal" ? (
            <LinkIcon className="size-4 shrink-0" />
          ) : (
            <Globe className="size-4 shrink-0" />
          )}

          {link.destinationType === "internal"
            ? (INTERNAL_PAGES.find((page) => page.value === link.pageKey)
                ?.label ?? "Unknown page")
            : "External URL"}
        </div>
      </TableCell>

      <TableCell>
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(link)}
            title="View"
          >
            <Eye className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(link)}
            title="Edit"
          >
            <Pencil className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => onDelete(link.id)}
            title="Delete"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
type SortableSocialRowProps = {
  link: SocialLink
  index: number
  onView: (item: SocialLink) => void
  onEdit: (item: SocialLink) => void
  onDelete: (id: string) => void
}

const SortableSocialRow = ({
  link,
  index,
  onView,
  onEdit,
  onDelete,
}: SortableSocialRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: "relative" as const,
    zIndex: isDragging ? 1 : 0,
  }

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <Button
          ref={setActivatorNodeRef}
          variant="ghost"
          size="icon"
          className="cursor-grab touch-none active:cursor-grabbing"
          aria-label={`Drag ${link.platform} to reorder`}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-4 text-muted-foreground" />
        </Button>
      </TableCell>

      <TableCell className="text-muted-foreground">{index + 1}</TableCell>

      <TableCell>
        <div className="flex items-center gap-2 font-medium capitalize">
          <Share2 className="size-4 text-muted-foreground" />
          {link.platform}
        </div>
      </TableCell>

      <TableCell>
        <span className="block max-w-xs truncate text-sm text-muted-foreground">
          {link.url}
        </span>
      </TableCell>

      <TableCell>
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(link)}
            title="View"
          >
            <Eye className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(link)}
            title="Edit"
          >
            <Pencil className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => onDelete(link.id)}
            title="Delete"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default FooterManagement
