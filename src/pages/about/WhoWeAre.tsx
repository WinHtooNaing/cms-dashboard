import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileText, Pencil, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import AboutPageHeader from "@/components/about/AboutPageHeader"
import FieldError from "@/components/error/FieldError"

import { useDocuments } from "@/hooks/cms/useDocuments"
import { useAboutSection } from "@/hooks/cms/useAboutSection"
import { useSectionItems } from "@/hooks/cms/useSectionItems"
import { useUpdateItem } from "@/hooks/cms/useUpdateItem"
import { useUpdateSection } from "@/hooks/cms/useUpdateSection"

import {
  whoWeAreSchema,
  type WhoWeAreFormValues,
  type featureContentFormValues,
} from "@/schemas/aboutSchema"
import { ABOUT_SECTION_KEYS } from "@/constants/cms"
import WhoWeAreSkeleton from "@/components/skeletons/WhoWeAreSkeleton"

type Feature = featureContentFormValues & {
  id: string
  position: number
}

type DialogMode = "edit" | "view"

const WhoWeArePage = () => {
  const [sectionOpen, setSectionOpen] = useState(false)
  const [sectionMode, setSectionMode] = useState<DialogMode>("edit")

  const [featureOpen, setFeatureOpen] = useState(false)
  const [featureMode, setFeatureMode] = useState<DialogMode>("edit")
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)

  const { data: documents = [] } = useDocuments()

  const aboutDocument = documents.find(
    (document) => document.key === "about-us"
  )

  const {
    section,
    isLoading: sectionLoading,
    isError: sectionError,
  } = useAboutSection(ABOUT_SECTION_KEYS.WHO_WE_ARE)

  const {
    data: cmsItems = [],
    isLoading: itemsLoading,
    isError: itemsError,
  } = useSectionItems(section?.id)

  const updateItemMutation = useUpdateItem()

  const updateSectionMutation = useUpdateSection(aboutDocument?.id ?? "")

  const sectionContent = useMemo<WhoWeAreFormValues>(
    () => ({
      badge: String(section?.content?.badge ?? ""),
      heading: String(section?.content?.heading ?? ""),
      highlightedHeading: String(section?.content?.highlightedHeading ?? ""),
      description: String(section?.content?.description ?? ""),
      secondaryDescription: String(
        section?.content?.secondaryDescription ?? ""
      ),
    }),
    [section]
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting: isSectionSubmitting },
  } = useForm<WhoWeAreFormValues>({
    resolver: zodResolver(whoWeAreSchema),
    defaultValues: {
      badge: "",
      heading: "",
      highlightedHeading: "",
      description: "",
      secondaryDescription: "",
    },
    mode: "onTouched",
  })

  useEffect(() => {
    if (section && !sectionOpen) {
      reset(sectionContent)
    }
  }, [section, sectionContent, sectionOpen, reset])

  const openSectionEditor = () => {
    reset(sectionContent)
    setSectionMode("edit")
    setSectionOpen(true)
  }

  const openSectionViewer = () => {
    reset(sectionContent)
    setSectionMode("view")
    setSectionOpen(true)
  }

  const onSubmitSection = async (data: WhoWeAreFormValues) => {
    if (!section) return

    await updateSectionMutation.mutateAsync({
      sectionId: section.id,
      payload: {
        content: data,
      },
    })

    setSectionOpen(false)
  }

  const closeSectionDialog = () => {
    setSectionOpen(false)
    reset(sectionContent)
  }

  const {
    register: registerFeature,
    handleSubmit: handleSubmitFeature,
    reset: resetFeature,
    formState: { errors: featureErrors, isSubmitting: isFeatureSubmitting },
  } = useForm<featureContentFormValues>({
    defaultValues: {
      title: "",
    },
    mode: "onTouched",
  })

  const features = useMemo<Feature[]>(
    () =>
      cmsItems
        .map((item) => ({
          id: item.id,
          position: item.position,
          title: String(item.content.title ?? ""),
        }))
        .sort((a, b) => a.position - b.position),
    [cmsItems]
  )

  const openViewFeature = (feature: Feature) => {
    setSelectedFeature(feature)
    setFeatureMode("view")

    resetFeature({
      title: feature.title,
    })

    setFeatureOpen(true)
  }

  const openEditFeature = (feature: Feature) => {
    setSelectedFeature(feature)
    setFeatureMode("edit")

    resetFeature({
      title: feature.title,
    })

    setFeatureOpen(true)
  }

  const onSubmitFeature = async (data: featureContentFormValues) => {
    if (!selectedFeature || !section) return

    await updateItemMutation.mutateAsync({
      itemId: selectedFeature.id,
      sectionId: section.id,
      payload: {
        content: {
          title: data.title,
        },
      },
    })

    setFeatureOpen(false)
    setSelectedFeature(null)
    resetFeature({
      title: "",
    })
  }

  const closeFeatureDialog = () => {
    setFeatureOpen(false)
    setSelectedFeature(null)

    resetFeature({
      title: "",
    })
  }
  if (sectionLoading || itemsLoading) {
    return <WhoWeAreSkeleton />
  }

  if (sectionError || itemsError) {
    return (
      <div className="space-y-8 pt-4 sm:pt-6">
        <AboutPageHeader
          icon={FileText}
          title="Who We Are Management"
          description="Manage the Who We Are section and its features displayed on the Tech Haven About Us page."
        />

        <Card>
          <CardContent className="flex h-40 items-center justify-center text-sm text-destructive">
            Failed to load Who We Are content. Please try again.
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!section) {
    return (
      <div className="space-y-8 pt-4 sm:pt-6">
        <AboutPageHeader
          icon={FileText}
          title="Who We Are Management"
          description="Manage the Who We Are section and its features displayed on the Tech Haven About Us page."
        />

        <Card>
          <CardContent className="flex h-40 items-center justify-center text-sm text-muted-foreground">
            Who We Are section was not found.
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8 pt-4 sm:pt-6">
      <AboutPageHeader
        icon={FileText}
        title="Who We Are Management"
        description="Manage the Who We Are section and its features displayed on the Tech Haven About Us page."
      />

      {/* SECTION INFORMATION */}
      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
          <div>
            <h2 className="font-semibold">Section Information</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage the main headings and descriptions.
            </p>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={openSectionViewer}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>

            <Button type="button" onClick={openSectionEditor}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Section
            </Button>
          </div>
        </div>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-55">Field</TableHead>
                <TableHead>Content</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-muted-foreground">
                  Badge
                </TableCell>

                <TableCell>
                  <span className="inline-flex rounded-full border bg-secondary px-3 py-1 text-xs font-medium">
                    {sectionContent.badge}
                  </span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium text-muted-foreground">
                  Main Heading
                </TableCell>

                <TableCell className="font-semibold">
                  {sectionContent.heading}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium text-muted-foreground">
                  Highlighted Heading
                </TableCell>

                <TableCell className="font-semibold text-primary">
                  {sectionContent.highlightedHeading}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="align-top font-medium text-muted-foreground">
                  Description
                </TableCell>

                <TableCell>
                  <p className="wrap-break max-w-3xl text-sm leading-7 whitespace-pre-wrap">
                    {sectionContent.description}
                  </p>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="align-top font-medium text-muted-foreground">
                  Secondary Description
                </TableCell>

                <TableCell>
                  <p className="wrap-break max-w-3xl text-sm leading-7 whitespace-pre-wrap">
                    {sectionContent.secondaryDescription}
                  </p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* FEATURES MANAGEMENT */}
      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
          <div>
            <h2 className="font-semibold">Features Management</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage the three features shown in the Who We Are section.
            </p>
          </div>
        </div>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-20">No.</TableHead>

                <TableHead className="text-center">Feature</TableHead>

                <TableHead className="w-36 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {features.length > 0 ? (
                features.map((feature, index) => (
                  <TableRow key={feature.id}>
                    <TableCell className="text-muted-foreground">
                      {index + 1}
                    </TableCell>

                    <TableCell className="text-center font-medium">
                      {feature.title}
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          title="View feature"
                          aria-label={`View ${feature.title}`}
                          onClick={() => openViewFeature(feature)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          title="Edit feature"
                          aria-label={`Edit ${feature.title}`}
                          onClick={() => openEditFeature(feature)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No features found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        <div className="border-t px-5 py-3">
          <p className="text-xs text-muted-foreground">
            Showing {features.length} features
          </p>
        </div>
      </Card>

      {/* SECTION VIEW / EDIT DIALOG */}
      <Dialog
        open={sectionOpen}
        onOpenChange={(open) => {
          if (!open) closeSectionDialog()
        }}
      >
        <DialogContent className="max-h-[90vh] scrollbar-none overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {sectionMode === "view"
                ? "View Section Information"
                : "Edit Section Information"}
            </DialogTitle>

            <DialogDescription>
              {sectionMode === "view"
                ? "Review the current Who We Are content."
                : "Edit the text fields for the Who We Are section."}
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmitSection)}
            className="space-y-5 py-2"
          >
            <div className="space-y-2">
              <Label htmlFor="who-badge">Badge</Label>

              <Input
                id="who-badge"
                disabled={sectionMode === "view"}
                {...register("badge")}
                aria-invalid={!!errors.badge}
              />

              <FieldError message={errors.badge?.message} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="who-heading">Main Heading</Label>

              <Input
                id="who-heading"
                disabled={sectionMode === "view"}
                {...register("heading")}
                aria-invalid={!!errors.heading}
              />

              <FieldError message={errors.heading?.message} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="who-highlight">Highlighted Heading</Label>

              <Input
                id="who-highlight"
                disabled={sectionMode === "view"}
                {...register("highlightedHeading")}
                aria-invalid={!!errors.highlightedHeading}
              />

              <FieldError message={errors.highlightedHeading?.message} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="who-description">Description</Label>

              <Textarea
                id="who-description"
                rows={4}
                disabled={sectionMode === "view"}
                className="resize-y"
                {...register("description")}
                aria-invalid={!!errors.description}
              />

              <FieldError message={errors.description?.message} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="who-secondary">Secondary Description</Label>

              <Textarea
                id="who-secondary"
                rows={4}
                disabled={sectionMode === "view"}
                className="resize-y"
                {...register("secondaryDescription")}
                aria-invalid={!!errors.secondaryDescription}
              />

              <FieldError message={errors.secondaryDescription?.message} />
            </div>

            <div className="flex justify-end gap-3 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={closeSectionDialog}
                disabled={
                  isSectionSubmitting || updateSectionMutation.isPending
                }
              >
                Close
              </Button>

              {sectionMode === "edit" && (
                <Button
                  type="submit"
                  disabled={
                    isSectionSubmitting || updateSectionMutation.isPending
                  }
                >
                  {isSectionSubmitting || updateSectionMutation.isPending
                    ? "Saving..."
                    : "Save Changes"}
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* FEATURE VIEW / EDIT DIALOG */}
      <Dialog
        open={featureOpen}
        onOpenChange={(open) => {
          if (!open) closeFeatureDialog()
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {featureMode === "view" ? "View Feature" : "Edit Feature"}
            </DialogTitle>

            <DialogDescription>
              {featureMode === "view"
                ? "Review the selected feature."
                : "Update the feature title below."}
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmitFeature(onSubmitFeature)}
            className="space-y-5 py-2"
          >
            <div className="space-y-2">
              <Label htmlFor="feature-title">Feature Title</Label>

              <Input
                id="feature-title"
                placeholder="Enter feature title"
                disabled={featureMode === "view"}
                {...registerFeature("title")}
                aria-invalid={!!featureErrors.title}
              />

              <FieldError message={featureErrors.title?.message} />
            </div>

            <div className="flex justify-end gap-3 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={closeFeatureDialog}
                disabled={isFeatureSubmitting || updateItemMutation.isPending}
              >
                Close
              </Button>

              {featureMode === "edit" && (
                <Button
                  type="submit"
                  disabled={isFeatureSubmitting || updateItemMutation.isPending}
                >
                  {isFeatureSubmitting || updateItemMutation.isPending
                    ? "Saving..."
                    : "Save Changes"}
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default WhoWeArePage
