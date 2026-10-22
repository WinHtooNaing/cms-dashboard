import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Main from "./layouts/Main"
import Login from "./pages/auth/Login"
import Header from "./pages/Header"
import Footer from "./pages/Footer"
import ImageCarousel from "./pages/home/ImageCarousel"
import Category from "./pages/home/Category"
import RelatedProducts from "./pages/home/RelatedProducts"
import ContactDescription from "./pages/contact/ContactDescription"
import Description from "./pages/about/Description"
import WhoWeAre from "./pages/about/WhoWeAre"
import OurPurposes from "./pages/about/OurPurposes"
import CoreValues from "./pages/about/CoreValues"
import WhyChooseUs from "./pages/about/WhyChooseUs"

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
          path: "/about/description",
          element: <Description />,
        },
        {
          path: "/about/whoweare",
          element: <WhoWeAre />,
        },
        {
          path: "/about/ourpurposes",
          element: <OurPurposes />,
        },
        {
          path: "/about/corevalues",
          element: <CoreValues />,
        },
        {
          path: "/about/whychooseus",
          element: <WhyChooseUs />,
        },
        {
          path: "/contact/description",
          element: <ContactDescription />,
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
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
