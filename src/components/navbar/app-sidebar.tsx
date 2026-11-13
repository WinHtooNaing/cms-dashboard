import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import {
  BracesIcon,
  Contact,
  House,
  Info,
  LayoutDashboard,
  Package,
  ShoppingCart,
  User,
} from "lucide-react"

import { Logo } from "./logo"
import { NavMain } from "./nav-main"
import { NavUser } from "@/components/navbar/nav-user"
import { useCurrentUser } from "@/hooks/useCurrentUser"

const navigationGroups = [
  {
    title: "E-commerce",
    items: [
      {
        title: "Products",
        url: "/products",
        icon: Package,
        items: [{ title: "Products", url: "/products" }],
      },
      {
        title: "Orders",
        url: "/order",
        icon: ShoppingCart,
        items: [{ title: "Orders", url: "/order" }],
      },
      {
        title: "Brand",
        url: "/brand",
        icon: BracesIcon,
        items: [{ title: "Brand", url: "/brand" }],
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
  },
  {
    title: "Content Management",
    items: [
      {
        title: "Home Page",
        url: "/home",
        icon: House,
        items: [
          { title: "Image Carousel", url: "/home" },
          { title: "Category", url: "/home/category" },
          { title: "New Collection", url: "/home/new-collection" },
        ],
      },
      {
        title: "About Us",
        url: "/about",
        icon: Info,
        items: [
          { title: "Description", url: "/about/description" },
          { title: "Who We Are", url: "/about/whoweare" },
          { title: "Our Purposes", url: "/about/ourpurposes" },
          { title: "Core Values", url: "/about/corevalues" },
          { title: "Why Choose Us", url: "/about/whychooseus" },
        ],
      },
      {
        title: "Contact Us",
        url: "/contact",
        icon: Contact,
        items: [{ title: "Contact Description", url: "/contact/description" }],
      },
      {
        title: "Global Settings",
        url: "/header",
        icon: LayoutDashboard,
        items: [
          { title: "Header", url: "/header" },
          { title: "Footer", url: "/footer" },
        ],
      },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: currentUser } = useCurrentUser()

  const user = currentUser?.user

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden">
        {navigationGroups.map((group) => (
          <NavMain key={group.title} title={group.title} items={group.items} />
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
