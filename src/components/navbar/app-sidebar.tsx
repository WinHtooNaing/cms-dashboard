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
import { Bot, Footprints, Heading, House, Info, Settings2 } from "lucide-react"
import { Logo } from "./logo"
import { NavMain } from "./nav-main"

const data = {
  user: {
    name: "shadcn",
    email: "winhtoonaing2003@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: House,
      isActive: true,
      items: [
        {
          title: "Image Carousel",
          url: "/home",
        },
        {
          title: "Category",
          url: "/home/category",
        },
        {
          title: "Related Products",
          url: "/home/related-products",
        },
      ],
    },
    {
      title: "Products",
      url: "/products",
      icon: Info,
      items: [
        {
          title: "products",
          url: "/products",
        },
        {
          title: "Product Detail",
          url: "/products/detail",
        },
      ],
    },
    {
      title: "About",
      url: "/about",
      icon: Bot,
      items: [
        {
          title: "Description",
          url: "/about/description",
        },
        {
          title: "Who We Are",
          url: "/about/whoweare",
        },
        {
          title: "Our Purposes",
          url: "/about/ourpurposes",
        },
        {
          title: "Core Values",
          url: "/about/corevalues",
        },
        {
          title: "Why Choose Us",
          url: "/about/whychooseus",
        },
      ],
    },
    {
      title: "Contact",
      url: "/contact",
      icon: Settings2,
      items: [
        {
          title: "Contack Description",
          url: "/contact/description",
        },
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects global={data.global} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
