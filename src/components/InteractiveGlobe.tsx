"use client";

import React, { useEffect, useRef, useState } from "react";

interface NodePoint {
  x: number;
  y: number;
  z: number;
  px?: number;
  py?: number;
  alpha?: number;
}

interface ChapterCity {
  name: string;
  lat: number;
  lon: number;
  labelX?: number;
  labelY?: number;
  visible?: boolean;
}

export default function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeCity, setActiveCity] = useState("Global Network");

  const cities: ChapterCity[] = [
    { name: "New Delhi Chapter", lat: 28.61, lon: 77.21 },
    { name: "Geneva Secretariat", lat: 46.2, lon: 6.14 },
    { name: "London Council", lat: 51.5, lon: -0.12 },
    { name: "Singapore Hub", lat: 1.35, lon: 103.8 },
    { name: "New York Chapter", lat: 40.71, lon: -74.0 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = 450);
    let height = (canvas.height = 450);
    const radius = 160;
    const center = { x: width / 2, y: height / 2 };

    const dots: NodePoint[] = [];
    const numLatitudes = 14;
    const numLongitudes = 14;

    // Generate grid dots on a sphere
    for (let i = 0; i < numLatitudes; i++) {
      const theta = (i * Math.PI) / (numLatitudes - 1);
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let j = 0; j < numLongitudes; j++) {
        const phi = (j * 2 * Math.PI) / numLongitudes;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        dots.push({
          x: radius * sinTheta * cosPhi,
          y: radius * cosTheta,
          z: radius * sinTheta * sinPhi,
        });
      }
    }

    // Convert city lat/lon to 3D Cartesian coordinates
    const cityNodes = cities.map((city) => {
      const radLat = (city.lat * Math.PI) / 180;
      const radLon = (city.lon * Math.PI) / 180;
      return {
        name: city.name,
        x: radius * Math.cos(radLat) * Math.sin(radLon),
        y: -radius * Math.sin(radLat), // Canvas Y goes down
        z: radius * Math.cos(radLat) * Math.cos(radLon),
      };
    });

    let angleX = 0.002; // slow constant rotation
    let angleY = 0.004;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const rotateX = (point: NodePoint, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y1 = point.y * cos - point.z * sin;
      const z1 = point.z * cos + point.y * sin;
      point.y = y1;
      point.z = z1;
    };

    const rotateY = (point: NodePoint, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = point.x * cos - point.z * sin;
      const z1 = point.z * cos + point.x * sin;
      point.x = x1;
      point.z = z1;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotate sphere points
      dots.forEach((dot) => {
        rotateX(dot, angleX);
        rotateY(dot, angleY);

        // Simple perspective projection
        const depth = 350;
        const scale = depth / (depth + dot.z);
        dot.px = center.x + dot.x * scale;
        dot.py = center.y + dot.y * scale;
        dot.alpha = (dot.z + radius) / (2 * radius); // front dots are brighter
      });

      // Rotate cities
      cityNodes.forEach((node) => {
        rotateX(node, angleX);
        rotateY(node, angleY);
      });

      // Sort points to draw background half first
      const sortedDots = [...dots].sort((a, b) => b.z - a.z);

      // Draw faint lines between consecutive dots along lat/long
      ctx.lineWidth = 0.5;
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        if (dot.z > -10 && dot.px && dot.py) { // Draw front half lines
          // Connect to next longitude dot
          const nextLongIndex = i + 1;
          if (nextLongIndex < dots.length && i % numLongitudes !== numLongitudes - 1) {
            const nextDot = dots[nextLongIndex];
            if (nextDot.px && nextDot.py) {
              const alpha = Math.min(dot.alpha || 0, nextDot.alpha || 0) * 0.08;
              ctx.strokeStyle = `rgba(200, 163, 74, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(dot.px, dot.py);
              ctx.lineTo(nextDot.px, nextDot.py);
              ctx.stroke();
            }
          }

          // Connect to next latitude dot
          const nextLatIndex = i + numLongitudes;
          if (nextLatIndex < dots.length) {
            const nextDot = dots[nextLatIndex];
            if (nextDot.px && nextDot.py) {
              const alpha = Math.min(dot.alpha || 0, nextDot.alpha || 0) * 0.08;
              ctx.strokeStyle = `rgba(200, 163, 74, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(dot.px, dot.py);
              ctx.lineTo(nextDot.px, nextDot.py);
              ctx.stroke();
            }
          }
        }
      }

      // Draw dots
      sortedDots.forEach((dot) => {
        if (dot.px && dot.py && dot.alpha) {
          ctx.beginPath();
          ctx.arc(dot.px, dot.py, Math.max(0.5, dot.alpha * 1.5), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 163, 74, ${(dot.alpha * 0.25).toFixed(2)})`;
          ctx.fill();
        }
      });

      // Draw Cities
      cityNodes.forEach((node) => {
        const depth = 350;
        const scale = depth / (depth + node.z);
        const px = center.x + node.x * scale;
        const py = center.y + node.y * scale;

        // Only draw if on the front face of the globe
        if (node.z < 10) {
          // Glow pulse
          const time = Date.now() * 0.003;
          const pulse = Math.sin(time) * 4 + 6;

          // Glowing outer circle
          ctx.beginPath();
          ctx.arc(px, py, pulse, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(200, 163, 74, 0.15)";
          ctx.fill();

          // Dot center
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = "#C8A34A";
          ctx.fill();
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 1;
          ctx.stroke();

          // Text Label
          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.font = "bold 9px sans-serif";
          ctx.textAlign = "left";
          ctx.fillText(node.name.split(" ")[0], px + 8, py + 3);
        }
      });

      // Auto rotation dampening if user drags, otherwise keep rotation alive
      if (!isDragging) {
        angleX *= 0.98;
        angleY *= 0.98;
        // Keep baseline rotation speed
        if (Math.abs(angleX) < 0.001) angleX = 0.001;
        if (Math.abs(angleY) < 0.002) angleY = 0.002;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        // Hover tracking for closest city to highlight
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        let closestCity = "Global Network";
        let minDist = 80;

        cityNodes.forEach((node) => {
          const depth = 350;
          const scale = depth / (depth + node.z);
          const px = center.x + node.x * scale;
          const py = center.y + node.y * scale;

          if (node.z < 0) {
            const dx = mouseX - px;
            const dy = mouseY - py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDist) {
              minDist = dist;
              closestCity = node.name;
            }
          }
        });
        setActiveCity(closestCity);
        return;
      }

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      angleY = deltaX * 0.003;
      angleX = -deltaY * 0.003;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 border border-[#C8A34A0D] rounded-2xl bg-[#030303]/40 backdrop-blur-md relative overflow-hidden group">
      {/* Background radial gold glow */}
      <div className="absolute w-72 h-72 rounded-full gold-glow-radial -z-10 opacity-60" />
      
      {/* Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="cursor-grab active:cursor-grabbing w-full max-w-[320px] aspect-square"
      />

      {/* Indicator overlay */}
      <div className="mt-4 flex flex-col items-center">
        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
          Active Node
        </span>
        <span className="font-serif text-[#C8A34A] text-sm font-semibold tracking-wide transition-all mt-1">
          {activeCity}
        </span>
      </div>
      
      <span className="absolute bottom-2 right-4 text-[9px] text-gray-600 tracking-wider">
        Drag to Orbit Globe
      </span>
    </div>
  );
}
