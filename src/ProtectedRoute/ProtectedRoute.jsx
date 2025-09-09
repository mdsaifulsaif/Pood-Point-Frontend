import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../ContextApis/ContextProvider";
import LoadingPage from "../components/LoadingPage";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
