import { Link } from "react-router-dom"
import { ShieldX, ArrowLeft } from "lucide-react"

export default function AccessDeniedPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 rounded-full bg-destructive/10 p-5">
        <ShieldX className="h-12 w-12 text-destructive" />
      </div>

      <h1 className="text-3xl font-bold tracking-tight">Access Denied</h1>

      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        You don't have permission to access this page. Please contact your
        administrator if you believe this is a mistake.
      </p>

      <Link
        to="/overview"
        className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>
    </div>
  )
}
