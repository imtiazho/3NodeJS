import React from "react";
import NavBar from "../../Components/Shared/NavBar/NavBar";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
