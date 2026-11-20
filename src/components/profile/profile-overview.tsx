import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import { CalendarDays, ShieldCheck } from "lucide-react"

import type { UserProfile } from "@/service/profile.service"

type Props = {
  user: UserProfile
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function formatRole(role: string) {
  return role.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export function ProfileOverview({ user }: Props) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
        <Avatar className="size-20">
          <AvatarFallback className="bg-primary/10 text-xl font-semibold text-primary">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>

            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">
              <ShieldCheck className="mr-1 size-3" />
              {formatRole(user.role.name)}
            </Badge>

            <Badge
              variant="outline"
              className={
                user.isActive
                  ? "border-green-500/30 bg-green-500/10 text-green-600"
                  : "border-red-500/30 bg-red-500/10 text-red-600"
              }
            >
              <span
                className={`mr-1.5 size-1.5 rounded-full ${
                  user.isActive ? "bg-green-500" : "bg-red-500"
                }`}
              />

              {user.status}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            Member since {formatDate(user.createdAt)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
