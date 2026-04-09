import React, { use } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const NavBar = () => {
  const { user, loginOut } = use(AuthContext);

  const handleLogOut = () => {
    loginOut()
      .then(() => {
        console.log("User signout");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "text-slate-700"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-products"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "text-slate-700"
          }
        >
          All Products
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/my-products"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "text-slate-700"
              }
            >
              My Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-bids"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "text-slate-700"
              }
            >
              My Bids
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-product"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "text-slate-700"
              }
            >
              Create Product
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 lg:px-8">
      {/* Brand Section */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <NavLink
          to="/"
          className="text-2xl font-black flex gap-0 hover:bg-transparent"
        >
          <span className="text-slate-900">Smart</span>
          <span className="text-[#9F62F2]">Deals</span>
        </NavLink>
      </div>

      {/* Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium text-slate-700">
          {links}
        </ul>
      </div>

      {/* Auth Buttons */}
      <div className="navbar-end">
        {user ? (
          <button onClick={handleLogOut} className="btn border-none text-white px-6 min-h-0 h-10 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:opacity-90">
            Log Out
          </button>
        ) : (
          <div className="flex gap-3">
            <NavLink
              to="/login"
              className="btn btn-outline border-[#9F62F2] text-[#9F62F2] hover:text-[#fff] hover:bg-[#9F62F2] hover:border-[#9F62F2] px-6 min-h-0 h-10"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="btn border-none text-white px-6 min-h-0 h-10 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:opacity-90"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
