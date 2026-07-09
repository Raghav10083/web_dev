"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicIntroProps {
  onComplete: () => void;
}

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeline, setTimeline] = useState(0); // 0: Darkness, 1: Text reveal, 2: Done

  useEffect(() => {
    // Elegant 4s typographic reveal timeline:
    // 0s - 1.0s: Infinite darkness (soft overhead lighting grows)
    // 1.0s - 3.8s: Text elements fade in sequentially
    // 3.8s+: Intro completes, homepage zooms/fades in
    const timers = [
      setTimeout(() => setTimeline(1), 1000),
      setTimeout(() => onComplete(), 4200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId: number;

    const ambientDust: DustParticle[] = [];
    const numDust = 60;

    // Slower, subtle floating background dust
    for (let i = 0; i < numDust; i++) {
      ambientDust.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.05,
        vy: -Math.random() * 0.08 - 0.02,
        alpha: Math.random() * 0.3 + 0.05,
        size: Math.random() * 0.8 + 0.3,
        color: Math.random() > 0.4 ? "#C8A34A" : "#FFFFFF",
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Background Darkness
      ctx.fillStyle = "#020202";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Soft overhead radial light glow
      const radGlow = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, width / 2);
      radGlow.addColorStop(0, "rgba(200, 163, 74, 0.03)");
      radGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = radGlow;
      ctx.fillRect(0, 0, width, height);

      // Render subtle backing dust
      ambientDust.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen z-[100] bg-[#020202] overflow-hidden select-none flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Brand Text Overlays */}
      <AnimatePresence>
        {timeline >= 1 && (
          <div className="z-10 flex flex-col items-center text-center max-w-4xl px-6 pointer-events-none">
            {/* WOBT Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-[0.2em] leading-tight mb-6"
            >
              WHITE OWLS &amp;<br />
              <span className="text-[#C8A34A]">BLACK TIGERS</span>
            </motion.h1>

            {/* Motto 1 */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-300 text-xs sm:text-base font-medium tracking-widest max-w-2xl mb-8"
            >
              Where Wisdom Meets Courage.
            </motion.p>

            {/* Symmetrical Mottos List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              transition={{ delay: 1.4, duration: 1.0 }}
              className="text-[#C8A34A] font-serif tracking-[0.2em] text-[9px] sm:text-xs uppercase flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center items-center font-semibold"
            >
              <span>Wisdom to Imagine</span>
              <span className="hidden sm:inline text-gray-700">•</span>
              <span>Courage to Execute</span>
              <span className="hidden sm:inline text-gray-700">•</span>
              <span>Excellence to Transform</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Accessibility Skip */}
      <div className="absolute bottom-8 right-8 z-[110]">
        <button
          onClick={onComplete}
          className="px-4 py-2 rounded-full border border-gray-900 text-gray-500 hover:text-white hover:border-[#C8A34A] text-[10px] font-semibold uppercase tracking-widest bg-black/45 backdrop-blur-sm transition-all duration-300 cursor-pointer"
        >
          Skip Intro
        </button>
      </div>
    </div>
  );
}
