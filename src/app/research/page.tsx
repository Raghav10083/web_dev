"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleNetwork from "@/components/ParticleNetwork";
import SmoothScroll from "@/components/SmoothScroll";
import { FiSearch, FiClock, FiFileText } from "react-icons/fi";

export default function ResearchArchive() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const papers = [
    {
      title: "The Emergence of Third-Party Litigation Funding in India: Regulatory Paradigms",
      desc: "An analytical review of non-recourse funding agreements under Indian commercial law frameworks, analyzing Supreme Court rulings and advocate choices.",
      author: "WOBT Capital Research Council",
      type: "whitepapers",
      readTime: "12 min read",
      date: "May 2026",
    },
    {
      title: "Data Sovereignty & Legal Frameworks: Managing Audits under the DPDP Act 2023",
      desc: "Statutory mapping of corporate data fiduciary responsibilities, consent logs, and structural enforcement procedures.",
      author: "WOBT Society Policy Council",
      type: "policy",
      readTime: "18 min read",
      date: "June 2026",
    },
    {
      title: "A Comparative Analysis of AI Drafting Models in Civil Law Systems",
      desc: "Researching the boundaries of cognitive draft suggestions, case-law retrieval models, and hallucination containment under LexAI.",
      author: "WOBT AI Research Labs",
      type: "ai",
      readTime: "15 min read",
      date: "April 2026",
    },
    {
      title: "Insolvency Resolution Benchmarks: Restructuring Distressed Assets post-2025",
      desc: "Strategic restructuring evaluations under IBC, debt resolution timelines, and capital deployments by WOBT Resurge.",
      author: "WOBT Capital Resurge Advisory",
      type: "whitepapers",
      readTime: "22 min read",
      date: "July 2026",
    },
  ];

  const filtered = papers.filter((paper) => {
    const matchesFilter = filter === "all" || paper.type === filter;
    const matchesSearch =
      paper.title.toLowerCase().includes(search.toLowerCase()) ||
      paper.desc.toLowerCase().includes(search.toLowerCase()) ||
      paper.author.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <SmoothScroll>
      <div className="relative min-h-screen">
        <div className="noise-overlay" />
        <Navbar />

        {/* Hero */}
        <section className="relative pt-44 pb-24 overflow-hidden bg-[#030303]">
          <ParticleNetwork />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] gold-glow-radial pointer-events-none opacity-60" />

          <div className="max-w-7xl mx-auto px-6 z-10 text-center relative flex flex-col items-center">
            <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest mb-4">
              WOBT Think Tank
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-wide max-w-4xl leading-tight mb-6">
              Institutional Research &amp; Journals
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm font-medium tracking-wide max-w-2xl leading-relaxed">
              Verbatim policy papers, legal tech analyses, and economic reports published by WOBT Councils.
            </p>
          </div>
        </section>

        {/* Directory Controls */}
        <section className="py-12 bg-[#090909] border-y border-gray-950">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <FiSearch className="absolute left-4 top-3.5 text-gray-500 text-sm" />
              <input
                type="text"
                placeholder="Search research logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#030303] border border-gray-900 focus:border-[#C8A34A] rounded-xl py-3 pl-12 pr-4 text-xs text-white focus:outline-none placeholder-gray-700"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {["all", "whitepapers", "policy", "ai"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    filter === item
                      ? "bg-[#C8A34A] text-[#090909]"
                      : "bg-[#0E0E0E] border border-gray-900 text-gray-400 hover:text-white"
                  }`}
                >
                  {item === "all" ? "All Registry" : item === "ai" ? "AI Labs" : item}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Magazine Grid */}
        <section className="py-24 bg-[#090909]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filtered.length > 0 ? (
                filtered.map((paper, idx) => (
                  <div
                    key={idx}
                    className="p-8 rounded-3xl bg-[#030303]/60 border border-gray-900 hover:border-gray-800 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-4 text-[10px] text-gray-500 font-semibold mb-4">
                        <span className="px-2.5 py-1 rounded bg-[#C8A34A0D] border border-[#C8A34A26] uppercase tracking-widest text-[#C8A34A]">
                          {paper.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiClock /> {paper.readTime}
                        </span>
                      </div>
                      <h3 className="font-serif text-white text-lg sm:text-xl font-bold tracking-wide group-hover:text-[#C8A34A] transition-colors leading-relaxed mb-4">
                        {paper.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed font-medium mb-6">
                        {paper.desc}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-xs border-t border-gray-900 pt-6 mt-4 text-gray-500">
                      <span className="font-serif">{paper.author}</span>
                      <span>{paper.date}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-24 text-gray-600 text-xs italic font-serif">
                  No institutional papers match the search filters.
                </div>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
