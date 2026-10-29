import type { LucideIcon } from "lucide-react"

type AboutPageHeaderProps = {
  icon: LucideIcon
  title: string
  description: string
}

const AboutPageHeader = ({
  icon: Icon,
  title,
  description,
}: AboutPageHeaderProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPageHeader
