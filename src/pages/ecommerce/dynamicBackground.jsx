import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 4;
    canvas.height = window.innerHeight * 4;
    const context = canvas.getContext('2d');
    let hue = 280; // Starting hue for purple/pink range
    let counter = 0;

    const draw = () => {
      hue = (hue + 1) % 360;
      if (hue < 260 || hue > 320) {
        // Keep the hue within purple/pink range
        hue = 280;
      }

      if (++counter % 4 === 0) {
        const centerX = window.innerWidth * Math.random();
        const centerY = window.innerHeight * Math.random();
        const radius = (Math.floor(32000 * Math.random()) / 1000) + 8;

        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = `hsl(${hue}, 45%, 75%)`;
        context.fill();
      }

      setTimeout(() => window.requestAnimationFrame(draw), 25);
    };

    draw();
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />;
};

export default AnimatedBackground;
