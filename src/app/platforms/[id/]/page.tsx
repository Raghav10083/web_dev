"use client";

import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleNetwork from "@/components/ParticleNetwork";
import SmoothScroll from "@/components/SmoothScroll";
import { FiCheckCircle, FiDollarSign, FiCpu, FiTrendingUp, FiLayers, FiShield, FiUsers } from "react-icons/fi";

interface PlatformData {
  title: string;
  headline: string;
  subhead: string;
  overview: string;
  icon: string;
  features: string[];
  process: string[];
  benefits: string[];
  faqs: { q: string; a: string }[];
}

const platformsData: Record<string, PlatformData> = {
  "wobt-capital": {
    title: "WOBT Capital",
    headline: "You Have a Strong Case. Don't Let Money Stop You From Winning It.",
    subhead: "India's trusted litigation finance partner — for businesses and individuals pursuing high-stakes commercial disputes and arbitrations, and for the law firms fighting those matters on their behalf. WOBT funds law firms directly to carry a case through to its conclusion, not only the litigant who brought it.",
    overview: "WOBT Capital provides third-party litigation funding to domestic clients in select, meritorious matters. Funding is structured on a non-recourse basis against the merits of the case — costs are covered, and nothing is owed back if the matter is unsuccessful.",
    icon: "Capital",
    features: [
      "Litigation Finance: Funding structured on a non-recourse basis against merits.",
      "Forensic & Financial Expertise: Enlist CAs, forensic accountants, and insolvency practitioners in the interest of the case.",
      "Direct Law Firm Backing: Covers the carrying cost of fighting a matter to conclusion to manage firm cash flow.",
      "Cross-Border Claims: Funding for complex international arbitrations and disputes.",
    ],
    process: [
      "Identify: Screen and evaluate meritorious legal matters based on strength and potential outcomes.",
      "Select: Curate opportunities aligned with investor preferences and capital allocation.",
      "Deploy: Structure and deploy capital into selected matters with defined terms.",
      "Outcome: Returns generated upon successful outcomes aligned with pre-defined structures.",
    ],
    benefits: [
      "No upfront costs: Complete coverage of court fees, advocate fees, and discovery costs.",
      "No repayment if you lose: Under the non-recourse structure, the funded party owes nothing if unsuccessful.",
      "Decision in days: Fast, professional due diligence desk response.",
    ],
    faqs: [
      {
        q: "What is minimum investment/claim value?",
        a: "Typically, WOBT Capital considers matters with a minimum claim value that ensures viable returns post-litigation costs. Our team evaluates each case individually to determine appropriate funding thresholds.",
      },
      {
        q: "How do we calculate the valuation / returns?",
        a: "Funding is provided on a non-recourse basis — if the funded matter is unsuccessful, the funded party owes no repayment to WOBT. In the event of a successful outcome, WOBT is entitled to an agreed percentage or structured return from the recovery proceeds, as set out in the specific funding agreement.",
      },
      {
        q: "What are reporting requirements for portfolio companies?",
        a: "Law firms and funded clients submit milestone-based or quarterly case status updates directly via WOBT LexManage, ensuring compliance, hearing timeline tracking, and transparency.",
      },
    ],
  },
  "lexai": {
    title: "LexAI",
    headline: "Context-Aware Artificial Intelligence for Advocates",
    subhead: "Purpose-built legal software and AI assistance — research, drafting support, and case-law analysis grounded in Indian law — equips WOBT's network to work faster without cutting corners.",
    overview: "WOBT LexAI is a dedicated technology platform that integrates cognitive models with deep legal databases to assist in research, draft formulation, and statutory mapping.",
    icon: "AI",
    features: [
      "Statutory Case-Law Indexing: Fast retrieval of relevant citations grounded in Indian law.",
      "Autonomous Drafting Assistance: Drafting support for petitions, written statements, and contracts.",
      "Compliance Verification maps: Evaluates documents against current legislative frameworks.",
    ],
    process: [
      "Ingest Matter Data: Safely input case facts and parameters.",
      "Analyze Context: Parse statutory provisions and precedent databases.",
      "Generate Recommendations: Produce research briefs and drafting skeletons.",
      "Refine & Validate: Vetted by legal councils to guarantee zero hallucinations.",
    ],
    benefits: [
      "80% time saving on draftings: Automate skeleton briefs in seconds.",
      "Grounded in Indian Precedents: Highly accurate case citation mapping.",
      "Absolute Data Isolation: Data processed securely complying with the DPDP Act.",
    ],
    faqs: [
      {
        q: "Does LexAI replace advocate counsel?",
        a: "No. LexAI is a research assistant tool. All output must be reviewed, signed, and submitted exclusively by qualified advocates at their sole discretion.",
      },
      {
        q: "How does it align with data privacy regulations?",
        a: "Data processing is fully sandbox-isolated, adhering strictly to the consent and retention limits of the DPDP Act 2023.",
      },
    ],
  },
  "lexmanage": {
    title: "LexManage",
    headline: "Litigation Management & Matter Tracking Portal",
    subhead: "WOBT manages and tracks every matter in its network — hearings, filings, deadlines, and case status — in one place, so nothing is missed and the client always has visibility.",
    overview: "A unified project tracking platform tailored to commercial disputes, managing hearings, filings, deadlines, and case status reports.",
    icon: "Layers",
    features: [
      "Automated hearing calendars: Integrated tracking for court and arbitral dates.",
      "Secure document repository: Encrypted sharing channels between counsel and client.",
      "Compliance audit logs: Maintains a clear timeline of filings and regulatory submissions.",
    ],
    process: [
      "Onboard Matter: Upload case files and parameter profiles.",
      "Map Milestones: Auto-populate filing and hearing calendar grids.",
      "Track Hearings: Live logging of courtroom status and updates.",
      "Archive Outcomes: Secure indexing of resolutions, decrees, and awards.",
    ],
    benefits: [
      "Absolute transparency: Real-time visibility into dispute progression.",
      "Zero missed deadlines: Proactive notification grids for filings.",
      "Centralized oversight: Track multiple regional matters in one dashboard.",
    ],
    faqs: [
      {
        q: "Who has access to the case dashboard?",
        a: "Access permissions are strictly managed by the client, granting secure views to designated advocates, corporate legal teams, or investors.",
      },
    ],
  },
  "lexpartners": {
    title: "LexPartners",
    headline: "Global Network for Cross-Border Disputes",
    subhead: "Where a dispute crosses borders, WOBT connects Indian advocates and law firms with vetted counsel abroad and coordinates strategy across jurisdictions.",
    overview: "An elite international coalition of vetted commercial lawyers and dispute advisors coordinating cross-border litigations and arbitrations.",
    icon: "Globe",
    features: [
      "Bilateral advocacy panels: Fast connections to verified counsel in 50+ jurisdictions.",
      "Foreign registry discoveries: Procuring records and evidence globally through legal channels.",
      "Multi-jurisdictional strategy: Coordinated arbitration representation under international seats.",
    ],
    process: [
      "Assess Dispute Scope: Evaluate cross-border asset structures and jurisdictions.",
      "Select Local Counsel: Delegate to vetted international partners.",
      "Align Strategy: Harmonize proceedings across multiple forums.",
      "Execute & Recover: Coordinated enforcement of decrees and arbitral awards.",
    ],
    benefits: [
      "Vetted global lawyers: Avoid due diligence overheads on international counsel.",
      "Unified billing: Coordinated funding and expense tracking under WOBT Capital.",
      "Evidence consistency: Maintain custody chain across borders.",
    ],
    faqs: [
      {
        q: "How are international law firms vetted?",
        a: "LexPartners maintains strict membership panels evaluated by WOBT Governance Councils for commercial dispute track-records and compliance history.",
      },
    ],
  },
  "lexmediate": {
    title: "LexMediate",
    headline: "Institutional Commercial Dispute Mediation",
    subhead: "A dedicated dispute neutral platform providing structured mediation and arbitration services to settle commercial claims out of court.",
    overview: "Resolve enterprise disputes efficiently and confidentially through WOBT's neutral panels, avoiding prolonged courtroom litigation.",
    icon: "Shield",
    features: [
      "Expert Neutral Panels: Certified commercial mediators, CAs, and retired judges.",
      "Structured Mediation Forums: Secure virtual ADR hearing rooms.",
      "Enforceable Settlements: Settlement drafts formatted for instant court recording.",
    ],
    process: [
      "ADR Request: File dispute parameters and party profiles.",
      "Select Mediator: Mutual appointment of neutral from registry panels.",
      "Convene Sessions: Private caucuses and joint mediation conferences.",
      "Draft Agreement: Formal recording of settlement terms.",
    ],
    benefits: [
      "Absolute confidentiality: Disputes resolved away from public filings.",
      "Drastic cost savings: Fraction of the expenses of typical litigation.",
      "Relationship conservation: Structured for ongoing joint business interests.",
    ],
    faqs: [
      {
        q: "Is a mediation settlement legally binding?",
        a: "Yes. Settlements executed under the Mediation Act, 2023 carry the status of a court decree and are directly enforceable.",
      },
    ],
  },
  "lawbox": {
    title: "LawBox",
    headline: "Secure Evidence Storage — Authenticity Preserved",
    subhead: "Evidence and case documents are stored through WOBT's technology with their authenticity and chain of custody intact from submission to production in court.",
    overview: "A cryptographic evidence vault maintaining absolute file integrity, metadata timestamps, and chain of custody trails.",
    icon: "Shield",
    features: [
      "Tamper-Evident Storage: Files cryptographically hashed to prevent alterations.",
      "Chain of Custody Tracking: Blockchain audit trail logging all access events.",
      "Secure Court Transfers: Sharing files with courts and neutrals preserving validation tokens.",
    ],
    process: [
      "Secure Upload: Encrypted file transmission into isolated storage volumes.",
      "Log Hashes: Generate mathematical checksums of metadata and content.",
      "Verify Trail: Log every viewing or retrieval event on a ledger.",
      "Production: Export validated archives with admissibility certifications.",
    ],
    benefits: [
      "Admissible audit trails: Defend evidence authenticity in courtroom challenges.",
      "Zero signature tampering: Immediate alert grids upon metadata changes.",
      "Complete backups: Distributed encrypted backups preventing file loss.",
    ],
    faqs: [
      {
        q: "Can uploaded files be modified or deleted?",
        a: "No. Once signed and hashed, files inside LawBox are write-once, read-many (WORM) to preserve absolute custody integrity.",
      },
    ],
  },
  "cybershield": {
    title: "CyberShield",
    headline: "Institutional Cybersecurity & Risk Hardening",
    subhead: "Comprehensive cybersecurity risk audits, threat monitoring, and infrastructure hardening for corporations and professional firms.",
    overview: "Advises WOBT chapters, panels, and corporate affiliates on information security controls, vulnerability assessments, and DPDP Act compliance.",
    icon: "Shield",
    features: [
      "Penetration Testing: Proactive assessment of system security boundaries.",
      "DPDP Compliance Hardening: Hardening systems for personal data security.",
      "Threat Incident Containment: Rapid isolation of server breach events.",
    ],
    process: [
      "Security Audit: Map corporate network topology and data flows.",
      "Vulnerability Identification: Conduct automated and manual security tests.",
      "Patching & Controls: Implement firewalls, encryption, and policies.",
      "Hardening Review: Continual threat checking and compliance verification.",
    ],
    benefits: [
      "Prevent data leaks: Shield client files and dispute records.",
      "DPDP Act alignment: Avoid heavy administrative penalties for data breaches.",
      "24/7 Threat Protection: Active checking of digital directories.",
    ],
    faqs: [
      {
        q: "Who conducts the cybersecurity audits?",
        a: "Audits are executed by WOBT Technology Councils staffed with certified ISO/IEC 27001 auditors and security engineers.",
      },
    ],
  },
  "partnergrow": {
    title: "PartnerGrow",
    headline: "Advocate Skill Updating & Practice Growth",
    subhead: "WOBT guides, trains, updates, and equips the advocates and law firms in its network — from practice-management support to skill-building.",
    overview: "A professional curriculum updates registry, training advocates on legal technology, litigation funding metrics, and commercial case management.",
    icon: "Users",
    features: [
      "Legal Tech Training: Software modules covering LexAI and LexManage systems.",
      "Dispute Finance Updates: Structuring cases for WOBT Capital reviews.",
      "Practice Management tools: Support for billing, scheduling, and registries.",
    ],
    process: [
      "Access Registry: Register advocate credentials on the learning portal.",
      "Complete Modules: Attend lectures on digital justice and ADR.",
      "Earn Certification: Validate capabilities through WOBT Academy exams.",
      "Align Practice: Receive cases routed from WOBT Capital registries.",
    ],
    benefits: [
      "Competitive edge: Gain skills in AI drafting and litigation finance.",
      "Access to funded files: Priority placement on WOBT Capital advocate panels.",
      "Modern practice toolsets: Automate client tracking and billings.",
    ],
    faqs: [
      {
        q: "Who is eligible for WOBT PartnerGrow certifications?",
        a: "Licenses are open to registered advocates, Chartered Accountants, and corporate risk advisors on WOBT directories.",
      },
    ],
  },
  "careernext": {
    title: "CareerNext",
    headline: "Executive Professional Placement Registry",
    subhead: "Connecting senior professionals, Chartered Accountants, legal experts, and risk advisors with institutional placements and advisory seats.",
    overview: "A premium search registry matching senior professionals across law, finance, and technology with boards, corporate panels, and WOBT Councils.",
    icon: "Users",
    features: [
      "Strategic Board Placement: Matching senior experts to board seat openings.",
      "Council Registries: Selection panels for WOBT Governance advisory roles.",
      "Executive Credentialing: Vetting of professional compliance and milestones.",
    ],
    process: [
      "Register Profile: Secure submission of qualifications and career history.",
      "Vetting Process: Verify achievements and compliance records.",
      "Match Seating: Align with institutional panel opportunities.",
      "Placement: Appointment to corporate or advisory boards.",
    ],
    benefits: [
      "Exclusive board openings: Direct route to institutional advisory seats.",
      "Multidisciplinary alliances: Access board positions requiring finance-tech overlaps.",
      "Credibility verify: Verified credential seals on professional directories.",
    ],
    faqs: [
      {
        q: "Who qualifies for the CareerNext directory?",
        a: "Senior partners, retired judges, senior Chartered Accountants, and corporate risk executives with 15+ years of credentials.",
      },
    ],
  },
  "youngminds": {
    title: "Young Minds",
    headline: "Fellowships & Mentoring for Next-Gen Leaders",
    subhead: "Practice-management guides, research internships, and skill-building modules for the next generation of lawyers and professionals.",
    overview: "Coordinates research internships, academic fellowships, and mentoring channels under the guidance of WOBT Distinguished Fellows.",
    icon: "Users",
    features: [
      "Mentorship Matching: Connect young scholars with veteran partners.",
      "Research Assistantships: Placement inside WOBT Think Tanks.",
      "Practice Management guides: Standard manuals for legal and financial startups.",
    ],
    process: [
      "Submit Application: Open to outstanding law and finance university students.",
      "Council Selection: Merit-based evaluation of scholastic profiles.",
      "Mentor Assignment: Matched with a WOBT Fellow.",
      "Conduct Fellowships: Perform research and draft policy reports.",
    ],
    benefits: [
      "Distinguished mentoring: Direct guidance from global industry leaders.",
      "Think Tank publications: Opportunities to co-author policy whitepapers.",
      "Academy Credits: Earn academic accreditations recognized by universities.",
    ],
    faqs: [
      {
        q: "What is the duration of WOBT internships?",
        a: "Typically, research internships span 3 to 6 months, conducted virtually or at chapter locations.",
      },
    ],
  },
};

