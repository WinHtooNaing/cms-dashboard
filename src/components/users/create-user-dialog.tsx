import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Eye,
  EyeOff,
  UserPlus,
  Loader2,
  UserRound,
  ShieldCheck,
} from "lucide-react"

import { getRoles } from "@/service/role.service"

import {
  createUserSchema,
  type CreateUserFormValues,
} from "@/schemas/userSchema"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "@/components/ui/field"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Separator } from "@/components/ui/separator"

type CreateUserDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: CreateUserFormValues) => Promise<void>
}

export function CreateUserDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateUserDialogProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      roleId: "",
      password: "",
      confirmPassword: "",
    },
  })

  const { data: roles = [], isPending: isRolesPending } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
    enabled: open,
  })

  const handleClose = (value: boolean) => {
    if (isSubmitting) return

    onOpenChange(value)

    if (!value) {
      form.reset()
      setShowPassword(false)
      setShowConfirmPassword(false)
    }
  }

  const handleSubmit = async (values: CreateUserFormValues) => {
    try {
      setIsSubmitting(true)

      await onSubmit(values)

      form.reset()
      setShowPassword(false)
      setShowConfirmPassword(false)
      onOpenChange(false)
    } catch {
      // Parent component handles error notifications.
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-hidden p-0 sm:max-w-2xl">
        {/* Header */}
        <DialogHeader className="border-b px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <UserPlus className="size-5" />
            </div>

            <div className="space-y-1">
              <DialogTitle className="text-xl font-semibold">
                Create New User
              </DialogTitle>

              <DialogDescription>
                Create a user account and configure their access permissions.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex min-h-0 flex-col"
        >
          {/* Form Content */}
          <div className="max-h-[65vh] scrollbar-none space-y-6 overflow-y-auto px-6 py-5">
            {/* Personal Information */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <UserRound className="size-4 text-muted-foreground" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Personal Information
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    Enter the user's basic details.
                  </p>
                </div>
              </div>

              <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <Controller
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name">
                        Full Name <span className="text-destructive">*</span>
                      </FieldLabel>

                      <Input
                        {...field}
                        id="name"
                        placeholder="Enter full name"
                        aria-invalid={fieldState.invalid}
                      />

                      <FieldError>{fieldState.error?.message}</FieldError>
                    </Field>
                  )}
                />

                {/* Email */}
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email">
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>

                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        aria-invalid={fieldState.invalid}
                      />

                      <FieldError>{fieldState.error?.message}</FieldError>
                    </Field>
                  )}
                />

                {/* Phone */}
                <Controller
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="phone">Phone Number</FieldLabel>

                      <Input
                        {...field}
                        id="phone"
                        type="tel"
                        placeholder="+959..."
                        aria-invalid={fieldState.invalid}
                      />

                      <FieldError>{fieldState.error?.message}</FieldError>
                    </Field>
                  )}
                />

                {/* Role */}
                <Controller
                  control={form.control}
                  name="roleId"
                  render={({ field, fieldState }) => {
                    const selectedRole = roles.find(
                      (role) => role.id === field.value
                    )

                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>
                          Assign Role{" "}
                          <span className="text-destructive">*</span>
                        </FieldLabel>

                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isRolesPending}
                        >
                          <SelectTrigger aria-invalid={fieldState.invalid}>
                            <SelectValue placeholder="Select a role">
                              {selectedRole?.name}
                            </SelectValue>
                          </SelectTrigger>

                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={role.id}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FieldError>{fieldState.error?.message}</FieldError>
                      </Field>
                    )
                  }}
                />
              </FieldGroup>
            </section>

            <Separator />

            {/* Account Security */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <ShieldCheck className="size-4 text-muted-foreground" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">Account Security</h3>

                  <p className="text-xs text-muted-foreground">
                    Set a secure password for this account.
                  </p>
                </div>
              </div>

              <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Password */}
                <Controller
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="password">
                        Password <span className="text-destructive">*</span>
                      </FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          className="pr-10"
                          aria-invalid={fieldState.invalid}
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>

                      <FieldDescription>Minimum 8 characters.</FieldDescription>

                      <FieldError>{fieldState.error?.message}</FieldError>
                    </Field>
                  )}
                />

                {/* Confirm Password */}
                <Controller
                  control={form.control}
                  name="confirmPassword"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="confirmPassword">
                        Confirm Password{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          className="pr-10"
                          aria-invalid={fieldState.invalid}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>

                      <FieldError>{fieldState.error?.message}</FieldError>
                    </Field>
                  )}
                />
              </FieldGroup>
            </section>
          </div>

          {/* Footer */}
          <DialogFooter className="border-t bg-white px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting || isRolesPending}>
              {isSubmitting ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <UserPlus className="mr-2 size-4" />
              )}

              {isSubmitting ? "Creating User..." : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
