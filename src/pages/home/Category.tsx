import CategoryDialog from "@/components/home/CategoryDialog"
import { Button } from "@/components/ui/button"
import type { Category as CategoryType } from "@/types/category"
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/service/category.service"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination"

import { Eye, Pencil, Plus, Save, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import axios from "axios"

const Category = () => {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  )
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)

  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 8

  const totalPages = Math.ceil(categories.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage

  const endIndex = startIndex + itemsPerPage

  const currentCategories = categories.slice(startIndex, endIndex)
  async function handleUpdateCategory(formData: FormData) {
    if (!selectedCategory) return

    await updateCategory(selectedCategory.id, formData)

    setIsUpdateOpen(false)

    setSelectedCategory(null)

    await fetchCategories()
  }
  async function handleDeleteCategory() {
    if (!selectedCategory) return

    try {
      setIsDeleting(true)

      await deleteCategory(selectedCategory.id)

      setCategories((prev) =>
        prev.filter((category) => category.id !== selectedCategory.id)
      )

      const remainingCategories = categories.length - 1
      const newTotalPages = Math.ceil(remainingCategories / itemsPerPage)

      setCurrentPage((prev) => Math.min(prev, Math.max(1, newTotalPages)))

      toast.success("Category deleted successfully")

      setIsDeleteOpen(false)
      setSelectedCategory(null)
    } catch (error) {
      console.error("Failed to delete category:", error)

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message

        toast.error(
          Array.isArray(message)
            ? message.join(", ")
            : message || "Failed to delete category"
        )
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } finally {
      setIsDeleting(false)
    }
  }
  async function fetchCategories() {
    try {
      setIsLoading(true)
      setError(null)

      console.log("Fetching categories...")

      const data = await getCategories()

      console.log("Categories fetched successfully:", data)

      setCategories(data)
    } catch (error) {
      console.error("Failed to fetch categories:", error)

      if (axios.isAxiosError(error)) {
        console.error("Status:", error.response?.status)
        console.error("Backend response:", error.response?.data)
      }

      setError(
        error instanceof Error ? error : new Error("Failed to fetch categories")
      )

      toast.error("Failed to load categories")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  async function handleCreateCategory(formData: FormData) {
    await createCategory(formData)

    setIsCreateOpen(false)

    setCurrentPage(1)

    await fetchCategories()
  }
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 pt-4 sm:pt-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your catalog and choose
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger render={<Button />}>
              <Eye /> See category
            </DialogTrigger>
            <DialogContent className="max-w-4xl min-w-[60%]">
              <DialogHeader>
                <DialogTitle>Category preview</DialogTitle>
                <DialogDescription>
                  How your categories can look on the home page.
                </DialogDescription>
              </DialogHeader>
              {/* <div className="grid max-h-[70vh] grid-cols-3 gap-3 overflow-y-auto md:grid-cols-5">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="overflow-hidden rounded-xl border bg-card"
                  >
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="aspect-square w-full object-cover"
                    />
                    <p className="p-2 text-sm font-medium">{category.name}</p>
                  </div>
                ))}
              </div> */}
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger render={<Button />}>
              <Save /> Choose for home
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Choose home categories</DialogTitle>
                <DialogDescription>
                  Select the categories customers should see on the home page.
                </DialogDescription>
              </DialogHeader>
              {/* <div className="grid max-h-[55vh] gap-2 overflow-y-auto">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border p-2 transition-colors hover:bg-muted/50"
                  >
                    <input type="checkbox" className="size-4 accent-primary" />
                    <img
                      src={category.imageUrl}
                      alt=""
                      className="size-10 rounded-md object-cover"
                    />
                    <span className="text-sm font-medium">{category.name}</span>
                  </label>
                ))}
              </div> */}
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>
                  Cancel
                </DialogClose>
                <DialogClose render={<Button />}>Save selection</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger render={<Button />}>
              <Plus />
              Add category
            </DialogTrigger>

            <CategoryDialog mode="create" onSave={handleCreateCategory} />
          </Dialog>
        </div>
      </div>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>All categories</CardTitle>
          <CardDescription>
            {categories.length} categories in your catalog ·
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!isLoading && error && (
            <div className="col-span-full flex flex-col items-center gap-3 py-12">
              <p className="text-sm text-destructive">{error.message}</p>

              <Button variant="outline" onClick={fetchCategories}>
                Try again
              </Button>
            </div>
          )}

          {!isLoading && !error && categories.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No categories found.
            </div>
          )}

          {!isLoading &&
            currentCategories.map((category) => (
              <Card key={category.id} className="overflow-hidden py-0">
                {category.imageUrl ? (
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="aspect-4/3 w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-4/3 w-full items-center justify-center bg-muted text-sm text-muted-foreground">
                    No image available
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 p-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{category.name}</p>

                    <p className="text-xs text-muted-foreground">
                      {category.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Update ${category.name}`}
                      onClick={() => {
                        setSelectedCategory(category)
                        setIsUpdateOpen(true)
                      }}
                    >
                      <Pencil />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-destructive hover:text-destructive"
                      aria-label={`Delete ${category.name}`}
                      onClick={() => {
                        setSelectedCategory(category)
                        setIsDeleteOpen(true)
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Delete Category</DialogTitle>

                <DialogDescription>
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-foreground">
                    {selectedCategory?.name}
                  </span>
                  ?
                  <br />
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDeleteOpen(false)
                    setSelectedCategory(null)
                  }}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>

                <Button
                  variant="destructive"
                  onClick={handleDeleteCategory}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog
            open={isUpdateOpen}
            onOpenChange={(open) => {
              setIsUpdateOpen(open)

              if (!open) {
                setSelectedCategory(null)
              }
            }}
          >
            {selectedCategory && (
              <CategoryDialog
                mode="update"
                category={selectedCategory}
                onSave={handleUpdateCategory}
              />
            )}
          </Dialog>
        </CardContent>
        {!isLoading && !error && totalPages > 1 && (
          <div className="flex justify-center pb-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Card>
    </div>
  )
}

export default Category
