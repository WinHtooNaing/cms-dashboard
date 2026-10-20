import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Main from "./layouts/Main"
import Login from "./pages/auth/Login"
import Header from "./pages/Header"
import Footer from "./pages/Footer"
import ImageCarousel from "./pages/home/ImageCarousel"
import Category from "./pages/home/Category"
import RelatedProducts from "./pages/home/RelatedProducts"
import { Toaster } from "./components/ui/sonner"

function SidebarPage({ title }: { title: string }) {
  return <div>{title}</div>
}

export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Navigate to="/home" replace />,
        },
        {
          path: "/home",
          element: <ImageCarousel />,
        },
        {
          path: "/home/category",
          element: <Category />,
        },
        {
          path: "/home/related-products",
          element: <RelatedProducts />,
        },
        {
          path: "/products",
          element: <SidebarPage title="Products" />,
        },
        {
          path: "/products/detail",
          element: <SidebarPage title="Product Detail" />,
        },
        {
          path: "/about",
          element: <SidebarPage title="About" />,
        },
        {
          path: "/about-get-started",
          element: <SidebarPage title="Get Started" />,
        },
        {
          path: "/contact",
          element: <SidebarPage title="Contact" />,
        },
        {
          path: "/contact/general",
          element: <SidebarPage title="Contact: General" />,
        },
        {
          path: "/contact/team",
          element: <SidebarPage title="Contact: Team" />,
        },
        {
          path: "/contact/billing",
          element: <SidebarPage title="Contact: Billing" />,
        },
        {
          path: "/contact/limits",
          element: <SidebarPage title="Contact: Limits" />,
        },

        {
          path: "/header",
          element: <Header />,
        },
        {
          path: "/footer",
          element: <Footer />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ])
  return
  ;<>
    <RouterProvider router={router} />
    <Toaster position="top-right" richColors />
  </>
}

export default App
