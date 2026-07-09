"use client";

import React, { useState } from "react";
import { FiChevronRight, FiCheckCircle } from "react-icons/fi";
import { FaGraduationCap, FaCoins, FaBalanceScale, FaUsers } from "react-icons/fa";

interface BrandCard {
  name: string;
  desc: string;
  url: string;
}

interface PillarDetail {
  title: string;
  tagline: string;
  icon: React.ReactNode;
  disciplines: string[];
  capabilities: string[];
  brands: BrandCard[];
}

export default function EcosystemExplorer() {
  const [activePillar, setActivePillar] = useState<string>("Justice");

  const pillars: Record<string, PillarDetail> = {
    Knowledge: {
      title: "Knowledge",
      tagline: "Academic Research, AI systems, and Institutional Education",
      icon: <FaGraduationCap className="text-2xl" />,
      disciplines: ["Research & Journals", "Artificial Intelligence", "Academy & Executive Programs", "Technology & Innovation"],
      capabilities: [
        "Specialized AI drafting and legal-factual case analysis (WOBT LexAI).",
        "Continuous curriculum for professional advancement (WOBT PartnerGrow).",
        "Mentorship frameworks for early-career scholars and practitioners (WOBT Young Minds).",
        "Publishing of peer-reviewed multidisciplinary policy whitepapers.",
      ],
      brands: [
        { name: "LexAI", desc: "Autonomous case research and drafting support.", url: "#platforms" },
        { name: "PartnerGrow", desc: "Skills updating and certification modules.", url: "#platforms" },
        { name: "Young Minds", desc: "Training for the next generation of leaders.", url: "#platforms" },
        { name: "CareerNext", desc: "Strategic professional placement index.", url: "#platforms" },
      ],
    },
    Capital: {
      title: "Capital",
      tagline: "Structured Financial Funding & Restructuring Advisory",
      icon: <FaCoins className="text-2xl" />,
      disciplines: ["Litigation Funding", "Arbitration Finance", "Corporate Restructuring", "Venture Growth Support"],
      capabilities: [
        "Non-recourse litigation funding for high-stakes commercial disputes (WOBT Capital).",
        "Corporate turnaround and Insolvency & Bankruptcy Code support (WOBT Resurge).",
        "Co-investing structures aligning institutional funding with merit-based litigation.",
        "Practice-expansion capital support for select regional law offices.",
      ],
      brands: [
        { name: "WOBT Capital", desc: "India's trusted non-recourse dispute funding.", url: "#wobt-capital" },
        { name: "Resurge", desc: "Corporate debt restructuring and IBC resolution.", url: "#platforms" },
        { name: "Launchpad", desc: "Venture incubation and capitalization advisory.", url: "#platforms" },
      ],
    },
    Justice: {
      title: "Justice",
      tagline: "Dispute Resolution, Risk, and Compliance Platforms",
      icon: <FaBalanceScale className="text-2xl" />,
      disciplines: ["Law & Advocacy", "Alternative Dispute Resolution", "Mediation", "Compliance & Risk Governance"],
      capabilities: [
        "Structured cross-border coordination for complex global matters (LexPartners).",
        "Institutional mediation, arbitration, and dispute neutral facilities (LexMediate).",
        "Secure, tamper-evident digital evidence custody and tracking (LawBox).",
        "Statutory compliance reporting and corporate risk management (LexComply).",
      ],
      brands: [
        { name: "LexPartners", desc: "Vetted international advocate network.", url: "#platforms" },
        { name: "LexMediate", desc: "Commercial dispute mediation framework.", url: "#platforms" },
        { name: "LawBox", desc: "Tamper-evident digital evidence repository.", url: "#platforms" },
        { name: "LexComply", desc: "Automated regulatory compliance maps.", url: "#platforms" },
        { name: "LexODR", desc: "Online dispute resolution portals.", url: "#platforms" },
      ],
    },
    Society: {
      title: "Society",
      tagline: "Cybersecurity, IP Protection, & Public Policy Initiatives",
      icon: <FaUsers className="text-2xl" />,
      disciplines: ["Public Policy & Governance", "Cybersecurity Advisory", "IP & Brand Protection", "Community & Environment"],
      capabilities: [
        "Cyber threat response, containment, and liability mitigation (CyberShield).",
        "Intellectual property registry protection and trademark monitoring.",
        "Forensic auditing of physical, digital, and signature assets.",
        "Independent academic advocacy for responsible legislative frameworks.",
      ],
      brands: [
        { name: "CyberShield", desc: "Advanced operational cybersecurity advice.", url: "#platforms" },
        { name: "Brand Protector", desc: "IP monitoring and trademark defense.", url: "#platforms" },
        { name: "Trace & Hunt", desc: "Forensic and asset tracing investigation.", url: "#platforms" },
        { name: "Cyber Recover", desc: "Security incident recovery advisory.", url: "#platforms" },
        { name: "e-Contract360", desc: "Digital contract lifecycle management.", url: "#platforms" },
      ],
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Sidebar Tabs */}
      <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-3 pb-4 lg:pb-0 scrollbar-none">
        {Object.keys(pillars).map((key) => {
          const isActive = activePillar === key;
          return (
            <button
              key={key}
              onClick={() => setActivePillar(key)}
              className={`flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-xl border text-left transition-all duration-300 w-[200px] lg:w-full cursor-pointer focus:outline-none ${
                isActive
                  ? "bg-[#C8A34A0D] border-[#C8A34A] text-white shadow-[0_0_15px_rgba(200,163,74,0.06)]"
                  : "bg-[#030303]/40 border-gray-900 text-gray-500 hover:border-gray-800 hover:text-gray-300"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  isActive ? "bg-[#C8A34A] text-[#090909]" : "bg-gray-900/50 text-gray-400"
                }`}
              >
                {pillars[key].icon}
              </div>
              <div>
                <h3 className="font-serif text-sm font-semibold tracking-wide uppercase">
                  {pillars[key].title}
                </h3>
                <span className="text-[10px] text-gray-500 hidden lg:inline block truncate max-w-[150px]">
                  {pillars[key].tagline}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explorer Content */}
      <div className="lg:col-span-8 bg-[#030303]/60 border border-gray-900 rounded-2xl p-6 lg:p-10 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#C8A34A08] blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-6 animate-fade-in">
          <div>
            <span className="text-[10px] text-[#C8A34A] font-bold uppercase tracking-widest">
              Institutional Pillar
            </span>
            <h2 className="font-serif text-2xl lg:text-3xl text-white font-bold tracking-wide mt-1">
              {pillars[activePillar].title}
            </h2>
            <p className="text-xs text-gray-400 mt-2 font-medium">
              {pillars[activePillar].tagline}
            </p>
          </div>

          <div className="h-[1px] bg-gray-900" />

          {/* Sub-disciplines */}
          <div>
            <h4 className="text-[11px] text-gray-500 uppercase tracking-widest font-semibold mb-3">
              Key Disciplines
            </h4>
            <div className="flex flex-wrap gap-2">
              {pillars[activePillar].disciplines.map((disc) => (
                <span
                  key={disc}
                  className="px-3 py-1.5 rounded-full bg-gray-950 border border-gray-800 text-[11px] text-gray-300"
                >
                  {disc}
                </span>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="text-[11px] text-gray-500 uppercase tracking-widest font-semibold mb-3.5">
              Scope of Initiatives
            </h4>
            <ul className="flex flex-col gap-3">
              {pillars[activePillar].capabilities.map((cap, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-gray-400 leading-relaxed">
                  <FiCheckCircle className="text-[#C8A34A] text-sm mt-0.5 flex-shrink-0" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Grid */}
          <div className="mt-4 pt-6 border-t border-gray-900">
            <h4 className="text-[11px] text-gray-500 uppercase tracking-widest font-semibold mb-4">
              Pillar Platforms
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars[activePillar].brands.map((brand) => (
                <a
                  key={brand.name}
                  href={brand.url}
                  className="p-4 rounded-xl bg-gray-950 border border-gray-900 hover:border-[#C8A34A40] group transition-all duration-300 flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-serif text-white font-semibold text-xs tracking-wider uppercase group-hover:text-[#C8A34A] transition-colors">
                      {brand.name}
                    </h5>
                    <p className="text-[10px] text-gray-500 mt-1 max-w-[200px] line-clamp-1">
                      {brand.desc}
                    </p>
                  </div>
                  <FiChevronRight className="text-gray-600 group-hover:text-[#C8A34A] group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
