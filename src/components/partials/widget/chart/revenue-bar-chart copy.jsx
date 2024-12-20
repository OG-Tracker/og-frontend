import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import useDarkMode from '@/hooks/useDarkMode';
import useRtl from '@/hooks/useRtl';
import { products } from '@/constant/data';

const RevenueBarChart = ({ height = 400 }) => {
  const [isDark] = useDarkMode();
  const [isRtl] = useRtl();

  // Helper function to get month name from a date string
  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' });
  };

  // Dynamically generate series and categories based on products data
  const { series, categories } = useMemo(() => {
    const trackMapping = {
      bigSpender: 'Big Spender',
      mediumSpender: 'Medium Spender',
      smallSpender: 'Small Spender',
      bigTipper: 'Big Tipper',
      smallTipper: 'Small Tipper',
    };

    let dataStructure = {
      bigSpender: {},
      mediumSpender: {},
      smallSpender: {},
      bigTipper: {},
      smallTipper: {},
    };

    // Populate the data structure with counts
    products.forEach((product) => {
      const month = getMonthName(product.fdate);
      const track = product.track; // Assuming this matches the keys in dataStructure
      if (!dataStructure[track][month]) {
        dataStructure[track][month] = 0;
      }
      dataStructure[track][month]++;
    });

    // Convert dataStructure to series format for the chart
    const series = Object.entries(dataStructure).map(([track, counts]) => ({
      name: trackMapping[track],
      data: Object.values(counts),
    }));

    // Assuming categories are the unique months in sorted order
    const categories = [...new Set(products.map((product) => getMonthName(product.fdate)))].sort();

    return { series, categories };
  }, []);

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 5,
        color: '#000',
        opacity: 0.8,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '80%',
      },
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: isDark ? '#fff' : '#000',
          fontFamily: 'Chakra Petch',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? '#fff' : '#000',
          fontFamily: 'Chakra Petch',
        },
      },
      opposite: isRtl,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: isDark ? 'dark' : 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#E6007A'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    colors: ['#541266'],
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 15,
            },
          },
        },
      },
    ],
  };

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={height} />
    </div>
  );
};

export default RevenueBarChart;
