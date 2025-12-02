import React, { useState } from "react";
import { Link, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../utils/auth";

import EntryForm from "../components/EntryForm";
import LeaderBoard from "../components/LeaderBoard";
import Reports from "../components/Reports";
import RewardHistory from "../components/RewardHistory";

import {
  Home,
  ClipboardList,
  Award,
  BarChart2,
  LogOut,
  User,
  Trophy,
  Activity,
} from "lucide-react";

/* Chart.js */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

/* ----------------------------------------
   MAIN DASHBOARD COMPONENT
------------------------------------------- */
export default function OfficerDashboard() {
  const auth = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");

  if (!auth.user) return <Navigate to="/signin" replace />;

  const isHomePage = location.pathname === "/officer";

  return (
    <div className="flex min-h-screen bg-[#f9f4e7]">

      {/* ---------- Sidebar ---------- */}
      <aside className="w-64 bg-gradient-to-b from-[#c2a878] to-[#a99067] text-white p-6 shadow-xl">

        {/* Profile */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-[#9A1B1B] rounded-full flex items-center justify-center text-xl font-bold">
            PO
          </div>
          <h2 className="text-xl font-bold leading-tight">
            Smart Police <br /> Work Tracker
          </h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">

          <Link
            to="/officer"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg 
              ${location.pathname === "/officer" ? "bg-[#9A1B1B]" : "hover:bg-[#9A1B1B]"}`}
          >
            <Home size={18} /> Home
          </Link>

          <Link
            to="data"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg 
              ${location.pathname.includes("/officer/data") ? "bg-[#9A1B1B]" : "hover:bg-[#9A1B1B]"}`}
          >
            <ClipboardList size={18} /> Data Entry
          </Link>

          <Link
            to="leaderboard"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg 
              ${location.pathname.includes("/officer/leaderboard") ? "bg-[#9A1B1B]" : "hover:bg-[#9A1B1B]"}`}
          >
            <BarChart2 size={18} /> Leaderboard
          </Link>

          <Link
            to="reports"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg 
              ${location.pathname.includes("/officer/reports") ? "bg-[#9A1B1B]" : "hover:bg-[#9A1B1B]"}`}
          >
            <Award size={18} /> Reports
          </Link>

          <Link
            to="reward-history"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg 
              ${location.pathname.includes("/officer/reward-history") ? "bg-[#9A1B1B]" : "hover:bg-[#9A1B1B]"}`}
          >
            <Trophy size={18} /> Reward History
          </Link>

        </nav>

        {/* Logout */}
        <button
          className="mt-16 flex items-center gap-3 bg-[#8A1515] px-4 py-2 rounded-lg w-full"
          onClick={() => auth.signout()}
        >
          <LogOut size={18} /> Logout
        </button>

      </aside>


      {/* ---------- Main Content ---------- */}
      <div className="flex-1 p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-[#9A1B1B]">
              Hello, {auth.user.name}
            </h1>
            <p className="text-[#4f4533]">Officer Dashboard</p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
            <User size={18} className="text-[#9A1B1B]" />
            <span>{auth.user.role.toUpperCase()}</span>
          </div>
        </div>


        {/* SHOW TABS ONLY ON HOME PAGE */}
        {isHomePage && (
          <>
            <div className="flex gap-6 mb-8">
              <TabButton label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
              <TabButton label="Performance" active={activeTab === "performance"} onClick={() => setActiveTab("performance")} />
              <TabButton label="Rewards" active={activeTab === "rewards"} onClick={() => setActiveTab("rewards")} />
            </div>

            <div>
              {activeTab === "overview" && <OverviewTab />}
              {activeTab === "performance" && <PerformanceTab />}
              {activeTab === "rewards" && <RewardsTab />}
            </div>
          </>
        )}

        {/* ---------- OTHER ROUTES HERE ---------- */}
        <Routes>
          <Route path="data" element={<EntryForm />} />
          <Route path="leaderboard" element={<LeaderBoard />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reward-history" element={<RewardHistory />} />
        </Routes>

      </div>

    </div>
  );
}

/* ----------------------------------------
   OVERVIEW TAB
------------------------------------------- */
function OverviewTab() {
  return (
    <div className="space-y-8">

      {/* Welcome card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#9A1B1B]">
        <h2 className="text-xl font-semibold text-[#9A1B1B]">
          Recent Good Work Entries
        </h2>
        <p className="text-[#4f4533] mt-2">Dynamic data will appear later.</p>
      </div>

      {/* Activity section */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-[#9A1B1B] flex items-center gap-2">
          <Activity size={20} /> Recent Activity
        </h2>

        <div className="mt-4 space-y-3">
          <ActivityItem text="Earned 10 points for NBW Execution" time="2 hours ago" />
          <ActivityItem text="Uploaded case documentation files" time="1 day ago" />
          <ActivityItem text="Submitted monthly performance report" time="3 days ago" />
        </div>
      </div>

    </div>
  );
}

function ActivityItem({ text, time }) {
  return (
    <div className="p-4 bg-[#f8f1dd] rounded-lg">
      <p className="font-medium">{text}</p>
      <p className="text-sm text-gray-600">{time}</p>
    </div>
  );
}

/* ----------------------------------------
   PERFORMANCE TAB
------------------------------------------- */
function PerformanceTab() {

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Points Earned",
        data: [120, 150, 180, 220, 260, 320],
        borderColor: "#9A1B1B",
        backgroundColor: "rgba(154,27,27,0.2)",
        tension: 0.4,
        borderWidth: 3,
        fill: true,
      },
      {
        label: "Submissions",
        data: [10, 12, 14, 18, 22, 29],
        borderColor: "#C2A878",
        backgroundColor: "rgba(194,168,120,0.25)",
        tension: 0.4,
        borderWidth: 3,
        fill: true,
      },
    ],
  };

  const barData = {
    labels: ["NBW", "Convictions", "Firearms", "Drug Cases", "Other"],
    datasets: [
      {
        label: "Submissions",
        data: [8, 5, 4, 3, 4],
        backgroundColor: ["#9A1B1B", "#C2A878", "#A47E3B", "#8A1515", "#C9B27A"],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="space-y-8">
      
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-[#9A1B1B] mb-4">Performance Trend</h2>
        <Line data={lineData} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-[#9A1B1B] mb-4">Data Submission History</h2>
        <Bar data={barData} />
      </div>

    </div>
  );
}

/* ----------------------------------------
   REWARDS TAB
------------------------------------------- */
function RewardsTab() {
  return (
    <div className="space-y-8">

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-[#9A1B1B] mb-3">Points Summary</h2>
        <p className="text-[#4f4533]">You have <b>320 points</b> earned.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <RewardCard title="Certificate of Appreciation" points="100" />
        <RewardCard title="Extra Day Off" points="250" />
        <RewardCard title="Department Recognition" points="500" />
      </div>

    </div>
  );
}

function RewardCard({ title, points }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg text-center border-t-4 border-[#9A1B1B]">
      <h3 className="text-3xl font-bold text-[#9A1B1B]">{points}</h3>
      <p className="mt-2 text-[#4f4533]">{title}</p>
      <button className="mt-4 px-4 py-2 bg-[#9A1B1B] text-white rounded-lg w-full">
        Redeem
      </button>
    </div>
  );
}

/* ----------------------------------------
   REUSABLE TAB BUTTON
------------------------------------------- */
function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-medium ${
        active ? "bg-[#9A1B1B] text-white" : "bg-[#e8d8b6] text-[#4f4533]"
      }`}
    >
      {label}
    </button>
  );
}
