import React from 'react';

const CheckIcon = () => {
  return (
    <div style={{ width: '24px', height: '24px', overflow: 'hidden', animation: 'reveal 3s infinite', color:'white' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
      <style>
        {`
          @keyframes reveal {
            0% {
              clip-path: polygon(0 0, 0% 0, 0% 100%, 0 100%);
            }
            25% { /* Adjust this value to control the speed of the animation */
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
            50%, 100% { /* This creates a pause between animations */
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default CheckIcon;
