import React from "react";
import Icon from "@/components/ui/Icon";
import { products } from "@/constant/data";

import shade1 from "@/assets/images/all-img/shade-1.png";
import shade2 from "@/assets/images/all-img/shade-2.png";
import shade3 from "@/assets/images/all-img/shade-3.png";
import shade4 from "@/assets/images/all-img/shade-4.png";

// Calculate totals for DOT, USD, and Stablecoins separately
const { sumOfReqDot, sumOfReqUsd, sumOfReqStablecoin } = products.reduce(
  (acc, product) => {
    const reqDotValue = product.reqDot.replace(/,/g, '').trim(); // Remove commas and whitespace
    if (reqDotValue.endsWith('USD')) {
      const numericValue = Number(reqDotValue.replace('USD', '').trim());
      if (!isNaN(numericValue)) acc.sumOfReqUsd += numericValue;
    } else if (reqDotValue.endsWith('USDT') || reqDotValue.endsWith('USDC')) {
      const numericValue = Number(reqDotValue.replace(/USDT|USDC/, '').trim());
      if (!isNaN(numericValue)) acc.sumOfReqStablecoin += numericValue;
    } else {
      const numericValue = Number(reqDotValue);
      if (!isNaN(numericValue)) acc.sumOfReqDot += numericValue;
    }
    return acc;
  },
  { sumOfReqDot: 0, sumOfReqUsd: 0, sumOfReqStablecoin: 0 }
);

const formattedSumDot = sumOfReqDot.toLocaleString();
const formattedSumUsd = sumOfReqUsd.toLocaleString();
const formattedSumStablecoin = sumOfReqStablecoin.toLocaleString();

const totalProposals = products.length;

// Count of proposals with status "Delivered"
const deliveredProposalsCount = products.reduce((count, product) => {
  return product.status === "Delivered" ? count + 1 : count;
}, 0);

const statistics = [
  {
    title: "Approved Proposals",
    count: totalProposals,
    bg: "bg-kog-300",
    text: "text-primary-500",
    percent: "25.67%",
    icon: "heroicons:arrow-trending-up",
    img: shade1,
    percentClass: "text-primary-500",
  },
  {
    title: "Monitored Tracks",
    count: 15,
    bg: "bg-kog-300",
    text: "text-kog-500",
    percent: "8.67%",
    icon: "heroicons:arrow-trending-up",
    img: shade2,
    percentClass: "text-primary-500",
    border: "border-kog-200",
  },
  {
    title: "Total DOT Funded",
    count: formattedSumDot,
    bg: "bg-kog-300",
    text: "text-danger-500",
    percent: "1.67%",
    icon: "heroicons:arrow-trending-down",
    img: shade3,
    percentClass: "text-danger-500",
  },
  {
    title: "Total Stables Funded",
    count: formattedSumStablecoin,
    bg: "bg-kog-300",
    text: "text-success-500",
    percent: "N/A",
    icon: "heroicons:arrow-trending-up",
    img: shade3,
    percentClass: "text-success-500",
  },
  {
    title: "Delivered Proposals",
    count: deliveredProposalsCount,
    bg: "bg-kog-300",
    text: "text-primary-500",
    percent: "11.67%",
    icon: "heroicons:arrow-trending-up",
    img: shade4,
    percentClass: "text-primary-500",
  },
];

const GroupChart3 = () => {
  return (
    <>
      {statistics.map((item, i) => (
        <div
          key={i}
          className="rounded-md p-4 relative z-[1] shadow-[0px_0px_20px_5px_rgba(0,0,0,0.4)]"
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
              {/* Optional: Display percentage or other info */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GroupChart3;
