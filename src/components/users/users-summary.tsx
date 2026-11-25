import { Users, ShieldCheck, UserRound, UserCog } from "lucide-react"

import type { User } from "@/types/user"

import { Card, CardContent } from "@/components/ui/card"

type UsersSummaryProps = {
  totalUsers: number
  users: User[]
}

export function UsersSummary({ totalUsers, users }: UsersSummaryProps) {
  const adminCount = users.filter((user) => user.role.name === "ADMIN").length

  const staffCount = users.filter((user) => user.role.name === "STAFF").length

  const customerCount = users.filter(
    (user) => user.role.name === "CUSTOMER"
  ).length

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Users"
        value={totalUsers}
        icon={<Users className="size-5" />}
      />

      <SummaryCard
        title="Administrators"
        value={adminCount}
        icon={<ShieldCheck className="size-5" />}
      />

      <SummaryCard
        title="Staff"
        value={staffCount}
        icon={<UserCog className="size-5" />}
      />

      <SummaryCard
        title="Customers"
        value={customerCount}
        icon={<UserRound className="size-5" />}
      />
    </div>
  )
}

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string
  value: number
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-5">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>

        <div className="rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
      </CardContent>
    </Card>
  )
}
