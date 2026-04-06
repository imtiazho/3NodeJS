import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Users from "./Components/Users/Users.jsx";
import UsersDetails from "./Components/Users/UsersDetails/UsersDetails.jsx";
import UpdateUser from "./Components/UpdateUser/UpdateUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "users/:id",
    loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`),
    Component: UsersDetails,
  },
  {
    path: "update/:id",
    loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`),
    Component: UpdateUser
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
