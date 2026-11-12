import { Card, CardContent } from "@/components/ui/card"
const OverviewCard = ({
  title,
  value,
  icon,
}: {
  title: string
  value: number
  icon: React.ReactNode
}) => {
  return (
    <Card className="shadow-none">
      <CardContent className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="text-xl font-semibold">
            {value.toString().padStart(2, "0")}
          </h2>
        </div>

        <div className="rounded-lg bg-primary/10 p-1 text-primary">{icon}</div>
      </CardContent>
    </Card>
  )
}
export default OverviewCard
