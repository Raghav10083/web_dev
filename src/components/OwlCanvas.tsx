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
  scrollProgress?: number; // 0 to 1 based on hero scroll out
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

    // Timestamps based on specifications:
    // 0s - 1.5s: particles drift, world map visible, faint neural lines
    // 1.5s - 3s: particles converge (three phases)
    // 3s - 5s: owl visible, eyes illuminate, glow spreads, lines expand
    // 5s - 7s: text and CTAs fade in
    const timers = [
      setTimeout(() => setStage(1), 100),   // Stage 1: Nearly black background, golden particles drift
      setTimeout(() => setStage(2), 1500),  // Stage 2: Convergence begins (Loose particles)
      setTimeout(() => setStage(3), 2200),  // Stage 3: Convergence (Recognizable silhouette)
      setTimeout(() => setStage(4), 3000),  // Stage 4: Fully refined owl & eyes illuminate
      setTimeout(() => setStage(5), 4000),  // Stage 5: Neural lines expand
      setTimeout(() => setStage(6), 5000),  // Stage 6: Text & CTAs fade in
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
    const centerY = height / 2 - 30;

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

    // Construct owl coordinate mesh
    const owlShapes = [
      // Head Top & Ears
      ...getLinePoints(centerX - 40, centerY - 100, centerX + 40, centerY - 100, 30),
      ...getLinePoints(centerX - 40, centerY - 100, centerX - 55, centerY - 70, 25),
      ...getLinePoints(centerX + 40, centerY - 100, centerX + 55, centerY - 70, 25),
      ...getLinePoints(centerX - 55, centerY - 70, centerX - 40, centerY - 45, 20),
      ...getLinePoints(centerX + 55, centerY - 70, centerX + 40, centerY - 45, 20),
      ...getLinePoints(centerX - 40, centerY - 45, centerX + 40, centerY - 45, 30),

      // Torso Outline
      ...getLinePoints(centerX - 35, centerY - 45, centerX - 40, centerY + 80, 80),
      ...getLinePoints(centerX + 35, centerY - 45, centerX + 40, centerY + 80, 80),
      ...getLinePoints(centerX - 40, centerY + 80, centerX, centerY + 115, 40),
      ...getLinePoints(centerX + 40, centerY + 80, centerX, centerY + 115, 40),

      // Left Wing outline
      ...getLinePoints(centerX - 40, centerY - 45, centerX - 160, centerY - 10, 90),
      ...getLinePoints(centerX - 160, centerY - 10, centerX - 40, centerY + 80, 90),

      // Right Wing outline
      ...getLinePoints(centerX + 40, centerY - 45, centerX + 160, centerY - 10, 90),
      ...getLinePoints(centerX + 160, centerY - 10, centerX + 40, centerY + 80, 90),
    ];

    // Initialize particles (some gold, mostly white/soft gold highlights)
    for (let i = 0; i < numParticles; i++) {
      const origX = Math.random() * width;
      const origY = Math.random() * height;

      let targetX = centerX;
      let targetY = centerY;

      if (i < owlShapes.length) {
        targetX = owlShapes[i].x;
        targetY = owlShapes[i].y;
      } else {
        // Inner chest feathers / volumetric filler
        const t = Math.random();
        targetX = centerX + (Math.random() - 0.5) * 60 * (1 - t * 0.4);
        targetY = centerY - 35 + t * 120;
      }

      particles.push({
        x: origX,
        y: origY,
        origX,
        origY,
        targetX,
        targetY,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.3,
        color: Math.random() > 0.2 ? "#FFFFFF" : "#C8A34A",
        speed: Math.random() * 0.03 + 0.015,
        angle: Math.random() * Math.PI * 2,
        id: i,
      });
    }

    // Spreading global neural targets
    const neuralPaths = [
      { x: centerX - 280, y: centerY - 90, active: false, cx: centerX, cy: centerY },
      { x: centerX - 330, y: centerY + 100, active: false, cx: centerX, cy: centerY },
      { x: centerX + 280, y: centerY - 100, active: false, cx: centerX, cy: centerY },
      { x: centerX + 340, y: centerY + 90, active: false, cx: centerX, cy: centerY },
      { x: centerX - 200, y: centerY - 180, active: false, cx: centerX, cy: centerY },
    ];

    let time = 0;

    const animate = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Mouse Parallax
      const dx = (mousePos.current.x - width / 2) * 0.03;
      const dy = (mousePos.current.y - height / 2) * 0.03;
      mousePos.current.rx += (dx - mousePos.current.rx) * 0.08;
      mousePos.current.ry += (dy - mousePos.current.ry) * 0.08;

      // Volumetric lighting / Vignette background glow
      const vignette = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, width / 2);
      vignette.addColorStop(0, "rgba(200, 163, 74, 0.03)");
      vignette.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Faint backing world map grid
      if (stage >= 1) {
        ctx.strokeStyle = "rgba(200, 163, 74, 0.015)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(centerX + mousePos.current.rx * 0.2, centerY + mousePos.current.ry * 0.2, 180, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw and transform particles
      particles.forEach((p, idx) => {
        let tx = p.targetX;
        let ty = p.targetY;

        // Slow orbits/constellations backing for loose drift particles
        if (stage === 1) {
          p.x += Math.cos(p.angle + time * 0.1) * 0.4;
          p.y += Math.sin(p.angle + time * 0.1) * 0.4;
        } else {
          // Stage 2: Convergence
          let progressFactor = 1;
          if (stage === 2) progressFactor = 0.3; // loose particles
          if (stage === 3) progressFactor = 0.75; // recognizable silhouette

          // Micro breathing idle animation
          const breatheY = Math.sin(time * 1.5 + idx * 0.02) * 1.0;

          // Timer-based head rotation (every 12 seconds)
          let headX = 0;
          const cycle = Math.floor(time / 12) % 2;
          if (cycle === 0 && ty < centerY - 45) {
            headX = Math.sin(time * 0.5) * 3.5; // slow look
          }

          // Scroll dissolution: pull down and randomize
          if (scrollProgress > 0) {
            ty += scrollProgress * 550;
            tx += (Math.sin(time + idx) * 120 * scrollProgress);
            p.alpha = Math.max(0, p.alpha - scrollProgress * 0.01);
          }

          // Move particles
          p.x += (tx + headX + dx + (Math.cos(p.angle) * 2 * (1 - progressFactor)) - p.x) * p.speed * progressFactor;
          p.y += (ty + breatheY + dy - p.y) * p.speed * progressFactor;
        }

        // Mouse interaction: push particles
        const mx = mousePos.current.x;
        const my = mousePos.current.y;
        const dist = Math.hypot(p.x - mx, p.y - my);
        if (dist < 80) {
          const pushForce = (80 - dist) / 80;
          const pushAngle = Math.atan2(p.y - my, p.x - mx);
          p.x += Math.cos(pushAngle) * pushForce * 12;
          p.y += Math.sin(pushAngle) * pushForce * 12;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (1 - scrollProgress);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Eye Glow Shimmer (Stage 4+)
      if (stage >= 4) {
        const eyePulse = 0.65 + Math.sin(time * 3) * 0.15; // slow shimmer
        ctx.shadowColor = "#C8A34A";
        ctx.shadowBlur = 10;

        ctx.fillStyle = "rgba(200, 163, 74, " + eyePulse + ")";
        ctx.globalAlpha = (1 - scrollProgress);

        // Left eye
        ctx.beginPath();
        ctx.arc(centerX - 18 + mousePos.current.rx * 0.7, centerY - 65 + mousePos.current.ry * 0.7, 3, 0, Math.PI * 2);
        ctx.fill();

        // Right eye
        ctx.beginPath();
        ctx.arc(centerX + 18 + mousePos.current.rx * 0.7, centerY - 65 + mousePos.current.ry * 0.7, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0; // reset
      }

      // 4. Growing neural lines spread (Stage 5+)
      if (stage >= 5) {
        neuralPaths.forEach((node) => {
          node.cx += (node.x + mousePos.current.rx * 0.4 - node.cx) * 0.05;
          node.cy += (node.y + mousePos.current.ry * 0.4 - node.cy) * 0.05;

          ctx.strokeStyle = "rgba(200, 163, 74, 0.12)";
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(centerX + mousePos.current.rx * 0.7, centerY - 50 + mousePos.current.ry * 0.7);
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
