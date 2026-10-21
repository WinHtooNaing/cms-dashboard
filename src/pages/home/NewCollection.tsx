import { Button } from "@/components/ui/button"
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
import { categories, details } from "@/data/categories"
import { Eye, Plus, Save } from "lucide-react"

const NewCollection = () => {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-1 text-sm font-medium text-primary">
            Home / Related Products
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Related Products
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your Related Products
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger render={<Button />}>
              <Plus /> Add details
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Choose home products details</DialogTitle>
                <DialogDescription>
                  Select products details that you want to show on the home page
                </DialogDescription>
              </DialogHeader>
              <div className="grid max-h-[55vh] gap-2 overflow-y-auto">
                {details.map((category) => (
                  <label
                    key={category.id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border p-2 transition-colors hover:bg-muted/50"
                  >
                    <input
                      type="checkbox"
                      className="size-4 accent-primary"
                      checked={category.visible}
                    />

                    <span className="text-sm font-medium">
                      {category.title}
                    </span>
                  </label>
                ))}
              </div>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>
                  Cancel
                </DialogClose>
                <DialogClose render={<Button />}>Save selection</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger render={<Button />}>
              <Eye /> See Related Product
            </DialogTrigger>
            <DialogContent className="max-w-4xl min-w-[60%]">
              <DialogHeader>
                <DialogTitle>Related Product preview</DialogTitle>
                <DialogDescription>
                  How your related products can look on the home page.
                </DialogDescription>
              </DialogHeader>
              <div className="grid max-h-[70vh] grid-cols-3 gap-3 overflow-y-auto md:grid-cols-5">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="overflow-hidden rounded-xl border bg-card"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="aspect-square w-full object-cover"
                    />
                    <p className="p-2 text-sm font-medium">{category.name}</p>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger render={<Button />}>
              <Save /> Choose for home
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Choose home related products</DialogTitle>
                <DialogDescription>
                  Select the related products customers should see on the home
                  page.
                </DialogDescription>
              </DialogHeader>
              <div className="grid max-h-[55vh] gap-2 overflow-y-auto">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border p-2 transition-colors hover:bg-muted/50"
                  >
                    <input type="checkbox" className="size-4 accent-primary" />
                    <img
                      src={category.image}
                      alt=""
                      className="size-10 rounded-md object-cover"
                    />
                    <span className="text-sm font-medium">{category.name}</span>
                  </label>
                ))}
              </div>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>
                  Cancel
                </DialogClose>
                <DialogClose render={<Button />}>Save selection</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>All related products</CardTitle>
          <CardDescription>
            {categories.length} related products in your catalog ·{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden py-0">
              <img
                src={category.image}
                alt={category.name}
                className="aspect-4/3 w-full object-cover"
              />
              <div className="flex items-center justify-between gap-2 p-3">
                <div>
                  <p className="font-medium">{category.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Hidden from home
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </CardContent>
        <div className="flex flex-col items-center justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>1</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
    </div>
  )
}

export default NewCollection
