"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleNetwork from "@/components/ParticleNetwork";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import EcosystemGraph from "@/components/EcosystemGraph";
import ConstitutionShowcase from "@/components/ConstitutionShowcase";
import SmoothScroll from "@/components/SmoothScroll";
import { FiArrowRight, FiSearch, FiClock, FiCalendar, FiDownload, FiMapPin, FiMail, FiCheckCircle } from "react-icons/fi";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const [activeCapitalTab, setActiveCapitalTab] = useState<"clients" | "lawfirms" | "investors">("clients");
  const [researchFilter, setResearchFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "Membership Application", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [evalSubmitted, setEvalSubmitted] = useState(false);

  // Parallax mouse movement tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) * 0.05,
        y: (e.clientY - window.innerHeight / 2) * 0.05,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll ref for storytelling triggers
  const owlContainerRef = useRef<HTMLDivElement>(null);
  const tigerContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: owlScroll } = useScroll({
    target: owlContainerRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: tigerScroll } = useScroll({
    target: tigerContainerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll states to active concepts
  const activeOwlIndex = useTransform(owlScroll, [0.15, 0.35, 0.55, 0.75, 0.95], [0, 1, 2, 3, 4]);
  const activeTigerIndex = useTransform(tigerScroll, [0.12, 0.28, 0.44, 0.6, 0.76, 0.92], [0, 1, 2, 3, 4, 5]);

  const [owlIdx, setOwlIdx] = useState(0);
  const [tigerIdx, setTigerIdx] = useState(0);

  useEffect(() => {
    return activeOwlIndex.on("change", (latest) => {
      setOwlIdx(Math.min(4, Math.max(0, Math.floor(latest))));
    });
  }, [activeOwlIndex]);

  useEffect(() => {
    return activeTigerIndex.on("change", (latest) => {
      setTigerIdx(Math.min(5, Math.max(0, Math.floor(latest))));
    });
  }, [activeTigerIndex]);

  const owlConcepts = [
    { title: "Knowledge", desc: "The foundational catalyst creating opportunities across law, finance, and technology." },
    { title: "Innovation", desc: "Translating static ideas into active frameworks, advancing systems for modern industries." },
    { title: "Research", desc: "Disciplined inquiry under WOBT Councils yielding peer-reviewed journals and policies." },
    { title: "Technology", desc: "Deploying secure, isolated systems like LexAI and LawBox chain of custody." },
    { title: "Leadership", desc: "Intellectual capital guiding businesses, secretariats, and academic chapters." },
  ];

  const tigerConcepts = [
    { title: "Justice", desc: "The primary commitment to uphold ethics, governance, mediation, and risk oversight." },
    { title: "Governance", desc: "Enforcing statutory compliance, DPDP Act guidelines, and BCI criteria." },
    { title: "Leadership", desc: "Decisive execution driving complex resolutions and institutional management." },
    { title: "Protection", desc: "Managing commercial dispute risks and safeguarding organizational assets." },
    { title: "Responsibility", desc: "Ethical accountability mapped to WOBT's constitutional councils." },
    { title: "Execution", desc: "Non-recourse litigation funding and strategic restructures resolved in days." },
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
        <section className="relative min-h-screen flex items-center justify-center pt-28 pb-12 overflow-hidden bg-[#030303]">
          <ParticleNetwork />
          
          {/* Ambient Gold Rays */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] gold-glow-radial pointer-events-none opacity-60" />

          {/* Mouse follow parallax container */}
          <motion.div
            style={{ x: mousePos.x, y: mousePos.y }}
            className="max-w-7xl mx-auto px-6 z-10 text-center flex flex-col items-center justify-center transition-all duration-300 ease-out"
          >
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
            <p className="text-gray-300 text-sm sm:text-lg font-medium tracking-wide max-w-2xl mb-8 leading-relaxed">
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
                className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C8A34A] hover:bg-white hover:text-[#090909] transition-all duration-300 shadow-[0_0_15px_rgba(200,163,74,0.3)]"
              >
                Explore the Ecosystem
              </a>
              <a
                href="#membership"
                className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-gray-700 hover:border-[#C8A34A] hover:text-[#C8A34A] transition-all duration-300 bg-transparent"
              >
                Become a Member
              </a>
            </div>

            {/* Mini pillars */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl border-t border-gray-900 pt-10 text-gray-500 text-[10px] font-semibold uppercase tracking-widest">
              <div className="flex flex-col items-center gap-1">
                <span className="text-white font-serif tracking-wider">Knowledge</span>
                <span className="text-[9px] text-gray-600 font-sans">Research &amp; AI</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-l border-gray-900/50">
                <span className="text-white font-serif tracking-wider">Capital</span>
                <span className="text-[9px] text-gray-600 font-sans">dispute finance</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-l border-gray-900/50">
                <span className="text-white font-serif tracking-wider">Justice</span>
                <span className="text-[9px] text-gray-600 font-sans">law &amp; governance</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-l border-gray-900/50">
                <span className="text-white font-serif tracking-wider">Society</span>
                <span className="text-[9px] text-gray-600 font-sans">policy &amp; security</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* About WOBT Narrative */}
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
                WOBT is a global multidisciplinary professional ecosystem that brings together expertise across law, finance, technology, business, governance, research, academia, innovation, and public policy. Through its specialised platforms, WOBT enables professionals to collaborate, exchange knowledge, develop strategic relationships, create innovative solutions, and contribute to the advancement of industries and society.
              </p>
            </div>
          </div>
        </section>

        {/* Scroll Storytelling: The White Owl (Knowledge -> Innovation -> Research -> Technology -> Leadership) */}
        <section ref={owlContainerRef} className="py-32 relative bg-[#030303]/40 border-t border-gray-950">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            
            {/* Storytelling Content Side */}
            <div className="flex flex-col justify-between p-8 lg:p-12 glass-gold rounded-3xl relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 gold-glow-radial pointer-events-none opacity-40" />
              <div>
                <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest font-mono">
                  The White Owl Concept Flow
                </span>
                <h3 className="font-serif text-2xl lg:text-3xl text-white font-bold tracking-wide mt-4 mb-6">
                  Intellectual Capital
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6 font-medium">
                  The White Owl derives its inspiration from the <em>vahana</em> of Goddess Lakshmi, symbolising prosperity, abundance, and good fortune in Indian tradition. Across the world, the owl has long represented wisdom, intelligence, knowledge, foresight, and the ability to see opportunities beyond the obvious.
                </p>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  Within WOBT, the White Owl represents intellectual capital. It symbolises researchers, innovators, entrepreneurs, technologists, scientists, financial experts, strategists, educators, consultants, investors, business leaders, and every professional whose knowledge creates value, advances ideas, and drives progress.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-[#C8A34A12] text-xs text-gray-500">
                <span>The White Owl represents curiosity, learning, innovation, and the continuous pursuit of excellence.</span>
              </div>
            </div>

            {/* Scroll Animation Reveal Side */}
            <div className="flex flex-col justify-center gap-6 relative">
              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold block mb-2 pl-4">
                Scroll to Reveal Owl Attributes
              </span>
              <div className="flex flex-col gap-3">
                {owlConcepts.map((concept, idx) => {
                  const isActive = owlIdx === idx;
                  return (
                    <div
                      key={concept.title}
                      className={`p-6 rounded-2xl border transition-all duration-500 text-left ${
                        isActive
                          ? "bg-[#C8A34A08] border-[#C8A34A33] shadow-[0_0_20px_rgba(200,163,74,0.05)]"
                          : "bg-transparent border-transparent opacity-20"
                      }`}
                    >
                      <h4 className="font-serif text-white font-bold text-sm tracking-wide group-hover:text-[#C8A34A] transition-colors">
                        {concept.title}
                      </h4>
                      {isActive && (
                        <p className="text-[11px] text-gray-400 leading-relaxed mt-2 font-medium">
                          {concept.desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Scroll Storytelling: The Black Tiger (Justice -> Governance -> Leadership -> Protection -> Responsibility -> Execution) */}
        <section ref={tigerContainerRef} className="py-32 relative bg-[#090909] border-t border-gray-950">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            
            {/* Storytelling Content Side */}
            <div className="flex flex-col justify-between p-8 lg:p-12 glass rounded-3xl relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 gold-glow-radial pointer-events-none opacity-20" />
              <div>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest font-mono">
                  The Black Tiger Concept Flow
                </span>
                <h3 className="font-serif text-2xl lg:text-3xl text-white font-bold tracking-wide mt-4 mb-6">
                  Decisive Execution
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6 font-medium">
                  The Black Tiger represents courage, leadership, discipline, resilience, responsibility, and decisive execution. Its black colour reflects professionalism, integrity, and the commitment to uphold justice, ethics, governance, and accountability.
                </p>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  While inspired by the black attire traditionally associated with the legal profession, the Black Tiger represents a much broader philosophy—protecting institutions, managing risk, resolving disputes, enforcing standards, and leading with conviction.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-900 text-xs text-gray-500">
                <span>Across the WOBT ecosystem, this spirit is reflected in advocates, compliance professionals, corporate leaders, and investigators protecting rights.</span>
              </div>
            </div>

            {/* Scroll Animation Reveal Side */}
            <div className="flex flex-col justify-center gap-6 relative">
              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold block mb-2 pl-4">
                Scroll to Reveal Tiger Attributes
              </span>
              <div className="flex flex-col gap-3">
                {tigerConcepts.map((concept, idx) => {
                  const isActive = tigerIdx === idx;
                  return (
                    <div
                      key={concept.title}
                      className={`p-5 rounded-2xl border transition-all duration-500 text-left ${
                        isActive
                          ? "bg-gray-950 border-gray-800 shadow-md"
                          : "bg-transparent border-transparent opacity-20"
                      }`}
                    >
                      <h4 className="font-serif text-white font-bold text-sm tracking-wide">
                        {concept.title}
                      </h4>
                      {isActive && (
                        <p className="text-[11px] text-gray-400 leading-relaxed mt-2 font-medium">
                          {concept.desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Our Philosophy Center Banner */}
        <section className="py-24 bg-[#030303]/40 border-t border-gray-950">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-4">
              Our Philosophy
            </span>
            <p className="font-serif text-lg sm:text-2xl text-white leading-relaxed tracking-wide italic">
              &ldquo;Knowledge creates opportunity. Courage transforms opportunity into achievement. The White Owl represents the ability to imagine, innovate, analyse, and create. The Black Tiger represents the ability to execute, protect, lead, and inspire confidence. Together, they define the philosophy of White Owls &amp; Black Tigers.&rdquo;
            </p>
            <div className="h-[1px] bg-gray-900 max-w-xs mx-auto my-6" />
            <span className="text-[10px] text-[#C8A34A] tracking-wider uppercase font-semibold">
              Sapientia et Fortitudo
            </span>
          </div>
        </section>

        {/* Interactive Ecosystem Graph Section */}
        <section id="ecosystem" className="py-32 bg-[#090909] border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                Interactive Graph
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide mt-2">
                An Ecosystem of Excellence
              </h2>
              <div className="w-12 h-[1px] bg-[#C8A34A] mx-auto mt-6" />
              <p className="text-xs text-gray-500 mt-4 leading-relaxed font-medium">
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
            <p className="text-xs text-gray-500 mt-2 font-medium">
              Each vertical is staffed by dedicated legal, financial, or operational experts—engaged individually or together depending on what the matter demands.
            </p>
          </div>

          {/* Scrolling Marquee Slider */}
          <div className="w-full flex overflow-x-hidden py-4 border-y border-gray-900/60 bg-[#0E0E0E]/40">
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

        {/* WOBT Capital / Litigation Finance preview */}
        <section id="wobt-capital" className="py-32 bg-[#090909] border-t border-gray-950 relative">
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
                    <h4 className="font-serif text-white font-semibold text-base mb-4">
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
                    <h4 className="font-serif text-white font-semibold text-base mb-4">
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
                    <h4 className="font-serif text-white font-semibold text-base mb-4">
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

            <div className="text-center">
              <a
                href="/platforms/wobt-capital"
                className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C8A34A] hover:bg-white hover:text-[#090909] transition-all duration-300 inline-block"
              >
                Go to Dedicated WOBT Capital Page
              </a>
            </div>
          </div>
        </section>

        {/* The WOBT Constitution & 100-Year Timeline Section */}
        <section className="py-32 bg-[#030303]/40 border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                Our Foundation
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide mt-2">
                The WOBT Constitution
              </h2>
              <div className="w-12 h-[1px] bg-[#C8A34A] mx-auto mt-6" />
              <p className="text-xs text-gray-500 mt-4 leading-relaxed font-medium font-serif italic mb-6">
                &ldquo;The greatest institutions in the world all have three characteristics: a philosophy, a constitution, and an ecosystem. Everything else evolves over time.&rdquo;
              </p>
              
              {/* PDF Download Button */}
              <div className="flex justify-center mb-10">
                <a
                  href="/WOBT_Constitution_Draft.pdf"
                  download
                  className="px-6 py-2.5 rounded-full border border-[#C8A34A33] hover:border-[#C8A34A] text-[#C8A34A] text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#C8A34A0A] transition-all"
                >
                  <FiDownload /> Download Complete Constitution PDF
                </a>
              </div>
            </div>

            <ConstitutionShowcase />
          </div>
        </section>

        {/* Membership Section */}
        <section id="membership" className="py-32 bg-[#090909] border-t border-gray-950 relative">
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

            {/* Preview cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              <div className="p-6 rounded-2xl bg-[#030303]/60 border border-gray-900 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-white font-bold text-sm uppercase tracking-wider mb-2">Professional Members</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-medium">For advocates, Chartered Accountants, arbitrators, and compliance advisors.</p>
                </div>
                <a href="/membership" className="text-xs text-[#C8A34A] font-bold mt-4 hover:underline">Read details →</a>
              </div>
              <div className="p-6 rounded-2xl bg-[#030303]/60 border border-gray-900 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-white font-bold text-sm uppercase tracking-wider mb-2">Distinguished Fellows</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-medium">Reserved for senior industry leaders, retired judges, and academic chairs.</p>
                </div>
                <a href="/membership" className="text-xs text-[#C8A34A] font-bold mt-4 hover:underline">Read details →</a>
              </div>
              <div className="p-6 rounded-2xl bg-[#030303]/60 border border-gray-900 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-white font-bold text-sm uppercase tracking-wider mb-2">University Affiliations</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-medium">Partner programs with law schools and technological institutes.</p>
                </div>
                <a href="/membership" className="text-xs text-[#C8A34A] font-bold mt-4 hover:underline">Read details →</a>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/membership"
                className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C8A34A] hover:bg-white hover:text-[#090909] transition-all duration-300 inline-block"
              >
                View All 8 Fellowship Tiers
              </a>
            </div>
          </div>
        </section>

        {/* Research Portal */}
        <section id="research" className="py-32 bg-[#030303]/40 border-t border-gray-950 relative">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {filteredResearch.map((paper, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0E0E0E] border border-gray-900 flex flex-col justify-between"
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
                className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-gray-800 hover:border-[#C8A34A] transition-all inline-block"
              >
                Access Research Archives
              </a>
            </div>
          </div>
        </section>

        {/* Global Council Events Calendar */}
        <section id="events" className="py-32 bg-[#090909] border-t border-gray-950 relative">
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
              <div className="p-6 rounded-2xl bg-[#030303]/60 border border-gray-900 flex flex-col justify-between">
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

              <div className="p-6 rounded-2xl bg-[#030303]/60 border border-gray-900 flex flex-col justify-between">
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

              <div className="p-6 rounded-2xl bg-[#030303]/60 border border-gray-900 flex flex-col justify-between">
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

        {/* Interactive Contact & Global Chapters Section */}
        <section id="contact" className="py-32 bg-[#030303]/40 border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Map/Globe Node Column */}
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

              {/* Booking and contact form column */}
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
                    setFormSubmitted(true);
                    setTimeout(() => setFormSubmitted(false), 5000);
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

                  {formSubmitted && (
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
