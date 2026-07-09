"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiSend, FiArrowUp } from "react-icons/fi";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#030303] border-t border-[#C8A34A12] pt-20 pb-8 text-gray-400 text-sm relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        
        {/* Brand Section */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-[#C8A34A] flex items-center justify-center bg-[#090909]">
              <span className="font-serif text-[#C8A34A] font-bold text-xs tracking-widest">W</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-white font-bold tracking-[0.2em] text-xs">
                WOBT
              </span>
              <span className="text-[8px] tracking-[0.3em] uppercase text-gray-500 font-semibold">
                Global Institution
              </span>
            </div>
          </div>
          <p className="text-xs leading-relaxed max-w-sm text-gray-500">
            A global multidisciplinary professional ecosystem bringing together intellectual capital and decisive execution across law, finance, technology, governance, and public policy.
          </p>
          <form onSubmit={handleSubscribe} className="relative max-w-xs mt-2">
            <input
              type="email"
              placeholder="Subscribe to the WOBT Gazette"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0E0E0E] border border-gray-800 focus:border-[#C8A34A] rounded-full py-2.5 pl-4 pr-12 text-xs text-white focus:outline-none transition-colors duration-300 placeholder-gray-600"
              required
            />
            <button
              type="submit"
              className="absolute right-1 top-1 w-8 h-8 rounded-full bg-[#C8A34A] hover:bg-white text-[#090909] flex items-center justify-center transition-colors cursor-pointer"
            >
              <FiSend className="text-xs" />
            </button>
            {subscribed && (
              <span className="absolute left-2 -bottom-5 text-[10px] text-[#C8A34A]">
                Subscription registered successfully.
              </span>
            )}
          </form>
        </div>

        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <span className="font-serif text-white font-semibold text-xs tracking-wider uppercase">
            Institution
          </span>
          <ul className="flex flex-col gap-2.5 text-xs">
            <li><Link href="#about" className="hover:text-[#C8A34A] transition-colors">Our Philosophy</Link></li>
            <li><Link href="#about" className="hover:text-[#C8A34A] transition-colors">The Constitution</Link></li>
            <li><Link href="#about" className="hover:text-[#C8A34A] transition-colors">Governance & Ethics</Link></li>
            <li><Link href="#membership" className="hover:text-[#C8A34A] transition-colors">Tiers of Membership</Link></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          <span className="font-serif text-white font-semibold text-xs tracking-wider uppercase">
            Ecosystem
          </span>
          <ul className="flex flex-col gap-2.5 text-xs">
            <li><Link href="#wobt-capital" className="hover:text-[#C8A34A] transition-colors">WOBT Capital</Link></li>
            <li><Link href="#platforms" className="hover:text-[#C8A34A] transition-colors">LexAI System</Link></li>
            <li><Link href="#platforms" className="hover:text-[#C8A34A] transition-colors">LexPartners Network</Link></li>
            <li><Link href="#platforms" className="hover:text-[#C8A34A] transition-colors">LawBox Data Vault</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4">
          <span className="font-serif text-white font-semibold text-xs tracking-wider uppercase">
            Registry
          </span>
          <ul className="flex flex-col gap-2.5 text-xs">
            <li><Link href="#research" className="hover:text-[#C8A34A] transition-colors">Whitepapers</Link></li>
            <li><Link href="#research" className="hover:text-[#C8A34A] transition-colors">Academic Journals</Link></li>
            <li><Link href="#events" className="hover:text-[#C8A34A] transition-colors">Global Conferences</Link></li>
            <li><Link href="#contact" className="hover:text-[#C8A34A] transition-colors">Office Directories</Link></li>
          </ul>
        </div>
      </div>

      {/* Compliance & Legal Disclaimer Panel */}
      <div className="max-w-7xl mx-auto px-6 border-t border-[#C8A34A0D] pt-10 pb-8">
        <div className="bg-[#090909] border border-[#C8A34A0A] rounded-xl p-6 lg:p-8 text-[11px] leading-relaxed text-gray-500 shadow-inner flex flex-col gap-4">
          <h4 className="font-serif text-[#C8A34A] font-semibold text-xs uppercase tracking-wider">
            Regulatory Disclosures & Legal Compliance Statement
          </h4>
          <p>
            White Owls & Black Tigers (WOBT) is a global multidisciplinary professional ecosystem operated by White Owls & Black Tigers Private Ltd. 
            <strong> WOBT is not a law firm and does not provide legal advice or legal representation directly.</strong> Any legal representation 
            is provided solely by independent, licensed advocates and law firms selected entirely at the client&apos;s discretion. No advocate-client 
            relationship is established or implied by utilizing this website or engaging in preliminary evaluations.
          </p>
          <p>
            Litigation funding, arbitration finance, and related support services offered under WOBT Capital are structured on a non-recourse basis 
            (unless explicitly agreed otherwise in writing). This structuring is aligned with the legal framework upheld by the Supreme Court of India 
            in <em>Bar Council of India v. A.K. Balaji</em>, which recognizes the validity of third-party litigation funding by non-advocate entities. 
            WOBT is not registered with the Securities and Exchange Board of India (SEBI) as a stock broker, portfolio manager, investment adviser, 
            research analyst, merchant banker, or alternative investment fund (AIF), and nothing on this website constitutes an offer, invitation, 
            or solicitation to invest in securities, deposits, or regulated investment products.
          </p>
          <p>
            We process personal data in strict compliance with the Digital Personal Data Protection (DPDP) Act, 2023. Data principals can address consent 
            revocations or grievance concerns directly to our designated Grievance Officer at 
            <span className="text-[#C8A34A] ml-1">compliance@wobtindia.com</span>. Governing law and arbitration jurisdiction shall reside within the Courts of 
            New Delhi, India.
          </p>
        </div>
      </div>

      {/* Motto centerpiece */}
      <div className="max-w-7xl mx-auto px-6 border-t border-[#C8A34A0A] pt-8 pb-4 text-center">
        <span className="font-serif text-[#C8A34A] text-sm font-semibold tracking-[0.2em] uppercase block">
          Wisdom to Imagine. &bull; Courage to Execute. &bull; Excellence to Transform.
        </span>
      </div>

      {/* Copyright Strip */}
      <div className="max-w-7xl mx-auto px-6 border-t border-[#C8A34A0A]/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
        <span>© {new Date().getFullYear()} White Owls & Black Tigers. All rights reserved.</span>
        <div className="flex gap-6">
          <Link href="#disclaimer" className="hover:text-[#C8A34A] transition-colors">Disclaimer</Link>
          <Link href="#terms" className="hover:text-[#C8A34A] transition-colors">Terms of Service</Link>
          <Link href="#privacy" className="hover:text-[#C8A34A] transition-colors">Privacy Policy</Link>
        </div>
        <button
          onClick={scrollToTop}
          className="w-8 h-8 rounded-full border border-gray-800 hover:border-[#C8A34A] flex items-center justify-center hover:text-white transition-colors cursor-pointer"
          title="Scroll to Top"
        >
          <FiArrowUp />
        </button>
      </div>
    </footer>
  );
}
