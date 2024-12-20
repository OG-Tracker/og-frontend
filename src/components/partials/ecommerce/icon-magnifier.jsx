import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import iconData from './icon-magnifier.json'; 

const Magnifier = () => {
  const iconRef = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: iconRef.current, // reference to the container
      animationData: iconData, // your JSON animation data
      renderer: 'svg',
      loop: true,
      autoplay: true,
      color: '#ffffff',
    });

    return () => animation.destroy(); // Clean up
  }, []); // Empty dependency array ensures it only runs once

  return <div className="text-white w-5" ref={iconRef}></div>;
};

export default Magnifier;
