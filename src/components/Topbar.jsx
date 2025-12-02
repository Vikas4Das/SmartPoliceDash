import React from "react";
import { Bell, Search } from "lucide-react";
import { useAuth } from "../utils/auth";

export default function Topbar() {
  const auth = useAuth();
  const user = auth.user;

  return (
    <div
      className="w-full h-20 fixed top-0 left-64 z-20 
      bg-[#f7f1df]/90 backdrop-blur-md
      border-b border-[#e8d7b3]
      shadow-md flex items-center justify-between px-8"
    >
      {/* Left Section - Greeting */}
      <div>
        <h2 className="text-xl font-bold text-[#9A1B1B]">
          Hello, {user?.name}
        </h2>
        <p className="text-[#4f4a38] text-sm">
          {user?.role === "admin" ? "Administrator Panel" : "Officer Dashboard"}
        </p>
      </div>

      {/* Right Section - Search + Notification */}
      <div className="flex items-center gap-6">
        
        {/* Search Bar */}
        <div
          className="hidden md:flex items-center gap-2 bg-white px-4 py-2 
          rounded-xl border border-[#e3d7b6] shadow-sm"
        >
          <Search size={18} className="text-[#9A1B1B]" />
          <input
            className="bg-transparent outline-none text-sm text-[#1A1D2E]"
            placeholder="Search… (not functional yet)"
            disabled
          />
        </div>

        {/* Notification Bell */}
        <div
          className="w-11 h-11 rounded-full bg-white border border-[#e3d7b6] 
          shadow-md flex items-center justify-center cursor-pointer 
          hover:bg-[#e8d7b3] transition-all"
        >
          <Bell size={20} className="text-[#9A1B1B]" />
        </div>
      </div>
    </div>
  );
}
