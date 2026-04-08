import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./Layout/RootLayout.jsx";
import Home from "./Components/Home/Home.jsx";
import AllProducts from "./Components/AllProducts/AllProducts.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import Register from "./Components/Register/Register.jsx";
import Login from "./Components/Login/Login.jsx";
import MyProducts from "./Components/MyProducts/MyProducts.jsx";
import MyBids from "./Components/MyBids/MyBids.jsx";
import PrivateRoute from "./Components/Provider/PrivateRoute.jsx";
import ProductDetail from "./Components/ProductDetail/ProductDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/all-products',
        element: <PrivateRoute>
          <AllProducts></AllProducts>
        </PrivateRoute> 
      },
      {
        path: "/register",
        Component: Register
      },
      {
        path: "/login",
        Component: Login
      },
      {
        path: "/my-products",
        element: <PrivateRoute>
          <MyProducts></MyProducts>
        </PrivateRoute>
      },
      {
        path: "/my-bids",
        element: <PrivateRoute>
          <MyBids></MyBids>
        </PrivateRoute>
      },
      {
        path: "/product-details/:id",
        loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`),
        Component: ProductDetail
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
);
