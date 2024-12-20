import React, { useState, useEffect } from 'react';
import { products } from "@/constant/data";
// import { SunIcon, MoonIcon } from '@heroicons/react/solid';
import { Link } from "react-router-dom";


const Upcoming = () => {
  const [countdowns, setCountdowns] = useState({});
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = products.reduce((acc, proposal) => {
        acc[proposal.refNum] = calculateTimeDifference(proposal.ldate);
        return acc;
      }, {});
      setCountdowns(newCountdowns);
    }, 1000);

    // Apply the theme on initial load
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);

    return () => clearInterval(interval);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const getFilteredProposals = () => {
    const currentDate = new Date();
    const upcomingDate = new Date();
    upcomingDate.setDate(currentDate.getDate() + 30);

    const overdueProposals = products
      .filter(
        (proposal) =>
          proposal.status === 'InProgress' && new Date(proposal.ldate) < currentDate
      )
      .sort((a, b) => new Date(a.ldate) - new Date(b.ldate));

    const upcomingProposals = products
      .filter(
        (proposal) =>
          proposal.status === 'InProgress' &&
          new Date(proposal.ldate) >= currentDate &&
          new Date(proposal.ldate) <= upcomingDate
      )
      .sort((a, b) => new Date(a.ldate) - new Date(b.ldate));

    return { overdueProposals, upcomingProposals };
  };

  const calculateTimeDifference = (date) => {
    const currentDate = new Date();
    const proposalDate = new Date(date);
    const timeDifference = proposalDate - currentDate;

    const isNegative = timeDifference < 0;
    const absTimeDifference = Math.abs(timeDifference);

    const days = Math.floor(absTimeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (absTimeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (absTimeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((absTimeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isNegative };
  };

  const getBackgroundColor = (daysDifference) => {
    if (daysDifference > 14) return 'bg-light-orange';
    if (daysDifference > 7) return 'bg-orange';
    if (daysDifference >= 0) return 'bg-dark-orange';
    if (daysDifference >= -7) return 'bg-red';
    return 'bg-dark-red';
  };

  const formatTimeDifference = ({
    days,
    hours,
    minutes,
    seconds,
    isNegative,
  }) => {
    const prefix = isNegative ? '-' : '';
    const backgroundColor = getBackgroundColor(isNegative ? -days : days);

    return (
      <>
        <span className={`time-circle ${backgroundColor}`}>
          {prefix}
          {String(days).padStart(1, '0')}<spank className="text-[16px]">d</spank>
        </span>
        <span className={`time-circle ${backgroundColor}`}>
          {String(hours).padStart(1, '0')}<spank className="text-[16px]">h</spank>
        </span>
        <span className={`time-circle ${backgroundColor}`}>
          {String(minutes).padStart(1, '0')}<spank className="text-[16px]">m</spank>
        </span>
        <span className={`time-circle ${backgroundColor}`}>
          {String(seconds).padStart(1, '0')}<spank className="text-[16px]">s</spank>
        </span>
      </>
    );
  };

  const { upcomingProposals } = getFilteredProposals();



  return (
    <div className="container mx-auto max-w-7xl px-4">      
    <div className="grid grid-cols-1 gap-4 thespace px-6">
      <div>
      <div className=''>
            <div className="flex justify-between items-center py-1">
              
              <p className="text-2xl font-extrabold text-kog-900">{upcomingProposals.length}<span className='font-thin italic text-base  text-white'>Total</span></p>
            </div>
          </div>
        <div className="">
          {upcomingProposals.length > 0 ? (
            <div className="w-full space-y-4 mb-4 mt-2">
              {upcomingProposals.map((proposal) => {
                const timeDifference =
                  countdowns[proposal.refNum] ||
                  calculateTimeDifference(proposal.ldate);
                const formattedTimeDifference =
                  formatTimeDifference(timeDifference);
                const daysDifference = timeDifference.isNegative
                  ? -timeDifference.days
                  : timeDifference.days;
                return (
                  <Link
                    key={proposal.refNum}
                    to={`/${proposal.track}/${proposal.refNum}`}

                    rel="noopener noreferrer"
                    className={`flex items-center justify-between lg:justify-between flex-wrap border border-[#E6007A] bg-black-500 bg-opacity-50 border-opacity-40 py-2 px-4 rounded-md text-center shadow-[0px_0px_6px_5px_rgba(0,0,0,0.2)] hover:shadow-[inset_0px_0px_10px_5px_rgba(0,0,0,0.5)] transition ease-in-out hover:scale-105 duration-200`}
                  >
                    <div className="text-xl md:text-2xl lg:text-[1.8rem] font-bold w-full max-w-[90px] text-left">
                      #{proposal.refNum}
                    </div>
                    <div className="lg:w-auto w-full text-center lg:text-right lg:mt-0 mt-2 text-sm md:text-md lg:text-lg">
                      {formattedTimeDifference}
                    </div>
                    <div className="text-sm md:text-md lg:text-lg  text-gray-300  truncate w-full max-w-[120px]">
                      {proposal.proposer.length > 15 ? `${proposal.proposer.substring(0, 15)}...` : proposal.proposer}
                    </div>

                  </Link>
                );
              })}
            </div>
          ) : (
            <p>No upcoming proposals within the next 30 days.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Upcoming;