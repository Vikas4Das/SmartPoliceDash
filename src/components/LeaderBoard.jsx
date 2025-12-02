import React from "react";
import { Award, Shield } from "lucide-react";

export default function LeaderBoard() {
  const users = JSON.parse(localStorage.getItem("sp_users") || "[]");

  const sorted = users
    .slice()
    .sort((a, b) => (b.coins || 0) - (a.coins || 0));

  return (
    <div
      className="bg-white/95 p-8 rounded-2xl shadow-xl border border-[#e8d7b3] 
      animate-fadeIn max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-full bg-[#9A1B1B] flex items-center justify-center 
          shadow-md border-4 border-[#D4AF37]"
        >
          <Award size={26} className="text-[#FFD700]" />
        </div>

      <h2 className="text-2xl font-bold text-[#9A1B1B]">Performance Leaderboard</h2>
      </div>

      {/* Leaderboard Items */}
      <div className="space-y-4">

        {sorted.length === 0 && (
          <p className="text-center text-[#3d3a30]">No officers found.</p>
        )}

        {sorted.map((user, index) => (
          <div
            key={user.uid}
            className="flex items-center justify-between bg-white rounded-xl p-5 
            border border-[#f0e4c3] shadow-md hover:shadow-lg transition-all 
            hover:scale-[1.01]"
          >
            {/* Rank + Medal */}
            <div className="flex items-center gap-4">
              <RankBadge index={index} />

              <div>
                <p className="text-lg font-semibold text-[#1A1D2E]">{user.name}</p>
                <p className="text-sm text-[#6a6247]">User ID: {user.uid}</p>
              </div>
            </div>

            {/* Coins */}
            <div className="flex items-center gap-2 bg-[#fff5d7] px-4 py-2 rounded-xl 
              border border-[#f0e1b6]"
            >
              <Shield size={18} className="text-[#D4AF37]" />
              <span className="font-semibold text-[#9A1B1B] text-lg">
                {user.coins || 0}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Medal Colors & Rank Badges */
function RankBadge({ index }) {
  const medals = [
    { color: "#FFD700", label: "Gold" }, // Rank 1
    { color: "#C0C0C0", label: "Silver" }, // Rank 2
    { color: "#CD7F32", label: "Bronze" }, // Rank 3
  ];

  // For top 3 show medals
  if (index < 3) {
    const medal = medals[index];
    return (
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center 
        font-bold text-white shadow-md"
        style={{ backgroundColor: medal.color }}
      >
        {index + 1}
      </div>
    );
  }

  // Others — simple rank number
  return (
    <div
      className="w-12 h-12 rounded-full bg-[#9A1B1B] text-white 
        flex items-center justify-center shadow-md font-bold"
    >
      {index + 1}
    </div>
  );
}
