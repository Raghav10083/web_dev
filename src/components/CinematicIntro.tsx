"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicIntroProps {
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeline, setTimeline] = useState(0); // 0: Darkness, 1: Drawing/Converging, 2: Fully formed, 3: Dissolving, 4: Text reveal, 5: Finish
  const [skipHovered, setSkipHovered] = useState(false);
  const audioPlayed = useRef(false);

  // Synthesize soft premium bell chime
  const playChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      // Low sub-bass swell
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(55, ctx.currentTime); // A1 note
      subOsc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 1.8);
      subGain.gain.setValueAtTime(0, ctx.currentTime);
      subGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.5);
      subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start();
      subOsc.stop(ctx.currentTime + 2.5);

      // Pure crystal chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.2);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 3.0);
    } catch (e) {
      // browser blocks autoplay if user hasn't clicked
    }
  };

  useEffect(() => {
    const handleInteraction = () => {
      if (!audioPlayed.current && timeline >= 2) {
        audioPlayed.current = true;
        playChime();
      }
    };
    window.addEventListener("click", handleInteraction);
    return () => window.removeEventListener("click", handleInteraction);
  }, [timeline]);

  // Timed state progression matching specifications:
  // Scene 1: 0 - 1.5s (Darkness, drifting sparks)
  // Scene 2: 1.5s - 3.5s (Light draws lines, particles converge)
  // Scene 3: 3.5s - 5.5s (Owl forms, eyes illuminate, wings expand)
  // Scene 4: 5.5s - 7.5s (Owl dissolves back to floating particles)
  // Scene 5: 7.5s - 11.0s (Company titles fade in)
  // Scene 6: 11.0s (Transition/Complete)
  useEffect(() => {
    const timers = [
      setTimeout(() => setTimeline(1), 1500),
      setTimeout(() => {
        setTimeline(2);
        if (!audioPlayed.current) {
          audioPlayed.current = true;
          playChime();
        }
      }, 3500),
      setTimeout(() => setTimeline(3), 5500),
      setTimeout(() => setTimeline(4), 7500),
      setTimeout(() => setTimeline(5), 11000),
      setTimeout(() => onComplete(), 11800),
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

    const particles: Particle[] = [];
    const numParticles = 400;
    const centerX = width / 2;
    const centerY = height / 2 - 30;

    // Initialize backing ambient stardust sparks
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.2 - 0.05,
        alpha: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.3 ? "#C8A34A" : "#FFFFFF",
        size: Math.random() * 1.2 + 0.4,
      });
    }

    let time = 0;

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

    // Vector curves defining the geometry of the Apple-style luxury WOBT owl logo
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

    const animate = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw drifting back sparks
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap particles
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

      // Ambient radial center glow (emerging in Scene 2)
      if (timeline >= 1) {
        const glowFactor = Math.min(1, (time - 1.5) / 2); // fade in over 2s
        const radGlow = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 150);
        radGlow.addColorStop(0, `rgba(200, 163, 74, ${0.08 * glowFactor})`);
        radGlow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = radGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Scene 2: Drawing shapes with light
      if (timeline === 1 || timeline === 2) {
        let drawPercent = Math.min(1, (time - 1.5) / 2.0); // complete drawing by 3.5s

        // Symmetrical wing expansion factor (Scene 3)
        let wingOffset = 0;
        if (timeline === 2) {
          wingOffset = Math.sin((time - 3.5) * 0.8) * 15; // slow open cloak
        }

        const drawSegment = (pts: { x: number; y: number }[], color: string, isWing = false) => {
          const count = Math.floor(pts.length * drawPercent);
          if (count < 2) return;
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          for (let i = 0; i < count; i++) {
            let ox = isWing ? (pts[i].x < centerX ? -wingOffset : wingOffset) : 0;
            if (i === 0) {
              ctx.moveTo(pts[i].x + ox, pts[i].y);
            } else {
              ctx.lineTo(pts[i].x + ox, pts[i].y);
            }
          }
          ctx.stroke();
        };

        // Draw eyebrows
        drawSegment(whiteLeftEyebrow, "#FFFFFF");
        drawSegment(goldRightEyebrow, "#C8A34A");

        // Draw eyes
        drawSegment(leftEyeCircle, "#FFFFFF");
        drawSegment(rightEyeCircle, "#C8A34A");

        // Draw chest stripes
        drawSegment(stripe1White, "#FFFFFF", true);
        drawSegment(stripe2Gold, "#C8A34A", true);
        drawSegment(stripe3White, "#FFFFFF", true);
      }

      // Scene 3: Eye illumination (timeline 2)
      if (timeline === 2) {
        const eyeAlpha = Math.min(1, (time - 3.5) * 1.5);
        ctx.shadowColor = "#C8A34A";
        ctx.shadowBlur = 12;
        ctx.fillStyle = "rgba(200, 163, 74, " + eyeAlpha * 0.85 + ")";
        ctx.globalAlpha = eyeAlpha;

        ctx.beginPath();
        ctx.arc(centerX - 35, centerY - 40, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(centerX + 35, centerY - 40, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0; // reset
        ctx.globalAlpha = 1;
      }

      // Scene 4: Dissolving particles
      if (timeline === 3) {
        const dissolveT = Math.min(1, (time - 5.5) / 2.0); // dissolve over 2s

        // Render dissolving particle mesh migrating outward and upward
        const drawDissolveSegment = (pts: { x: number; y: number }[], color: string) => {
          pts.forEach((pt, idx) => {
            const seed = idx * 0.13;
            // Particles move outward then upward
            const dx = Math.sin(seed + time) * 120 * dissolveT;
            const dy = -dissolveT * 300 - Math.cos(seed) * 50 * dissolveT;
            const alpha = Math.max(0, 0.7 - dissolveT);

            ctx.fillStyle = color;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(pt.x + dx, pt.y + dy, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
            ctx.fill();
          });
        };

        drawDissolveSegment(whiteLeftEyebrow, "#FFFFFF");
        drawDissolveSegment(goldRightEyebrow, "#C8A34A");
        drawDissolveSegment(leftEyeCircle, "#FFFFFF");
        drawDissolveSegment(rightEyeCircle, "#C8A34A");
        drawDissolveSegment(stripe1White, "#FFFFFF");
        drawDissolveSegment(stripe2Gold, "#C8A34A");
        drawDissolveSegment(stripe3White, "#FFFFFF");

        ctx.globalAlpha = 1;
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

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 w-screen h-screen z-[100] bg-[#020202] overflow-hidden select-none flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Brand Text Overlays (timeline 4) */}
      <AnimatePresence>
        {timeline === 4 && (
          <div className="z-10 flex flex-col items-center text-center max-w-4xl px-6 pointer-events-none mt-10">
            {/* WOBT Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-5xl md:text-7xl text-white font-extrabold tracking-[0.2em] leading-tight mb-6"
            >
              WHITE OWLS &amp;<br />
              <span className="text-[#C8A34A]">BLACK TIGERS</span>
            </motion.h1>

            {/* Motto 1 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 1.0, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-300 text-sm sm:text-lg md:text-xl font-medium tracking-widest max-w-2xl mb-8"
            >
              Where Wisdom Meets Courage.
            </motion.p>

            {/* Motto 2 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 2.2, duration: 1.5 }}
              className="text-[#C8A34A] font-serif tracking-[0.25em] text-[10px] sm:text-xs uppercase flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center items-center font-semibold"
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

      {/* Skip Button */}
      <div className="absolute bottom-10 right-10 z-[110]">
        <button
          onClick={handleSkip}
          onMouseEnter={() => setSkipHovered(true)}
          onMouseLeave={() => setSkipHovered(false)}
          className="px-6 py-2.5 rounded-full border border-gray-800 text-gray-400 hover:text-white hover:border-[#C8A34A] text-xs font-semibold uppercase tracking-widest bg-black/60 backdrop-blur-md transition-all duration-500 flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        >
          Skip Intro
          <motion.span
            animate={{ x: skipHovered ? 4 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            ➔
          </motion.span>
        </button>
      </div>
    </div>
  );
}
