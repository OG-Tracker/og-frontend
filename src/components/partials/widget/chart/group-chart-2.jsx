import React from "react";
import Icon from "@/components/ui/Icon";
import { products } from "@/constant/data";

import shade1 from "@/assets/images/all-img/shade-1.png";
import shade2 from "@/assets/images/all-img/shade-2.png";
import shade3 from "@/assets/images/all-img/shade-3.png";
import shade4 from "@/assets/images/all-img/shade-4.png";

// Calculate the sum of reqDot values
const sumOfReqDot = products.reduce((sum, product) => {
  const reqDotValue = Number(product.reqDot.replace(/,/g, ''));
  return !isNaN(reqDotValue) ? sum + reqDotValue : sum;
}, 0);

const formattedSum = sumOfReqDot.toLocaleString();

// Total number of proposals
const totalProposals = products.length;

// Count of proposals with status "Delivered"
const deliveredProposalsCount = products.reduce((count, product) => {
  return product.status === "Delivered" ? count + 1 : count;
}, 0);

// Count products by track
const trackCounts = products.reduce((acc, product) => {
  acc[product.track] = (acc[product.track] || 0) + 1;
  return acc;
}, {});

const statistics = [
  {
    title: "Small Spender",
    count: trackCounts.smallSpender || 0,
    bg: "bg-kog-300",
    text: "text-primary-500",
    percent: "25.67%",
    icon: "heroicons:arrow-trending-up",
    img: shade1,
    percentClass: "text-primary-500",
  },
  {
    title: "Medium Spender",
    count: trackCounts.mediumSpender || 0,
    bg: "bg-kog-300",
    text: "text-kog-500",
    percent: "8.67%",
    icon: "heroicons:arrow-trending-up",
    img: shade2,
    percentClass: "text-primary-500",
    border: "border-kog-200",
  },
  {
    title: "Big Spender",
    count: trackCounts.bigSpender || 0,
    bg: "bg-kog-300",
    text: "text-primary-500",
    percent: "11.67%",
    icon: "heroicons:arrow-trending-up",
    img: shade4,
    percentClass: "text-primary-500",
  },
  {
    title: "Small Tipper",
    count: trackCounts.smallTipper || 0,
    bg: "bg-kog-300",
    text: "text-primary-500",
    percent: "11.67%",
    icon: "heroicons:arrow-trending-up",
    img: shade4,
    percentClass: "text-primary-500",
  },
  {
    title: "Big Tipper",
    count: trackCounts.bigTipper || 0,
    bg: "bg-kog-300",
    text: "text-primary-500",
    percent: "11.67%",
    icon: "heroicons:arrow-trending-up",
    img: shade4,
    percentClass: "text-primary-500",
  },
];

const GroupChart2 = () => {
  return (
    <>
      {statistics.map((item, i) => (
        <div
          key={i}
          className="rounded-md p-4 relative z-[1] shadow-[0px_0px_20px_5px_rgba(0,0,0,0.4)] bg-gradient-to-t from-kog-50 to-transparent"
        >
          <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
            <img
              src={item.img}
              alt=""
              draggable="false"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="block mb-2 lg:mb-6 text-md text-center sm:text-left text-kog-900 font-medium">
            {item.title}
          </span>
          <span className="block text-4xl md:text-2xl lg:text-3xl xl:text-5xl text-center sm:text-left text-white font-bold mb-2 lg:mb-6">
            {item.count}
          </span>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <div className={`flex-none text-xl ${item.text}`}>
              {/* <Icon icon={item.icon} /> */}
            </div>
            <div className="flex-1 text-sm">
              {/* <span className={`block mb-[2px] ${item.percentClass}`}>
                {item.percent}
              </span> */}
              {/* <span className="block mb-1 text-kog-white dark:text-slate-300">
                From last week
              </span> */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GroupChart2;
