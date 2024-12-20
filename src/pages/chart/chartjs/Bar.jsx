import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { colors } from "@/constant/data"; // Assuming colors is defined and contains a primary color
import useDarkMode from "@/hooks/useDarkMode";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [isDark] = useDarkMode();
  const chartRef = useRef(null); // Ref to access the chart instance

  const data = {
    labels: ["Marketing", "Development", "Events", "Bounty", "Others"],
    datasets: [
      {
        data: [35, 59, 80, 81, 56],
        fill: true,
        borderColor: "rgb(255,255,255)",
        borderWidth: 1,
        borderRadius: 55,
        borderSkipped: "bottom",
        barThickness: 55,
      },
    ],
  };

  // Function to dynamically generate gradients
  let width, height, gradient;
  function getGradient(ctx, chartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      // Create the gradient because this is either the first render
      // or the size of the chart has changed
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      gradient.addColorStop(0, Utils.CHART_COLORS.blue);
      gradient.addColorStop(0.5, Utils.CHART_COLORS.yellow);
      gradient.addColorStop(1, Utils.CHART_COLORS.red);
    }
  
    return gradient;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
          font: {
            family: 'Chakra Petch',
          },
        },
      },
      x: {
        
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
          font: {
            family: 'Chakra Petch',
          },
        },
      },
    },
    maintainAspectRatio: false,
    // Hook into the onComplete callback to generate gradients after the chart is drawn
    animation: {
      onComplete: () => getGradient(chartRef.current.chartInstance),
    },
  };

  return (
    <div>
      <Bar ref={chartRef} options={options} data={data} height={350} />
    </div>
  );
};

export default BarChart;
