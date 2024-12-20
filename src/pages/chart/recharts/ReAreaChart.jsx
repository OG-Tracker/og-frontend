import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { products } from '@/constant/data'; // Adjust this import path as necessary

// Helper function to parse date and exclude entries with category "-"
const parseDateAndExcludeInvalid = (products) =>
  products
    .filter(product => product.fdate !== '-' && product.category !== '-' && !product.reqDot.includes('USD'))
    .map(product => ({
      ...product,
      fdate: product.fdate.substring(0, 7), // YYYY-MM format
      reqDot: parseInt(product.reqDot.replace(/,/g, ''), 10) // Remove commas and parse to integer
    }));

// Function to get the last 8 months from the date of the most recent product
const getLast8Months = (products) => {
  const sortedProducts = parseDateAndExcludeInvalid(products).sort((a, b) => b.fdate.localeCompare(a.fdate));
  const mostRecentDate = sortedProducts.length > 0 ? new Date(sortedProducts[0].fdate) : new Date();
  const monthsSet = new Set();
  for (let i = 0; i < 12; i++) { // Changed to last 8 months
    const pastDate = new Date(mostRecentDate.getFullYear(), mostRecentDate.getMonth() - i, 1);
    const month = `${pastDate.getFullYear()}-${String(pastDate.getMonth() + 1).padStart(2, '0')}`;
    monthsSet.add(month);
  }
  return Array.from(monthsSet).sort(); // Sort from past to present
};

// Calculate total reqDot for each month by category
const calculateTotalReqDotByCategory = (products, last8Months) => {
  const parsedProducts = parseDateAndExcludeInvalid(products);
  let categories = [...new Set(parsedProducts.map(product => product.category))];
  categories = categories.slice(0, 7); // Keep only the first 7 categories
  return categories.map(category => {
    const monthlyTotals = last8Months.map(month => {
      const filteredProducts = parsedProducts.filter(
        product => product.category === category && product.fdate === month
      );
      const total = filteredProducts.reduce((acc, curr) => acc + curr.reqDot, 0);
      return total; // Return the total without averaging
    });
    return { name: category, data: monthlyTotals };
  });
};

const ReAreaChart = () => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    const last8Months = getLast8Months(products);
    const updatedSeries = calculateTotalReqDotByCategory(products, last8Months);

    setSeries(updatedSeries);

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
        width: 1,
      },
      colors: ['#D96C94', '#CE23E8', '#4C5284', '#AB0054', '#A67FD0','#515ECF'],
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0,
          inverseColors: false,
          opacityFrom: 0.9,
          opacityTo: 0.5,
          stops: [0, 100]
        },
      },
      yaxis: {
        labels: {
          formatter: (val) => `${val} `,
          style: {
            colors: '#fff',
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
        type: 'datetime',
        categories: last8Months,
        labels: {
          rotate: -45,
          style: {
            colors: "#fff",
            fontFamily: "Chakra Petch",
          },
        },
      },
      legend: {
        shape: 'circle',
        markers: {
          size: 5,
          shape: 'circle',
          width: 20,
          height: 10,
          strokeColor: '#fff',
          strokeWidth: 1,
          fillColor: '#fff',
          offsetX: 0,
          offsetY: 0,
          radius: 12,
          hover: {
            size: undefined,
            sizeOffset: 3
          }
        },
        labels: {
          colors: "#CBD5E1",
        },
        fontFamily: "Chakra Petch",
      },
      tooltip: {
        theme: 'dark',
        x: {
          format: 'yyyy-MM',
        },
        y: {
          formatter: function (val) {
            return `${val} DOT`
          }
        },
        style: {
          backgroundColor: 'purple',
          fontSize: '12px',
        },
      },
    });
  }, []);

  return (
    <ReactApexChart options={options} series={series} type="area" height={335} />
  );
};

export default ReAreaChart;
