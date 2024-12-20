import React from "react";
import Chart from "react-apexcharts";
import { colors } from "@/constant/data";
import useDarkMode from "@/hooks/useDarkMode";
import { cb } from "@/pages/app/projects/cb";
import dayjs from "dayjs";

// Aggregate data for total claimed bounties per month
const aggregateTotalBountiesPerMonth = () => {
  const dataByMonth = cb
    .filter((bounty) => bounty.status === "Claimed")
    .reduce((acc, bounty) => {
      const month = dayjs(bounty.dateAdded).format("YYYY-MM"); // Monthly aggregation
      if (!acc[month]) acc[month] = 0;
      acc[month] += 1;
      return acc;
    }, {});

  // Sort months and format series data
  const sortedMonths = Object.keys(dataByMonth).sort();
  const categories = sortedMonths.map((month) => dayjs(month).format("MMM YY")); // Format to "Aug 23", "Sep 23", etc.
  const data = sortedMonths.map((month) => dataByMonth[month]);

  return { categories, data };
};

const AccountReceivable = ({ height = 300 }) => {
  const [isDark] = useDarkMode();
  const { categories, data } = aggregateTotalBountiesPerMonth();

  const series = [{ name: "Total Child Bounties", data }];
  const options = {
    chart: { toolbar: { show: false }, zoom: { enabled: false } },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    colors: [colors.dot],
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `: ${val}`, // Custom tooltip label
      },
    },
    markers: {
      size: 4,
      colors: colors.dot,
      strokeColors: colors.dot,
      strokeWidth: 2,
      hover: { sizeOffset: 1 },
    },
    grid: { show: true, borderColor: isDark ? "#6E1D7C" : "#6E1D7C", strokeDashArray: 4 },
    yaxis: {
      labels: { style: { colors: isDark ? "#fff" : "#fff", fontFamily: "Chakra Petch" } },
    },
    xaxis: {
      type: "category",
      categories,
      labels: { style: { colors: isDark ? "#fff" : "#fff", fontFamily: "Chakra Petch" } },
    },
  };

  return <Chart options={options} series={series} type="line" height={height} />;
};

export default AccountReceivable;
