import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Wrench, Server, ShieldCheck, Sparkles, Rocket, Compass } from "lucide-react";
import danPresenting from "@assets/copyofdan_1770090391461.png";
import { PUBLIC_INQUIRY_EMAIL } from "@shared/contact";

const CALENDLY_URL = "https://calendly.com/novapath711/30min";

const CARD_STYLE = {
  backgroundColor: "#1A1425",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "12px",
} as const;

const CARD_HOVER_SHADOW = "0 0 24px rgba(124,92,255,0.1)";

export default function CobuilderPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const howRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToHow = () => {
    howRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen font-['Inter',sans-serif]" style={{ backgroundColor: "#0F0A1A" }}>
      <CobuilderNav />
      <CobuilderHero onPrimaryClick={scrollToForm} onSecondaryClick={scrollToHow} />
      <ProblemSection />
      <div ref={howRef}>
        <HowItWorksSection />
      </div>
      <WhatWeHelpWith />
      <AboutDanShort onCtaClick={scrollToForm} />
      <PricingSection onCtaClick={scrollToForm} />
      <div ref={formRef}>
        <CobuilderForm />
      </div>
      <CobuilderFooter />
    </div>
  );
}

function CobuilderNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md"
      style={{ backgroundColor: "rgba(15, 10, 26, 0.92)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <a
          href="/"
          className="text-xl font-bold flex-shrink-0"
          style={{ color: "#FFFFFF" }}
          data-testid="link-cobuilder-logo"
        >
          NovaPath
        </a>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="text-white font-medium hidden md:inline-flex"
            style={{ backgroundColor: "#7C5CFF" }}
            data-testid="button-cobuilder-nav-cta"
          >
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Book a Call
            </a>
          </Button>

          <button
            className="md:hidden p-2 rounded-md"
            style={{ color: "#B4B0C4" }}
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="button-cobuilder-mobile-menu"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="md:hidden mt-3 pb-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.75rem" }}
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm font-semibold px-2 py-1"
            style={{ color: "#7C5CFF" }}
            onClick={() => setMenuOpen(false)}
          >
            Book a Call
          </a>
        </div>
      )}
    </nav>
  );
}

