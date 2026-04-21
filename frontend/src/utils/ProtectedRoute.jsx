// import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import GlobalLoader from "../components/GlobalLoader";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
