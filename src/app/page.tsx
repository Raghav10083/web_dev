"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleNetwork from "@/components/ParticleNetwork";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import EcosystemGraph from "@/components/EcosystemGraph";
import ConstitutionShowcase from "@/components/ConstitutionShowcase";
import OwlCanvas from "@/components/OwlCanvas";
import SmoothScroll from "@/components/SmoothScroll";
import { FiArrowRight, FiCalendar, FiDownload, FiCheckCircle } from "react-icons/fi";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeCapitalTab, setActiveCapitalTab] = useState<"clients" | "lawfirms" | "investors">("clients");
  const [researchFilter, setResearchFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [evalSubmitted, setEvalSubmitted] = useState(false);

  // Parallax mouse coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) * 0.04,
        y: (e.clientY - window.innerHeight / 2) * 0.04,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll storytelling refs
  const owlContainerRef = useRef<HTMLDivElement>(null);
  const tigerContainerRef = useRef<HTMLDivElement>(null);
  const philosophyContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: owlScroll } = useScroll({
    target: owlContainerRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: tigerScroll } = useScroll({
    target: tigerContainerRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: philosophyScroll } = useScroll({
    target: philosophyContainerRef,
    offset: ["start end", "end start"],
  });

  // Storytelling scroll indexes mapping
  const activeOwlIndex = useTransform(owlScroll, [0.1, 0.28, 0.46, 0.64, 0.82, 0.95], [0, 1, 2, 3, 4, 5]);
  const activeTigerIndex = useTransform(tigerScroll, [0.1, 0.26, 0.42, 0.58, 0.74, 0.9], [0, 1, 2, 3, 4, 5]);
  const philosophyStage = useTransform(philosophyScroll, [0.1, 0.3, 0.5, 0.7, 0.9], [0, 1, 2, 3, 4]);

  const [owlIdx, setOwlIdx] = useState(0);
  const [tigerIdx, setTigerIdx] = useState(0);
  const [philoIdx, setPhiloIdx] = useState(0);

  useEffect(() => {
    return activeOwlIndex.on("change", (latest) => {
      setOwlIdx(Math.min(5, Math.max(0, Math.floor(latest))));
    });
  }, [activeOwlIndex]);

  useEffect(() => {
    return activeTigerIndex.on("change", (latest) => {
      setTigerIdx(Math.min(5, Math.max(0, Math.floor(latest))));
    });
  }, [activeTigerIndex]);

  useEffect(() => {
    return philosophyStage.on("change", (latest) => {
      setPhiloIdx(Math.min(4, Math.max(0, Math.floor(latest))));
    });
  }, [philosophyStage]);

  const owlStory = [
    { word: "WISDOM", title: "Lakshmi & Foresight", desc: "The White Owl derives its inspiration from the vahana of Goddess Lakshmi, symbolising prosperity, abundance, and good fortune in Indian tradition. Across the world, the owl has long represented wisdom, intelligence, knowledge, foresight, and the ability to see opportunities beyond the obvious." },
    { word: "KNOWLEDGE", title: "Intellectual Capital", desc: "Within WOBT, the White Owl represents intellectual capital. It symbolises researchers, innovators, entrepreneurs, technologists, scientists, financial experts, strategists, educators, consultants, investors, business leaders, and every professional whose knowledge creates value." },
    { word: "INNOVATION", title: "Continuous Progress", desc: "The White Owl represents curiosity, learning, innovation, and the continuous pursuit of excellence." },
    { word: "RESEARCH", title: "Disciplined Analysis", desc: "Driving thorough inquiry and structured evaluations under dedicated Academic and Research Councils." },
    { word: "TECHNOLOGY", title: "Deploying Frameworks", desc: "Deploying secure, isolated, and cryptographic platforms like LexAI and LawBox chain of custody." },
    { word: "LEADERSHIP", title: "Intellectual Guidance", desc: "Empelling multidisciplinary leaders to guide corporate chapters, boards, and public policy paths." },
  ];

  const tigerStory = [
    { word: "JUSTICE", title: "Ethics & Governance", desc: "Its black colour reflects professionalism, integrity, and the commitment to uphold justice, ethics, governance, and accountability." },
    { word: "LEADERSHIP", title: "Decisive Action", desc: "The Black Tiger represents courage, leadership, discipline, resilience, responsibility, and decisive execution." },
    { word: "PROTECTION", title: "Managing Risks", desc: "While inspired by the black attire traditionally associated with the legal profession, the Black Tiger represents a much broader philosophy — protecting institutions, managing risk, resolving disputes, and enforcing standards." },
    { word: "EXECUTION", title: "Fulfilling Objectives", desc: "Direct litigation funding, asset restructurings, and complex neutral resolutions resolved in days, not months." },
    { word: "GOVERNANCE", title: "Accountability Panels", desc: "Across the WOBT ecosystem, this spirit is reflected in advocates, compliance professionals, corporate leaders, risk advisors, and public servants." },
    { word: "RESPONSIBILITY", title: "Societal Integrity", desc: "Fostering absolute commitment to defend rights, organizations, and the global professional community." },
  ];

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
        <div className="noise-overlay" />
        <Navbar />

        {/* Cinematic Hero */}
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 overflow-hidden bg-[#030303]">
          <ParticleNetwork />
          
          <div className="max-w-7xl mx-auto px-6 z-10 text-center flex flex-col items-center justify-center relative">
            
            {/* Real-time Cinematic particle Owl convergence and neural network canvas */}
            <div className="w-full max-w-5xl mx-auto h-[320px] sm:h-[450px] relative overflow-hidden bg-[#030303]/20 border border-gray-900/40 rounded-3xl p-6 flex items-center justify-center">
              <OwlCanvas />
            </div>

            {/* Timeless Titles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 10.5, duration: 1.5 }}
              className="flex flex-col items-center mt-12"
            >
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest mb-4">
                White Owls &amp; Black Tigers
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-wider leading-tight max-w-4xl mb-6">
                Where Wisdom Meets Courage.<br />
                Where Professionals Shape the Future.
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm font-medium tracking-widest uppercase mb-10 max-w-2xl">
                Wisdom to Imagine. Courage to Execute. Excellence to Transform.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#ecosystem"
                  className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C8A34A] hover:bg-white hover:text-[#090909] transition-all duration-300 shadow-[0_0_15px_rgba(200,163,74,0.3)] hover:scale-105"
                >
                  Explore the Ecosystem
                </a>
                <a
                  href="#membership"
                  className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-gray-800 hover:border-[#C8A34A] hover:text-[#C8A34A] transition-all duration-300 bg-transparent"
                >
                  Become a Member
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About WOBT Narrative */}
        <section id="about" className="section-spacious relative bg-[#090909] border-t border-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                Our Genesis
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide mt-2">
                Every Enduring Institution Begins With An Idea
              </h2>
              <div className="w-12 h-[1px] bg-[#C8A34A] mx-auto mt-6 mb-8" />
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                White Owls &amp; Black Tigers (WOBT) was founded on a simple belief: the world&apos;s greatest opportunities and most complex challenges can no longer be solved by a single profession. They require the collective intelligence of experts from diverse disciplines working together with a shared purpose.
              </p>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                WOBT is a global multidisciplinary professional ecosystem that brings together expertise across law, finance, technology, business, governance, research, academia, innovation, and public policy. Through its specialised platforms, WOBT enables professionals to collaborate, exchange knowledge, develop strategic relationships, create innovative solutions, and contribute to the advancement of industries and society.
              </p>
              <p className="text-xs text-gray-500 leading-relaxed italic">
                Rather than being defined by any one profession, WOBT is defined by excellence, integrity, innovation, and collaboration.
              </p>
            </div>
          </div>
        </section>

        {/* Scroll Storytelling: The White Owl (Wisdom -> Knowledge -> Innovation -> Research -> Technology -> Leadership) */}
        <section ref={owlContainerRef} className="section-spacious relative bg-[#030303]/40 border-t border-gray-950">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            
            {/* Storytelling Static Base Panel */}
            <div className="flex flex-col justify-between p-8 lg:p-12 glass-gold rounded-3xl relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 gold-glow-radial pointer-events-none opacity-40" />
              <div>
                <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest font-mono">
                  The White Owl
                </span>
                <h3 className="font-serif text-2xl lg:text-3xl text-white font-bold tracking-wide mt-4 mb-6">
                  Intellectual Capital
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  The White Owl represents intellectual capital. It symbolises researchers, innovators, entrepreneurs, technologists, scientists, financial experts, strategists, educators, consultants, investors, business leaders, and every professional whose knowledge creates value, advances ideas, and drives progress.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-[#C8A34A12] text-xs text-gray-500 font-serif">
                <span>Wisdom • Knowledge • Innovation • Research • Technology • Leadership</span>
              </div>
            </div>

            {/* Scroll Reveal Sequential display panel */}
            <div className="flex flex-col justify-center gap-4 relative">
              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold block mb-4 pl-2 font-mono">
                Scroll to Transition Owl Attributes
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={owlIdx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-2xl bg-[#090909]/80 border border-[#C8A34A26] shadow-lg flex flex-col gap-4 text-left"
                >
                  <span className="font-serif text-3xl font-bold tracking-widest gold-text-gradient">
                    {owlStory[owlIdx].word}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    {owlStory[owlIdx].title}
                  </span>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium mt-2">
                    {owlStory[owlIdx].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* Scroll Storytelling: The Black Tiger (Justice -> Leadership -> Protection -> Execution -> Governance -> Responsibility) */}
        <section ref={tigerContainerRef} className="section-spacious relative bg-[#090909] border-t border-gray-950">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            
            {/* Storytelling Static Base Panel */}
            <div className="flex flex-col justify-between p-8 lg:p-12 glass rounded-3xl relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 gold-glow-radial pointer-events-none opacity-20" />
              <div>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest font-mono">
                  The Black Tiger
                </span>
                <h3 className="font-serif text-2xl lg:text-3xl text-white font-bold tracking-wide mt-4 mb-6">
                  Decisive Execution
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  The Black Tiger represents courage, leadership, discipline, resilience, responsibility, and decisive execution. Its black colour reflects professionalism, integrity, and the commitment to uphold justice, ethics, governance, and accountability.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-900 text-xs text-gray-500 font-serif">
                <span>Justice • Leadership • Protection • Execution • Governance • Responsibility</span>
              </div>
            </div>

            {/* Scroll Reveal Sequential display panel */}
            <div className="flex flex-col justify-center gap-4 relative">
              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold block mb-4 pl-2 font-mono">
                Scroll to Transition Tiger Attributes
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={tigerIdx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-2xl bg-gray-950 border border-gray-800 shadow-lg flex flex-col gap-4 text-left"
                >
                  <span className="font-serif text-3xl font-bold tracking-widest text-white">
                    {tigerStory[tigerIdx].word}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    {tigerStory[tigerIdx].title}
                  </span>
                  <p className="text-xs text-gray-400 leading-relaxed mt-2 font-medium">
                    {tigerStory[tigerIdx].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* Scroll Storytelling Philosophy Banner */}
        <section ref={philosophyContainerRef} className="section-spacious bg-[#030303]/40 border-t border-gray-950 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center h-[340px] flex flex-col justify-center items-center">
            
            <AnimatePresence mode="wait">
              {philoIdx === 0 && (
                <motion.h4 key="p0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-serif text-xl sm:text-3xl text-white font-bold leading-relaxed">
                  &ldquo;Knowledge creates opportunity.&rdquo;
                </motion.h4>
              )}
              {philoIdx === 1 && (
                <motion.h4 key="p1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-serif text-xl sm:text-3xl text-white font-bold leading-relaxed">
                  &ldquo;Courage transforms opportunity into achievement.&rdquo;
                </motion.h4>
              )}
              {philoIdx === 2 && (
                <motion.h4 key="p2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-serif text-xl sm:text-3xl text-gray-300 leading-relaxed font-medium">
                  &ldquo;The White Owl represents the ability to imagine, innovate, analyse, and create.&rdquo;
                </motion.h4>
              )}
              {philoIdx === 3 && (
                <motion.h4 key="p3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-serif text-xl sm:text-3xl text-gray-300 leading-relaxed font-medium">
                  &ldquo;The Black Tiger represents the ability to execute, protect, lead, and inspire confidence.&rdquo;
                </motion.h4>
              )}
              {philoIdx === 4 && (
                <motion.h4 key="p4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-serif text-xl sm:text-3xl text-white font-bold leading-relaxed">
                  &ldquo;Together, they define the philosophy of White Owls &amp; Black Tigers.&rdquo;
                </motion.h4>
              )}
            </AnimatePresence>

            <div className="h-[1.5px] bg-[#C8A34A33] w-24 my-6" />
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-bold block">
              Scroll to progression
            </span>
          </div>
        </section>

        {/* Interactive Ecosystem Graph */}
        <section id="ecosystem" className="section-spacious bg-[#090909] border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                Interactive Graph
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide mt-2">
                An Ecosystem of Excellence
              </h2>
              <div className="w-12 h-[1px] bg-[#C8A34A] mx-auto mt-6 mb-8" />
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                WOBT is an umbrella platform that develops and operates initiatives serving professionals, businesses, and society across four core pillars.
              </p>
            </div>

            <EcosystemGraph />
          </div>
        </section>

        {/* Live Brands Directory Slider */}
        <section id="platforms" className="py-24 bg-[#030303]/40 border-t border-gray-950 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
              Active Directory
            </span>
            <h2 className="font-serif text-2xl lg:text-3xl text-white font-bold tracking-wide mt-2">
              Nineteen Specialist Verticals. One Coordinated Platform.
            </h2>
          </div>

          <div className="w-full flex overflow-x-hidden py-4 border-y border-gray-900/60 bg-[#0E0E0E]/40">
            <div className="animate-marquee gap-6">
              {[...liveBrands, ...liveBrands].map((brand, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-64 p-5 rounded-xl bg-[#0E0E0E] border border-gray-900/80 shadow flex flex-col gap-3 relative group hover:border-[#C8A34A33] transition-all duration-300"
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

        {/* WOBT Capital / Litigation Finance preview */}
        <section id="wobt-capital" className="section-spacious bg-[#090909] border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-20">
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
                <div className="flex flex-wrap items-center gap-6 text-xs text-[#C8A34A] font-semibold tracking-wider">
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
              
              <div className="lg:col-span-5 bg-gradient-to-br from-[#0E0E0E] to-[#030303] border border-gray-900 p-8 rounded-2xl relative shadow-2xl">
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

            {/* Profile Tabs */}
            <div className="mb-20">
              <div className="flex border-b border-gray-900 gap-6 mb-8 justify-center">
                {(["clients", "lawfirms", "investors"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCapitalTab(tab)}
                    className={`pb-4 text-xs uppercase tracking-widest font-bold transition-colors focus:outline-none cursor-pointer ${
                      activeCapitalTab === tab ? "text-[#C8A34A] border-b-2 border-b-[#C8A34A]" : "text-gray-500"
                    }`}
                  >
                    {tab === "clients" ? "For Claimants" : tab === "lawfirms" ? "For Law Firms" : "For Investors"}
                  </button>
                ))}
              </div>

              <div className="bg-[#030303]/40 border border-gray-900 p-8 rounded-2xl max-w-4xl mx-auto shadow-inner">
                {activeCapitalTab === "clients" && (
                  <div>
                    <h4 className="font-serif text-white font-semibold text-base mb-4 uppercase tracking-wider">
                      Pursue Claims Without Funding Risks
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4 font-medium">
                      If your enterprise or commercial interest has suffered material damage or claims contract breaches, WOBT Capital covers court fees, advocate fee schedules, arbitral seat costs, expert witnesses, and discoveries. 
                    </p>
                    <p className="text-xs text-[#C8A34A] leading-relaxed font-semibold">
                      Under our non-recourse structure, you owe nothing back if the case is unsuccessful. Recovery is extracted exclusively from proceeds upon resolution.
                    </p>
                  </div>
                )}
                {activeCapitalTab === "lawfirms" && (
                  <div>
                    <h4 className="font-serif text-white font-semibold text-base mb-4 uppercase tracking-wider">
                      Backing Law Firms with Operational Liquidity
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
                    <h4 className="font-serif text-white font-semibold text-base mb-4 uppercase tracking-wider">
                      Sovereign-Grade Legal Asset Classes
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4 font-medium">
                      WOBT enables access to carefully evaluated legal matters with defined structures and aligned interests. Each opportunity is screened for merit, enforceability, and outcome potential before capital is deployed.
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed italic">
                      Disclaimer: WOBT is not registered with SEBI as a stock broker, portfolio manager, investment adviser, research analyst, merchant banker, or alternative investment fund/fund manager, and funding is not a security, deposit, or investment product.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <a
                href="/platforms/wobt-capital"
                className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C8A34A] hover:bg-white hover:text-[#090909] transition-all duration-300 inline-block hover:scale-105"
              >
                Go to Dedicated WOBT Capital Page
              </a>
            </div>
          </div>
        </section>

        {/* The WOBT Constitution Section */}
        <section className="section-spacious bg-[#030303]/40 border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                Our Foundation
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide mt-2">
                The WOBT Constitution
              </h2>
              <div className="w-12 h-[1px] bg-[#C8A34A] mx-auto mt-6 mb-8" />
              <p className="text-xs text-gray-500 font-serif italic mb-6">
                &ldquo;The greatest institutions in the world all have three characteristics: a philosophy, a constitution, and an ecosystem. Everything else evolves over time.&rdquo;
              </p>
              
              <div className="flex justify-center mb-10">
                <a
                  href="/WOBT_Constitution_Draft.pdf"
                  download
                  className="px-6 py-2.5 rounded-full border border-[#C8A34A33] hover:border-[#C8A34A] text-[#C8A34A] text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#C8A34A0A] transition-all cursor-pointer"
                >
                  <FiDownload /> Download Complete Constitution PDF
                </a>
              </div>
            </div>

            <ConstitutionShowcase />
          </div>
        </section>

        {/* Membership Section */}
        <section id="membership" className="section-spacious bg-[#090909] border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                Fellowship
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide mt-2">
                Join the Multidisciplinary Ecosystem
              </h2>
              <div className="w-12 h-[1px] bg-[#C8A34A] mx-auto mt-6 mb-8" />
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Affiliation with WOBT connects professionals, academics, and institutional leaders, offering structured collaboration across borders.
              </p>
            </div>

            {/* Preview cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              <div className="p-8 rounded-2xl bg-[#030303]/60 border border-gray-900 flex flex-col justify-between hover:border-[#C8A34A33] transition-all duration-300">
                <div>
                  <h3 className="font-serif text-white font-bold text-sm uppercase tracking-wider mb-3">Professional Members</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-medium">For advocates, Chartered Accountants, compliance advisors, and arbitrators.</p>
                </div>
                <a href="/membership" className="text-xs text-[#C8A34A] font-bold mt-6 hover:underline">Read details →</a>
              </div>
              <div className="p-8 rounded-2xl bg-[#030303]/60 border border-gray-900 flex flex-col justify-between hover:border-[#C8A34A33] transition-all duration-300">
                <div>
                  <h3 className="font-serif text-white font-bold text-sm uppercase tracking-wider mb-3">Distinguished Fellows</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-medium">Reserved for senior industry leaders, retired judges, and academic chairs.</p>
                </div>
                <a href="/membership" className="text-xs text-[#C8A34A] font-bold mt-6 hover:underline">Read details →</a>
              </div>
              <div className="p-8 rounded-2xl bg-[#030303]/60 border border-gray-900 flex flex-col justify-between hover:border-[#C8A34A33] transition-all duration-300">
                <div>
                  <h3 className="font-serif text-white font-bold text-sm uppercase tracking-wider mb-3">University Affiliations</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-medium">Partner programs with law schools and technological institutes.</p>
                </div>
                <a href="/membership" className="text-xs text-[#C8A34A] font-bold mt-6 hover:underline">Read details →</a>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/membership"
                className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C8A34A] hover:bg-white hover:text-[#090909] transition-all duration-300 inline-block hover:scale-105"
              >
                View All 8 Fellowship Tiers
              </a>
            </div>
          </div>
        </section>

        {/* Research Portal */}
        <section id="research" className="section-spacious bg-[#030303]/40 border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                  Think Tank
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide mt-2">
                  Institutional Research
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {["all", "whitepapers", "policy"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setResearchFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                      researchFilter === filter
                        ? "bg-[#C8A34A] text-[#090909]"
                        : "bg-gray-950 border border-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    {filter === "all" ? "All Research" : filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {filteredResearch.map((paper, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0E0E0E] border border-gray-900 flex flex-col justify-between hover:border-[#C8A34A26] transition-all duration-300"
                >
                  <div>
                    <span className="px-2 py-0.5 rounded bg-gray-950 border border-gray-800 uppercase tracking-widest text-[#C8A34A] text-[9px] font-bold">
                      {paper.type}
                    </span>
                    <h3 className="font-serif text-white text-base font-bold tracking-wide leading-relaxed mt-3 mb-4">
                      {paper.title}
                    </h3>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-gray-500 border-t border-gray-900/60 pt-4">
                    <span>{paper.author}</span>
                    <span>{paper.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="/research"
                className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-gray-800 hover:border-[#C8A34A] transition-all inline-block hover:scale-105"
              >
                Access Research Archives
              </a>
            </div>
          </div>
        </section>

        {/* Global Council Events Calendar */}
        <section id="events" className="section-spacious bg-[#090909] border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                Calendar
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide mt-2">
                Conferences &amp; Annual Summits
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-[#030303]/60 border border-gray-900 flex flex-col justify-between hover:border-[#C8A34A33] transition-all duration-300">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <FiCalendar className="text-[#C8A34A]" />
                    <span>August 14, 2026</span>
                  </div>
                  <h3 className="font-serif text-white font-bold text-base mb-2">
                    Delhi Litigation Finance Summit
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
                    Structuring non-recourse disputes, valuation models, and courtroom evidentiary reviews under the BCI standards.
                  </p>
                </div>
                <div className="border-t border-gray-900 pt-4 flex justify-between items-center text-xs">
                  <span className="text-gray-500">New Delhi, India</span>
                  <a href="#contact" className="text-[#C8A34A] font-bold hover:underline">Register Seating →</a>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#030303]/60 border border-gray-900 flex flex-col justify-between hover:border-[#C8A34A33] transition-all duration-300">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <FiCalendar className="text-[#C8A34A]" />
                    <span>September 22, 2026</span>
                  </div>
                  <h3 className="font-serif text-white font-bold text-base mb-2">
                    Geneva Digital Justice summit
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
                    Evaluating smart-contract arbitrations, decentralized neutral frameworks, and cryptographic registries.
                  </p>
                </div>
                <div className="border-t border-gray-900 pt-4 flex justify-between items-center text-xs">
                  <span className="text-gray-500">Geneva, Switzerland</span>
                  <a href="#contact" className="text-[#C8A34A] font-bold hover:underline">Request Seat →</a>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#030303]/60 border border-gray-900 flex flex-col justify-between hover:border-[#C8A34A33] transition-all duration-300">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <FiCalendar className="text-[#C8A34A]" />
                    <span>October 08, 2026</span>
                  </div>
                  <h3 className="font-serif text-white font-bold text-base mb-2">
                    Singapore Compliance Forums
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
                    Data principal sovereignty, cross-border corporate compliance guidelines, and isolation networks auditing.
                  </p>
                </div>
                <div className="border-t border-gray-900 pt-4 flex justify-between items-center text-xs">
                  <span className="text-gray-500">Marina Bay Sands, SG</span>
                  <a href="#contact" className="text-[#C8A34A] font-bold hover:underline">Register Seating →</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Global Hubs Section */}
        <section id="contact" className="section-spacious bg-[#030303]/40 border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              <div className="lg:col-span-5 flex flex-col gap-8 justify-center">
                <div>
                  <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                    Secretariats
                  </span>
                  <h2 className="font-serif text-3xl text-white font-bold tracking-wide mt-2">
                    Global Chapters Map
                  </h2>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    WOBT operates regional chapters, counsel secretariats, and hubs across jurisdictions. Rotate the index node map.
                  </p>
                </div>
                
                <InteractiveGlobe />
              </div>

              <div className="lg:col-span-7 bg-[#0E0E0E]/80 border border-gray-900 rounded-3xl p-8 lg:p-10 relative">
                <div>
                  <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest font-mono">
                    Official Registry
                  </span>
                  <h2 className="font-serif text-2xl text-white font-bold tracking-wide mt-2 mb-6">
                    Book Consultation or Apply
                  </h2>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEvalSubmitted(true);
                    setTimeout(() => setEvalSubmitted(false), 5000);
                  }}
                  className="flex flex-col gap-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="bg-[#090909] border border-gray-800 focus:border-[#C8A34A] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Professional Email</label>
                      <input
                        type="email"
                        placeholder="johndoe@institution.org"
                        className="bg-[#090909] border border-gray-800 focus:border-[#C8A34A] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Subject</label>
                    <select className="bg-[#090909] border border-gray-800 focus:border-[#C8A34A] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors">
                      <option>Membership Admission Registry</option>
                      <option>WOBT Capital Case Funding merits review</option>
                      <option>University Chapter / Academic Alliance</option>
                      <option>Policy Council Inquiry / Think Tank Advice</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Message Details</label>
                    <textarea
                      placeholder="Outline your application proposal or case query in detail..."
                      rows={5}
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

                  {evalSubmitted && (
                    <div className="p-3 rounded bg-[#C8A34A0F] border border-[#C8A34A26] text-[10px] text-[#C8A34A] text-center">
                      Request successfully transmitted. A WOBT Compliance Officer will respond shortly.
                    </div>
                  )}
                </form>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
