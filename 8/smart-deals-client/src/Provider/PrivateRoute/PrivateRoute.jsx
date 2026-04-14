import React, { use } from "react";
import { AuthContext } from "../../../../../../2-react-second-phase/5-practice-whole-milestone/react-auth-router/src/Context/AuthContext";
import Loading from "../../Components/Shared/Loading/Loading";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (user && user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
};

export default PrivateRoute;
