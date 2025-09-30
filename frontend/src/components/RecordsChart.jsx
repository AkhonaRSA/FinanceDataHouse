import React from "react";
import { Box, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function RecordsChart({ records = [] }) {
  if (!records || records.length === 0) {
    return (
      <Box
        sx={{
          minHeight: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="text.secondary">No data to display</Typography>
      </Box>
    );
  }

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const amountByMonth = months.map((m) => {
    const item = records.find((r) => Number(r.month) === m);
    return item ? Number(item.amount) : 0;
  });

  const data = {
    labels: months.map((m) => `${m}`),
    datasets: [
      {
        label: "Amount",
        data: amountByMonth,
        backgroundColor: "rgba(25,118,210,0.85)",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, ticks: { precision: 2 } },
    },
  };

  return (
    <Box sx={{ height: { xs: 260, md: 360 }, width: "100%" }}>
      <Bar data={data} options={options} />
    </Box>
  );
}