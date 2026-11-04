import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { loginSchema } from "@/types/loginSchema"
const Settings = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  function onSubmit(data: z.infer<typeof loginSchema>) {
    console.log(data)
  }
  return (
    <>
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-1 text-sm font-medium text-primary">
              Auth / Settings
            </p>
          </div>
        </div>
        <div className="flex gap-2 max-sm:flex-col">
          <Card className="mx-auto w-full max-w-md">
            <CardHeader>
              <CardTitle>Your Old Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <Field>
                <FieldLabel htmlFor="username" className="text-primary">
                  Name
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  defaultValue="Susil Kyan"
                  disabled
                  readOnly
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email" className="text-primary">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  defaultValue="admin@gmail.com"
                  disabled
                  readOnly
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password" className="text-primary">
                  Password
                </FieldLabel>
                <Input
                  id="password"
                  type="password"
                  defaultValue="********"
                  disabled
                  readOnly
                />
              </Field>
            </CardContent>
          </Card>
          <Card className="mx-auto w-full max-w-lg">
            <CardHeader>
              <CardTitle>Edit your profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="email" className="text-primary">
                          Email
                        </FieldLabel>
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          className={`${fieldState.invalid ? "border-red-500" : ""}`}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <div className="flex items-center">
                          <FieldLabel
                            htmlFor="password"
                            className="text-primary"
                          >
                            New Password
                          </FieldLabel>
                        </div>
                        <Input
                          {...field}
                          id="password"
                          type="password"
                          placeholder="*******"
                          className={`${fieldState.invalid ? "border-red-500" : ""}`}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Field>
                    <Button type="submit" className="cursor-pointer py-5">
                      Update
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Settings
