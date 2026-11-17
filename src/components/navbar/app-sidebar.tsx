import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { Logo } from "./logo"
import { NavMain } from "./nav-main"
import { NavUser } from "@/components/navbar/nav-user"

import { useCurrentUser } from "@/hooks/useCurrentUser"
import { usePermissions } from "@/hooks/usePermissions"

import {
  navigationGroups,
  type NavigationGroup,
  type NavigationItem,
} from "@/config/navigation"
function filterNavigationItems(
  items: NavigationItem[],
  hasPermission: (permission: string) => boolean
): NavigationItem[] {
  return items.flatMap((item) => {
    const filteredChildren = item.items?.filter((child) =>
      child.permission ? hasPermission(child.permission) : true
    )

    if (item.items && filteredChildren?.length === 0) {
      return []
    }

    if (item.permission && !hasPermission(item.permission)) {
      return []
    }

    return [
      {
        ...item,
        items: filteredChildren,
      },
    ]
  })
}

function filterNavigationGroups(
  groups: NavigationGroup[],
  hasPermission: (permission: string) => boolean
): NavigationGroup[] {
  return groups
    .map((group) => ({
      ...group,
      items: filterNavigationItems(group.items, hasPermission),
    }))
    .filter((group) => group.items.length > 0)
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: currentUser } = useCurrentUser()

  const { hasPermission, isPending, isError } = usePermissions()

  const user = currentUser?.user

  const filteredNavigation = filterNavigationGroups(
    navigationGroups,
    hasPermission
  )

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden">
        {!isPending &&
          !isError &&
          filteredNavigation.map((group) => (
            <NavMain
              key={group.title}
              title={group.title}
              items={group.items}
            />
          ))}
      </SidebarContent>

      <SidebarFooter>
        {user && (
          <NavUser
            user={{
              name: user.name,
              email: user.email,
            }}
          />
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
