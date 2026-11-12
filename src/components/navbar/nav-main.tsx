import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { NavLink, useLocation } from "react-router-dom"

type NavigationItem = {
  title: string
  url: string
  icon?: LucideIcon
  items?: {
    title: string
    url: string
  }[]
}

type NavMainProps = {
  title: string
  items: NavigationItem[]
}

export function NavMain({ title, items }: NavMainProps) {
  const location = useLocation()

  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="px-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {title}
      </SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const isActive = item.items?.some(
            (subItem) => location.pathname === subItem.url
          )

          return (
            <Collapsible
              key={item.title}
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger
                  render={
                    <SidebarMenuButton tooltip={item.title} className="h-9" />
                  }
                >
                  {item.icon && <item.icon className="size-4" />}

                  <span>{item.title}</span>

                  <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.url}>
                        <SidebarMenuSubButton
                          isActive={location.pathname === subItem.url}
                          className="hover:bg-primary hover:text-primary-foreground data-active:bg-primary data-active:text-primary-foreground"
                          render={
                            <NavLink
                              to={subItem.url}
                              onClick={() => {
                                if (isMobile) {
                                  setOpenMobile(false)
                                }
                              }}
                            />
                          }
                        >
                          <span>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
