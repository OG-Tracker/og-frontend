import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import { tr } from "@faker-js/faker";
import { products } from "@/constant/data";

const Pie = () => {
  const [isDark] = useDarkMode();
  const series = [44, 55, 13, 43, 22, 29, 17];

  const options = {
    chart: {
      // background: "rgba(255, 255, 255, 0)",
      // foreColor: '#000',
      toolbar: {
        show: true,
        background: "#000",
        theme: "dark",
        foreColor: '#000',
      },

      dropShadow: {
        enabled: true,
        
        top: 0,
        left: 0,
        blur: 8,
        color: '#000',
        opacity: 1
    },
    
    },
    
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          {
            offset: 0,
            color: "#fff",
            opacity: 1
          },
          {
            offset: 20,
            color: "#fff",
            opacity: 1
          },
          {
            offset: 60,
            color: "#61DBC3",
            opacity: 1
          },
          {
            offset: 100,
            color: "#95DA74",
            opacity: 1
          }
        ]
      }
    },
    grid: {
       borderColor: '#6D6D6D'
    },
    labels: ["Marketing", "Development", "Upgrades", "Tips", "Events", "Bounty", "Other"],
    dataLabels: {
      enabled: true,
      fontFamily: "Chara Petch",
      
    },


    // colors: ["#2c1730", "#890f83", "#90249c", "#da18d0", "#890f83","#2c1740", "#890f83",],
    legend: {
      show: false,
      position: "bottom",
      fontSize: "16px",
      fontFamily: "Chakra Petch",
      fontWeight: 500,
      border: "none",
      labels: {
        colors:  "#475569",
        border: "none",
      },
      
     
      labels: {
        colors: "#FFFFFF",
        useSeriesColors: false,
      },
      
      markers: {
        width: 8,
        height: 8,
        offsetY: -1,
        offsetX: -5,
        radius: 12,
        border: "none",
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    stroke: {
      
      show: false,
      
        width: 4,
        colors: ['#1E0F2A']
      
      
    },

 
    colors:["#E6007A", "#AA6AFA", "#E6007A", "#AA6AFA", "#E6007A","#AA6AFA", "#E6007A",],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors:  ["#AA6AFA", "#E6007A", "#AA6AFA", "#E6007A", "#AA6AFA","#E6007A", "#AA6AFA",],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
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
      <Chart options={options} series={series} type="pie" height="450" />
    </div>
  );
};

export default Pie;
