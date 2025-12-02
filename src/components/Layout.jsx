import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAuth } from "../utils/auth";

export default function Layout({ children }) {
  const auth = useAuth();
  const role = auth.user?.role;

  return (
    <div className="flex">

      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Content Area */}
      <div className="flex-1 ml-64">

        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <div className="pt-24 px-10 pb-10">
          {children}
        </div>

      </div>
    </div>
  );
}
