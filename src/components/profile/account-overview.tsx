import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { CalendarDays, Clock, ShieldCheck, CircleCheck } from "lucide-react"

import type { UserProfile } from "@/service/profile.service"

type Props = {
  user: UserProfile
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export function AccountOverview({ user }: Props) {
  const accountDetails = [
    {
      label: "Account Role",
      value: user.role.name,
      icon: ShieldCheck,
    },
    {
      label: "Account Status",
      value: user.status,
      icon: CircleCheck,
    },
    {
      label: "Member Since",
      value: formatDate(user.createdAt),
      icon: CalendarDays,
    },
    {
      label: "Last Updated",
      value: formatDate(user.updatedAt),
      icon: Clock,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>

        <CardDescription>Information about your account.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {accountDetails.map((item, index) => {
          const Icon = item.icon

          return (
            <div
              key={item.label}
              className={
                index !== accountDetails.length - 1
                  ? "flex items-start gap-3 border-b pb-4"
                  : "flex items-start gap-3"
              }
            >
              <div className="rounded-md bg-muted p-2">
                <Icon className="size-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 space-y-1">
                <p className="text-xs text-muted-foreground">{item.label}</p>

                <p className="wrap-break text-sm font-medium">{item.value}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
