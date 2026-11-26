import { useCallback, useMemo } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { getCmsCategoryColumns } from "@/components/home/category/columns"
import { DataTable } from "@/components/home/category/data-table"
import {
  addCmsCategory,
  deleteCmsCategoryItem,
  getCmsCategory,
  type CmsCategoryItem,
} from "@/service/cms.category.service"
import { getCategories } from "@/service/category.service"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import CmsCategoryTableSkeleton from "@/components/skeletons/CmsCategoryTableSkeleton"

const CATEGORY_SECTION_ID = import.meta.env.VITE_CATEGORY

const getCategoryIdFromItem = (item: CmsCategoryItem): string | null => {
  const { content } = item
  if (!content) return null
  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content) as { category?: string }
      return parsed.category ?? null
    } catch {
      return null
    }
  }
  return content.category ?? null
}

const Category = () => {
  const queryClient = useQueryClient()

  const {
    data: categories = [],
    isPending: isCategoriesPending,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["cms-category-options"],
    queryFn: getCategories,
  })

  const {
    data: categoryData,
    isPending: isItemsPending,
    isError: isItemsError,
  } = useQuery({
    queryKey: ["cms-category-items", CATEGORY_SECTION_ID],
    queryFn: () => getCmsCategory(CATEGORY_SECTION_ID),
  })

  const items = useMemo(() => categoryData?.data ?? [], [categoryData])
  const itemByCategoryId = useMemo(() => {
    const map = new Map<string, CmsCategoryItem>()
    for (const item of items) {
      const categoryId = getCategoryIdFromItem(item)
      if (categoryId) map.set(categoryId, item)
    }
    return map
  }, [items])
  const selectedCategoryIds = useMemo(
    () => new Set(itemByCategoryId.keys()),
    [itemByCategoryId]
  )

  const addMutation = useMutation({
    mutationFn: async (categoryId: string) => {
      const maxPosition = items.reduce(
        (max, item) => Math.max(max, Number(item.position) || 0),
        0
      )
      const formData = new FormData()
      formData.append("position", String(maxPosition + 1))
      formData.append("content", JSON.stringify({ category: categoryId }))
      return addCmsCategory(CATEGORY_SECTION_ID, formData)
    },
    onSuccess: () => {
      toast.success("Home page categories updated")
      queryClient.invalidateQueries({
        queryKey: ["cms-category-items", CATEGORY_SECTION_ID],
      })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add home page category"
      )
    },
  })

  const removeMutation = useMutation({
    mutationFn: async (categoryId: string) => {
      const item = itemByCategoryId.get(categoryId)
      if (!item) throw new Error("Home page category item not found.")
      return deleteCmsCategoryItem(item.id)
    },
    onSuccess: () => {
      toast.success("Home page categories updated")
      queryClient.invalidateQueries({
        queryKey: ["cms-category-items", CATEGORY_SECTION_ID],
      })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to remove home page category"
      )
    },
  })

  const isBusy = addMutation.isPending || removeMutation.isPending
  const handleToggle = useCallback(
    (categoryId: string, checked: boolean) => {
      if (checked) {
        if (itemByCategoryId.has(categoryId)) return
        addMutation.mutate(categoryId)
      } else {
        if (!itemByCategoryId.has(categoryId)) return
        removeMutation.mutate(categoryId)
      }
    },
    [itemByCategoryId, addMutation, removeMutation]
  )

  const columns = useMemo(
    () => getCmsCategoryColumns(selectedCategoryIds, handleToggle, isBusy),
    [selectedCategoryIds, handleToggle, isBusy]
  )

  const isPending = isCategoriesPending || isItemsPending
  const hasError = isCategoriesError || isItemsError

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 pt-4 sm:pt-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Home Page Categories
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose the categories to display on the home page.
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
                <CmsCategoryTableSkeleton rowCount={5} />
              </TableBody>
            </Table>
          </div>
        ) : hasError ? (
          <div className="rounded-md border p-6 text-center text-sm text-destructive">
            Failed to load home page categories.
          </div>
        ) : (
          <DataTable columns={columns} data={categories} />
        )}
      </div>
    </div>
  )
}

export default Category
