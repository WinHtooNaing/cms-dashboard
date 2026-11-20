import { Card, CardContent } from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

import { RefreshCw } from "lucide-react"

import { useProfile } from "@/hooks/useProfile"

import { ProfileOverview } from "@/components/profile/profile-overview"
import { ProfileForm } from "@/components/profile/profile-form"
import { AccountOverview } from "@/components/profile/account-overview"

export default function ProfilePage() {
  const { data: user, isLoading, isError, refetch, isFetching } = useProfile()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-72" />
        </div>

        <Skeleton className="h-36 w-full rounded-xl" />

        <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <Skeleton className="h-96 rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    )
  }

  if (isError || !user) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
          <h2 className="text-lg font-semibold">Unable to load profile</h2>

          <p className="text-sm text-muted-foreground">
            Something went wrong while fetching your profile.
          </p>

          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCw
              className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>

        <p className="text-sm text-muted-foreground">
          Manage your personal information and account details.
        </p>
      </div>

      {/* Profile Overview */}
      <ProfileOverview user={user} />

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <ProfileForm user={user} />

        <AccountOverview user={user} />
      </div>
    </div>
  )
}
