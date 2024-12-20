import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import { products } from "@/constant/data";

const MixedChart = () => {
  const [isDark] = useDarkMode();

  // Helper function to process data
  const processData = (data) => {
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear(), now.getMonth() - 12, 1); // Last 12 months
    const grouped = {};

    data.forEach((item) => {
      const date = new Date(item.fdate);
      if (date >= oneYearAgo && date <= now) {
        const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        const beneficiaries = item.benAdd !== "-" ? item.benAdd : null;
        const proposers = item.proposerAdd !== "-" ? item.proposerAdd : null;

        if (!grouped[month]) {
          grouped[month] = { uniqueBeneficiaries: new Set(), uniqueProposers: new Set(), totalProducts: 0 };
        }

        if (beneficiaries) {
          grouped[month].uniqueBeneficiaries.add(beneficiaries);
        }

        if (proposers) {
          grouped[month].uniqueProposers.add(proposers);
        }

        grouped[month].totalProducts += 1;
      }
    });

    return Object.entries(grouped).map(([month, values]) => ({
      month,
      uniqueBeneficiaries: values.uniqueBeneficiaries.size,
      uniqueProposers: values.uniqueProposers.size,
      totalProducts: values.totalProducts,
    }));
  };

  const processedData = processData(products);

  const series = [
    {
      name: "Proposals",
      type: "column",
      data: processedData.map((item) => ({
        x: new Date(`${item.month}-01`).getTime(), // X-Axis: Month
        y: item.totalProducts, // Y-Axis: Total products
      })),
    },
    {
      name: "Beneficiaries",
      type: "area",
      data: processedData.map((item) => ({
        x: new Date(`${item.month}-01`).getTime(), // X-Axis: Month
        y: item.uniqueBeneficiaries, // Y-Axis: Total unique beneficiaries
      })),
    },
    {
      name: "Proposers",
      type: "line",
      data: processedData.map((item) => ({
        x: new Date(`${item.month}-01`).getTime(), // X-Axis: Month
        y: item.uniqueProposers, // Y-Axis: Total unique proposers
      })),
    },
  ];

  const options = {
    chart: {
      stacked: false,
      toolbar: {
        show: false,
      },
      margin: {
        bottom: 40, // Add extra space at the bottom
      },
    },
    stroke: {
      width: [1, 0, 3], // Column: 0, Area: 2, Line: 3
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        borderRadius: 4, // Rounded bars
      },
    },
    fill: {
      type: ["solid", "solid", "solid"], // Ensure solid fill for bars
      opacity: [0.4, 0.1, 1], // Lower the opacity for bars (Column, Area, Line)
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#FFFFFF",
          fontFamily: "Chakra Petch",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      title: {
        text: "",
        style: {
          color: "#FFFFFF",
          fontFamily: "Chakra Petch",
        },
      },
      labels: {
        style: {
          colors: "#FFFFFF",
          fontFamily: "Chakra Petch",
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: "dark",
      y: {
        formatter: (value) => value,
      },
      x: {
        formatter: (value) => {
          const date = new Date(value);
          const month = date.toLocaleString("default", { month: "short" });
          return `${month} ${date.getFullYear()}`;
        },
      },
    },
    legend: {
      position: "bottom", // Moves the legend below the chart
      horizontalAlign: "center",
      floating: false,
      labels: {
        colors: "#FFFFFF",
        style: {
          fontFamily: "Chakra Petch",
          fontWeight: "bold",
        },
      },
      offsetY: 8, // Adjust the offset for the legend's position
    },
    grid: {
      show: true,
      borderColor: "#472765",
      position: "back",
    },
    colors: ["#F11AE6", "#fff", "#DA749A"], // Base colors for gradient series
  };
  

  return (
    <div>
      <p className="text-white mb-2 font-bold text-lg text-center mt-2">Monthly Unique Proposers & Beneficiaries</p>
      <Chart options={options} series={series} type="line" height={440} />
    </div>
  );
};

export default MixedChart;
