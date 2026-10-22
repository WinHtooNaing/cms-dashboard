import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { login } from "@/api/auth"
import { useState } from "react"
import { toast } from "sonner"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"
export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const setAuth = useAuthStore((state) => state.setAuth)

  const redirectPath = location.state?.from?.pathname || "/"
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    try {
      setIsLoading(true)
      const response = await login(data)

      if (response.isSuccess) {
        toast.success(response.message)
        localStorage.setItem("token", response.accessToken)

        setAuth(response.accessToken, response.user || null)
        setIsLoading(false)

        navigate(redirectPath, { replace: true })
      } else {
        throw new Error(response.message)
      }
      setIsLoading(false)
    } catch (error: any) {
      toast.error(error.message)
      setIsLoading(false)
    }
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-primary">
            welcome back!
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
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
                      <FieldLabel htmlFor="password" className="text-primary">
                        Password
                      </FieldLabel>
                    </div>

                    <Input
                      {...field}
                      id="password"
                      type="password"
                      className={`${fieldState.invalid ? "border-red-500" : ""}`}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Field>
                <Button
                  type="submit"
                  className="cursor-pointer py-5"
                  disabled={isLoading}
                >
                  {isLoading ? "Loginning..." : "Login"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
