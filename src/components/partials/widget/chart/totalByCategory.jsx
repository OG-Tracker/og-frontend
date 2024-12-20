import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import useRtl from "@/hooks/useRtl";
import { products } from "@/constant/data";

const DotByCategory = ({ height = 335 }) => {
  const [isDark] = useDarkMode();
  const [isRtl] = useRtl();

  // Single series with multiple data points
  // const series = [{
  //   name: "Categories",
  //   data: [44, 59, 80, 81, 56] // Values for each category
  // }];

    // Preprocess the data to calculate the average reqDot for each category
    const averages = products.reduce((acc, product) => {
      const category = product.category.split('/')[0]; // For items with multiple categories, consider only the first
      const reqDotNumber = parseInt(product.reqDot.replace(/,/g, ''), 10); // Convert "reqDot" to a number
  
      if (acc[category]) {
        acc[category].total += reqDotNumber;
        acc[category].count += 1;
      } else {
        acc[category] = { total: reqDotNumber, count: 1 };
      }
  
      return acc;
    }, {});
  

    const series = Object.entries(averages).map(([category, data]) => ({
      name: category,
      data: [{ x: category, y: data.total / data.count }],
    }));

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 10,
        color: '#000',
        opacity: 0.8
      }
    },

    title: {
      // text: "Avg. Dot by Category",
      // align: "left",

      offsetX: isRtl ? "0%" : 0,
      offsetY: 13,
      floating: false,
      style: {
        fontSize: "20px",
        fontWeight: "500",
        fontFamily: "Chakra Petch",
        color: "#fff",
      },
    },
    xaxis: {
      labels: {
        show: false, // Hide x-axis labels
      },
      axisBorder: {
        show: false, // Hide x-axis line
      },
      axisTicks: {
        show: false, // Hide x-axis ticks
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      fontSize: "12px",
      fontFamily: "Chakra Petch",
      labels: {
        colors: "#fff",
      },
      offsetY: -30,
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff",
          fontFamily: "Chakra Petch",
        },
      },
    },
    colors: ['#AA6AFA', '#AA6AFA', '#AA6AFA', '#AA6AFA', '#AA6AFA'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ['#E6007A', '#E6007A', '#E6007A', '#E6007A', '#E6007A'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "14px",
        fontWeight: "500",
        fontFamily: "Chakra Petch",
      }, 
    },
    grid: {
      borderColor: "rgba(255, 255, 255, 0.2)",
      strokeDashArray: 10,
    },
    
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: '90%',
        
      
      },
    },
  };
  

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={height} />
    </div>
  );
};

export default DotByCategory;
