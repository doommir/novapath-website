import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import danPresenting from "@assets/copyofdan_1770090391461.png";

const CALENDLY_URL = "https://calendly.com/novapath711/30min";

// ─── Color tokens ────────────────────────────────────────────────────────────
const C = {
  bg:         "#F8F7F4",   // warm off-white
  bgAlt:      "#F0EFE9",   // slightly deeper
  bgCard:     "#FFFFFF",   // card surface
  border:     "rgba(0,0,0,0.09)",
  borderMid:  "rgba(0,0,0,0.16)",
  white:      "#1C1B18",   // primary text (dark)
  muted:      "#6B6760",   // secondary text
  faint:      "#9A9890",   // tertiary / labels
  amber:      "#C9873A",   // accent
  amberDim:   "rgba(201,135,58,0.10)",
  amberBorder:"rgba(201,135,58,0.35)",
  blue:       "#3D6494",   // muted blue (deepened for light bg)
  blueDim:    "rgba(61,100,148,0.10)",
} as const;

function fade(delay = 0) {
  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay },
  };
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function NovaPathConsulting() {
  const formRef    = useRef<HTMLDivElement>(null);
  const caseRef    = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.bg, fontFamily: "'Inter', system-ui, sans-serif", color: C.white }}>
      <StickyNav
        onCases={() => scrollTo(caseRef)}
        onNetwork={() => scrollTo(networkRef)}
        onContact={() => scrollTo(formRef)}
      />
      <Hero
        onNetwork={() => scrollTo(networkRef)}
        onCases={() => scrollTo(caseRef)}
        onContact={() => scrollTo(formRef)}
      />
      <div ref={caseRef}><CaseStudies /></div>
      <div ref={networkRef}><NetworkSection onContact={() => scrollTo(formRef)} /></div>
      <AboutDan />
      <div ref={formRef}><ContactForm /></div>
      <SiteFooter />
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function StickyNav({
  onCases, onNetwork, onContact,
}: {
  onCases: () => void;
  onNetwork: () => void;
  onContact: () => void;
}) {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Work",       action: onCases },
    { label: "Network",    action: onNetwork },
    { label: "About",      action: onContact },
    { label: "Research",   href: "https://smarterbydesign.app", external: true },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "rgba(248,247,244,0.95)",
        borderBottom: `1px solid ${C.border}`,
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <a
          href="#"
          className="text-base font-semibold tracking-tight flex-shrink-0"
          style={{ color: C.white, letterSpacing: "-0.01em" }}
          data-testid="link-logo"
        >
          NovaPath
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) =>
            l.href ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: C.muted }}
                data-testid={`link-nav-${l.label.toLowerCase()}`}
              >
                {l.label}
              </a>
            ) : (
              <button
                key={l.label}
                onClick={l.action}
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: C.muted }}
                data-testid={`link-nav-${l.label.toLowerCase()}`}
              >
                {l.label}
              </button>
            )
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex px-4 py-1.5 text-sm font-semibold rounded-sm transition-opacity hover:opacity-80"
            style={{ backgroundColor: C.amber, color: "#0F0F0F" }}
            data-testid="button-nav-cta"
          >
            Book a Call
          </a>
          <button
            className="md:hidden p-1.5"
            style={{ color: C.muted }}
            onClick={() => setOpen(!open)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-5 flex flex-col gap-4" style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1rem" }}>
          {links.map((l) =>
            l.href ? (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm" style={{ color: C.muted }} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ) : (
              <button key={l.label} onClick={() => { l.action?.(); setOpen(false); }} className="text-sm text-left" style={{ color: C.muted }}>
                {l.label}
              </button>
            )
          )}
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold" style={{ color: C.amber }}>
            Book a Call
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({
  onNetwork,
  onCases,
  onContact,
}: {
  onNetwork: () => void;
  onCases: () => void;
  onContact: () => void;
}) {
  const rm = useReducedMotion();

  return (
    <section
      className="relative"
      style={{ paddingTop: "160px", paddingBottom: "100px", borderBottom: `1px solid ${C.border}` }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={rm ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={rm ? { duration: 0 } : { duration: 0.5 }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-8"
            style={{ color: C.amber, letterSpacing: "0.14em" }}
          >
            K-12 AI Infrastructure
          </p>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold leading-none mb-8"
          style={{ color: C.white, letterSpacing: "-0.035em", lineHeight: 1.02 }}
          initial={rm ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={rm ? { duration: 0 } : { duration: 0.6, delay: 0.08 }}
          data-testid="text-hero-headline"
        >
          Designing the Future
          <br />
          Before It Designs Us
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl leading-relaxed mb-12 max-w-2xl"
          style={{ color: C.muted }}
          initial={rm ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={rm ? { duration: 0 } : { duration: 0.6, delay: 0.16 }}
        >
          AI infrastructure, implementation systems, and operational intelligence for schools — built inside real classrooms and deployed at scale.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3"
          initial={rm ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={rm ? { duration: 0 } : { duration: 0.6, delay: 0.24 }}
        >
          <button
            onClick={onNetwork}
            className="px-6 py-3 text-sm font-semibold rounded-sm transition-opacity hover:opacity-80"
            style={{ backgroundColor: C.amber, color: "#0F0F0F" }}
            data-testid="button-hero-network"
          >
            Join the Network
          </button>
          <button
            onClick={onCases}
            className="px-6 py-3 text-sm font-medium rounded-sm border transition-opacity hover:opacity-70"
            style={{ color: C.white, borderColor: C.borderMid }}
            data-testid="button-hero-cases"
          >
            See Our Work
          </button>
          <button
            onClick={onContact}
            className="px-6 py-3 text-sm font-medium rounded-sm transition-opacity hover:opacity-70"
            style={{ color: C.muted }}
            data-testid="button-hero-contact"
          >
            Get in touch
          </button>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-x-8 gap-y-2 mt-14"
          initial={rm ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={rm ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
        >
          {["California SB 1288 AI Workgroup", "Featured in Education Week", "ASU+GSV · FETC · CSDC Speaker", "Navigator Schools"].map((c, i) => (
            <span key={i} className="text-xs" style={{ color: C.faint }} data-testid={`cred-item-${i}`}>{c}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Case Studies ─────────────────────────────────────────────────────────────
function CaseStudies() {
  const rm = useReducedMotion();

  const cases = [
    {
      label: "Case Study 01",
      name: "CoachOS",
      context: "K–8 Charter Network · California",
      metric: "+19%",
      metricLabel: "Instructional practice improvement, network-wide, one school year",
      body: "1,892 classroom observations. 2,185 targeted action steps. Leaders moved from guessing to answering in real time.",
      accent: C.amber,
    },
    {
      label: "Case Study 02",
      name: "NaviGrade",
      context: "AI Writing Assessment · Multiple Classrooms",
      metric: "1,014",
      metricLabel: "Student writing responses analyzed in 90 days",
      body: "Average score climbed from 2.13 to 3.31. Teachers adjusted instruction the next day — not weeks later.",
      accent: C.blue,
    },
    {
      label: "Case Study 03",
      name: "Head Start Compliance",
      context: "Early Childhood Program · Multi-Site",
      metric: "2,000+",
      metricLabel: "Compliance artifacts generated, audit-ready, in six weeks",
      body: "Replaced paper sign-ins and fragmented spreadsheets with a live dashboard. Compliant before the review is announced.",
      accent: C.muted,
    },
  ];

  return (
    <section style={{ paddingTop: "80px", paddingBottom: "80px", backgroundColor: C.bgAlt, borderBottom: `1px solid ${C.border}` }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fade()} className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.amber, letterSpacing: "0.14em" }}>
            Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: C.white, letterSpacing: "-0.025em" }}>
            Real engagements. Real data.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              {...fade(i * 0.07)}
              className="p-7"
              style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              data-testid={`card-case-study-${i}`}
            >
              <div style={{ height: "2px", backgroundColor: c.accent, marginBottom: "24px" }} />
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.faint, letterSpacing: "0.12em" }}>
                {c.label}
              </div>
              <div className="text-xl font-bold mb-1" style={{ color: C.white }}>{c.name}</div>
              <div className="text-xs mb-6" style={{ color: C.faint }}>{c.context}</div>
              <div className="text-5xl font-bold mb-1" style={{ color: C.white, letterSpacing: "-0.04em" }}>{c.metric}</div>
              <div className="text-xs mb-6" style={{ color: C.faint }}>{c.metricLabel}</div>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{c.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Network / Membership ─────────────────────────────────────────────────────
type MemberTier = "educator" | "school" | "founding";

const TIER_ROLES: Record<MemberTier, string[]> = {
  educator: ["Classroom Teacher", "Instructional Coach", "Curriculum Director", "Department Head", "Library / Media Specialist", "Ed Tech Lead", "Other"],
  school:   ["Principal / Head of School", "Superintendent / Executive Director", "Chief Academic Officer", "Chief of Staff", "Innovation Director", "Board Member", "Other"],
  founding: ["Superintendent / Executive Director", "Chief Academic Officer", "Executive Director (Charter)", "Innovation Director", "Chief of Staff", "Board Member", "Other"],
};

const TIERS = [
  {
    key: "educator" as MemberTier,
    name: "Associate Member",
    audience: "Individual Educators",
    desc: "For classroom teachers, instructional coaches, curriculum leads, and ed tech practitioners ready to build, not just attend.",
    badge: null,
    featured: false,
    benefits: [
      "Monthly practitioner cohorts with active implementers",
      "Research briefings — what's working in real schools",
      "Full NovaPath tool library: frameworks, rubrics, templates",
      "Live build sessions — watch systems get built in real time",
      "Peer operator community (no vendors, no salespeople)",
    ],
  },
  {
    key: "school" as MemberTier,
    name: "School Member",
    audience: "Schools & Networks",
    desc: "For schools, charter networks, and district innovation offices that want named membership, priority access, and shared infrastructure.",
    badge: null,
    featured: false,
    benefits: [
      "Named organizational membership in the network",
      "AI use policy templates & board presentation kits",
      "Quarterly leadership briefings for district/executive teams",
      "Shared pilot programs across member sites",
      "Priority access to NovaPath consulting engagements",
      "All Associate Member benefits included",
    ],
  },
  {
    key: "founding" as MemberTier,
    name: "Founding Member",
    audience: "First 12 Schools Only",
    desc: "A limited cohort of schools who will co-design the network's direction, share earliest access to every system, and shape what this becomes.",
    badge: "12 Spots · Invitation / Application",
    featured: true,
    benefits: [
      "All School Member benefits, plus:",
      "Co-design network curriculum and research agenda",
      "Custom AI system implementation support",
      "Annual Founding Member Summit invitation",
      "Recognition in all NovaPath publications & reports",
      "Direct advisory relationship with NovaPath leadership",
    ],
  },
];

function NetworkSection({ onContact }: { onContact: () => void }) {
  const rm = useReducedMotion();
  const formRef = useRef<HTMLDivElement>(null);
  const [activeTier, setActiveTier] = useState<MemberTier | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", organization: "", role: "", building: "" });

  function selectTier(t: MemberTier) {
    setActiveTier(t);
    setForm(f => ({ ...f, role: "" }));
    setFormError("");
    setSubmitted(false);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    if (!form.name.trim() || !form.email.trim() || !form.organization.trim() || !form.role) {
      setFormError("Please fill out all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/network-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, membershipType: activeTier }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else setFormError("Something went wrong. Please try again.");
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const activeRoles = activeTier ? TIER_ROLES[activeTier] : [];
  const activeTierData = TIERS.find(t => t.key === activeTier);

  return (
    <section style={{ paddingTop: "96px", paddingBottom: "96px", backgroundColor: C.bgAlt, borderBottom: `1px solid ${C.border}` }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div {...fade()} className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: C.amber, letterSpacing: "0.14em" }}>Membership</p>
          <div className="flex flex-wrap items-end gap-x-10 gap-y-4 mb-5">
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: C.white, letterSpacing: "-0.025em", lineHeight: 1.08 }}>
              Education Innovation Network
            </h2>
          </div>
          <p className="text-lg max-w-2xl" style={{ color: C.muted }}>
            Formal membership for schools and educators who are building the next generation of AI-integrated learning environments. Join the way leading organizations join professional associations — with standing, with access, and with accountability to a shared mission.
          </p>
        </motion.div>

        {/* ── Principles bar ── */}
        <motion.div {...fade(0.05)} className="flex flex-wrap gap-x-8 gap-y-3 mb-16 pt-8" style={{ borderTop: `1px solid ${C.border}` }}>
          {["Practitioner-led", "School-controlled", "Research-grounded", "No vendors in the room"].map((p, i) => (
            <span key={i} className="text-xs font-medium" style={{ color: C.faint }} data-testid={`network-principle-${i}`}>
              — {p}
            </span>
          ))}
        </motion.div>

        {/* ── Tier cards ── */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.key}
              {...fade(i * 0.07)}
              data-testid={`card-tier-${t.key}`}
              className="flex flex-col"
              style={{
                border: t.featured ? `1px solid ${C.amberBorder}` : `1px solid ${C.border}`,
                backgroundColor: t.featured ? "rgba(201,135,58,0.04)" : C.bg,
              }}
            >
              {/* Card header */}
              <div className="px-7 pt-7 pb-6" style={{ borderBottom: `1px solid ${t.featured ? C.amberBorder : C.border}` }}>
                {t.badge && (
                  <div className="inline-block text-xs font-semibold px-2.5 py-1 mb-4" style={{ backgroundColor: C.amberDim, color: C.amber }}>
                    {t.badge}
                  </div>
                )}
                <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: t.featured ? C.amber : C.faint, letterSpacing: "0.12em" }}>
                  {t.audience}
                </div>
                <div className="text-xl font-bold mb-3" style={{ color: C.white }}>
                  {t.name}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                  {t.desc}
                </p>
              </div>

              {/* Benefits */}
              <div className="px-7 py-6 flex-1">
                <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.faint, letterSpacing: "0.11em" }}>
                  Member Benefits
                </div>
                <ul className="space-y-3">
                  {t.benefits.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-3" data-testid={`benefit-${t.key}-${bi}`}>
                      <div className="w-1 h-1 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: t.featured ? C.amber : C.muted }} />
                      <span className="text-sm leading-snug" style={{ color: t.featured && bi === 0 ? C.muted : C.muted, fontStyle: bi === 0 && t.key === "founding" ? "italic" : "normal" }}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="px-7 pb-7">
                <button
                  onClick={() => selectTier(t.key)}
                  data-testid={`button-apply-${t.key}`}
                  className="w-full py-3 text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: t.featured ? C.amber : "transparent",
                    color: t.featured ? "#0F0F0F" : C.white,
                    border: t.featured ? "none" : `1px solid ${C.borderMid}`,
                  }}
                >
                  {t.key === "founding" ? "Apply for Founding Membership" : `Apply — ${t.name}`}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Application form (appears when a tier is selected) ── */}
        {activeTier && (
          <motion.div
            ref={formRef}
            initial={rm ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={rm ? { duration: 0 } : { duration: 0.35 }}
          >
            <div style={{ borderTop: `2px solid ${activeTierData?.featured ? C.amber : C.borderMid}`, paddingTop: "48px" }}>

              <div className="grid md:grid-cols-2 gap-16 items-start">

                {/* Left: what you're applying for */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: activeTierData?.featured ? C.amber : C.faint, letterSpacing: "0.12em" }}>
                    Membership Application
                  </p>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: C.white }}>
                    {activeTierData?.name}
                  </h3>
                  <p className="text-sm leading-relaxed mb-8" style={{ color: C.muted }}>
                    {activeTierData?.key === "founding"
                      ? "Founding membership is limited to 12 schools. We'll review every application personally and respond within three business days. If selected, you'll help shape the network from day one."
                      : "We review every application and respond within two business days. Membership is open to anyone actively building in a school, network, or district context."}
                  </p>

                  <div className="space-y-0">
                    <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.faint, letterSpacing: "0.11em" }}>Included with this membership</div>
                    {activeTierData?.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-3 py-3" style={{ borderBottom: `1px solid ${C.border}` }}>
                        <div className="w-1 h-1 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: C.amber }} />
                        <span className="text-sm" style={{ color: C.muted, fontStyle: i === 0 && activeTierData.key === "founding" ? "italic" : "normal" }}>{b}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveTier(null)}
                    className="mt-6 text-xs transition-opacity hover:opacity-60"
                    style={{ color: C.faint }}
                    data-testid="button-close-form"
                  >
                    ← Choose a different membership tier
                  </button>
                </div>

                {/* Right: form */}
                <div>
                  <div className="p-8" style={{ border: `1px solid ${activeTierData?.featured ? C.amberBorder : C.borderMid}`, backgroundColor: C.bg }}>
                    {submitted ? (
                      <div className="py-8 text-center">
                        <div className="w-10 h-10 flex items-center justify-center mx-auto mb-5" style={{ border: `1px solid ${C.amber}` }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2.5 8.5L6.5 12.5L13.5 4.5" stroke={C.amber} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="text-base font-semibold mb-2" style={{ color: C.white }}>Application received</div>
                        <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                          Thank you for applying. We'll review your application and follow up within {activeTierData?.key === "founding" ? "three" : "two"} business days.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-network-join">
                        <div className="text-sm font-semibold mb-1" style={{ color: C.white }}>
                          Complete your application
                        </div>

                        <div>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: C.muted }}>Full name *</label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            placeholder="Your name"
                            className="w-full px-3 py-2.5 text-sm bg-transparent outline-none"
                            style={{ border: `1px solid ${C.border}`, color: C.white }}
                            data-testid="input-network-name"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: C.muted }}>Work email *</label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            placeholder="you@school.org"
                            className="w-full px-3 py-2.5 text-sm bg-transparent outline-none"
                            style={{ border: `1px solid ${C.border}`, color: C.white }}
                            data-testid="input-network-email"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: C.muted }}>
                            {activeTierData?.key === "educator" ? "School or organization *" : "School / network / district name *"}
                          </label>
                          <input
                            type="text"
                            value={form.organization}
                            onChange={e => setForm(f => ({ ...f, organization: e.target.value }))}
                            placeholder={activeTierData?.key === "educator" ? "School or district name" : "Organization name"}
                            className="w-full px-3 py-2.5 text-sm bg-transparent outline-none"
                            style={{ border: `1px solid ${C.border}`, color: C.white }}
                            data-testid="input-network-organization"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: C.muted }}>Your role *</label>
                          <select
                            value={form.role}
                            onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                            className="w-full px-3 py-2.5 text-sm outline-none"
                            style={{ border: `1px solid ${C.border}`, color: form.role ? C.white : C.faint, backgroundColor: C.bg }}
                            data-testid="select-network-role"
                          >
                            <option value="" disabled>Select your role</option>
                            {activeRoles.map(r => (
                              <option key={r} value={r} style={{ backgroundColor: C.bgCard, color: C.white }}>{r}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: C.muted }}>
                            {activeTierData?.key === "founding" ? "What would you most want to build or shape within this network? *" : "What are you working to build? (optional)"}
                          </label>
                          <textarea
                            value={form.building}
                            onChange={e => setForm(f => ({ ...f, building: e.target.value }))}
                            placeholder="Describe the system, outcome, or change you're working toward in your school or district…"
                            rows={3}
                            className="w-full px-3 py-2.5 text-sm bg-transparent outline-none resize-none"
                            style={{ border: `1px solid ${C.border}`, color: C.white }}
                            data-testid="textarea-network-building"
                          />
                        </div>

                        {formError && (
                          <p className="text-xs" style={{ color: "#E87070" }} data-testid="text-network-error">{formError}</p>
                        )}

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-50"
                          style={{ backgroundColor: C.amber, color: "#0F0F0F" }}
                          data-testid="button-network-submit"
                        >
                          {submitting ? "Submitting…" : "Submit application"}
                        </button>

                        <p className="text-xs text-center" style={{ color: C.faint }}>
                          By submitting, you agree that NovaPath may contact you about your application.
                        </p>
                      </form>
                    )}
                  </div>

                  <div className="mt-4">
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-6 py-3 text-sm font-medium text-center border transition-opacity hover:opacity-70"
                      style={{ color: C.muted, borderColor: C.border }}
                      data-testid="button-network-calendar"
                    >
                      Prefer a call first? Book 30 minutes →
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}

