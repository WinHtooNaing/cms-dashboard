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
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { generateSlug } from "@/util/generate-slug"
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
import { getBrandsByProduct } from "@/service/brand.service"
export default function CategoryDialog({
  mode,
  product,
  onClose,
}: {
  mode: "create" | "update"
  product?: Product
  onClose: () => void
}) {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrandsByProduct,
  })

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      sku: "",
      brandId: "",
      price: 0,
      originalPrice: undefined,
      image: undefined,
      category: "",
      description: "",
    },
  })
  const [hasDiscount, setHasDiscount] = useState(false)
  useEffect(() => {
    if (mode === "update" && product) {
      const originalPrice =
        product.originalPrice &&
        Number(product.originalPrice) > Number(product.price)
          ? Number(product.originalPrice)
          : undefined

      setHasDiscount(originalPrice !== undefined)

      form.reset({
        name: product.name ?? "",
        sku: product.sku ?? "",

        brandId: product.brand?.id ?? "",

        category: product.category?.id ?? "",

        price: Number(product.price),

        originalPrice,

        description: product.description ?? "",

        image: undefined,
      })
    } else {
      setHasDiscount(false)

      form.reset({
        name: "",
        sku: "",
        brandId: "",
        category: "",
        price: 0,
        originalPrice: undefined,
        description: "",
        image: undefined,
      })
    }
  }, [product, mode, form])

  const handleDiscountToggle = (checked: boolean) => {
    setHasDiscount(checked)

    if (checked) {
      const currentPrice = form.getValues("price")

      form.setValue("originalPrice", currentPrice, {
        shouldValidate: true,
      })
    } else {
      form.setValue("originalPrice", undefined, {
        shouldValidate: true,
      })
    }
  }

  function onSubmit(data: z.infer<typeof ProductSchema>) {
    const payload = {
      name: data.name,
      slug:
        mode === "update" && product?.name === data.name
          ? product.slug
          : generateSlug(data.name),
      brandId: data.brandId,
      sku: data.sku,
      description: data.description,
      price: data.price,
      originalPrice: hasDiscount ? data.originalPrice : undefined,
      categoryId: data.category,
      image: data.image?.[0] as File | undefined,
    }

    if (mode === "update" && product) {
      updateMutation.mutate({
        id: product.id,
        data: payload,
      })
    } else {
      createMutation.mutate(payload)
    }
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
      onClose()
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error))
    },
  })
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductPayload }) =>
      updateProduct(id, data),

    onSuccess: (_, variables) => {
      toast.success("Product updated successfully!")

      queryClient.invalidateQueries({
        queryKey: ["products"],
      })

      queryClient.invalidateQueries({
        queryKey: ["product", variables.id],
      })

      form.reset()
      onClose()
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error))
    },
  })
  const isSubmitting = createMutation.isPending || updateMutation.isPending
  const price = form.watch("price")
  const originalPrice = form.watch("originalPrice")

  const discountPercentage =
    hasDiscount && originalPrice !== undefined && originalPrice > price
      ? Number((((originalPrice - price) / originalPrice) * 100).toFixed(2))
      : 0
  return (
    <DialogContent className="flex max-h-[85vh] flex-col sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>
          {mode === "create" ? "Create product" : "Update product"}
        </DialogTitle>
        <DialogDescription>
          {mode === "create"
            ? "Enter the details to create a new product."
            : "Update the details of this product."}
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
          <div className="space-y-4 rounded-lg border p-4">
            <div>
              <h3 className="font-semibold">Product Pricing</h3>
              <p className="text-sm text-muted-foreground">
                Set the selling price and optionally add a discount.
              </p>
            </div>

            {/* Selling Price */}
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Selling Price (Ks)</FieldLabel>

                  <Input
                    type="number"
                    min="0"
                    placeholder="e.g. 400000"
                    value={field.value ?? ""}
                    onChange={(event) =>
                      field.onChange(
                        event.target.value === ""
                          ? undefined
                          : event.target.valueAsNumber
                      )
                    }
                    className={fieldState.error ? "border-red-500" : ""}
                  />

                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* Discount Switch */}
            <div className="flex items-center justify-between rounded-md bg-muted/50 p-3">
              <div className="space-y-1">
                <FieldLabel>Offer a discount</FieldLabel>
                <p className="text-xs text-muted-foreground">
                  Enable this if the product has a discounted price.
                </p>
              </div>

              <Switch
                checked={hasDiscount}
                onCheckedChange={handleDiscountToggle}
              />
            </div>

            {/* Original Price */}
            {hasDiscount && (
              <Controller
                name="originalPrice"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Original Price (Ks)</FieldLabel>

                    <Input
                      type="number"
                      min="0"
                      placeholder="e.g. 500000"
                      value={field.value ?? ""}
                      onChange={(event) =>
                        field.onChange(
                          event.target.value === ""
                            ? undefined
                            : event.target.valueAsNumber
                        )
                      }
                      className={fieldState.error ? "border-red-500" : ""}
                    />

                    <FieldDescription>
                      Must be greater than the selling price.
                    </FieldDescription>

                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            )}

            {/* Discount Preview */}
            {hasDiscount && (
              <div className="rounded-md border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950/30">
                {discountPercentage > 0 ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">
                      Discount Preview
                    </span>

                    <span className="font-bold text-green-700 dark:text-green-400">
                      {discountPercentage}% OFF
                    </span>
                  </div>
                ) : (
                  <p className="text-sm text-destructive">
                    Original price must be greater than selling price.
                  </p>
                )}
              </div>
            )}
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
                  Upload a Product image (JPG, PNG, or JPEG).
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? mode === "create"
                ? "Creating..."
                : "Updating..."
              : mode === "create"
                ? "Create Product"
                : "Update Product"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
