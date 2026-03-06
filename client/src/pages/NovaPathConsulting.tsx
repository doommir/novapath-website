import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import danHeadshot from "@assets/dan-headshot-about_1770050115907.jpeg";
import danPresenting from "@assets/copyofdan_1770090391461.png";

export default function NovaPathConsulting() {
  const reducedMotion = useReducedMotion();
  const formRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen font-['Inter',sans-serif]" style={{ backgroundColor: "#0F0A1A" }}>
      <StickyNav />
      <Hero onSecondaryClick={scrollToServices} />
      <CredibilityBar />
      <div id="problem">
        <ProblemSection />
      </div>
      <div id="methodology" ref={processRef}>
        <MethodologySection />
      </div>
      <div id="services" ref={servicesRef}>
        <ServicesSection onCtaClick={scrollToForm} />
      </div>
      <div id="results">
        <ResultsSection />
      </div>
      <div id="about">
        <AboutDan />
      </div>
      <Testimonials />
      <div id="contact" ref={formRef}>
        <BridgeOffer />
      </div>
      <ConsultingFooter />
    </div>
  );
}

function StickyNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const anchorLinks = [
    { label: "Services", href: "#services" },
    { label: "Results", href: "#results" },
    { label: "About", href: "#about" },
  ];

  const externalLinks = [
    { label: "Newsletter", href: "https://smarterbydesign.app" },
    { label: "AI Readiness", href: "https://checklist.smarterbydesign.app" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 backdrop-blur-md"
      style={{ backgroundColor: "rgba(15, 10, 26, 0.9)", borderBottom: "1px solid #2A2435" }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <a href="#" className="text-xl font-bold flex-shrink-0" style={{ color: "#F5F3FF" }} data-testid="link-logo">
          NovaPath
        </a>

        <div className="hidden md:flex items-center gap-6">
          {anchorLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "#B4B0C4" }}
              data-testid={`link-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
          {externalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "#B4B0C4" }}
              data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="text-white font-medium"
            style={{ backgroundColor: "#7C5CFF" }}
            data-testid="button-nav-cta"
          >
            <a href="https://calendly.com/daniel-whitlock/30min" target="_blank" rel="noopener noreferrer">
              Book a Call
            </a>
          </Button>

          <button
            className="md:hidden p-2 rounded-md"
            style={{ color: "#B4B0C4" }}
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="button-mobile-menu"
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
          className="md:hidden mt-4 pb-4 flex flex-col gap-3"
          style={{ borderTop: "1px solid #2A2435", paddingTop: "1rem" }}
        >
          {[...anchorLinks, ...externalLinks.map(l => ({ ...l, external: true }))].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={"external" in link ? "_blank" : undefined}
              rel={"external" in link ? "noopener noreferrer" : undefined}
              className="text-sm font-medium px-2 py-1"
              style={{ color: "#B4B0C4" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero({ onSecondaryClick }: { onSecondaryClick: () => void }) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_1200px_800px_at_30%_20%,rgba(124,92,255,0.15),transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
              style={{ backgroundColor: "rgba(124, 92, 255, 0.15)", color: "#A78BFA", border: "1px solid rgba(124,92,255,0.3)" }}
            >
              K-12 AI Consulting
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              style={{ color: "#FFFFFF" }}
              data-testid="text-hero-headline"
            >
              Your district's AI strategy shouldn't come from a vendor pitch deck.
            </h1>

            <p className="text-lg mb-8 max-w-xl leading-relaxed" style={{ color: "#B4B0C4" }}>
              NovaPath helps K-12 leaders build AI systems that actually work — designed with educators, not for them. From readiness audits to custom tool builds, we're in classrooms every week doing the work.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="text-white font-semibold"
                style={{ backgroundColor: "#7C5CFF" }}
                data-testid="button-hero-cta"
              >
                <a href="https://calendly.com/daniel-whitlock/30min" target="_blank" rel="noopener noreferrer">
                  Book a Free AI Readiness Review
                </a>
              </Button>
              <button
                onClick={onSecondaryClick}
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: "#A78BFA" }}
                data-testid="button-hero-secondary"
              >
                Or explore our services
              </button>
            </div>
          </motion.div>

          <motion.div
            className="relative hidden md:block"
            initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
          >
            <div
              className="absolute inset-0 rounded-2xl blur-3xl"
              style={{ background: "radial-gradient(circle at center, rgba(124, 92, 255, 0.3), transparent 70%)" }}
            />
            <img
              src={danHeadshot}
              alt="Dan Whitlock, Founder of NovaPath"
              className="relative rounded-2xl w-full max-w-md mx-auto"
              style={{ boxShadow: "0 0 60px rgba(124, 92, 255, 0.2)" }}
              loading="lazy"
              data-testid="img-hero-dan"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CredibilityBar() {
  const reducedMotion = useReducedMotion();

  const items = [
    "California SB 1288 AI Workgroup Member",
    "Featured in Education Week",
    "8+ AI Tools Deployed in K-12 Classrooms",
    "Speaker: ASU+GSV, FETC, CSDC",
  ];

  return (
    <section className="py-6 px-6" style={{ backgroundColor: "#1A1425", borderTop: "1px solid #2A2435", borderBottom: "1px solid #2A2435" }}>
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
      >
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2" data-testid={`cred-item-${index}`}>
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#7C5CFF" }} />
            <span className="text-xs font-medium" style={{ color: "#6B6580" }}>{item}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function ProblemSection() {
  const reducedMotion = useReducedMotion();

  const painPoints = [
    {
      body: "Vendors are circling. Teachers are using ChatGPT without guardrails. Your board is asking questions you can't answer yet."
    },
    {
      body: "Most AI PD is a one-hour webinar and a prayer. Teachers sit through it, forget it, and go back to whatever they were already doing."
    },
    {
      body: "You need an AI strategy. But you also need someone who's actually built AI tools in schools — not someone selling you one."
    }
  ];

  return (
    <section
      className="py-20 px-6"
      style={{ background: "linear-gradient(180deg, #0F0A1A 0%, #1A1425 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#FFFFFF" }}>
            The Problem Every District Leader Knows
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl"
              style={{ backgroundColor: "#1A1425", border: "1px solid #2A2435", borderTop: "3px solid #7C5CFF" }}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
              data-testid={`card-problem-${index}`}
            >
              <p className="leading-relaxed" style={{ color: "#B4B0C4" }}>{point.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodologySection() {
  const reducedMotion = useReducedMotion();

  const steps = [
    {
      num: 1,
      title: "Identify the Real Pain Point",
      body: "We start with the workflows costing your team the most time. Not a generic audit. A conversation."
    },
    {
      num: 2,
      title: "Design the Solution Together",
      body: "Your educators define what \"good\" looks like. We facilitate the design, ensuring the solution fits your actual workflow."
    },
    {
      num: 3,
      title: "Cobuild with AI",
      body: "Using AI coding agents, we build the tool together. Your team sees how prompts become code, how to debug, how to iterate."
    },
    {
      num: 4,
      title: "Deploy and Keep Building",
      body: "By the end, your app is live and your team has the AI literacy to tackle the next challenge independently."
    }
  ];

  return (
    <section className="py-20 px-6" style={{ backgroundColor: "#0F0A1A" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
            How We Work
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "#B4B0C4" }}>
            We don't advise from the outside. We build alongside your team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
              data-testid={`step-${index}`}
            >
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-8 left-1/2 w-full h-px"
                  style={{ backgroundColor: "#2A2435" }}
                />
              )}
              <div className="relative p-6 rounded-xl" style={{ backgroundColor: "#1A1425", border: "1px solid #2A2435" }}>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-4"
                  style={{ backgroundColor: "#7C5CFF", color: "#FFFFFF" }}
                >
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "#FFFFFF" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#B4B0C4" }}>{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ onCtaClick }: { onCtaClick: () => void }) {
  const reducedMotion = useReducedMotion();

  const services = [
    {
      title: "AI Readiness Audit",
      price: "$5K–$15K",
      timeline: "2–4 weeks",
      body: "Assessment of your district's AI landscape, policy gaps, teacher readiness, and tool governance. You get a report and a roadmap."
    },
    {
      title: "Cobuilding Engagement",
      price: "$15K–$50K+",
      timeline: "8–16 weeks",
      body: "Dan's signature offering. We embed with your teachers, identify painful workflows, and prototype custom AI tools. 10-week sprints."
    },
    {
      title: "AI Policy Development",
      price: "$8K–$20K",
      timeline: "4–8 weeks",
      body: "Create AI use policies teachers will actually follow. Built on Dan's experience with California's SB 1288 workgroup."
    },
    {
      title: "Implementation Support",
      price: "$10K–$30K",
      timeline: "Semester or year",
      body: "You have tools but low adoption. We fix that with coaching, training, and systems."
    }
  ];

  return (
    <section className="py-20 px-6" style={{ backgroundColor: "#1A1425" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
            How We Work With Districts
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "#B4B0C4" }}>
            Every engagement starts with understanding where you are.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl flex flex-col gap-4"
              style={{ backgroundColor: "#0F0A1A", border: "1px solid #2A2435" }}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
              data-testid={`card-service-${index}`}
            >
              <div>
                <h3 className="text-xl font-semibold mb-1" style={{ color: "#FFFFFF" }}>{service.title}</h3>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-semibold" style={{ color: "#7C5CFF" }}>{service.price}</span>
                  <span className="text-xs" style={{ color: "#6B6580" }}>·</span>
                  <span className="text-sm" style={{ color: "#6B6580" }}>{service.timeline}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#B4B0C4" }}>{service.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="p-8 rounded-xl"
          style={{ backgroundColor: "#0F0A1A", border: "1px solid #2A2435" }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#A78BFA" }}
              >
                For EdTech Companies
              </p>
              <p className="max-w-2xl" style={{ color: "#B4B0C4" }}>
                We also work with product teams. Educator-informed product strategy, AI workflow design, prototype-to-production cobuilding, and classroom fit diagnostics. $250/hr or project-based.
              </p>
            </div>
            <button
              onClick={onCtaClick}
              className="flex-shrink-0 text-sm font-medium hover:underline"
              style={{ color: "#7C5CFF" }}
              data-testid="link-edtech-cta"
            >
              Get in touch
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ResultsSection() {
  const reducedMotion = useReducedMotion();

  const tools = [
    {
      name: "NaviGrade",
      description: "Paper to photo to AI-scored feedback to student revision via QR codes.",
      stat: "75% of students voluntarily revised their work",
      hook: "Feedback only works when it arrives while students still care."
    },
    {
      name: "Restorative Practice Generator",
      description: "Incident to SEL-aligned reflection and parent letter in minutes.",
      stat: "45-minute process reduced to 3 minutes",
      hook: "Featured in Education Week"
    },
    {
      name: "CoachingOS",
      description: "Observation to AI synthesis to action steps to fidelity tracking.",
      stat: null,
      hook: "Coaching system, not coaching vibes."
    },
    {
      name: "Mixteco Translator Plus",
      description: "Custom GPT for Mixtec, Spanish, and English with image recognition.",
      stat: null,
      hook: "Dignity isn't a feature request."
    },
    {
      name: "ELD R.I.S.E.",
      description: "15-minute ELD workflow aligned to CA ELD standards for K-2 teachers.",
      stat: null,
      hook: null
    },
    {
      name: "Voice SEL Check-ins",
      description: "Students speak. AI captures sentiment. Patterns get flagged.",
      stat: null,
      hook: "Asking kids 'how are you?' doesn't work. Listening does."
    }
  ];

  return (
    <section className="py-20 px-6" style={{ backgroundColor: "#0F0A1A" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
            Real Tools. Real Classrooms. Real Results.
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "#B4B0C4" }}>
            These aren't hypotheticals. These are tools built and deployed at Navigator Schools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl flex flex-col gap-3"
              style={{ backgroundColor: "#1A1425", border: "1px solid #2A2435" }}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.05 }}
              data-testid={`card-tool-${index}`}
            >
              <h3 className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>{tool.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#B4B0C4" }}>{tool.description}</p>
              {tool.stat && (
                <p className="text-sm font-semibold" style={{ color: "#7C5CFF" }}>{tool.stat}</p>
              )}
              {tool.hook && (
                <p className="text-xs italic" style={{ color: "#6B6580" }}>{tool.hook}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutDan() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="py-20 px-6" style={{ backgroundColor: "#1A1425" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            className="relative"
            initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <div
              className="absolute inset-0 rounded-2xl blur-3xl"
              style={{ background: "radial-gradient(circle at center, rgba(124, 92, 255, 0.2), transparent 70%)" }}
            />
            <img
              src={danPresenting}
              alt="Dan Whitlock presenting"
              className="relative rounded-2xl w-full max-w-sm mx-auto md:mx-0"
              style={{ border: "1px solid #2A2435" }}
              loading="lazy"
              data-testid="img-dan-bio"
            />
          </motion.div>

          <motion.div
            initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold mb-1" style={{ color: "#FFFFFF" }} data-testid="text-dan-name">
              Dan Whitlock
            </h2>
            <p className="text-sm font-medium mb-6" style={{ color: "#6B6580" }}>
              Founder, NovaPath · Technology Innovation Lead, Navigator Schools
            </p>

            <div className="space-y-4 mb-8" style={{ color: "#B4B0C4" }}>
              <p>
                Dan is the Technology Innovation Lead at Navigator Schools — 4 campuses, 1,900+ students, with an Orange County expansion underway. He's in classrooms every week building AI tools with teachers, not for them.
              </p>
              <p>
                He was selected for California's SB 1288 AI in Education Workgroup, featured in Education Week, and has spoken at the ASU+GSV Summit, FETC 2026, CSDC, and the AI Impact Conference. He's built and deployed 8+ AI tools in real K-12 settings.
              </p>
              <p>
                "I don't advise from the outside. I cobuild alongside educators. Every tool I've deployed was designed by and for the teachers who use it."
              </p>
            </div>

            <a
              href="https://smarterbydesign.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline"
              style={{ color: "#7C5CFF" }}
              data-testid="link-newsletter-bio"
            >
              Read the newsletter
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="py-20 px-6" style={{ backgroundColor: "#0F0A1A" }}>
      <div className="max-w-4xl mx-auto">
        <motion.p
          className="text-xs font-semibold uppercase tracking-widest text-center mb-12"
          style={{ color: "#6B6580" }}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          What Educators Are Saying
        </motion.p>

        <motion.div
          className="relative pl-8"
          style={{ borderLeft: "3px solid #7C5CFF" }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          data-testid="quote-edweek"
        >
          <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-6" style={{ color: "#FFFFFF" }}>
            "The AI tool that Whitlock developed turned a 45-minute documentation process into 3 minutes, freeing teachers to focus on actually supporting students."
          </p>
          <p className="text-sm" style={{ color: "#6B6580" }}>— Education Week, August 2025</p>
        </motion.div>

        <motion.div
          className="mt-12 grid md:grid-cols-2 gap-6"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
        >
          {[0, 1].map((index) => (
            <div
              key={index}
              className="p-6 rounded-xl text-center"
              style={{ backgroundColor: "#1A1425", border: "1px solid #2A2435" }}
              data-testid={`card-testimonial-${index}`}
            >
              <p className="text-sm" style={{ color: "#6B6580" }}>More testimonials coming soon</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BridgeOffer() {
  const reducedMotion = useReducedMotion();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    district: "",
    email: "",
    challenge: ""
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/consulting-inquiries", data);
    },
    onSuccess: () => {
      toast({
        title: "Thank you!",
        description: "We'll be in touch within 24 hours."
      });
      setFormData({ name: "", role: "", district: "", email: "", challenge: "" });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again or email dan.j.whitlock@gmail.com directly."
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const roleOptions = [
    "Superintendent",
    "Asst. Superintendent",
    "Tech Director",
    "Curriculum Lead",
    "Principal",
    "Other",
  ];

  return (
    <section
      className="py-20 px-6 relative"
      style={{ background: "linear-gradient(180deg, #1A1425 0%, #0F0A1A 100%)" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_600px_at_50%_30%,rgba(124,92,255,0.1),transparent_60%)]" />

      <div className="max-w-2xl mx-auto relative">
        <motion.div
          className="text-center mb-12"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
            Ready to Figure Out AI for Your District?
          </h2>
          <p style={{ color: "#B4B0C4" }}>
            Start with a free 30-minute AI Readiness Review. We'll assess where you are, identify your biggest gaps, and map a path forward. No pitch, no pressure.
          </p>
          <div className="mt-6">
            <Button
              asChild
              size="lg"
              className="text-white font-semibold"
              style={{ backgroundColor: "#7C5CFF" }}
              data-testid="button-bridge-cta"
            >
              <a href="https://calendly.com/daniel-whitlock/30min" target="_blank" rel="noopener noreferrer">
                Book Your Free Readiness Review
              </a>
            </Button>
          </div>
        </motion.div>

        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px" style={{ backgroundColor: "#2A2435" }} />
          <span className="text-sm" style={{ color: "#6B6580" }}>Or tell us about your challenge</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#2A2435" }} />
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="p-8 rounded-xl space-y-6"
          style={{ backgroundColor: "#1A1425", border: "1px solid #2A2435" }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#B4B0C4" }}>Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                style={{ backgroundColor: "#241E30", border: "1px solid #2A2435", color: "#F5F3FF" }}
                data-testid="input-name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#B4B0C4" }}>Your Role</label>
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                style={{ backgroundColor: "#241E30", border: "1px solid #2A2435", color: formData.role ? "#F5F3FF" : "#6B6580" }}
                data-testid="select-role"
              >
                <option value="" disabled>Select your role</option>
                {roleOptions.map((option) => (
                  <option key={option} value={option} style={{ backgroundColor: "#241E30", color: "#F5F3FF" }}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#B4B0C4" }}>School / District</label>
              <input
                type="text"
                required
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                style={{ backgroundColor: "#241E30", border: "1px solid #2A2435", color: "#F5F3FF" }}
                data-testid="input-district"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#B4B0C4" }}>Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                style={{ backgroundColor: "#241E30", border: "1px solid #2A2435", color: "#F5F3FF" }}
                data-testid="input-email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#B4B0C4" }}>
              What's your biggest AI challenge right now?
            </label>
            <textarea
              rows={4}
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              className="w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              style={{ backgroundColor: "#241E30", border: "1px solid #2A2435", color: "#F5F3FF" }}
              data-testid="input-challenge"
            />
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            size="lg"
            className="w-full font-semibold text-white"
            style={{ backgroundColor: "#7C5CFF" }}
            data-testid="button-submit-consultation"
          >
            {mutation.isPending ? "Submitting..." : "Let's Talk"}
          </Button>

          <p className="text-center text-xs" style={{ color: "#6B6580" }}>
            No pitch. No pressure. Just a conversation about what's possible for your district.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

function ConsultingFooter() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://smarterbydesign.app`, "_blank", "noopener,noreferrer");
    setEmail("");
  };

  return (
    <footer className="py-12 px-6" style={{ backgroundColor: "#0A0612", borderTop: "1px solid #2A2435" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <p className="text-base font-semibold mb-2" style={{ color: "#F5F3FF" }}>NovaPath Consulting</p>
          <a
            href="mailto:dan.j.whitlock@gmail.com"
            className="text-sm hover:opacity-80 block mb-1"
            style={{ color: "#6B6580" }}
            data-testid="link-footer-email"
          >
            dan.j.whitlock@gmail.com
          </a>
          <p className="text-sm mt-4" style={{ color: "#6B6580" }}>© 2026 NovaPath Consulting</p>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="https://smarterbydesign.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:opacity-80"
            style={{ color: "#6B6580" }}
            data-testid="link-footer-newsletter"
          >
            Newsletter
          </a>
          <a
            href="https://checklist.smarterbydesign.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:opacity-80"
            style={{ color: "#6B6580" }}
            data-testid="link-footer-checklist"
          >
            AI Readiness Checklist
          </a>
          <a
            href="https://www.linkedin.com/in/danwhitlock/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:opacity-80"
            style={{ color: "#6B6580" }}
            data-testid="link-footer-linkedin"
          >
            LinkedIn
          </a>
        </div>

        <div>
          <p className="text-sm font-medium mb-3" style={{ color: "#B4B0C4" }}>
            Get the Smarter by Design newsletter
          </p>
          <form onSubmit={handleNewsletter} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-600"
              style={{ backgroundColor: "#1A1425", border: "1px solid #2A2435", color: "#F5F3FF" }}
              data-testid="input-footer-email"
            />
            <Button
              type="submit"
              size="sm"
              className="text-white font-medium flex-shrink-0"
              style={{ backgroundColor: "#7C5CFF" }}
              data-testid="button-footer-subscribe"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </footer>
  );
}
