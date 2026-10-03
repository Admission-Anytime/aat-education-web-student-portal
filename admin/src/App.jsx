import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./components/Pages/AdminLogin";
import AdminPanel from "./components/Panel/AdminPanel";
import StudentPortalPage from "./components/Pages/StudentPortalPage";
import { AdminProtectedRoute, StudentProtectedRoute } from "./components/Panel/ProtectedRoute";

// Smart redirect based on authentic user role
const SmartHomeRedirect = () => {
  const token = localStorage.getItem("adminToken");
  const userStr = localStorage.getItem("adminUser");

  if (!token || token === "undefined") {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    if (user?.role === "student" || user?.role === "alumni") {
      return <Navigate to="/student" replace />;
    }
    if (user?.role === "admin") {
      return <Navigate to="/panel" replace />;
    }
    if (user?.role === "staff" && user?.isApproved === true && user?.status === "active") {
      return <Navigate to="/panel" replace />;
    }
  } catch (err) {}

  return <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Routes>
      {/* Root smart navigation based on role */}
      <Route path="/" element={<SmartHomeRedirect />} />

      {/* Admin & Approved Staff Panel (Strictly protected from students) */}
      <Route
        path="/panel"
        element={
          <AdminProtectedRoute>
            <AdminPanel />
          </AdminProtectedRoute>
        }
      />

      {/* Dedicated Student Portal (Accessible only by students) */}
      <Route
        path="/student"
        element={
          <StudentProtectedRoute>
            <StudentPortalPage />
          </StudentProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <StudentProtectedRoute>
            <StudentPortalPage />
          </StudentProtectedRoute>
        }
      />

      {/* Multi-role Login page (Admin, Staff, Alumni, Student) */}
      <Route path="/login" element={<AdminLogin />} />

      {/* Catch-all redirect */}
      <Route path="*" element={<SmartHomeRedirect />} />
    </Routes>
  );
};

export default App;
