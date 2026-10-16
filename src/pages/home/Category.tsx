import CategoryDialog from "@/components/home/CategoryDialog"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pencil, Plus, Trash2 } from "lucide-react"

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
    name: "Mac book",
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
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead>No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Image</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell className="text-sm text-muted-foreground">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-14 w-24 rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Dialog>
                        <DialogTrigger
                          render={<Button variant="ghost" size="icon-sm" />}
                        >
                          <Pencil />
                          <span className="sr-only">
                            Update {category.name}
                          </span>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
