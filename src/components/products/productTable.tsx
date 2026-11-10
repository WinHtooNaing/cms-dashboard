import * as React from "react"

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

import { ChevronDown, Plus } from "lucide-react"

import { columns } from "./columns"

import { getProducts } from "@/service/product.service"

import type { Product } from "@/types/product"

import { getProductRating } from "@/util/product-meta"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Dialog, DialogTrigger } from "@/components/ui/dialog"

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
  const [sorting, setSorting] = React.useState<SortingState>([])

  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({})

  const [rowSelection, setRowSelection] = React.useState({})

  const [search, setSearch] = React.useState("")
  const [debouncedSearch, setDebouncedSearch] = React.useState("")

  const [page, setPage] = React.useState(1)
  const [limit] = React.useState(8)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 400)

    return () => clearTimeout(timer)
  }, [search])

  // Fetch products
  const { data, isLoading, isError, error, isFetching } = useQuery({
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

  const products: Product[] = React.useMemo(() => {
    return (data?.items ?? []).map((product) => ({
      ...product,
      rating: getProductRating(product.id),
    }))
  }, [data?.items])

  const pagination = data?.pagination

  // TanStack Table
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

          {/* Column Visibility */}
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

        {/* Add Product */}
        <Dialog>
          <DialogTrigger render={<Button />}>
            <Plus /> Add Product
          </DialogTrigger>

          <ProductDialog mode="create" />
        </Dialog>
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
            {isLoading ? (
              <ProductTableSkeleton rowCount={8} />
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-destructive"
                >
                  {error instanceof Error
                    ? error.message
                    : "Failed to load products."}
                </TableCell>
              </TableRow>
            ) : products.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No products found.
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
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page <= 1 || isFetching}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= (pagination?.totalPages ?? 1) || isFetching}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
