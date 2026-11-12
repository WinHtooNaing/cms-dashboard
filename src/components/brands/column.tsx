import { createColumnHelper } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { BrandTableFeatures } from "./data-table-features"
import type { BrandTableRow } from "@/types/brand"

export type BrandTableRowWithActions = BrandTableRow

const columnHelper = createColumnHelper<
  BrandTableFeatures,
  BrandTableRowWithActions
>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "no",
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  }),
  columnHelper.accessor("slug", {
    header: "Slug",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.slug}</span>
    ),
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: ({ row }) => (
      <span className="block truncate text-sm">
        {row.original.description ?? "-"}
      </span>
    ),
  }),
  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => <span>{formatDate(row.original.createdAt)}</span>,
  }),
  columnHelper.display({
    id: "actions",
    header: "Action",
  }),
])
