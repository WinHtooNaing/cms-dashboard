import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "react-router-dom"

import {
  Plus,
  Search,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  X,
} from "lucide-react"

import { useQuery } from "@tanstack/react-query"

import {
  columnVisibilityFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
  type ColumnVisibilityState,
  type SortingState,
} from "@tanstack/react-table"

import { getCategories } from "@/service/category.service"
import { getBrands } from "@/service/brand.service"
import { getProducts } from "@/service/product.service"

import type { Product } from "@/types/product"

import ProductTableSkeleton from "@/components/skeletons/ProductTableSkeleton"
import ProductDialog from "@/components/products/ProductDialog"

import { columns } from "./columns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog } from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
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

const features = tableFeatures({
  columnVisibilityFeature,
  rowSelectionFeature,
  rowSortingFeature,
})

const PAGE_SIZES = [8, 10, 20, 50, 100]

// Normalize category/brand API responses.
// Supports either an array or an object containing items.
interface FilterOption {
  id: string
  name: string
}

function getFilterOptions(response: unknown): FilterOption[] {
  if (!response) return []

  const result = response as {
    items?: FilterOption[]
    data?: {
      items?: FilterOption[]
    }
  }

  const items = Array.isArray(response)
    ? response
    : (result.items ?? result.data?.items ?? [])

  return items.map((item) => ({
    id: item.id,
    name: item.name,
  }))
}

