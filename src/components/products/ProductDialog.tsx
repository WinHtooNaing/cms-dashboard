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
import { generateSlug } from "@/util/generate-slug"
import { getBrands } from "@/service/brand.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getCategories } from "@/service/category.service"

import { Input } from "@/components/ui/input"
import { ImagePlus } from "lucide-react"
import { Button } from "../ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Controller, useForm } from "react-hook-form"
import type { Product } from "@/types/product"
import { getApiErrorMessage } from "@/lib/api-error"
import { ProductSchema } from "@/schemas/productSchema"
import { Textarea } from "../ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { createProduct } from "@/service/product.service"
export default function CategoryDialog({
  mode,
  product,
}: {
  mode: "create" | "update"
  product?: Product
}) {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  })
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product?.name ?? "",
      sku: product?.sku ?? "",
      brandId: product?.brand?.id ?? "",
      price: Number(product?.price ?? 0),
      originalPrice: product?.originalPrice
        ? Number(product.originalPrice)
        : undefined,
      image: undefined,
      category: product?.categoryId ?? "",
      description: product?.description ?? "",
    },
  })
  function onSubmit(data: z.infer<typeof ProductSchema>) {
    const payload = {
      name: data.name,
      slug: generateSlug(data.name),
      brandId: data.brandId,
      sku: data.sku,
      description: data.description,
      price: data.price,
      originalPrice: data.originalPrice,
      categoryId: data.category,
      image: data.image?.[0] as File | undefined,
    }

    createMutation.mutate(payload)
  }
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: createProduct,

    onSuccess: () => {
      toast.success("Product created successfully!")

      queryClient.invalidateQueries({
        queryKey: ["products"],
      })

      form.reset()
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error))
    },
  })
  return (
    <DialogContent className="flex max-h-[85vh] flex-col sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>
          {mode === "create" ? "Create product" : "Update product"}
        </DialogTitle>
        <DialogDescription>
          Product data contains only name, and image
        </DialogDescription>
      </DialogHeader>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="scrollbar-none overflow-scroll"
      >
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
              render={({ field, fieldState }) => {
                const activeCategories = categories.filter(
                  (category) => category.isActive
                )

                const categoryItems = activeCategories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))

                return (
                  <Field>
                    <FieldLabel>Product Category</FieldLabel>

                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      items={categoryItems}
                    >
                      <SelectTrigger
                        className={`w-full max-w-48 ${
                          fieldState.error ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {activeCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )
              }}
            />
          </div>
          <div className="flex gap-2">
            <Controller
              name="sku"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>SKU</FieldLabel>

                  <Input
                    {...field}
                    placeholder="e.g. SAM-S25-001"
                    className={fieldState.error ? "border-red-500" : ""}
                  />

                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
            <Controller
              name="brandId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Brand</FieldLabel>

                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    items={brands.map((brand) => ({
                      label: brand.name,
                      value: brand.id,
                    }))}
                  >
                    <SelectTrigger
                      className={`w-full ${
                        fieldState.error ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select a brand" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {brands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.name}
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Selling Price (Ks)</FieldLabel>

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
                    type="number"
                    min="0"
                    placeholder="e.g. 250000"
                    className={fieldState.error ? "border-red-500" : ""}
                  />

                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="originalPrice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>
                    Original Price (Ks)
                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                      Optional
                    </span>
                  </FieldLabel>

                  <Input
                    value={field.value ?? ""}
                    onChange={(event) =>
                      field.onChange(
                        event.target.value === ""
                          ? undefined
                          : event.target.valueAsNumber
                      )
                    }
                    type="number"
                    min="0"
                    placeholder="e.g. 300000"
                    className={fieldState.error ? "border-red-500" : ""}
                  />

                  <FieldDescription>
                    Enter this only when the product has a genuine discount.
                  </FieldDescription>

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
                    {product?.imageUrl && !value ? (
                      <img
                        src={product.imageUrl}
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
          <Button type="submit" disabled={createMutation.isPending}>
            {createMutation.isPending
              ? "Creating..."
              : mode === "create"
                ? "Create Product"
                : "Update Product"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
