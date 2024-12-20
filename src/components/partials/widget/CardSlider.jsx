import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { products } from "@/constant/data";

// Image imports
import visaCardImage from "@/assets/images/all-img/visa-card-bg.png";

const datesWithDot = [
  { date: "2024-12-15", dot: 76260 },
  { date: "2024-11-21", dot: 48777 },
  { date: "2024-10-27", dot: 365548 },
  { date: "2024-10-03", dot: 290147 },
  { date: "2024-09-09", dot: 256383 },
  { date: "2024-08-16", dot: 849574 },
  { date: "2024-07-23", dot: 1078862 },
  { date: "2024-06-29", dot: 1756694 },
  { date: "2024-06-05", dot: 1871353 },
  { date: "2024-05-12", dot: 3337982 },
  { date: "2024-04-18", dot: 3956485 },
  { date: "2024-03-24", dot: 1287813 },
  { date: "2024-02-29", dot: 1170598 },
  { date: "2024-02-05", dot: 791173 },
  { date: "2024-01-12", dot: 1035551 },
  { date: "2023-12-19", dot: 837736 },
  { date: "2023-11-25", dot: 534766 },
  { date: "2023-11-01", dot: 846552 },
  { date: "2023-10-08", dot: 535545 },
  { date: "2023-09-14", dot: 282889 },
  { date: "2023-08-20", dot: 227860 },
  { date: "2023-07-27", dot: 887685 },
  { date: "2023-07-03", dot: 82176 },
];

const CardSlider = () => {
  const [spendPeriodData, setSpendPeriodData] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const fetchData = () => {
    const sortedDates = [...datesWithDot].sort((a, b) => new Date(b.date) - new Date(a.date));
    const data = sortedDates.map(({ date, dot }, index) => {
      const rangeStart = new Date(date);
      rangeStart.setDate(rangeStart.getDate() - 3);

      const rangeEnd = new Date(date);
      rangeEnd.setDate(rangeEnd.getDate() + 3);

      // Filter proposals within the date range
      const proposalsInPeriod = products.filter((product) => {
        const productDate = new Date(product.fdate);
        return productDate >= rangeStart && productDate <= rangeEnd;
      });

      // Calculate total DOT (excluding USDT/USDC values)
      const totalDot = proposalsInPeriod.reduce((sum, product) => {
        if (!product.reqDot.includes("USDT") && !product.reqDot.includes("USDC")) {
          const value = parseFloat(product.reqDot.replace(/,/g, ""));
          return sum + (isNaN(value) ? 0 : value);
        }
        return sum;
      }, 0);

      // Calculate total USDT/USDC
      const totalStable = proposalsInPeriod.reduce((sum, product) => {
        if (product.reqDot.includes("USDT") || product.reqDot.includes("USDC")) {
          const value = parseFloat(
            product.reqDot.replace(/,/g, "").replace(/USDT|USDC/g, "").trim()
          );
          return sum + (isNaN(value) ? 0 : value);
        }
        return sum;
      }, 0);

      return {
        date,
        spendPeriodNumber: sortedDates.length - index - 1, // Spend period #0 is the oldest date
        proposalCount: proposalsInPeriod.length,
        totalDot,
        totalStable,
      };
    });

    setSpendPeriodData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const gradients = [
    "from-kog-400 to-pink-600",
    "from-kog-600 to-pink-400",
    "from-kog-400 to-kog-900",
    "from-purple-400 to-kog-600",
    "from-pink-600 to-purple-500",
    "from-purple-500 to-pink-500",
    "from-pink-400 to-purple-600",
    "from-pink-500 to-kog-600",
    "from-purple-600 to-pink-400",
    "from-pink-600 to-purple-400",
    "from-pink-500 to-kog-300",
    "from-purple-400 to-pink-600",
  ];

  return (
    <div>
      <div className="relative px-6 mt-10">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="pr-8"
          onSwiper={setSwiperInstance}
        >
          {spendPeriodData.map((item, i) => {
            const gradient = gradients[i % gradients.length];
            return (
              <SwiperSlide key={i}>
                <div
                  className={`h-[250px] shadow-[inset_0px_0px_12px_3px_rgba(0,0,0,1)] border border-kog-400 bg-gradient-to-r ${gradient} relative rounded-md z-[1] p-4 text-white`}
                >
                  <div className="overlay absolute left-0 top-0 h-full w-full -z-[1]">
                    <img src={visaCardImage} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="absolute top-4 left-4 text-sm">
                    <span className="font-bold">{item.date}</span>
                  </div>
                  <div className="absolute top-2 right-4 text-lg font-bold">#{item.spendPeriodNumber}</div>
                  <div className="mt-[60px] font-semibold text-lg mb-[17px] text-center">
                    <span className="font-bold text-4xl">{item.proposalCount}</span> <br /> Approved Proposals
                  </div>
                  <div className="text-lg mb-1  text-center">
                    <span className="font-bold text-2xl">{item.totalDot.toLocaleString()} DOT</span>
                  </div>
                  {/* <div className="text-lg mb-1 absolute bottom-4 right-4">
                    <span className="font-bold text-xl">{item.totalStable.toLocaleString()}</span> USD
                  </div> */}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="text-center space-x-10 mt-10">
          <button
            onClick={() => swiperInstance?.slidePrev()}
            className="px-5 py-1 rounded-full bg-gradient-to-t from-kog-300 to-transparent font-bold border border-kog-900 border-opacity-50 shadow-lg hover:shadow-[0px_0px_10px_2px_rgba(0,0,0,1)]"
          >
            Back
          </button>
          <button
            onClick={() => swiperInstance?.slideNext()}
            className="px-5 py-1 rounded-full bg-gradient-to-t from-kog-300 to-transparent font-bold border border-kog-900 border-opacity-50 shadow-lg hover:shadow-[0px_0px_10px_2px_rgba(0,0,0,1)]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardSlider;

