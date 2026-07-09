"use client";

import React, { useRef, useEffect, useState } from "react";

interface Particle {
  x: number;
  y: number;
  origX: number;
  origY: number;
  targetX1: number; // Owl shape
  targetY1: number;
  targetX2: number; // WOBT text shape
  targetY2: number;
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
      setTimeout(() => setStage(4), 3000),  // Stage 4: fully formed owl logo
      setTimeout(() => setStage(5), 5500),  // Stage 5: morph into WOBT text
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

    // Helper: sample points on a line
    const getLinePoints = (x1: number, y1: number, x2: number, y2: number, count: number) => {
      const pts = [];
      for (let i = 0; i < count; i++) {
        const t = i / (count - 1 || 1);
        pts.push({
          x: x1 + (x2 - x1) * t,
          y: y1 + (y2 - y1) * t,
        });
      }
      return pts;
    };

    // --- TARGET 1: THE OWL LOGO ---
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

    // --- TARGET 2: THE "W O B T" TEXT GEOMETRY ---
    const textY = centerY + 10;
    
    // W (centered at centerX - 120)
    const wX = centerX - 120;
    const wPoints = [
      ...getLinePoints(wX - 25, textY - 35, wX - 12, textY + 35, 25),
      ...getLinePoints(wX - 12, textY + 35, wX, textY - 10, 20),
      ...getLinePoints(wX, textY - 10, wX + 12, textY + 35, 20),
      ...getLinePoints(wX + 12, textY + 35, wX + 25, textY - 35, 25),
    ];

    // O (centered at centerX - 40)
    const oX = centerX - 40;
    const oPoints = getCirclePoints(oX, textY, 32, 90);

    // B (centered at centerX + 40)
    const bX = centerX + 40;
    const bPoints = [
      ...getLinePoints(bX - 20, textY - 35, bX - 20, textY + 35, 35), // stem
      ...getBezierPoints(bX - 20, textY - 35, bX + 20, textY - 35, bX + 20, textY - 2, 25),
      ...getBezierPoints(bX + 20, textY - 2, bX - 20, textY - 2, bX - 20, textY - 2, 25),
      ...getBezierPoints(bX - 20, textY - 2, bX + 24, textY - 2, bX + 24, textY + 35, 25),
      ...getBezierPoints(bX + 24, textY + 35, bX - 20, textY + 35, bX - 20, textY + 35, 25),
    ];

    // T (centered at centerX + 120)
    const tX = centerX + 120;
    const tPoints = [
      ...getLinePoints(tX - 25, textY - 35, tX + 25, textY - 35, 30), // top bar
      ...getLinePoints(tX, textY - 35, tX, textY + 35, 35),          // stem
    ];

    const totalTextPoints = [...wPoints, ...oPoints, ...bPoints, ...tPoints];

    // Initialize particles mapping target 1 (owl) to target 2 (text)
    for (let i = 0; i < numParticles; i++) {
      const origX = Math.random() * width;
      const origY = Math.random() * height;

      // Setup Owl targets
      let targetX1 = centerX;
      let targetY1 = centerY;
      let pColor = "#FFFFFF";

      if (i < totalShapePoints.length) {
        targetX1 = totalShapePoints[i].x;
        targetY1 = totalShapePoints[i].y;
        pColor = totalShapePoints[i].color;
      } else {
        const randS = Math.random();
        if (randS < 0.4) {
          const pt = stripe1White[Math.floor(Math.random() * stripe1White.length)];
          targetX1 = pt.x + (Math.random() - 0.5) * 5;
          targetY1 = pt.y + (Math.random() - 0.5) * 5;
          pColor = "#FFFFFF";
        } else if (randS < 0.7) {
          const pt = stripe2Gold[Math.floor(Math.random() * stripe2Gold.length)];
          targetX1 = pt.x + (Math.random() - 0.5) * 5;
          targetY1 = pt.y + (Math.random() - 0.5) * 5;
          pColor = "#C8A34A";
        } else {
          const pt = stripe3White[Math.floor(Math.random() * stripe3White.length)];
          targetX1 = pt.x + (Math.random() - 0.5) * 5;
          targetY1 = pt.y + (Math.random() - 0.5) * 5;
          pColor = "#FFFFFF";
        }
      }

      // Setup Text targets
      let targetX2 = centerX;
      let targetY2 = textY;

      if (i < totalTextPoints.length) {
        targetX2 = totalTextPoints[i].x;
        targetY2 = totalTextPoints[i].y;
      } else {
        // distribute remaining particles along the letter lines randomly
        const pt = totalTextPoints[Math.floor(Math.random() * totalTextPoints.length)];
        targetX2 = pt.x + (Math.random() - 0.5) * 4;
        targetY2 = pt.y + (Math.random() - 0.5) * 4;
      }

      particles.push({
        x: origX,
        y: origY,
        origX,
        origY,
        targetX1,
        targetY1,
        targetX2,
        targetY2,
        size: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.45 + 0.35,
        color: pColor,
        speed: Math.random() * 0.035 + 0.015,
        angle: Math.random() * Math.PI * 2,
        id: i,
      });
    }

