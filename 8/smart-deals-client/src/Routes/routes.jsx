import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import AllProducts from "../Components/AllProducts/AllProducts";
import MyProduct from "../Components/Shared/NavBar/Individual/MyProduct/MyProduct";
import MyBids from "../Components/Shared/NavBar/Individual/MyBids/MyBids";
import CreateProducts from "../Components/CreateProducts/CreateProducts";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Components/Shared/NavBar/Individual/Login/Login";
import Register from "../Components/Register/Register";
import ProductDetails from "../ProductDetails/ProductDetails";
import PrivateRoute from "../Provider/PrivateRoute/PrivateRoute";

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
        path: "/all-products",
        loader: () =>
          fetch(
            "https://raw.githubusercontent.com/imtiazho/JsonData/refs/heads/main/products.json",
          ).then((res) => res.json()),
        Component: AllProducts,
      },
      {
        path: "/my-products",
        loader: () =>
          fetch(
            "https://raw.githubusercontent.com/imtiazho/JsonData/refs/heads/main/products.json",
          ).then((res) => res.json()),
        element: (
          <PrivateRoute>
            <MyProduct></MyProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bids",
        loader: () =>
          fetch(
            "https://raw.githubusercontent.com/imtiazho/JsonData/refs/heads/main/bids.json",
          ).then((res) => res.json()),
        element: (
          <PrivateRoute>
            {" "}
            <MyBids></MyBids>
          </PrivateRoute>
        ),
      },
      {
        path: "/create-product",
        element: (
          <PrivateRoute>
            <CreateProducts></CreateProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "/product-details/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
]);

export default router;
