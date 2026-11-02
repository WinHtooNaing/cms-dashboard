import { Clock3, Mail, MapPin, Phone } from "lucide-react"
import { Field, FieldLabel } from "@/components/ui/field"
import { FieldError } from "@/components/ui/field"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatBusinessHours } from "@/util/formatBusinessHours"
import {
  contactUsSchema,
  daysOfWeek,
  type ContactUsValues,
} from "@/types/contactUsSchema"

import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox"

type GetInTouchFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  contact: ContactUsValues
}

const GetInTouchFormDialog = ({
  open,
  onOpenChange,
  contact,
}: GetInTouchFormDialogProps) => {
  const form = useForm<ContactUsValues>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: contact,
    mode: "onBlur",
    reValidateMode: "onChange",
  })
  const selectedDays = form.watch("workingDays")
  const openingTime = form.watch("openingTime")
  const closingTime = form.watch("closingTime")
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden sm:max-w-2xl">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-xl">Edit Get in Touch</DialogTitle>
          {/* 
          <DialogDescription>
            Update your contact information and business hours.
          </DialogDescription> */}
        </DialogHeader>
        <div className="min-h-0 flex-1 scrollbar-none overflow-y-auto">
          <form className="space-y-8 pr-2">
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b pb-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Mail className="size-5" />
                </div>

                <div>
                  <h3 className="font-semibold">Email Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your email card.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  control={form.control}
                  name="emailTitle"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Card Title</FieldLabel>

                      <Input
                        placeholder="Email Us"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Email Address</FieldLabel>

                      <Input
                        type="email"
                        placeholder="support@techhaven.com"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <Controller
                control={form.control}
                name="emailDescription"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Description</FieldLabel>

                    <Textarea
                      placeholder="Send us an email anytime."
                      className="resize-none"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </section>
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b pb-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Phone className="size-5" />
                </div>

                <div>
                  <h3 className="font-semibold">Phone Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your telephone contact card.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  control={form.control}
                  name="phoneTitle"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Card Title</FieldLabel>

                      <Input
                        placeholder="Call Us"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Phone Number</FieldLabel>

                      <Input
                        type="tel"
                        placeholder="+95 9 123 456 789"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <Controller
                control={form.control}
                name="phoneDescription"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Description</FieldLabel>

                    <Textarea
                      placeholder="Our team is ready to help."
                      className="resize-none"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </section>
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b pb-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <MapPin className="size-5" />
                </div>

                <div>
                  <h3 className="font-semibold">Location Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your store location card.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  control={form.control}
                  name="addressTitle"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Card Title</FieldLabel>

                      <Input
                        placeholder="Visit Us"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="address"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Address</FieldLabel>

                      <Input
                        placeholder="Yangon, Myanmar"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <Controller
                control={form.control}
                name="addressDescription"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Description</FieldLabel>

                    <Textarea
                      placeholder="Come and visit our store."
                      className="resize-none"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </section>
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b pb-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Clock3 className="size-5" />
                </div>

                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Select your working days and business hours.
                  </p>
                </div>
              </div>
              <Controller
                control={form.control}
                name="businessHoursTitle"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Card Title</FieldLabel>

                    <Input
                      placeholder="Business Hours"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="businessHoursDescription"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Description</FieldLabel>

                    <Textarea
                      placeholder="We're available during:"
                      className="resize-none"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="workingDays"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Working Days</FieldLabel>

                    <div className="grid grid-cols-2 gap-3 rounded-lg border p-4 sm:grid-cols-4">
                      {daysOfWeek.map((day) => {
                        const checked = field.value.includes(day)

                        return (
                          <label
                            key={day}
                            className="flex cursor-pointer items-center gap-2 text-sm"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(value) => {
                                const updatedDays = value
                                  ? [...field.value, day]
                                  : field.value.filter(
                                      (selectedDay) => selectedDay !== day
                                    )

                                field.onChange(
                                  daysOfWeek.filter((item) =>
                                    updatedDays.includes(item)
                                  )
                                )
                              }}
                            />

                            <span>{day}</span>
                          </label>
                        )
                      })}
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  control={form.control}
                  name="openingTime"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Opening Time</FieldLabel>

                      <Input
                        type="time"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="closingTime"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Closing Time</FieldLabel>

                      <Input
                        type="time"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div className="rounded-lg border bg-muted/40 p-4">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Live Preview
                </p>

                <p className="mt-2 font-semibold">
                  {selectedDays.length > 0 &&
                  openingTime &&
                  closingTime &&
                  closingTime > openingTime
                    ? formatBusinessHours({
                        workingDays: selectedDays,
                        openingTime,
                        closingTime,
                      })
                    : "Select valid working days and times."}
                </p>
              </div>
            </section>
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>

              <Button type="button">Save Changes</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default GetInTouchFormDialog
