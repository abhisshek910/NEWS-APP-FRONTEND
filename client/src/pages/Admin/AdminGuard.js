// AdminGuard.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/admin" />;
  }
};

export default AdminGuard;
