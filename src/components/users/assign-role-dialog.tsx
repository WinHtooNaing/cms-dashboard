import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { User } from "@/types/user"
import type { Role } from "./types"

type AssignRoleDialogProps = {
  user: User | null
  roles: Role[]
  open: boolean
  newRole: string
  isSaving: boolean
  isRolesPending: boolean
  onOpenChange: (open: boolean) => void
  onRoleChange: (roleId: string) => void
  onSave: () => void
}

export function AssignRoleDialog({
  user,
  roles,
  open,
  newRole,
  isSaving,
  isRolesPending,
  onOpenChange,
  onRoleChange,
  onSave,
}: AssignRoleDialogProps) {
  const selectedRole = roles.find((role) => role.id === newRole)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Role</DialogTitle>

          <DialogDescription>
            Change the role assigned to this user.
          </DialogDescription>
        </DialogHeader>

        {user && (
          <div className="space-y-4">
            {/* User information */}
            <div className="rounded-lg border p-3">
              <p className="font-medium">{user.name}</p>

              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            {/* Role selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Role</label>

              <Select
                value={newRole}
                onValueChange={(value) => onRoleChange(value ?? "")}
                disabled={isRolesPending || isSaving}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a role">
                    {selectedRole?.name ?? "Choose a role"}
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

              {isRolesPending && (
                <p className="text-xs text-muted-foreground">
                  Loading roles...
                </p>
              )}
            </div>

            {/* Permission preview */}
            {selectedRole && (
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="mb-2 text-sm font-medium">Permissions preview</p>

                <p className="text-sm text-muted-foreground">
                  {selectedRole.permissions.length} permissions will be assigned
                  through this role.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>

              <Button
                onClick={onSave}
                disabled={
                  !newRole ||
                  newRole === user.roleId ||
                  isSaving ||
                  isRolesPending
                }
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
