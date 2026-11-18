import { useState } from "react"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { toast } from "sonner"

import { Link } from "react-router-dom"

import { Shield } from "lucide-react"

import type { User } from "@/types/user"

import { getUsers, assignUserRole } from "@/service/user.service"
import { getRoles } from "@/service/role.service"

import { usePermissions } from "@/hooks/usePermissions"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { UsersSummary } from "@/components/users/users-summary"
import { UsersToolbar } from "@/components/users/users-toolbar"
import { UsersTable } from "@/components/users/users-table"
import { UserDetailsDialog } from "@/components/users/user-details-dialog"
import { AssignRoleDialog } from "@/components/users/assign-role-dialog"

export default function UsersPage() {
  const queryClient = useQueryClient()

  const { hasPermission } = usePermissions()

  const canManageRoles = hasPermission("role:manage")

  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("ALL")
  const [page, setPage] = useState(1)

  const limit = 8

  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const [viewOpen, setViewOpen] = useState(false)
  const [assignOpen, setAssignOpen] = useState(false)

  const [newRole, setNewRole] = useState("")

  const {
    data: usersData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", page, limit, search, roleFilter],

    queryFn: () =>
      getUsers({
        page,
        limit,
        search: search.trim() || undefined,
        roleId: roleFilter === "ALL" ? undefined : roleFilter,
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
  })

  const users = usersData?.items ?? []
  const pagination = usersData?.pagination

  const { data: roles = [], isPending: isRolesPending } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
    enabled: canManageRoles,
  })
  const assignRoleMutation = useMutation({
    mutationFn: ({ userId, roleId }: { userId: string; roleId: string }) =>
      assignUserRole(userId, roleId),

    onSuccess: () => {
      toast.success("User role updated successfully")

      queryClient.invalidateQueries({
        queryKey: ["users"],
      })

      setAssignOpen(false)
      setSelectedUser(null)
      setNewRole("")
    },

    onError: () => {
      toast.error("Failed to update user role")
    },
  })

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value)
    setPage(1)
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setViewOpen(true)
  }

  const handleOpenAssignDialog = (user: User) => {
    setSelectedUser(user)
    setNewRole(user.roleId)
    setAssignOpen(true)
  }

  const handleAssignRole = () => {
    if (!selectedUser || !newRole) return

    assignRoleMutation.mutate({
      userId: selectedUser.id,
      roleId: newRole,
    })
  }

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

        {canManageRoles && (
          <Link
            to="/roles"
            className="inline-flex h-9 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Shield className="mr-2 size-4" />
            Manage Roles
          </Link>
        )}
      </div>

      <UsersSummary totalUsers={pagination?.total ?? 0} users={users} />

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>All Users</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                View and manage registered users.
              </p>
            </div>

            <UsersToolbar
              search={search}
              roleFilter={roleFilter}
              roles={roles}
              onSearchChange={handleSearchChange}
              onRoleFilterChange={handleRoleFilterChange}
            />
          </div>
        </CardHeader>

        <CardContent>
          <UsersTable
            users={users}
            roles={roles}
            isPending={isPending}
            isError={isError}
            error={error}
            page={page}
            totalPages={pagination?.totalPages ?? 1}
            onPageChange={setPage}
            onView={handleViewUser}
            onAssignRole={handleOpenAssignDialog}
          />
        </CardContent>
      </Card>

      <UserDetailsDialog
        user={selectedUser}
        open={viewOpen}
        onOpenChange={setViewOpen}
        roles={roles}
      />

      <AssignRoleDialog
        user={selectedUser}
        roles={roles}
        open={assignOpen}
        newRole={newRole}
        isSaving={assignRoleMutation.isPending}
        isRolesPending={canManageRoles && isRolesPending}
        onOpenChange={setAssignOpen}
        onRoleChange={setNewRole}
        onSave={handleAssignRole}
      />
    </div>
  )
}
