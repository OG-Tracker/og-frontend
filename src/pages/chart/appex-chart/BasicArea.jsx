import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import { products } from "@/constant/data";

// Moved outside the component to prevent re-declaration
const monthsToConsider = 12;

// Helper function to generate past month names dynamically
const generatePastMonths = (monthsCount) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const result = [];
  const date = new Date();
  for (let i = monthsCount - 1; i >= 0; i--) {
    const pastMonth = new Date(date.getFullYear(), date.getMonth() - i, 1);
    result.push(monthNames[pastMonth.getMonth()]);
  }
  return result;
};

// Helper function to parse and sum `reqDot` values by month for products with a given "fdate"
const sumReqDotByMonth = (products) => {
  const sumsByMonth = {};
  const currentDate = new Date();

  // Initialize sums for the past 8 months to 0
  for (let i = 0; i < monthsToConsider; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // Ensure month is two digits
    sumsByMonth[key] = 0;
  }

  // Filter products with 'fdate' and sum 'reqDot' values
  products.filter(product => product.fdate && !product.reqDot.includes("USD")).forEach((product) => {
    const { fdate, reqDot } = product;
    if (!fdate) return; // Skip products without 'fdate'
    const [year, month, day] = fdate.split('-');
    const reqDotInt = parseInt(reqDot.replace(/,/g, ''), 10);
    const key = `${year}-${month}`; // Use year-month format

    if (sumsByMonth.hasOwnProperty(key)) {
      sumsByMonth[key] += reqDotInt;
    }
  });

  // Map sums to the dynamically generated months
  const sortedMonths = Object.keys(sumsByMonth).sort().slice(-monthsToConsider);
  return sortedMonths.map(key => sumsByMonth[key]);
};

const BasicArea = ({ height = 'auto' }) => {
  const [isDark] = useDarkMode();
  const series = [{ name: '', data: sumReqDotByMonth(products) }];
  const monthsLabels = generatePastMonths(monthsToConsider);

  const options = {
    chart: {
      background: "rgba(255, 255, 255, 0)",
      foreColor: '#000',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },

      toolbar: {
        show: false,
      },
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.5,
        stops: [0, 100],
        type: "vertical",
        colorStops: [
          {
            offset: 0,
            color: "#E6007A",
            opacity: 0.8
          },
          {
            offset: 100,
            color: "transparent",
            opacity: 0.1
          }
        ]
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    colors: ["#DA18D0"],
    tooltip: {
      theme: "dark",
    },
    grid: {
      show: true,
      borderColor: "rgba(255, 255, 255, 0.2)",
      strokeDashArray: 10,
      position: "back",
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff",
          fontFamily: "Chakra Petch",
        },
      },
    },
    xaxis: {
      categories: monthsLabels,
      labels: {
        style: {
          colors: "#fff",
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
  };

  return (
    <div>
      <Chart options={options} series={series} type="area" height={height} filter="url(#shadow)" />
    </div>
  );
};

export default BasicArea;
