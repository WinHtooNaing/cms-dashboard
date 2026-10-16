import * as React from "react"

import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Contact,
  Footprints,
  Heading,
  House,
  Info,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react"
import { Logo } from "./logo"

const data = {
  user: {
    name: "shadcn",
    email: "winhtoonaing2003@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  collections: [
    {
      name: "Home",
      url: "/",
      icon: <House />,
    },
    {
      name: "Products",
      url: "/products",
      icon: <ShoppingCart />,
    },
    {
      name: "ProductDetails",
      url: "/product-detail",
      icon: <ShoppingBasket />,
    },
    {
      name: "About",
      url: "/about",
      icon: <Info />,
    },
    {
      name: "Contact",
      url: "/contact",
      icon: <Contact />,
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects global={data.global} collections={data.collections} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
