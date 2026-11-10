import { useMemo, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { getRoles } from "@/service/role.service"
import {
  ShieldCheck,
  Shield,
  Users,
  KeyRound,
  Plus,
  MoreHorizontal,
  Pencil,
  Settings2,
  Search,
  Check,
  LockKeyhole,
} from "lucide-react"
import type { Permission, Role } from "../../types/roles"
import { mockPermissions } from "@/data/role-data"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Separator } from "@/components/ui/separator"

const permissionGroups = [
  { name: "Categories", resource: "category" },
  { name: "Products", resource: "product" },
  { name: "Orders", resource: "order" },
  { name: "Users", resource: "user" },
  { name: "Roles", resource: "role" },
  { name: "Stock", resource: "stock" },
  { name: "Payments", resource: "payment" },
  { name: "Media", resource: "media" },
]

const permissionLabels: Record<string, string> = {
  create: "Create",
  read: "Read",
  update: "Update",
  delete: "Delete",
  manage: "Manage",
  collect: "Collect",
}

export default function RolesPage() {
  const {
    data: roles = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  })

  const [search, setSearch] = useState("")

  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [permissionDialogOpen, setPermissionDialogOpen] = useState(false)

  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const [roleName, setRoleName] = useState("")
  const [roleDescription, setRoleDescription] = useState("")

  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>(
    []
  )

  const filteredRoles = useMemo(() => {
    return roles.filter((role) =>
      role.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [roles, search])

  const totalPermissions = useMemo(() => {
    const uniquePermissionIds = new Set(
      roles.flatMap((role) =>
        role.permissions.map((permission) => permission.id)
      )
    )

    return uniquePermissionIds.size
  }, [roles])

  const totalUsers = roles.reduce((total, role) => total + role.userCount, 0)

  const rolesWithUsers = roles.filter((role) => role.userCount > 0).length

  const handleOpenCreateDialog = () => {
    setSelectedRole(null)
    setRoleName("")
    setRoleDescription("")
    setRoleDialogOpen(true)
  }

  const handleOpenEditDialog = (role: Role) => {
    setSelectedRole(role)
    setRoleName(role.name)
    setRoleDescription(role.description)
    setRoleDialogOpen(true)
  }

  const handleSaveRole = () => {
    if (!roleName.trim()) return

    console.log({
      id: selectedRole?.id,
      name: roleName.trim().toUpperCase(),
      description: roleDescription,
    })

    setRoleDialogOpen(false)
    setSelectedRole(null)
  }

  const handleOpenPermissions = (role: Role) => {
    setSelectedRole(role)

    setSelectedPermissionIds(
      role.permissions.map((permission) => permission.id)
    )

    setPermissionDialogOpen(true)
  }

  const togglePermission = (permissionId: string) => {
    setSelectedPermissionIds((previous) =>
      previous.includes(permissionId)
        ? previous.filter((id) => id !== permissionId)
        : [...previous, permissionId]
    )
  }

  const togglePermissionGroup = (resource: string) => {
    const groupPermissions = mockPermissions.filter((permission) =>
      permission.code.startsWith(`${resource}:`)
    )

    const groupIds = groupPermissions.map((permission) => permission.id)

    const allSelected = groupIds.every((id) =>
      selectedPermissionIds.includes(id)
    )

    setSelectedPermissionIds((previous) =>
      allSelected
        ? previous.filter((id) => !groupIds.includes(id))
        : [...new Set([...previous, ...groupIds])]
    )
  }

  const handleSavePermissions = () => {
    if (!selectedRole) return

    console.log({
      roleId: selectedRole.id,
      permissionIds: selectedPermissionIds,
    })

    setPermissionDialogOpen(false)
    setSelectedRole(null)
  }
  if (isLoading) {
    return <div className="p-6">Loading roles...</div>
  }

  if (isError) {
    return (
      <div className="p-6 text-destructive">
        Failed to load roles: {error.message}
      </div>
    )
  }
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Roles & Permissions
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage user roles and control system access.
          </p>
        </div>

        <Button onClick={handleOpenCreateDialog}>
          <Plus className="mr-2 size-4" />
          Create Role
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Roles"
          value={roles.length}
          icon={<ShieldCheck className="size-5" />}
        />

        <SummaryCard
          title="Total Permissions"
          value={totalPermissions}
          icon={<KeyRound className="size-5" />}
        />

        <SummaryCard
          title="Total Users"
          value={totalUsers}
          icon={<Users className="size-5" />}
        />

        <SummaryCard
          title="Active Roles"
          value={rolesWithUsers}
          icon={<Shield className="size-5" />}
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Roles</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Create roles and manage their permissions.
              </p>
            </div>

            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search roles..."
                className="pl-9 sm:w-60"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredRoles.length > 0 ? (
                  filteredRoles.map((role) => {
                    return (
                      <TableRow key={role.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="rounded-md bg-primary/10 p-2 text-primary">
                              <Shield className="size-4" />
                            </div>

                            <span className="font-semibold">{role.name}</span>

                            {role.name === "ADMIN" && (
                              <Badge variant="secondary">System</Badge>
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="max-w-62.5">
                          <p className="truncate text-sm text-muted-foreground">
                            {role.description || "No description"}
                          </p>
                        </TableCell>

                        {/* User count from API */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="size-4 text-muted-foreground" />
                            <span>{role.userCount}</span>
                          </div>
                        </TableCell>

                        {/* Permission count */}
                        <TableCell>
                          <Badge variant="outline">
                            {role.permissions.length} permissions
                          </Badge>
                        </TableCell>

                        {/* Last updated */}
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(role.updatedAt).toLocaleDateString()}
                        </TableCell>

                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="inline-flex size-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
                              <MoreHorizontal className="size-4" />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                              align="end"
                              className="w-auto p-2"
                            >
                              <DropdownMenuItem
                                onClick={() => handleOpenPermissions(role)}
                              >
                                <Settings2 className="mr-2 size-4" />
                                Manage Permissions
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => handleOpenEditDialog(role)}
                              >
                                <Pencil className="mr-2 size-4" />
                                Edit Role
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-32 text-center text-muted-foreground"
                    >
                      No roles found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredRoles.length} of {roles.length} roles
          </div>
        </CardContent>
      </Card>

      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedRole ? "Edit Role" : "Create New Role"}
            </DialogTitle>

            <DialogDescription>
              {selectedRole
                ? "Update the role name and description."
                : "Create a new custom role for your system."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name</Label>

              <Input
                id="role-name"
                placeholder="e.g. CONTENT_MANAGER"
                value={roleName}
                onChange={(event) => setRoleName(event.target.value)}
              />

              <p className="text-xs text-muted-foreground">
                Role names will automatically be converted to uppercase.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role-description">Description</Label>

              <Textarea
                id="role-description"
                placeholder="Describe what this role can do..."
                value={roleDescription}
                onChange={(event) => setRoleDescription(event.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setRoleDialogOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleSaveRole} disabled={!roleName.trim()}>
              {selectedRole ? "Save Changes" : "Create Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={permissionDialogOpen}
        onOpenChange={setPermissionDialogOpen}
      >
        <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Manage Permissions</DialogTitle>

            <DialogDescription>
              Select the permissions assigned to this role.
            </DialogDescription>
          </DialogHeader>

          {selectedRole && (
            <div className="flex min-h-0 flex-col gap-4">
              <div className="flex flex-row flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted/30 p-3">
                <div>
                  <p className="font-semibold">
                    {selectedRole.name} :
                    <span className="text-sm font-normal text-muted-foreground">
                      {"   " + selectedRole.description}
                    </span>
                  </p>
                </div>

                <Badge variant="secondary">
                  {selectedPermissionIds.length} / {totalPermissions} selected
                </Badge>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium">Available Permissions</p>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSelectedPermissionIds(
                        mockPermissions.map((permission) => permission.id)
                      )
                    }
                  >
                    Select All
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPermissionIds([])}
                  >
                    Clear All
                  </Button>
                </div>
              </div>

              <div className="max-h-[40vh] scrollbar-none space-y-4 overflow-y-auto pr-2">
                {permissionGroups.map((group) => {
                  const groupPermissions = mockPermissions.filter(
                    (permission) =>
                      permission.code.startsWith(`${group.resource}:`)
                  )

                  const selectedCount = groupPermissions.filter((permission) =>
                    selectedPermissionIds.includes(permission.id)
                  ).length

                  const allSelected =
                    groupPermissions.length > 0 &&
                    selectedCount === groupPermissions.length

                  return (
                    <div key={group.resource} className="rounded-lg border">
                      <div className="flex items-center justify-between gap-3 border-b bg-muted/30 px-4 py-3">
                        <div className="flex items-center gap-2">
                          <LockKeyhole className="size-4 text-muted-foreground" />

                          <h3 className="font-semibold">{group.name}</h3>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge variant="outline">
                            {selectedCount}/{groupPermissions.length}
                          </Badge>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              togglePermissionGroup(group.resource)
                            }
                          >
                            {allSelected ? "Deselect All" : "Select All"}
                          </Button>
                        </div>
                      </div>

                      <div className="grid gap-3 p-4 sm:grid-cols-2">
                        {groupPermissions.map((permission) => (
                          <PermissionCheckbox
                            key={permission.id}
                            permission={permission}
                            checked={selectedPermissionIds.includes(
                              permission.id
                            )}
                            onCheckedChange={() =>
                              togglePermission(permission.id)
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              <Separator />

              <DialogFooter className="flex-row justify-end sm:justify-end">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setPermissionDialogOpen(false)}
                  >
                    Cancel
                  </Button>

                  <Button onClick={handleSavePermissions}>
                    <Check className="mr-2 size-4" />
                    Save Permissions
                  </Button>
                </div>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string
  value: number
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-5">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>

        <div className="rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
      </CardContent>
    </Card>
  )
}

function PermissionCheckbox({
  permission,
  checked,
  onCheckedChange,
}: {
  permission: Permission
  checked: boolean
  onCheckedChange: () => void
}) {
  const action = permission.code.split(":")[1]

  return (
    <div className="flex items-start gap-3">
      <Checkbox
        id={permission.id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />

      <div className="grid gap-1">
        <Label
          htmlFor={permission.id}
          className="cursor-pointer text-sm font-medium"
        >
          {permissionLabels[action] ?? action}
        </Label>

        <p className="text-xs text-muted-foreground">
          {permission.description}
        </p>
      </div>
    </div>
  )
}
