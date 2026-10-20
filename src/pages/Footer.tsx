import { Button } from "@/components/ui/button"
import {
  ExternalLink,
  FileText,
  Headset,
  LinkIcon,
  Mail,
  Pencil,
  Plus,
} from "lucide-react"

const Footer = () => {
  return (
    <div className="lg:p- min-h-screen space-y-6 bg-background p-4 md:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Footer Management
            </h1>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage the content displayed in your website footer.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-primary" />
          Footer Settings
        </div>
      </div>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground">
          MANAGE FOOTER CONTENT
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Button
            variant="outline"
            className="h-auto justify-start gap-3 px-4 py-4"
          >
            <FileText className="h-5 w-5 shrink-0 text-primary" />

            <span className="text-left">
              <span className="block font-semibold">Description</span>
              <span className="mt-1 block text-xs font-normal text-muted-foreground">
                Edit website text
              </span>
            </span>

            <Pencil className="ml-auto h-4 w-4 text-muted-foreground" />
          </Button>

          <Button
            variant="outline"
            className="h-auto justify-start gap-3 px-4 py-4"
          >
            <Headset className="h-5 w-5 shrink-0 text-primary" />

            <span className="text-left">
              <span className="block font-semibold">Support Links</span>
              <span className="mt-1 block text-xs font-normal text-muted-foreground">
                links
              </span>
            </span>

            <Plus className="ml-auto h-4 w-4 text-muted-foreground" />
          </Button>

          <Button
            variant="outline"
            className="h-auto justify-start gap-3 px-4 py-4"
          >
            <Mail className="h-5 w-5 shrink-0 text-primary" />

            <span className="text-left">
              <span className="block font-semibold">Contact Info</span>
              <span className="mt-1 block text-xs font-normal text-muted-foreground">
                Email, phone,...
              </span>
            </span>

            <Pencil className="ml-auto h-4 w-4 text-muted-foreground" />
          </Button>

          <Button
            variant="outline"
            className="h-auto justify-start gap-3 px-4 py-4"
          >
            <LinkIcon className="h-5 w-5 shrink-0 text-primary" />

            <span className="text-left">
              <span className="block font-semibold">Social Links</span>
              <span className="mt-1 block text-xs font-normal text-muted-foreground">
                platforms
              </span>
            </span>

            <Plus className="ml-auto h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Footer
