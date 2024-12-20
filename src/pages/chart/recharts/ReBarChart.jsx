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
import { colors } from "@/constant/data";
import { products } from "@/constant/data";

const generateChartData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentDate = new Date();
  let chartData = [];

  for (let i = 7; i >= 0; i--) {
    let monthIndex = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1).getMonth();
    let year = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1).getFullYear();
    chartData.push({
      name: months[monthIndex],
      SmallSpender: 0,
      MediumSpender: 0,
      BigSpender: 0,
      SmallTipper: 0,
      BigTipper: 0,
    });

    products.forEach(product => {
      const productDate = new Date(product.fdate);
      if (productDate.getMonth() === monthIndex && productDate.getFullYear() === year) {
        if (product.track === "smallSpender") {
          chartData[7 - i].SmallSpender += 1;
        } else if (product.track === "mediumSpender") {
          chartData[7 - i].MediumSpender += 1;
        } else if (product.track === "bigSpender") {
          chartData[7 - i].BigSpender += 1;
        } else if (product.track === "smallTipper") {
          chartData[7 - i].SmallTipper += 1;
        } else if (product.track === "bigTipper") {
          chartData[7 - i].BigTipper += 1;
        }
      }
    });
  }

  return chartData;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-md">
        <p className="font-semibold text-base border-b border-slate-700 -mx-3 mb-3 pb-3 px-3">
          {label}
        </p>
        {payload.map((i) => (
          <div className="flex items-center space-x-2" key={i.dataKey}>
            <span
              className="h-3 w-3 rounded-full inline-block"
              style={{ backgroundColor: i.fill }}
            ></span>
            <span className="capitalize text-sm">
              {i.dataKey} : {i.value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

const CustomBarShape = (props) => {
  const { fill, x, y, width, height } = props;
  // Adjust the radius for rounded corners here
  const radius = 4; 

  return (
    <g>
      <defs>
        <filter id="shadow" height="130%">
          <feDropShadow dx="0" dy="1" stdDeviation="5" floodColor="#000" />
        </filter>
      </defs>
      <path
        d={`M${x},${y + radius} 
            a${radius},${radius} 0 0 1 ${radius},-${radius} 
            h${width - 1 * radius} 
            a${radius},${radius} 0 0 1 ${radius},${radius} 
            v${height - 1 * radius} 
            a${radius},${radius} 0 0 1 -${radius},${radius} 
            h-${width - 1 * radius} 
            a${radius},${radius} 0 0 1 -${radius},-${radius}z`}
        fill={fill}
        filter="url(#shadow)"
      />
    </g>
  );
};

const ReBarChart = () => {
  const [isDark] = useDarkMode();
  const data = useMemo(() => generateChartData(), []);

  return (
    <div>
      <ResponsiveContainer height={400}>
        <BarChart height={300} data={data} barSize={100}>
          <CartesianGrid strokeDasharray="10 10" stroke="rgba(255,101,247, 0.2)" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis  stroke="#fff"/>
          <Tooltip content={<CustomTooltip />}  cursor={{fill: 'rgba(0,0,0,0.2)'}}/>
          <Bar dataKey="SmallSpender" stackId="a" fill={colors.dark2} shape={<CustomBarShape />} />
          <Bar dataKey="MediumSpender" stackId="a" fill={colors.normalP} shape={<CustomBarShape />} />
          <Bar dataKey="BigSpender" stackId="a" fill={colors.openP} shape={<CustomBarShape />} />
          <Bar dataKey="SmallTipper" stackId="a" fill={colors.pink} shape={<CustomBarShape />} />
          <Bar dataKey="BigTipper" stackId="a" fill={colors.dot} shape={<CustomBarShape />} radius={[5, 5, 5, 5]}  />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReBarChart;
