import React, { useEffect, useRef } from 'react';

const CanvasAnimation = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const settings = {
      pointCount: 50,
      startSpeed: 1.3,
      availableColors: ["#9b59b6", "#8e44ad", "#be90d4", "#e08283", "#f1a9a0"], // Purple/Pink shades
    };

    let objects = [];
    let mousePos = {};

    const init = (canvas) => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      objects = [];

      const context = canvas.getContext("2d");

      for (let i = 0; i <= settings.pointCount; i++) {
        let plusOrMinusX = Math.random() < 0.5 ? -1 : 1;
        let plusOrMinusY = Math.random() < 0.5 ? -1 : 1;

        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const z = Math.random() * -150;

        const v = {
          x: plusOrMinusX * Math.random() * settings.startSpeed,
          y: plusOrMinusY * Math.random() * settings.startSpeed,
          z: Math.random() * settings.startSpeed * 4,
        };

        const colorIndex = Math.floor(Math.random() * settings.availableColors.length);

        objects.push(new Point(canvas, settings.availableColors[colorIndex], x, y, z, v));
      }

      bindMouseMove();
      requestAnimationFrame(() => draw(context));
    };

    class Point {
      constructor(canvas, color, x, y, z, v) {
        this.canvas = canvas;
        this.color = color;
        this.x = x;
        this.y = y;
        this.z = z;
        this.v = v;
        this.radius = this.calculateRadius();
      }

      calculateRadius() {
        return Math.abs(this.z / 120);
      }

      calculatePosition() {
        const diameter = 2 * this.radius;

        if (
          this.x > this.canvas.width ||
          this.y > this.canvas.height ||
          this.x + diameter < 0 ||
          this.y + diameter < 0
        ) {
          this.x = this.canvas.width / 2;
          this.y = this.canvas.height / 2;
          this.z = -40;
        }

        this.radius = this.calculateRadius();

        this.x += this.v.x;
        this.y += this.v.y;
        this.z += this.v.z;
      }

      adjustTowardsMouse(distToMouse, mouseX, mouseY) {
        if (mouseX > this.x) {
          this.v.x += 10 / distToMouse;
        }
        if (mouseY > this.y) { // Fixed typo from this.Y to this.y
          this.v.y += 10 / distToMouse;
        }

        if (mouseX <= this.x) {
          this.v.x -= 10 / distToMouse;
        }
        if (mouseY <= this.y) { // Fixed typo from this.Y to this.y
          this.v.y -= 10 / distToMouse;
        }
      }

      draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
      }
    }

    const draw = (context) => {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      objects.forEach(object => {
        object.calculatePosition();

        if (mousePos.x && mousePos.y) {
          const xDiff = object.x - mousePos.x;
          const yDiff = object.y - mousePos.y;

          const pointDist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

          if (pointDist < 150 + object.radius) {
            object.adjustTowardsMouse(pointDist, mousePos.x, mousePos.y);
          }
        }

        object.draw(context);
      });

      requestAnimationFrame(() => draw(context));
    };

    const bindMouseMove = () => {
      document.addEventListener('mousemove', e => {
        if (canvasRef.current) {
          const rect = canvasRef.current.getBoundingClientRect();
          mousePos.x = e.clientX - rect.left;
          mousePos.y = e.clientY - rect.top;
        }
      });
    };

    if (canvasRef.current) {
      init(canvasRef.current);
    }

    // Handle window resize
    const handleResize = () => {
      if (canvasRef.current) {
        init(canvasRef.current);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div style={{ height: '100%', width: '100%' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '65vh', background: 'transparent' }}></canvas>
         </div>;
};

export default CanvasAnimation;
