import { useMemo, useState } from "react"
import {
  Search,
  MoreHorizontal,
  Users,
  ShieldCheck,
  UserRound,
  UserCog,
  Eye,
  Trash2,
  Shield,
} from "lucide-react"

import type { User, UserRole } from "../../types/user"
import { mockUsers } from "../../data/user-data"
import { mockRoles } from "@/data/role-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

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

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("ALL")

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [viewOpen, setViewOpen] = useState(false)
  const [assignOpen, setAssignOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [newRole, setNewRole] = useState("")

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())

      const matchesRole = roleFilter === "ALL" || user.role === roleFilter

      return matchesSearch && matchesRole
    })
  }, [users, search, roleFilter])

  const totalUsers = users.length
  const adminCount = users.filter((u) => u.role === "ADMIN").length
  const staffCount = users.filter((u) => u.role === "STAFF").length
  const customerCount = users.filter((u) => u.role === "CUSTOMER").length

  const handleAssignRole = () => {
    if (!selectedUser || !newRole) return

    setUsers((previous) =>
      previous.map((user) =>
        user.id === selectedUser.id
          ? { ...user, role: newRole as UserRole }
          : user
      )
    )

    setAssignOpen(false)
    setSelectedUser(null)
    setNewRole("")
  }

  const handleDeleteUser = () => {
    if (!selectedUser) return

    setUsers((previous) =>
      previous.filter((user) => user.id !== selectedUser.id)
    )

    setDeleteOpen(false)
    setSelectedUser(null)
  }

  const selectedRole = mockRoles.find(
    (role) => role.name === selectedUser?.role
  )

  return (
    <div className="space-y-6 p-6">
      {/* Page heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage users, roles, and access permissions.
          </p>
        </div>

        <Button variant="outline">
          <a
            href="/roles"
            className="align-center flex items-center justify-center"
          >
            <Shield className="mr-2 size-4" />
            Manage Roles
          </a>
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Users"
          value={totalUsers}
          icon={<Users className="size-5" />}
        />

        <SummaryCard
          title="Administrators"
          value={adminCount}
          icon={<ShieldCheck className="size-5" />}
        />

        <SummaryCard
          title="Staff Members"
          value={staffCount}
          icon={<UserCog className="size-5" />}
        />

        <SummaryCard
          title="Customers"
          value={customerCount}
          icon={<UserRound className="size-5" />}
        />
      </div>

      {/* Users table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                View and manage registered users.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search name or email..."
                  className="pl-9 sm:w-60"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Select
                value={roleFilter}
                onValueChange={(value) => setRoleFilter(value ?? "ALL")}
              >
                <SelectTrigger className="sm:w-40">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Roles</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="STAFF">Staff</SelectItem>
                  <SelectItem value="CUSTOMER">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => {
                    const role = mockRoles.find(
                      (item) => item.name === user.role
                    )

                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>

                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className={roleStyles[user.role]}
                          >
                            {user.role}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <span className="text-sm">
                            {role?.permissions.length ?? 0} permissions
                          </span>
                        </TableCell>

                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>

                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                              align="end"
                              className="w-auto p-2"
                            >
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedUser(user)
                                  setViewOpen(true)
                                }}
                              >
                                <Eye className="mr-2 size-4" />
                                View Details
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedUser(user)
                                  setNewRole(user.role)
                                  setAssignOpen(true)
                                }}
                              >
                                <Shield className="mr-2 size-4" />
                                Assign Role
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => {
                                  setSelectedUser(user)
                                  setDeleteOpen(true)
                                }}
                              >
                                <Trash2 className="mr-2 size-4" />
                                Delete User
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
                      colSpan={5}
                      className="h-32 text-center text-muted-foreground"
                    >
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredUsers.length} of {totalUsers} users
          </div>
        </CardContent>
      </Card>

      {/* View user details */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Personal information and assigned permissions.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarFallback>
                    {getInitials(selectedUser.name)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-semibold">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser.email}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="mt-1 font-medium">
                    {selectedUser.phone ?? "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">Role</p>
                  <Badge
                    variant="outline"
                    className={`mt-1 ${roleStyles[selectedUser.role]}`}
                  >
                    {selectedUser.role}
                  </Badge>
                </div>

                <div className="col-span-2">
                  <p className="text-muted-foreground">Joined Date</p>
                  <p className="mt-1 font-medium">
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
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
                      <div
                        key={permission.id}
                        className="rounded-md border p-3"
                      >
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

      {/* Assign role */}
      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Role</DialogTitle>
            <DialogDescription>
              Change the role assigned to this user.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <p className="font-medium">{selectedUser.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedUser.email}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Role</label>

                <Select
                  value={newRole}
                  onValueChange={(value) => setNewRole(value ?? "")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a role" />
                  </SelectTrigger>

                  <SelectContent>
                    {mockRoles.map((role) => (
                      <SelectItem key={role.id} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {newRole && (
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="mb-2 text-sm font-medium">
                    Permissions preview
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {mockRoles.find((role) => role.name === newRole)
                      ?.permissions.length ?? 0}{" "}
                    permissions will be assigned through this role.
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setAssignOpen(false)}>
                  Cancel
                </Button>

                <Button
                  onClick={handleAssignRole}
                  disabled={!newRole || newRole === selectedUser.role}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {selectedUser?.name}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
              onClick={handleDeleteUser}
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
