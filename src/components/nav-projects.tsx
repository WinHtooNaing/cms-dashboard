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
export function NavProjects({
  global,
  collections,
}: {
  global: dataProps[]
  collections: dataProps[]
}) {
  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <SidebarMenu>
          {collections.map((item) => (
            <SidebarMenuItem key={item.name}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 rounded-md bg-primary text-white"
                    : ""
                }
              >
                <SidebarMenuButton className="hover:bg-primary hover:text-white">
                  {item.icon}
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <SidebarMenu>
          {global.map((item) => (
            <SidebarMenuItem key={item.name}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 rounded-md bg-primary text-white"
                    : ""
                }
              >
                <SidebarMenuButton className="hover:bg-primary hover:text-white">
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
