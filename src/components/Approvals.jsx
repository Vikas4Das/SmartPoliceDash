import React, { useState } from "react";
import { CheckCircle, XCircle, FileSearch } from "lucide-react";

export default function Approvals() {
  const [entries, setEntries] = useState(
    JSON.parse(localStorage.getItem("sp_entries") || "[]")
  );

  function approve(id) {
    const updated = entries.map((e) =>
      e.id === id ? { ...e, status: "approved" } : e
    );

    setEntries(updated);
    localStorage.setItem("sp_entries", JSON.stringify(updated));

    // Reward officer on approval
    rewardOfficer(id);

    alert("Entry Approved Successfully!");
  }

  function reject(id) {
    const updated = entries.map((e) =>
      e.id === id ? { ...e, status: "rejected" } : e
    );

    setEntries(updated);
    localStorage.setItem("sp_entries", JSON.stringify(updated));

    alert("Entry Rejected!");
  }

  function rewardOfficer(id) {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;

    const users = JSON.parse(localStorage.getItem("sp_users") || "[]");

    const updatedUsers = users.map((u) => {
      if (u.uid === entry.officerId) {
        return {
          ...u,
          coins: (u.coins || 0) + 20, // Default 20 points per entry
        };
      }
      return u;
    });

    localStorage.setItem("sp_users", JSON.stringify(updatedUsers));

    // Add to reward history automatically
    const rewards = JSON.parse(localStorage.getItem("sp_rewards") || "[]");

    rewards.push({
      officer: entry.officerId,
      points: 20,
      reason: "Approved Good Work Entry",
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("sp_rewards", JSON.stringify(rewards));
  }

  const pending = entries.filter((e) => e.status === "pending");

  return (
    <div
      className="bg-white/95 p-8 rounded-2xl shadow-xl border border-[#e8d7b3] 
      max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-12 h-12 rounded-full bg-[#9A1B1B]
          flex items-center justify-center shadow-md border-4 border-[#D4AF37]"
        >
          <FileSearch size={26} className="text-[#FFD700]" />
        </div>

        <h2 className="text-2xl font-bold text-[#9A1B1B]">
          Pending Entry Approvals
        </h2>
      </div>

      {pending.length === 0 && (
        <p className="text-center text-[#5c543a]">
          All entries have been reviewed. No pending approvals.
        </p>
      )}

      <div className="space-y-6">
        {pending.map((entry) => (
          <div
            key={entry.id}
            className="bg-[#fffaf2] border border-[#f0e4c3]
            rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-[1.01] 
            transition-all"
          >
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold text-[#9A1B1B]">
                Entry Submitted by {entry.officerName}
              </h3>

              <span className="text-sm px-3 py-1 rounded-full 
              bg-[#e8d7b3] text-[#6a6247]">
                {entry.date}
              </span>
            </div>

            <p className="text-[#3d3a30] mt-2"><b>District:</b> {entry.district}</p>
            <p className="text-[#3d3a30]"><b>Reporting Period:</b> {entry.period}</p>

            <div className="mt-3 text-[#3d3a30]">
              <b>Important Detections:</b>
              <p className="italic">{entry.detections}</p>
            </div>

            {entry.files?.length > 0 && (
              <div className="mt-4">
                <b className="text-[#3d3a30]">Attached Documents:</b>
                <ul className="list-disc ml-6 text-[#5c543a]">
                  {entry.files.map((f, i) => (
                    <li key={i}>
                      <a
                        href={f.data}
                        download={f.name}
                        className="text-blue-600 underline"
                      >
                        {f.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-4 mt-5">
              <button
                onClick={() => approve(entry.id)}
                className="flex items-center gap-2 px-5 py-2 rounded-xl 
                bg-[#1c7c1a] text-white shadow-md hover:bg-[#166615] 
                transition-all"
              >
                <CheckCircle size={18} /> Approve
              </button>

              <button
                onClick={() => reject(entry.id)}
                className="flex items-center gap-2 px-5 py-2 rounded-xl 
                bg-[#9A1B1B] text-white shadow-md hover:bg-[#7d1515] 
                transition-all"
              >
                <XCircle size={18} /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