// ─── About Dan ────────────────────────────────────────────────────────────────
function AboutDan() {
  const rm = useReducedMotion();
  const credentials = ["SB 1288 AI Workgroup", "Education Week", "ASU+GSV Speaker", "Navigator Schools"];

  return (
    <section style={{ paddingTop: "96px", paddingBottom: "96px", borderBottom: `1px solid ${C.border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={rm ? {} : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={rm ? { duration: 0 } : { duration: 0.6 }}
          >
            <img
              src={danPresenting}
              alt="Dan Whitlock presenting"
              className="w-full"
              style={{ maxWidth: "440px", border: `1px solid ${C.border}` }}
              loading="lazy"
              data-testid="img-dan-bio"
            />
          </motion.div>

          <motion.div
            initial={rm ? {} : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={rm ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: C.amber, letterSpacing: "0.14em" }}>About</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-1" style={{ color: C.white, letterSpacing: "-0.02em" }} data-testid="text-dan-name">
              Dan Whitlock
            </h2>
            <p className="text-sm mb-8" style={{ color: C.faint }}>
              Founder, NovaPath · Technology Innovation Lead, Navigator Schools
            </p>

            <div className="space-y-5 mb-10" style={{ color: C.muted, fontSize: "15px", lineHeight: "1.75" }}>
              <p>
                Dan doesn't advise from the outside. He's the Technology Innovation Lead at Navigator Schools, a 4-campus charter network serving 1,900+ students, with an approved expansion to Orange County. He's in classrooms every week building AI tools alongside the teachers who use them.
              </p>
              <p>
                He's built and deployed 8+ AI-powered tools in real K-12 settings. He was selected for California's SB 1288 AI in Education Workgroup and was featured in Education Week. He speaks at major conferences including ASU+GSV Summit, FETC, and CSDC.
              </p>
              <p>
                When districts work with NovaPath, they're not getting a slide deck. They're getting someone who builds the tools, tests them with students, and iterates based on what actually happens in the classroom.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {credentials.map((c, i) => (
                <span key={i} className="text-xs px-3 py-1.5" style={{ border: `1px solid ${C.border}`, color: C.muted }}>
                  {c}
                </span>
              ))}
            </div>

            <a
              href="https://smarterbydesign.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ color: C.amber }}
              data-testid="link-newsletter-bio"
            >
              Read the newsletter →
            </a>

            <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${C.border}` }}>
              <div className="text-4xl leading-none mb-4" style={{ color: C.amber, opacity: 0.35, fontFamily: "Georgia, serif" }}>"</div>
              <blockquote
                className="text-lg font-medium leading-relaxed mb-3"
                style={{ color: C.white, letterSpacing: "-0.01em" }}
                data-testid="text-edweek-quote"
              >
                The best professional development I've had in 20 years of education.
              </blockquote>
              <p className="text-xs" style={{ color: C.faint }}>Educator quoted in Education Week</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "", role: "", district: "", email: "", challenge: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => apiRequest("POST", "/api/consulting-inquiries", data),
    onSuccess: () => {
      toast({ title: "Thank you!", description: "We'll be in touch within 24 hours." });
      setFormData({ name: "", role: "", district: "", email: "", challenge: "" });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again or email Dan@explorenovapath.com directly.",
      });
    },
  });

  const roleOptions = ["Superintendent", "Asst. Superintendent", "Technology Director", "Curriculum Director", "Principal", "Instructional Coach", "EdTech Company", "Other"];

  const inputStyle = {
    backgroundColor: C.bgCard,
    border: `1px solid ${C.border}`,
    color: C.white,
    borderRadius: "2px",
    outline: "none",
    width: "100%",
    padding: "12px 16px",
    fontSize: "14px",
  };

  return (
    <section style={{ paddingTop: "96px", paddingBottom: "120px" }}>
      <div className="max-w-2xl mx-auto px-6">
        <motion.div {...fade()} className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: C.amber, letterSpacing: "0.14em" }}>Contact</p>
          <h2 className="text-4xl font-bold mb-3" style={{ color: C.white, letterSpacing: "-0.025em" }}>Send us a note</h2>
          <p style={{ color: C.muted, fontSize: "15px" }}>Tell us about your district and we'll be in touch within 24 hours.</p>
        </motion.div>

        <motion.form
          {...fade(0.1)}
          onSubmit={(e) => { e.preventDefault(); mutation.mutate(formData); }}
          className="space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: C.faint }}>Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={inputStyle} data-testid="input-name" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: C.faint }}>Role</label>
              <select required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} style={{ ...inputStyle, color: formData.role ? C.white : C.faint }} data-testid="select-role">
                <option value="" disabled>Select your role</option>
                {roleOptions.map((o) => <option key={o} value={o} style={{ backgroundColor: C.bgCard, color: C.white }}>{o}</option>)}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: C.faint }}>District / Organization</label>
              <input type="text" required value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })} style={inputStyle} data-testid="input-district" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: C.faint }}>Email</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle} data-testid="input-email" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: C.faint }}>What's your biggest challenge with AI right now?</label>
            <textarea rows={4} value={formData.challenge} onChange={(e) => setFormData({ ...formData, challenge: e.target.value })} style={{ ...inputStyle, resize: "none" }} data-testid="input-challenge" />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-4 text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: C.amber, color: "#0F0F0F" }}
            data-testid="button-submit-consultation"
          >
            {mutation.isPending ? "Submitting..." : "Send inquiry"}
          </button>

          <p className="text-center text-xs" style={{ color: C.faint }}>
            No pitch. No pressure. Just a conversation about what's possible.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function SiteFooter() {
  const [email, setEmail] = useState("");

  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, backgroundColor: C.bgAlt }}>
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-12">
        <div>
          <p className="text-sm font-semibold mb-3" style={{ color: C.white }}>NovaPath Systems</p>
          <a href="mailto:Dan@explorenovapath.com" className="text-sm hover:opacity-70 transition-opacity block mb-1" style={{ color: C.faint }} data-testid="link-footer-email">
            Dan@explorenovapath.com
          </a>
          <p className="text-xs mt-5" style={{ color: C.faint }}>© 2026 NovaPath Systems</p>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { label: "Newsletter", href: "https://smarterbydesign.app" },
            { label: "AI Readiness Checklist", href: "https://checklist.smarterbydesign.app" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/danwhitlock/" },
            { label: "Book a Call", href: CALENDLY_URL },
          ].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm hover:opacity-70 transition-opacity" style={{ color: C.faint }} data-testid={`link-footer-${l.label.toLowerCase().replace(/\s+/g, '-')}`}>
              {l.label}
            </a>
          ))}
        </div>

        <div>
          <p className="text-sm font-medium mb-4" style={{ color: C.muted }}>Get the Smarter by Design newsletter</p>
          <form onSubmit={(e) => { e.preventDefault(); window.open("https://smarterbydesign.app", "_blank", "noopener,noreferrer"); setEmail(""); }} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 text-sm outline-none"
              style={{ backgroundColor: C.bgCard, border: `1px solid ${C.border}`, color: C.white, borderRadius: "2px" }}
              data-testid="input-footer-email"
            />
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold flex-shrink-0 transition-opacity hover:opacity-80"
              style={{ backgroundColor: C.amber, color: "#0F0F0F" }}
              data-testid="button-footer-subscribe"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
