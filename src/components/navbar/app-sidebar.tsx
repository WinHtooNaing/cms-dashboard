import * as React from "react"

import { NavProjects } from "@/components/navbar/nav-projects"
import { NavUser } from "@/components/navbar/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import {
  Bot,
  Footprints,
  Heading,
  House,
  Info,
  ListOrderedIcon,
  ScratchBlocks,
  Settings2,
  User,
} from "lucide-react"

import { Logo } from "./logo"
import { NavMain } from "./nav-main"
import { getCurrentUser } from "@/lib/auth"

const data = {
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: House,
      isActive: true,
      items: [
        { title: "Image Carousel", url: "/home" },
        { title: "Category", url: "/home/category" },
        { title: "New Collection", url: "/home/new-collection" },
      ],
    },
    {
      title: "Products",
      url: "/products",
      icon: Info,
      items: [{ title: "Products", url: "/products" }],
    },
    {
      title: "About",
      url: "/about",
      icon: Bot,
      items: [
        { title: "Description", url: "/about/description" },
        { title: "Who We Are", url: "/about/whoweare" },
        { title: "Our Purposes", url: "/about/ourpurposes" },
        { title: "Core Values", url: "/about/corevalues" },
        { title: "Why Choose Us", url: "/about/whychooseus" },
      ],
    },
    {
      title: "Contact",
      url: "/contact",
      icon: Settings2,
      items: [{ title: "Contact Description", url: "/contact/description" }],
    },
    {
      title: "Order",
      url: "/order",
      icon: ListOrderedIcon,
      items: [{ title: "Order", url: "/order" }],
    },
    {
      title: "Stock",
      url: "/stock",
      icon: ScratchBlocks,
      items: [{ title: "Stock", url: "/stock" }],
    },
    {
      title: "User Management",
      url: "/users",
      icon: User,
      items: [
        { title: "Users", url: "/users" },
        { title: "Roles", url: "/roles" },
      ],
    },
  ],

  global: [
    {
      name: "Headers",
      url: "/header",
      icon: <Heading />,
    },
    {
      name: "Footers",
      url: "/footer",
      icon: <Footprints />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = getCurrentUser()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden">
        <NavMain items={data.navMain} />
        <NavProjects global={data.global} />
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
