import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  FileSpreadsheet,
  ListOrdered,
  Award,
  FileText,
  Shield,
  LogOut,
  ClipboardList
} from "lucide-react";
import { useAuth } from "../utils/auth";

export default function Sidebar({ role }) {
  const auth = useAuth();

  function logout() {
    auth.signout();
    window.location.href = "/signin";
  }

  return (
    <div
      className="w-64 min-h-screen fixed left-0 top-0 
      bg-gradient-to-b from-[#b6a16a] via-[#b59e6d] to-[#a48d58]
      border-r border-[#e8d7b3] shadow-xl p-6"
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-10">
        <div
          className="w-12 h-12 rounded-full bg-[#9A1B1B] shadow-xl 
          border-4 border-[#D4AF37] flex items-center justify-center"
        >
          <Shield size={28} className="text-[#FFD700]" />
        </div>
        <h2 className="text-xl font-bold text-[#1A1D2E] leading-tight">
          Smart Police <br /> Work Tracker
        </h2>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-3">

        {/* COMMON LINKS */}
        <SidebarLink to={role === "admin" ? "/admin" : "/officer"} label="Home" icon={<Home size={20} />} />

        {/* OFFICER MODULES */}
        {role === "police" && (
          <>
            <SidebarLink to="/officer/data" label="Data Entry" icon={<FileSpreadsheet size={20} />} />
            <SidebarLink to="/officer/leaderboard" label="Leaderboard" icon={<ListOrdered size={20} />} />
            <SidebarLink to="/officer/reports" label="Reports" icon={<FileText size={20} />} />
            <SidebarLink to="/officer/reward-history" label="Reward History" icon={<Award size={20} />} />
          </>
        )}

        {/* ADMIN MODULES */}
        {role === "admin" && (
          <>
            <SidebarLink to="/admin/approval" label="Approval Section" icon={<ClipboardList size={20} />} />
            <SidebarLink to="/admin/reports" label="Reports" icon={<FileText size={20} />} />
            <SidebarLink to="/admin/reward" label="Reward Entry" icon={<Award size={20} />} />
            <SidebarLink to="/admin/reward-history" label="Reward History" icon={<ListOrdered size={20} />} />
          </>
        )}

      </nav>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="mt-10 w-full flex items-center gap-3 px-4 py-3
        bg-[#9A1B1B] text-white rounded-xl shadow-md
        hover:bg-[#7d1515] transition-all"
      >
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
}

function SidebarLink({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-medium
        transition-all ${
          isActive
            ? "bg-[#9A1B1B] text-white shadow-lg"
            : "text-[#1A1D2E] hover:bg-[#e8d7b3]"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
