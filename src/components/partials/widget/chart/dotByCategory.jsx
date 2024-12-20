import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import useRtl from "@/hooks/useRtl";
import { products } from "@/constant/data";

const DotByCategory = ({ height = 350 }) => {
  const [isDark] = useDarkMode();
  const [isRtl] = useRtl();

  // List of relevant tracks
  const relevantTracks = ["smallSpender", "mediumSpender", "bigSpender"];

  const calculateDurationInMonths = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let months;
    months = (end.getFullYear() - start.getFullYear()) * 12;
    months -= start.getMonth();
    months += end.getMonth();
    return months <= 0 ? 0 : months;
  };

  // Calculate averages for only relevant tracks
  const averages = products.reduce((acc, product) => {
    const { track, fdate, ldate } = product;
    if (
      relevantTracks.includes(track) && 
      fdate && ldate && 
      /^\d{4}-\d{2}-\d{2}$/.test(fdate) && 
      /^\d{4}-\d{2}-\d{2}$/.test(ldate)
    ) {
      const duration = calculateDurationInMonths(fdate, ldate);
      if (acc[track]) {
        acc[track].total += duration;
        acc[track].count += 1;
      } else {
        acc[track] = { total: duration, count: 1 };
      }
    }
    return acc;
  }, {});

  const series = [{
    name: "Average Duration",
    data: relevantTracks.map(track => ({
      x: track,
      y: averages[track] ? Math.round(averages[track].total / averages[track].count) : 0,
    })),
  }];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ["smallSpender", "mediumSpender", "bigSpender"],
      labels: {
        style: {
          colors: "#fff",
          fontFamily: "Chakra Petch",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value} month${value !== 1 ? 's' : ''}`,
        style: {
          colors: "#fff",
          fontFamily: "Chakra Petch",
        },
      },
    },
    tooltip: {
      style: {
        fontFamily: "Chakra Petch",
        fontSize: '12px',
      },
      theme: "dark",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,  
        horizontal: false,
        columnWidth: '80%',
      },
    },
    fill: {
      colors: ["#E20D84"],
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ['#FF65F7'],
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [0, 100, 100],
      }
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={height} />
    </div>
  );
};

export default DotByCategory;
