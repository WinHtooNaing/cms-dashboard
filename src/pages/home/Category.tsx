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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImagePlus, Pencil, Plus, Trash2 } from "lucide-react"

type CategoryItem = {
  id: number
  name: string
  image: string
}

const initialCategories: CategoryItem[] = [
  {
    id: 1,
    name: "Iphone",
    image:
      "https://www.apple.com/v/iphone-duo/d/images/overview/highlights/display__bx48n0ntsgvm_large_2x.jpg",
  },
  {
    id: 2,
    name: "Macbook",
    image:
      "https://anycallmobilemm.com/wp-content/uploads/2026/05/Macbook-Air-15-M5-Cover.webp",
  },
  {
    id: 3,
    name: "Huawei",
    image:
      "https://anycallmobilemm.com/wp-content/uploads/2026/02/Huawei-Mate-X7-Cover.webp",
  },
]

export default function Category() {
  const categories = initialCategories

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-1 text-sm font-medium text-primary">
            Home / Category
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create easy-to-manage collections.
          </p>
        </div>
        <Dialog>
          <DialogTrigger render={<Button className="w-full md:w-auto" />}>
            <Plus />
            Add category
          </DialogTrigger>
          <CategoryDialog mode="create" />
        </Dialog>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>All categories</CardTitle>
          <CardDescription>
            {categories.length} categories in your catalog
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-[70px_minmax(120px,1fr)_minmax(160px,2fr)_90px] gap-4 border-b bg-muted/30 px-6 py-3 text-xs font-medium text-muted-foreground">
            <span>ID</span>
            <span>Name</span>
            <span>Image</span>
            <span className="text-right">Actions</span>
          </div>
          <div className="divide-y">
            {categories.map((category) => (
              <div
                key={category.id}
                className="grid grid-cols-[70px_minmax(120px,1fr)_minmax(160px,2fr)_90px] items-center gap-4 px-6 py-4"
              >
                <span className="text-sm text-muted-foreground">
                  {category.id}
                </span>
                <span className="font-medium">{category.name}</span>
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-14 w-24 rounded-md object-cover"
                />
                <div className="flex justify-end gap-1">
                  <Dialog>
                    <DialogTrigger
                      render={<Button variant="ghost" size="icon-sm" />}
                    >
                      <Pencil />
                      <span className="sr-only">Update {category.name}</span>
                    </DialogTrigger>
                    <CategoryDialog mode="update" category={category} />
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    aria-label={`Delete ${category.name}`}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CategoryDialog({
  mode,
  category,
}: {
  mode: "create" | "update"
  category?: CategoryItem
}) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {mode === "create" ? "Create category" : "Update category"}
        </DialogTitle>
        <DialogDescription>
          Category data contains only ID, name, and image.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-2">
        <div className="space-y-2">
          <Label htmlFor={`${mode}-id`}>ID</Label>
          <Input
            id={`${mode}-id`}
            value={category?.id ?? "Auto generated"}
            readOnly
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${mode}-name`}>Name</Label>
          <Input
            id={`${mode}-name`}
            defaultValue={category?.name}
            placeholder="Category name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${mode}-image`}>Image</Label>
          <div className="flex items-center gap-3">
            <div className="flex size-16 items-center justify-center overflow-hidden rounded-lg border bg-muted">
              {category?.image ? (
                <img
                  src={category.image}
                  alt=""
                  className="size-full object-cover"
                />
              ) : (
                <ImagePlus className="size-5 text-muted-foreground" />
              )}
            </div>
            <Input
              id={`${mode}-image`}
              defaultValue={category?.image}
              placeholder="Image URL"
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
        <Button type="button">{mode === "create" ? "Create" : "Update"}</Button>
      </DialogFooter>
    </DialogContent>
  )
}
