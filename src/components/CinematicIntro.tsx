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

interface DissolveParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  life: number;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeline, setTimeline] = useState(0); // 0: Darkness/Dust, 1: Drawing Owl, 2: Glowing still, 3: Dissolve, 4: Text reveal, 5: Done
  const dissolveParticles = useRef<DissolveParticle[]>([]);

  useEffect(() => {
    // Exact 4.5s luxury timeline:
    // 0s - 1.0s: black screen, subtle drifting dust
    // 1.0s - 2.5s: golden light stroke draws owl
    // 2.5s - 3.7s: owl still, eyes illuminate
    // 3.7s - 4.5s: owl dissolves into fine golden dust + WOBT text fades in
    // 4.5s+: intro completes, homepage fades in
    const timers = [
      setTimeout(() => setTimeline(1), 1000),
      setTimeout(() => setTimeline(2), 2500),
      setTimeout(() => {
        setTimeline(3);
        // Spawn dissolve particles at WOBT owl logo coordinates
        const width = window.innerWidth;
        const height = window.innerHeight;
        const cx = width / 2;
        const cy = height / 2 - 30;
        
        // Sample points on the logo to spawn dissolving golden dust
        for (let i = 0; i < 350; i++) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * 45;
          dissolveParticles.current.push({
            x: cx + Math.cos(angle) * r + (Math.random() - 0.5) * 40,
            y: cy + Math.sin(angle) * r - 10 + (Math.random() - 0.5) * 50,
            vx: (Math.random() - 0.5) * 4,
            vy: -Math.random() * 5 - 1, // flow upward
            alpha: Math.random() * 0.8 + 0.2,
            size: Math.random() * 1.5 + 0.5,
            life: 1.0,
          });
        }
      }, 3700),
      setTimeout(() => setTimeline(4), 4100),
      setTimeout(() => onComplete(), 5000),
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
    const numDust = 75;

    // Slower, subtle floating background dust
    for (let i = 0; i < numDust; i++) {
      ambientDust.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -Math.random() * 0.1 - 0.02,
        alpha: Math.random() * 0.4 + 0.05,
        size: Math.random() * 1.0 + 0.3,
        color: Math.random() > 0.4 ? "#C8A34A" : "#FFFFFF",
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

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

      // Render dissolving fine golden dust (starts at timeline 3)
      if (timeline >= 3 && dissolveParticles.current.length > 0) {
        dissolveParticles.current.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.02; // gravity drift upward
          p.life -= 0.022; // fade out life
          p.alpha = Math.max(0, p.life);

          ctx.fillStyle = "#C8A34A";
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

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
  }, [timeline]);

  return (
    <div className="fixed inset-0 w-screen h-screen z-[100] bg-[#020202] overflow-hidden select-none flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Symmetrical Geometric Outline Owl Reveal (using SVG for razor-sharp silhouette) */}
      <AnimatePresence>
        {(timeline === 1 || timeline === 2) && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="z-10 flex items-center justify-center relative w-48 h-48"
          >
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full text-[#C8A34A] stroke-current fill-none"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Symmetrical eyebrows / ears */}
              <motion.path
                d="M100,55 L70,25 L55,60 L100,60"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.path
                d="M100,55 L130,25 L145,60 L100,60"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              {/* Eyes */}
              <motion.circle
                cx="75"
                cy="70"
                r="10"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 1.2, ease: "easeInOut" }}
              />
              <motion.circle
                cx="125"
                cy="70"
                r="10"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 1.2, ease: "easeInOut" }}
              />

              {/* Symmetrical chest stripes / swooshes */}
              <motion.path
                d="M50,92 C70,82 130,82 150,92"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 1.0, ease: "easeInOut" }}
              />
              <motion.path
                d="M50,92 C70,102 130,102 150,92"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 1.0, ease: "easeInOut" }}
              />

              <motion.path
                d="M56,112 C75,102 125,102 144,112"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.7, duration: 0.8, ease: "easeInOut" }}
              />
              <motion.path
                d="M56,112 C75,122 125,122 144,112"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.7, duration: 0.8, ease: "easeInOut" }}
              />

              <motion.path
                d="M62,132 C75,125 125,125 138,132"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.9, duration: 0.6, ease: "easeInOut" }}
              />
              <motion.path
                d="M62,132 L100,165 L138,132"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.9, duration: 0.6, ease: "easeInOut" }}
              />

              {/* Glowing Symmetrical Eyes (illuminating during timeline 2) */}
              <motion.circle
                cx="75"
                cy="70"
                r="3"
                className="fill-[#C8A34A]"
                initial={{ opacity: 0 }}
                animate={{ opacity: timeline === 2 ? [0, 0.9, 0.75, 0.9] : 0 }}
                transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
              />
              <motion.circle
                cx="125"
                cy="70"
                r="3"
                className="fill-[#C8A34A]"
                initial={{ opacity: 0 }}
                animate={{ opacity: timeline === 2 ? [0, 0.9, 0.75, 0.9] : 0 }}
                transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand Text Overlays (timeline 4) */}
      <AnimatePresence>
        {timeline >= 4 && (
          <div className="z-10 flex flex-col items-center text-center max-w-4xl px-6 pointer-events-none mt-10">
            {/* WOBT Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-[0.2em] leading-tight mb-4"
            >
              WHITE OWLS &amp;<br />
              <span className="text-[#C8A34A]">BLACK TIGERS</span>
            </motion.h1>

            {/* Motto 1 */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-300 text-xs sm:text-base font-medium tracking-widest max-w-2xl"
            >
              Where Wisdom Meets Courage.
            </motion.p>
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
