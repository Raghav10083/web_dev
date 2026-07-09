"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleNetwork from "@/components/ParticleNetwork";
import SmoothScroll from "@/components/SmoothScroll";
import { FiUsers, FiAward, FiBriefcase, FiBookOpen, FiGlobe, FiGrid } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Membership() {
  const tiers = [
    {
      title: "Individual Member",
      icon: <FiUsers className="text-[#C8A34A] text-xl" />,
      desc: "For independent scholars, researchers, and professional experts seeking connection across multidisciplinary registries.",
      features: [
        "Inclusion in global chapters directory.",
        "LexManage client access for matter logs.",
        "Think Tank journal search accesses.",
      ],
    },
    {
      title: "Professional Member",
      icon: <FiBriefcase className="text-[#C8A34A] text-xl" />,
      desc: "For practicing advocates, Chartered Accountants, arbitrators, and compliance advisors managing client cases.",
      features: [
        "Access to PartnerGrow skill accreditation courses.",
        "Priority eligibility for WOBT Capital litigation funding panels.",
        "Case tracking features in LexManage dashboards.",
      ],
    },
    {
      title: "Institutional Member",
      icon: <FiGrid className="text-[#C8A34A] text-xl" />,
      desc: "For regional secretariats, professional associations, and legal entities aligned with WOBT's code of ethics.",
      features: [
        "Global secretariat integration interfaces.",
        "Practice growth curricula setups.",
        "Joint research publishing councils access.",
      ],
    },
    {
      title: "Corporate Member",
      icon: <FiAward className="text-[#C8A34A] text-xl" />,
      desc: "For enterprises, financial creditors, and resolution applicants seeking restructuring and compliance governance.",
      features: [
        "Priority commercial claim merits evaluations.",
        "Corporate compliance audits under CyberShield.",
        "Access to WOBT Capital co-investment portfolios.",
      ],
    },
    {
      title: "Academic Member / Universities",
      icon: <FiBookOpen className="text-[#C8A34A] text-xl" />,
      desc: "For law schools, technological institutes, and business schools partnering on research and certifying next-gen talent.",
      features: [
        "Direct routing of students into WOBT Young Minds internships.",
        "Co-authoring policy whitepapers with Research Councils.",
        "University credit integrations with WOBT Academy certifications.",
      ],
    },
    {
      title: "Government Relations",
      icon: <FiGlobe className="text-[#C8A34A] text-xl" />,
      desc: "For public sector undertakings, regulators, and legislative drafting offices requesting independent policy reviews.",
      features: [
        "Policy drafting support and precedent index studies.",
        "Dispute neutral mediation portals for public works disputes.",
        "Joint summits on digital justice and cyber security.",
      ],
    },
    {
      title: "Distinguished Fellow",
      icon: <FiAward className="text-[#C8A34A] text-xl" />,
      desc: "Reserved for senior industry leaders, retired judges, and academic chairs nominated to lead WOBT Councils.",
      features: [
        "Seats on WOBT Advisory, Ethics, and Investment Councils.",
        "Lead bilateral cross-border litigation panels.",
        "Direct leadership of regional chapter charters.",
      ],
    },
    {
      title: "Global Ambassador",
      icon: <FiGlobe className="text-[#C8A34A] text-xl" />,
      desc: "By invitation only, representing WOBT across international secretariats to build multidisciplinary chapters.",
      features: [
        "Deploy and represent WOBT on international panels.",
        "Authorize local chapter admissions registers.",
        "Keynote speaker seating priority at annual summits.",
      ],
    },
  ];

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
              WOBT Registry
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-wide max-w-4xl leading-tight mb-6">
              Join the Multidisciplinary Fellowship
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm font-medium tracking-wide max-w-2xl leading-relaxed">
              Affiliation with White Owls &amp; Black Tigers links intellectual capital with leadership. Explore our 8 membership categories.
            </p>
          </div>
        </section>

        {/* Tiers Grid */}
        <section className="py-24 bg-[#090909]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tiers.map((tier, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#030303]/60 border border-gray-900 hover:border-[#C8A34A4D] transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#C8A34A08] border border-[#C8A34A1A] flex items-center justify-center mb-6">
                      {tier.icon}
                    </div>
                    <h3 className="font-serif text-white font-bold text-base tracking-wide mb-3 group-hover:text-[#C8A34A] transition-colors">
                      {tier.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-medium mb-6 min-h-[44px]">
                      {tier.desc}
                    </p>
                    <div className="h-[1px] bg-gray-900 w-full mb-4" />
                    <ul className="flex flex-col gap-2.5">
                      {tier.features.map((feat, fidx) => (
                        <li key={fidx} className="text-[10px] text-gray-500 flex items-start gap-2">
                          <span className="text-[#C8A34A] mt-0.5">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8">
                    <a
                      href="/#contact"
                      className="w-full text-center block py-2.5 rounded-lg border border-gray-800 text-xs font-bold uppercase tracking-wider text-white hover:border-[#C8A34A] transition-colors"
                    >
                      Apply For Admission
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
