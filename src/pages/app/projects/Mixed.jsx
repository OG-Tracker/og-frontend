import React, { useState, useMemo } from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import { cb as childBounties } from "./cb"; 
import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";

const MixedChart = () => {
  const { id } = useParams();
  const [isDark] = useDarkMode();
  const [activeTab, setActiveTab] = useState("bounties");

  // Filter child bounties by the current project's parentID
  const filteredChildBounties = childBounties.filter(
    (child) => child.parentID === id && child.status === "Claimed"
  );

  // Calculate data for the chart
  const chartData = useMemo(() => {
    const dataByMonth = {};

    // Group child bounties by month and calculate totals
    filteredChildBounties.forEach((child) => {
      const month = new Date(child.dateAdded).toISOString().slice(0, 7);

      // Convert cPayment to number, handling "K" notation
      let payment = parseFloat(child.cPayment.replace(/,/g, ""));
      if (child.cPayment.endsWith("K")) {
        payment *= 1000;
      }

      if (!dataByMonth[month]) {
        dataByMonth[month] = { totalBounties: 0, totalPayment: 0 };
      }
      dataByMonth[month].totalBounties += 1;
      dataByMonth[month].totalPayment += payment;
    });

    // Extract labels, column (bounties), and line (payment) data for the chart
    const labels = Object.keys(dataByMonth).sort();
    const columnData = labels.map((month) => dataByMonth[month].totalBounties);
    const lineData = labels.map((month) => dataByMonth[month].totalPayment);

    return { labels, columnData, lineData };
  }, [filteredChildBounties]);

  // Chart options for both tabs
  const baseOptions = {
    chart: {
      toolbar: { show: false },
    },
    xaxis: {
      type: "category",
      labels: {
        style: {
          colors: isDark ? "#fff" : "#fff",
          fontFamily: "Chakra Petch",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#fff" : "#fff",
          fontFamily: "Chakra Petch",
        },
        formatter: (value) => value.toLocaleString(), // Add commas for y-axis values
      },
    },
    tooltip: {
      theme: "dark",
      marker: {
        show: false, // Show a small colored marker next to the tooltip label
      },
      style: {
        fontSize: "12px",
        fontFamily: "Chakra Petch",
        backgroundColor: "purple",
        color: "white",
      },
      y: {
        formatter: (value) => value.toLocaleString(), // Add commas and remove decimals in tooltip
      },
    },
    grid: {
      borderColor: isDark ? "#472765" : "#472765",
    },
  };

  // Options for Monthly Bounties (bar chart)
  const bountiesOptions = {
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      type: "bar",
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        borderRadius: 4, // Rounded bars on top
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        gradientToColors: ["#AA6AF3"], // Secondary gradient color
        opacityFrom: 0.9,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    colors: ["#F11AE6"], // Purple color for bar chart
    series: [
      {
        name: "Total Bounties",
        data: chartData.columnData,
      },
    ],
    labels: chartData.labels,
  };

  // Options for Monthly Payments (area chart with gradient)
  const paymentsOptions = {
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      type: "area", // Set type to area to enable gradient fill
    },
    stroke: {
      curve: "smooth",
      width: 4,
      colors: ["#F11AE6"], // Purple color for line chart
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#F11AE6"],
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (value) => Math.round(value).toLocaleString(), // Beautify and remove decimals
      style: {
        colors: ["#2E59D7"], // Color for the labels
        fontSize: "12px",
        fontFamily: "Chakra Petch",
        fontWeight: "bold",
      },
      offsetY: -2, // Adjust the position of the labels
    },
    series: [
      {
        name: "Total Payments (DOT)",
        data: chartData.lineData,
        
      },
    ],
    labels: chartData.labels,
  };

  return (
    <div>
      <Tab.Group>
        <Tab.List className="flex justify-center space-x-2 mb-4">
          <Tab as="button"
            className={({ selected }) =>
              `px-4 py-2 text-sm font-medium rounded-full ${
                selected ? "bg-gradient-to-t from-kog-500 to-kog-900 shadow-[0px_0px_5px_2px_rgba(241,26,230,0.4)] font-extrabold  text-white" : "bg-gradient-to-t from-kog-300 to-purple-800 shadow-2xl text-white"
              }`
            }
            onClick={() => setActiveTab("bounties")}
          >
            Monthly Child Bounties
          </Tab>
          <Tab as="button"
            className={({ selected }) =>
              `px-4 py-2 text-sm font-medium rounded-full ${
                selected ? "bg-gradient-to-t from-kog-500 to-kog-900 shadow-[0px_0px_5px_2px_rgba(241,26,230,0.4)] font-extrabold  text-white" : "bg-gradient-to-t from-kog-300 to-purple-800 shadow-2xl  text-white"
              }`
            }
            onClick={() => setActiveTab("payments")}
          >
            Monthly DOT Claimed
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            {activeTab === "bounties" && (
              <Chart
                options={bountiesOptions}
                series={bountiesOptions.series}
                type="bar"
                height={350}
              />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {activeTab === "payments" && (
              <Chart
                options={paymentsOptions}
                series={paymentsOptions.series}
                type="area" // Use "area" type for gradient effect
                height={350}
              />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default MixedChart;
