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
import { bounties, cb as childBounties } from "@/pages/app/projects/cb";

const generateBountyChartData = () => {
  const activeBounties = bounties.filter(
    (bounty) => bounty.status === "Active" || bounty.status === "Funded"
  );

  const chartData = activeBounties.map((bounty) => {
    const relatedChildBounties = childBounties.filter(
      (child) => child.parentID === bounty.id
    );

    const latestDate = relatedChildBounties.reduce((latest, child) => {
      const dateAdded = new Date(child.dateAdded);
      return dateAdded > latest ? dateAdded : latest;
    }, new Date(0));

    return {
      id: bounty.id,
      totalChildBounties: relatedChildBounties.length,
      latestChildBountyDate: latestDate,
    };
  });

  chartData.sort((a, b) => {
    if (b.totalChildBounties === a.totalChildBounties) {
      return b.latestChildBountyDate - a.latestChildBountyDate;
    }
    return b.totalChildBounties - a.totalChildBounties;
  });

  return chartData.slice(0, 10);
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-md">
        <p className="font-semibold text-base border-b border-slate-700 -mx-3 mb-3 pb-3 px-3">
          Bounty ID: {label}
        </p>
        {payload.map((i) => (
          <div className="flex items-center space-x-2" key={i.dataKey}>
            <span className=" " style={{ backgroundColor: i.fill }}></span>
            <span className="capitalize text-sm">
              {i.dataKey === "totalChildBounties"
                ? "Total Claimed Child Bounties"
                : i.dataKey.replace(/([A-Z])/g, " $1")}:{" "}
              {i.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};


const BountyBarChart = () => {
  const [isDark] = useDarkMode();
  const data = useMemo(() => generateBountyChartData(), []);

  return (
    <div>
      <ResponsiveContainer width="100%" height={330}>
        <BarChart width={600} height={400} data={data} barSize={60}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? "#EC19E1" : "#EC19E1"} stopOpacity={1} />
              <stop offset="100%" stopColor={isDark ? "#4E1E62" : "#4E1E62"} stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="10 10" stroke="rgba(255,101,247, 0.2)" />
          <XAxis dataKey="id" stroke="#fff" label={{ value: "", position: "insideBottom", dy: 10 }} />
          <YAxis stroke="#fff" label={{ value: "", angle: -90, position: "insideLeft", dx: -1, dy: 60 }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.2)" }} />
          <Bar
            dataKey="totalChildBounties"
            fill="url(#barGradient)"
            radius={[10, 10, 0, 0]} // Rounded top corners
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BountyBarChart;
