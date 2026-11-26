import { createColumnHelper } from "@tanstack/react-table"
import type { Product } from "@/types/product"
import { type DataTableFeatures } from "./data-table-features"
import { Switch } from "@/components/ui/switch"

const columnHelper = createColumnHelper<DataTableFeatures, Product>()

export const getNewCollectionColumns = (
  selectedProductIds: Set<string>,
  onToggle: (productId: string, checked: boolean) => void,
  isBusy?: boolean
) =>
  columnHelper.columns([
    columnHelper.accessor("name", {
      header: "Name",
      cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
    }),
    columnHelper.accessor("imageUrl", {
      header: "Image",
      cell: ({ getValue, row }) => {
        const src = getValue()
        return src ? (
          <img
            src={src}
            alt={row.original.name}
            className="h-16 w-16 rounded-md object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
            No image
          </div>
        )
      },
    }),
    columnHelper.display({
      id: "enabled",
      header: "Select",
      cell: ({ row }) => (
        <Switch
          checked={selectedProductIds.has(row.original.id)}
          disabled={isBusy}
          onCheckedChange={(checked) =>
            onToggle(row.original.id, checked === true)
          }
          aria-label={`Toggle ${row.original.name}`}
        />
      ),
    }),
  ])
