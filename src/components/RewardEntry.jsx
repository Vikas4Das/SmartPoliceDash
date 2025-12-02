import React, { useState } from "react";
import { Award, Shield, BadgeCheck } from "lucide-react";

export default function RewardEntry() {
  const users = JSON.parse(localStorage.getItem("sp_users") || "[]");

  const [officer, setOfficer] = useState("");

  // Reward fields
  const [points, setPoints] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  // Badge fields
  const [badgeName, setBadgeName] = useState("");
  const [badgeDesc, setBadgeDesc] = useState("");

  /* ------------------------------------------------
        ASSIGN REWARD  (Points Award)
  -------------------------------------------------- */
  function giveReward(e) {
    e.preventDefault();

    if (!officer || !points || !reason) {
      alert("Please fill all reward fields!");
      return;
    }

    let allUsers = JSON.parse(localStorage.getItem("sp_users") || "[]");
    const index = allUsers.findIndex((u) => u.uid === officer);

    if (index === -1) {
      alert("Officer not found!");
      return;
    }

    const user = allUsers[index];
    const now = new Date().toISOString();

    /* ---- Save to Officer Profile ---- */
    if (!user.rewards) user.rewards = [];

    const rewardObj = {
      id: "reward_" + Date.now(),
      officerId: user.uid,
      officerName: user.name,
      district: user.district || "Unknown",
      points: parseInt(points),
      reason,
      description,
      date: now,
    };

    user.rewards.push(rewardObj);

    // update coins
    user.coins = (user.coins || 0) + parseInt(points);

    allUsers[index] = user;
    localStorage.setItem("sp_users", JSON.stringify(allUsers));

    /* ---- Save to Global Rewards List ---- */
    const rewards = JSON.parse(localStorage.getItem("sp_rewards") || "[]");
    rewards.push(rewardObj);
    localStorage.setItem("sp_rewards", JSON.stringify(rewards));

    alert("Reward assigned successfully!");

    setPoints("");
    setReason("");
    setDescription("");
  }

  /* ------------------------------------------------
        ASSIGN BADGE  (Achievement Badge)
  -------------------------------------------------- */
  function giveBadge(e) {
    e.preventDefault();

    if (!officer || !badgeName) {
      alert("Please fill badge fields!");
      return;
    }

    let allUsers = JSON.parse(localStorage.getItem("sp_users") || "[]");
    const index = allUsers.findIndex((u) => u.uid === officer);

    if (index === -1) {
      alert("Officer not found!");
      return;
    }

    const user = allUsers[index];
    const now = new Date().toISOString();

    /* ---- Save to Officer Profile ---- */
    if (!user.badges) user.badges = [];

    const badgeObj = {
      id: "badge_" + Date.now(),
      officerId: user.uid,
      officerName: user.name,
      district: user.district || "Unknown",
      name: badgeName,
      description: badgeDesc,
      date: now,
    };

    user.badges.push(badgeObj);

    allUsers[index] = user;
    localStorage.setItem("sp_users", JSON.stringify(allUsers));

    /* ---- Save to Global Badges List ---- */
    const badges = JSON.parse(localStorage.getItem("sp_badges") || "[]");
    badges.push(badgeObj);
    localStorage.setItem("sp_badges", JSON.stringify(badges));

    alert("Badge assigned successfully!");

    setBadgeName("");
    setBadgeDesc("");
  }

  return (
    <div
      className="bg-white/95 p-8 rounded-2xl shadow-xl border border-[#e8d7b3]
      animate-fadeIn max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <div
          className="w-12 h-12 rounded-full bg-[#9A1B1B] 
          flex items-center justify-center shadow-md border-4 border-[#D4AF37]"
        >
          <Award size={26} className="text-[#FFD700]" />
        </div>

        <h2 className="text-2xl font-bold text-[#9A1B1B]">
          Admin Reward & Badge Panel
        </h2>
      </div>

      {/* Officer Dropdown */}
      <div className="mb-10">
        <label className="block text-sm font-semibold text-[#3d3a30] mb-1">
          Select Officer
        </label>

        <select
          value={officer}
          onChange={(e) => setOfficer(e.target.value)}
          className="w-full p-3 border border-[#d1c49b] rounded-lg 
          focus:ring-2 focus:ring-[#9A1B1B] outline-none"
        >
          <option value="">-- Choose Officer --</option>
          {users
            .filter((u) => u.role === "police")
            .map((u) => (
              <option key={u.uid} value={u.uid}>
                {u.name} ({u.uid})
              </option>
            ))}
        </select>
      </div>

      {/* ================= Reward Form ================ */}
      <div className="bg-[#fff9e8] p-6 rounded-xl border border-[#f1ddb0] shadow mb-10">
        <h3 className="text-xl font-bold text-[#9A1B1B] mb-5 flex items-center gap-2">
          <Shield size={20} className="text-[#9A1B1B]" />
          Assign Reward (Points)
        </h3>

        <form onSubmit={giveReward} className="space-y-5">

          <div>
            <label className="block text-sm font-semibold mb-1">Reward Points</label>
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="w-full p-3 border border-[#d1c49b] rounded-lg"
              placeholder="Enter points"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Reward Reason</label>
            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-3 border border-[#d1c49b] rounded-lg"
              placeholder="E.g., Outstanding performance"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-3 border border-[#d1c49b] rounded-lg"
              placeholder="Optional notes..."
            />
          </div>

          <button
            className="w-full py-3 rounded-xl text-white text-lg font-semibold
            bg-gradient-to-r from-[#9A1B1B] to-[#b32727]
            hover:scale-[1.03] transition flex items-center justify-center gap-2"
          >
            <Shield size={20} /> Assign Reward
          </button>
        </form>
      </div>

      {/* ================= Badge Form ================ */}
      <div className="bg-[#f3ecff] p-6 rounded-xl border border-[#d9c9ff] shadow">
        <h3 className="text-xl font-bold text-[#6a3ab2] mb-5 flex items-center gap-2">
          <BadgeCheck size={20} className="text-[#6a3ab2]" />
          Assign Achievement Badge
        </h3>

        <form onSubmit={giveBadge} className="space-y-5">

          <div>
            <label className="block text-sm font-semibold mb-1">Badge Name</label>
            <input
              value={badgeName}
              onChange={(e) => setBadgeName(e.target.value)}
              className="w-full p-3 border border-[#cbb7ff] rounded-lg"
              placeholder="E.g., Data Entry Expert"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Badge Description
            </label>
            <textarea
              value={badgeDesc}
              onChange={(e) => setBadgeDesc(e.target.value)}
              rows={3}
              className="w-full p-3 border border-[#cbb7ff] rounded-lg"
              placeholder="Why this badge is awarded?"
            />
          </div>

          <button
            className="w-full py-3 rounded-xl text-white text-lg font-semibold
            bg-gradient-to-r from-[#6a3ab2] to-[#8e58d8]
            hover:scale-[1.03] transition flex items-center justify-center gap-2"
          >
            <BadgeCheck size={20} /> Assign Badge
          </button>
        </form>
      </div>
    </div>
  );
}
