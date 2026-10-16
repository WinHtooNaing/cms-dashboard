import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom"

type dataProps = {
  name: string
  url: string
  icon: React.ReactNode
}
export function NavProjects({ global }: { global: dataProps[] }) {
  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Global</SidebarGroupLabel>
        <SidebarMenu>
          {global.map((item) => (
            <SidebarMenuItem key={item.name}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 rounded-md bg-primary text-primary-foreground"
                    : "flex items-center gap-2 rounded-md"
                }
              >
                <SidebarMenuButton className="hover:bg-primary hover:text-primary-foreground">
                  {item.icon}
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}
