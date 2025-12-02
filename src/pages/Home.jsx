import React from "react";
import { Link } from "react-router-dom";
import { Shield, UserPlus, LogIn } from "lucide-react";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 
      bg-gradient-to-br from-[#c7b48a] via-[#bfa774] to-[#b59e6d] text-[#1A1D2E]"
    >

      {/* Logo + Title */}
      <div className="flex flex-col items-center text-center mb-12">
        
        {/* Police Badge */}
        <div
          className="w-20 h-20 rounded-full bg-[#9A1B1B] shadow-2xl 
          border-4 border-[#D4AF37] flex items-center justify-center mb-5 
          animate-[pulse_2s_ease-in-out_infinite]"
        >
          <Shield size={45} className="text-[#FFD700]" />
        </div>

        <h1 className="text-4xl font-extrabold text-[#1A1D2E] tracking-wide">
          Smart Police Work Tracker
        </h1>

        <p className="text-lg text-[#2e2d23] mt-2 font-medium max-w-lg">
          AI-powered insights & analytics for CCTNS Good Work recognition,
          district performance tracking, and real-time police achievements.
        </p>
      </div>

      {/* Main Card */}
      <div
        className="bg-white/90 backdrop-blur-xl shadow-2xl border border-[#f3e7c3]
        rounded-2xl p-10 w-full max-w-md text-center 
        hover:shadow-[0_0_28px_rgba(154,27,27,0.45)] transition-all duration-300"
      >
        <h2 className="text-2xl font-bold text-[#9A1B1B] mb-6">
          Create Your Account
        </h2>

        {/* SIGN UP BUTTON */}
        <Link
          to="/signup"
          className="w-full py-3 text-lg font-semibold rounded-xl 
          bg-gradient-to-r from-[#9A1B1B] to-[#b32727] 
          hover:from-[#b32727] hover:to-[#9A1B1B] 
          text-white shadow-xl flex items-center justify-center gap-2
          transform hover:scale-105 transition-all"
        >
          <UserPlus size={20} /> Create Account
        </Link>

        {/* Divider */}
        <div className="my-6 h-[1px] bg-[#d1c49b] opacity-80" />

        <p className="text-[#3d3a30] mb-2 font-medium">
          Already have an account?
        </p>

        {/* SIGN IN LINK */}
        <Link
          to="/signin"
          className="inline-flex items-center gap-2 text-[#9A1B1B] 
          hover:text-[#7d1515] font-semibold text-lg transition-all"
        >
          <LogIn size={18} /> Sign In
        </Link>
      </div>

      {/* Footer */}
      <p className="mt-8 text-sm text-[#2e2d23] opacity-80">
        © Odisha Police | Smart Analytics Dashboard
      </p>
    </div>
  );
}
