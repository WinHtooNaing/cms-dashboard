import ProductTable from "../../components/products/productTable"
const Products = () => {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-2 pt-4 sm:pt-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your products data
          </p>
        </div>
      </div>
      <ProductTable />
    </div>
  )
}

export default Products
