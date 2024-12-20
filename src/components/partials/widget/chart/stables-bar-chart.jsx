import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useDarkMode from "@/hooks/useDarkMode";
import { products } from "@/constant/data";

const generateProductChartData = () => {
  // Filter products where 'reqDot' includes 'USDT' or 'USDC'
  const filteredProducts = products.filter((product) =>
    /USDT|USDC/.test(product.reqDot)
  );

  // Map products to extract 'month' and numeric value of 'reqDot'
  const dataMap = {};

  filteredProducts.forEach((product) => {
    const { fdate, reqDot } = product;

    // Parse the date to get the month and year (e.g., "2024-11")
    const dateObj = new Date(fdate);
    if (isNaN(dateObj)) return; // Skip invalid dates
    const monthYear = `${dateObj.getFullYear()}-${String(
      dateObj.getMonth() + 1
    ).padStart(2, "0")}`; // Months are zero-indexed

    // Extract numeric value from 'reqDot'
    const numericValue = parseFloat(
      reqDot.replace(/,/g, "").replace(/USDT|USDC/, "").trim()
    );
    if (!isNaN(numericValue)) {
      if (dataMap[monthYear]) {
        dataMap[monthYear] += numericValue;
      } else {
        dataMap[monthYear] = numericValue;
      }
    }
  });

  // Convert dataMap to array of objects for chart
  const chartData = Object.entries(dataMap).map(([monthYear, totalValue]) => ({
    monthYear,
    totalValue,
  }));

  // Sort chartData by monthYear
  chartData.sort((a, b) => new Date(a.monthYear) - new Date(b.monthYear));

  return chartData;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-md">
        <p className="font-semibold text-base border-b border-slate-700 -mx-3 mb-3 pb-3 px-3">
          Month: {label}
        </p>
        {payload.map((i) => (
          <div className="flex items-center space-x-2" key={i.dataKey}>
            <span
              className=""
              style={{ backgroundColor: i.fill, width: 10, height: 10, display: 'inline-block' }}
            ></span>
            <span className="capitalize text-sm">
              {i.dataKey.replace(/([A-Z])/g, " $1")}:{" "}
              {Number(i.value).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const StablesBarChart = () => {
  const [isDark] = useDarkMode();
  const data = useMemo(() => generateProductChartData(), []);

  return (
    <div>
      <ResponsiveContainer width="100%" height={365}>
        <BarChart width={600} height={400} data={data} barSize={70}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="10%"
                stopColor={isDark ? "#520581" : "#520581"}
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor={isDark ? "#FA1A82" : "#FA1A82"}
                stopOpacity={1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="10 10"
            stroke="rgba(255,101,247, 0.2)"
            vertical={false} // Removed vertical lines
          />
          <XAxis
            dataKey="monthYear"
            stroke="#fff"
            tick={{ fontSize: 12, fill: "#fff" }} // Smaller font size
          />
          <YAxis
            stroke="#fff"
            tick={{ fontSize: 12, fill: "#fff" }} // Smaller font size
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0,0,0,0.2)" }}
          />
          <Bar
            dataKey="totalValue"
            fill="url(#barGradient)"
            radius={[15, 15, 0, 0]} // Rounded top corners
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StablesBarChart;