export default function PlatformDetail() {
  const { id } = useParams();
  const platformId = Array.isArray(id) ? id[0] : id;

  const data = platformsData[platformId || ""];

  if (!data) {
    notFound();
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "Capital":
        return <FiDollarSign className="text-4xl text-[#C8A34A]" />;
      case "AI":
        return <FiCpu className="text-4xl text-[#C8A34A]" />;
      case "Layers":
        return <FiLayers className="text-4xl text-[#C8A34A]" />;
      case "Globe":
        return <FiLayers className="text-4xl text-[#C8A34A]" />;
      case "Shield":
        return <FiShield className="text-4xl text-[#C8A34A]" />;
      default:
        return <FiUsers className="text-4xl text-[#C8A34A]" />;
    }
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen">
        <div className="noise-overlay" />
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-44 pb-24 overflow-hidden bg-gradient-to-b from-[#030303] to-[#090909] border-b border-gray-950">
          <ParticleNetwork />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] gold-glow-radial pointer-events-none opacity-60" />

          <div className="max-w-7xl mx-auto px-6 z-10 text-center relative flex flex-col items-center">
            <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest mb-4">
              WOBT Ecosystem Platform
            </span>
            <div className="w-16 h-16 rounded-2xl bg-[#C8A34A0D] border border-[#C8A34A26] flex items-center justify-center mb-6">
              {getIcon(data.icon)}
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-wide max-w-4xl leading-tight mb-6">
              {data.headline}
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm font-medium tracking-wide max-w-2xl leading-relaxed">
              {data.subhead}
            </p>
          </div>
        </section>

        {/* Overview & Features */}
        <section className="py-32 bg-[#090909] relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              {/* Overview panel */}
              <div className="lg:col-span-5 bg-[#030303]/60 border border-gray-900 rounded-3xl p-8 lg:p-10 relative">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  Overview
                </span>
                <h2 className="font-serif text-white text-2xl font-bold tracking-wide mt-2 mb-6">
                  Platform Initiative
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  {data.overview}
                </p>
              </div>

              {/* Features list */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block pl-2">
                  Key Capabilities
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.features.map((feature, idx) => {
                    const parts = feature.split(":");
                    const title = parts[0];
                    const body = parts[1] || "";
                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-[#030303]/40 border border-gray-900 hover:border-gray-800 transition-all flex flex-col gap-2"
                      >
                        <h4 className="font-serif text-white font-semibold text-xs tracking-wider uppercase">
                          {title}
                        </h4>
                        <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                          {body.trim()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Flow */}
        <section className="py-32 bg-[#030303]/30 border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                Execution
              </span>
              <h2 className="font-serif text-3xl text-white font-bold tracking-wide mt-2">
                Operational Framework
              </h2>
              <p className="text-xs text-gray-500 mt-4 leading-relaxed font-medium">
                The structured process lifecycle defined for this platform initiative.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.process.map((item, idx) => {
                const parts = item.split(":");
                const title = parts[0];
                const body = parts[1] || "";
                return (
                  <div key={idx} className="p-6 rounded-2xl bg-[#0E0E0E] border border-gray-900 relative overflow-hidden">
                    <span className="font-mono text-5xl font-extrabold text-[#C8A34A0A] absolute top-2 right-4">
                      {`0${idx + 1}`}
                    </span>
                    <span className="text-[10px] text-[#C8A34A] font-bold uppercase tracking-widest font-mono">
                      Step 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-white font-bold text-base mt-2 mb-3">
                      {title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
                      {body.trim()}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-32 bg-[#090909] border-t border-gray-950 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                Advantage
              </span>
              <h2 className="font-serif text-3xl text-white font-bold tracking-wide mt-2">
                Key Benefits &amp; Outcomes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {data.benefits.map((item, idx) => {
                const parts = item.split(":");
                const title = parts[0];
                const body = parts[1] || "";
                return (
                  <div key={idx} className="p-6 rounded-2xl bg-gray-950 border border-gray-900 flex items-start gap-4">
                    <FiCheckCircle className="text-[#C8A34A] text-base mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-serif text-white font-bold text-xs uppercase tracking-wider mb-2">
                        {title}
                      </h4>
                      {body && (
                        <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                          {body.trim()}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 bg-[#030303]/30 border-t border-gray-950 relative">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-20">
              <span className="text-[#C8A34A] text-xs font-bold uppercase tracking-widest">
                Inquiries
              </span>
              <h2 className="font-serif text-3xl text-white font-bold tracking-wide mt-2">
                Frequently Answered Protocols
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {data.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#090909] border border-gray-900">
                  <h4 className="font-serif text-[#C8A34A] text-xs font-semibold uppercase tracking-wider mb-2">
                    {faq.q}
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 bg-[#090909] border-t border-gray-950 relative">
          <div className="max-w-4xl mx-auto px-6 bg-[#030303] border border-gray-900 rounded-3xl p-10 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 gold-glow-radial pointer-events-none opacity-40" />
            
            <span className="text-[10px] text-[#C8A34A] font-bold uppercase tracking-widest block mb-4">
              Registry Contact
            </span>
            <h2 className="font-serif text-2xl lg:text-3xl text-white font-bold tracking-wide leading-snug mb-4">
              Initiate Engagement with {data.title}
            </h2>
            <p className="text-xs text-gray-400 max-w-lg mx-auto mb-8 font-medium leading-relaxed">
              Submit your dispute, application, or partnership file to our Governance Councils for merit screening.
            </p>
            <a
              href="/#contact"
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C8A34A] hover:bg-white hover:text-[#090909] transition-all duration-300 shadow-[0_0_15px_rgba(200,163,74,0.3)] inline-block"
            >
              Contact Platform Desk
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
