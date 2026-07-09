"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface SubPlatform {
  name: string;
  id: string;
  desc: string;
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
  const [selectedNode, setSelectedNode] = useState<string | null>("Justice");

  const nodes: Record<string, NodeData> = {
    Knowledge: {
      title: "Knowledge",
      id: "Knowledge",
      x: 180,
      y: 100,
      color: "#C8A34A",
      desc: "Research, Education, AI, Innovation, Technology & Academia.",
      platforms: [
        { name: "LexAI", id: "lexai", desc: "Autonomous case research and drafting support." },
        { name: "PartnerGrow", id: "partnergrow", desc: "Practice updates and skills training." },
        { name: "Young Minds", id: "youngminds", desc: "Internships and mentoring index." },
        { name: "CareerNext", id: "careernext", desc: "Executive placement register." },
      ],
    },
    Capital: {
      title: "Capital",
      id: "Capital",
      x: 620,
      y: 100,
      color: "#C8A34A",
      desc: "Finance, Investment, Entrepreneurship & Restructuring.",
      platforms: [
        { name: "WOBT Capital", id: "wobt-capital", desc: "dispute and litigation finance." },
        { name: "Resurge", id: "resurge", desc: "debt restructuring & IBC support." },
        { name: "Launchpad", id: "launchpad", desc: "Venture incubation & capitalization." },
      ],
    },
    Justice: {
      title: "Justice",
      id: "Justice",
      x: 180,
      y: 340,
      color: "#C8A34A",
      desc: "Law, Governance, Compliance, Policy, Risk, Ethics & Mediation.",
      platforms: [
        { name: "LexPartners", id: "lexpartners", desc: "Global cross-border dispute coordination." },
        { name: "LexMediate", id: "lexmediate", desc: "ADR & commercial mediation." },
        { name: "LawBox", id: "lawbox", desc: "Secure tamper-evident digital custody." },
        { name: "LexComply", id: "lexcomply", desc: "Automated compliance mappings." },
        { name: "LexODR", id: "lexodr", desc: "Online dispute resolution portals." },
      ],
    },
    Society: {
      title: "Society",
      id: "Society",
      x: 620,
      y: 340,
      color: "#C8A34A",
      desc: "Public Policy, Cybersecurity, IP Protection & Environment.",
      platforms: [
        { name: "CyberShield", id: "cybershield", desc: "Advanced cybersecurity advisory." },
        { name: "Brand Protector", id: "brandprotector", desc: "Trademark monitoring & IP defense." },
        { name: "Trace & Hunt", id: "tracehunt", desc: "Forensic audits & investigations." },
        { name: "Cyber Recover", id: "cyberrecover", desc: "Incident response and recovery." },
        { name: "e-Contract360", id: "econtract360", desc: "Digital contract lifecycle management." },
      ],
    },
  };

  const centerNode = { x: 400, y: 220 };

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-stretch">
      {/* Interactive SVG Canvas */}
      <div className="w-full lg:w-7/12 bg-[#030303]/60 border border-gray-900 rounded-3xl p-6 relative overflow-hidden flex items-center justify-center min-h-[300px] sm:min-h-[460px]">
        {/* Subtle background world map vector overlay placeholder */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C8A34A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <svg
          viewBox="0 0 800 440"
          className="w-full h-auto select-none z-10 hidden sm:block overflow-visible"
        >
          <defs>
            {/* Soft gold drop shadows */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            {/* Gold gradient */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#C8A34A" />
            </linearGradient>
          </defs>

          {/* Connection Lines (Paths from center WOBT to branches) */}
          {Object.keys(nodes).map((key) => {
            const node = nodes[key];
            const isHovered = hoveredNode === key;
            const isSelected = selectedNode === key;
            return (
              <g key={`lines-${key}`}>
                {/* Background Muted Connection line */}
                <line
                  x1={centerNode.x}
                  y1={centerNode.y}
                  x2={node.x}
                  y2={node.y}
                  stroke={isSelected || isHovered ? "rgba(200, 163, 74, 0.45)" : "rgba(200, 163, 74, 0.08)"}
                  strokeWidth={isSelected || isHovered ? 2.5 : 1.5}
                  className="transition-all duration-500"
                />

                {/* Animated Dash Connection flow */}
                {(isHovered || isSelected) && (
                  <line
                    x1={centerNode.x}
                    y1={centerNode.y}
                    x2={node.x}
                    y2={node.y}
                    stroke="#C8A34A"
                    strokeWidth={2.5}
                    strokeDasharray="8 12"
                    className="animate-[dash_1.5s_linear_infinite]"
                    style={{
                      strokeDashoffset: 20,
                    }}
                  />
                )}
              </g>
            );
          })}

          {/* Center WOBT Node */}
          <g className="cursor-default">
            {/* Outer Glow */}
            <circle
              cx={centerNode.x}
              cy={centerNode.y}
              r={36}
              fill="rgba(200, 163, 74, 0.03)"
              stroke="rgba(200, 163, 74, 0.2)"
              strokeWidth={1}
            />
            {/* Center Solid */}
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
              fill="url(#goldGradient)"
              className="font-serif text-xs font-extrabold tracking-widest text-center"
              textAnchor="middle"
            >
              WOBT
            </text>
          </g>

          {/* Branch Nodes */}
          {Object.keys(nodes).map((key) => {
            const node = nodes[key];
            const isHovered = hoveredNode === key;
            const isSelected = selectedNode === key;
            return (
              <g
                key={key}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode(key)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(key)}
              >
                {/* Node outer glow on selection or hover */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={30}
                  fill="transparent"
                  stroke={isSelected || isHovered ? "rgba(200, 163, 74, 0.35)" : "transparent"}
                  strokeWidth={2}
                  className="transition-all duration-300"
                  filter={isSelected || isHovered ? "url(#glow)" : ""}
                />
                
                {/* Node Solid */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={22}
                  fill={isSelected ? "#C8A34A" : "#0E0E0E"}
                  stroke={isSelected || isHovered ? "#C8A34A" : "rgba(200, 163, 74, 0.3)"}
                  strokeWidth={1.5}
                  className="transition-all duration-300"
                />

                {/* Node Label Text */}
                <text
                  x={node.x}
                  y={node.y + 4}
                  fill={isSelected ? "#090909" : "#FFFFFF"}
                  className="font-sans text-[10px] font-bold tracking-wider uppercase"
                  textAnchor="middle"
                >
                  {node.title[0]}
                </text>

                {/* City/Name Label below node */}
                <text
                  x={node.x}
                  y={node.y + 44}
                  fill={isSelected || isHovered ? "#C8A34A" : "rgba(255, 255, 255, 0.5)"}
                  className="font-serif text-[11px] font-semibold tracking-wide transition-all"
                  textAnchor="middle"
                >
                  {node.title}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Mobile stacking fallback */}
        <div className="sm:hidden flex flex-wrap gap-3 justify-center z-10 w-full">
          {Object.keys(nodes).map((key) => {
            const isSelected = selectedNode === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedNode(key)}
                className={`px-5 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                  isSelected
                    ? "bg-[#C8A34A] text-[#090909] border-[#C8A34A]"
                    : "bg-[#0E0E0E] text-gray-400 border-gray-900"
                }`}
              >
                {nodes[key].title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Details Display Side Panel */}
      <div className="w-full lg:w-5/12 flex flex-col justify-between bg-[#030303]/60 border border-gray-900 rounded-3xl p-8 relative">
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#C8A34A03] blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {selectedNode && (
            <motion.div
              key={selectedNode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6 h-full justify-between"
            >
              <div>
                <span className="text-[10px] text-[#C8A34A] font-bold uppercase tracking-widest font-mono">
                  Ecosystem Pillar
                </span>
                <h3 className="font-serif text-2xl lg:text-3xl text-white font-bold tracking-wide mt-2">
                  {nodes[selectedNode].title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-3 font-medium">
                  {nodes[selectedNode].desc}
                </p>
              </div>

              <div className="h-[1px] bg-gray-900 w-full" />

              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4 block">
                  Pillar Platforms
                </span>
                <div className="flex flex-col gap-3">
                  {nodes[selectedNode].platforms.map((platform) => (
                    <Link
                      key={platform.id}
                      href={`/platforms/${platform.id}`}
                      className="p-4 rounded-xl bg-gray-950/80 border border-gray-900 hover:border-[#C8A34A33] group transition-all duration-300 flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span className="font-serif text-white font-bold text-xs uppercase tracking-wider group-hover:text-[#C8A34A] transition-all">
                          {platform.name}
                        </span>
                        <span className="text-[10px] text-gray-500 mt-1 max-w-[240px] line-clamp-1">
                          {platform.desc}
                        </span>
                      </div>
                      <FiArrowRight className="text-gray-600 group-hover:text-[#C8A34A] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
