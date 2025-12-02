import React from 'react'

export default function AdminHome(){
  const entries = JSON.parse(localStorage.getItem('sp_entries') || '[]')

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="font-semibold text-lg">Recent Uploads</h3>

      <ul className="mt-4 space-y-2">
        {entries.slice(-6).reverse().map(entry => (
          <li 
            key={entry.id} 
            className="p-3 border rounded bg-slate-50 flex justify-between"
          >
            <div>
              <strong>{entry.district}</strong> — {entry.drive}
              <div className="text-sm text-slate-500">{entry.date}</div>
            </div>
            <span 
              className={`px-2 py-1 text-xs rounded ${
                entry.status === 'pending' ? 'bg-yellow-200' : 'bg-green-200'
              }`}
            >
              {entry.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
