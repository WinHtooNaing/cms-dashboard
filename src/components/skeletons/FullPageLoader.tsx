import { Loader2 } from "lucide-react"

const FullPageLoader = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
      <Loader2 className="size-10 animate-spin text-primary" />

      <div className="space-y-1 text-center">
        <p className="font-medium">Loading your account...</p>
        <p className="text-sm text-muted-foreground">
          Please wait while we prepare your experience.
        </p>
      </div>
    </div>
  )
}

export default FullPageLoader
