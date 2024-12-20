import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import { products } from "@/constant/data";

const AreaSpaLine = () => {
  const [isDark] = useDarkMode();

  const getLast8MonthsCategories = () => {
    const months = [];
    const date = new Date();
    for (let i = 12; i >= 0; i--) {
      const newDate = new Date(date.getFullYear(), date.getMonth() - i, 1);
      months.push(newDate.toLocaleString('default', { month: 'short' }) + " " + newDate.getFullYear());
    }
    return months;
  };

  const calculateSumReqDotByTrackAndMonth = useMemo(() => {
    const categories = getLast8MonthsCategories();
    const tracks = ["bigSpender", "mediumSpender", "smallSpender", "smallTipper", "bigTipper"];
    const sumByTrackAndMonth = tracks.map(track => ({
      name: track,
      data: categories.map(() => 0)
    }));

    products
      .filter(product => !product.reqDot.includes("USD")) // Exclude reqDot containing "USD"
      .forEach(product => {
        const productDate = new Date(product.fdate);
        const formattedProductDate = productDate.toLocaleString('default', { month: 'short' }) + " " + productDate.getFullYear();
        const categoryIndex = categories.indexOf(formattedProductDate);

        if (categoryIndex !== -1) {
          const trackIndex = tracks.indexOf(product.track);
          if (trackIndex !== -1) {
            sumByTrackAndMonth[trackIndex].data[categoryIndex] += parseInt(product.reqDot.replace(/,/g, ''), 10);
          }
        }
      });

    return sumByTrackAndMonth;
  }, [products]);

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    colors: ["#AA6AFA", "#E20D84", "#FF65F7", "#472665", "#890D83"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    yaxis: {
      labels: {
        style: {
          colors: "#CBD5E1",
          fontFamily: "Chakra Petch",
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#334155",
      strokeDashArray: 10,
      position: "back",
    },
    xaxis: {
      type: "category",
      categories: getLast8MonthsCategories(),
      labels: {
        style: {
          colors: "#CBD5E1",
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
    legend: {
      labels: {
        colors: "#CBD5E1",
      },
      fontFamily: "Chakra Petch",
    },
    tooltip: {
      theme: "dark", // Changed here for dark theme tooltip background
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div>
      <Chart options={options} series={calculateSumReqDotByTrackAndMonth} type="area" height={350} />
    </div>
  );
};

export default AreaSpaLine;
