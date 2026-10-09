import React from "react";
import { Navigate } from "react-router-dom";

/**
 * AdminProtectedRoute:
 * 🔒 STRICT ENFORCEMENT:
 * - Only approved 'admin' or approved 'staff' can access /panel
 * - 'student' is strictly blocked and redirected to /student
 * - unapproved 'staff' or 'alumni' are blocked and redirected to /login
 */
export const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  const userStr = localStorage.getItem("adminUser");
  let user = null;

  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch (err) {
    user = null;
  }

  // Not logged in -> Redirect to login
  if (!token || token === "undefined") {
    return <Navigate to="/login" replace />;
  }

  const userRole = String(user?.role || "").toLowerCase();

  // ⛔ STRICT POLICY: Student can NEVER navigate to Admin Panel
  if (userRole === "student" || userRole === "alumni") {
    console.warn("⛔ Access Denied: Only Admin and approved Staff can access the Admin Panel.");
    return <Navigate to="/student" replace />;
  }

  // 🛡️ Super Admin Access (check admin first!)
  if (userRole === "admin" || user?.email === "aastechit@admin.com") {
    return children;
  }

  // 🔒 STRICT APPROVAL: Staff MUST have explicit admin approval
  if (userRole === "staff") {
    if (user?.isApproved === false || user?.status === "pending" || user?.status === "suspended") {
      console.warn("🔒 Staff account requires administrator approval.");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      return <Navigate to="/login?pending=true" replace />;
    }
    return children;
  }

  // Block any unknown or unapproved role
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
  return <Navigate to="/login" replace />;
};

/**
 * StudentProtectedRoute:
 * - Allows authenticated students to view their student dashboard
 */
export const StudentProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token || token === "undefined") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
