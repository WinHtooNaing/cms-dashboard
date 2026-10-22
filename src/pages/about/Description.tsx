import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileText, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import AboutPageHeader from "@/components/about/AboutPageHeader"
import AboutFormDialog from "@/components/about/AboutFormDialog"
import FieldError from "@/components/error/FieldError"

import {
  introductionSchema,
  type IntroductionFormValues,
} from "@/types/aboutSchema"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const defaultValues: IntroductionFormValues = {
  badge: "Get to Know Us",
  heading: "Technology That",
  highlightedHeading: "Moves You Forward.",
  description:
    "Welcome to Tech Haven, your destination for discovering modern technology and electronics. We believe that finding the right technology should be simple, convenient, and accessible to everyone.",
}

const Description = () => {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IntroductionFormValues>({
    resolver: zodResolver(introductionSchema),
    defaultValues,
    mode: "onTouched",
  })

  const preview = watch()

  const openEditor = () => {
    reset(defaultValues)
    setOpen(true)
  }

  const onSubmit = (_data: IntroductionFormValues) => {
    console.log("Validation Successful")
    setOpen(false)
  }

  return (
    <div className="space-y-8">
      <AboutPageHeader
        icon={FileText}
        title="Introduction Management"
        description="Manage the main heading and introductory description displayed on your About Us page."
      />

      <Card className="overflow-hidden border-border shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
          <div>
            <h2 className="font-semibold">Introduction Content</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Main About Us banner content
            </p>
          </div>

          <Button onClick={openEditor}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Introduction
          </Button>
        </div>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-50 sm:w-60">Field</TableHead>

                <TableHead>Content</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-muted-foreground">
                  Badge Text
                </TableCell>

                <TableCell>
                  <span className="inline-flex rounded-full border bg-secondary px-3 py-1 text-xs font-medium">
                    {preview.badge}
                  </span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium text-muted-foreground">
                  Main Heading
                </TableCell>

                <TableCell className="font-semibold">
                  {preview.heading}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium text-muted-foreground">
                  Highlighted Heading
                </TableCell>

                <TableCell>
                  <span className="font-semibold text-primary">
                    {preview.highlightedHeading}
                  </span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="align-top font-medium text-muted-foreground">
                  Description
                </TableCell>

                <TableCell>
                  <p className="wrap-break max-w-3xl text-sm leading-7 whitespace-pre-wrap">
                    {preview.description}
                  </p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AboutFormDialog
        open={open}
        onOpenChange={setOpen}
        title="Edit Introduction"
        description="Update the text displayed in the About Us hero section."
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="intro-badge">Badge Text</Label>
            <Input
              id="intro-badge"
              placeholder="Get to Know Us"
              {...register("badge")}
              aria-invalid={!!errors.badge}
            />
            <FieldError message={errors.badge?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="intro-heading">Main Heading</Label>
            <Input
              id="intro-heading"
              placeholder="Technology That"
              {...register("heading")}
              aria-invalid={!!errors.heading}
            />
            <FieldError message={errors.heading?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="intro-highlight">Highlighted Heading</Label>
            <Input
              id="intro-highlight"
              placeholder="Moves You Forward."
              {...register("highlightedHeading")}
              aria-invalid={!!errors.highlightedHeading}
            />
            <FieldError message={errors.highlightedHeading?.message} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="intro-description">Description</Label>
              <span className="text-xs text-muted-foreground">
                {preview.description?.length ?? 0}/300
              </span>
            </div>

            <Textarea
              id="intro-description"
              rows={5}
              placeholder="Write the About Us introduction..."
              {...register("description")}
              aria-invalid={!!errors.description}
              className="resize-y"
            />

            <FieldError message={errors.description?.message} />
          </div>

          <div className="flex justify-end gap-3 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              Validate Content
            </Button>
          </div>
        </form>
      </AboutFormDialog>
    </div>
  )
}

export default Description
