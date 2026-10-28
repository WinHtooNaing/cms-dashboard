import { useState } from "react"
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

import {
  whoWeAreSchema,
  type featureContentFormValues,
  type WhoWeAreFormValues,
} from "@/types/aboutSchema"

import {
  aboutContentSchema,
  type AboutContentFormValues,
} from "@/types/aboutSchema"

type Feature = featureContentFormValues & {
  id: string
}

type DialogMode = "add" | "edit" | "view"

const defaultValues: WhoWeAreFormValues = {
  badge: "Who We Are",
  heading: "Making Technology",
  highlightedHeading: "Easier for Everyone",
  description:
    "At Tech Haven, we believe technology should be accessible and easy to understand. We help customers discover modern electronics and technology products that fit their needs.",
  secondaryDescription:
    "Our goal is to create a convenient shopping experience through organized product categories, clear information, and customer-focused service.",
}

const initialFeatures: Feature[] = [
  {
    id: "feature-1",
    title: "Easy product discovery",
  },
  {
    id: "feature-2",
    title: "Clear product information",
  },
  {
    id: "feature-3",
    title: "Customer-focused service",
  },
]

const WhoWeArePage = () => {
  const [sectionOpen, setSectionOpen] = useState(false)
  const [sectionMode, setSectionMode] = useState<"view" | "edit">("edit")

  const [featureOpen, setFeatureOpen] = useState(false)
  const [featureMode, setFeatureMode] = useState<DialogMode>("add")

  const {
    register,
    reset,
    formState: { errors },
  } = useForm<WhoWeAreFormValues>({
    resolver: zodResolver(whoWeAreSchema),
    defaultValues,
    mode: "onTouched",
  })

  const {
    register: registerFeature,
    reset: resetFeature,
    formState: { errors: featureErrors },
  } = useForm<AboutContentFormValues>({
    resolver: zodResolver(aboutContentSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onTouched",
  })

  const openSectionEditor = () => {
    setSectionMode("edit")
    reset(defaultValues)
    setSectionOpen(true)
  }

  const openSectionViewer = () => {
    setSectionMode("view")
    reset(defaultValues)
    setSectionOpen(true)
  }

  const openViewFeature = (feature: Feature) => {
    setFeatureMode("view")

    resetFeature({
      title: feature.title,
    })

    setFeatureOpen(true)
  }

  const openEditFeature = (feature: Feature) => {
    setFeatureMode("edit")

    resetFeature({
      title: feature.title,
    })

    setFeatureOpen(true)
  }

  const closeSectionDialog = () => {
    setSectionOpen(false)
    reset(defaultValues)
  }

  const closeFeatureDialog = () => {
    setFeatureOpen(false)

    resetFeature({
      title: "",
      description: "",
    })
  }

  return (
    <div className="space-y-8">
      <AboutPageHeader
        icon={FileText}
        title="Who We Are Management"
        description="Manage the Who We Are section and its features displayed on the Tech Haven About Us page."
      />

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
                    {defaultValues.badge}
                  </span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium text-muted-foreground">
                  Main Heading
                </TableCell>

                <TableCell className="font-semibold">
                  {defaultValues.heading}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium text-muted-foreground">
                  Highlighted Heading
                </TableCell>

                <TableCell className="font-semibold text-primary">
                  {defaultValues.highlightedHeading}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="align-top font-medium text-muted-foreground">
                  Description
                </TableCell>

                <TableCell>
                  <p className="wrap-break max-w-3xl text-sm leading-7 whitespace-pre-wrap">
                    {defaultValues.description}
                  </p>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="align-top font-medium text-muted-foreground">
                  Secondary Description
                </TableCell>

                <TableCell>
                  <p className="wrap-break max-w-3xl text-sm leading-7 whitespace-pre-wrap">
                    {defaultValues.secondaryDescription}
                  </p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
              {initialFeatures.map((feature, index) => (
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
              ))}
            </TableBody>
          </Table>
        </CardContent>

        <div className="border-t px-5 py-3">
          <p className="text-xs text-muted-foreground">
            Showing {initialFeatures.length} features
          </p>
        </div>
      </Card>

      <Dialog
        open={sectionOpen}
        onOpenChange={(open) => {
          if (!open) closeSectionDialog()
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
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
            onSubmit={(event) => event.preventDefault()}
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
              >
                Close
              </Button>

              {sectionMode === "edit" && (
                <Button type="button">Save Changes</Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={featureOpen}
        onOpenChange={(open) => {
          if (!open) closeFeatureDialog()
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogDescription>
              {featureMode === "view"
                ? "Review the selected feature."
                : "Enter the feature information below."}
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(event) => event.preventDefault()}
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
              >
                Close
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default WhoWeArePage
