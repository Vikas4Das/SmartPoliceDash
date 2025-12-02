import React from "react";
import { Award, Star } from "lucide-react";

export default function RewardHistory() {
  const users = JSON.parse(localStorage.getItem("sp_users") || "[]");

  /* -------------------------------
       Load Rewards (Global List)
  --------------------------------- */
  const rewards = JSON.parse(localStorage.getItem("sp_rewards") || "[]");

  /* -------------------------------
       Load all Badges (Global List)
  --------------------------------- */
  const allBadges = JSON.parse(localStorage.getItem("sp_badges") || "[]");

  function getOfficerName(uid) {
    const user = users.find((u) => u.uid === uid);
    return user ? user.name : "Unknown Officer";
  }

  return (
    <div className="p-10 bg-[#fbf5e6] min-h-screen">

      {/* ================= AWARDS ================= */}
      <h1 className="text-3xl font-bold text-[#9A1B1B]">Awards</h1>

      <div className="mt-6 space-y-4">

        {rewards.length === 0 ? (
          <p className="text-gray-600">No awards received yet.</p>
        ) : (
          rewards.map((r) => (
            <div
              key={r.id}
              className="bg-white border border-[#e5d3ad] shadow-md p-5 rounded-xl flex justify-between"
            >
              <div>
                <p className="font-semibold text-[#9A1B1B]">
                  {getOfficerName(r.officerId)}
                </p>

                <p className="text-gray-700">Reason: {r.reason}</p>

                {r.description && (
                  <p className="text-gray-500 italic">{r.description}</p>
                )}

                <p className="text-sm mt-1 text-[#6a6247]">{r.date}</p>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fff5d7] border border-[#f0e1b6]">
                <Award size={20} className="text-[#FFD700]" />
                <span className="font-semibold text-[#9A1B1B]">
                  {r.points} pts
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= BADGES ================= */}
      <h1 className="text-3xl font-bold text-[#9A1B1B] mt-10">Badges</h1>

      <div className="mt-6 space-y-4">

        {allBadges.length === 0 ? (
          <p className="text-gray-600">No badges earned yet.</p>
        ) : (
          allBadges.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-[#e5d3ad] shadow-md p-5 rounded-xl flex justify-between"
            >
              <div>
                <p className="font-semibold text-[#9A1B1B]">
                  {getOfficerName(b.officerId)}
                </p>

                <p className="text-gray-700">{b.name}</p>

                {b.description && (
                  <p className="text-gray-500 italic">{b.description}</p>
                )}

                <p className="text-sm mt-1 text-[#6a6247]">{b.date}</p>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f3ecff] border border-[#d9c9ff]">
                <Star size={20} className="text-[#6a3ab2]" />
                <span className="font-semibold text-[#6a3ab2]">
                  Badge
                </span>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}
