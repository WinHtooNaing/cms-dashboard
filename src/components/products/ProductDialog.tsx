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

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Controller, useForm } from "react-hook-form"
import { categories, type Product } from "@/data/categories"
import { ProductSchema } from "@/types/productSchema"
import { Textarea } from "../ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export default function CategoryDialog({
  mode,
  product,
}: {
  mode: "create" | "update"
  product?: Product
}) {
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product?.name ?? "",
      brand: product?.brand ?? "",
      price: product?.price ?? 0,
      originalPrice: product?.originalPrice ?? 0,
      image: undefined,
      category: product?.category ?? "",
      description: product?.description ?? "",
      stock: product?.stock ?? 0,
      rating: product?.rating ?? 0,
    },
  })
  function onSubmit(data: z.infer<typeof ProductSchema>) {
    console.log("data", data)
  }
  return (
    <DialogContent className="flex max-h-[85vh] flex-col overflow-scroll sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>
          {mode === "create" ? "Create product" : "Update product"}
        </DialogTitle>
        <DialogDescription>
          Product data contains only name, and image
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="flex flex-col py-2">
          <div className="flex gap-2">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Product Name</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Product name"
                    className={fieldState.error ? "border-red-500" : ""}
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Product Category</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value ?? "")}
                  >
                    <SelectTrigger
                      className={`w-full max-w-48 ${fieldState.error ? "border-red-500" : ""}`}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((item) => (
                          <SelectItem key={item.id} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
          </div>
          <div className="flex gap-2">
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Price</FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    onChange={(event) =>
                      field.onChange(
                        event.target.value === ""
                          ? undefined
                          : event.target.valueAsNumber
                      )
                    }
                    placeholder="Price"
                    type="number"
                    className={fieldState.error ? "border-red-500" : ""}
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
            <Controller
              name="stock"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Stock</FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    onChange={(event) =>
                      field.onChange(
                        event.target.value === ""
                          ? undefined
                          : event.target.valueAsNumber
                      )
                    }
                    placeholder="Stock"
                    type="number"
                    className={fieldState.error ? "border-red-500" : ""}
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
          </div>
          <div className="flex gap-2">
            <Controller
              name="brand"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Brand</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Brand"
                    className={fieldState.error ? "border-red-500" : ""}
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="rating"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Rating</FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    onChange={(event) =>
                      field.onChange(
                        event.target.value === ""
                          ? undefined
                          : event.target.valueAsNumber
                      )
                    }
                    placeholder="Rating"
                    type="number"
                    className={fieldState.error ? "border-red-500" : ""}
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            name="image"
            control={form.control}
            render={({ field: { value, onChange, ...field }, fieldState }) => (
              <Field>
                <FieldLabel>Image</FieldLabel>
                <div className="flex items-center gap-3">
                  <div className="flex size-16 items-center justify-center overflow-hidden rounded-lg border bg-muted">
                    {product?.image && !value ? (
                      <img
                        src={product.image}
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
                    className={fieldState.error ? "border-red-500" : ""}
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

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  {...field}
                  placeholder="Description"
                  className={fieldState.error ? "border-red-500" : ""}
                />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
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
