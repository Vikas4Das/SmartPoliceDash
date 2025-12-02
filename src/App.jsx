import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import OfficerDashboard from "./pages/OfficerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import { AuthProvider } from "./utils/auth";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#f7f1df] text-[#1A1D2E]">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Role-Based Routes */}
          <Route path="/officer/*" element={<OfficerDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* Redirect any unknown route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
