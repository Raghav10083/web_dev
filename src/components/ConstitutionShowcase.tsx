"use client";

import React, { useState } from "react";
import { FiBookOpen, FiShield, FiCpu, FiGlobe, FiAward, FiLayers, FiCheckSquare, FiTerminal } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface VolumeItem {
  volume: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  summary: string;
  contents: string[];
}

export default function ConstitutionShowcase() {
  const [activeVolume, setActiveVolume] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const volumes: VolumeItem[] = [
    {
      volume: "Volume I",
      title: "The Constitution",
      subtitle: "The Foundation & Soul of WOBT",
      icon: <FiBookOpen className="text-[#C8A34A] text-lg" />,
      summary: "Contains the foundational Preamble, Vision, Mission, Purpose, and the core philosophies of the White Owl and Black Tiger.",
      contents: ["Vision & Mission charters", "Motto: Wisdom, Courage, Excellence", "Ethical Preamble for collaboration", "Institutional Principles"],
    },
    {
      volume: "Volume II",
      title: "Governance",
      subtitle: "Regulatory Frameworks & Accountability Councils",
      icon: <FiShield className="text-[#C8A34A] text-lg" />,
      summary: "Defines the governing layers that enforce standards and ensure institutional trust across all regional initiatives.",
      contents: ["Executive & Advisory Councils", "Ethics & Technology Boards", "Arbitrator Neutral panels", "Capital Deployment oversight"],
    },
    {
      volume: "Volume III",
      title: "Membership",
      subtitle: "Global Professional Fellowship Directory",
      icon: <FiGlobe className="text-[#C8A34A] text-lg" />,
      summary: "Defines the admission, rights, and collaboration guidelines for professionals, corporations, and academic fellows.",
      contents: ["Individual & Professional tiers", "Corporate & University affiliations", "Honorary Fellowship nominations", "Ambassador deployment criteria"],
    },
    {
      volume: "Volume IV",
      title: "The Ecosystem",
      subtitle: "Strategic Multi-Vertical Platform Architecture",
      icon: <FiLayers className="text-[#C8A34A] text-lg" />,
      summary: "Establishes structural guidelines for WOBT's 19 live specialist verticals and future corporate initiatives.",
      contents: ["Litigation Finance separation rules", "Technology integrations (LexAI)", "Operational independence criteria", "Practice-growth platforms"],
    },
    {
      volume: "Volume V",
      title: "Technology",
      subtitle: "Knowledge Graphs & Digital Integrity Systems",
      icon: <FiCpu className="text-[#C8A34A] text-lg" />,
      summary: "Establishes data exchange rules, cryptographic identity credentials, and AI safety standardizations across platforms.",
      contents: ["Graph-driven resource mapping", "DPDP Act data principal rights", "Tamper-evident custody protocols", "Secure reputation index systems"],
    },
    {
      volume: "Volume VI",
      title: "Research",
      subtitle: "Think Tank & Independent Policy Publications",
      icon: <FiBookOpen className="text-[#C8A34A] text-lg" />,
      summary: "Directs peer-reviewed journals, policy drafts, and economic indexes published to advise governments and businesses.",
      contents: ["Multidisciplinary Journals", "Legislative drafting policy reviews", "Global Economic & Justice indexes", "Research funding allocations"],
    },
    {
      volume: "Volume VII",
      title: "Education",
      subtitle: "The WOBT Academy & Executive Accreditations",
      icon: <FiAward className="text-[#C8A34A] text-lg" />,
      summary: "Coordinates practice management, skills certification, and professional development programs globally.",
      contents: ["Executive Leadership certifications", "Academic partnerships & internships", "Scholarship funding directives", "Practice management curricula"],
    },
    {
      volume: "Volume VIII",
      title: "Ethics",
      subtitle: "The Code of Integrity & Professional Independence",
      icon: <FiCheckSquare className="text-[#C8A34A] text-lg" />,
      summary: "An uncompromised framework enforcing transparency, data privacy, and conflict-of-interest prevention.",
      contents: ["Advocate-client choice protection", "Conflicts management protocols", "AI compliance & audit procedures", "Whistleblower security charters"],
    },
    {
      volume: "Volume IX",
      title: "International",
      subtitle: "Cross-Border Jurisdictional Alliances",
      icon: <FiGlobe className="text-[#C8A34A] text-lg" />,
      summary: "Coordinates chapter extensions, regional legal updates, and cross-border commercial dispute advisory protocols.",
      contents: ["Global Secretariat interfaces", "Bilateral advocacy channels", "Regional updates and updates", "Cross-border litigation tracking"],
    },
    {
      volume: "Volume X",
      title: "Innovation",
      subtitle: "Quantum Computing & Futures Mapping 2050",
      icon: <FiTerminal className="text-[#C8A34A] text-lg" />,
      summary: "Directs research into future technologies, blockchain assets, digital courts, and long-term tech cycles.",
      contents: ["Digital Justice & smart contracts", "Legal Tech AI security standards", "Crypto and asset trace updates", "2050 Technology Roadmap planning"],
    },
    {
      volume: "Volume XI",
      title: "Brand Book",
      subtitle: "Identity System & Logo Philosophy",
      icon: <FiLayers className="text-[#C8A34A] text-lg" />,
      summary: "Regulates visual systems, naming conventions, tone, and brand representation values globally.",
      contents: ["White Owl / Black Tiger guidelines", "Typographical & gold palette grids", "Latin maxim: Sapientia et Fortitudo", "Domain & entity branding rules"],
    },
    {
      volume: "Volume XII",
      title: "Legacy",
      subtitle: "The 100-Year Vision & Civic Influence",
      icon: <FiAward className="text-[#C8A34A] text-lg" />,
      summary: "The ultimate chapter, guiding long-term societal progress, trust conservation, and intergenerational values.",
      contents: ["Centennial milestones framework", "Civic trust parameters", "Enduring value models", "Generational leadership successions"],
    },
  ];

  const selectVolume = (idx: number) => {
    setIsFlipped(true);
    setTimeout(() => {
      setActiveVolume(idx);
      setIsFlipped(false);
    }, 250);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-stretch">
      {/* Timeline Nav List */}
      <div className="lg:w-1/2 flex flex-col gap-3 max-h-[580px] overflow-y-auto pr-3 border-r border-[#C8A34A08] scrollbar-none">
        {volumes.map((vol, idx) => {
          const isActive = activeVolume === idx;
          return (
            <div
              key={vol.volume}
              onClick={() => selectVolume(idx)}
              className={`p-5 rounded-xl border text-left cursor-pointer transition-all duration-300 flex items-start gap-4 relative group ${
                isActive
                  ? "bg-[#C8A34A0A] border-[#C8A34A4D] shadow-[0_0_15px_rgba(200,163,74,0.05)]"
                  : "bg-[#030303]/30 border-gray-900 hover:border-gray-800"
              }`}
            >
              {/* Connector line dot */}
              <div
                className={`w-2 h-2 rounded-full absolute -right-[17px] top-[26px] hidden lg:block z-10 transition-all duration-300 ${
                  isActive ? "bg-[#C8A34A] scale-125 shadow-[0_0_8px_#C8A34A]" : "bg-gray-800 group-hover:bg-gray-600"
                }`}
              />

              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  isActive ? "bg-[#C8A34A] text-[#090909]" : "bg-gray-900/50 text-gray-500"
                }`}
              >
                {vol.icon}
              </div>
              <div className="flex-1">
                <span className={`text-[10px] uppercase font-bold tracking-widest ${isActive ? "text-[#C8A34A]" : "text-gray-500"}`}>
                  {vol.volume}
                </span>
                <h3 className="font-serif text-white font-semibold text-sm tracking-wide mt-0.5">
                  {vol.title}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">
                  {vol.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3D Book Detail Display Column */}
      <div className="lg:w-1/2 flex flex-col justify-between bg-[#0E0E0E]/80 border border-gray-900 rounded-3xl p-8 relative overflow-hidden min-h-[460px]">
        {/* Ambient gold glow */}
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-[#C8A34A03] blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start h-full justify-between">
          
          {/* 3D Book element */}
          <div className="book-container py-4 flex-shrink-0">
            <div className="book">
              {/* Outer Cover swings open on hover */}
              <div className="book-cover flex flex-col justify-between p-4 bg-[#090909] border border-[#C8A34A33] rounded-r-md">
                <div className="h-[2px] bg-[#C8A34A66] w-full" />
                <div className="text-center">
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mb-1">
                    {volumes[activeVolume].volume}
                  </span>
                  <h4 className="font-serif text-white font-bold text-xs uppercase tracking-wider leading-relaxed">
                    {volumes[activeVolume].title.split(" &")[0]}
                  </h4>
                </div>
                <div className="flex justify-center">
                  <div className="w-6 h-6 rounded-full border border-[#C8A34A4D] flex items-center justify-center">
                    <span className="text-[8px] font-serif text-[#C8A34A]">W</span>
                  </div>
                </div>
              </div>

              {/* Inside Page holds visual text lines */}
              <div className="book-pages p-3 flex flex-col gap-1.5 justify-start overflow-hidden">
                <div className="h-2 w-12 bg-gray-300 rounded" />
                <div className="h-[1px] bg-gray-200 w-full my-1" />
                <div className="h-1.5 w-full bg-gray-200 rounded" />
                <div className="h-1.5 w-[90%] bg-gray-200 rounded" />
                <div className="h-1.5 w-[85%] bg-gray-200 rounded" />
                <div className="h-1.5 w-full bg-gray-200 rounded" />
                <div className="h-1.5 w-[80%] bg-gray-200 rounded" />
                <div className="h-1.5 w-[70%] bg-gray-200 rounded" />
              </div>
            </div>
          </div>

          {/* Details Column with slide flips */}
          <AnimatePresence mode="wait">
            {!isFlipped && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col justify-between h-full min-h-[300px]"
              >
                <div>
                  <span className="text-[#C8A34A] text-[10px] uppercase font-bold tracking-widest font-mono">
                    Charter Chapter
                  </span>
                  <h3 className="font-serif text-white text-xl font-bold tracking-wide mt-2">
                    {volumes[activeVolume].title}
                  </h3>
                  <span className="text-[11px] text-gray-500 font-medium italic mt-1 block leading-relaxed">
                    {volumes[activeVolume].subtitle}
                  </span>
                  <p className="text-[11px] text-gray-400 leading-relaxed mt-4 font-medium">
                    {volumes[activeVolume].summary}
                  </p>
                </div>

                <div className="h-[1.5px] bg-gray-900 my-4" />

                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3 block">
                    Core Provisions
                  </span>
                  <ul className="flex flex-col gap-2">
                    {volumes[activeVolume].contents.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-[10px] text-gray-400">
                        <span className="text-[#C8A34A] mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
