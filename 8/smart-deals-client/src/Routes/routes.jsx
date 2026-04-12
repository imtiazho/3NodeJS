import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import AllProducts from "../Components/AllProducts/AllProducts";
import MyProduct from "../Components/Shared/NavBar/Individual/MyProduct/MyProduct";
import MyBids from "../Components/Shared/NavBar/Individual/MyBids/MyBids";
import CreateProducts from "../Components/CreateProducts/CreateProducts";

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
        Component: MyProduct,
      },
      {
        path: "/my-bids",
        loader: () =>
          fetch(
            "https://raw.githubusercontent.com/imtiazho/JsonData/refs/heads/main/bids.json",
          ).then((res) => res.json()),
        Component: MyBids,
      },
      {
        path: "/create-product",
        Component: CreateProducts,
      },
    ],
  },
]);

export default router;
