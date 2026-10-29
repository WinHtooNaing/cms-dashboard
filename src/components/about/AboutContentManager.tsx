import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, Pencil, FileText } from "lucide-react"

import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
} from "@/components/ui/dialog"

import FieldError from "../error/FieldError"

import {
  aboutContentSchema,
  type AboutContentFormValues,
} from "@/types/aboutSchema"

export type AboutContentItem = AboutContentFormValues & {
  id: string
}

type DialogMode = "edit" | "view"

type AboutContentManagerProps = {
  title: string
  description: string
  icon: LucideIcon
  itemLabel: string
  initialItems: AboutContentItem[]
}

const AboutContentManager = ({
  title,
  description,
  icon: Icon,
  itemLabel,
  initialItems,
}: AboutContentManagerProps) => {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<DialogMode>()

  const [selectedItem, setSelectedItem] = useState<AboutContentItem | null>(
    null
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AboutContentFormValues>({
    resolver: zodResolver(aboutContentSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onTouched",
  })

  const filteredItems = initialItems.filter((item) => {
    return item.title.toLowerCase() || item.description.toLowerCase()
  })

  const openViewDialog = (item: AboutContentItem) => {
    setMode("view")
    setSelectedItem(item)

    reset({
      title: item.title,
      description: item.description,
    })

    setOpen(true)
  }

  const openEditDialog = (item: AboutContentItem) => {
    setMode("edit")
    setSelectedItem(item)

    reset({
      title: item.title,
      description: item.description,
    })

    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
    setSelectedItem(null)
    reset()
  }

  const onSubmit = (_data: AboutContentFormValues) => {
    setOpen(false)
    setSelectedItem(null)
    reset()
  }

  return (
    <div className="space-y-8 pt-4 sm:pt-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>

            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <h2 className="font-semibold">{itemLabel} Management</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              View and manage your website content.
            </p>
          </div>
        </div>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-14">No.</TableHead>

                <TableHead>Title</TableHead>

                <TableHead>Description</TableHead>

                <TableHead className="w-36 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-muted-foreground">
                      {index + 1}
                    </TableCell>

                    <TableCell className="min-w-40 font-medium">
                      {item.title}
                    </TableCell>

                    <TableCell className="max-w-xl min-w-64">
                      <Tooltip>
                        <TooltipTrigger>
                          <p className="line-clamp-2 overflow-hidden text-sm leading-6 text-ellipsis text-muted-foreground md:text-clip">
                            {item.description.slice(0, 80)}...
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                            {item.description.slice(0, 1000)}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          title="View content"
                          aria-label={`View ${item.title}`}
                          onClick={() => openViewDialog(item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          title="Edit content"
                          aria-label={`Edit ${item.title}`}
                          onClick={() => openEditDialog(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <FileText className="h-7 w-7" />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            closeDialog()
          } else {
            setOpen(true)
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogDescription>
              {mode === "view"
                ? "Review the complete content details."
                : "Complete the fields below. Your entries will be validated."}
            </DialogDescription>
          </DialogHeader>

          {mode === "view" && selectedItem ? (
            <div className="space-y-5 py-2">
              <div className="space-y-2">
                <Label>Title</Label>

                <div className="rounded-lg border bg-muted/30 p-3 text-sm font-medium">
                  {selectedItem.title}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>

                <div className="wrap-break rounded-lg border bg-muted/30 p-3 text-sm leading-7 whitespace-pre-wrap">
                  {selectedItem.description}
                </div>
              </div>

              <div className="flex justify-end border-t pt-4">
                <Button type="button" variant="outline" onClick={closeDialog}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-2">
              <div className="space-y-2">
                <Label htmlFor="content-title">Title</Label>

                <Input
                  id="content-title"
                  placeholder="Enter a title"
                  disabled={mode === "view"}
                  {...register("title")}
                  aria-invalid={!!errors.title}
                />

                <FieldError message={errors.title?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content-description">Description</Label>

                <Textarea
                  id="content-description"
                  rows={5}
                  placeholder="Enter a description"
                  disabled={mode === "view"}
                  className="resize-y"
                  {...register("description")}
                  aria-invalid={!!errors.description}
                />

                <FieldError message={errors.description?.message} />
              </div>

              <div className="flex justify-end gap-3 border-t pt-4">
                <Button type="button" variant="outline" onClick={closeDialog}>
                  Cancel
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  Validate Changes
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AboutContentManager
