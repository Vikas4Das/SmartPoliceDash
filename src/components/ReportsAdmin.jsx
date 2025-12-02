import React from 'react'
import { exportToCSV } from '../utils/exportCSV'
import { generatePDFReport } from '../utils/pdfReport'

export default function ReportsAdmin() {

  function exportEntries() {
    const entries = JSON.parse(localStorage.getItem('sp_entries') || '[]')
    exportToCSV("good_work_entries", entries)
  }

  function exportRewards() {
    const rewards = JSON.parse(localStorage.getItem('sp_rewards') || '[]')
    exportToCSV("reward_history", rewards)
  }

  function exportUsers() {
    const users = JSON.parse(localStorage.getItem('sp_users') || '[]')
    exportToCSV("officer_performance", users)
  }

  return (
    <div className="bg-white p-6 rounded shadow">

      <h3 className="font-semibold text-lg">Reports & Analysis</h3>

      <p className="mt-3 text-slate-600">
        Export district-wise or officer-wise performance for analysis.
      </p>

      <div className="mt-6 space-y-4">

        {/* Export Good Work Entries */}
        <button
          onClick={exportEntries}
          className="px-4 py-2 bg-sky-600 text-white rounded w-full"
        >
          Export Good Work Entries (CSV)
        </button>

        {/* Export Reward History */}
        <button
          onClick={exportRewards}
          className="px-4 py-2 bg-green-600 text-white rounded w-full"
        >
          Export Reward History (CSV)
        </button>

        {/* Export Officer Performance */}
        <button
          onClick={exportUsers}
          className="px-4 py-2 bg-purple-600 text-white rounded w-full"
        >
          Export Officer Performance (CSV)
        </button>

        {/* Export PDF */}
        <button
          onClick={generatePDFReport}
          className="px-4 py-2 bg-red-600 text-white rounded w-full"
        >
          Export PDF Report
        </button>

      </div>
    </div>
  )
}
