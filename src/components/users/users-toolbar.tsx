import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { Role } from "./types"

type UsersToolbarProps = {
  search: string
  roleFilter: string
  roles: Role[]
  onSearchChange: (value: string) => void
  onRoleFilterChange: (value: string) => void
}

export function UsersToolbar({
  search,
  roleFilter,
  roles,
  onSearchChange,
  onRoleFilterChange,
}: UsersToolbarProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      {/* Search */}
      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search name or email..."
          className="pl-9 sm:w-60"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Role Filter */}
      <Select
        value={roleFilter}
        onValueChange={(value) => onRoleFilterChange(value ?? "ALL")}
      >
        <SelectTrigger className="sm:w-40">
          <SelectValue placeholder="Filter by role">
            {roleFilter === "ALL"
              ? "All Roles"
              : roles.find((role) => role.id === roleFilter)?.name}
          </SelectValue>
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
    </div>
  )
}
