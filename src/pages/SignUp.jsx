import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Shield } from "lucide-react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("police");
  const nav = useNavigate();

  function submit(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("sp_users") || "[]");

    if (users.find((u) => u.uid === uid)) {
      alert("User ID already exists!");
      return;
    }

    users.push({
      uid,
      name,
      pass,
      role,
      coins: 0,
    });

    localStorage.setItem("sp_users", JSON.stringify(users));

    alert("Account created successfully!");
    nav("/signin");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 
      bg-gradient-to-br from-[#c7b48a] via-[#bfa774] to-[#b59e6d]"
    >
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white/95 shadow-2xl border border-[#e8d7b3]
        rounded-2xl p-10 backdrop-blur-xl animate-fadeIn"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-16 h-16 rounded-full bg-[#9A1B1B] border-4 border-[#D4AF37] 
            flex items-center justify-center mb-4 shadow-lg"
          >
            <Shield size={35} className="text-[#FFD700]" />
          </div>
          <h2 className="text-2xl font-bold text-[#9A1B1B]">
            Create a New Account
          </h2>
          <p className="text-sm text-[#3d3a30] mt-1">
            Register as Police Officer or Admin
          </p>
        </div>

        {/* Input Fields */}
        <input
          className="mt-3 w-full p-3 border border-[#d1c49b] rounded-lg 
          focus:ring-2 focus:ring-[#9A1B1B] outline-none"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="mt-3 w-full p-3 border border-[#d1c49b] rounded-lg 
          focus:ring-2 focus:ring-[#9A1B1B] outline-none"
          placeholder="User ID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          required
        />

        <input
          className="mt-3 w-full p-3 border border-[#d1c49b] rounded-lg 
          focus:ring-2 focus:ring-[#9A1B1B] outline-none"
          placeholder="Password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />

        <select
          className="mt-3 w-full p-3 border border-[#d1c49b] rounded-lg 
          focus:ring-2 focus:ring-[#9A1B1B] outline-none"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="police">Police Officer</option>
          <option value="admin">Admin</option>
        </select>

        {/* Sign Up Button */}
        <button
          className="mt-6 w-full py-3 text-lg font-semibold rounded-xl 
          bg-gradient-to-r from-[#9A1B1B] to-[#b32727] 
          hover:from-[#b32727] hover:to-[#9A1B1B] 
          text-white shadow-lg flex items-center justify-center gap-2
          transform hover:scale-105 transition-all"
        >
          <UserPlus size={20} /> Create Account
        </button>

        {/* Footer */}
        <p className="text-center mt-4 text-sm text-[#2e2d23]">
          Already registered?{" "}
          <span
            className="text-[#9A1B1B] font-semibold cursor-pointer"
            onClick={() => nav("/signin")}
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
}
