import type { LucideIcon } from "lucide-react"

import { Eye } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

interface FooterSectionCardProps {
  title: string
  icon: LucideIcon
  onView: () => void
}

const FooterSectionCard = ({
  title,
  icon: Icon,
  onView,
}: FooterSectionCardProps) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-3 text-primary">
            <Icon size={22} />
          </div>

          <div>
            <CardTitle>{title}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="mt-auto">
        <Button type="button" className="w-full" onClick={onView}>
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
      </CardContent>
    </Card>
  )
}

export default FooterSectionCard
