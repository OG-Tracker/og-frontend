import React, { useEffect, useRef } from 'react';

function MovingShapes() {
  const containerRef = useRef(null);

  useEffect(() => {
    const createMovingShape = () => {
      const container = containerRef.current;
      if (!container || container.querySelectorAll(".moving-shape").length > 9) return;

      const shape = document.createElement('div');
      shape.className = 'moving-shape';
      const size = Math.random() * (150 - 50) + 50;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.position = 'absolute';
      shape.style.borderRadius = '50%';
      const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
      shape.style.backgroundColor = color;
      const startX = Math.random() * container.offsetWidth;
      shape.style.left = `${startX}px`;
      shape.style.top = `-100px`;

      container.appendChild(shape);

      shape.addEventListener('animationend', () => shape.remove());
    };

    createMovingShape();
    const intervalId = setInterval(createMovingShape, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div ref={containerRef} id="moving-shapes-container" style={{ position: 'absolute', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Shapes will be appended here */}
    </div>
  );
}

export default MovingShapes;
