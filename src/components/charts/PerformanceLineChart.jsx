import React from "react";
import {
  Line
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function PerformanceLineChart() {

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Points Earned",
        data: [120, 150, 180, 220, 260, 320],
        borderColor: "#9A1B1B",
        backgroundColor: "rgba(154, 27, 27, 0.15)",
        tension: 0.4,
        borderWidth: 3,
        fill: true,
      },
      {
        label: "Data Submissions",
        data: [10, 14, 18, 22, 26, 30],
        borderColor: "#C2A878",
        backgroundColor: "rgba(194,168,120,0.15)",
        tension: 0.4,
        borderWidth: 3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-[#9A1B1B] mb-4">
        Monthly Performance Trend
      </h2>
      <Line data={data} options={options} />
    </div>
  );
}
