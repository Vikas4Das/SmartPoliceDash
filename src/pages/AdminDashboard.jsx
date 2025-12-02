import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminHome from "../components/AdminHome";
import Approvals from "../components/Approvals";
import ReportsAdmin from "../components/ReportsAdmin";
import RewardEntry from "../components/RewardEntry";
import RewardHistory from "../components/RewardHistory";

import { useAuth } from "../utils/auth";
import Layout from "../components/Layout";

export default function AdminDashboard() {
  const auth = useAuth();

  if (!auth.user) return <Navigate to="/signin" replace />;

  return (
    <Layout>
      <div className="space-y-6">

        {/* Admin Welcome Card */}
        <div className="bg-white/90 shadow-xl rounded-2xl p-6 border border-[#f2e4c1]">
          <h2 className="text-2xl font-bold text-[#9A1B1B]">
            Welcome, Admin {auth.user.name}
          </h2>
          <p className="text-[#3d3a30] mt-1">
            Manage district Good Work approvals, reward entries, reports & analytics here.
          </p>
        </div>

        {/* Main Admin Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="bg-white/95 p-6 rounded-2xl shadow-xl border border-[#f2e4c1]">
                <h3 className="text-xl font-semibold text-[#9A1B1B] mb-3">
                  Admin Overview
                </h3>
                <p className="text-[#3d3a30]">
                  Quickly access approvals, reward management, and analytics tools.
                </p>
              </div>
            }
          />

          <Route path="approval" element={<Approvals />} />

          <Route path="reports" element={<ReportsAdmin />} />

          <Route path="reward" element={<RewardEntry />} />

          <Route path="reward-history" element={<RewardHistory />} />
        </Routes>
      </div>
    </Layout>
  );
}
