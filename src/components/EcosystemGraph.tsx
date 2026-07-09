"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiRotateCcw } from "react-icons/fi";

interface SubPlatform {
  name: string;
  id: string;
  desc: string;
  angle: number; // Radial offset angle in degrees
}

interface NodeData {
  title: string;
  id: string;
  x: number;
  y: number;
  color: string;
  desc: string;
  platforms: SubPlatform[];
}

export default function EcosystemGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [zoomedNode, setZoomedNode] = useState<string | null>(null);

  const nodes: Record<string, NodeData> = {
    Knowledge: {
      title: "Knowledge",
      id: "Knowledge",
      x: 200,
      y: 110,
      color: "#C8A34A",
      desc: "Research, Education, AI, Innovation, Technology & Academia.",
      platforms: [
        { name: "LexAI", id: "lexai", desc: "Autonomous case research and drafting.", angle: 180 },
        { name: "PartnerGrow", id: "partnergrow", desc: "Practice updates & skills training.", angle: 240 },
        { name: "Young Minds", id: "youngminds", desc: "Internships & mentoring index.", angle: 300 },
        { name: "CareerNext", id: "careernext", desc: "Executive placement register.", angle: 120 },
      ],
    },
    Capital: {
      title: "Capital",
      id: "Capital",
      x: 600,
      y: 110,
      color: "#C8A34A",
      desc: "Finance, Investment, Entrepreneurship & Restructuring.",
      platforms: [
        { name: "WOBT Capital", id: "wobt-capital", desc: "Dispute and litigation finance.", angle: 0 },
        { name: "Resurge", id: "resurge", desc: "Debt restructuring & IBC support.", angle: 60 },
        { name: "Launchpad", id: "launchpad", desc: "Venture incubation & capitalization.", angle: 300 },
      ],
    },
    Justice: {
      title: "Justice",
      id: "Justice",
      x: 200,
      y: 330,
      color: "#C8A34A",
      desc: "Law, Governance, Compliance, Policy, Risk, Ethics & Mediation.",
      platforms: [
        { name: "LexPartners", id: "lexpartners", desc: "Global cross-border disputes.", angle: 180 },
        { name: "LexMediate", id: "lexmediate", desc: "ADR & commercial mediation.", angle: 120 },
        { name: "LawBox", id: "lawbox", desc: "Secure evidence custody.", angle: 240 },
        { name: "LexComply", id: "lexcomply", desc: "Compliance mapping tools.", angle: 60 },
      ],
    },
    Society: {
      title: "Society",
      id: "Society",
      x: 600,
      y: 330,
      color: "#C8A34A",
      desc: "Public Policy, Cybersecurity, IP Protection & Environment.",
      platforms: [
        { name: "CyberShield", id: "cybershield", desc: "Advanced cybersecurity advisory.", angle: 0 },
        { name: "Brand Protector", id: "brandprotector", desc: "IP defense system.", angle: 60 },
        { name: "Trace & Hunt", id: "tracehunt", desc: "Asset audits & checks.", angle: 300 },
      ],
    },
  };

  const centerNode = { x: 400, y: 220 };

  // Calculate dynamic transform based on zoomed node coordinates
  const getTransform = () => {
    if (!zoomedNode) return { scale: 1, x: 0, y: 0 };
    const target = nodes[zoomedNode];
    // Offset view to center the node in our 800x440 viewport
    const offsetX = 400 - target.x;
    const offsetY = 220 - target.y;
    return {
      scale: 1.8,
      x: offsetX * 1.8,
      y: offsetY * 1.8,
    };
  };

  const currentTransform = getTransform();

  return (
    <div className="flex flex-col items-center gap-12 w-full">
      {/* Zoom reset controls */}
      {zoomedNode && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setZoomedNode(null)}
          className="px-6 py-2.5 rounded-full border border-[#C8A34A33] hover:border-[#C8A34A] bg-[#0E0E0E] text-[#C8A34A] text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#C8A34A08] transition-all cursor-pointer z-20 shadow-lg"
        >
          <FiRotateCcw /> Reset Ecosystem Map View
        </motion.button>
      )}

      {/* SVG Canvas with Zoom viewport */}
      <div className="w-full bg-[#030303]/60 border border-gray-900/60 rounded-3xl p-6 relative overflow-hidden flex items-center justify-center min-h-[360px] sm:min-h-[500px]">
        {/* Soft background grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#C8A34A_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

        <motion.div
          animate={{
            scale: currentTransform.scale,
            x: currentTransform.x,
            y: currentTransform.y,
          }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="w-full h-full flex items-center justify-center origin-center"
        >
          <svg
            viewBox="0 0 800 440"
            className="w-[800px] h-[440px] select-none overflow-visible"
          >
            <defs>
              <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="goldNodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#C8A34A" />
              </linearGradient>
            </defs>

            {/* Global connection paths */}
            {!zoomedNode &&
              Object.keys(nodes).map((key) => {
                const node = nodes[key];
                const isHovered = hoveredNode === key;
                return (
                  <g key={`lines-${key}`}>
                    <line
                      x1={centerNode.x}
                      y1={centerNode.y}
                      x2={node.x}
                      y2={node.y}
                      stroke={isHovered ? "rgba(200, 163, 74, 0.45)" : "rgba(200, 163, 74, 0.08)"}
                      strokeWidth={isHovered ? 2.5 : 1.5}
                      className="transition-all duration-300"
                    />
                    {isHovered && (
                      <line
                        x1={centerNode.x}
                        y1={centerNode.y}
                        x2={node.x}
                        y2={node.y}
                        stroke="#C8A34A"
                        strokeWidth={2.5}
                        strokeDasharray="8 12"
                        className="animate-[dash_1.5s_linear_infinite]"
                      />
                    )}
                  </g>
                );
              })}

            {/* Central Node WOBT (fades if zoomed) */}
            <g className="cursor-default" opacity={zoomedNode ? 0.05 : 1}>
              <circle
                cx={centerNode.x}
                cy={centerNode.y}
                r={38}
                fill="rgba(200, 163, 74, 0.03)"
                stroke="rgba(200, 163, 74, 0.15)"
                strokeWidth={1}
              />
              <circle
                cx={centerNode.x}
                cy={centerNode.y}
                r={26}
                fill="#090909"
                stroke="#C8A34A"
                strokeWidth={2}
              />
              <text
                x={centerNode.x}
                y={centerNode.y + 4}
                fill="url(#goldNodeGradient)"
                className="font-serif text-[11px] font-extrabold tracking-widest"
                textAnchor="middle"
              >
                WOBT
              </text>
            </g>

            {/* Branch Nodes (Pillars) */}
            {Object.keys(nodes).map((key) => {
              const node = nodes[key];
              const isHovered = hoveredNode === key;
              const isZoomed = zoomedNode === key;
              
              // Fade out other nodes if one node is zoomed
              const opacity = zoomedNode ? (isZoomed ? 1 : 0.05) : 1;

              return (
                <g
                  key={key}
                  className="cursor-pointer"
                  opacity={opacity}
                  onMouseEnter={() => !zoomedNode && setHoveredNode(key)}
                  onMouseLeave={() => !zoomedNode && setHoveredNode(null)}
                  onClick={() => !zoomedNode && setZoomedNode(key)}
                >
                  {/* Glowing aura */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={32}
                    fill="transparent"
                    stroke={isHovered || isZoomed ? "rgba(200, 163, 74, 0.35)" : "transparent"}
                    strokeWidth={1.5}
                    filter={isHovered || isZoomed ? "url(#goldGlow)" : ""}
                    className="transition-all duration-300"
                  />

                  {/* Core Node Solid */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={24}
                    fill={isZoomed ? "#C8A34A" : "#0E0E0E"}
                    stroke={isHovered || isZoomed ? "#C8A34A" : "rgba(200, 163, 74, 0.2)"}
                    strokeWidth={1.5}
                    className="transition-all duration-300"
                  />

                  <text
                    x={node.x}
                    y={node.y + 4}
                    fill={isZoomed ? "#090909" : "#FFFFFF"}
                    className="font-serif text-[10px] font-bold uppercase tracking-wider"
                    textAnchor="middle"
                  >
                    {node.title[0]}
                  </text>

                  {/* Node label */}
                  {!isZoomed && (
                    <text
                      x={node.x}
                      y={node.y + 46}
                      fill={isHovered ? "#C8A34A" : "rgba(255,255,255,0.6)"}
                      className="font-serif text-[12px] font-semibold tracking-wide transition-all"
                      textAnchor="middle"
                    >
                      {node.title}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Neural Branch Platforms expanding outward when zoomed */}
            {zoomedNode && (
              <g>
                {nodes[zoomedNode].platforms.map((platform, idx) => {
                  const targetNode = nodes[zoomedNode];
                  const radians = (platform.angle * Math.PI) / 180;
                  // Radius offset length
                  const dist = 75;
                  const targetX = targetNode.x + Math.cos(radians) * dist;
                  const targetY = targetNode.y + Math.sin(radians) * dist;

                  return (
                    <g key={platform.id}>
                      {/* Connection branch line */}
                      <motion.line
                        x1={targetNode.x}
                        y1={targetNode.y}
                        x2={targetNode.x}
                        y2={targetNode.y}
                        animate={{ x2: targetX, y2: targetY }}
                        transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                        stroke="#C8A34A"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />

                      {/* Floating Platform Link Node */}
                      <motion.g
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 + 0.2, type: "spring", stiffness: 100 }}
                        className="cursor-pointer"
                      >
                        <foreignObject
                          x={targetX - 55}
                          y={targetY - 18}
                          width="110"
                          height="36"
                          className="overflow-visible"
                        >
                          <Link
                            href={`/platforms/${platform.id}`}
                            className="w-full h-full flex flex-col justify-center items-center rounded-lg bg-[#0E0E0E] border border-gray-900 hover:border-[#C8A34A] px-2 py-1 transition-all group shadow-md"
                          >
                            <span className="font-serif text-[7.5px] uppercase tracking-wider text-white font-bold group-hover:text-[#C8A34A] text-center leading-tight">
                              {platform.name}
                            </span>
                            <span className="text-[5.5px] text-gray-500 text-center font-medium mt-0.5 max-w-[90px] truncate leading-none">
                              {platform.desc}
                            </span>
                          </Link>
                        </foreignObject>
                      </motion.g>
                    </g>
                  );
                })}
              </g>
            )}
          </svg>
        </motion.div>
      </div>

      {/* Global detail card below map when not zoomed */}
      {!zoomedNode && (
        <div className="max-w-xl text-center bg-[#0E0E0E]/40 border border-gray-900 rounded-2xl p-6">
          <span className="text-[#C8A34A] text-[10px] font-bold uppercase tracking-widest font-mono">
            Navigation Guild
          </span>
          <h4 className="font-serif text-white font-bold text-sm mt-1 mb-2">
            Click on any Pillar to Zoom &amp; Explore
          </h4>
          <p className="text-xs text-gray-400 font-medium">
            Expands WOBT&apos;s neural network to reveal associated capabilities, software systems, and direct dynamic router subpage links.
          </p>
        </div>
      )}
    </div>
  );
}
