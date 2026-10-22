import { AlertCircle } from "lucide-react"

type FieldErrorProps = {
  message?: string
}

const FieldError = ({ message }: FieldErrorProps) => {
  if (!message) return null

  return (
    <p
      role="alert"
      className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-destructive"
    >
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />

      <span>{message}</span>
    </p>
  )
}

export default FieldError
