import { createColumnHelper } from "@tanstack/react-table"
import type { Product } from "@/types/product"
import { Eye, EyeOffIcon, MoreHorizontal, SquarePen } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog } from "@/components/ui/dialog"

import ProductDialog from "./ProductDialog"

import { features } from "./product-table-features"
import DeleteDialog from "../deleteDialog/DeleteDialog"
function ProductActions({ product }: { product: Product }) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
          <MoreHorizontal className="size-5" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuGroup>
            <DropdownMenuItem
              render={
                <Link to={`/products/${product.id}`}>
                  <Eye className="mr-2 size-4" />
                  View
                </Link>
              }
            />

            <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
              <SquarePen className="mr-2 size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => DeleteDialog}>
              <EyeOffIcon className="mr-2 size-4" />
              InActive
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <ProductDialog
          mode="update"
          product={product}
          onClose={() => setIsEditOpen(false)}
        />
      </Dialog>
    </>
  )
}
const columnHelper = createColumnHelper<typeof features, Product>()

export const columns = columnHelper.columns([
  // Number
  columnHelper.display({
    id: "NO",
    header: () => <p>NO</p>,
    cell: ({ row }) => <p>{row.index + 1}</p>,
    enableHiding: false,
  }),

  // Product Name
  columnHelper.accessor("name", {
    header: "Product Name",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  }),

  // Description
  columnHelper.accessor("description", {
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-50 truncate" title={row.original.description}>
        {row.original.description}
      </div>
    ),
  }),

  // Category
  columnHelper.display({
    id: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.original.category?.name ?? "Unknown"}</div>,
  }),

  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => {
      return row.original.brand?.name ?? "Unknown"
    },
  },

  // Price
  columnHelper.accessor("price", {
    header: "Price",
    cell: ({ row }) => (
      <div className="font-medium">
        {Number(row.original.price).toLocaleString()} Ks
      </div>
    ),
  }),

  // Stock
  columnHelper.display({
    id: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const quantity = row.original.stock?.availableQuantity ?? 0

      return (
        <div
          className={
            quantity <= 10
              ? "font-medium text-red-500"
              : "font-medium text-green-600"
          }
        >
          {quantity}
        </div>
      )
    },
  }),

  // Actions
  columnHelper.display({
    id: "actions",
    header: () => <p>Actions</p>,
    enableHiding: false,
    cell: ({ row }) => <ProductActions product={row.original} />,
  }),
])
