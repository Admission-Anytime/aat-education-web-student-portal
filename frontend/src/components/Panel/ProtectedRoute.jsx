import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  console.log("Token in ProtectedRoute:", token); // ✅ check here

  if (!token || token === "undefined") {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // Logged in → render the protected component
};

export default ProtectedRoute;
