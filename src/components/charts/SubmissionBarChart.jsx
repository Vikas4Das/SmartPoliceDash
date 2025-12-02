import React from "react";
import {
  Bar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function SubmissionBarChart() {
  
  const data = {
    labels: ["NBW", "Convictions", "Firearms", "Drugs", "Other"],
    datasets: [
      {
        label: "Submissions",
        data: [8, 5, 4, 3, 4],
        backgroundColor: [
          "#C2A878",
          "#9A1B1B",
          "#D3B88C",
          "#8A1515",
          "#E3D2A0",
        ],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-[#9A1B1B] mb-4">
        Data Submission History
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
}
