import React, { use } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../ContextApis/ContextProvider";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user, loading } = use(AuthContext);

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (!user) {
    return navigate("/login");
  }
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export default ProtectedRoute;

// import { useContext } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { AuthContext } from "./ContextProvider";
// import { useNavigate } from 'react-router';

// export default function ProtectedRoute() {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) {
//     return <p>Checking authentication...</p>; // spinner / loader dite পারো
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />; // protected content render হবে
// }
