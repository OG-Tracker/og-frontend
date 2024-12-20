import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { colors, hexToRGB } from "@/constant/data";
import useDarkMode from "@/hooks/useDarkMode";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
const PollerAreaChart = () => {
  const [isDark] = useDarkMode();
  const data = {
    labels: ["Marketing", "Development", "Upgrades", "Tips", "Events/Hackathons","Bounty","Other"],
    datasets: [
      {
        label: "Approved",
        data: [11, 16, 7, 3, 14, 12, 10],
        backgroundColor: [
          colors.primary,
          colors.success,
          colors.warning,
          colors.info,
          colors.danger,
          colors.danger,
          colors.danger,
        ],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1",          
        },
      },
    },
    scales: {
      r: {
        ticks: {
          color: isDark ? "#475569" : "#475569",
        },
        grid: {
          color: isDark ? "#DA168A" : "#DA168A",
        },
        pointLabels: {
          color: isDark ? "#cbd5e1" : "#475569",
        },
        angleLines: {
          color: isDark ? "#334155" : "#e2e8f0",
        },
      },
    },
    maintainAspectRatio: false,
  };
  return (
    <div>
      <PolarArea options={options} data={data} height={350} />
    </div>
  );
};

export default PollerAreaChart;