function CobuilderHero({
  onPrimaryClick,
  onSecondaryClick,
}: {
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden text-center"
      style={{ paddingTop: "128px", paddingBottom: "96px" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_1200px_800px_at_50%_-10%,rgba(124,92,255,0.18),transparent_65%)]" />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,92,255,0.3), transparent)" }}
      />

      <div className="max-w-4xl mx-auto px-6 relative">
        <motion.div
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.5 }}
        >
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{
              backgroundColor: "rgba(124,92,255,0.12)",
              color: "#A78BFA",
              border: "1px solid rgba(124,92,255,0.25)",
            }}
          >
            App Cobuilding
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
          data-testid="text-cobuilder-headline"
        >
          You have an app that's 60% done.
          <br />
          <span style={{ color: "#A78BFA" }}>Let's finish it.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-10 mx-auto leading-relaxed"
          style={{ color: "#B4B0C4", maxWidth: "600px" }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
        >
          Stuck mid-build, burned out, or handed a half-finished codebase you can't ship? We sit down with you, assess what you have, fill the gaps with AI-assisted cobuilding, and get your app across the finish line.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.3 }}
        >
          <Button
            asChild
            size="lg"
            className="text-white font-semibold rounded-full px-8"
            style={{ backgroundColor: "#7C5CFF" }}
            data-testid="button-cobuilder-hero-primary"
          >
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Book a Free Assessment Call
            </a>
          </Button>
          <button
            onClick={onSecondaryClick}
            className="text-sm font-medium hover:opacity-80 transition-opacity border rounded-full px-6 py-2.5"
            style={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,0.3)" }}
            data-testid="button-cobuilder-hero-secondary"
          >
            See How It Works
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const reducedMotion = useReducedMotion();

  const problems = [
    {
      title: "Your contractor disappeared",
      body: "You paid someone to build it, got half an app and a bunch of promises, and now they're unreachable. The code exists — you just can't finish it alone.",
    },
    {
      title: "You're stuck on something technical",
      body: "You've been building it yourself and hit a wall. The backend isn't working, the deployment keeps failing, or there's one feature you can't figure out that's blocking everything else.",
    },
    {
      title: "You built it — but it won't ship",
      body: "The app works locally. Getting it deployed, secured, and reliably running for real users is a different problem, and you haven't been able to get over that last hill.",
    },
  ];

  return (
    <section
      className="px-6"
      style={{
        paddingTop: "96px",
        paddingBottom: "96px",
        background: "linear-gradient(180deg, #0F0A1A 0%, #130E1F 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#7C5CFF", letterSpacing: "0.12em" }}
          >
            Sound Familiar?
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "#FFFFFF", letterSpacing: "-0.01em" }}
          >
            Every stuck app has a story
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              className="p-7 rounded-xl"
              style={CARD_STYLE}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
              whileHover={{ boxShadow: CARD_HOVER_SHADOW }}
              data-testid={`card-cobuilder-problem-${index}`}
            >
              <div
                className="w-8 h-8 rounded-lg mb-5 flex items-center justify-center"
                style={{ backgroundColor: "rgba(124,92,255,0.15)" }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#7C5CFF" }} />
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "#FFFFFF" }}>{problem.title}</h3>
              <p className="leading-relaxed" style={{ color: "#B4B0C4", fontSize: "15px", lineHeight: "1.65" }}>{problem.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const reducedMotion = useReducedMotion();

  const steps = [
    {
      num: 1,
      title: "Assess What You Have",
      body: "We start with a free 30-minute call to understand your app, your stack, and where it's stuck. You share what you've built. We tell you exactly what it will take to finish.",
    },
    {
      num: 2,
      title: "Cobuild the Gaps",
      body: "We work alongside you using AI-assisted cobuilding to fill in what's missing. Backend logic, auth, deployment pipelines, AI features — we move fast and we show you how.",
    },
    {
      num: 3,
      title: "Ship It Together",
      body: "You don't just get a working app. You understand how it works and how to keep it running. When we're done, you're not dependent on us — you own it.",
    },
  ];

  return (
    <section className="px-6" style={{ paddingTop: "96px", paddingBottom: "96px", backgroundColor: "#0F0A1A" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "#FFFFFF", letterSpacing: "-0.01em" }}
          >
            How It Works
          </h2>
          <p className="mx-auto" style={{ color: "#B4B0C4", maxWidth: "500px", fontSize: "16px" }}>
            Three phases. Usually 1–6 weeks depending on how far along you are.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
              data-testid={`step-cobuilder-${index}`}
            >
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-6 left-[calc(50%+28px)] right-[-50%] h-px"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                />
              )}
              <div className="p-6 rounded-xl" style={CARD_STYLE}>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-5"
                  style={{ backgroundColor: "#7C5CFF", color: "#FFFFFF" }}
                >
                  {step.num}
                </div>
                <h3 className="font-semibold mb-3" style={{ color: "#FFFFFF", fontSize: "17px" }}>{step.title}</h3>
                <p style={{ color: "#B4B0C4", fontSize: "14px", lineHeight: "1.65" }}>{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const HELP_ICONS = [Wrench, Server, ShieldCheck, Sparkles, Rocket, Compass];

function WhatWeHelpWith() {
  const reducedMotion = useReducedMotion();

  const items = [
    {
      title: "Broken or incomplete backend",
      body: "APIs that don't work, database schema that was never finished, business logic missing in action.",
    },
    {
      title: "Half-built frontend",
      body: "UI that exists but doesn't connect properly to the backend, forms that don't submit, states that don't update.",
    },
    {
      title: "Auth and security",
      body: "No login system, broken authentication, exposed endpoints — the stuff that has to work before you can go live.",
    },
    {
      title: "AI feature integration",
      body: "You want AI in your app — summaries, chatbots, generation, analysis — but you're not sure how to wire it in cleanly.",
    },
    {
      title: "Deployment and infrastructure",
      body: "Works locally, fails in production. Needs proper hosting, environment variables, CI/CD, or a database that won't fall over.",
    },
    {
      title: "Product direction",
      body: "You have something but aren't sure what it should actually be. We can help you sharpen scope and build the right thing.",
    },
  ];

  return (
    <section className="px-6" style={{ paddingTop: "96px", paddingBottom: "96px", backgroundColor: "#130E1F" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#7C5CFF", letterSpacing: "0.12em" }}
          >
            What We Fix
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "#FFFFFF", letterSpacing: "-0.01em" }}
          >
            Common stuck points we know well
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item, index) => {
            const Icon = HELP_ICONS[index];
            return (
              <motion.div
                key={index}
                className="p-6 rounded-xl flex flex-col gap-3"
                style={CARD_STYLE}
                initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: (index % 3) * 0.08 }}
                whileHover={{ boxShadow: CARD_HOVER_SHADOW }}
                data-testid={`card-help-${index}`}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(124,92,255,0.12)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#7C5CFF" }} />
                </div>
                <h3 className="font-semibold" style={{ color: "#FFFFFF", fontSize: "16px" }}>{item.title}</h3>
                <p style={{ color: "#B4B0C4", fontSize: "14px", lineHeight: "1.65" }}>{item.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutDanShort({ onCtaClick }: { onCtaClick: () => void }) {
  const reducedMotion = useReducedMotion();

  const credentials = [
    "SB 1288 AI Workgroup",
    "Education Week",
    "ASU+GSV Speaker",
    "Navigator Schools",
  ];

  return (
    <section className="px-6" style={{ paddingTop: "96px", paddingBottom: "96px", backgroundColor: "#0F0A1A" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            className="relative"
            initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <div
              className="absolute -inset-4 rounded-2xl blur-2xl"
              style={{ background: "radial-gradient(circle, rgba(124,92,255,0.15), transparent 70%)" }}
            />
            <img
              src={danPresenting}
              alt="Dan Whitlock"
              className="relative w-full rounded-xl"
              style={{
                maxWidth: "380px",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              }}
              loading="lazy"
              data-testid="img-cobuilder-dan"
            />
          </motion.div>

          <motion.div
            initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#7C5CFF", letterSpacing: "0.12em" }}
            >
              Who You're Working With
            </p>
            <h2
              className="text-3xl font-bold mb-1"
              style={{ color: "#FFFFFF", letterSpacing: "-0.01em" }}
            >
              Dan Whitlock
            </h2>
            <p className="text-sm mb-6" style={{ color: "#6B6580" }}>
              Founder, NovaPath · Former Technology Innovation Lead, Navigator Schools
            </p>

            <div
              className="space-y-4 mb-7"
              style={{ color: "#B4B0C4", fontSize: "15px", lineHeight: "1.7" }}
            >
              <p>
                Dan has built and shipped 8+ AI-powered apps in real-world K-12 settings — not demos, but tools used by teachers and school leaders. He uses the same AI-assisted cobuilding approach for every project, which means he moves fast and he teaches as he goes.
              </p>
              <p>
                If your app is stuck, he's probably seen that problem before. He can assess your codebase, identify what's blocking you, and help you ship it — faster than starting over and without the usual consultant runaround.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-7">
              {credentials.map((cred, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: "rgba(124,92,255,0.1)",
                    color: "#A78BFA",
                    border: "1px solid rgba(124,92,255,0.2)",
                  }}
                >
                  {cred}
                </span>
              ))}
            </div>

            <Button
              size="lg"
              className="text-white font-semibold rounded-full px-8"
              style={{ backgroundColor: "#7C5CFF" }}
              onClick={onCtaClick}
              data-testid="button-cobuilder-dan-cta"
            >
              Tell Us About Your App
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PricingSection({ onCtaClick }: { onCtaClick: () => void }) {
  const reducedMotion = useReducedMotion();

  const tiers = [
    {
      name: "Advisory + Assessment",
      tagline: "Figure out what you actually need.",
      price: "$250",
      priceSuffix: "/hour",
      featured: false,
      bullets: [
        "Codebase review and gap analysis",
        "Clear list of what's blocking you",
        "Prioritized action plan to ship",
        "Recorded session you can reference",
        "No long-term commitment required",
      ],
      ctaLabel: "Book an Advisory Session",
    },
    {
      name: "Cobuilding Sprint",
      tagline: "Let's just finish it together.",
      price: "From $2,500",
      featured: true,
      badge: "Most Popular",
      bullets: [
        "Fixed-scope engagement (1–4 weeks)",
        "Hands-on cobuilding with Dan",
        "Backend, frontend, auth, AI features",
        "Deployment and production setup",
        "You own all the code, no lock-in",
      ],
      ctaLabel: "Discuss Your Project",
    },
  ];

  return (
    <section className="px-6" style={{ paddingTop: "96px", paddingBottom: "96px", backgroundColor: "#130E1F" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#7C5CFF", letterSpacing: "0.12em" }}
          >
            Pricing
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "#FFFFFF", letterSpacing: "-0.01em" }}
          >
            Simple, transparent options
          </h2>
          <p style={{ color: "#B4B0C4", fontSize: "16px" }}>Start with an advisory session if you're not sure. Upgrade to a sprint when you're ready to move.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-2xl flex flex-col gap-6 relative"
              style={{
                backgroundColor: tier.featured ? "#1D1530" : "#1A1425",
                border: tier.featured ? "1px solid #7C5CFF" : "1px solid rgba(255,255,255,0.06)",
                boxShadow: tier.featured ? "0 0 40px rgba(124,92,255,0.15)" : "none",
              }}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
              data-testid={`card-cobuilder-pricing-${index}`}
            >
              {tier.badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{ backgroundColor: "#7C5CFF", color: "#FFFFFF" }}
                  data-testid="badge-cobuilder-popular"
                >
                  {tier.badge}
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold mb-1" style={{ color: "#FFFFFF" }}>{tier.name}</h3>
                <p className="text-sm mb-5" style={{ color: "#B4B0C4" }}>{tier.tagline}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold" style={{ color: tier.featured ? "#7C5CFF" : "#FFFFFF" }}>
                    {tier.price}
                  </span>
                  {tier.priceSuffix && (
                    <span className="text-sm" style={{ color: "#6B6580" }}>{tier.priceSuffix}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 flex-1">
                {tier.bullets.map((bullet, bIndex) => (
                  <li key={bIndex} className="flex items-start gap-3" style={{ fontSize: "14px", color: "#B4B0C4" }}>
                    <span className="mt-0.5 flex-shrink-0 font-bold" style={{ color: "#7C5CFF" }}>✓</span>
                    {bullet}
                  </li>
                ))}
              </ul>

              {tier.featured ? (
                <Button
                  asChild
                  className="w-full text-white font-semibold"
                  style={{ backgroundColor: "#7C5CFF" }}
                  data-testid={`button-cobuilder-pricing-${index}`}
                >
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    {tier.ctaLabel}
                  </a>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  className="w-full font-semibold"
                  style={{ borderColor: "rgba(124,92,255,0.4)", color: "#A78BFA" }}
                  data-testid={`button-cobuilder-pricing-${index}`}
                >
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    {tier.ctaLabel}
                  </a>
                </Button>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-sm mt-8"
          style={{ color: "#6B6580" }}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Not sure which fits? Start with the form below and we'll figure it out together.
        </motion.p>
      </div>
    </section>
  );
}

function CobuilderForm() {
  const reducedMotion = useReducedMotion();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    appDescription: "",
    stuckPoint: "",
    budget: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/cobuilder-inquiries", data);
    },
    onSuccess: () => {
      (window as Window & { NovaPathAnalytics?: { track: (event: string) => void } }).NovaPathAnalytics?.track("generate_lead");
      toast({
        title: "Got it!",
        description: "We'll review your project and be in touch within 24 hours.",
      });
      setFormData({ name: "", email: "", appDescription: "", stuckPoint: "", budget: "" });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: `Please try again or email ${PUBLIC_INQUIRY_EMAIL} directly.`,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const inputStyle = {
    backgroundColor: "#1A1425",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#F5F3FF",
    borderRadius: "8px",
  };

  const budgetOptions = [
    "Under $1,000",
    "$1,000 – $3,000",
    "$3,000 – $7,500",
    "$7,500 – $15,000",
    "$15,000+",
    "Not sure yet",
  ];

  return (
    <section
      className="px-6"
      style={{ paddingTop: "80px", paddingBottom: "96px", backgroundColor: "#0F0A1A" }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <h2
            className="text-3xl font-bold mb-3"
            style={{ color: "#FFFFFF", letterSpacing: "-0.01em" }}
          >
            Tell Us About Your App
          </h2>
          <p style={{ color: "#B4B0C4", fontSize: "16px" }}>
            Share what you've built and where you're stuck. We'll take a look and follow up within 24 hours.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="p-8 rounded-2xl space-y-6"
          style={{ backgroundColor: "#1A1425", border: "1px solid rgba(255,255,255,0.06)" }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#B4B0C4" }}>Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                style={inputStyle}
                data-testid="input-cobuilder-name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#B4B0C4" }}>Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                style={inputStyle}
                data-testid="input-cobuilder-email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#B4B0C4" }}>
              Describe your app
            </label>
            <p className="text-xs mb-2" style={{ color: "#6B6580" }}>
              What does it do? What's the tech stack? How far along is it?
            </p>
            <textarea
              rows={4}
              required
              value={formData.appDescription}
              onChange={(e) => setFormData({ ...formData, appDescription: e.target.value })}
              className="w-full px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-shadow"
              style={inputStyle}
              data-testid="input-cobuilder-app-description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#B4B0C4" }}>
              Where are you stuck?
            </label>
            <p className="text-xs mb-2" style={{ color: "#6B6580" }}>
              What's the specific thing blocking you from shipping?
            </p>
            <textarea
              rows={3}
              required
              value={formData.stuckPoint}
              onChange={(e) => setFormData({ ...formData, stuckPoint: e.target.value })}
              className="w-full px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-shadow"
              style={inputStyle}
              data-testid="input-cobuilder-stuck-point"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#B4B0C4" }}>
              Budget range (optional)
            </label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
              style={{ ...inputStyle, color: formData.budget ? "#F5F3FF" : "#6B6580" }}
              data-testid="select-cobuilder-budget"
            >
              <option value="">Prefer not to say</option>
              {budgetOptions.map((option) => (
                <option key={option} value={option} style={{ backgroundColor: "#1A1425", color: "#F5F3FF" }}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            size="lg"
            className="w-full font-semibold text-white"
            style={{ backgroundColor: "#7C5CFF" }}
            data-testid="button-cobuilder-submit"
          >
            {mutation.isPending ? "Submitting..." : "Send My Project Details"}
          </Button>

          <p className="text-center text-xs" style={{ color: "#6B6580" }}>
            No commitment. We'll review your project and tell you honestly if and how we can help.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

function CobuilderFooter() {
  return (
    <footer
      className="px-6 py-10"
      style={{ backgroundColor: "#080512", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-start gap-8">
        <div>
          <p className="text-base font-semibold mb-2" style={{ color: "#FFFFFF" }}>NovaPath</p>
          <a
            href={`mailto:${PUBLIC_INQUIRY_EMAIL}`}
            className="text-sm hover:opacity-80 block mb-1"
            style={{ color: "#6B6580" }}
            data-testid="link-cobuilder-footer-email"
          >
            {PUBLIC_INQUIRY_EMAIL}
          </a>
          <p className="text-sm mt-3" style={{ color: "#6B6580" }}>© 2026 NovaPath</p>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="/"
            className="text-sm hover:opacity-80"
            style={{ color: "#6B6580" }}
            data-testid="link-cobuilder-footer-home"
          >
            K-12 Consulting
          </a>
          <a
            href="https://www.linkedin.com/in/danwhitlock/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:opacity-80"
            style={{ color: "#6B6580" }}
            data-testid="link-cobuilder-footer-linkedin"
          >
            LinkedIn
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:opacity-80"
            style={{ color: "#7C5CFF" }}
            data-testid="link-cobuilder-footer-calendly"
          >
            Book a Call
          </a>
        </div>
      </div>
    </footer>
  );
}
