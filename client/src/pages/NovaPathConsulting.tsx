import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import danHeadshot from "@assets/dan-headshot-about_1770050115907.jpeg";
import danPresenting from "@assets/copyofdan_1770090391461.png";

const CALENDLY_URL = "https://calendly.com/novapath";

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
      <PricingSection onCtaClick={scrollToForm} />
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
      style={{ backgroundColor: "rgba(15, 10, 26, 0.92)", borderBottom: "1px solid #2A2435" }}
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
            className="text-white font-medium"
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
          style={{ borderTop: "1px solid #2A2435", paddingTop: "0.75rem" }}
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
              style={{
                backgroundColor: "rgba(124, 92, 255, 0.15)",
                color: "#A78BFA",
                border: "1px solid rgba(124,92,255,0.3)",
              }}
            >
              K-12 AI Consulting
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              style={{ color: "#FFFFFF" }}
              data-testid="text-hero-headline"
            >
              Your teachers are already using AI.
              <br />
              <span style={{ color: "#A78BFA" }}>The question is whether you have a plan.</span>
            </h1>

            <p className="text-lg mb-8 max-w-xl leading-relaxed" style={{ color: "#B4B0C4" }}>
              NovaPath works with K-12 districts to build real AI strategy, not slide decks. We embed with your team, identify the workflows costing the most time, and cobuild working solutions in weeks, not months.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="text-white font-semibold"
                style={{ backgroundColor: "#7C5CFF" }}
                data-testid="button-hero-primary"
              >
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Schedule a Free Consultation
                </a>
              </Button>
              <button
                onClick={onSecondaryClick}
                className="text-sm font-medium hover:opacity-80 transition-opacity border rounded-lg px-5 py-2.5"
                style={{ color: "#FFFFFF", borderColor: "#FFFFFF" }}
                data-testid="button-hero-secondary"
              >
                See How It Works
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
              style={{ background: "radial-gradient(circle at center, rgba(124,92,255,0.3), transparent 70%)" }}
            />
            <img
              src={danHeadshot}
              alt="Dan Whitlock, Founder of NovaPath"
              className="relative rounded-2xl w-full max-w-md mx-auto"
              style={{ boxShadow: "0 0 60px rgba(124,92,255,0.2)" }}
              loading="lazy"
              data-testid="img-hero-dan"
            />
          </motion.div>
        </div>

        <motion.div
          className="mt-16 pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          style={{ borderTop: "1px solid #2A2435" }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
        >
          {credibilityItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2" data-testid={`cred-item-${index}`}>
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#7C5CFF" }} />
              <span className="text-sm" style={{ color: "#B4B0C4" }}>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
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
            What We're Hearing from Districts
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
              <h3 className="text-lg font-semibold mb-3" style={{ color: "#FFFFFF" }}>{point.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#B4B0C4" }}>{point.body}</p>
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
    <section className="py-16 px-6" style={{ backgroundColor: "#1A1425" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="p-8 rounded-xl"
          style={{ border: "2px solid #7C5CFF", backgroundColor: "#0F0A1A" }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <div className="text-center">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#7C5CFF" }}
            >
              Free Tool
            </span>

            <h2
              className="text-2xl md:text-3xl font-bold mt-3 mb-4"
              style={{ color: "#FFFFFF" }}
            >
              Find out where your district actually stands.
            </h2>

            <p className="max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: "#B4B0C4" }}>
              Before we talk, take the free K-12 AI Readiness Checklist. 29 items across 6 dimensions of readiness: policy, privacy, teacher readiness, student-facing AI, tool governance, and leadership vision.
            </p>

            <Button
              asChild
              size="lg"
              className="font-semibold text-white"
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

  return (
    <section className="py-20 px-6" style={{ backgroundColor: "#0F0A1A" }}>
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
              style={{ background: "radial-gradient(circle at center, rgba(124,92,255,0.2), transparent 70%)" }}
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
              Technology Innovation Lead, Navigator Schools
            </p>

            <div className="space-y-4 mb-8" style={{ color: "#B4B0C4" }}>
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

function ServicesSection({ onCtaClick }: { onCtaClick: () => void }) {
  const reducedMotion = useReducedMotion();

  const services = [
    {
      title: "District AI Consulting",
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
    <section className="py-20 px-6" style={{ backgroundColor: "#1A1425" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ backgroundColor: "rgba(124,92,255,0.15)", color: "#A78BFA", border: "1px solid rgba(124,92,255,0.3)" }}
          >
            Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
            How We Work With You
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "#B4B0C4" }}>
            Every engagement starts with understanding where you are.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl flex flex-col gap-3"
              style={{ backgroundColor: "#0F0A1A", border: "1px solid #2A2435" }}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: (index % 3) * 0.08 }}
              data-testid={`card-service-${index}`}
            >
              <h3 className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>{service.title}</h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "#B4B0C4" }}>{service.body}</p>
              <p className="text-xs" style={{ color: "#6B6580" }}>
                <span style={{ color: "#A78BFA" }}>Best for:</span> {service.bestFor}
              </p>
              {service.cta && (
                <a
                  href={service.cta.href}
                  className="text-sm font-medium hover:underline mt-1"
                  style={{ color: "#7C5CFF" }}
                  data-testid="link-ip-library"
                >
                  {service.cta.label} →
                </a>
              )}
            </motion.div>
          ))}
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
            className="text-white font-semibold"
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
            How a Cobuilding Engagement Works
          </h2>
          <p style={{ color: "#B4B0C4" }}>
            Four phases. Real tools. Real classrooms. Your team keeps building.
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
              <div
                className="relative p-6 rounded-xl"
                style={{ backgroundColor: "#1A1425", border: "1px solid #2A2435" }}
              >
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

