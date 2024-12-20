import React, { useEffect, useState } from 'react';

const Timer = ({ startDate, endDate }) => {
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState('');

  useEffect(() => {
    const updateProgressAndTime = () => {
      if (startDate === "-" || endDate === "-") {
        setProgress(0); // Reset progress to 0 or any default value
        setRemainingTime("OGT is Tracking");
        return; // Exit the effect hook early
      }

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

    const interval = setInterval(updateProgressAndTime, 1000); // Added update interval (e.g., 1000 milliseconds)
    return () => clearInterval(interval);
  }, [startDate, endDate]);

  return (
    <div>
      {remainingTime === "OGT is Tracking" ? (
        <p className="text-center ml-[-55px]" style={{ fontWeight: 'bold' }}>
          {remainingTime}
        </p>
      ) : (
        <p className="text-center">
          <span>{remainingTime}</span>
        </p>
      )}
    </div>
  );
};

export default Timer;
