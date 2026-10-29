import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table"
import { Eye, MoreHorizontal, SquarePen, Trash } from "lucide-react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import ProductDialog from "./ProductDialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { type Product } from "@/data/categories"
import { Link } from "react-router-dom"

const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})
console.log(features)
const columnHelper = createColumnHelper<typeof features, Product>()

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "NO",
    header: () => <p>NO</p>,
    cell: ({ row }) => <p>{row.index + 1}</p>,
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("name", {
    header: "Product Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: ({ row }) => (
      <div>{(row.getValue("description") as string).slice(0, 20)}...</div>
    ),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  }),
  columnHelper.accessor("brand", {
    header: "Brand",
    cell: ({ row }) => <div>{row.getValue("brand")}</div>,
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: ({ row }) => <div>{row.getValue("price")} (ks)</div>,
  }),
  columnHelper.accessor("stock", {
    header: "stock",
    cell: ({ row }) => (
      <div
        className={row.getValue<number>("stock") <= 10 ? "text-red-500" : ""}
      >
        {row.getValue("stock")}
      </div>
    ),
  }),
  columnHelper.accessor("rating", {
    header: "Rating",
    cell: ({ row }) => <div>{row.getValue("rating")}</div>,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <p>Actions</p>,
    enableHiding: false,

    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-30">
            <DropdownMenuGroup>
              <Link to={`/products/${row.original.id}`}>
                <DropdownMenuItem>
                  <Eye /> View
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                render={
                  <Dialog>
                    <DialogTrigger>
                      <div className="flex items-center gap-2 px-2 text-sm">
                        <SquarePen className="size-4" />
                        Edit
                      </div>
                    </DialogTrigger>
                    <ProductDialog mode="update" product={row.original} />
                  </Dialog>
                }
              />

              <DropdownMenuItem className="text-destructive">
                <Trash />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
])
