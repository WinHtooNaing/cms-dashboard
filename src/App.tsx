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

import Order from "./pages/order/Orders"

import { GuestRoute } from "./components/auth/GuestRoute"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"
import PermissionRoute from "./components/auth/PermissionRoute"

import UserManagement from "./pages/user/Users"
import RolesPage from "./pages/role/Roles"
import BrandPage from "./pages/brand/Brand"
import CategoryPage from "./pages/category/Category"
import ProfilePage from "./pages/profile/Profile"

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Main />,
        children: [
          {
            index: true,
            element: <Navigate to="/products" replace />,
          },

          {
            element: <PermissionRoute permission="cms:read" />,
            children: [
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
                path: "header",
                element: <Header />,
              },
              {
                path: "footer",
                element: <Footer />,
              },
            ],
          },

          {
            element: <PermissionRoute permission="product:read" />,
            children: [
              {
                path: "products",
                element: <Products />,
              },
              {
                path: "products/:id",
                element: <ProductView />,
              },
            ],
          },
          {
            element: <PermissionRoute permission="category:read" />,
            children: [
              {
                path: "category",
                element: <CategoryPage />,
              },
            ],
          },

          {
            element: <PermissionRoute permission="brand:read" />,
            children: [
              {
                path: "brand",
                element: <BrandPage />,
              },
            ],
          },

          {
            element: <PermissionRoute permission="order:read" />,
            children: [
              {
                path: "order",
                element: <Order />,
              },
              {
                path: "order/:id",
                element: <OrderDetailsPage />,
              },
            ],
          },

          {
            element: <PermissionRoute permission="user:manage" />,
            children: [
              {
                path: "users",
                element: <UserManagement />,
              },
            ],
          },

          {
            element: <PermissionRoute permission="role:manage" />,
            children: [
              {
                path: "roles",
                element: <RolesPage />,
              },
            ],
          },

          {
            path: "profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },

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
