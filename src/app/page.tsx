"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleNetwork from "@/components/ParticleNetwork";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import EcosystemExplorer from "@/components/EcosystemExplorer";
import ConstitutionShowcase from "@/components/ConstitutionShowcase";
import SmoothScroll from "@/components/SmoothScroll";
import { FiArrowRight, FiSearch, FiSliders, FiClock, FiMapPin, FiMail, FiCalendar, FiUser, FiInfo } from "react-icons/fi";
import { FaGraduationCap, FaCoins, FaBalanceScale, FaUsers } from "react-icons/fa";

export default function Home() {
  // WOBT Capital / Litigation Funding state
  const [activeCapitalTab, setActiveCapitalTab] = useState<"clients" | "lawfirms" | "investors">("clients");

  // Research filter states
  const [researchFilter, setResearchFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "Membership Application",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Capital evaluations request
  const [evalSubmitted, setEvalSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: "", email: "", subject: "Membership Application", message: "" });
    }, 5000);
  };

  const liveBrands = [
    { name: "LexManage", pillar: "Justice", desc: "Litigation Management & case tracking." },
    { name: "LexMediate", pillar: "Justice", desc: "Institutional commercial mediation and ADR." },
    { name: "LexPartners", pillar: "Justice", desc: "Global vetted network for cross-border disputes." },
    { name: "LexComply", pillar: "Justice", desc: "Statutory compliance mappings and risk oversight." },
    { name: "Launchpad", pillar: "Capital", desc: "Startup capitalization and venture growth support." },
    { name: "Resurge", pillar: "Capital", desc: "Corporate debt restructuring and insolvency resolution." },
    { name: "PartnerGrow", pillar: "Knowledge", desc: "Skills updating and certification for advocates." },
    { name: "Trace & Hunt", pillar: "Society", desc: "Forensic audits, asset tracing and investigations." },
    { name: "Brand Protector", pillar: "Society", desc: "Trademark monitoring and intellectual property defense." },
    { name: "LawBox", pillar: "Justice", desc: "Tamper-evident custody for digital legal records." },
    { name: "e-Contract360", pillar: "Society", desc: "Full-lifecycle digital contract management." },
    { name: "LexAI", pillar: "Knowledge", desc: "Context-aware legal research and drafting tools." },
    { name: "LexODR", pillar: "Justice", desc: "Online dispute neutrals and e-filing systems." },
    { name: "NightWatch", pillar: "Society", desc: "24/7 digital system vulnerability checking." },
    { name: "Cyber Recover", pillar: "Society", desc: "Incident response and post-breach mitigation." },
    { name: "CyberShield", pillar: "Society", desc: "Institutional advisory on cybersecurity hygiene." },
    { name: "LexCrypto", pillar: "Justice", desc: "Blockchain audit and digital asset dispute advisory." },
    { name: "Young Minds", pillar: "Knowledge", desc: "Internships and mentoring index for young legal minds." },
    { name: "CareerNext", pillar: "Knowledge", desc: "Executive placement register for senior professionals." },
  ];

  const researchPapers = [
    {
      title: "The Emergence of Third-Party Litigation Funding in India: Regulatory Paradigms",
      author: "WOBT Capital Research Council",
      type: "whitepapers",
      readTime: "12 min read",
      date: "May 2026",
    },
    {
      title: "Data Sovereignty & Legal Frameworks: Managing Audits under the DPDP Act 2023",
      author: "WOBT Society Policy Council",
      type: "policy",
      readTime: "18 min read",
      date: "June 2026",
    },
    {
      title: "A Comparative Analysis of AI Drafting Models in Civil Law Systems",
      author: "WOBT AI Research Labs",
      type: "ai",
      readTime: "15 min read",
      date: "April 2026",
    },
    {
      title: "Insolvency Resolution Benchmarks: Restructuring Distressed Assets post-2025",
      author: "WOBT Capital Resurge Advisory",
      type: "whitepapers",
      readTime: "22 min read",
      date: "July 2026",
    },
  ];

  const filteredResearch = researchPapers.filter((paper) => {
    const matchesFilter = researchFilter === "all" || paper.type === researchFilter;
    const matchesSearch =
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <SmoothScroll>
      <div className="relative min-h-screen">
        {/* Grain overlay for luxury feel */}
        <div className="noise-overlay" />

        {/* Global Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-gradient-to-b from-[#030303] via-[#090909] to-[#090909]">
          <ParticleNetwork />
          
          {/* Ambient Gold Radial Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] gold-glow-radial pointer-events-none opacity-80" />

          <div className="max-w-7xl mx-auto px-6 z-10 text-center flex flex-col items-center">
            {/* Soft gold pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8A34A08] border border-[#C8A34A26] text-[#C8A34A] text-xs font-semibold tracking-widest uppercase mb-8 select-none shadow-[0_0_15px_rgba(200,163,74,0.03)] animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A34A]" />
              GLOBAL MULTIDISCIPLINARY PROFESSIONAL INSTITUTION
            </div>

            {/* Giant Title */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl text-white font-extrabold tracking-wider leading-[1.1] mb-6">
              WHITE OWLS &amp;<br />
              <span className="gold-text-gradient">BLACK TIGERS</span>
            </h1>

            {/* Timeless Subtitles */}
            <p className="text-gray-300 text-base sm:text-xl font-medium tracking-wide max-w-2xl mb-8 leading-relaxed">
              Where Wisdom Meets Courage. Where Professionals Shape the Future.
              <br />
              <span className="text-[#C8A34A] font-serif tracking-widest text-xs uppercase block mt-3 font-semibold">
                Wisdom to Imagine. Courage to Execute. Excellence to Transform.
              </span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center">
              <a
                href="#ecosystem"
                className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C8A34A] hover:bg-white hover:text-[#090909] transition-all duration-300 shadow-[0_0_15px_rgba(200,163,74,0.3)] hover:scale-103"
              >
                Explore the Ecosystem
              </a>
              <a
                href="#membership"
                className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-gray-700 hover:border-[#C8A34A] hover:text-[#C8A34A] transition-all duration-300 bg-transparent hover:scale-103"
              >
                Become a Member
              </a>
            </div>

            {/* Mini pillars footer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl border-t border-gray-900 pt-10 text-gray-500 text-xs font-semibold uppercase tracking-widest">
              <div className="flex flex-col items-center gap-1">
                <span className="text-white font-serif tracking-wider">Knowledge</span>
                <span className="text-[10px] text-gray-600 font-sans">Research &amp; AI</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-l border-gray-900/50">
                <span className="text-white font-serif tracking-wider">Capital</span>
                <span className="text-[10px] text-gray-600 font-sans">dispute finance</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-l border-gray-900/50">
                <span className="text-white font-serif tracking-wider">Justice</span>
                <span className="text-[10px] text-gray-600 font-sans">law &amp; governance</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-l border-gray-900/50">
                <span className="text-white font-serif tracking-wider">Society</span>
                <span className="text-[10px] text-gray-600 font-sans">policy &amp; security</span>
              </div>
            </div>
          </div>
        </section>

        {/* About WOBT & Philosophy Section */}
        <section id="about" className="py-32 relative bg-[#090909] border-t border-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                Our Genesis
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide mt-2">
                Every Enduring Institution Begins With An Idea
              </h2>
              <div className="w-12 h-[1px] bg-[#C8A34A] mx-auto mt-6" />
              <p className="text-xs text-gray-400 mt-6 leading-relaxed font-medium">
                White Owls &amp; Black Tigers (WOBT) was founded on a simple belief: the world&apos;s greatest opportunities and most complex challenges can no longer be solved by a single profession. They require the collective intelligence of experts from diverse disciplines working together with a shared purpose.
              </p>
              <p className="text-xs text-gray-400 mt-4 leading-relaxed font-medium">
                WOBT is a global multidisciplinary professional ecosystem that brings together expertise across law, finance, technology, business, governance, research, academia, innovation, and public policy. Rather than being defined by any one profession, WOBT is defined by excellence, integrity, innovation, and collaboration.
              </p>
            </div>

            {/* Split cards: Owl vs Tiger */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-24">
              {/* The White Owl Card */}
              <div className="glass-gold rounded-2xl p-8 lg:p-12 relative overflow-hidden group flex flex-col justify-between border-t-2 border-t-[#C8A34A] transition-all duration-500 hover:translate-y-[-4px]">
                <div>
                  <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest font-mono">
                    Volume I. Section 1
                  </span>
                  <h3 className="font-serif text-2xl lg:text-3xl text-white font-bold tracking-wide mt-4 mb-6">
                    The White Owl
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6 font-medium">
                    The White Owl derives its inspiration from the <em>vahana</em> of Goddess Lakshmi, symbolising prosperity, abundance, and good fortune in Indian tradition. Across the world, the owl has long represented wisdom, intelligence, knowledge, foresight, and the ability to see opportunities beyond the obvious.
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">
                    Within WOBT, the White Owl represents <strong>intellectual capital</strong>. It symbolises researchers, innovators, entrepreneurs, technologists, scientists, financial experts, strategists, educators, consultants, investors, business leaders, and every professional whose knowledge creates value, advances ideas, and drives progress.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-[#C8A34A1F] flex items-center justify-between text-xs text-gray-500">
                  <span className="font-serif uppercase tracking-widest font-semibold text-[#C8A34A]/80">
                    Intellectual Capital
                  </span>
                  <span>Curiosity &amp; Innovation</span>
                </div>
              </div>

              {/* The Black Tiger Card */}
              <div className="glass rounded-2xl p-8 lg:p-12 relative overflow-hidden group flex flex-col justify-between border-t-2 border-t-[#C8A34A] transition-all duration-500 hover:translate-y-[-4px]">
                <div>
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest font-mono">
                    Volume I. Section 2
                  </span>
                  <h3 className="font-serif text-2xl lg:text-3xl text-white font-bold tracking-wide mt-4 mb-6">
                    The Black Tiger
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6 font-medium">
                    The Black Tiger represents courage, leadership, discipline, resilience, responsibility, and decisive execution. Its black colour reflects professionalism, integrity, and the commitment to uphold justice, ethics, governance, and accountability.
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">
                    While inspired by the black attire traditionally associated with the legal profession, the Black Tiger represents a much broader philosophy—protecting institutions, managing risk, resolving disputes, enforcing standards, and leading with conviction across advocacy, compliance, risk, and regulation.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-900 flex items-center justify-between text-xs text-gray-500">
                  <span className="font-serif uppercase tracking-widest font-semibold text-white/80">
                    Decisive Execution
                  </span>
                  <span>Courage &amp; Leadership</span>
                </div>
              </div>
            </div>

            {/* Philosophy text panel */}
            <div className="bg-[#030303]/60 border border-gray-900 rounded-2xl p-8 lg:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-[#C8A34A05] blur-2xl pointer-events-none" />
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-4">
                Our Foundational Philosophy
              </span>
              <p className="font-serif text-lg sm:text-2xl text-white leading-relaxed tracking-wide italic">
                &ldquo;Knowledge creates opportunity. Courage transforms opportunity into achievement. The White Owl represents the imagination to innovate; the Black Tiger represents the resolve to execute and protect.&rdquo;
              </p>
              <div className="h-[1px] bg-gray-950 max-w-xs mx-auto my-6" />
              <span className="text-[10px] text-[#C8A34A] tracking-wider uppercase font-semibold">
                White Owls &amp; Black Tigers Private Ltd
              </span>
            </div>
          </div>
        </section>

        {/* Interactive Ecosystem Section */}
        <section id="ecosystem" className="py-32 bg-[#030303]/30 border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                Our Structure
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide mt-2">
                An Ecosystem of Excellence
              </h2>
              <div className="w-12 h-[1px] bg-[#C8A34A] mx-auto mt-6" />
              <p className="text-xs text-gray-500 mt-4 leading-relaxed font-medium">
                WOBT is an umbrella institution that operates specialized verticals across four core pillars, bringing professionals together on one unified registry.
              </p>
            </div>

            <EcosystemExplorer />
          </div>
        </section>

        {/* Live Brands Directory Slider */}
        <section id="platforms" className="py-24 bg-[#090909] border-t border-gray-950 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
              Active Directory
            </span>
            <h2 className="font-serif text-2xl lg:text-3xl text-white font-bold tracking-wide mt-2">
              Nineteen Specialist Verticals. One Coordinated Platform.
            </h2>
            <p className="text-xs text-gray-500 mt-2 font-medium">
              Each vertical is staffed by dedicated legal, financial, or operational experts—engaged individually or together depending on the matter.
            </p>
          </div>

          {/* Scrolling Marquee Slider */}
          <div className="w-full flex overflow-x-hidden py-4 border-y border-gray-900/60 bg-[#030303]/40">
            <div className="animate-marquee gap-6">
              {[...liveBrands, ...liveBrands].map((brand, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-64 p-5 rounded-xl bg-[#0E0E0E] border border-gray-900/80 shadow flex flex-col gap-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-serif text-white font-bold text-xs uppercase tracking-wider group-hover:text-[#C8A34A] transition-colors">
                      {brand.name}
                    </h5>
                    <span className="px-2 py-0.5 rounded-full bg-gray-950 border border-gray-800 text-[8px] text-gray-500 uppercase tracking-widest">
                      {brand.pillar}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                    {brand.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WOBT Capital - Litigation Funding Section */}
        <section id="wobt-capital" className="py-32 bg-[#030303]/20 border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
              <div className="lg:col-span-7">
                <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                  WOBT Capital
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold tracking-wide mt-2 mb-6 leading-tight">
                  You Have a Strong Case.<br /> Don&apos;t Let Money Stop You From Winning It.
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed font-medium mb-6">
                  India&apos;s trusted litigation finance partner—for businesses and individuals pursuing high-stakes commercial disputes and arbitrations, and for the law firms fighting those matters on their behalf. WOBT Capital provides third-party funding to domestic clients in select, meritorious matters on a non-recourse basis.
                </p>
                <div className="flex items-center gap-6 text-xs text-[#C8A34A] font-semibold tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A34A]" /> No Upfront Costs
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A34A]" /> No Repayment If You Lose
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A34A]" /> Decisions In Days
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-5 bg-gradient-to-br from-[#0E0E0E] to-[#030303] border border-gray-900 p-8 rounded-2xl relative">
                <h3 className="font-serif text-white font-bold text-sm uppercase tracking-wider mb-6 text-center">
                  Request Case Evaluation
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEvalSubmitted(true);
                    setTimeout(() => setEvalSubmitted(false), 5000);
                  }}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="text"
                    placeholder="Claimant Name"
                    className="w-full bg-[#090909] border border-gray-800 focus:border-[#C8A34A] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Professional Email"
                    className="w-full bg-[#090909] border border-gray-800 focus:border-[#C8A34A] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Claim Value (e.g. 5 Cr+)"
                    className="w-full bg-[#090909] border border-gray-800 focus:border-[#C8A34A] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                    required
                  />
                  <textarea
                    placeholder="Brief description of the dispute merits..."
                    rows={3}
                    className="w-full bg-[#090909] border border-gray-800 focus:border-[#C8A34A] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#C8A34A] hover:bg-white text-[#090909] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Merits Review
                  </button>
                  {evalSubmitted && (
                    <span className="text-[10px] text-[#C8A34A] text-center mt-1 block">
                      Case details securely queued for evaluation by our legal desk.
                    </span>
                  )}
                </form>
              </div>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#030303]/60 border border-gray-900 rounded-2xl p-8 mb-16 text-center">
              <div>
                <span className="font-serif text-3xl lg:text-4xl text-white font-extrabold tracking-wide block">
                  100 Cr+
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1.5 block">
                  Capital Support Capacity
                </span>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-gray-900 pt-6 sm:pt-0">
                <span className="font-serif text-3xl lg:text-4xl text-white font-extrabold tracking-wide block">
                  500+
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1.5 block">
                  Advocates Registry
                </span>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-gray-900 pt-6 sm:pt-0">
                <span className="font-serif text-3xl lg:text-4xl text-white font-extrabold tracking-wide block">
                  150+
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1.5 block">
                  Associated Law Offices
                </span>
              </div>
            </div>

            {/* Profile Tabs */}
            <div className="mb-20">
              <div className="flex border-b border-gray-900 gap-4 mb-8 justify-center">
                <button
                  onClick={() => setActiveCapitalTab("clients")}
                  className={`pb-4 text-xs uppercase tracking-wider font-bold transition-colors focus:outline-none cursor-pointer ${
                    activeCapitalTab === "clients" ? "text-[#C8A34A] border-b-2 border-b-[#C8A34A]" : "text-gray-500"
                  }`}
                >
                  For Claimants
                </button>
                <button
                  onClick={() => setActiveCapitalTab("lawfirms")}
                  className={`pb-4 text-xs uppercase tracking-wider font-bold transition-colors focus:outline-none cursor-pointer ${
                    activeCapitalTab === "lawfirms" ? "text-[#C8A34A] border-b-2 border-b-[#C8A34A]" : "text-gray-500"
                  }`}
                >
                  For Law Firms
                </button>
                <button
                  onClick={() => setActiveCapitalTab("investors")}
                  className={`pb-4 text-xs uppercase tracking-wider font-bold transition-colors focus:outline-none cursor-pointer ${
                    activeCapitalTab === "investors" ? "text-[#C8A34A] border-b-2 border-b-[#C8A34A]" : "text-gray-500"
                  }`}
                >
                  For Investors
                </button>
              </div>

              <div className="bg-[#030303]/40 border border-gray-900 p-8 rounded-2xl max-w-4xl mx-auto">
                {activeCapitalTab === "clients" && (
                  <div>
                    <h4 className="font-serif text-white font-semibold text-lg mb-4">
                      Pursue Meritorious Claims Without Cash Flow Risk
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4 font-medium">
                      If your enterprise or commercial interest has suffered material damage or claims contract breaches, WOBT Capital covers the legal costs—court fees, advocate fee schedules, arbitral seat costs, expert witnesses, and evidentiary discoveries. 
                    </p>
                    <p className="text-xs text-[#C8A34A] leading-relaxed font-semibold">
                      Under our non-recourse structure, you owe nothing back if the case is unsuccessful. Recovery is extracted exclusively from proceeds upon resolution.
                    </p>
                  </div>
                )}
                {activeCapitalTab === "lawfirms" && (
                  <div>
                    <h4 className="font-serif text-white font-semibold text-lg mb-4">
                      Backing Law Firms with Immediate Operational Liquidity
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4 font-medium">
                      WOBT Capital funds law firms directly to sustain complex commercial disputes and arbitration schedules. Instead of forcing clients to bear heavy cash flow strains or delaying litigation, we supply the backing to maintain matters to final resolution.
                    </p>
                    <p className="text-xs text-[#C8A34A] leading-relaxed font-semibold">
                      This enables regional advocate networks to take on high-stakes, meritorious representations without absorbing case-carrying risk.
                    </p>
                  </div>
                )}
                {activeCapitalTab === "investors" && (
                  <div>
                    <h4 className="font-serif text-white font-semibold text-lg mb-4">
                      Sovereign-Grade Legal Asset Classes
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4 font-medium">
                      WOBT provides institutional capital deployers and qualified partners with structured access to vetted, high-value commercial claims. Every file is strictly audited by our legal desk, Chartered Accountants, and forensic labs for merit, enforceability, and recovery viability.
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed italic">
                      Disclaimer: WOBT is not registered with SEBI in any capacity, and litigation funding is not structured as a public deposit or standard security asset.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* WOBT Capital FAQs */}
            <div>
              <h3 className="font-serif text-xl text-white font-bold tracking-wide mb-8 text-center">
                Litigation Funding Protocols (FAQ)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="p-6 rounded-xl bg-[#090909] border border-gray-900">
                  <h4 className="font-serif text-[#C8A34A] text-xs font-semibold uppercase tracking-wider mb-2">
                    How is the recovery valuation calculated?
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Funding is provided on a non-recourse basis—if the matter fails, the funded party owes WOBT nothing. Upon a successful outcome, WOBT is entitled to an agreed percentage or structured multiple of recovery proceeds, as pre-defined in the specific funding agreement.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-[#090909] border border-gray-900">
                  <h4 className="font-serif text-[#C8A34A] text-xs font-semibold uppercase tracking-wider mb-2">
                    What is the typical due diligence timeline?
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Our initial evaluation phase spans 2 to 4 weeks. During this period, our forensic labs and expert councils review documents, verify signatures/evidences, and evaluate legal merits before drafting funding structures.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-[#090909] border border-gray-900">
                  <h4 className="font-serif text-[#C8A34A] text-xs font-semibold uppercase tracking-wider mb-2">
                    What is the minimum claim value considered?
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    We typically evaluate matters with a minimum expected recovery quantum that ensures viable post-litigation returns for the claimant and aligns with the carrying cost of institutional dispute finance.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-[#090909] border border-gray-900">
                  <h4 className="font-serif text-[#C8A34A] text-xs font-semibold uppercase tracking-wider mb-2">
                    What are the portfolio reporting requirements?
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Law firms and funded clients submit milestone-based or quarterly case status updates directly via WOBT LexManage, ensuring full compliance, hearing timeline tracking, and transparency throughout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The WOBT Constitution & 100-Year Timeline Section */}
        <section className="py-32 bg-[#090909] border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                Our Foundation
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide mt-2">
                The WOBT Constitution
              </h2>
              <div className="w-12 h-[1px] bg-[#C8A34A] mx-auto mt-6" />
              <p className="text-xs text-gray-500 mt-4 leading-relaxed font-medium">
                The defining charter of a 100-year institution. Volume by volume, drafting WOBT&apos;s roadmap from the present to 2050.
              </p>
            </div>

            <ConstitutionShowcase />
          </div>
        </section>

        {/* Membership Section */}
        <section id="membership" className="py-32 bg-[#030303]/30 border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                Fellowship
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide mt-2">
                Join the Multidisciplinary Ecosystem
              </h2>
              <div className="w-12 h-[1px] bg-[#C8A34A] mx-auto mt-6" />
              <p className="text-xs text-gray-500 mt-4 leading-relaxed font-medium">
                Affiliation with WOBT connects professionals, academics, and institutional leaders, offering structured collaboration across borders.
              </p>
            </div>

            {/* Membership Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              
              {/* Individual Professional */}
              <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-gray-900/60 hover:border-[#C8A34A4D] transition-all flex flex-col justify-between group">
                <div>
                  <span className="text-[10px] text-[#C8A34A] font-bold uppercase tracking-widest">
                    Standard Registry
                  </span>
                  <h3 className="font-serif text-lg text-white font-semibold tracking-wide mt-2">
                    Professional Member
                  </h3>
                  <div className="h-[1px] bg-gray-900 my-4" />
                  <ul className="flex flex-col gap-2.5 text-xs text-gray-400">
                    <li className="flex items-center gap-2">✓ Global Chapters directory list</li>
                    <li className="flex items-center gap-2">✓ LexManage tracking tool</li>
                    <li className="flex items-center gap-2">✓ Standard research journal access</li>
                  </ul>
                </div>
                <div className="mt-8">
                  <a
                    href="#contact"
                    className="w-full text-center block py-2.5 rounded-lg border border-gray-800 text-xs font-bold uppercase tracking-wider text-white hover:border-[#C8A34A] transition-colors"
                  >
                    Apply for Admission
                  </a>
                </div>
              </div>

              {/* Corporate Partner */}
              <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-gray-900/60 hover:border-[#C8A34A4D] transition-all flex flex-col justify-between group">
                <div>
                  <span className="text-[10px] text-[#C8A34A] font-bold uppercase tracking-widest">
                    Enterprise
                  </span>
                  <h3 className="font-serif text-lg text-white font-semibold tracking-wide mt-2">
                    Corporate Member
                  </h3>
                  <div className="h-[1px] bg-gray-900 my-4" />
                  <ul className="flex flex-col gap-2.5 text-xs text-gray-400">
                    <li className="flex items-center gap-2">✓ Corporate governance advisory</li>
                    <li className="flex items-center gap-2">✓ Enterprise compliance portals</li>
                    <li className="flex items-center gap-2">✓ Strategic funding priority reviews</li>
                  </ul>
                </div>
                <div className="mt-8">
                  <a
                    href="#contact"
                    className="w-full text-center block py-2.5 rounded-lg border border-gray-800 text-xs font-bold uppercase tracking-wider text-white hover:border-[#C8A34A] transition-colors"
                  >
                    Partner Admission
                  </a>
                </div>
              </div>

              {/* Academic Affiliation */}
              <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-gray-900/60 hover:border-[#C8A34A4D] transition-all flex flex-col justify-between group">
                <div>
                  <span className="text-[10px] text-[#C8A34A] font-bold uppercase tracking-widest">
                    Educational
                  </span>
                  <h3 className="font-serif text-lg text-white font-semibold tracking-wide mt-2">
                    University Member
                  </h3>
                  <div className="h-[1px] bg-gray-900 my-4" />
                  <ul className="flex flex-col gap-2.5 text-xs text-gray-400">
                    <li className="flex items-center gap-2">✓ Research council publications</li>
                    <li className="flex items-center gap-2">✓ Academy certification credits</li>
                    <li className="flex items-center gap-2">✓ Mentoring registries (Young Minds)</li>
                  </ul>
                </div>
                <div className="mt-8">
                  <a
                    href="#contact"
                    className="w-full text-center block py-2.5 rounded-lg border border-gray-800 text-xs font-bold uppercase tracking-wider text-white hover:border-[#C8A34A] transition-colors"
                  >
                    Academic Request
                  </a>
                </div>
              </div>

              {/* Distinguished Fellow */}
              <div className="p-6 rounded-2xl bg-[#0F0D09] border border-[#C8A34A26] hover:border-[#C8A34A80] transition-all flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#C8A34A] text-[#090909] text-[8px] font-bold tracking-widest uppercase rounded-bl">
                  Invited
                </div>
                <div>
                  <span className="text-[10px] text-[#C8A34A] font-bold uppercase tracking-widest">
                    Prestige Tiers
                  </span>
                  <h3 className="font-serif text-lg text-white font-semibold tracking-wide mt-2">
                    Distinguished Fellow
                  </h3>
                  <div className="h-[1px] bg-[#C8A34A12] my-4" />
                  <ul className="flex flex-col gap-2.5 text-xs text-gray-400">
                    <li className="flex items-center gap-2">✓ Council seats assignment</li>
                    <li className="flex items-center gap-2">✓ Policy formulation forums</li>
                    <li className="flex items-center gap-2">✓ International chapter leadership</li>
                  </ul>
                </div>
                <div className="mt-8">
                  <a
                    href="#contact"
                    className="w-full text-center block py-2.5 rounded-lg bg-[#C8A34A] text-[#090909] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    Nominate Scholar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research registry section */}
        <section id="research" className="py-32 bg-[#090909] border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                  Think Tank
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide mt-2">
                  Institutional Research
                </h2>
                <p className="text-xs text-gray-500 mt-2 font-medium">
                  Peer-reviewed whitepapers, publications, and legislative reviews published by WOBT Councils.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {["all", "whitepapers", "policy", "ai"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setResearchFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                      researchFilter === filter
                        ? "bg-[#C8A34A] text-[#090909]"
                        : "bg-gray-950 border border-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    {filter === "all" ? "All Research" : filter === "ai" ? "AI Labs" : filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative max-w-lg mb-10">
              <FiSearch className="absolute left-4 top-3.5 text-gray-500 text-base" />
              <input
                type="text"
                placeholder="Search by publication keyword or council..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#030303] border border-gray-800 focus:border-[#C8A34A] rounded-xl py-3 pl-12 pr-4 text-xs text-white focus:outline-none placeholder-gray-600"
              />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResearch.length > 0 ? (
                filteredResearch.map((paper, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#030303]/60 border border-gray-900 hover:border-gray-800 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-4 text-[10px] text-gray-500 font-semibold mb-3">
                        <span className="px-2 py-0.5 rounded bg-gray-950 border border-gray-800 uppercase tracking-widest text-[#C8A34A]">
                          {paper.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiClock /> {paper.readTime}
                        </span>
                      </div>
                      <h3 className="font-serif text-white text-base font-bold tracking-wide leading-relaxed group-hover:text-[#C8A34A] transition-colors mb-4">
                        {paper.title}
                      </h3>
                    </div>
                    <div className="flex justify-between items-center text-xs border-t border-gray-950 pt-4 mt-4 text-gray-500">
                      <span>{paper.author}</span>
                      <span>{paper.date}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-20 text-gray-500 text-xs italic font-serif">
                  No publications match the filters or search keywords.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Global Council Events Calendar */}
        <section id="events" className="py-32 bg-[#030303]/30 border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                Calendar
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide mt-2">
                Global Conferences &amp; Councils
              </h2>
              <div className="w-12 h-[1px] bg-[#C8A34A] mx-auto mt-6" />
              <p className="text-xs text-gray-500 mt-4 leading-relaxed font-medium">
                Confronting global commercial challenges. Registration and seating agendas for upcoming multidisciplinary sessions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Event 1 */}
              <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-gray-900/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <FiCalendar className="text-[#C8A34A]" />
                    <span>August 14, 2026</span>
                  </div>
                  <h3 className="font-serif text-white font-semibold text-base mb-2">
                    Delhi Litigation Finance Summit
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
                    Panel sessions on third-party funding models, structuring non-recourse disputes, and quantum forensic modeling.
                  </p>
                </div>
                <div className="border-t border-gray-950 pt-4 flex justify-between items-center text-xs">
                  <span className="text-gray-500">Taj Mahal Hotel, Delhi</span>
                  <a href="#contact" className="text-[#C8A34A] font-bold hover:underline">Register Seating →</a>
                </div>
              </div>

              {/* Event 2 */}
              <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-gray-900/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <FiCalendar className="text-[#C8A34A]" />
                    <span>September 22, 2026</span>
                  </div>
                  <h3 className="font-serif text-white font-semibold text-base mb-2">
                    Geneva Digital Justice Round Table
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
                    Evaluating cryptocurrency dispute frameworks, smart-contract arbitrations, and digital evidence standards.
                  </p>
                </div>
                <div className="border-t border-gray-950 pt-4 flex justify-between items-center text-xs">
                  <span className="text-gray-500">Geneva Secretariat, CH</span>
                  <a href="#contact" className="text-[#C8A34A] font-bold hover:underline">Request Invitation →</a>
                </div>
              </div>

              {/* Event 3 */}
              <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-gray-900/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <FiCalendar className="text-[#C8A34A]" />
                    <span>October 08, 2026</span>
                  </div>
                  <h3 className="font-serif text-white font-semibold text-base mb-2">
                    Singapore Compliance &amp; AI Forums
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
                    Exploring DPDP Act corporate alignments, cross-border privacy boundaries, and autonomous legal agent frameworks.
                  </p>
                </div>
                <div className="border-t border-gray-950 pt-4 flex justify-between items-center text-xs">
                  <span className="text-gray-500">Marina Bay Sands, SG</span>
                  <a href="#contact" className="text-[#C8A34A] font-bold hover:underline">Register Seating →</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Contact & Global Node map Section */}
        <section id="contact" className="py-32 bg-[#090909] border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Map/Globe Node Column */}
              <div className="lg:col-span-5 flex flex-col gap-8 justify-center">
                <div>
                  <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                    Chapters
                  </span>
                  <h2 className="font-serif text-3xl text-white font-bold tracking-wide mt-2">
                    Global Chapters Map
                  </h2>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    WOBT operates secreteariats and hubs across major cities. Rotate and hover nodes on our global index mapping.
                  </p>
                </div>
                
                <InteractiveGlobe />
              </div>

              {/* Booking and contact form column */}
              <div className="lg:col-span-7 bg-[#030303]/60 border border-gray-900 rounded-2xl p-8 lg:p-10 relative">
                <div>
                  <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest font-mono">
                    Volume I. Section 12
                  </span>
                  <h2 className="font-serif text-2xl text-white font-bold tracking-wide mt-2 mb-6">
                    Book Consultation or Apply
                  </h2>
                </div>

                <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="bg-[#090909] border border-gray-800 focus:border-[#C8A34A] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                        Professional Email
                      </label>
                      <input
                        type="email"
                        placeholder="johndoe@institution.org"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="bg-[#090909] border border-gray-800 focus:border-[#C8A34A] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                      Subject
                    </label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="bg-[#090909] border border-gray-800 focus:border-[#C8A34A] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                    >
                      <option value="Membership Application">Membership Admission Registry</option>
                      <option value="Litigation Finance Enquiry">WOBT Capital Case Funding</option>
                      <option value="Academic Collaboration">University Chapter Partnership</option>
                      <option value="Policy Council Inquiry">Research &amp; Think Tank Advice</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                      Your Message
                    </label>
                    <textarea
                      placeholder="Outline your application proposal or dispute query in detail..."
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="bg-[#090909] border border-gray-800 focus:border-[#C8A34A] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-[#C8A34A] hover:bg-white text-[#090909] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Official Request
                  </button>

                  {formSubmitted && (
                    <div className="p-3 rounded bg-[#C8A34A0F] border border-[#C8A34A26] text-[10px] text-[#C8A34A] text-center">
                      Your institutional registry request has been securely processed. A WOBT Compliance Officer will respond shortly.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
