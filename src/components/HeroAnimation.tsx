"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroAnimation() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),  // Stage 1: Golden particles fade in
      setTimeout(() => setStage(2), 2500),  // Stage 2: White Owl outline draws
      setTimeout(() => setStage(3), 4500),  // Stage 3: Owl eyes illuminate
      setTimeout(() => setStage(4), 5500),  // Stage 4: Neural network lines spread
      setTimeout(() => setStage(5), 7000),  // Stage 5: Black Tiger emerges
      setTimeout(() => setStage(6), 9000),  // Stage 6: Tiger eyes glow & final link
      setTimeout(() => setStage(7), 10500), // Stage 7: Reveal titles & CTAs
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto h-[320px] sm:h-[450px] relative overflow-hidden bg-[#030303]/20 border border-gray-900/40 rounded-3xl p-6 flex items-center justify-center">
      {/* Background radial gold glow */}
      <div className="absolute inset-0 gold-glow-radial opacity-40 pointer-events-none" />

      {/* Floating background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-1 h-1 bg-[#C8A34A] rounded-full animate-ping opacity-30" />
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-[#C8A34A] rounded-full animate-ping opacity-25" />
        <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-[#C8A34A] rounded-full animate-ping opacity-15" />
      </div>

      <svg
        viewBox="0 0 1000 450"
        className="w-full h-full select-none z-10"
        style={{ mixBlendMode: "screen" }}
      >
        <defs>
          <filter id="glow-eyes" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Stage 1+: Global Constellation Line Paths */}
        {stage >= 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 2 }}
          >
            {/* Fine world map / network wireframe backing */}
            <circle cx="500" cy="225" r="180" stroke="#C8A34A" strokeWidth="0.5" fill="none" strokeDasharray="3 9" />
            <line x1="200" y1="225" x2="800" y2="225" stroke="#C8A34A" strokeWidth="0.5" strokeDasharray="5 5" />
            <line x1="500" y1="50" x2="500" y2="400" stroke="#C8A34A" strokeWidth="0.5" strokeDasharray="5 5" />
          </motion.g>
        )}

        {/* Stage 2+: White Owl Drawing Paths (Left) */}
        {stage >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* Stylized Geometric Owl outline */}
            <path
              d="M 220 225 L 250 140 L 300 170 L 300 280 L 250 310 Z"
              stroke="#C8A34A"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="400"
              strokeDashoffset="400"
              className="animate-path-draw"
            />
            <path
              d="M 250 140 L 275 120 L 300 140 M 275 120 L 275 190"
              stroke="#C8A34A"
              strokeWidth="1"
              fill="none"
              strokeDasharray="150"
              strokeDashoffset="150"
              className="animate-path-draw"
            />
            {/* Wing facets */}
            <path
              d="M 220 225 L 200 260 L 220 290 L 250 310"
              stroke="rgba(200, 163, 74, 0.4)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="150"
              strokeDashoffset="150"
              className="animate-path-draw"
            />
          </motion.g>
        )}

        {/* Stage 3+: Owl eyes illuminate */}
        {stage >= 3 && (
          <g>
            <motion.circle
              cx="260"
              cy="150"
              r="4"
              fill="#C8A34A"
              filter="url(#glow-eyes)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <motion.circle
              cx="290"
              cy="150"
              r="4"
              fill="#C8A34A"
              filter="url(#glow-eyes)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </g>
        )}

        {/* Stage 4+: Neural connections spread across coordinates */}
        {stage >= 4 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.5 }}
          >
            {/* Spreading neural lines */}
            <line x1="300" y1="225" x2="400" y2="180" stroke="#C8A34A" strokeWidth="1" strokeDasharray="60" strokeDashoffset="60" className="animate-path-draw" />
            <line x1="300" y1="170" x2="480" y2="130" stroke="#C8A34A" strokeWidth="1" strokeDasharray="180" strokeDashoffset="180" className="animate-path-draw" />
            <line x1="300" y1="280" x2="420" y2="310" stroke="#C8A34A" strokeWidth="1" strokeDasharray="120" strokeDashoffset="120" className="animate-path-draw" />
            
            {/* Knowledge Nodes */}
            <circle cx="400" cy="180" r="3" fill="#C8A34A" className="animate-ping" />
            <circle cx="480" cy="130" r="3" fill="#C8A34A" />
            <circle cx="420" cy="310" r="3" fill="#C8A34A" />
          </motion.g>
        )}

        {/* Stage 5+: Black Tiger emerges (Right) */}
        {stage >= 5 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* Stylized Geometric Tiger outline */}
            <path
              d="M 780 225 L 750 140 L 700 170 L 700 280 L 750 310 Z"
              stroke="#C8A34A"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="400"
              strokeDashoffset="400"
              className="animate-path-draw"
            />
            {/* Facet lines */}
            <path
              d="M 750 140 L 725 120 L 700 140 M 725 120 L 725 190"
              stroke="#C8A34A"
              strokeWidth="1"
              fill="none"
              strokeDasharray="150"
              strokeDashoffset="150"
              className="animate-path-draw"
            />
            <path
              d="M 780 225 L 800 260 L 780 290 L 750 310"
              stroke="rgba(200, 163, 74, 0.4)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="150"
              strokeDashoffset="150"
              className="animate-path-draw"
            />
          </motion.g>
        )}

        {/* Stage 6+: Tiger eyes illuminate & network completes connection */}
        {stage >= 6 && (
          <g>
            {/* Tiger Eyes */}
            <motion.circle
              cx="740"
              cy="150"
              r="4"
              fill="#C8A34A"
              filter="url(#glow-eyes)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <motion.circle
              cx="710"
              cy="150"
              r="4"
              fill="#C8A34A"
              filter="url(#glow-eyes)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            {/* Connecting line between Owl and Tiger centers */}
            <motion.line
              x1="300"
              y1="225"
              x2="700"
              y2="225"
              stroke="#C8A34A"
              strokeWidth="1.5"
              initial={{ strokeDasharray: "400", strokeDashoffset: "400" }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </g>
        )}

        {/* Text descriptions overlay inside SVG */}
        <g>
          {stage >= 2 && stage < 5 && (
            <motion.text
              x="500"
              y="225"
              fill="rgba(200, 163, 74, 0.6)"
              className="font-serif text-sm tracking-widest uppercase font-semibold"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              WISDOM
            </motion.text>
          )}
          {stage >= 5 && (
            <motion.text
              x="500"
              y="225"
              fill="#C8A34A"
              className="font-serif text-sm tracking-widest uppercase font-bold"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              WISDOM MEETS COURAGE
            </motion.text>
          )}
        </g>
      </svg>
    </div>
  );
}
