import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import { products } from "@/constant/data"; 

// Assuming the products array is imported or defined somewhere in this file
// If it's imported, you should uncomment the import statement below
// import { products } from 'path_to_products_file';

const BasicBar = ({ height = 350 }) => {
  const [isDark] = useDarkMode();

  // Function to calculate the sum of products in each category
  const calculateSums = (products) => {
    const statusCategories = ["Delivered", "InProgress", "Flagged"];
    const sums = { "Delivered": 0, "InProgress": 0, "Flagged": 0 };

    products.forEach((product) => {
      if (statusCategories.includes(product.status)) {
        sums[product.status]++;
      }
    });

    return statusCategories.map(category => sums[category]);
  };

  const series = [
    {
      name:'',
      data: calculateSums(products),
    },
  ];

  const options = {
    chart: {
      background: "rgba(255, 255, 255, 0)",
      fontFamily: "Chakra Petch",
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff" , // Adjusted to use isDark for dynamic color
          fontFamily: "Chakra Petch",
        },
      },
    },
    grid: {
      show: true,
      borderColor:  "#fff" , // Adjusted to use isDark for dynamic color
      strokeDashArray: 10,
      position: "back",
    },
    xaxis: {
      categories: ["Delivered", "In Progress", "Flagged"],
      labels: {
        
        style: {
          colors: "#fff" , // Adjusted to use isDark for dynamic color
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
    colors: ["#AA6AFA", "#AA6AFA", "#E6007A"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark" , // Adjusted to use isDark for dynamic shade
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#E6007A", "#E6007A", "#E6007A"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={height} />
    </div>
  );
};

export default BasicBar;
