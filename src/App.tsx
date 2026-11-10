import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

import { Toaster } from "sonner"
import OrderDetailsPage from "./components/orders/OrderDetailsPage"
import Main from "./layouts/Main"
import Login from "./pages/auth/Login"

import Header from "./pages/Header"
import Footer from "./pages/Footer"

import Category from "./pages/home/Category"
import NewCollection from "./pages/home/NewCollection"
import CarouselManagement from "./pages/home/CarouselManagement"

import ContactDescription from "./pages/contact/ContactUsManagement"

import Description from "./pages/about/Description"
import WhoWeAre from "./pages/about/WhoWeAre"
import OurPurposes from "./pages/about/OurPurposes"
import CoreValues from "./pages/about/CoreValues"
import WhyChooseUs from "./pages/about/WhyChooseUs"

import Products from "./pages/products/Products"
import ProductView from "./components/products/ProductView"

import Settings from "./pages/auth/Settings"
import Order from "./pages/order/Orders"

import { GuestRoute } from "./components/auth/GuestRoute"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"
import Stock from "./pages/stock/Stock"
import UserManagement from "./pages/user/Users"
import RolesPage from "./pages/role/Roles"

const router = createBrowserRouter([
  // Guest routes
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  // Protected dashboard routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Main />,
        children: [
          {
            index: true,
            element: <Navigate to="/home" replace />,
          },
          {
            path: "home",
            element: <CarouselManagement />,
          },
          {
            path: "home/category",
            element: <Category />,
          },
          {
            path: "home/new-collection",
            element: <NewCollection />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "products/:id",
            element: <ProductView />,
          },
          {
            path: "about/description",
            element: <Description />,
          },
          {
            path: "about/whoweare",
            element: <WhoWeAre />,
          },
          {
            path: "about/ourpurposes",
            element: <OurPurposes />,
          },
          {
            path: "about/corevalues",
            element: <CoreValues />,
          },
          {
            path: "about/whychooseus",
            element: <WhyChooseUs />,
          },
          {
            path: "contact/description",
            element: <ContactDescription />,
          },
          {
            path: "order",
            element: <Order />,
          },
          {
            path: "stock",
            element: <Stock />,
          },
          {
            path: "users",
            element: <UserManagement />,
          },
          {
            path: "roles",
            element: <RolesPage />,
          },
          {
            path: "/order/:id",
            element: <OrderDetailsPage />,
          },
          {
            path: "header",
            element: <Header />,
          },
          {
            path: "footer",
            element: <Footer />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },

  // Optional: handle unknown URLs
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </>
  )
}

export default App
