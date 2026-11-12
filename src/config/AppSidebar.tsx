import {
  House,
  Package,
  ShoppingCart,
  Boxes,
  User,
  Info,
  Settings2,
  Heading,
  Footprints,
  Bot,
  ListOrdered,
  ScratchBlocks,
} from "lucide-react"

export const navigation = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: House,
        permission: "dashboard.read",
      },
    ],
  },

  {
    title: "CMS Management",
    items: [
      {
        title: "Home",
        url: "/home",
        icon: House,
        permission: "carousel.read",
        children: [
          {
            title: "Image Carousel",
            url: "/home",
            permission: "carousel.read",
          },
          {
            title: "Category",
            url: "/home/category",
            permission: "category.read",
          },
          {
            title: "New Collection",
            url: "/home/new-collection",
            permission: "collection.read",
          },
        ],
      },

      {
        title: "About",
        url: "/about/description",
        icon: Info,
        permission: "about.read",
        children: [
          {
            title: "Description",
            url: "/about/description",
            permission: "about.read",
          },
          {
            title: "Who We Are",
            url: "/about/whoweare",
            permission: "about.read",
          },
          {
            title: "Our Purposes",
            url: "/about/ourpurposes",
            permission: "about.read",
          },
          {
            title: "Core Values",
            url: "/about/corevalues",
            permission: "about.read",
          },
          {
            title: "Why Choose Us",
            url: "/about/whychooseus",
            permission: "about.read",
          },
        ],
      },

      {
        title: "Contact",
        url: "/contact/description",
        icon: Settings2,
        permission: "contact.read",
      },

      {
        title: "Header",
        url: "/header",
        icon: Heading,
        permission: "header.read",
      },

      {
        title: "Footer",
        url: "/footer",
        icon: Footprints,
        permission: "footer.read",
      },
    ],
  },

  {
    title: "E-commerce",
    items: [
      {
        title: "Products",
        url: "/products",
        icon: Package,
        permission: "product.read",
      },

      {
        title: "Orders",
        url: "/order",
        icon: ShoppingCart,
        permission: "order.read",
      },

      {
        title: "Stock",
        url: "/stock",
        icon: Boxes,
        permission: "stock.read",
      },
    ],
  },

  {
    title: "System Management",
    items: [
      {
        title: "Users",
        url: "/users",
        icon: User,
        permission: "user.read",
      },

      {
        title: "Roles",
        url: "/roles",
        icon: Bot,
        permission: "role.read",
      },
    ],
  },
]
