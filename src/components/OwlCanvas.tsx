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
}

export default function OwlCanvas() {
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

    // Timeline stages
    const timers = [
      setTimeout(() => setStage(1), 1000),  // Stage 1: starfield floats
      setTimeout(() => setStage(2), 2500),  // Stage 2: converge to Owl
      setTimeout(() => setStage(3), 5500),  // Stage 3: eyes illuminate
      setTimeout(() => setStage(4), 7000),  // Stage 4: wing spread
      setTimeout(() => setStage(5), 9000),  // Stage 5: grow neural paths
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
    const numParticles = 1400;
    const centerX = width / 2;
    const centerY = height / 2 - 20;

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

    // Define the owl shape coordinates
    const owlShapes = [
      // Head
      ...getLinePoints(centerX - 35, centerY - 90, centerX + 35, centerY - 90, 40), // head top
      ...getLinePoints(centerX - 35, centerY - 90, centerX - 45, centerY - 60, 30), // left ear
      ...getLinePoints(centerX + 35, centerY - 90, centerX + 45, centerY - 60, 30), // right ear
      ...getLinePoints(centerX - 45, centerY - 60, centerX - 30, centerY - 40, 20), // left face
      ...getLinePoints(centerX + 45, centerY - 60, centerX + 30, centerY - 40, 20), // right face
      ...getLinePoints(centerX - 30, centerY - 40, centerX + 30, centerY - 40, 30), // neck line

      // Torso
      ...getLinePoints(centerX - 30, centerY - 40, centerX - 35, centerY + 70, 70), // left body
      ...getLinePoints(centerX + 30, centerY - 40, centerX + 35, centerY + 70, 70), // right body
      ...getLinePoints(centerX - 35, centerY + 70, centerX, centerY + 100, 40),     // bottom tail left
      ...getLinePoints(centerX + 35, centerY + 70, centerX, centerY + 100, 40),     // bottom tail right

      // Left Wing base
      ...getLinePoints(centerX - 30, centerY - 40, centerX - 140, centerY - 10, 80), // left wing top curve
      ...getLinePoints(centerX - 140, centerY - 10, centerX - 35, centerY + 70, 85), // left wing outer curve

      // Right Wing base
      ...getLinePoints(centerX + 30, centerY - 40, centerX + 140, centerY - 10, 80), // right wing top curve
      ...getLinePoints(centerX + 140, centerY - 10, centerX + 35, centerY + 70, 85), // right wing outer curve
    ];

    // Generate remaining particles as inner filler / feathers
    for (let i = 0; i < numParticles; i++) {
      const origX = Math.random() * width;
      const origY = Math.random() * height;

      let targetX = centerX;
      let targetY = centerY;

      if (i < owlShapes.length) {
        // Map exactly to outlines
        targetX = owlShapes[i].x;
        targetY = owlShapes[i].y;
      } else {
        // Map to chest feathers / filler points
        const randTorsoT = Math.random();
        targetX = centerX + (Math.random() - 0.5) * 55 * (1 - randTorsoT * 0.4);
        targetY = centerY - 30 + randTorsoT * 115;
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
        color: Math.random() > 0.15 ? "#FFFFFF" : "#C8A34A",
        speed: Math.random() * 0.03 + 0.015,
        angle: Math.random() * Math.PI * 2,
      });
    }

    // Neural connections target points
    const neuralNodes = [
      { x: centerX - 260, y: centerY - 80, active: false, currentX: centerX, currentY: centerY },
      { x: centerX - 310, y: centerY + 90, active: false, currentX: centerX, currentY: centerY },
      { x: centerX + 260, y: centerY - 90, active: false, currentX: centerX, currentY: centerY },
      { x: centerX + 320, y: centerY + 80, active: false, currentX: centerX, currentY: centerY },
      { x: centerX - 180, y: centerY - 160, active: false, currentX: centerX, currentY: centerY },
      { x: centerX + 180, y: centerY - 170, active: false, currentX: centerX, currentY: centerY },
    ];

    let wingOffset = 0;
    let wingDir = 1;
    let time = 0;

    const animate = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Mouse Parallax Offset
      const dx = (mousePos.current.x - width / 2) * 0.05;
      const dy = (mousePos.current.y - height / 2) * 0.05;
      mousePos.current.rx += (dx - mousePos.current.rx) * 0.1;
      mousePos.current.ry += (dy - mousePos.current.ry) * 0.1;

      // 1. Draw faint background global nodes and grid
      ctx.strokeStyle = "rgba(200, 163, 74, 0.03)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(centerX + mousePos.current.rx * 0.3, centerY + mousePos.current.ry * 0.3, 170, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Animate and draw particles
      particles.forEach((p, idx) => {
        let tx = p.targetX;
        let ty = p.targetY;

        // Stage 4: wing spread offset modifier
        if (stage >= 4) {
          // Identify if particle is part of wings (based on its coordinate offsets)
          if (tx < centerX - 40) {
            // Left wing moves outwards
            tx -= wingOffset * (centerX - 40 - tx) * 0.6;
          } else if (tx > centerX + 40) {
            // Right wing moves outwards
            tx += wingOffset * (tx - centerX - 40) * 0.6;
          }
        }

        // Apply mouse pointer repulsion
        const mx = mousePos.current.x;
        const my = mousePos.current.y;
        const distToMouse = Math.hypot(p.x - mx, p.y - my);
        let repX = 0;
        let repY = 0;
        if (distToMouse < 90) {
          const force = (90 - distToMouse) / 90;
          const angle = Math.atan2(p.y - my, p.x - mx);
          repX = Math.cos(angle) * force * 15;
          repY = Math.sin(angle) * force * 15;
        }

        // Micro breathing motion
        const breathe = Math.sin(time + idx * 0.05) * 1.2;

        // Handle convergence stage interpolations
        if (stage >= 2) {
          p.x += (tx + repX + dx * 0.8 - p.x) * p.speed;
          p.y += (ty + repY + dy * 0.8 + breathe - p.y) * p.speed;
        } else {
          // Stage 1: random drift floating
          p.x += Math.cos(p.angle) * 0.2;
          p.y += Math.sin(p.angle) * 0.2;
        }

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Eyes Glow Animation (Stage 3+)
      if (stage >= 3) {
        const eyeGlow = 0.5 + Math.sin(time * 3) * 0.15; // gentle shimmer
        ctx.shadowColor = "#C8A34A";
        ctx.shadowBlur = 12;

        // Left eye
        ctx.fillStyle = "rgba(200, 163, 74, " + eyeGlow + ")";
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(centerX - 16 + mousePos.current.rx * 0.8, centerY - 65 + mousePos.current.ry * 0.8, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Right eye
        ctx.beginPath();
        ctx.arc(centerX + 16 + mousePos.current.rx * 0.8, centerY - 65 + mousePos.current.ry * 0.8, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;
      }

      // 4. Neural Network grow paths (Stage 5+)
      if (stage >= 5) {
        neuralNodes.forEach((node) => {
          // grow coordinates from center outward
          node.currentX += (node.x + mousePos.current.rx * 0.5 - node.currentX) * 0.06;
          node.currentY += (node.y + mousePos.current.ry * 0.5 - node.currentY) * 0.06;

          // Draw connection path
          ctx.strokeStyle = "rgba(200, 163, 74, 0.15)";
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(centerX + mousePos.current.rx * 0.8, centerY - 50 + mousePos.current.ry * 0.8);
          ctx.lineTo(node.currentX, node.currentY);
          ctx.stroke();

          // Pulse target nodes
          ctx.fillStyle = "#C8A34A";
          ctx.globalAlpha = 0.6 + Math.sin(time * 4) * 0.3;
          ctx.beginPath();
          ctx.arc(node.currentX, node.currentY, 3.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Handle graceful wing spread timing limits
      if (stage >= 4) {
        if (wingDir === 1) {
          wingOffset += 0.006;
          if (wingOffset >= 0.45) wingDir = -1; // stop and return
        } else {
          wingOffset -= 0.003;
          if (wingOffset <= 0.08) {
            // rest wings at a very micro-breathing level
            wingOffset = 0.08 + Math.sin(time * 0.8) * 0.015;
          }
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
  }, [stage]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-default transition-opacity duration-[1.5s]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
