import { useEffect, useState } from "react"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { Link, useSearchParams } from "react-router-dom"

import { UserPlus, Shield } from "lucide-react"

import { toast } from "sonner"

import type { User, UserStatus } from "@/types/user"

import type { CreateUserFormValues } from "@/schemas/userSchema"

import {
  getUsers,
  assignUserRole,
  createUser,
  updateUserStatus,
} from "@/service/user.service"

import type { GetUsersParams } from "@/types/user"

import { getRoles } from "@/service/role.service"

import { usePermissions } from "@/hooks/usePermissions"

import { Button } from "@/components/ui/button"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { UsersSummary } from "@/components/users/users-summary"
import { UsersToolbar } from "@/components/users/users-toolbar"
import { UsersTable } from "@/components/users/users-table"

import { UserDetailsDialog } from "@/components/users/user-details-dialog"
import { AssignRoleDialog } from "@/components/users/assign-role-dialog"
import { CreateUserDialog } from "@/components/users/create-user-dialog"
import { useCurrentUser } from "@/hooks/useCurrentUser"

export default function UsersPage() {
  const queryClient = useQueryClient()

  const [searchParams, setSearchParams] = useSearchParams()

  const { hasPermission } = usePermissions()
  const { data: currentUserData } = useCurrentUser()

  const currentUserId = currentUserData?.user?.id
  const canManageRoles = hasPermission("role:manage")
  const canCreateUser = hasPermission("user:manage")

  // ----------------------------------
  // URL PARAMETERS
  // ----------------------------------

  const page = Math.max(1, Number(searchParams.get("page")) || 1)

  const limit = Math.min(
    100,
    Math.max(1, Number(searchParams.get("limit")) || 8)
  )

  const search = searchParams.get("search") || ""

  const roleFilter = searchParams.get("roleId") || "ALL"

  const statusFilter = searchParams.get("status") || "ALL"

  const isActiveFilter = searchParams.get("isActive") || "ALL"

  const sortBy = searchParams.get("sortBy") || "createdAt"

  const sortOrder = searchParams.get("sortOrder") || "desc"

  // Local search input for debouncing
  const [searchInput, setSearchInput] = useState(search)

  // ----------------------------------
  // DIALOG STATES
  // ----------------------------------

  const [createOpen, setCreateOpen] = useState(false)

  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const [viewOpen, setViewOpen] = useState(false)

  const [assignOpen, setAssignOpen] = useState(false)

  const [newRole, setNewRole] = useState("")

  // ----------------------------------
  // URL UPDATE HELPER
  // ----------------------------------

  const updateParams = (
    updates: Record<string, string | null>,
    resetPage = false
  ) => {
    const params = new URLSearchParams(searchParams)

    if (resetPage) {
      params.set("page", "1")
    }

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === "ALL") {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })

    setSearchParams(params)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmedSearch = searchInput.trim()

      if (trimmedSearch !== search) {
        updateParams(
          {
            search: trimmedSearch || null,
          },
          true
        )
      }
    }, 400)

    return () => clearTimeout(timeout)
  }, [searchInput, search])

  useEffect(() => {
    setSearchInput(search)
  }, [search])

  const queryParams: GetUsersParams = {
    page,
    limit,
    search: search || undefined,
    roleId: roleFilter === "ALL" ? undefined : roleFilter,
    status:
      statusFilter === "ALL"
        ? undefined
        : (statusFilter as GetUsersParams["status"]),
    isActive: isActiveFilter === "ALL" ? undefined : isActiveFilter === "true",
    sortBy: sortBy as GetUsersParams["sortBy"],
    sortOrder: sortOrder as GetUsersParams["sortOrder"],
  }

  // ----------------------------------
  // FETCH USERS
  // ----------------------------------

  const {
    data: usersData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", queryParams],
    queryFn: () => getUsers(queryParams),
    placeholderData: (previousData) => previousData,
  })

  const users = usersData?.items ?? []
  const pagination = usersData?.pagination

  // ----------------------------------
  // CORRECT INVALID PAGE
  // ----------------------------------
  const handleClearFilters = () => {
    setSearchInput("")

    setSearchParams({
      page: "1",
      limit: String(limit),
    })
  }
  useEffect(() => {
    if (!pagination) return

    if (pagination.totalPages > 0 && page > pagination.totalPages) {
      updateParams({
        page: String(pagination.totalPages),
      })
    }

    if (pagination.totalPages === 0 && page !== 1) {
      updateParams({
        page: "1",
      })
    }
  }, [pagination?.totalPages, page])

  // ----------------------------------
  // FETCH ROLES
  // ----------------------------------

  const { data: roles = [], isPending: isRolesPending } = useQuery({
    queryKey: ["roles"],

    queryFn: getRoles,

    enabled: canManageRoles,
  })

  // ----------------------------------
  // CREATE USER
  // ----------------------------------

  const createUserMutation = useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      toast.success("User created successfully")

      queryClient.invalidateQueries({
        queryKey: ["users"],
      })

      setCreateOpen(false)

      updateParams({
        page: "1",
      })
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create user")
    },
  })

  // ----------------------------------
  // ASSIGN ROLE
  // ----------------------------------

  const updateStatusMutation = useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: UserStatus }) =>
      updateUserStatus(userId, status),

    onSuccess: (updatedUser) => {
      toast.success(
        `${updatedUser.name}'s account has been ${
          updatedUser.status === "ACTIVE" ? "activated" : "deactivated"
        }.`
      )

      queryClient.invalidateQueries({
        queryKey: ["users"],
      })
    },

    onError: (error) => {
      toast.error(error.message || "Failed to update user status.")
    },
  })
  const handleUpdateUserStatus = (user: User, status: UserStatus) => {
    updateStatusMutation.mutate({
      userId: user.id,
      status,
    })
  }
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

  // ----------------------------------
  // FILTER HANDLERS
  // ----------------------------------

  const handleRoleFilterChange = (value: string) => {
    updateParams(
      {
        roleId: value,
      },
      true
    )
  }

  const handleStatusFilterChange = (value: string) => {
    updateParams(
      {
        status: value,
      },
      true
    )
  }

  const handleActiveFilterChange = (value: string) => {
    updateParams(
      {
        isActive: value,
      },
      true
    )
  }

  const handlePageChange = (newPage: number) => {
    updateParams({
      page: String(newPage),
    })
  }

  const handleLimitChange = (value: string | null) => {
    if (!value) return

    updateParams({
      limit: value,
      page: "1",
    })
  }

  // ----------------------------------
  // USER ACTIONS
  // ----------------------------------

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

  // ----------------------------------
  // RENDER
  // ----------------------------------

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>

          <p className="text-sm text-muted-foreground">
            Manage users, roles, and access permissions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {canManageRoles && (
            <Link to="/roles">
              <Button variant="outline">
                <Shield className="mr-2 size-4" />
                Manage Roles
              </Button>
            </Link>
          )}

          {canCreateUser && (
            <Button onClick={() => setCreateOpen(true)}>
              <UserPlus className="mr-2 size-4" />
              Add User
            </Button>
          )}
        </div>
      </div>

      {/* SUMMARY */}

      <UsersSummary totalUsers={pagination?.total ?? 0} users={users} />

      {/* USERS CARD */}

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
              search={searchInput}
              roleFilter={roleFilter}
              statusFilter={statusFilter}
              isActiveFilter={isActiveFilter}
              roles={roles}
              onSearchChange={setSearchInput}
              onRoleFilterChange={handleRoleFilterChange}
              onStatusFilterChange={handleStatusFilterChange}
              onActiveFilterChange={handleActiveFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </CardHeader>

        <CardContent>
          <UsersTable
            users={users}
            currentUserId={currentUserId}

            roles={roles}
            isPending={isPending}
            isError={isError}
            error={error}
            page={page}
            limit={limit}
            total={pagination?.total ?? 0}
            totalPages={pagination?.totalPages ?? 1}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            onView={handleViewUser}
            onUpdateStatus={handleUpdateUserStatus}

            onAssignRole={handleOpenAssignDialog}
          />
        </CardContent>
      </Card>

      {/* USER DETAILS */}

      <UserDetailsDialog
        user={selectedUser}
        open={viewOpen}
        onOpenChange={setViewOpen}
        roles={roles}
      />

      {/* ASSIGN ROLE */}

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

      {/* CREATE USER */}

      <CreateUserDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={async (values: CreateUserFormValues) => {
          const { confirmPassword, ...payload } = values

          await createUserMutation.mutateAsync(payload)
        }}
      />
    </div>
  )
}
