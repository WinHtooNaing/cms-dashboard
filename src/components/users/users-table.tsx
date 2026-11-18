import { MoreHorizontal, Eye, Shield, Trash2 } from "lucide-react"

import type { UsersTableProps } from "./types"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

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

export function UsersTable({
  users,
  roles,
  isPending,
  isError,
  error,
  page,
  totalPages,
  onPageChange,
  onView,
  onAssignRole,
}: UsersTableProps) {
  return (
    <>
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
            {isPending ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-muted-foreground"
                >
                  Loading users...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-destructive"
                >
                  Failed to load users: {error?.message}
                </TableCell>
              </TableRow>
            ) : users.length > 0 ? (
              users.map((user) => {
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

                          <DropdownMenuItem onClick={() => onAssignRole(user)}>
                            <Shield className="mr-2 size-4" />
                            Assign Role
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            disabled
                            className="text-destructive focus:text-destructive"
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

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1 || isPending}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages || isPending}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  )
}
