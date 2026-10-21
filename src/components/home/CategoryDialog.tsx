import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ImagePlus } from "lucide-react"
import { Button } from "../ui/button"
import { categorySchema } from "@/types/categorySchema"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Controller, useForm } from "react-hook-form"
type CategoryItem = {
  id: number
  name: string
  image: string
}
export default function CategoryDialog({
  mode,
  category,
}: {
  mode: "create" | "update"
  category?: CategoryItem
}) {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  })
  function onSubmit(data: z.infer<typeof categorySchema>) {
    console.log(data)
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {mode === "create" ? "Create category" : "Update category"}
        </DialogTitle>
        <DialogDescription>
          Category data contains only ID, name, and image.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="py-2">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  {...field}
                  placeholder="Category name"
                  className={`${fieldState.error && "border-red-500"}`}
                />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />
          <Controller
            name="image"
            control={form.control}
            render={({ field: { value, onChange, ...field }, fieldState }) => (
              <Field>
                <FieldLabel>Image</FieldLabel>
                <div className="flex items-center gap-3">
                  <div className="flex size-16 items-center justify-center overflow-hidden rounded-lg border bg-muted">
                    {/* {category?.image ? (
                      <img
                        src={category.image}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      <ImagePlus className="size-5 text-muted-foreground" />
                    )} */}
                    {category?.image && !value ? (
                      <img
                        src={category.image}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : value && value[0] ? (
                      <img
                        src={URL.createObjectURL(value[0])}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      <ImagePlus className="size-5 text-muted-foreground" />
                    )}
                  </div>
                  <Input
                    {...field}
                    type="file"
                    accept="image/*"
                    onChange={(e) => onChange(e.target.files)}
                    className={`${fieldState.error && "border-red-500"}`}
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </div>
                <FieldDescription>
                  Upload a category image (JPG, PNG, or JPEG).
                </FieldDescription>
              </Field>
            )}
          />
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button type="submit">
            {mode === "create" ? "Create" : "Update"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
