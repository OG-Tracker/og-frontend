import React, { useEffect, useState } from 'react';

const ProgressBarTimer = ({ startDate, endDate, theHeight }) => {
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState('');


  useEffect(() => {
    const updateProgressAndTime = () => {
      const theHeight = 24;
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      const now = new Date().getTime();

      if (now >= end) {
        setProgress(100);
        setRemainingTime('Ended');
        return;
      }

      if (startDate === "-" || endDate === "-") {
        setProgress(0); // Reset progress to 0 or any default value
        setRemainingTime("OGT is Tracking");
        return; // Exit the effect hook early
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

    const interval = setInterval(updateProgressAndTime);
    return () => clearInterval(interval);
  }, [startDate, endDate]);

  return (
    <div>
     <div className='w-100 bg-kog-300 rounded-2xl' style={{ position: 'relative', height: `${theHeight}px`, borderRadius: '10px', overflow: 'hidden' }}>
  <div style={{ 
    height: '100%', 
    width: `${progress}%`, 
    backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)',
    backgroundSize: '1rem 1rem',
    animation: 'progress-bar-stripes 1s linear infinite',
    backgroundColor: '#890f83', 
    borderRadius: '10px', 
    transition: 'width 0.5s ease-in-out',
  }}></div>
  <span style={{ 
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: '500',
    zIndex: 1 // Ensure the span is above the progress bar
  }}>{progress.toFixed(2)}%</span>
  <style>
    {`
      @keyframes progress-bar-stripes {
        from { background-position: 1rem 0; }
        to { background-position: 0 0; }
      }
    `}
  </style>
</div>



      {/* <p className='text-center '><span className='border inline-block px-2 py-1 rounded border-kog-500 mt-2'>{remainingTime}</span></p> */}
    </div>
  );
};

export default ProgressBarTimer;
