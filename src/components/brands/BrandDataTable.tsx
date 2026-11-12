import { useMemo, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  useTable,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useSearchParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  type GetBrandsParams,
  type CreateBrandPayload,
  type UpdateBrandPayload,
} from "@/service/brand.service"
import { brandSchema, type BrandFormData } from "@/schemas/brandSchema"

import { columns, type BrandTableRowWithActions } from "./column"
import { features } from "./data-table-features"

const PAGE_SIZE = 10
const EMPTY_BRANDS: BrandTableRowWithActions[] = []

type BrandPageData = {
  items: BrandTableRowWithActions[]
  page: number
  total: number
  totalPages: number
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null

const parseBrandPage = (
  response: unknown,
  requestedPage: number
): BrandPageData => {
  if (!isRecord(response)) {
    throw new Error("The brands API returned an invalid response.")
  }

  const payload = isRecord(response.items)
    ? response
    : { items: response.items, pagination: response.pagination }

  const rawItems = Array.isArray(payload.items) ? payload.items : []

  const items = rawItems.map((item, index): BrandTableRowWithActions => {
    if (!isRecord(item)) {
      throw new Error(
        `The brands API returned an invalid brand at row ${index + 1}.`
      )
    }

    const id = typeof item.id === "string" ? item.id : undefined
    const name = typeof item.name === "string" ? item.name : undefined
    const slug = typeof item.slug === "string" ? item.slug : undefined
    const description =
      item.description === null
        ? null
        : typeof item.description === "string"
          ? item.description
          : null
    const imageUrl =
      item.imageUrl === null
        ? null
        : typeof item.imageUrl === "string"
          ? item.imageUrl
          : null
    const isActive = typeof item.isActive === "boolean" ? item.isActive : false
    const createdAt =
      typeof item.createdAt === "string" ? item.createdAt : undefined

    if (!id || !name || !slug || createdAt === undefined) {
      throw new Error(
        `The brands API returned incomplete data at row ${index + 1}.`
      )
    }

    return {
      id,
      name,
      slug,
      description,
      imageUrl,
      isActive,
      createdAt,
    }
  })

  const pagination = isRecord(payload.pagination)
    ? payload.pagination
    : {
        page: requestedPage,
        limit: PAGE_SIZE,
        total: items.length,
        totalPages: 1,
      }

  const totalPages =
    typeof pagination.totalPages === "number" ? pagination.totalPages : 1

  return {
    items,
    page: pagination.page as number,
    total: pagination.total as number,
    totalPages,
  }
}

const BrandDataTable = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number(searchParams.get("page")) || 1)
  const limit = Math.max(1, Number(searchParams.get("limit")) || PAGE_SIZE)
  const searchParam = searchParams.get("search") ?? ""

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [searchInput, setSearchInput] = useState(searchParam)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingBrand, setEditingBrand] =
    useState<BrandTableRowWithActions | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [brandToDelete, setBrandToDelete] =
    useState<BrandTableRowWithActions | null>(null)

  const queryClient = useQueryClient()

  const applySearch = () => {
    const nextSearch = searchInput.trim()
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (nextSearch) {
        next.set("search", nextSearch)
      } else {
        next.delete("search")
      }
      next.set("page", "1")
      next.set("limit", String(limit))
      return next
    })
  }

  const updatePage = (nextPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set("page", String(nextPage))
      next.set("limit", String(limit))
      if (searchParam) next.set("search", searchParam)
      return next
    })
  }

  const params: GetBrandsParams = useMemo(
    () => ({
      page,
      limit,
      sortBy: sorting[0]?.id,
      sortOrder: sorting[0]?.desc ? "desc" : "asc",
      search: searchParam || undefined,
    }),
    [page, limit, sorting, searchParam]
  )

  const { data, isPending, isFetching, isError, error } =
    useQuery<BrandPageData>({
      queryKey: ["brands", params],
      queryFn: async () => parseBrandPage(await getBrands(params), page),
      placeholderData: (previousData) => previousData,
    })

  const rows = data?.items ?? EMPTY_BRANDS

  const table = useTable({
    features,
    data: rows,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  })

  const currentPage = data?.page ?? page
  const totalPages = data?.totalPages ?? 1
  const canGoNext = currentPage < totalPages

  // Form setup
  const form = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  })

  const createMutation = useMutation({
    mutationFn: (payload: CreateBrandPayload) => createBrand(payload),
    onSuccess: () => {
      toast.success("Brand created successfully")
      queryClient.invalidateQueries({ queryKey: ["brands"] })
      setDialogOpen(false)
      form.reset({ name: "", slug: "", description: "" })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create brand"
      )
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: UpdateBrandPayload
    }) => updateBrand(id, payload),
    onSuccess: () => {
      toast.success("Brand updated successfully")
      queryClient.invalidateQueries({ queryKey: ["brands"] })
      setDialogOpen(false)
      setEditingBrand(null)
      form.reset({ name: "", slug: "", description: "" })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update brand"
      )
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBrand(id),
    onSuccess: () => {
      toast.success("Brand deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["brands"] })
      setDeleteDialogOpen(false)
      setBrandToDelete(null)
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete brand"
      )
    },
  })

  const handleOpenCreate = () => {
    setEditingBrand(null)
    form.reset({ name: "", slug: "", description: "" })
    setDialogOpen(true)
  }

  const handleOpenEdit = (brand: BrandTableRowWithActions) => {
    setEditingBrand(brand)
    form.reset({
      name: brand.name,
      slug: brand.slug,
      description: brand.description ?? "",
    })
    setDialogOpen(true)
  }

  const handleDelete = (brand: BrandTableRowWithActions) => {
    setBrandToDelete(brand)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (brandToDelete) {
      deleteMutation.mutate(brandToDelete.id)
    }
  }

  const onSubmit = (data: BrandFormData) => {
    const payload: CreateBrandPayload = {
      name: data.name,
      slug: data.slug,
      description: data.description,
    }

    if (editingBrand) {
      updateMutation.mutate({ id: editingBrand.id, payload })
    } else {
      createMutation.mutate(payload)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder="Search brand name or slug..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") applySearch()
            }}
            className="sm:max-w-sm lg:w-md"
          />
          <Button onClick={applySearch}>
            <Search className="mr-1 size-4" />
            Search
          </Button>
        </div>

        <Button onClick={handleOpenCreate}>
          <Plus className="mr-2 size-4" />
          Add Brand
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading brands...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-destructive"
                >
                  {error instanceof Error
                    ? error.message
                    : "Failed to load brands."}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getAllCells().map((cell) =>
                    cell.column.id === "actions" ? (
                      <TableCell key={cell.id}>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="size-4" />
                                <span className="sr-only">Open actions</span>
                              </Button>
                            }
                          />
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleOpenEdit(row.original)}
                            >
                              <Edit className="mr-2 size-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => handleDelete(row.original)}
                            >
                              <Trash2 className="mr-2 size-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    ) : (
                      <TableCell key={cell.id}>
                        <table.FlexRender cell={cell} />
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No brands found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          Showing {table.getFilteredRowModel().rows.length} of{" "}
          {data?.total ?? rows.length} brands
          {isFetching && <span className="ml-2">Updating...</span>}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updatePage(currentPage - 1)}
            disabled={currentPage <= 1 || isFetching}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updatePage(currentPage + 1)}
            disabled={!canGoNext || isFetching}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingBrand ? "Edit Brand" : "Create Brand"}
            </DialogTitle>
            <DialogDescription>
              {editingBrand
                ? "Update the brand details below."
                : "Fill in the details to create a new brand."}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(
              onSubmit as (data: BrandFormData) => void
            )}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="Enter brand name"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium">
                Slug
              </label>
              <Input
                id="slug"
                {...form.register("slug")}
                placeholder="Enter slug (lowercase, numbers, hyphens)"
              />
              {form.formState.errors.slug && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.slug.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                {...form.register("description")}
                placeholder="Enter description"
                rows={3}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Brand</DialogTitle>
            <DialogDescription>
              {brandToDelete
                ? `Are you sure you want to delete "${brandToDelete.name}"? This action cannot be undone.`
                : "Are you sure you want to delete this brand? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending || !brandToDelete}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BrandDataTable