function ResultsSection() {
  const reducedMotion = useReducedMotion();

  const tools = [
    {
      name: "NaviGrade Autograder",
      description: "Paper → photo → AI-scored rubric feedback → student revision via QR codes.",
      stat: "75% of students voluntarily revised their work",
      hook: null,
    },
    {
      name: "Coaching Dashboard",
      description: "Classroom observation → AI synthesis → action steps → fidelity tracking.",
      stat: null,
      hook: "Coaching system, not coaching vibes.",
    },
    {
      name: "Restorative Practice Generator",
      description: "Incident → SEL-aligned reflection + parent letter, generated in minutes.",
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
            Real Tools Built by Real Educators
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
              style={{ backgroundColor: "#0F0A1A", border: "1px solid #2A2435" }}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: (index % 3) * 0.08 }}
              data-testid={`card-tool-${index}`}
            >
              <h3 className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>{tool.name}</h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "#B4B0C4" }}>{tool.description}</p>
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

function StatsBar() {
  const reducedMotion = useReducedMotion();

  const stats = [
    { number: "1,900+", label: "students across Navigator Schools" },
    { number: "8+", label: "AI tools deployed in real classrooms" },
    { number: "4", label: "campuses, with Orange County expansion approved" },
  ];

  return (
    <section
      className="py-20 px-6"
      style={{ background: "linear-gradient(135deg, #0F0A1A 0%, #1A1025 50%, #0F0A1A 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          style={{ color: "#FFFFFF" }}
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
              <div className="text-5xl md:text-6xl font-bold mb-3" style={{ color: "#FFFFFF" }}>
                {stat.number}
              </div>
              <div className="text-base" style={{ color: "#B4B0C4" }}>{stat.label}</div>
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
          className="p-8 rounded-xl relative pl-12"
          style={{ backgroundColor: "#1A1425", border: "1px solid #2A2435", borderLeft: "4px solid #7C5CFF" }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          data-testid="quote-edweek"
        >
          <p className="text-xl md:text-2xl font-medium leading-relaxed mb-6 italic" style={{ color: "#FFFFFF" }}>
            "The AI tool that Whitlock developed turned a 45-minute documentation process into 3 minutes, freeing teachers to focus on actually supporting students."
          </p>
          <p className="text-sm" style={{ color: "#6B6580" }}>— Education Week, August 2025</p>
        </motion.div>
      </div>
    </section>
  );
}

function PricingSection({ onCtaClick }: { onCtaClick: () => void }) {
  const reducedMotion = useReducedMotion();

  const tiers = [
    {
      name: "Get Started",
      tagline: "For districts beginning their AI journey.",
      price: "$5K – $15K",
      featured: false,
      bullets: [
        "AI readiness audit and gap analysis",
        "Policy and governance review",
        "Teacher readiness assessment",
        "Strategic roadmap and recommendations",
        "Written report with prioritized next steps",
      ],
      ctaLabel: "Book a Readiness Review",
      ctaVariant: "outline" as const,
    },
    {
      name: "Go Deeper",
      tagline: "For districts ready to build real solutions.",
      price: "$15K – $50K+",
      featured: true,
      badge: "Most Popular",
      bullets: [
        "Everything in Get Started",
        "10-week embedded cobuilding sprint",
        "Custom AI tool built with your teachers",
        "Teacher training and AI literacy development",
        "Ongoing iteration and support",
      ],
      ctaLabel: "Schedule a Consultation",
      ctaVariant: "filled" as const,
    },
    {
      name: "Stay Connected",
      tagline: "For districts that want ongoing advisory and support.",
      price: "$12K – $20K/month",
      featured: false,
      bullets: [
        "Embedded advisory retainer",
        "Continuous tool development and iteration",
        "Monthly strategy sessions",
        "Staff training and onboarding",
        "Priority support and direct access",
      ],
      ctaLabel: "Let's Talk",
      ctaVariant: "outline" as const,
    },
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
            Engagement Options
          </h2>
          <p style={{ color: "#B4B0C4" }}>
            Every district is different. Here's what working together can look like.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-xl flex flex-col gap-6 relative"
              style={{
                backgroundColor: "#0F0A1A",
                border: tier.featured ? "2px solid #7C5CFF" : "1px solid #2A2435",
              }}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
              data-testid={`card-pricing-${index}`}
            >
              {tier.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{ backgroundColor: "#7C5CFF", color: "#FFFFFF" }}
                  data-testid="badge-popular"
                >
                  {tier.badge}
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold mb-1" style={{ color: "#FFFFFF" }}>{tier.name}</h3>
                <p className="text-sm mb-4" style={{ color: "#B4B0C4" }}>{tier.tagline}</p>
                <div className="text-3xl font-bold" style={{ color: tier.featured ? "#7C5CFF" : "#FFFFFF" }}>
                  {tier.price}
                </div>
              </div>

              <ul className="space-y-3 flex-1">
                {tier.bullets.map((bullet, bIndex) => (
                  <li key={bIndex} className="flex items-start gap-3 text-sm" style={{ color: "#B4B0C4" }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: "#7C5CFF" }}>✓</span>
                    {bullet}
                  </li>
                ))}
              </ul>

              {tier.ctaVariant === "filled" ? (
                <Button
                  asChild
                  className="w-full text-white font-semibold"
                  style={{ backgroundColor: "#7C5CFF" }}
                  data-testid={`button-pricing-${index}`}
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
                  style={{ borderColor: "#7C5CFF", color: "#7C5CFF" }}
                  data-testid={`button-pricing-${index}`}
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
          className="text-center text-sm"
          style={{ color: "#6B6580" }}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          For EdTech companies: Product advisory starts at $250/hour. Project-based cobuilding from $5K–$30K+. Contact us for details.
        </motion.p>
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
    <section className="py-20 px-6" style={{ backgroundColor: "#0F0A1A" }}>
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ color: "#FFFFFF" }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          Common Questions
        </motion.h2>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="rounded-xl px-6"
              style={{ backgroundColor: "#1A1425", border: "1px solid #2A2435" }}
              data-testid={`faq-item-${index}`}
            >
              <AccordionTrigger
                className="text-left hover:no-underline py-5"
                style={{ color: "#FFFFFF" }}
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent style={{ color: "#B4B0C4" }}>
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
    <section className="py-16 px-6" style={{ backgroundColor: "#1A1425" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="p-10 rounded-2xl text-center"
          style={{ backgroundColor: "#0F0A1A", border: "1px solid #2A2435" }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
            Ready to Figure Out AI for Your District?
          </h2>
          <p className="max-w-xl mx-auto mb-8" style={{ color: "#B4B0C4" }}>
            Start with a free 30-minute AI Readiness Review. We'll assess where you are, identify your biggest gaps, and map a path forward.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="text-white font-semibold"
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
              className="font-semibold"
              style={{ borderColor: "#7C5CFF", color: "#7C5CFF" }}
              onClick={onInquiryClick}
              data-testid="button-bridge-secondary"
            >
              Or send us an inquiry
            </Button>
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
        description: "Please try again or email dan.j.whitlock@gmail.com directly.",
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

  return (
    <section
      className="py-20 px-6 relative"
      style={{ background: "linear-gradient(180deg, #0F0A1A 0%, #1A1425 100%)" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_600px_at_50%_30%,rgba(124,92,255,0.08),transparent_60%)]" />
      <div className="max-w-2xl mx-auto relative">
        <motion.div
          className="text-center mb-10"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#FFFFFF" }}>
            Send Us a Note
          </h2>
          <p style={{ color: "#B4B0C4" }}>
            Tell us about your district and we'll be in touch within 24 hours.
          </p>
        </motion.div>

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
              <label className="block text-sm font-medium mb-2" style={{ color: "#B4B0C4" }}>Your Name</label>
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
                style={{
                  backgroundColor: "#241E30",
                  border: "1px solid #2A2435",
                  color: formData.role ? "#F5F3FF" : "#6B6580",
                }}
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
              <label className="block text-sm font-medium mb-2" style={{ color: "#B4B0C4" }}>District / Organization</label>
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
              What's your biggest challenge with AI right now?
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
      className="py-12 px-6"
      style={{ backgroundColor: "#0A0612", borderTop: "1px solid #2A2435" }}
    >
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
