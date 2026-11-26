import { createColumnHelper } from "@tanstack/react-table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { type DataTableFeatures } from "./data-table-features"
import type { Carousel } from "@/types/carousel"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Pencil, Trash2 } from "lucide-react"
// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Carousel>()

export const getCarouselColumns = (
  onEdit: (carousel: Carousel) => void,
  onDelete: (carousel: Carousel) => void
) =>
  columnHelper.columns([
    columnHelper.display({
      id: "no",
      header: "No",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: ({ getValue }) => (
        <Tooltip>
          <TooltipTrigger>
            <span className="line-clamp-1 max-w-48">{getValue()}</span>
          </TooltipTrigger>
          <TooltipContent>
            <span>{getValue()}</span>
          </TooltipContent>
        </Tooltip>
      ),
    }),
    columnHelper.accessor("imageUrl", {
      header: "Image",
      cell: ({ getValue, row }) => (
        <img
          src={getValue()}
          alt={row.original.title}
          className="h-16 w-24 rounded-md object-cover"
        />
      ),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: ({ getValue }) => (
        <Tooltip>
          <TooltipTrigger>
            <span className="line-clamp-2 max-w-72">{getValue()}</span>
          </TooltipTrigger>
          <TooltipContent>
            <span>{getValue()}</span>
          </TooltipContent>
        </Tooltip>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" aria-label="Carousel actions">
                <MoreVertical className="size-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              <Pencil className="size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDelete(row.original)}
            >
              <Trash2 className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }),
  ])