    let time = 0;
    let morphStartTime = 0;

    const animate = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const dx = (mousePos.current.x - width / 2) * 0.03;
      const dy = (mousePos.current.y - height / 2) * 0.03;
      mousePos.current.rx += (dx - mousePos.current.rx) * 0.08;
      mousePos.current.ry += (dy - mousePos.current.ry) * 0.08;

      // Volumetric vignette glow
      const vignette = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, width / 2);
      vignette.addColorStop(0, "rgba(200, 163, 74, 0.035)");
      vignette.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Faint backing constellation sphere
      if (stage >= 1) {
        ctx.strokeStyle = "rgba(200, 163, 74, 0.012)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(centerX + mousePos.current.rx * 0.2, centerY + mousePos.current.ry * 0.2, 190, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Handle morph timing start log
      if (stage === 5 && morphStartTime === 0) {
        morphStartTime = time;
      }

      particles.forEach((p, idx) => {
        let tx = p.targetX1;
        let ty = p.targetY1;

        if (stage === 1) {
          p.x += Math.cos(p.angle + time * 0.1) * 0.4;
          p.y += Math.sin(p.angle + time * 0.1) * 0.4;
        } else {
          let progressFactor = 1;
          if (stage === 2) progressFactor = 0.35; // loose
          if (stage === 3) progressFactor = 0.78; // silhouette

          // Morph interpolation from owl shape to WOBT text
          if (stage >= 5 && morphStartTime > 0) {
            const morphProgress = Math.min(1, (time - morphStartTime) / 2.2); // morph over 2.2 seconds
            tx = p.targetX1 + (p.targetX2 - p.targetX1) * morphProgress;
            ty = p.targetY1 + (p.targetY2 - p.targetY1) * morphProgress;
          }

          const breatheY = Math.sin(time * 1.5 + idx * 0.02) * 0.7;

          // Head turn lookup (only during owl stage)
          let headX = 0;
          if (stage < 5) {
            const cycle = Math.floor(time / 12) % 2;
            if (cycle === 0 && ty < centerY - 30) {
              headX = Math.sin(time * 0.4) * 3;
            }
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
        if (dist < 85) {
          const force = (85 - dist) / 85;
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

      // Eyes glow (fade out as morph starts)
      if (stage >= 4) {
        let eyeAlpha = 1.0;
        if (stage >= 5 && morphStartTime > 0) {
          eyeAlpha = Math.max(0, 1 - (time - morphStartTime) / 0.8);
        }

        if (eyeAlpha > 0) {
          const eyePulse = 0.65 + Math.sin(time * 3) * 0.15;
          ctx.shadowColor = "#C8A34A";
          ctx.shadowBlur = 10;
          ctx.fillStyle = "rgba(200, 163, 74, " + eyePulse * eyeAlpha + ")";
          ctx.globalAlpha = (1 - scrollProgress) * eyeAlpha;

          // left eye pupil
          ctx.beginPath();
          ctx.arc(centerX - 35 + mousePos.current.rx * 0.7, centerY - 40 + mousePos.current.ry * 0.7, 3, 0, Math.PI * 2);
          ctx.fill();

          // right eye pupil
          ctx.beginPath();
          ctx.arc(centerX + 35 + mousePos.current.rx * 0.7, centerY - 40 + mousePos.current.ry * 0.7, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.shadowBlur = 0;
        }
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
