import { LoginForm } from "@/components/auth/login-form"

export default function Login() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <h1 className="mb-4 text-center text-3xl font-extrabold text-primary italic">
          Tech Heaven
        </h1>
        <LoginForm />
      </div>
    </div>
  )
}
