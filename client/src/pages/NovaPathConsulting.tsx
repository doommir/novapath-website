import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import ShaderBackground from "@/components/ui/shader-background";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Map,
  Hammer,
  FileText,
  BookOpen,
  Lightbulb,
  Library,
} from "lucide-react";
import danPresenting from "@assets/copyofdan_1770090391461.png";

const CALENDLY_URL = "https://calendly.com/novapath711/30min";

const CARD_STYLE = {
  backgroundColor: "#1A1425",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "12px",
} as const;

const CARD_HOVER_SHADOW = "0 0 24px rgba(124,92,255,0.1)";

export default function NovaPathConsulting() {
  const formRef = useRef<HTMLDivElement>(null);
  const methodologyRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToMethodology = () => {
    methodologyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen font-['Inter',sans-serif]" style={{ backgroundColor: "#0F0A1A" }}>
      <StickyNav />
      <Hero onPrimaryClick={scrollToForm} onSecondaryClick={scrollToMethodology} />
      <div id="problem">
        <ProblemSection />
      </div>
      <ReadinessCTA />
      <div id="about">
        <AboutDan />
      </div>
      <div id="services">
        <ServicesSection onCtaClick={scrollToForm} />
      </div>
      <div id="methodology" ref={methodologyRef}>
        <MethodologySection />
      </div>
      <div id="results">
        <ResultsSection />
      </div>
      <StatsBar />
      <Testimonials />
      <FaqSection />
      <BridgeCTA onInquiryClick={scrollToForm} />
      <div id="contact" ref={formRef}>
        <ContactForm />
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
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md"
      style={{ backgroundColor: "rgba(15, 10, 26, 0.92)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <a
          href="#"
          className="text-xl font-bold flex-shrink-0"
          style={{ color: "#FFFFFF" }}
          data-testid="link-logo"
        >
          NovaPath
        </a>

        <div className="hidden md:flex items-center gap-6">
          {anchorLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium hover:opacity-80 transition-opacity"
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
              className="text-sm font-medium hover:opacity-80 transition-opacity"
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
            className="text-white font-medium hidden md:inline-flex"
            style={{ backgroundColor: "#7C5CFF" }}
            data-testid="button-nav-cta"
          >
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
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
          className="md:hidden mt-3 pb-3 flex flex-col gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.75rem" }}
        >
          {anchorLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium px-2 py-1"
              style={{ color: "#B4B0C4" }}
              onClick={() => setMenuOpen(false)}
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
              className="text-sm font-medium px-2 py-1"
              style={{ color: "#B4B0C4" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold px-2 py-1"
            style={{ color: "#7C5CFF" }}
          >
            Book a Call
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero({
  onPrimaryClick,
  onSecondaryClick,
}: {
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}) {
  const reducedMotion = useReducedMotion();

  const credibilityItems = [
    "California SB 1288 AI Workgroup",
    "Featured in Education Week",
    "8+ AI Tools Deployed in K-12",
    "ASU+GSV · FETC · CSDC Speaker",
  ];

  return (
    <section className="relative overflow-hidden" style={{ paddingTop: "128px", paddingBottom: "80px" }}>
      <ShaderBackground />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_1400px_900px_at_50%_-10%,rgba(124,92,255,0.25),transparent_65%)]" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,10,26,0.15) 0%, rgba(15,10,26,0.5) 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124,92,255,0.3), transparent)" }} />

      <div className="max-w-4xl mx-auto px-6 relative text-center">
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
            K-12 AI Systems
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
          data-testid="text-hero-headline"
        >
          Your teachers are already using AI.
          <br />
          <span style={{ color: "#A78BFA" }}>The question is whether you have a plan.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-10 mx-auto leading-relaxed"
          style={{ color: "#B4B0C4", maxWidth: "640px" }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
        >
          NovaPath works with K-12 districts to build real AI strategy, not slide decks. We embed with your team, identify the workflows costing the most time, and cobuild working solutions in weeks, not months.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.3 }}
        >
          <Button
            asChild
            size="lg"
            className="text-white font-semibold rounded-full px-8"
            style={{ backgroundColor: "#7C5CFF" }}
            data-testid="button-hero-primary"
          >
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Schedule a Free Consultation
            </a>
          </Button>
          <button
            onClick={onSecondaryClick}
            className="text-sm font-medium hover:opacity-80 transition-opacity border rounded-full px-6 py-2.5"
            style={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,0.3)" }}
            data-testid="button-hero-secondary"
          >
            See How It Works
          </button>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-x-8 gap-y-3"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.5 }}
        >
          {credibilityItems.map((item, index) => (
            <span key={index} className="text-sm" style={{ color: "#6B6580" }} data-testid={`cred-item-${index}`}>
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-semibold uppercase tracking-widest mb-3"
      style={{ color: "#7C5CFF", letterSpacing: "0.12em" }}
    >
      {children}
    </p>
  );
}

function SectionHeader({ eyebrow, title, subtitle, centered = true }: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={`mb-14 ${centered ? "text-center" : ""}`}
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ color: "#FFFFFF", letterSpacing: "-0.01em" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base md:text-lg leading-relaxed ${centered ? "mx-auto" : ""}`}
          style={{ color: "#B4B0C4", maxWidth: "600px" }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function ProblemSection() {
  const reducedMotion = useReducedMotion();

  const painPoints = [
    {
      title: "Teachers are using AI with no guardrails",
      body: "Half your staff is using ChatGPT with student data. The other half won't touch it. Both groups need direction, and banning AI won't work.",
    },
    {
      title: "Vendors keep pitching, nothing sticks",
      body: "Webinars, pilots, abandoned licenses. You've tried AI solutions before. They all start strong and end up collecting dust.",
    },
    {
      title: "The board is asking questions we can't answer",
      body: "You need an AI strategy but the landscape changes monthly. A position paper from February is obsolete by spring.",
    },
  ];

  return (
    <section className="px-6" style={{ paddingTop: "96px", paddingBottom: "96px", background: "linear-gradient(180deg, #0F0A1A 0%, #130E1F 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="What We're Hearing"
          title="The Problem Every District Leader Knows"
        />
        <div className="grid md:grid-cols-3 gap-5">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              className="p-7 rounded-xl transition-all duration-300"
              style={CARD_STYLE}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
              whileHover={{ boxShadow: CARD_HOVER_SHADOW }}
              data-testid={`card-problem-${index}`}
            >
              <div
                className="w-8 h-8 rounded-lg mb-5 flex items-center justify-center"
                style={{ backgroundColor: "rgba(124,92,255,0.15)" }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#7C5CFF" }} />
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "#FFFFFF", fontSize: "18px" }}>{point.title}</h3>
              <p className="leading-relaxed" style={{ color: "#B4B0C4", fontSize: "15px", lineHeight: "1.65" }}>{point.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReadinessCTA() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="px-6" style={{ paddingTop: "40px", paddingBottom: "80px", backgroundColor: "#130E1F" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="p-10 rounded-2xl text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1A1425 0%, #160F22 100%)",
            border: "1px solid rgba(124,92,255,0.35)",
            boxShadow: "0 0 40px rgba(124,92,255,0.08)",
          }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_50%_-20%,rgba(124,92,255,0.12),transparent_70%)]" />
          <div className="relative">
            <Eyebrow>Free Tool</Eyebrow>
            <h2
              className="text-2xl md:text-3xl font-bold mt-1 mb-4"
              style={{ color: "#FFFFFF", letterSpacing: "-0.01em" }}
            >
              Find out where your district actually stands.
            </h2>
            <p className="mx-auto mb-8 leading-relaxed" style={{ color: "#B4B0C4", maxWidth: "520px", fontSize: "15px" }}>
              Before we talk, take the free K-12 AI Readiness Checklist. 29 items across 6 dimensions of readiness: policy, privacy, teacher readiness, student-facing AI, tool governance, and leadership vision.
            </p>
            <Button
              asChild
              size="lg"
              className="font-semibold text-white rounded-full px-8"
              style={{ backgroundColor: "#7C5CFF" }}
              data-testid="button-readiness-cta"
            >
              <a href="https://checklist.smarterbydesign.app" target="_blank" rel="noopener noreferrer">
                Take the Free Assessment
              </a>
            </Button>
            <p className="text-xs mt-4" style={{ color: "#6B6580" }}>
              Free · 10 minutes · No login required
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutDan() {
  const reducedMotion = useReducedMotion();

  const credentials = [
    "SB 1288 AI Workgroup",
    "Education Week",
    "ASU+GSV Speaker",
    "Navigator Schools",
  ];

  return (
    <section className="px-6" style={{ paddingTop: "96px", paddingBottom: "96px", backgroundColor: "#0F0A1A" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
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
              alt="Dan Whitlock presenting"
              className="relative w-full rounded-xl"
              style={{ maxWidth: "400px", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
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
            <h2
              className="text-3xl md:text-4xl font-bold mb-1"
              style={{ color: "#FFFFFF", letterSpacing: "-0.01em" }}
              data-testid="text-dan-name"
            >
              Dan Whitlock
            </h2>
            <p className="text-sm font-medium mb-7" style={{ color: "#6B6580" }}>
              Founder, NovaPath · Technology Innovation Lead, Navigator Schools
            </p>

            <div className="space-y-4 mb-8" style={{ color: "#B4B0C4", fontSize: "15px", lineHeight: "1.7" }}>
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

            <div className="flex flex-wrap gap-2 mb-7">
              {credentials.map((cred, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: "rgba(124,92,255,0.1)", color: "#A78BFA", border: "1px solid rgba(124,92,255,0.2)" }}
                >
                  {cred}
                </span>
              ))}
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

const SERVICE_ICONS = [Map, Hammer, FileText, BookOpen, Lightbulb, Library];

function ServicesSection({ onCtaClick }: { onCtaClick: () => void }) {
  const reducedMotion = useReducedMotion();

  const services = [
    {
      title: "District AI Systems",
      body: "Readiness audits, strategic roadmaps, and implementation support. We assess where your district stands on AI and build a plan to move forward.",
      bestFor: "Superintendents, tech directors, curriculum leads",
    },
    {
      title: "Cobuilding Engagements",
      body: "Our signature offering. We embed with your teachers, identify the workflows costing the most time, and cobuild custom AI tools in 10-week sprints.",
      bestFor: "Districts ready to build, not just plan",
    },
    {
      title: "AI Policy Development",
      body: "Create AI use policies teachers will actually follow. Built on Dan's experience with California's SB 1288 AI workgroup.",
      bestFor: "Districts with no or outdated AI policies",
    },
    {
      title: "Professional Development",
      body: "Hands-on AI literacy through cobuilding, not slide decks. Your team leaves with a working app and the skills to build more.",
      bestFor: "Schools wanting real AI training for staff",
    },
    {
      title: "Product Advisory",
      body: "Educator-informed product strategy for edtech companies. We ensure your AI product reflects how teachers and leaders actually work.",
      bestFor: "EdTech founders and product teams",
    },
    {
      title: "Frameworks & Resources",
      body: "Explore our library of instructional frameworks for AI product design. MTSS alignment, funding stream positioning, evidence requirements, and more.",
      bestFor: "Self-serve exploration, product teams, researchers",
      cta: { label: "Explore the IP Library", href: "#" },
    },
  ];

  return (
    <section className="px-6" style={{ paddingTop: "96px", paddingBottom: "96px", backgroundColor: "#130E1F" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Services"
          title="How We Work With You"
          subtitle="Every engagement starts with understanding where you are."
        />

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {services.map((service, index) => {
            const Icon = SERVICE_ICONS[index];
            return (
              <motion.div
                key={index}
                className="p-7 rounded-xl flex flex-col gap-4 transition-all duration-300"
                style={CARD_STYLE}
                initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: (index % 3) * 0.08 }}
                whileHover={{ boxShadow: CARD_HOVER_SHADOW }}
                data-testid={`card-service-${index}`}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(124,92,255,0.12)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#7C5CFF" }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2" style={{ color: "#FFFFFF", fontSize: "18px" }}>{service.title}</h3>
                  <p className="leading-relaxed" style={{ color: "#B4B0C4", fontSize: "15px", lineHeight: "1.65" }}>{service.body}</p>
                </div>
                <p className="text-xs italic" style={{ color: "#A78BFA" }}>
                  Best for: {service.bestFor}
                </p>
                {service.cta && (
                  <a
                    href={service.cta.href}
                    className="text-sm font-medium hover:underline"
                    style={{ color: "#7C5CFF" }}
                    data-testid="link-ip-library"
                  >
                    {service.cta.label} →
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <p className="text-sm mb-4" style={{ color: "#6B6580" }}>Can't find what you're looking for?</p>
          <Button
            asChild
            className="text-white font-semibold rounded-full px-8"
            style={{ backgroundColor: "#7C5CFF" }}
            data-testid="button-services-cta"
          >
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Book a Free Consultation
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function MethodologySection() {
  const reducedMotion = useReducedMotion();

  const steps = [
    {
      num: 1,
      title: "Identify the Pain Point",
      body: "We start by discussing the workflow that frustrates your team most. Attendance tracking? Coaching documentation? Parent communication? Pick the problem that costs you the most time.",
    },
    {
      num: 2,
      title: "Design the Solution Together",
      body: "Your team defines what a good solution looks like. We facilitate the design process, ensuring the app fits your actual workflow, not a generic template.",
    },
    {
      num: 3,
      title: "Cobuild with AI",
      body: "Using AI coding agents, we build the app together. Your team sees how prompts become code, how to debug, how to iterate. This is where real AI literacy develops.",
    },
    {
      num: 4,
      title: "Deploy and Keep Building",
      body: "By the end, your app is live. Your team can use it that afternoon. More importantly, they've developed the AI literacy to tackle future challenges independently.",
    },
  ];

  return (
    <section className="px-6" style={{ paddingTop: "96px", paddingBottom: "96px", backgroundColor: "#0F0A1A" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="How a Cobuilding Engagement Works"
          subtitle="Four phases. Real tools. Real classrooms. Your team keeps building."
        />
        <div className="grid md:grid-cols-4 gap-5">
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
                  className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-[-50%] h-px"
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

function ResultsSection() {
  const reducedMotion = useReducedMotion();

  const tools = [
    {
      name: "NaviGrade Autograder",
      description: "Paper to photo to AI-scored rubric feedback to student revision via QR codes.",
      stat: "75% of students voluntarily revised their work",
      hook: null,
    },
    {
      name: "Coaching Dashboard",
      description: "Classroom observation to AI synthesis to action steps to fidelity tracking.",
      stat: null,
      hook: "Coaching system, not coaching vibes.",
    },
    {
      name: "Restorative Practice Generator",
      description: "Incident to SEL-aligned reflection plus parent letter, generated in minutes.",
      stat: "45-minute process reduced to 3 minutes",
      hook: "Featured in Education Week",
    },
    {
      name: "Mixteco Translator Plus",
      description: "Custom AI for Mixtec, Spanish, and English translation with image recognition.",
      stat: null,
      hook: "Dignity isn't a feature request.",
    },
    {
      name: "ELD R.I.S.E. (K-2)",
      description: "15-minute ELD workflow aligned to California ELD standards.",
      stat: null,
      hook: "Every K-2 teacher can deliver ELD in 15 minutes.",
    },
    {
      name: "Attendance Automation",
      description: "AI tracks patterns and notifies counselors when absences suggest a student needs support, before the problem escalates.",
      stat: null,
      hook: null,
    },
  ];

  return (
    <section className="px-6" style={{ paddingTop: "96px", paddingBottom: "96px", backgroundColor: "#130E1F" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Proof of Practice"
          title="Real Tools Built by Real Educators"
          subtitle="These aren't hypotheticals. These are tools built and deployed at Navigator Schools."
        />
        <div className="grid md:grid-cols-3 gap-5">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              className="p-7 rounded-xl flex flex-col gap-3 transition-all duration-300"
              style={CARD_STYLE}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: (index % 3) * 0.08 }}
              whileHover={{ boxShadow: CARD_HOVER_SHADOW }}
              data-testid={`card-tool-${index}`}
            >
              <h3 className="font-semibold" style={{ color: "#FFFFFF", fontSize: "18px" }}>{tool.name}</h3>
              <p className="flex-1 leading-relaxed" style={{ color: "#B4B0C4", fontSize: "15px", lineHeight: "1.65" }}>{tool.description}</p>
              {tool.stat && (
                <p className="font-bold" style={{ color: "#7C5CFF", fontSize: "15px" }}>{tool.stat}</p>
              )}
              {tool.hook && (
                <p className="italic" style={{ color: "#6B6580", fontSize: "13px" }}>{tool.hook}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Case Study */}
        <motion.div
          className="mt-12 rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(124,92,255,0.25)", backgroundColor: "#110D1E" }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          data-testid="card-case-study"
        >
          {/* Header bar */}
          <div className="px-8 py-5 flex flex-wrap items-center justify-between gap-4" style={{ borderBottom: "1px solid rgba(124,92,255,0.15)", background: "linear-gradient(90deg, rgba(124,92,255,0.1), transparent)" }}>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#7C5CFF" }}>Case Study</span>
              <h3 className="text-xl font-bold mt-1" style={{ color: "#FFFFFF" }}>Educators Co-Building with AI</h3>
              <p className="text-sm mt-0.5" style={{ color: "#B4B0C4" }}>Instructional Coaching Transformation &nbsp;·&nbsp; August 2025 – March 2026</p>
            </div>
            <div className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(124,92,255,0.12)", color: "#A78BFA", border: "1px solid rgba(124,92,255,0.2)" }}>
              Multi-site public charter network &nbsp;·&nbsp; ~1,900 students &nbsp;·&nbsp; California
            </div>
          </div>

          <div className="p-8">
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { number: "1,781", label: "Classroom observations" },
                { number: "2,185", label: "Targeted action steps" },
                { number: "+19%", label: "Improvement in instructional practice" },
                { number: "92%", label: "Teachers engaged in coaching cycles" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl text-center"
                  style={{ backgroundColor: "rgba(124,92,255,0.07)", border: "1px solid rgba(124,92,255,0.12)" }}
                >
                  <div className="text-2xl font-bold mb-1" style={{ color: "#A78BFA" }}>{s.number}</div>
                  <div className="text-xs leading-snug" style={{ color: "#B4B0C4" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-5">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: "#7C5CFF" }}>The Challenge</h4>
                  <p className="leading-relaxed text-sm" style={{ color: "#B4B0C4" }}>
                    Instructional coaching often generates activity without clear evidence of impact. Observations are conducted, feedback is given, and action steps are assigned — but what happens next is rarely visible. Without that visibility, coaching becomes episodic and impact is inferred rather than observed.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: "#7C5CFF" }}>The Approach</h4>
                  <p className="leading-relaxed text-sm" style={{ color: "#B4B0C4" }}>
                    Rather than deploying a pre-built platform, this network co-developed their system alongside AI. Educators defined what effective instruction looks like, how coaching feedback should be structured, and which instructional priorities matter most. AI organized observation data in real time, surfaced patterns across teachers and schools, and standardized coaching language — without replacing educator judgment.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: "#7C5CFF" }}>What the Data Showed</h4>
                  <ul className="space-y-2 text-sm" style={{ color: "#B4B0C4" }}>
                    {[
                      "Average observation scores rose from 2.29 to 2.73 — a sustained upward trajectory",
                      "Small Group Instruction led all areas at ~2.77 average",
                      "ELA and STEM each logged 400+ observations",
                      "14 action steps per teacher on average; up to 24 for highest-need teachers",
                      "\"Tracking, Not Watching\" used 130+ times — the most common coaching technique",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0 font-bold" style={{ color: "#7C5CFF" }}>–</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pull quote */}
                <blockquote
                  className="p-5 rounded-xl italic text-sm leading-relaxed"
                  style={{ backgroundColor: "rgba(124,92,255,0.07)", border: "1px solid rgba(124,92,255,0.15)", color: "#B4B0C4" }}
                >
                  "The system didn't tell us what good instruction was. We defined that. The AI just made it visible across every classroom."
                  <footer className="mt-2 not-italic text-xs" style={{ color: "#6B6580" }}>— Assistant Principal, Navigator Schools</footer>
                </blockquote>
              </div>
            </div>

            {/* Footer takeaway */}
            <div className="mt-8 pt-6 flex flex-wrap gap-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              {[
                { label: "Relevance", desc: "The system reflects real classrooms because educators defined it." },
                { label: "Consistency", desc: "AI ensures shared structures across all sites." },
                { label: "Visibility", desc: "Patterns that were previously invisible are now clear and actionable." },
                { label: "Adaptability", desc: "The system evolves as instructional priorities shift." },
              ].map((item, i) => (
                <div key={i} className="flex-1 min-w-[180px]">
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#7C5CFF" }}>{item.label}</div>
                  <div className="text-xs leading-snug" style={{ color: "#B4B0C4" }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatsBar() {
  const reducedMotion = useReducedMotion();

  const stats = [
    { number: "1,900+", label: "students across Navigator Schools" },
    { number: "8+", label: "AI tools deployed in real classrooms" },
    { number: "4", label: "campuses, with Orange County expansion approved" },
  ];

  return (
    <section
      className="px-6"
      style={{
        paddingTop: "96px",
        paddingBottom: "96px",
        background: "linear-gradient(135deg, #0D0919 0%, #130E22 40%, #0D0919 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 800px 500px at 50% 50%, rgba(124,92,255,0.08), transparent)" }}
      />
      <div className="max-w-5xl mx-auto relative">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          style={{ color: "#FFFFFF", letterSpacing: "-0.01em" }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          Built in Classrooms, Not Conference Rooms
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
              data-testid={`stat-${index}`}
            >
              <div
                className="text-5xl md:text-7xl font-bold mb-3 leading-none"
                style={{ color: "#FFFFFF", letterSpacing: "-0.03em" }}
              >
                {stat.number}
              </div>
              <div className="text-base" style={{ color: "#6B6580" }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="px-6" style={{ paddingTop: "96px", paddingBottom: "96px", backgroundColor: "#0F0A1A" }}>
      <div className="max-w-3xl mx-auto">
        <motion.p
          className="text-xs font-semibold uppercase tracking-widest text-center mb-12"
          style={{ color: "#6B6580", letterSpacing: "0.12em" }}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          What Educators Are Saying
        </motion.p>

        <motion.div
          className="p-8 rounded-2xl"
          style={{
            ...CARD_STYLE,
            borderLeft: "3px solid #7C5CFF",
            paddingLeft: "2.5rem",
          }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          data-testid="quote-edweek"
        >
          <p
            className="font-medium leading-relaxed mb-6 italic"
            style={{ color: "#FFFFFF", fontSize: "20px", lineHeight: "1.7" }}
          >
            "The AI tool that Whitlock developed turned a 45-minute documentation process into 3 minutes, freeing teachers to focus on actually supporting students."
          </p>
          <p className="text-sm" style={{ color: "#6B6580" }}>— Education Week, August 2025</p>
        </motion.div>
      </div>
    </section>
  );
}

function FaqSection() {
  const reducedMotion = useReducedMotion();

  const faqs = [
    {
      q: "What's a cobuilding engagement?",
      a: "Instead of buying an off-the-shelf AI tool, we build one with your team. Dan works alongside your teachers to identify a painful workflow, then we prototype and deploy a custom AI solution in a 10-week sprint. Your team learns AI literacy through the process of building something real.",
    },
    {
      q: "Do you work with charter schools and traditional districts?",
      a: "Yes, both. Navigator Schools is a charter network, but the methodology works for any K-12 organization. The common thread is leadership that's ready to move past vendor pitches and build something real.",
    },
    {
      q: "How is this different from hiring an AI consultant?",
      a: "Most AI consultants deliver a report. We deliver working tools. Dan is in classrooms every week at Navigator Schools building and iterating AI tools with teachers. That practitioner credibility is what makes our recommendations actionable, not theoretical.",
    },
    {
      q: "What about data privacy and FERPA?",
      a: "Every tool we build follows a core architecture principle: the AI never knows who the student is. Student identity stays in the local database and never enters AI API calls. We architect the data flow so identity and AI processing never share the same pipe.",
    },
    {
      q: "What does a free readiness review look like?",
      a: "It's a 30-minute conversation where we assess where your district stands on AI readiness. We'll identify your biggest gaps and map a path forward. No pitch, no pressure. Most district leaders say it's the most useful 30 minutes they've spent on AI strategy.",
    },
    {
      q: "Do you work with edtech companies?",
      a: "Yes. We offer product advisory for edtech companies building AI-powered tools. We bring the educator lens: product positioning, workflow design, classroom fit diagnostics, and prototype-to-production cobuilding. Details at the bottom of our Services section.",
    },
  ];

  return (
    <section className="px-6" style={{ paddingTop: "96px", paddingBottom: "96px", backgroundColor: "#0F0A1A" }}>
      <div className="max-w-3xl mx-auto">
        <SectionHeader title="Common Questions" />
        <Accordion type="single" collapsible className="space-y-0">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border-b"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
              data-testid={`faq-item-${index}`}
            >
              <AccordionTrigger
                className="text-left hover:no-underline py-5 text-base font-medium"
                style={{ color: "#FFFFFF" }}
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent
                className="pb-5 text-base leading-relaxed"
                style={{ color: "#B4B0C4" }}
              >
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function BridgeCTA({ onInquiryClick }: { onInquiryClick: () => void }) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="px-6" style={{ paddingTop: "40px", paddingBottom: "80px", backgroundColor: "#130E1F" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="p-10 rounded-2xl text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1D1530 0%, #16102A 100%)",
            border: "1px solid rgba(124,92,255,0.3)",
          }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_50%_0%,rgba(124,92,255,0.12),transparent_70%)]" />
          <div className="relative">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#FFFFFF", letterSpacing: "-0.01em" }}
            >
              Ready to Figure Out AI for Your District?
            </h2>
            <p className="mx-auto mb-8" style={{ color: "#B4B0C4", maxWidth: "480px", fontSize: "16px", lineHeight: "1.65" }}>
              Start with a free 30-minute AI Readiness Review. We'll assess where you are, identify your biggest gaps, and map a path forward.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="text-white font-semibold rounded-full px-8"
                style={{ backgroundColor: "#7C5CFF" }}
                data-testid="button-bridge-primary"
              >
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Schedule a Free Consultation
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-semibold rounded-full"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "#FFFFFF" }}
                onClick={onInquiryClick}
                data-testid="button-bridge-secondary"
              >
                Or send us an inquiry
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactForm() {
  const reducedMotion = useReducedMotion();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    district: "",
    email: "",
    challenge: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/consulting-inquiries", data);
    },
    onSuccess: () => {
      toast({
        title: "Thank you!",
        description: "We'll be in touch within 24 hours.",
      });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const roleOptions = [
    "Superintendent",
    "Asst. Superintendent",
    "Technology Director",
    "Curriculum Director",
    "Principal",
    "Instructional Coach",
    "EdTech Company",
    "Other",
  ];

  const inputStyle = {
    backgroundColor: "#1A1425",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#F5F3FF",
    borderRadius: "8px",
  };

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
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#FFFFFF", letterSpacing: "-0.01em" }}>
            Send Us a Note
          </h2>
          <p style={{ color: "#B4B0C4", fontSize: "16px" }}>
            Tell us about your district and we'll be in touch within 24 hours.
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
                data-testid="input-name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#B4B0C4" }}>Your Role</label>
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                style={{ ...inputStyle, color: formData.role ? "#F5F3FF" : "#6B6580" }}
                data-testid="select-role"
              >
                <option value="" disabled>Select your role</option>
                {roleOptions.map((option) => (
                  <option key={option} value={option} style={{ backgroundColor: "#1A1425", color: "#F5F3FF" }}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#B4B0C4" }}>District / Organization</label>
              <input
                type="text"
                required
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                style={inputStyle}
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
                className="w-full px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                style={inputStyle}
                data-testid="input-email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#B4B0C4" }}>
              What's your biggest challenge with AI right now?
            </label>
            <textarea
              rows={4}
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              className="w-full px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-shadow"
              style={inputStyle}
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
            {mutation.isPending ? "Submitting..." : "Schedule a Free Consultation"}
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
    window.open("https://smarterbydesign.app", "_blank", "noopener,noreferrer");
    setEmail("");
  };

  return (
    <footer
      className="px-6 py-12"
      style={{ backgroundColor: "#080512", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <p className="text-base font-semibold mb-2" style={{ color: "#FFFFFF" }}>NovaPath Systems</p>
          <a
            href="mailto:Dan@explorenovapath.com"
            className="text-sm hover:opacity-80 block mb-1"
            style={{ color: "#6B6580" }}
            data-testid="link-footer-email"
          >
            Dan@explorenovapath.com
          </a>
          <p className="text-sm mt-4" style={{ color: "#6B6580" }}>© 2026 NovaPath Systems</p>
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
              className="flex-1 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500 rounded-lg placeholder:text-gray-600"
              style={{ backgroundColor: "#1A1425", border: "1px solid rgba(255,255,255,0.06)", color: "#F5F3FF" }}
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
