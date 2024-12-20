import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import { products } from "@/constant/data";

const Donut = ({ height = 'auto' }) => {
  const [isDark] = useDarkMode();

  // Calculate sums for each category, skipping "-" category
  const categorySums = products.reduce((acc, product) => {
    const { category } = product;
    if (category.trim() !== "-") { // Check if category is not "-"
      acc[category.trim()] = (acc[category.trim()] || 0) + 1; // Increment count for each category
    }
    return acc;
  }, {});

  // Generate series and labels for the chart
  const series = Object.values(categorySums);
  const labels = Object.keys(categorySums).map(label => 
    label === "Talent & Education" ? "T & E" : label
  );

  const options = {
    labels,
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `${val.toFixed(1)}%`;
      },
      style: {
        colors: ['#FFFFFF'], // Making data labels font color white
      },
    },
    chart: {
      fontFamily: 'Chakra Petch, sans-serif',
      fontSize: '24px',
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 7,
        color: '#000',
        opacity: 0.7
      },
    },
    colors: ['#980458', '#3F04BF', '#FF0BD8', '#5D68A6', '#F26DB6','#F7B0BB'],
    plotOptions: {
      pie: {
        donut: {
          size: '62%',
          labels: {
            show: true,
            name: {
              color: '#fff', 
              fontSize: '24px'
            },
            value: {
              color: '#E6007B', 
              fontSize: '28px'
            },
            total: {
              color: '#FFFFFF',
            }
          },
        },
        expandOnClick: true,
        dataLabels: {
          offset: 0,
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent'],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#E6007A', '#F26DB6', '#fff', '#F26DB6', '#E6007A', '#F26DB6'],
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [0, 100]
      },
    },
    states: {
      hover: {
        filter: {
          type: '',
        },
      },
    },
    legend: {
      show: false,
      labels: {
        colors: '#FFFFFF',
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div>
      <Chart options={options} series={series} height={height} type="donut" />
    </div>
  );
};

export default Donut;
