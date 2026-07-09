"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleNetwork from "@/components/ParticleNetwork";
import SmoothScroll from "@/components/SmoothScroll";
import { FiArrowRight, FiCheckCircle, FiChevronDown, FiBook, FiDollarSign, FiCpu, FiTrendingUp } from "react-icons/fi";

export default function WobtCapital() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    firm: "",
    value: "",
    desc: "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", firm: "", value: "", desc: "" });
    }, 5000);
  };

  const steps = [
    { num: "01", title: "Identify", desc: "Screen and evaluate meritorious legal matters based on strength, enforceability, and potential outcomes." },
    { num: "02", title: "Select", desc: "Curate opportunities aligned with investor preferences, risk appetite, and capital allocation." },
    { num: "03", title: "Deploy", desc: "Structure and deploy capital into selected matters with defined terms, milestones, and oversight." },
    { num: "04", title: "Outcome", desc: "Generate returns upon successful case resolutions aligned with pre-defined structures." },
  ];

  const capabilities = [
    { title: "Non-Recourse Structure", desc: "WOBT absorbs all risk. If the matter is unsuccessful, the funded party owes no repayment." },
    { title: "Direct Law Firm Backing", desc: "We fund law firms directly to carry cases through to conclusion, managing firm cash flow." },
    { title: "Forensic & Financial Experts", desc: "Access Chartered Accountants, Company Secretaries, and forensic accountants to strengthen case quantum." },
    { title: "LexManage Matter Tracking", desc: "Manage hearings, filings, deadlines, and case status updates in one unified interface." },
    { title: "Forensic Authentication Lab", desc: "Verify signatures, digital assets, and physical documents before they trigger courtroom disputes." },
    { title: "Cross-Border Jurisdictions", desc: "Coordinate legal and recovery strategy across global jurisdictions through WOBT LexPartners." },
  ];

  return (
    <SmoothScroll>
      <div className="relative min-h-screen">
        <div className="noise-overlay" />
        <Navbar />

        {/* Hero */}
        <section className="relative pt-44 pb-24 overflow-hidden bg-gradient-to-b from-[#030303] to-[#090909]">
          <ParticleNetwork />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] gold-glow-radial pointer-events-none opacity-60" />
          
          <div className="max-w-7xl mx-auto px-6 z-10 text-center relative flex flex-col items-center">
            <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest mb-4">
              Litigation &amp; Arbitration Finance
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-wide max-w-4xl leading-tight mb-6">
              You Have a Strong Case. <br />
              <span className="gold-text-gradient">Don&apos;t Let Money Stop You From Winning It.</span>
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm font-medium tracking-wide max-w-2xl mb-8 leading-relaxed">
              India&apos;s trusted litigation finance partner—providing non-recourse dispute funding to domestic and international clients, and backing the law firms fighting those matters.
            </p>
            <div className="flex gap-4">
              <a
                href="#evaluation-form"
                className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C8A34A] hover:bg-white hover:text-[#090909] transition-all duration-300 shadow-[0_0_15px_rgba(200,163,74,0.3)]"
              >
                Request Case Evaluation
              </a>
            </div>
          </div>
        </section>

        {/* Stats Dashboard */}
        <section className="py-12 bg-[#090909] border-y border-gray-950">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <span className="font-serif text-3xl text-white font-extrabold">100 Cr+</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1 block">Capital support capacity</span>
            </div>
            <div className="p-4 border-l border-gray-900/60">
              <span className="font-serif text-3xl text-white font-extrabold">500+</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1 block">Advocates network</span>
            </div>
            <div className="p-4 border-l border-gray-900/60">
              <span className="font-serif text-3xl text-white font-extrabold">150+</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1 block">Law firms</span>
            </div>
            <div className="p-4 border-l border-gray-900/60">
              <span className="font-serif text-3xl text-white font-extrabold">0 Upfront</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1 block">Cost to client</span>
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="py-32 bg-[#090909] relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">Our Edge</span>
              <h2 className="font-serif text-3xl text-white font-bold tracking-wide mt-2">Dispute Finance Reimagined</h2>
              <p className="text-xs text-gray-500 mt-4 leading-relaxed font-medium">
                WOBT Capital offers institutional infrastructure alongside capital support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#030303]/60 border border-gray-900 hover:border-gray-800 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#C8A34A0D] border border-[#C8A34A1F] flex items-center justify-center text-[#C8A34A] text-base mb-4 group-hover:bg-[#C8A34A] group-hover:text-[#090909] transition-colors">
                      {idx === 0 ? <FiDollarSign /> : idx === 1 ? <FiTrendingUp /> : <FiCpu />}
                    </div>
                    <h3 className="font-serif text-white font-bold text-base mb-3 group-hover:text-[#C8A34A] transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Flow */}
        <section className="py-32 bg-[#030303]/30 border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest font-mono">Disciplined Access</span>
              <h2 className="font-serif text-3xl text-white font-bold tracking-wide mt-2">How It Works</h2>
              <p className="text-xs text-gray-500 mt-4 leading-relaxed font-medium">
                Our funding deployment process consists of four defined operational stages.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div key={step.num} className="p-6 rounded-2xl bg-[#0E0E0E] border border-gray-900 relative overflow-hidden">
                  <span className="font-mono text-5xl font-extrabold text-[#C8A34A0A] absolute top-2 right-4">
                    {step.num}
                  </span>
                  <span className="text-[10px] text-[#C8A34A] font-bold uppercase tracking-widest font-mono">
                    Phase {step.num}
                  </span>
                  <h3 className="font-serif text-white font-bold text-base mt-2 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic FAQ */}
        <section className="py-32 bg-[#090909] border-t border-gray-950">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">Questions</span>
              <h2 className="font-serif text-3xl text-white font-bold tracking-wide mt-2">Funding Protocols FAQ</h2>
            </div>

            <div className="flex flex-col gap-4">
              <div className="p-6 rounded-xl bg-[#0E0E0E] border border-gray-900">
                <h4 className="font-serif text-[#C8A34A] text-sm font-semibold tracking-wide mb-2">
                  What is the pricing return in the event of a successful recovery?
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  Litigation funding is provided entirely on a non-recourse basis—if the funded matter is unsuccessful, the funded party owes WOBT nothing. In a successful case, WOBT is entitled to an agreed share of the recovery proceeds, determined on a file-by-file basis and set out clearly in the final litigation funding agreement.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-[#0E0E0E] border border-gray-900">
                <h4 className="font-serif text-[#C8A34A] text-sm font-semibold tracking-wide mb-2">
                  How does WOBT Capital protect advocate-client privilege?
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  WOBT is not a law firm and does not provide legal representation. Independent advocates are appointed by the client, maintaining full privilege. Funding reviews are conducted under robust confidentiality arrangements and standard NDAs protecting case files.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#0E0E0E] border border-gray-900">
                <h4 className="font-serif text-[#C8A34A] text-sm font-semibold tracking-wide mb-2">
                  Does WOBT Capital register with SEBI?
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  No. WOBT is not registered with SEBI in any capacity. Litigation funding is not a standard securities instrument, public deposit, or retail investment advisory product. It constitutes a commercial contract between corporate or private interests and the funding vehicle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Case evaluation form */}
        <section id="evaluation-form" className="py-32 bg-[#030303]/40 border-t border-gray-950">
          <div className="max-w-3xl mx-auto px-6 bg-[#0E0E0E]/80 border border-gray-900 rounded-3xl p-8 lg:p-12 relative">
            <span className="text-[#C8A34A] text-[10px] font-bold uppercase tracking-widest font-mono">Evaluation Office</span>
            <h2 className="font-serif text-2xl lg:text-3xl text-white font-bold tracking-wide mt-2 mb-6">
              Request Case Funding Evaluation
            </h2>
            
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Claimant / Law Firm Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-[#090909] border border-gray-800 focus:border-[#C8A34A] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                    placeholder="e.g. Acme Corp"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Contact Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-[#090909] border border-gray-800 focus:border-[#C8A34A] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                    placeholder="johndoe@acmecorp.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Claim Value (INR / USD)</label>
                  <input
                    type="text"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="bg-[#090909] border border-gray-800 focus:border-[#C8A34A] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                    placeholder="e.g. 10 Crores"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Assigned Law Firm (If any)</label>
                  <input
                    type="text"
                    value={formData.firm}
                    onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
                    className="bg-[#090909] border border-gray-800 focus:border-[#C8A34A] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                    placeholder="e.g. Legal Partners LLP"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Matter Description</label>
                <textarea
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="bg-[#090909] border border-gray-800 focus:border-[#C8A34A] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                  placeholder="Outline the dispute elements, contract breaches, or claims..."
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-[#C8A34A] hover:bg-white text-[#090909] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Submit SECURE EVALUATION FILE
              </button>

              {submitted && (
                <div className="p-3 rounded bg-[#C8A34A0F] border border-[#C8A34A26] text-[10px] text-[#C8A34A] text-center">
                  Your dispute file has been securely transmitted. WOBT Capital Evaluation desk will respond within 48 hours.
                </div>
              )}
            </form>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
