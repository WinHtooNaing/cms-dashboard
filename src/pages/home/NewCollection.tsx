import { useCallback, useMemo } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { getNewCollectionColumns } from "@/components/home/new-collection/columns"
import { DataTable } from "@/components/home/new-collection/data-table"
import {
  addNewCollection,
  deleteNewCollectionItem,
  getNewCollection,
  getNewCollectionProduct,
  type NewCollectionItem,
} from "@/service/new-collection.service"
import NewCollectionTableSkeleton from "@/components/skeletons/NewCollectionTableSkeleton"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Product } from "@/types/product"

const NEW_COLLECTION_SECTION_ID = import.meta.env.VITE_COLLECTION

const getProductIdFromItem = (item: NewCollectionItem): string | null => {
  const content = item.content
  if (!content) return null
  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content) as { productId?: string }
      return parsed.productId ?? null
    } catch {
      return null
    }
  }
  return content.productId ?? null
}

const NewCollection = () => {
  const queryClient = useQueryClient()

  const { data: productsData, isPending: isProductsPending } = useQuery({
    queryKey: ["new-collection-products"],
    queryFn: getNewCollectionProduct,
  })

  const { data: collectionData, isPending: isCollectionPending } = useQuery({
    queryKey: ["new-collection-items", NEW_COLLECTION_SECTION_ID],
    queryFn: () => getNewCollection(NEW_COLLECTION_SECTION_ID),
    enabled: Boolean(NEW_COLLECTION_SECTION_ID),
  })

  const products: Product[] = useMemo(
    () => productsData?.items ?? [],
    [productsData]
  )
  const items = useMemo(() => collectionData?.data ?? [], [collectionData])

  const itemByProductId = useMemo(() => {
    const map = new Map<string, NewCollectionItem>()
    for (const item of items) {
      const productId = getProductIdFromItem(item)
      if (productId) map.set(productId, item)
    }
    return map
  }, [items])

  const selectedProductIds = useMemo(
    () => new Set(itemByProductId.keys()),
    [itemByProductId]
  )

  const addMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (!NEW_COLLECTION_SECTION_ID) {
        throw new Error("New Collection section ID is not configured.")
      }
      const maxPosition = items.reduce(
        (max, item) => Math.max(max, Number(item.position) || 0),
        0
      )
      const formData = new FormData()
      formData.append("position", String(maxPosition + 1))
      formData.append("content", JSON.stringify({ productId }))
      return addNewCollection(NEW_COLLECTION_SECTION_ID, formData)
    },
    onSuccess: () => {
      toast.success("New collection updated")
      queryClient.invalidateQueries({
        queryKey: ["new-collection-items", NEW_COLLECTION_SECTION_ID],
      })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add to new collection"
      )
    },
  })

  const removeMutation = useMutation({
    mutationFn: async (productId: string) => {
      const item = itemByProductId.get(productId)
      if (!item) throw new Error("New collection item not found.")
      return deleteNewCollectionItem(item.id)
    },
    onSuccess: () => {
      toast.success("New collection updated")
      queryClient.invalidateQueries({
        queryKey: ["new-collection-items", NEW_COLLECTION_SECTION_ID],
      })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to remove from new collection"
      )
    },
  })

  const isBusy = addMutation.isPending || removeMutation.isPending

  const handleToggle = useCallback(
    (productId: string, checked: boolean) => {
      if (!NEW_COLLECTION_SECTION_ID) {
        toast.error("New Collection section ID is not configured.")
        return
      }
      if (checked) {
        if (itemByProductId.has(productId)) return
        addMutation.mutate(productId)
      } else {
        if (!itemByProductId.has(productId)) return
        removeMutation.mutate(productId)
      }
    },
    [itemByProductId, addMutation, removeMutation]
  )

  const columns = useMemo(
    () => getNewCollectionColumns(selectedProductIds, handleToggle, isBusy),
    [selectedProductIds, handleToggle, isBusy]
  )

  const isPending = isProductsPending || isCollectionPending

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 pt-4 sm:pt-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            New Collections
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your New Collections
          </p>
        </div>
      </div>
      <div>
        {isPending ? (
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Select</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <NewCollectionTableSkeleton rowCount={5} />
              </TableBody>
            </Table>
          </div>
        ) : (
          <DataTable columns={columns} data={products} />
        )}
      </div>
    </div>
  )
}

export default NewCollection
