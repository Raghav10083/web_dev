"use client";

import React, { useState } from "react";
import { FiBookOpen, FiChevronDown, FiShield, FiCpu, FiGlobe, FiAward, FiLayers, FiCheckSquare, FiTerminal } from "react-icons/fi";

interface VolumeItem {
  volume: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  summary: string;
  contents: string[];
}

export default function ConstitutionShowcase() {
  const [activeVolume, setActiveVolume] = useState<number | null>(0);

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

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-stretch">
      {/* Timeline Nav List */}
      <div className="lg:w-1/2 flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-3 scrollbar-none border-r border-[#C8A34A08]">
        {volumes.map((vol, idx) => {
          const isActive = activeVolume === idx;
          return (
            <div
              key={vol.volume}
              onClick={() => setActiveVolume(idx)}
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

      {/* Detail Preview Card */}
      <div className="lg:w-1/2 bg-[#0E0E0E]/80 border border-gray-900 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-[#C8A34A05] blur-3xl pointer-events-none" />

        {activeVolume !== null ? (
          <div className="flex flex-col gap-6 h-full justify-between">
            <div className="flex flex-col gap-4">
              <div>
                <span className="px-2.5 py-1 rounded bg-[#C8A34A1A] text-[#C8A34A] text-[10px] uppercase tracking-wider font-bold">
                  {volumes[activeVolume].volume}
                </span>
                <h3 className="font-serif text-white text-xl font-bold tracking-wide mt-3">
                  {volumes[activeVolume].title}
                </h3>
                <span className="text-xs text-[#C8A34A] italic tracking-wide mt-1 block">
                  {volumes[activeVolume].subtitle}
                </span>
              </div>
              
              <div className="h-[1px] bg-gray-900 w-full" />
              
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                {volumes[activeVolume].summary}
              </p>
            </div>

            <div className="mt-4">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3 block">
                Constitutional Provisions
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {volumes[activeVolume].contents.map((item, index) => (
                  <li key={index} className="flex items-center gap-2.5 text-xs text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C8A34A]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-900 flex justify-between items-center text-xs">
              <span className="text-gray-500 tracking-wider font-mono">
                WOBT.CONSTITUTION.{volumes[activeVolume].volume.replace("Volume ", "")}.v1.0
              </span>
              <span className="text-[#C8A34A] font-semibold tracking-wider uppercase flex items-center gap-1">
                Authorized Draft
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-xs py-20 font-serif italic">
            Select a volume to preview the WOBT Constitution.
          </div>
        )}
      </div>
    </div>
  );
}
