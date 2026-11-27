import { MoreHorizontal, Eye, Shield, CircleSlash } from "lucide-react"

import type { UsersTableProps } from "./types"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { User, UserStatus } from "@/types/user"

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UsersTableSkeleton } from "../skeletons/UsersTableSkeleton"

const roleStyles: Record<string, string> = {
  ADMIN: "bg-red-100 text-red-700",
  STAFF: "bg-blue-100 text-blue-700",
  CUSTOMER: "bg-green-100 text-green-700",
}
const statusStyles: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700 border-green-200",
  SUSPENDED: "bg-yellow-100 text-yellow-700 border-yellow-200",
  DEACTIVATED: "bg-red-100 text-red-700 border-red-200",
}
function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export function UsersTable({
  users,
  roles,
  currentUserId,
  isPending,
  isError,
  error,
  page,
  limit,
  total,
  totalPages,
  onPageChange,
  onLimitChange,
  onView,
  onAssignRole,
  onUpdateStatus,
}: UsersTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const [statusDialogOpen, setStatusDialogOpen] = useState(false)

  const isActive = selectedUser?.status === "ACTIVE"

  const nextStatus: UserStatus = isActive ? "DEACTIVATED" : "ACTIVE"

  const handleConfirmStatusChange = () => {
    if (!selectedUser) return

    onUpdateStatus(selectedUser, nextStatus)
    setStatusDialogOpen(false)
    setSelectedUser(null)
  }
  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isPending ? (
              <UsersTableSkeleton rowCount={6} />
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-destructive"
                >
                  Failed to load users: {error?.message}
                </TableCell>
              </TableRow>
            ) : users.length > 0 ? (
              users.map((user) => {
                const isCurrentUser = user.id === currentUserId
                const role = roles.find((item) => item.id === user.roleId)

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

                    {/* Role */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          roleStyles[user.role.name] ??
                          "bg-gray-100 text-gray-700"
                        }
                      >
                        {user.role.name}
                      </Badge>
                    </TableCell>
                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          statusStyles[user.status] ??
                          "bg-gray-100 text-gray-700"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    {/* Permissions */}
                    <TableCell>
                      <span className="text-sm">
                        {roles.length > 0
                          ? `${role?.permissions.length ?? 0} permissions`
                          : "—"}
                      </span>
                    </TableCell>

                    {/* Joined Date */}
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-auto p-2">
                          <DropdownMenuItem onClick={() => onView(user)}>
                            <Eye className="mr-2 size-4" />
                            View Details
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            disabled={isCurrentUser}
                            onClick={() => {
                              if (!isCurrentUser) {
                                onAssignRole(user)
                              }
                            }}
                          >
                            <Shield className="mr-2 size-4" />
                            Assign Role
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            disabled={isCurrentUser}
                            className={
                              user.status === "ACTIVE"
                                ? "text-destructive focus:text-destructive"
                                : "text-green-600 focus:text-green-600"
                            }
                            onClick={() => {
                              if (!isCurrentUser) {
                                setSelectedUser(user)
                                setStatusDialogOpen(true)
                              }
                            }}
                          >
                            <CircleSlash className="mr-2 size-4" />

                            {user.status === "ACTIVE"
                              ? "Deactivate"
                              : "Activate"}
                          </DropdownMenuItem>

                          {isCurrentUser && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem disabled>
                                You cannot modify your own account
                              </DropdownMenuItem>
                            </>
                          )}
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

      {/* PAGINATION */}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* RESULTS INFORMATION */}

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Showing</span>

          <span className="font-medium text-foreground">
            {total === 0 ? 0 : (page - 1) * limit + 1}
            {" - "}
            {Math.min(page * limit, total)}
          </span>

          <span>of {total} users</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* PAGE SIZE */}

          <div className="flex items-center gap-2">
            <span className="text-sm whitespace-nowrap text-muted-foreground">
              Rows per page
            </span>

            <Select value={String(limit)} onValueChange={onLimitChange}>
              <SelectTrigger className="w-18.75">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* PAGE NAVIGATION */}

          <div className="flex items-center gap-2">
            <span className="text-sm whitespace-nowrap text-muted-foreground">
              Page {page} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || isPending}
              onClick={() => onPageChange(page - 1)}
            >
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages || isPending || totalPages === 0}
              onClick={() => onPageChange(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <AlertDialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isActive ? "Deactivate User?" : "Activate User?"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {isActive
                ? `Are you sure you want to deactivate ${selectedUser?.name}'s account? They will no longer be able to access their account.`
                : `Are you sure you want to activate ${selectedUser?.name}'s account? They will regain access to their account.`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleConfirmStatusChange}
              className={
                isActive
                  ? "text-destructive-foreground bg-destructive hover:bg-destructive/90"
                  : ""
              }
            >
              {isActive ? "Deactivate" : "Activate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
