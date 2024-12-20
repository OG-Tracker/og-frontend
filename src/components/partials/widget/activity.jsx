import React, { useEffect, useState } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { products } from "@/constant/data";
import Icon from "@/components/ui/Icon";

const datesWithDot = [
  { date: "2023-07-03", dot: 82176 },
  { date: "2023-07-27", dot: 887685 },
  { date: "2023-08-20", dot: 227860 },
  { date: "2023-09-14", dot: 282889 },
  { date: "2023-10-08", dot: 535545 },
  { date: "2023-11-01", dot: 846552 },
  { date: "2023-11-25", dot: 534766 },
  { date: "2023-12-19", dot: 837736 },
  { date: "2024-01-12", dot: 1035551 },
  { date: "2024-02-05", dot: 791173 },
  { date: "2024-02-29", dot: 1170598 },
  { date: "2024-03-24", dot: 1287813 },
  { date: "2024-04-18", dot: 3956485 },
  { date: "2024-05-12", dot: 3337982 },
  { date: "2024-06-05", dot: 1871353 },
  { date: "2024-06-29", dot: 1756694 },
  { date: "2024-07-23", dot: 1078862 },
  { date: "2024-08-16", dot: 849574 },
  { date: "2024-09-09", dot: 256383 },
  { date: "2024-10-03", dot: 290147 },
  { date: "2024-10-27", dot: 365548 },
  { date: "2024-11-21", dot: 48777 },
];

const getProductsByDate = (targetDate) => {
  const target = new Date(targetDate);
  return products.filter((product) => {
    const productDate = new Date(product.fdate);
    const diff = Math.abs(productDate - target);
    return diff <= 24 * 60 * 60 * 1000; // Within 1 day
  });
};

const calculateStablecoins = (productsInDate) => {
  return productsInDate
    .filter((product) => product.reqDot.includes("USDT") || product.reqDot.includes("USDC"))
    .reduce((sum, product) => {
      const value = parseFloat(product.reqDot.replace(/[^0-9.]/g, "")); // Extract numeric value
      return sum + value;
    }, 0);
};

const TrackingParcel = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [remainingTime, setRemainingTime] = useState(null);
  const [totalTime, setTotalTime] = useState(null);
  const itemsPerPage = 3;

  // Sort dates from newest to oldest
  const sortedDates = [...datesWithDot].sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalPages = Math.ceil(sortedDates.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginatedDates = sortedDates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchSpendPeriod = async () => {
    const provider = new WsProvider("wss://rpc.polkadot.io");
    const api = await ApiPromise.create({ provider });

    try {
      const spendPeriodConstant = api.consts.treasury.spendPeriod.toNumber();
      const spendPeriodMs = spendPeriodConstant * 6000; // Assuming block time is 6 seconds

      const currentBlock = await api.query.system.number();
      const blockTime = api.consts.babe.expectedBlockTime.toNumber();
      const remainingBlocks = spendPeriodConstant - (currentBlock.toNumber() % spendPeriodConstant);
      const remainingMs = remainingBlocks * blockTime;

      setRemainingTime(remainingMs);
      setTotalTime(spendPeriodMs);
    } catch (error) {
      console.error("Error fetching spend period:", error);
    }
  };

  const formatRemainingTime = (ms) => {
    if (ms <= 0) return "0d 0h 0m 0s";
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    fetchSpendPeriod();

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1000 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const completionPercentage =
    totalTime && remainingTime !== null ? ((totalTime - remainingTime) / totalTime) * 100 : 0;

  return (
    <div className="px-4">
    {remainingTime !== null ? (
  <div className="w-full text-center mb-5 border-b border-kog-400 pb-4">
    <p className="text-white mb-4 font-bold text-lg mt-2">Next Spend Period</p>
    <div className="flex justify-center gap-4">
      {(() => {
        const timeParts = formatRemainingTime(remainingTime).split(" ");
        const labels = ["Days", "Hours", "Minutes", "Seconds"];
        return timeParts.map((part, index) => {
          const [value, label] = part.split(/[a-z]/).filter(Boolean); // Split number and unit
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-16 h-16 border border-kog-400 shadow-[inset_0px_0px_10px_2px_rgba(0,0,0,1)] rounded-md text-white"
            >
              <span className="text-2xl font-bold">{value}</span>
              <span className="text-xs font-semibold">{labels[index]}</span>
            </div>
          );
        });
      })()}
    </div>
  </div>
) : (
  // Placeholder while loading
  <div className="w-full text-center mb-5 border-b border-kog-400 pb-4">
    <p className="text-white mb-4 font-bold text-lg mt-2">Next Spend Period</p>
    <div className="flex justify-center gap-4">
      {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center w-16 h-16 border border-kog-400 shadow-[inset_0px_0px_10px_2px_rgba(0,0,0,1)] rounded-md text-white"
        >
          <span className="text-2xl font-bold animate-pulse">--</span>
          <span className="text-xs font-semibold">{label}</span>
        </div>
      ))}
    </div>
  </div>
)}
      {/* <ol className="relative border-l border-kog-900">
        {paginatedDates.map((entry, index) => {
          const productsInDate = getProductsByDate(entry.date);
          const totalProducts = productsInDate.length;
          const totalStablecoins = calculateStablecoins(productsInDate);
          return (
            <li key={index} className="mb-3">
              <div className="flex items-start">
                <div className="bg-kog-400 w-8 h-8 flex items-center justify-center rounded-full -ml-4 shadow-[0px_0px_6px_2px_rgba(0,0,0,0.5)] mt-9">
                  <Icon icon="akar-icons:check" className="h-8 w-6" />
                </div>
                <div className="block px-4 py-2 rounded-xl shadow-[inset_0px_0px_10px_2px_rgba(0,0,0,1)] border border-kog-400 border-opacity-50 bg-gradient-to-t from-kog-300 to-transparent w-full ml-3">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium text-white text-sm max-w-[100px] w-full text-left">
                      <span className="font-bold">{entry.dot.toLocaleString()}</span> DOT
                    </p>

                    <p className="font-medium text-white text-sm rounded-full border border-kog-400 border-opacity-50 px-4 py-1 shadow-[inset_0px_0px_10px_2px_rgba(0,0,0,1)]">{entry.date}</p>
                    <p className="font-medium text-white text-sm max-w-[100px] w-full text-right">
                      <span className="font-bold ">
                        {totalStablecoins.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>{" "}
                      USD
                    </p>
                  </div>



                  <p className="text-white text-center text-sm font-bold mb-1 ">
                    <span className="font-bold text-2xl [text-shadow:2px_1px_7px_rgba(0,0,0,0.7)]"> {totalProducts}</span> <br /> Approved Proposals
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-5 py-1 rounded-full bg-gradient-to-t  hover:from-kog-300 hover:to-transparent font-bold border border-kog-900 border-opacity-50 shadow-[inset_0px_0px_10px_2px_rgba(0,0,0,1)] hover:shadow-[0px_0px_10px_2px_rgba(0,0,0,1)]"
          disabled={currentPage === 1}
        >
          Back
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-5 py-1 rounded-full bg-gradient-to-t  hover:from-kog-300 hover:to-transparent font-bold border border-kog-900 border-opacity-50 shadow-[inset_0px_0px_10px_2px_rgba(0,0,0,1)] hover:shadow-[0px_0px_10px_2px_rgba(0,0,0,1)]"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default TrackingParcel;
