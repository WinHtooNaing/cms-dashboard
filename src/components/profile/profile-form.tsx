import { useEffect } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { Loader2, Save, RotateCcw } from "lucide-react"

import { toast } from "sonner"

import { useUpdateProfile } from "@/hooks/useProfile"

import { profileSchema, type ProfileFormValues } from "@/schemas/profile.schema"

import type { UserProfile } from "@/service/profile.service"

type Props = {
  user: UserProfile
}

export function ProfileForm({ user }: Props) {
  const updateProfile = useUpdateProfile()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),

    defaultValues: {
      name: user.name,
      phone: user.phone ?? "",
    },
  })

  useEffect(() => {
    reset({
      name: user.name,
      phone: user.phone ?? "",
    })
  }, [user, reset])

  async function onSubmit(values: ProfileFormValues) {
    try {
      const updatedProfile = await updateProfile.mutateAsync(values)

      reset({
        name: updatedProfile.name,
        phone: updatedProfile.phone ?? "",
      })

      toast.success("Profile updated successfully")
    } catch (error) {
      console.error("Profile update error:", error)

      toast.error("Failed to update profile")
    }
  }

  function handleCancel() {
    reset({
      name: user.name,
      phone: user.phone ?? "",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>

        <CardDescription>
          Update your personal information and contact details.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>

            <Input
              id="name"
              placeholder="Enter your full name"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <Input id="email" value={user.email} readOnly disabled />

            <p className="text-xs text-muted-foreground">
              Email address cannot be changed.
            </p>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>

            <Input
              id="phone"
              placeholder="Enter your phone number"
              {...register("phone")}
            />

            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-end gap-2 border-t pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={!isDirty || updateProfile.isPending}
            >
              <RotateCcw className="mr-2 size-4" />
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!isDirty || updateProfile.isPending}
            >
              {updateProfile.isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 size-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
