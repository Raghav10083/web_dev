"use client";

import React, { useRef, useEffect, useState } from "react";

interface Particle {
  x: number;
  y: number;
  origX: number;
  origY: number;
  targetX: number;
  targetY: number;
  size: number;
  alpha: number;
  color: string;
  speed: number;
  angle: number;
  id: number;
}

interface OwlCanvasProps {
  scrollProgress?: number;
}

export default function OwlCanvas({ scrollProgress = 0 }: OwlCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stage, setStage] = useState(0);
  const mousePos = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mousePos.current.x = e.clientX - rect.left;
      mousePos.current.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const timers = [
      setTimeout(() => setStage(1), 100),   // Stage 1: drift stars
      setTimeout(() => setStage(2), 1200),  // Stage 2: converge begins
      setTimeout(() => setStage(3), 2200),  // Stage 3: silhouette forms
      setTimeout(() => setStage(4), 3000),  // Stage 4: fully formed & eyes glow
      setTimeout(() => setStage(5), 4500),  // Stage 5: neural network spreads
    ];

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Particle[] = [];
    const numParticles = 1600;
    const centerX = width / 2;
    const centerY = height / 2 - 40;

    // Bezier curve sampler helper
    const getBezierPoints = (
      x1: number, y1: number,
      cpX: number, cpY: number,
      x2: number, y2: number,
      count: number
    ) => {
      const pts = [];
      for (let i = 0; i < count; i++) {
        const t = i / (count - 1 || 1);
        const mt = 1 - t;
        const x = mt * mt * x1 + 2 * mt * t * cpX + t * t * x2;
        const y = mt * mt * y1 + 2 * mt * t * cpY + t * t * y2;
        pts.push({ x, y });
      }
      return pts;
    };

    // Circle sampler helper
    const getCirclePoints = (cx: number, cy: number, r: number, count: number) => {
      const pts = [];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        pts.push({
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
        });
      }
      return pts;
    };

    // Exact Logo geometry definitions
    const whiteLeftEyebrow = [
      ...getBezierPoints(centerX - 5, centerY - 45, centerX - 30, centerY - 95, centerX - 70, centerY - 50, 45),
      ...getBezierPoints(centerX - 5, centerY - 45, centerX - 35, centerY - 70, centerX - 70, centerY - 50, 45),
    ];

    const goldRightEyebrow = [
      ...getBezierPoints(centerX + 5, centerY - 45, centerX + 30, centerY - 95, centerX + 70, centerY - 50, 45),
      ...getBezierPoints(centerX + 5, centerY - 45, centerX + 35, centerY - 70, centerX + 70, centerY - 50, 45),
    ];

    const leftEyeCircle = getCirclePoints(centerX - 35, centerY - 40, 14, 50);
    const leftEyePupil = getCirclePoints(centerX - 35, centerY - 40, 7, 30);
    
    const rightEyeCircle = getCirclePoints(centerX + 35, centerY - 40, 14, 50);
    const rightEyePupil = getCirclePoints(centerX + 35, centerY - 40, 7, 30);

    // Three swooshes matching chest stripes
    const stripe1White = [
      ...getBezierPoints(centerX - 68, centerY - 15, centerX - 30, centerY - 40, centerX + 40, centerY - 35, 55),
      ...getBezierPoints(centerX - 68, centerY - 15, centerX - 25, centerY + 10, centerX + 40, centerY - 10, 55),
    ];

    const stripe2Gold = [
      ...getBezierPoints(centerX - 60, centerY + 10, centerX - 10, centerY - 15, centerX + 42, centerY + 10, 55),
      ...getBezierPoints(centerX - 60, centerY + 10, centerX - 5, centerY + 38, centerX + 42, centerY + 30, 55),
    ];

    const stripe3White = [
      ...getBezierPoints(centerX - 48, centerY + 35, centerX + 15, centerY + 10, centerX + 44, centerY + 50, 55),
      ...getBezierPoints(centerX - 48, centerY + 35, centerX + 10, centerY + 90, centerX + 44, centerY + 50, 55),
      ...getBezierPoints(centerX - 10, centerY + 105, centerX + 10, centerY + 80, centerX + 44, centerY + 50, 40),
    ];

    const totalShapePoints = [
      ...whiteLeftEyebrow.map(pt => ({ ...pt, color: "#FFFFFF" })),
      ...goldRightEyebrow.map(pt => ({ ...pt, color: "#C8A34A" })),
      ...leftEyeCircle.map(pt => ({ ...pt, color: "#FFFFFF" })),
      ...leftEyePupil.map(pt => ({ ...pt, color: "#FFFFFF" })),
      ...rightEyeCircle.map(pt => ({ ...pt, color: "#C8A34A" })),
      ...rightEyePupil.map(pt => ({ ...pt, color: "#C8A34A" })),
      ...stripe1White.map(pt => ({ ...pt, color: "#FFFFFF" })),
      ...stripe2Gold.map(pt => ({ ...pt, color: "#C8A34A" })),
      ...stripe3White.map(pt => ({ ...pt, color: "#FFFFFF" })),
    ];

    // Initialize particles mapping to exact logo coordinates
    for (let i = 0; i < numParticles; i++) {
      const origX = Math.random() * width;
      const origY = Math.random() * height;

      let targetX = centerX;
      let targetY = centerY;
      let pColor = "#FFFFFF";

      if (i < totalShapePoints.length) {
        targetX = totalShapePoints[i].x;
        targetY = totalShapePoints[i].y;
        pColor = totalShapePoints[i].color;
      } else {
        // Filler within the stripes
        const randS = Math.random();
        if (randS < 0.4) {
          // Filler Stripe 1
          const pt = stripe1White[Math.floor(Math.random() * stripe1White.length)];
          targetX = pt.x + (Math.random() - 0.5) * 5;
          targetY = pt.y + (Math.random() - 0.5) * 5;
          pColor = "#FFFFFF";
        } else if (randS < 0.7) {
          // Filler Stripe 2
          const pt = stripe2Gold[Math.floor(Math.random() * stripe2Gold.length)];
          targetX = pt.x + (Math.random() - 0.5) * 5;
          targetY = pt.y + (Math.random() - 0.5) * 5;
          pColor = "#C8A34A";
        } else {
          // Filler Stripe 3
          const pt = stripe3White[Math.floor(Math.random() * stripe3White.length)];
          targetX = pt.x + (Math.random() - 0.5) * 5;
          targetY = pt.y + (Math.random() - 0.5) * 5;
          pColor = "#FFFFFF";
        }
      }

      particles.push({
        x: origX,
        y: origY,
        origX,
        origY,
        targetX,
        targetY,
        size: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.45 + 0.35,
        color: pColor,
        speed: Math.random() * 0.035 + 0.015,
        angle: Math.random() * Math.PI * 2,
        id: i,
      });
    }

    const neuralNodes = [
      { x: centerX - 270, y: centerY - 80, cx: centerX, cy: centerY },
      { x: centerX - 320, y: centerY + 90, cx: centerX, cy: centerY },
      { x: centerX + 270, y: centerY - 90, cx: centerX, cy: centerY },
      { x: centerX + 330, y: centerY + 80, cx: centerX, cy: centerY },
    ];

    let time = 0;

    const animate = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const dx = (mousePos.current.x - width / 2) * 0.03;
      const dy = (mousePos.current.y - height / 2) * 0.03;
      mousePos.current.rx += (dx - mousePos.current.rx) * 0.08;
      mousePos.current.ry += (dy - mousePos.current.ry) * 0.08;

      // Golden ambient vignette
      const vignette = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, width / 2);
      vignette.addColorStop(0, "rgba(200, 163, 74, 0.035)");
      vignette.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Faint mapping globe line background
      if (stage >= 1) {
        ctx.strokeStyle = "rgba(200, 163, 74, 0.015)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(centerX + mousePos.current.rx * 0.2, centerY + mousePos.current.ry * 0.2, 190, 0, Math.PI * 2);
        ctx.stroke();
      }

      particles.forEach((p, idx) => {
        let tx = p.targetX;
        let ty = p.targetY;

        if (stage === 1) {
          p.x += Math.cos(p.angle + time * 0.1) * 0.4;
          p.y += Math.sin(p.angle + time * 0.1) * 0.4;
        } else {
          let progressFactor = 1;
          if (stage === 2) progressFactor = 0.35; // loose
          if (stage === 3) progressFactor = 0.78; // silhouette

          const breatheY = Math.sin(time * 1.5 + idx * 0.02) * 0.8;

          // Head tilt timed looking effect
          let headX = 0;
          const cycle = Math.floor(time / 12) % 2;
          if (cycle === 0 && ty < centerY - 30) {
            headX = Math.sin(time * 0.4) * 3;
          }

          // Scroll dissolution
          if (scrollProgress > 0) {
            ty += scrollProgress * 550;
            tx += (Math.sin(time + idx) * 120 * scrollProgress);
            p.alpha = Math.max(0, p.alpha - scrollProgress * 0.01);
          }

          p.x += (tx + headX + dx + (Math.cos(p.angle) * 1.5 * (1 - progressFactor)) - p.x) * p.speed * progressFactor;
          p.y += (ty + breatheY + dy - p.y) * p.speed * progressFactor;
        }

        const mx = mousePos.current.x;
        const my = mousePos.current.y;
        const dist = Math.hypot(p.x - mx, p.y - my);
        if (dist < 80) {
          const force = (80 - dist) / 80;
          const angle = Math.atan2(p.y - my, p.x - mx);
          p.x += Math.cos(angle) * force * 12;
          p.y += Math.sin(angle) * force * 12;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (1 - scrollProgress);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Eyes glow (Stage 4+)
      if (stage >= 4) {
        const eyePulse = 0.65 + Math.sin(time * 3) * 0.15;
        ctx.shadowColor = "#C8A34A";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "rgba(200, 163, 74, " + eyePulse + ")";
        ctx.globalAlpha = (1 - scrollProgress);

        // left pupil glow
        ctx.beginPath();
        ctx.arc(centerX - 35 + mousePos.current.rx * 0.7, centerY - 40 + mousePos.current.ry * 0.7, 3, 0, Math.PI * 2);
        ctx.fill();

        // right pupil glow
        ctx.beginPath();
        ctx.arc(centerX + 35 + mousePos.current.rx * 0.7, centerY - 40 + mousePos.current.ry * 0.7, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
      }

      // Spreading network lines (Stage 5+)
      if (stage >= 5) {
        neuralNodes.forEach((node) => {
          node.cx += (node.x + mousePos.current.rx * 0.4 - node.cx) * 0.05;
          node.cy += (node.y + mousePos.current.ry * 0.4 - node.cy) * 0.05;

          ctx.strokeStyle = "rgba(200, 163, 74, 0.1)";
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(centerX + mousePos.current.rx * 0.7, centerY - 10 + mousePos.current.ry * 0.7);
          ctx.lineTo(node.cx, node.cy);
          ctx.stroke();

          ctx.fillStyle = "#C8A34A";
          ctx.globalAlpha = (0.5 + Math.sin(time * 3) * 0.2) * (1 - scrollProgress);
          ctx.beginPath();
          ctx.arc(node.cx, node.cy, 3, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [stage, scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-default transition-opacity duration-500"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
