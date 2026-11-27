import type { User, UserStatus } from "@/types/user"
import { getRoles } from "@/service/role.service"

export type Role = Awaited<ReturnType<typeof getRoles>>[number]

export type UserDialogProps = {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}



export interface UsersTableProps {
  users: User[]
  roles: Role[]

  isPending: boolean
  isError: boolean
  error: Error | null

  page: number
  limit: number
  total: number
  totalPages: number
currentUserId: string | undefined
  onPageChange: (page: number) => void
onLimitChange: (value: string | null) => void
  onView: (user: User) => void
  onAssignRole: (user: User) => void
  onUpdateStatus: (user: User, status: UserStatus) => void
}