export default function ProductTable() {
  // Dialog states
  const [open, setOpen] = useState(false)

  const [dialogMode, setDialogMode] = useState<"create" | "update">("create")

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()

  // Table states
  const [columnVisibility, setColumnVisibility] =
    useState<ColumnVisibilityState>({})

  const [rowSelection, setRowSelection] = useState({})

  // URL parameters
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Math.max(1, Number(searchParams.get("page")) || 1)

  const requestedLimit = Number(searchParams.get("limit")) || 8

  const limit = PAGE_SIZES.includes(requestedLimit) ? requestedLimit : 8

  const searchValue = searchParams.get("search") ?? ""

  const categoryId = searchParams.get("categoryId") ?? ""

  const brandId = searchParams.get("brandId") ?? ""

  const hasDiscount = searchParams.get("hasDiscount") ?? ""

  const minPrice = searchParams.get("minPrice") ?? ""

  const maxPrice = searchParams.get("maxPrice") ?? ""

  const sortBy = searchParams.get("sortBy") ?? ""

  const sortOrder = searchParams.get("sortOrder") ?? "desc"
  const [filtersOpen, setFiltersOpen] = useState(false)
  // Local input states
  const [search, setSearch] = useState(searchValue)
  const activeFilterCount = [
    categoryId,
    brandId,
    hasDiscount,
    minPrice,
    maxPrice,
  ].filter(Boolean).length
  const [minPriceInput, setMinPriceInput] = useState(minPrice)

  const [maxPriceInput, setMaxPriceInput] = useState(maxPrice)

  // Sorting state is synchronized with URL parameters.
  const sorting: SortingState = sortBy
    ? [
        {
          id: sortBy,
          desc: sortOrder === "desc",
        },
      ]
    : []

  // --------------------------------------------------
  // URL HELPERS
  // --------------------------------------------------

  const updateParams = (updates: Record<string, string | undefined>) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      })

      return params
    })
  }

  const updateFilter = (key: string, value: string) => {
    updateParams({
      [key]: value,
      page: "1",
    })
  }

  const setPage = (newPage: number) => {
    updateParams({
      page: String(Math.max(1, newPage)),
    })
  }

  // --------------------------------------------------
  // SEARCH DEBOUNCE
  // --------------------------------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== searchValue) {
        updateParams({
          search: search,
          page: "1",
        })
      }
    }, 400)

    return () => clearTimeout(timer)

    // searchValue is intentionally included to synchronize browser navigation.
  }, [search, searchValue])

  // Synchronize search input when navigating browser history.
  useEffect(() => {
    setSearch(searchValue)
  }, [searchValue])

  // Synchronize price inputs when navigating browser history.
  useEffect(() => {
    setMinPriceInput(minPrice)
    setMaxPriceInput(maxPrice)
  }, [minPrice, maxPrice])

  // --------------------------------------------------
  // CATEGORY QUERY
  // --------------------------------------------------

  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  })

  const categories = useMemo(
    () => getFilterOptions(categoryData),
    [categoryData]
  )

  // --------------------------------------------------
  // BRAND QUERY
  // --------------------------------------------------

  const { data: brandData } = useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
    staleTime: 5 * 60 * 1000,
  })

  const brands = useMemo(() => getFilterOptions(brandData), [brandData])

  // --------------------------------------------------
  // PRODUCT QUERY
  // --------------------------------------------------

  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: [
      "products",
      page,
      limit,
      searchValue,
      categoryId,
      brandId,
      hasDiscount,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
    ],

    queryFn: () =>
      getProducts({
        page,
        limit,

        search: searchValue || undefined,

        categoryId: categoryId || undefined,

        brandId: brandId || undefined,

        hasDiscount: hasDiscount === "" ? undefined : hasDiscount === "true",

        minPrice: minPrice ? Number(minPrice) : undefined,

        maxPrice: maxPrice ? Number(maxPrice) : undefined,

        sortBy: sortBy || "createdAt",

        sortOrder: sortOrder === "asc" ? "asc" : "desc",
      }),

    placeholderData: (previousData) => previousData,
  })

  const products: Product[] = useMemo(() => {
    return data?.items ?? []
  }, [data?.items])

  const pagination = data?.pagination

  // --------------------------------------------------
  // TABLE
  // --------------------------------------------------

  const table = useTable({
    features,
    data: products,
    columns,

    onSortingChange: (updater) => {
      const nextSorting =
        typeof updater === "function" ? updater(sorting) : updater

      const next = nextSorting[0]

      updateParams({
        sortBy: next?.id,
        sortOrder: next ? (next.desc ? "desc" : "asc") : undefined,
        page: "1",
      })
    },

    onColumnVisibilityChange: setColumnVisibility,

    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  })

  // --------------------------------------------------
  // DIALOG HANDLERS
  // --------------------------------------------------

  const handleCreate = () => {
    setSelectedProduct(undefined)
    setDialogMode("create")
    setOpen(true)
  }

  // --------------------------------------------------
  // PRICE FILTER HANDLER
  // --------------------------------------------------

  const applyPriceFilter = (): boolean => {
    const min = minPriceInput.trim()
    const max = maxPriceInput.trim()

    if (
      (min && (!Number.isFinite(Number(min)) || Number(min) < 0)) ||
      (max && (!Number.isFinite(Number(max)) || Number(max) < 0))
    ) {
      return false
    }

    if (min && max && Number(min) > Number(max)) {
      return false
    }

    updateParams({
      minPrice: min || undefined,
      maxPrice: max || undefined,
      page: "1",
    })

    return true
  }

  // --------------------------------------------------
  // RESET FILTERS
  // --------------------------------------------------

  const resetFilters = () => {
    setSearch("")
    setMinPriceInput("")
    setMaxPriceInput("")

    updateParams({
      search: undefined,
      categoryId: undefined,
      brandId: undefined,
      hasDiscount: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      sortBy: undefined,
      sortOrder: undefined,
      page: "1",
    })
  }

  const hasActiveFilters =
    !!searchValue ||
    !!categoryId ||
    !!brandId ||
    !!hasDiscount ||
    !!minPrice ||
    !!maxPrice

  const total = pagination?.total ?? 0

  const currentPage = pagination?.page ?? page

  const totalPages = pagination?.totalPages ?? 1

  const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1

  const endItem = Math.min(currentPage * limit, total)

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="w-full min-w-0 space-y-4">
      {/* PRODUCT TOOLBAR */}
      <div className="space-y-4">
        {/* PRODUCT HEADER */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Products</h2>
            <p className="text-sm text-muted-foreground">
              Manage your product catalog and inventory.
            </p>
          </div>

          <Button onClick={handleCreate}>
            <Plus className="mr-2 size-4" />
            Add Product
          </Button>
        </div>

        {/* PRODUCT TOOLBAR */}
        <div className="space-y-3">
          {/* MAIN TOOLBAR */}
          <div className="flex flex-col gap-2 rounded-lg border bg-card p-2 sm:flex-row sm:items-center">
            {/* SEARCH */}
            <div className="relative min-w-0 flex-1">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search by product name..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-10 border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:border-l sm:pl-2">
              {/* FILTER BUTTON */}
              <Button
                variant={
                  filtersOpen || activeFilterCount > 0 ? "secondary" : "outline"
                }
                size="sm"
                onClick={() => setFiltersOpen((prev) => !prev)}
              >
                <SlidersHorizontal className="mr-2 size-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {activeFilterCount}
                  </span>
                )}
              </Button>

              {/* SORTING */}
              <select
                value={`${sortBy || "createdAt"}-${sortOrder}`}
                onChange={(event) => {
                  const [field, direction] = event.target.value.split("-")

                  updateParams({
                    sortBy: field,
                    sortOrder: direction,
                    page: "1",
                  })
                }}
                className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="createdAt-desc">Newest first</option>
                <option value="createdAt-asc">Oldest first</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>

              {/* COLUMN VISIBILITY */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="outline" size="sm" />}
                >
                  Columns
                  <ChevronDown className="ml-2 size-3" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuGroup>
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* EXPANDABLE FILTER PANEL */}
          {filtersOpen && (
            <div className="rounded-lg border bg-card p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {/* CATEGORY */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>

                  <select
                    value={categoryId}
                    onChange={(event) =>
                      updateFilter("categoryId", event.target.value)
                    }
                    className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                  >
                    <option value="">All Categories</option>

                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* BRAND */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Brand</label>

                  <select
                    value={brandId}
                    onChange={(event) =>
                      updateFilter("brandId", event.target.value)
                    }
                    className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                  >
                    <option value="">All Brands</option>

                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* DISCOUNT */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discount</label>

                  <select
                    value={hasDiscount}
                    onChange={(event) =>
                      updateFilter("hasDiscount", event.target.value)
                    }
                    className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                  >
                    <option value="">All Products</option>
                    <option value="true">Discounted</option>
                    <option value="false">No Discount</option>
                  </select>
                </div>

                {/* MIN PRICE */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum Price</label>

                  <Input
                    type="number"
                    min="0"
                    placeholder="Minimum"
                    value={minPriceInput}
                    onChange={(event) => setMinPriceInput(event.target.value)}
                    className="h-9"
                  />
                </div>

                {/* MAX PRICE */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Maximum Price</label>

                  <Input
                    type="number"
                    min="0"
                    placeholder="Maximum"
                    value={maxPriceInput}
                    onChange={(event) => setMaxPriceInput(event.target.value)}
                    className="h-9"
                  />
                </div>
              </div>

              {/* FILTER ACTIONS */}
              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  <RotateCcw className="mr-2 size-3.5" />
                  Reset filters
                </Button>

                <Button
                  size="sm"
                  onClick={() => {
                    if (applyPriceFilter()) {
                      setFiltersOpen(false)
                    }
                  }}
                >
                  Apply filters
                </Button>
              </div>
            </div>
          )}

          {/* ACTIVE FILTER SUMMARY */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">Active:</span>

              {categoryId && (
                <span className="rounded-md border bg-muted/50 px-2.5 py-1 text-xs">
                  {categories.find((item) => item.id === categoryId)?.name ??
                    "Category"}
                </span>
              )}

              {brandId && (
                <span className="rounded-md border bg-muted/50 px-2.5 py-1 text-xs">
                  {brands.find((item) => item.id === brandId)?.name ?? "Brand"}
                </span>
              )}

              {hasDiscount && (
                <span className="rounded-md border bg-muted/50 px-2.5 py-1 text-xs">
                  {hasDiscount === "true" ? "Discounted" : "No Discount"}
                </span>
              )}

              {(minPrice || maxPrice) && (
                <span className="rounded-md border bg-muted/50 px-2.5 py-1 text-xs">
                  Price: {minPrice || "0"} – {maxPrice || "Any"}
                </span>
              )}

              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="w-full max-w-full min-w-0 overflow-hidden rounded-md border">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-300">
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
                <ProductTableSkeleton rowCount={limit} />
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={table.getVisibleLeafColumns().length}
                    className="h-32 text-center"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-destructive">
                        Failed to load products
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {error instanceof Error
                          ? error.message
                          : "Something went wrong."}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : products.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        <table.FlexRender cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={table.getVisibleLeafColumns().length}
                    className="h-32 text-center"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">No products found</p>

                      <p className="text-sm text-muted-foreground">
                        Try changing your search or filters.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t px-4 py-4">
          {/* RESULTS */}
          <div className="text-sm text-muted-foreground">
            Showing {startItem}–{endItem} of {total} products
            {isFetching && <span className="ml-2">Updating...</span>}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* PAGE SIZE */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Rows per page
              </span>

              <select
                value={limit}
                onChange={(event) =>
                  updateParams({
                    limit: event.target.value,
                    page: "1",
                  })
                }
                className="h-8 rounded-md border bg-background px-2 text-sm"
              >
                {PAGE_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* PAGE NUMBER */}
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>

            {/* PREVIOUS */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page <= 1 || isFetching}
            >
              Previous
            </Button>

            {/* NEXT */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages || isFetching}
            >
              Next
            </Button>
          </div>
        </div>

        {/* PRODUCT DIALOG */}
        <Dialog open={open} onOpenChange={setOpen}>
          <ProductDialog
            mode={dialogMode}
            product={selectedProduct}
            onClose={() => setOpen(false)}
          />
        </Dialog>
      </div>
    </div>
  )
}
