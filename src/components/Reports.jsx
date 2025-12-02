import React from "react";
import { FileText, Download, BarChart3 } from "lucide-react";

export default function Reports() {
  return (
    <div
      className="bg-white/95 p-8 rounded-2xl shadow-xl border border-[#e8d7b3]
      animate-fadeIn max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-full bg-[#9A1B1B] 
          flex items-center justify-center shadow-md border-4 border-[#D4AF37]"
        >
          <FileText size={26} className="text-[#FFD700]" />
        </div>

        <h2 className="text-2xl font-bold text-[#9A1B1B]">
          Reports & Insights
        </h2>
      </div>

      {/* Description */}
      <p className="text-[#3d3a30] mb-6 leading-relaxed">
        View AI-ready summaries, export your district’s performance, and
        prepare reports for monthly or weekly analysis.  
        Future versions will include AI text summaries and predictive analytics.
      </p>

      {/* Action Buttons Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Download Good Work CSV */}
        <ReportCard
          icon={<Download size={28} />}
          title="Download Good Work Entries"
          desc="Export CSV of all entries submitted by officers."
        />

        {/* PDF generator */}
        <ReportCard
          icon={<FileText size={28} />}
          title="Generate PDF Summary"
          desc="Create a structured PDF overview for monthly review."
        />

        {/* AI-driven charts */}
        <ReportCard
          icon={<BarChart3 size={28} />}
          title="Analytics (Coming Soon)"
          desc="Bar chart, line chart & pie chart analytics powered by Chart.js."
          disabled
        />

        {/* More modules later */}
        <ReportCard
          icon={<FileText size={28} />}
          title="District Comparison"
          desc="Compare district performance (AI insights coming soon)."
          disabled
        />

      </div>
    </div>
  );
}

/* REPORT CARD COMPONENT */
function ReportCard({ icon, title, desc, disabled }) {
  return (
    <button
      disabled={disabled}
      className={`text-left w-full p-6 rounded-2xl shadow-md border 
      transition-all hover:shadow-xl
      ${
        disabled
          ? "bg-[#f3e9d1] opacity-60 cursor-not-allowed"
          : "bg-[#fffaf2] border-[#f0e4c3] hover:scale-[1.02]"
      }`}
    >
      <div className="flex items-center gap-4 mb-3">
        <div
          className="w-12 h-12 rounded-full bg-[#9A1B1B] flex items-center justify-center 
          shadow-md border-2 border-[#D4AF37]"
        >
          {icon}
        </div>

        <h3 className="text-xl font-semibold text-[#9A1B1B]">{title}</h3>
      </div>

      <p className="text-[#5c543a] leading-snug text-sm">{desc}</p>
    </button>
  );
}
