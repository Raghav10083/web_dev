"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiChevronDown, FiArrowRight, FiActivity } from "react-icons/fi";
import { FaGraduationCap, FaCoins, FaBalanceScale, FaUsers } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMegaMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const pillars = [
    {
      name: "Knowledge",
      icon: <FaGraduationCap className="text-[#C8A34A] text-lg" />,
      desc: "Research, Education, AI, Innovation, Technology & Science.",
      links: ["Research Papers", "WOBT Academy", "LexAI Platform", "Innovation Index"],
    },
    {
      name: "Capital",
      icon: <FaCoins className="text-[#C8A34A] text-lg" />,
      desc: "Litigation Funding, Venture Capital, & Growth Partnerships.",
      links: ["WOBT Capital", "Venture Registry", "Economic Advisory", "Sovereign Growth"],
    },
    {
      name: "Justice",
      icon: <FaBalanceScale className="text-[#C8A34A] text-lg" />,
      desc: "Law, Governance, Mediation, Ethics, & Dispute Resolution.",
      links: ["LexPartners", "LexMediate", "LexManage Tracking", "Ethics Councils"],
    },
    {
      name: "Society",
      icon: <FaUsers className="text-[#C8A34A] text-lg" />,
      desc: "Public Policy, Healthcare, Climate Infrastructure, & Communities.",
      links: ["Public Policy", "Global Chapters", "Humanitarian Fund", "Ethics Forum"],
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#030303]/85 backdrop-blur-2xl py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)] border-b border-[#C8A34A1A]"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo with scroll-responsive scaling */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className={`rounded-full border border-[#C8A34A] flex items-center justify-center bg-[#090909] shadow-inner transition-all duration-500 ${
                scrolled ? "w-8 h-8" : "w-10 h-10"
              }`}
            >
              <span className={`font-serif text-[#C8A34A] font-bold tracking-widest transition-all ${scrolled ? "text-[10px]" : "text-xs"}`}>
                W
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-white font-bold tracking-[0.2em] text-xs group-hover:text-[#C8A34A] transition-colors duration-300">
                WOBT
              </span>
              <span className="text-[8px] tracking-[0.3em] uppercase text-gray-500 font-semibold">
                Institution
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Animated underlines */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors relative py-1.5 group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C8A34A] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/#about" className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors relative py-1.5 group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C8A34A] transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Mega Menu Trigger */}
            <div className="relative py-1.5">
              <button
                onClick={() => toggleMegaMenu("ecosystem")}
                onMouseEnter={() => setActiveMenu("ecosystem")}
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                Ecosystem
                <FiChevronDown className={`transition-transform duration-300 ${activeMenu === "ecosystem" ? "rotate-180" : ""}`} />
              </button>
            </div>

            <Link href="/#platforms" className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors relative py-1.5 group">
              Platforms
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C8A34A] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/research" className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors relative py-1.5 group">
              Research
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C8A34A] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/membership" className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors relative py-1.5 group">
              Membership
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C8A34A] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/#contact" className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors relative py-1.5 group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C8A34A] transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/membership"
              className="relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#090909] bg-[#C8A34A] hover:bg-white hover:text-[#090909] transition-all duration-300 flex items-center gap-2 group overflow-hidden shadow-[0_0_15px_rgba(200,163,74,0.3)] hover:scale-105"
            >
              Become a Member
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-300 hover:text-white focus:outline-none text-2xl"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mega Menu Dropdown */}
        {activeMenu === "ecosystem" && (
          <div
            onMouseLeave={() => setActiveMenu(null)}
            className="absolute left-0 w-full bg-[#0E0E0E]/95 backdrop-blur-2xl border-b border-[#C8A34A1C] shadow-2xl py-12 px-8 transition-all duration-500 hidden lg:block z-40"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              {pillars.map((pillar) => (
                <div key={pillar.name} className="flex flex-col gap-4 p-4 rounded-lg hover:bg-[#131313]/60 border border-transparent hover:border-[#C8A34A0F] transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#C8A34A0D] flex items-center justify-center border border-[#C8A34A1A]">
                      {pillar.icon}
                    </div>
                    <span className="font-serif text-white font-semibold text-base tracking-wide">
                      {pillar.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed min-h-[40px] font-medium">
                    {pillar.desc}
                  </p>
                  <div className="h-[1px] bg-gray-800/50 w-full" />
                  <ul className="flex flex-col gap-2">
                    {pillar.links.map((link) => (
                      <li key={link}>
                        <Link
                          href={link === "WOBT Capital" ? "/#wobt-capital" : "/#platforms"}
                          onClick={() => setActiveMenu(null)}
                          className="text-[11px] text-gray-500 hover:text-[#C8A34A] flex items-center gap-1.5 transition-colors duration-200"
                        >
                          <FiActivity className="text-[10px]" />
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed inset-0 bg-[#090909] z-40 lg:hidden flex flex-col pt-24 px-8 pb-10 transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-6 text-lg font-serif">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-[#C8A34A] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/#about"
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-[#C8A34A] transition-colors"
          >
            About
          </Link>
          <button
            onClick={() => toggleMegaMenu("mobile-ecosystem")}
            className="text-left text-gray-300 hover:text-[#C8A34A] transition-colors flex items-center justify-between"
          >
            Ecosystem
            <FiChevronDown className={`transition-transform ${activeMenu === "mobile-ecosystem" ? "rotate-180" : ""}`} />
          </button>
          {activeMenu === "mobile-ecosystem" && (
            <div className="pl-4 flex flex-col gap-3 border-l border-[#C8A34A1C]">
              {pillars.map((p) => (
                <div key={p.name} className="flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-sans font-bold">
                    {p.name}
                  </span>
                  <div className="flex flex-col gap-1 pl-2">
                    {p.links.map((link) => (
                      <Link
                        key={link}
                        href={link === "WOBT Capital" ? "/#wobt-capital" : "/#platforms"}
                        onClick={() => setIsOpen(false)}
                        className="text-xs text-gray-500 hover:text-white"
                      >
                        {link}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link
            href="/#platforms"
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-[#C8A34A] transition-colors"
          >
            Platforms
          </Link>
          <Link
            href="/research"
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-[#C8A34A] transition-colors"
          >
            Research
          </Link>
          <Link
            href="/membership"
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-[#C8A34A] transition-colors"
          >
            Membership
          </Link>
          <Link
            href="/#contact"
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-[#C8A34A] transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="mt-auto">
          <Link
            href="/membership"
            onClick={() => setIsOpen(false)}
            className="w-full text-center block px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#090909] bg-[#C8A34A] hover:bg-white hover:text-[#090909] transition-all duration-300 shadow-[0_0_15px_rgba(200,163,74,0.3)]"
          >
            Become a Member
          </Link>
        </div>
      </div>
    </>
  );
}
