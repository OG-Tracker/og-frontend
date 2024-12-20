import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import { products } from "@/constant/data";

const ColumnChartDynamic = () => {
  const [isDark] = useDarkMode();
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const tracks = ["smallSpender", "mediumSpender", "bigSpender", "smallTipper", "bigTipper"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const filteredProducts = products.filter((product) => 
      product.reqDot.includes("USDT") || product.reqDot.includes("USDC")
    );
  
    // Ensure valid dates are extracted from `fdate`
    const dates = filteredProducts
      .map((product) => new Date(product.fdate))
      .filter((date) => !isNaN(date)); // Filter out invalid dates
    
    if (dates.length === 0) {
      console.warn("No valid dates found in filteredProducts.");
      setCategories([]);
      setSeries([]);
      return;
    }
  
    const sortedDates = dates.sort((a, b) => a - b);
    const firstDate = sortedDates[0];
    const lastDate = sortedDates[sortedDates.length - 1];
  
    let currentDate = new Date(lastDate); // Start from the latest month
    let monthCategories = [];
    let trackData = tracks.map(() => []);
  
    // Generate month categories dynamically from firstDate to lastDate
    while (currentDate >= firstDate) {
      const monthStr = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
      monthCategories.unshift(monthStr);
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
  
    // Populate track data for each category
    tracks.forEach((track, index) => {
      monthCategories.forEach((category, i) => {
        const [monthName, year] = category.split(" ");
        const monthIndex = monthNames.indexOf(monthName);
        const monthStr = `${year}-${monthIndex + 1 < 10 ? `0${monthIndex + 1}` : monthIndex + 1}`;
  
        trackData[index][i] = filteredProducts.filter(
          (product) => 
            product.fdate.startsWith(monthStr) && product.track === track
        ).length;
      });
    });
  
    // Set state
    setCategories(monthCategories);
    setSeries(
      tracks.map((track, i) => ({
        name: track,
        data: trackData[i],
      }))
    );
  }, []);
  
  

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
        columnWidth: "95%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 10,
      colors: ["transparent"],
    },
    legend: {
      labels: {
        colors: "#fff",
        fontFamily: "Chakra Petch",
      },
    },
    xaxis: {
      categories: categories,
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
    yaxis: {
      showAlways: true,
      labels: {
        formatter: function (val) {
          return val; // Display only numbers
        },
        style: {
          colors: "#fff",
          fontFamily: "Chakra Petch",
        },
      },
      axisBorder: {
        show: false, // Remove axis line
      },
      axisTicks: {
        show: false, // Remove ticks
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: function (val) {
          return `${val} Proposals`; // Tooltip to show proposal count
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#593C74",
      position: "back",
    },
    colors: ["#D96C94", "#AB0054", "#515ECF", "#CE23E8", "#A67FD0"],
  };

  return (
    <div>
      <Chart options={options} series={series} type="bar" height="350" />
    </div>
  );
};

export default ColumnChartDynamic;
