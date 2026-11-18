import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import type { UserDialogProps } from "./types"

import { getRoles } from "@/service/role.service"

type UserDetailsDialogProps = UserDialogProps & {
  roles: Awaited<ReturnType<typeof getRoles>>
}

const roleStyles: Record<string, string> = {
  ADMIN: "bg-red-100 text-red-700",
  STAFF: "bg-blue-100 text-blue-700",
  CUSTOMER: "bg-green-100 text-green-700",
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export function UserDetailsDialog({
  user,
  open,
  onOpenChange,
  roles,
}: UserDetailsDialogProps) {
  const selectedRole = roles.find((role) => role.id === user?.roleId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>

          <DialogDescription>
            Personal information and assigned permissions.
          </DialogDescription>
        </DialogHeader>

        {user && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Avatar className="size-12">
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-semibold">{user.name}</h3>

                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Phone</p>

                <p className="mt-1 font-medium">
                  {user.phone ?? "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Role</p>

                <Badge
                  variant="outline"
                  className={`mt-1 ${roleStyles[user.role.name] ?? ""}`}
                >
                  {user.role.name}
                </Badge>
              </div>

              <div className="col-span-2">
                <p className="text-muted-foreground">Joined Date</p>

                <p className="mt-1 font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">Assigned Permissions</h3>

                <Badge variant="secondary">
                  {selectedRole?.permissions.length ?? 0} permissions
                </Badge>
              </div>

              {selectedRole?.permissions.length ? (
                <div className="space-y-2">
                  {selectedRole.permissions.map((permission) => (
                    <div key={permission.id} className="rounded-md border p-3">
                      <p className="text-sm font-medium">{permission.code}</p>

                      <p className="text-xs text-muted-foreground">
                        {permission.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-md border p-4 text-sm text-muted-foreground">
                  This role currently has no assigned permissions.
                </p>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
