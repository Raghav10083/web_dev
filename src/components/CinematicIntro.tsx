"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeline, setTimeline] = useState(0); // 0: Infinite darkness, 1: Hall of wisdom dolly, 2: Monument reveal, 3: Light awakens, 4: Morph & Brand reveal, 5: Done
  const audioPlayed = useRef(false);

  // Play soft premium swell chime (Web Audio API)
  const playChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      // Deep volumetric sub-bass swell
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(55, ctx.currentTime);
      subOsc.frequency.exponentialRampToValueAtTime(82.4, ctx.currentTime + 2.0); // A1 to E2 note
      subGain.gain.setValueAtTime(0, ctx.currentTime);
      subGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.8);
      subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start();
      subOsc.stop(ctx.currentTime + 2.5);

      // Symmetrical pure crystal chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5 note
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.5);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 3.2);
    } catch (e) {
      // browser blocks autoplay
    }
  };

  useEffect(() => {
    // 5.5s Precise Luxury Timeline:
    // 0s - 1.0s: Infinite darkness (soft overhead lighting grows)
    // 1.0s - 2.8s: Hall of Wisdom camera dolly (marble floor, engraved gold lines, receding pillars)
    // 2.8s - 3.8s: Monument reveal & slow camera orbit
    // 3.8s - 4.6s: Golden light awakens sculpture lines & morphs into flat logo
    // 4.6s - 5.5s: Text brand reveal & camera zoom-out completion
    const timers = [
      setTimeout(() => setTimeline(1), 1000),
      setTimeout(() => {
        setTimeline(2);
        if (!audioPlayed.current) {
          audioPlayed.current = true;
          playChime();
        }
      }, 2800),
      setTimeout(() => setTimeline(3), 3800),
      setTimeout(() => setTimeline(4), 4600),
      setTimeout(() => onComplete(), 5500),
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

    const centerX = width / 2;
    const centerY = height / 2;

    let time = 0;

    // Symmetrical but contrasting realistic Owl (Left) and Tiger (Right) geometry
    const drawMonumentGeometry = (c: CanvasRenderingContext2D, cx: number, cy: number, scale: number, glow: number) => {
      c.save();
      c.translate(cx, cy);
      c.scale(scale, scale);

      // Outer Shield / Emblem boundary
      c.strokeStyle = "rgba(255, 255, 255, 0.12)";
      c.lineWidth = 1.0;
      c.beginPath();
      c.moveTo(0, -95);
      c.lineTo(-65, -35);
      c.lineTo(-65, 30);
      c.lineTo(0, 95);
      c.lineTo(65, 30);
      c.lineTo(65, -35);
      c.closePath();
      c.stroke();

      // --- LEFT SIDE: MAJESTIC WHITE OWL FACE ---
      c.strokeStyle = "rgba(255, 255, 255, 0.85)";
      c.lineWidth = 1.8;
      
      // Owl eyebrow curving up
      c.beginPath();
      c.moveTo(-2, -35);
      c.quadraticCurveTo(-20, -75, -55, -45);
      c.quadraticCurveTo(-28, -55, -2, -35);
      c.stroke();

      // Owl Eye (Concentric circular rings)
      c.beginPath();
      c.arc(-26, -32, 9, 0, Math.PI * 2);
      c.stroke();
      c.beginPath();
      c.arc(-26, -32, 5, 0, Math.PI * 2);
      c.stroke();

      // Owl feather strokes on left cheek
      c.strokeStyle = "rgba(255, 255, 255, 0.5)";
      c.lineWidth = 1.0;
      c.beginPath();
      c.moveTo(-45, -20);
      c.quadraticCurveTo(-55, 5, -35, 25);
      c.moveTo(-35, -10);
      c.quadraticCurveTo(-45, 10, -25, 28);
      c.stroke();

      // Owl beak (curving down left of center)
      c.strokeStyle = "rgba(255, 255, 255, 0.85)";
      c.lineWidth = 1.6;
      c.beginPath();
      c.moveTo(0, -20);
      c.quadraticCurveTo(-8, -10, 0, 0);
      c.stroke();

      // --- RIGHT SIDE: POWERFUL TIGER FACE ---
      c.strokeStyle = "#C8A34A";
      c.lineWidth = 1.8;

      // Tiger eyebrow (sharp, angular)
      c.beginPath();
      c.moveTo(2, -35);
      c.lineTo(20, -60);
      c.lineTo(52, -42);
      c.lineTo(25, -46);
      c.closePath();
      c.stroke();

      // Tiger Eye (Almond shape)
      c.beginPath();
      c.moveTo(12, -32);
      c.quadraticCurveTo(26, -42, 40, -32);
      c.quadraticCurveTo(26, -22, 12, -32);
      c.stroke();

      // Tiger Stripes on right cheek
      c.fillStyle = "rgba(200, 163, 74, 0.6)";
      c.beginPath();
      // Stripe 1
      c.moveTo(35, -15); c.lineTo(55, -20); c.lineTo(48, -10); c.closePath();
      // Stripe 2
      c.moveTo(30, 5); c.lineTo(52, 2); c.lineTo(44, 12); c.closePath();
      // Stripe 3
      c.moveTo(25, 25); c.lineTo(45, 28); c.lineTo(38, 35); c.closePath();
      c.fill();

      // Tiger snarling muzzle/whisker outline
      c.beginPath();
      c.moveTo(5, -5);
      c.quadraticCurveTo(24, 8, 38, 0);
      c.stroke();

      // --- CENTER INTEGRATED EMBLEM CHEST STRIPES ---
      // Stripe 1 (White owl feathers merging to gold tiger claw curves)
      c.strokeStyle = "rgba(255, 255, 255, 0.85)";
      c.lineWidth = 1.6;
      c.beginPath();
      c.moveTo(-50, 0);
      c.quadraticCurveTo(-20, -15, 0, -10);
      c.stroke();
      
      c.strokeStyle = "#C8A34A";
      c.beginPath();
      c.moveTo(0, -10);
      c.quadraticCurveTo(20, -15, 45, -5);
      c.stroke();

      // Stripe 2
      c.strokeStyle = "rgba(255, 255, 255, 0.85)";
      c.beginPath();
      c.moveTo(-45, 25);
      c.quadraticCurveTo(-15, 10, 0, 15);
      c.stroke();

      c.strokeStyle = "#C8A34A";
      c.beginPath();
      c.moveTo(0, 15);
      c.quadraticCurveTo(15, 10, 40, 20);
      c.stroke();

      // Stripe 3
      c.strokeStyle = "rgba(255, 255, 255, 0.85)";
      c.beginPath();
      c.moveTo(-35, 50);
      c.quadraticCurveTo(-10, 35, 0, 40);
      c.stroke();

      c.strokeStyle = "#C8A34A";
      c.beginPath();
      c.moveTo(0, 40);
      c.quadraticCurveTo(10, 35, 32, 45);
      c.stroke();

      // Symmetrical bottom tip
      c.strokeStyle = "rgba(255, 255, 255, 0.5)";
      c.beginPath();
      c.moveTo(-15, 65);
      c.lineTo(0, 82);
      c.lineTo(15, 65);
      c.stroke();

      // --- GLOWING EYES ---
      if (glow > 0) {
        c.shadowColor = "#C8A34A";
        c.shadowBlur = 12 * glow;
        
        // Owl Eye center pupil glow (White-gold)
        c.fillStyle = "rgba(255, 255, 255, " + glow + ")";
        c.beginPath();
        c.arc(-26, -32, 2.2, 0, Math.PI * 2);
        c.fill();

        // Tiger Eye center pupil glow (Pure gold)
        c.fillStyle = "rgba(200, 163, 74, " + glow + ")";
        c.beginPath();
        c.arc(26, -32, 2.2, 0, Math.PI * 2);
        c.fill();
        
        c.shadowBlur = 0;
      }

      c.restore();
    };

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Background Darkness
      ctx.fillStyle = "#020202";
      ctx.fillRect(0, 0, width, height);

      const vanishingY = centerY - 50;

      // Scene 1: Soft overhead glow emerges
      if (timeline >= 0) {
        const lightIntensity = Math.min(1, time / 1.5);
        const radGlow = ctx.createRadialGradient(centerX, centerY - 100, 50, centerX, centerY, width / 1.8);
        radGlow.addColorStop(0, `rgba(200, 163, 74, ${0.03 * lightIntensity})`);
        radGlow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = radGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Scene 2 & 3: Hall of Wisdom Dolly Forward (Dolly floor speed)
      if (timeline === 1 || timeline === 2 || timeline === 3) {
        let dollyOffset = (time * 80) % 150;
        let scale = 1.0;
        let horizOffset = 0;

        // Camera dolly speed decelerates as we reach the monument
        if (timeline >= 2) {
          dollyOffset = (2.8 * 80) % 150; // hold floor static
          scale = 1.0 + Math.min(0.2, (time - 2.8) * 0.05); // slow camera push in
          horizOffset = Math.sin((time - 2.8) * 0.4) * 20; // slow orbit pan
        }

        // Draw Polished Black Marble Floor grid lines engraved in Gold
        ctx.strokeStyle = "rgba(200, 163, 74, 0.06)";
        ctx.lineWidth = 0.8;
        
        // Symmetrical lines from horizon vanishing point to bottom edge
        const numGridLines = 16;
        for (let i = 0; i <= numGridLines; i++) {
          const xRatio = (i / numGridLines) * 2.2 - 1.1; // widen perspective
          const xBottom = centerX + xRatio * width + horizOffset * 1.5;
          ctx.beginPath();
          ctx.moveTo(centerX + horizOffset, vanishingY);
          ctx.lineTo(xBottom, height);
          ctx.stroke();
        }

        // Symmetrical perspective horizontal grid lines moving forward
        for (let i = 0; i < 8; i++) {
          const progress = ((i * 20 + dollyOffset) % 160) / 160;
          const gridY = vanishingY + (height - vanishingY) * Math.pow(progress, 2.5); // logarithmic scroll
          ctx.strokeStyle = `rgba(200, 163, 74, ${0.08 * (progress)})`;
          ctx.lineWidth = 0.5 + progress * 0.8;
          ctx.beginPath();
          ctx.moveTo(0, gridY);
          ctx.lineTo(width, gridY);
          ctx.stroke();
        }

        // Draw Receding Symmetrical Architectural Pillars
        const numPillars = 6;
        for (let i = 0; i < numPillars; i++) {
          const progress = ((i * 45 + dollyOffset) % 270) / 270;
          const pScale = Math.pow(progress, 2);
          const pWidth = 15 + pScale * 120;
          const pHeight = 80 + pScale * 450;
          const pY = vanishingY + (height - vanishingY) * pScale - pHeight;

          // Left columns
          const lx = centerX - 60 - pScale * width * 0.7 + horizOffset;
          ctx.fillStyle = `rgba(15, 15, 15, ${progress * 0.9})`;
          ctx.fillRect(lx - pWidth, pY, pWidth, pHeight);
          // Highlight pillar edges
          ctx.strokeStyle = `rgba(200, 163, 74, ${0.07 * progress})`;
          ctx.lineWidth = 0.5 + progress * 1;
          ctx.strokeRect(lx - pWidth, pY, pWidth, pHeight);

          // Right columns
          const rx = centerX + 60 + pScale * width * 0.7 + horizOffset;
          ctx.fillStyle = `rgba(15, 15, 15, ${progress * 0.9})`;
          ctx.fillRect(rx, pY, pWidth, pHeight);
          ctx.strokeStyle = `rgba(200, 163, 74, ${0.07 * progress})`;
          ctx.lineWidth = 0.5 + progress * 1;
          ctx.strokeRect(rx, pY, pWidth, pHeight);
        }

        // Floor reflection mask (render mirrored monument)
        ctx.save();
        ctx.globalAlpha = 0.15;
        // mirror vertically from horizon
        ctx.translate(0, vanishingY * 2);
        ctx.scale(1, -1);
        drawMonumentGeometry(ctx, centerX + horizOffset, vanishingY, scale, 0);
        ctx.restore();

        // Draw actual monument sculpture (emerging in center horizon)
        let opacity = Math.min(1, (time - 1.0) / 1.5); // fade in after darkness
        if (timeline === 3) {
          // fade out during morph
          opacity = Math.max(0, 1 - (time - 3.8) * 1.5);
        }
        ctx.globalAlpha = opacity;
        
        // Symmetrical volumetric ray spotlight behind the monument
        const spotlight = ctx.createLinearGradient(centerX, vanishingY - 200, centerX, vanishingY + 200);
        spotlight.addColorStop(0, "rgba(255, 255, 255, 0.0)");
        spotlight.addColorStop(0.5, `rgba(200, 163, 74, ${0.04 * opacity})`);
        spotlight.addColorStop(1, "rgba(255, 255, 255, 0.0)");
        ctx.fillStyle = spotlight;
        ctx.beginPath();
        ctx.moveTo(centerX - 100 + horizOffset, vanishingY - 200);
        ctx.lineTo(centerX + 100 + horizOffset, vanishingY - 200);
        ctx.lineTo(centerX + 300 + horizOffset, vanishingY + 200);
        ctx.lineTo(centerX - 300 + horizOffset, vanishingY + 200);
        ctx.closePath();
        ctx.fill();

        // Symmetrical Eye Glow triggers in timeline 2 (still phase)
        let eyeGlow = 0;
        if (timeline === 2) {
          eyeGlow = Math.min(1, (time - 2.8) * 1.5); // pulse in
        } else if (timeline === 3) {
          eyeGlow = Math.max(0, 1 - (time - 3.8) * 2.0); // fade out
        }

        drawMonumentGeometry(ctx, centerX + horizOffset, vanishingY - 20, scale, eyeGlow);
        ctx.globalAlpha = 1.0;
      }

      // Scene 4: Morph into flat vector logo (timeline 3)
      if (timeline === 3) {
        const morphT = Math.min(1, (time - 3.8) * 1.55); // complete morph in 0.8s
        const scale = 1.2 - morphT * 0.3; // camera push out/recoil
        
        ctx.globalAlpha = morphT;
        drawMonumentGeometry(ctx, centerX, centerY - 60, scale, 0.95);
        ctx.globalAlpha = 1.0;
      }

      // Scene 5: Flat logo static holding state (timeline 4+)
      if (timeline >= 4) {
        drawMonumentGeometry(ctx, centerX, centerY - 60, 0.9, 0.9);
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

      {/* Brand Text Overlays (timeline 4) */}
      <AnimatePresence>
        {timeline >= 4 && (
          <div className="z-10 flex flex-col items-center text-center max-w-4xl px-6 pointer-events-none mt-40">
            {/* WOBT Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-[0.2em] leading-tight mb-4"
            >
              WHITE OWLS &amp;<br />
              <span className="text-[#C8A34A]">BLACK TIGERS</span>
            </motion.h1>

            {/* Motto 1 */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-300 text-xs sm:text-base font-medium tracking-widest max-w-2xl"
            >
              Where Wisdom Meets Courage.
            </motion.p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
