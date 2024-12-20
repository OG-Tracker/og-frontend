import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { products } from '@/constant/data'; // Adjust this import path as necessary

const getLast8Months = (products) => {
  const monthsSet = new Set();
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const pastDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = `${pastDate.getFullYear()}-${String(pastDate.getMonth() + 1).padStart(2, '0')}`;
    monthsSet.add(month);
  }
  return Array.from(monthsSet).sort(); // Sort from past to present
};

const ReAreaChartTrack = () => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    const last8Months = getLast8Months(products);
    const categories = last8Months;
    const initialSeries = [
      { name: 'smallTipper', data: Array(last8Months.length).fill(0) },
      { name: 'bigTipper', data: Array(last8Months.length).fill(0) },
      { name: 'smallSpender', data: Array(last8Months.length).fill(0) },
      { name: 'mediumSpender', data: Array(last8Months.length).fill(0) },
      { name: 'bigSpender', data: Array(last8Months.length).fill(0) },
    ];

    products.forEach(product => {
      const productMonth = product.fdate.substring(0, 7);
      const monthIndex = categories.findIndex(month => month === productMonth);
      if (monthIndex !== -1) {
        const seriesIndex = initialSeries.findIndex(s => s.name === product.track);
        if (seriesIndex !== -1) {
          initialSeries[seriesIndex].data[monthIndex] += 1; // Assuming each product counts as 1
        }
      }
    });

    setSeries(initialSeries);

    setOptions({
      chart: {
        
        type: 'area',
        stacked: false,
        toolbar: {
          show: false
        },
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
      },
      stroke: {
        curve: 'straight',
        width: 2,
      },
      colors: ['#D96C94', '#CE23E8', '#515ECF', '#AB0054', '#A67FD0'],
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      fill: {
        type: 'gradient',
        gradient: {
        
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.6,
          opacityTo: 0,
          stops: [0,  100]
          
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff",
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
      // xaxis: {
      //   type: 'datetime',
      //   categories: categories,
      // },

      xaxis: {
        type: "datetime",
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

      legend: {
        markers: {
          size: 5, // Adjusts the size of the markers on the chart
          shape: 'square', // Changes the marker shape to square. Other options include 'circle', 'rect', etc.
          width: 10, // Adjusts the width of the legend marker
          height: 10, // Adjusts the height of the legend marker
          strokeColor: '#fff', // Color of the marker's border
          strokeWidth: 2, // Width of the border around the marker
          fillColor: '#fff', // Fill color of the marker
          offsetX: 0, // Offset the marker along the X axis
          offsetY: 0, // Offset the marker along the Y axis
          radius: 2, // Applies only if shape is 'circle', adjusts the radius
          hover: {
            size: undefined, // Size of the marker when hovered
            sizeOffset: 3 // Additional size to add when hovered
          }
        },
        labels: {
          colors: "#CBD5E1",
        },
        fontFamily: "Chakra Petch",
      },
      tooltip: {
        theme: 'dark', // Adjusted for custom tooltip
        x: {
          format: 'yyyy-MM'
        },
        y: {
          formatter: function (val) {
            return val + " approved"
          }
        },
        style: {
          backgroundColor: 'purple', // Custom purple background for the tooltip
          fontSize: '12px',
        },
      },
    });
  }, []);

  return (
    <ReactApexChart options={options} series={series} type="area" height={350} />
  );
};

export default ReAreaChartTrack;
