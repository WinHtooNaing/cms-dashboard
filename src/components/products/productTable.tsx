import { useState, useEffect, useMemo } from "react"
import {
  columnVisibilityFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
  type ColumnVisibilityState,
  type SortingState,
} from "@tanstack/react-table"
import ProductTableSkeleton from "@/components/skeletons/ProductTableSkeleton"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { ChevronDown, Plus } from "lucide-react"

import { columns } from "./columns"

import { getProducts } from "@/service/product.service"

import type { Product } from "@/types/product"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Dialog } from "@/components/ui/dialog"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import ProductDialog from "@/components/products/ProductDialog"
const features = tableFeatures({
  columnVisibilityFeature,
  rowSelectionFeature,
  rowSortingFeature,
})
export default function ProductTable() {
  const [open, setOpen] = useState(false)

  const [dialogMode, setDialogMode] = useState<"create" | "update">("create")

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()
  const [sorting, setSorting] = useState<SortingState>([])

  const [columnVisibility, setColumnVisibility] =
    useState<ColumnVisibilityState>({})

  const [rowSelection, setRowSelection] = useState({})

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const [searchParams, setSearchParams] = useSearchParams()

  const page = Math.max(1, Number(searchParams.get("page")) || 1)

  const limit = 8

  const setPage = (newPage: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)

      params.set("page", String(Math.max(1, newPage)))

      return params
    })
  }

  const handleCreate = () => {
    setSelectedProduct(undefined)
    setDialogMode("create")
    setOpen(true)
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 400)

    return () => clearTimeout(timer)
  }, [search])

  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ["products", page, limit, debouncedSearch, sorting],

    queryFn: () =>
      getProducts({
        page,
        limit,

        search: debouncedSearch || undefined,

        sortBy:
          sorting[0]?.id === "name"
            ? "name"
            : sorting[0]?.id === "price"
              ? "price"
              : "createdAt",

        sortOrder: sorting[0]?.desc ? "desc" : "asc",
      }),

    placeholderData: (previousData) => previousData,
  })

  const products: Product[] = useMemo(() => {
    return (data?.items ?? []).map((product) => ({
      ...product,
    }))
  }, [data?.items])

  const pagination = data?.pagination

  const table = useTable({
    features,
    data: products,
    columns,

    onSortingChange: (updater) => {
      setSorting(updater)
      setPage(1)
    },

    onColumnVisibilityChange: setColumnVisibility,

    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex justify-between gap-2 py-4 max-sm:flex-col">
        <div className="flex gap-2 max-sm:flex-col">
          {/* Search */}
          <Input
            placeholder="Search Products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="sm:max-w-sm"
          />

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              Columns <ChevronDown />
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

        <Button onClick={handleCreate}>
          <Plus /> Add Product
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border">
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
              <ProductTableSkeleton rowCount={8} />
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
                      Try changing your search keywords.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Showing {products.length} of {pagination?.total ?? 0} products
          {isFetching && <span className="ml-2">Updating...</span>}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Page {pagination?.page ?? 1} of {pagination?.totalPages ?? 1}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page <= 1 || isFetching}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={page >= (pagination?.totalPages ?? 1) || isFetching}
          >
            Next
          </Button>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <ProductDialog
          mode={dialogMode}
          product={selectedProduct}
          onClose={() => setOpen(false)}
        />
      </Dialog>
    </div>
  )
}
