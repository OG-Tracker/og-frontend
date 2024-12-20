import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import useRtl from "@/hooks/useRtl";
import { products } from "@/constant/data";

const RevenueBarChart = ({ height = 400 }) => {
  const [isDark] = useDarkMode();
  const [isRtl] = useRtl();

  const formatDate = (date) => {
    const d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('/');
  };


  // Dynamically generate series and categories based on products data
  const getLast8Months = () => {
    const months = [];
    for (let i = 7; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      months.push(d.toLocaleString('default', { month: 'short' }));
    }
    return months;
  };
  

  // let dataStructure = {
  //   bigSpender: {},
  //   mediumSpender: {},
  //   smallSpender: {},
  //   bigTipper: {},
  //   smallTipper: {},
  // };

  const categories = getLast8Months();

  const { series } = useMemo(() => {
    const trackMapping = {
      bigSpender: "bigSpender",
      mediumSpender: "Medium Spender",
      smallSpender: "Small Spender",
      bigTipper: "Big Tipper",
      smallTipper: "Small Tipper",
    };

    let dataStructure = Object.keys(trackMapping).reduce((acc, key) => {
      acc[key] = Array(8).fill(0); // Initialize arrays for the last 8 months
      return acc;
    }, {});

    // Populate the data structure with counts
    products.forEach((product) => {
      const productDate = new Date(product.fdate);
      const productMonthShort = productDate.toLocaleString('default', { month: 'short' });
      const track = product.track; // Assuming this matches the keys in dataStructure
      const monthIndex = categories.indexOf(productMonthShort);
      if (monthIndex !== -1) {
        dataStructure[track][monthIndex]++;
      }
    });
    
    const series = Object.entries(dataStructure).map(([track, counts]) => ({
      name: trackMapping[track],
      data: counts,
    }));

    return { series };
  }, [products]);

const options = {
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
  chart: {
    // borderRadius: "5",
    // columnWidth: '70%',

    toolbar: {
      show: false,
    },

    dropShadow: {
      enabled: true,
      enabledOnSeries: undefined,
      top: 0,
      left: 0,
      blur: 5,
      color: '#000',
      opacity: 0.8
    }
  },
  plotOptions: {
    // bar: {
    //   horizontal: false,
    //   endingShape: "rounded-3",
    //   columnWidth: "75%",
    // },
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "right",
    fontSize: "12px",
    fontFamily: "Chakra Petch",
    color: "#fff",
    offsetY: -30,
    markers: {
      width: 8,
      height: 8,
      offsetY: -1,
      offsetX: -5,
      radius: 12,
    },
    labels: {
      colors: "#fff",
    },
    itemMargin: {
      horizontal: 18,
      vertical: 0,
    },
  },
  title: {
    text: "Proposals by Track",
    align: "left",

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
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  yaxis: {
    opposite: isRtl ? true : false,
    labels: {
      style: {
        colors: "#fff",
        fontFamily: "Chakra Petch",
      },
    },
  },

  colors: ['#541266', '#541266', '#541266', '#541266', '#541266'],

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
    enabled: true,
    enabledOnSeries: undefined,
    shared: true,
    followCursor: true,
    intersect: false,
    inverseOrder: false,
    custom: undefined,
    hideEmptySeries: true,
    fillSeriesColor: false,
    colors: "#fff",
    theme: "dark",
    style: {
      fontSize: "14px",
      fontWeight: "500",
      fontFamily: "Chakra Petch",
      color: "#fff",



    },
    y: {
      formatter: function (val) {
        return val
      },
    },
  },

  grid: {
    show: true,
    borderColor: "rgba(255, 255, 255, 0.2)",
    strokeDashArray: 10,
    position: "back",
  },

  plotOptions: {

    bar: {
      borderRadius: 4, // Adjust this value to control the roundness
      columnWidth: '80%',
      borderColor: "white",
      stroke: {
        show: true,
        curve: ['straight', 'smooth', 'monotoneCubic', 'stepline'],
        lineCap: 'butt',
        colors: undefined,
        width: 13,
        dashArray: 0,
      },
    },
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        legend: {
          position: "bottom",
          offsetY: 8,
          horizontalAlign: "center",
        },
        plotOptions: {
          bar: {
            borderRadius: 30,
            columnWidth: "80%",
            borderRadius: "30px",
            borderColor: "white",

          },
        },
      },
    },
  ],
};


// Return the Chart component with dynamically generated series and categories
return (
  <div>
    <Chart options={options} series={series} type="bar" height={height} />
  </div>
);
};

export default RevenueBarChart;
