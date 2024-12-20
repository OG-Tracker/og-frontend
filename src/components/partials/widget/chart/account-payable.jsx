import React from "react";
import Chart from "react-apexcharts";
import { colors } from "@/constant/data";
import useDarkMode from "@/hooks/useDarkMode";
import { cb } from "@/pages/app/projects/cb";
import dayjs from "dayjs";

// Helper function to convert "K" values and formatted numbers in cPayment to numbers
const convertToNumber = (value) => {
  if (typeof value === "string") {
    // Handle 'K' multiplier
    if (value.includes("K")) {
      return parseFloat(value.replace("K", "").replace(",", "").trim()) * 1000;
    }
    // Remove commas and convert to float
    return parseFloat(value.replace(",", "").trim());
  }
  return parseFloat(value);
};

// Aggregate data for total payments per month
const aggregateTotalPaymentsPerMonth = () => {
  const dataByMonth = cb
    .filter((bounty) => bounty.status === "Claimed")
    .reduce((acc, bounty) => {
      const month = dayjs(bounty.dateAdded).format("YYYY-MM"); // Group by year and month
      if (!acc[month]) acc[month] = 0;
      acc[month] += Math.round(convertToNumber(bounty.cPayment || "0"));
      return acc;
    }, {});

  // Sort months and format series data
  const sortedMonths = Object.keys(dataByMonth).sort();
  const categories = sortedMonths.map((month) => dayjs(month).format("MMM YY")); // Format to "Aug 23", "Sep 23", etc.
  const data = sortedMonths.map((month) => dataByMonth[month]);

  return { categories, data };
};

const AccountPayable = ({ height = 300 }) => {
  const [isDark] = useDarkMode();
  const { categories, data } = aggregateTotalPaymentsPerMonth();

  const series = [
    {
      name: "Total DOT",
      data,
    },
  ];

  const options = {
    chart: { toolbar: { show: false }, zoom: { enabled: false } },
    dataLabels: { enabled: false },
    stroke: { curve: "straight", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        gradientToColors: ["#B20F7A", "#B20F7A"], // Two gradient colors
        stops: [0, 100], // Transition stops
        opacityFrom: 0.7, // Higher opacity at the top
        opacityTo: 0.3, // Lower opacity at the bottom
      },
    },
    markers: { size: 0 }, // Remove dots on the line
    colors: ["#D726FF"], // Line color
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => Math.round(val).toLocaleString(), // Round and beautify numbers with commas
      },
    },
    grid: {
      show: true,
      borderColor: isDark ? "#6E1D7C" : "#6E1D7C",
      strokeDashArray: 4,
    },
    yaxis: {
      logarithmic: true, // Enable logarithmic scale
      labels: {
        style: { colors: isDark ? "#fff" : "#fff", fontFamily: "Chakra Petch" },
        formatter: (val) => Math.round(val).toLocaleString(), // Round and beautify numbers
      },
      title: {
        text: "",
        style: {
          color: isDark ? "#fff" : "#fff",
          fontFamily: "Chakra Petch",
        },
      },
    },
    xaxis: {
      type: "category",
      categories,
      labels: { style: { colors: isDark ? "#fff" : "#fff", fontFamily: "Chakra Petch" } },
    },
  };

  return <Chart options={options} series={series} type="area" height={height} />;
};

export default AccountPayable;
