import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Main from "./layouts/Main"
import Login from "./pages/auth/Login"
import Home from "./pages/Home"
import Product from "./pages/Product"
import ProductDetail from "./pages/ProductDetail"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Header from "./pages/Header"
import Footer from "./pages/Footer"
export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/products",
          element: <Product />,
        },
        {
          path: "/product-detail",
          element: <ProductDetail />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
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
  return <RouterProvider router={router} />
}

export default App
