import BrandDataTable from "@/components/brands/BrandDataTable"

const BrandPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Brands</h1>
        <p className="text-muted-foreground">Manage product brands</p>
      </div>
      <BrandDataTable />
    </div>
  )
}

export default BrandPage
