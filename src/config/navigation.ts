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

import type { LucideIcon } from "lucide-react"

export type NavigationItem = {
  title: string
  url: string
  icon?: LucideIcon
  permission?: string

  items?: {
    title: string
    url: string
    permission?: string
  }[]
}

export type NavigationGroup = {
  title: string
  items: NavigationItem[]
}

export const navigationGroups: NavigationGroup[] = [
  // E-COMMERCE
  {
    title: "E-commerce",

    items: [
      {
        title: "Products",
        url: "/products",
        icon: Package,

        items: [
          {
            title: "Products",
            url: "/products",
            permission: "product:read",
          },
        ],
      },

      {
        title: "Orders",
        url: "/order",
        icon: ShoppingCart,

        items: [
          {
            title: "Orders",
            url: "/order",
            permission: "order:read",
          },
        ],
      },

      {
        title: "Brand",
        url: "/brand",
        icon: BracesIcon,

        items: [
          {
            title: "Brand",
            url: "/brand",
            permission: "brand:read",
          },
        ],
      },

      {
        title: "Categories",
        url: "/category",
        icon: LayoutDashboard,

        items: [
          {
            title: "Categories",
            url: "/category",
            permission: "category:read",
          },
        ],
      },

      {
        title: "User Management",
        url: "/users",
        icon: User,

        items: [
          {
            title: "Users",
            url: "/users",
            permission: "user:manage",
          },
          {
            title: "Roles",
            url: "/roles",
            permission: "role:manage",
          },
        ],
      },
    ],
  },

  // CONTENT MANAGEMENT

  {
    title: "Content Management",

    items: [
      {
        title: "Home Page",
        url: "/home",
        icon: House,
        items: [
          {
            title: "Image Carousel",
            url: "/home",
            permission: "cms:read",
          },
          {
            title: "Category",
            url: "/home/category",
            permission: "cms:read",
          },
          {
            title: "New Collection",
            url: "/home/new-collection",
            permission: "cms:read",
          },
        ],
      },

      {
        title: "About Us",
        url: "/about",
        icon: Info,
        items: [
          {
            title: "Description",
            url: "/about/description",
            permission: "cms:read",
          },
          {
            title: "Who We Are",
            url: "/about/whoweare",
            permission: "cms:read",
          },
          {
            title: "Our Purposes",
            url: "/about/ourpurposes",
            permission: "cms:read",
          },
          {
            title: "Core Values",
            url: "/about/corevalues",
            permission: "cms:read",
          },
          {
            title: "Why Choose Us",
            url: "/about/whychooseus",
            permission: "cms:read",
          },
        ],
      },

      {
        title: "Contact Us",
        url: "/contact",
        icon: Contact,
        items: [
          {
            title: "Contact Description",
            url: "/contact/description",
            permission: "cms:read",
          },
        ],
      },

      {
        title: "Global Settings",
        url: "/header",
        icon: LayoutDashboard,
        items: [
          {
            title: "Header",
            url: "/header",
            permission: "cms:read",
          },
          {
            title: "Footer",
            url: "/footer",
            permission: "cms:read",
          },
        ],
      },
    ],
  },
]
