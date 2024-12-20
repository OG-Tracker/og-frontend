import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import './CircularProgressBar.css'; // Import the CSS file for styles and animations

const CircularProgressBar = ({
  startDate,
  endDate,
  status,
  size = "200", // Changed to a numerical value for simplicity
  strokeWidth = 10,
  baseColor = '#eee',
  textColor = '#890f83',
  shadowColor = 'rgba(255, 20, 147, 0.5)'
}) => {
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState('');
  const location = useLocation();

  const isSpecialPath = location.pathname === '/smallTipper' || location.pathname === '/bigTipper' || location.pathname === '/root' || location.pathname === '/referendumCanceller' || location.pathname === '/referendumKiller' || location.pathname === '/auctionAdmin' || location.pathname === '/generalAdmin' || location.pathname === '/fellowshipAdmin' || location.pathname === '/leaseAdmin' || location.pathname === '/stakingAdmin' || location.pathname === '/treasurer' || location.pathname === '/whitelistedCaller' || location.pathname === '/124';

  useEffect(() => {
    // Check if any of the dates is "-" and set "OGT is tracking"
    if (startDate === "-" || endDate === "-") {
      setProgress(0); // Reset progress to 0 or any default value
      setRemainingTime("OGT is Tracking");
      return; // Exit the effect hook early
    }

    const updateProgressAndTime = () => {
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      const now = new Date().getTime();

      if (now >= end) {
        setProgress(100);
        setRemainingTime('Ended');
        return;
      }

      const totalDuration = end - start;
      const timePassed = now - start;
      const progressPercentage = Math.min(Math.max((timePassed / totalDuration) * 100, 0), 100);
      setProgress(progressPercentage);

      const timeLeft = end - now;
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const interval = setInterval(updateProgressAndTime, 200);
    return () => clearInterval(interval);
  }, [startDate, endDate]);

  const radius = (parseInt(size) - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size + 'px', height: size + 'px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg height={size} width={size}>
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: "#f0b", stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: "#b0f", stopOpacity: 1}} />
          </linearGradient>
          <filter id="shadow" x="-100%" y="-100%" width="300%" height="300%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={shadowColor} />
          </filter>
        </defs>
        <circle
          stroke={baseColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="progress-ring__circle" // Apply the animated class
          stroke="url(#progressGradient)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease 0s', filter: 'url(#shadow)' }}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      
      <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* {(startDate !== "-" && endDate !== "-") ? (
          <>
            <strong style={{ fontSize: '2.2rem', color: textColor }}>{progress.toFixed(2)}%</strong>
            <span style={{ fontSize: '1rem', color: textColor, marginTop: '5px' }}>{remainingTime}</span>
          </>
        ) : (
          <strong style={{ fontSize: '1.3rem', color: textColor }}>OGT is Tracking</strong>
        )} */}

            {(status === "InProgress" && new Date() >= new Date(endDate)) ? (
              
              <>
              <strong style={{ fontSize: '1.3rem', color: textColor,  textAlign: 'center', lineHeight: '16px' }}>OGT Final <br/> Assessment</strong>
              <span style={{ fontSize: '1rem', color: textColor }}>{progress.toFixed(2)}%</span>
                
                </>
            ) : (status === "Delivered") ? (
              
              <>
              <strong style={{ fontSize: '2.2rem', color: textColor }}>{progress.toFixed(2)}%</strong>
                <span style={{ fontSize: '1rem', color: textColor, marginTop: '5px' }}>{remainingTime}</span>
              </>
            ) : (startDate !== "-" && endDate !== "-") ? (
              // Your existing condition for when both startDate and endDate are not "-"
              <>
                <strong style={{ fontSize: '2.2rem', color: textColor }}>{progress.toFixed(2)}%</strong>
                <span style={{ fontSize: '1rem', color: textColor, marginTop: '5px' }}>{remainingTime}</span>
              </>
            ) : (
              // Your existing fallback condition
              <strong style={{ fontSize: '1.3rem', color: textColor }}>OGT is Tracking</strong>
            )}
      </div>
    </div>
  );
};

export default CircularProgressBar;
