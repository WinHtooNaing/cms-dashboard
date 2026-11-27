import { Search, X } from "lucide-react"

import type { Role } from "@/types/roles"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface UsersToolbarProps {
  search: string

  roleFilter: string

  statusFilter: string

  isActiveFilter: string

  roles: Role[]

  onSearchChange: (value: string) => void

  onRoleFilterChange: (value: string) => void

  onStatusFilterChange: (value: string) => void
  onClearFilters: () => void
  onActiveFilterChange: (value: string) => void
}

export function UsersToolbar({
  search,
  roleFilter,
  statusFilter,
  isActiveFilter,
  roles,
  onSearchChange,
  onRoleFilterChange,
  onStatusFilterChange,
  onActiveFilterChange,
  onClearFilters,
}: UsersToolbarProps) {
  const hasFilters =
    search ||
    roleFilter !== "ALL" ||
    statusFilter !== "ALL" ||
    isActiveFilter !== "ALL"

  const clearFilters = () => {
    onSearchChange("")
    onRoleFilterChange("ALL")
    onStatusFilterChange("ALL")
    onActiveFilterChange("ALL")
    onClearFilters()
  }
  const roleItems = [
    { label: "All Roles", value: "ALL" },
    ...roles.map((role) => ({
      label: role.name,
      value: role.id,
    })),
  ]
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 sm:w-50"
        />
      </div>

      <Select
        items={roleItems}
        value={roleFilter}
        onValueChange={(value) => {
          if (value !== null) {
            onRoleFilterChange(value)
          }
        }}
      >
        <SelectTrigger className="w-full sm:w-35">
          <SelectValue placeholder="Filter role" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Roles</SelectItem>

          {roles.map((role) => (
            <SelectItem key={role.id} value={role.id}>
              {role.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={statusFilter}
        onValueChange={(value) => {
          if (value !== null) {
            onStatusFilterChange(value)
          }
        }}
      >
        <SelectTrigger className="w-full sm:w-37.5">
          <SelectValue placeholder="Account status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Status</SelectItem>

          <SelectItem value="ACTIVE">Active</SelectItem>

          <SelectItem value="SUSPENDED">Suspended</SelectItem>

          <SelectItem value="DEACTIVATED">Deactivated</SelectItem>
        </SelectContent>
      </Select>

      {/* ACTIVE FILTER */}

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="mr-2 size-4" />
          Clear
        </Button>
      )}
    </div>
  )
}
