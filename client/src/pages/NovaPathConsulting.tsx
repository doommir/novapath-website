import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import danHeadshot from "@assets/dan-headshot-about_1770050115907.jpeg";

export default function NovaPathConsulting() {
  const reducedMotion = useReducedMotion();
  const formRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const scrollToProcess = () => {
    processRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen font-['DM_Sans',sans-serif]" style={{ backgroundColor: "#0F0A1A" }}>
      <StickyNav onCtaClick={scrollToForm} />
      <Hero onCtaClick={scrollToForm} onSecondaryClick={scrollToProcess} />
      <div id="problem">
        <ProblemSection />
      </div>
      <div id="about">
        <MeetDan />
      </div>
      <WhyCobuilding />
      <div id="process" ref={processRef}>
        <CobuildingProcess />
      </div>
      <div id="solutions">
        <WhatWeBuilt />
      </div>
      <WhatDistrictsGet />
      <Testimonials />
      <div id="contact" ref={formRef}>
        <ConsultationForm />
      </div>
      <ConsultingFooter />
    </div>
  );
}

function StickyNav({ onCtaClick }: { onCtaClick: () => void }) {
  const navLinks = [
    { label: "Problem", href: "#problem" },
    { label: "About Dan", href: "#about" },
    { label: "Process", href: "#process" },
    { label: "Solutions", href: "#solutions" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 backdrop-blur-md" style={{ backgroundColor: "rgba(26, 20, 37, 0.8)" }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <span className="text-xl font-bold" style={{ color: "#F5F3FF" }}>NovaPath</span>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors"
              style={{ color: "#B4B0C4" }}
              data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <Button
          onClick={onCtaClick}
          className="text-white font-medium"
          style={{ backgroundColor: "#7C5CFF" }}
          data-testid="button-nav-cta"
        >
          Schedule a Consultation
        </Button>
      </div>
    </nav>
  );
}

function Hero({ onCtaClick, onSecondaryClick }: { onCtaClick: () => void; onSecondaryClick: () => void }) {
  const reducedMotion = useReducedMotion();

  const credibilityItems = [
    "California SB 1288 AI Workgroup",
    "Featured in Education Week",
    "8 AI Tools Deployed in Real Classrooms",
    "4 Campuses · 1,900+ Students"
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
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#7C5CFF" }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#7C5CFF" }}>
                AI Consulting for K-12 Districts
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "#F5F3FF" }} data-testid="text-hero-headline">
              Your teachers are already using AI.
              <br />
              <span style={{ color: "#A78BFA" }}>The question is whether you have a plan.</span>
            </h1>
            
            <p className="text-lg mb-8 max-w-xl leading-relaxed" style={{ color: "#B4B0C4" }}>
              NovaPath works with K-12 districts to build real AI strategy — not slide decks. We embed with your team, identify the workflows burning the most time, and cobuild working solutions in weeks, not months.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={onCtaClick}
                size="lg"
                className="text-white font-semibold"
                style={{ backgroundColor: "#7C5CFF" }}
                data-testid="button-hero-cta"
              >
                Schedule a Free Consultation
              </Button>
              <Button
                onClick={onSecondaryClick}
                variant="outline"
                size="lg"
                className="font-semibold"
                style={{ color: "#7C5CFF", borderColor: "#7C5CFF" }}
                data-testid="button-hero-secondary"
              >
                See How It Works
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            className="relative hidden md:block"
            initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr rounded-2xl blur-3xl" style={{ background: "radial-gradient(circle at center, rgba(124, 92, 255, 0.3), transparent 70%)" }} />
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
        
        <motion.div
          className="mt-16 pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          style={{ borderTop: "1px solid #2A2435" }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
        >
          {credibilityItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Sparkles className="w-3 h-3" style={{ color: "#7C5CFF" }} />
              <span className="text-sm" style={{ color: "#6B6580" }}>{item}</span>
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
      body: "Half our staff is pasting student work into ChatGPT. We have no policy, no training, and no idea what data is being shared."
    },
    {
      title: "Vendors keep pitching, nothing sticks",
      body: "We've sat through a dozen AI demos. They all look great on stage. None of them survive contact with an actual classroom."
    },
    {
      title: "The board is asking questions we can't answer",
      body: "We need an AI strategy by next quarter. We don't even know what the right questions are yet, let alone the answers."
    }
  ];

  return (
    <section className="py-20 px-6" style={{ background: "linear-gradient(180deg, #0F0A1A 0%, #1A1425 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs font-semibold uppercase tracking-widest text-center mb-12"
          style={{ color: "#6B6580" }}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          What We're Hearing from Districts
        </motion.p>
        
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
              <h3 className="text-lg font-semibold mb-3" style={{ color: "#F5F3FF" }}>{point.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#B4B0C4" }}>{point.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MeetDan() {
  const reducedMotion = useReducedMotion();

  const badges = [
    "SB 1288 AI Workgroup",
    "Education Week Feature",
    "ASU+GSV Speaker",
    "FETC 2026 Speaker",
    "Navigator Schools"
  ];

  return (
    <section className="py-20 px-6" style={{ backgroundColor: "#0F0A1A" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <div className="absolute inset-0 rounded-2xl blur-3xl" style={{ background: "radial-gradient(circle at center, rgba(124, 92, 255, 0.2), transparent 70%)" }} />
            <img
              src={danHeadshot}
              alt="Dan Whitlock"
              className="relative rounded-2xl w-full max-w-sm mx-auto md:mx-0"
              style={{ border: "2px solid #2A2435" }}
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
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#F5F3FF" }} data-testid="text-dan-name">Dan Whitlock</h2>
            <p className="text-sm font-medium mb-6" style={{ color: "#6B6580" }}>
              Founder, NovaPath · Technology Innovation Lead, Navigator Schools
            </p>
            
            <div className="space-y-4 mb-8" style={{ color: "#B4B0C4" }}>
              <p>
                Dan doesn't advise from the outside — he cobuilds. As Technology Innovation Lead at Navigator Schools, he works inside real classrooms every week, building AI tools alongside teachers and watching what actually works.
              </p>
              <p>
                He's built and deployed 8 AI-powered tools across 4 school campuses serving 1,900+ students. He was selected for California's SB 1288 AI in Education Workgroup and featured in Education Week for his approach to teacher-led AI design.
              </p>
              <p>
                When districts work with NovaPath, they're not getting a slide deck. They're getting someone who's done this — in hallways, in classrooms, at the board table.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: "#241E30", color: "#6B6580" }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhyCobuilding() {
  const reducedMotion = useReducedMotion();

  const columns = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#7C5CFF" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      title: "Solutions That Actually Get Used",
      body: "When teachers help build the tool, they actually use it. No shelfware. No 'we bought this but nobody logs in.' The people doing the work define how the work gets done."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#7C5CFF" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
      title: "Real AI Literacy, Not Slideware",
      body: "Your team doesn't learn AI by watching a presentation. They learn by building — choosing what data is safe to use, defining what 'good enough' looks like, and testing with real students."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#7C5CFF" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "You Own Everything We Build",
      body: "No subscriptions. No vendor lock-in. No 'call us if it breaks.' Every tool, workflow, and resource we cobuild together belongs to your district. When we leave, the capability stays."
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#F5F3FF" }}>
            Why Districts Choose Cobuilding Over Buying
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "#B4B0C4" }}>
            Most AI implementations fail because they're built for a demo, not a classroom. Cobuilding changes that.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {columns.map((col, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
              data-testid={`card-why-${index}`}
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(124, 92, 255, 0.1)" }}>
                {col.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: "#F5F3FF" }}>{col.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#B4B0C4" }}>{col.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CobuildingProcess() {
  const reducedMotion = useReducedMotion();

  const steps = [
    {
      num: 1,
      title: "Identify the Pain Point",
      body: "We start with the workflow that's burning the most time. Grading? Coaching documentation? Parent communication? Attendance tracking? We find the 'this is ridiculous' moment and work backwards from there."
    },
    {
      num: 2,
      title: "Design the Solution Together",
      body: "Your team defines what the tool needs to do — not in theory, but in the real constraints of their day. How much time do they have? What reading level are students at? What data is safe to use? Teachers set the rules."
    },
    {
      num: 3,
      title: "Cobuild with AI",
      body: "Using AI coding agents and rapid prototyping, we build a working tool in days. Not a mockup. Not a wireframe. A real, testable application your team can use that week."
    },
    {
      num: 4,
      title: "Deploy and Keep Building",
      body: "The tool goes live in real classrooms. We measure what works, what doesn't, and iterate. The tool evolves with your practice — because it was never meant to be 'finished.'"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#F5F3FF" }}>
            How a Cobuilding Engagement Works
          </h2>
          <p style={{ color: "#B4B0C4" }}>
            Four phases. Weeks, not months. Real tools in real classrooms.
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
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-px" style={{ backgroundColor: "#2A2435" }} />
              )}
              <div className="relative p-6 rounded-xl" style={{ backgroundColor: "#1A1425", border: "1px solid #2A2435" }}>
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-4"
                  style={{ backgroundColor: "#7C5CFF", color: "#F5F3FF" }}
                >
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "#F5F3FF" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#B4B0C4" }}>{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeBuilt() {
  const reducedMotion = useReducedMotion();

  const solutions = [
    {
      title: "NaviGrade Autograder",
      body: "Students photograph or audio-record their work → AI scores against the rubric → instant feedback via QR code → students revise on the spot. 75% of students voluntarily revised their work without being asked."
    },
    {
      title: "Coaching Dashboard",
      body: "Classroom observations flow into AI-powered synthesis → specific action steps generated → fidelity tracking over time. A coaching system, not coaching vibes."
    },
    {
      title: "Restorative Practice Generator",
      body: "Incident description in → SEL-aligned reflection prompts + parent communication letter out. A 45-minute process reduced to 3 minutes. Featured in Education Week."
    },
    {
      title: "Mixteco Translator Plus",
      body: "A custom AI translator supporting Mixtec, Spanish, and English with image recognition. Because language access isn't a feature request — it's a foundation."
    },
    {
      title: "ELD R.I.S.E. (K-2)",
      body: "A 15-minute ELD workflow aligned to California ELD standards, designed for iPad-based delivery in early elementary classrooms."
    },
    {
      title: "Attendance Automation",
      body: "Reducing the process-layer busywork around attendance tracking so teachers can spend the most important 20 minutes of the day on what matters — students."
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#F5F3FF" }}>
            Real Tools Built by Real Educators
          </h2>
          <p style={{ color: "#B4B0C4" }}>
            These aren't hypotheticals. These are applications educators have cobuilt to solve their actual challenges.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl"
              style={{ backgroundColor: "#0F0A1A", border: "1px solid #2A2435", borderTop: "3px solid #7C5CFF" }}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.05 }}
              data-testid={`card-solution-${index}`}
            >
              <h3 className="text-lg font-semibold mb-3" style={{ color: "#F5F3FF" }}>{solution.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#B4B0C4" }}>{solution.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatDistrictsGet() {
  const reducedMotion = useReducedMotion();

  const included = [
    "On-site or virtual cobuilding sessions with your team",
    "Working AI tools deployed in your classrooms within weeks",
    "AI readiness assessment and gap analysis",
    "Data privacy and governance framework",
    "Teacher training embedded in the build process (not bolted on after)",
    "Full ownership of everything we create together"
  ];

  const excluded = [
    "A 60-page strategy document nobody reads",
    "Vendor demos dressed up as professional development",
    "Tools that require a PhD to configure",
    "Recurring SaaS fees for something your district paid to build",
    "AI hype without implementation plans"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#F5F3FF" }}>
            What a NovaPath Engagement Looks Like
          </h2>
          <p style={{ color: "#B4B0C4" }}>
            Every district is different. Here's what they all have in common.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="p-8 rounded-xl"
            style={{ backgroundColor: "#1A1425", border: "1px solid #2A2435" }}
            initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-6" style={{ color: "#F5F3FF" }}>What's Included</h3>
            <ul className="space-y-4">
              {included.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span style={{ color: "#4ADE80" }}>✓</span>
                  <span style={{ color: "#B4B0C4" }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            className="p-8 rounded-xl"
            style={{ backgroundColor: "#1A1425", border: "1px solid #2A2435" }}
            initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-6" style={{ color: "#F5F3FF" }}>What You Won't Get</h3>
            <ul className="space-y-4">
              {excluded.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span style={{ color: "#6B6580" }}>✗</span>
                  <span style={{ color: "#6B6580", textDecoration: "line-through" }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="py-20 px-6" style={{ backgroundColor: "#1A1425" }}>
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
          style={{ borderLeft: "4px solid #7C5CFF" }}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-6" style={{ color: "#F5F3FF" }}>
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
          {[1, 2].map((_, index) => (
            <div key={index} className="p-6 rounded-xl text-center" style={{ backgroundColor: "#0F0A1A", border: "1px solid #2A2435" }}>
              <p className="text-sm" style={{ color: "#6B6580" }}>More testimonials coming soon</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ConsultationForm() {
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
        description: "We'll be in touch within 24 hours to schedule your consultation."
      });
      setFormData({ name: "", role: "", district: "", email: "", challenge: "" });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again or email hello@explorenovapath.com directly."
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <section className="py-20 px-6 relative" style={{ background: "linear-gradient(180deg, #1A1425 0%, #0F0A1A 100%)" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_600px_at_50%_30%,rgba(124,92,255,0.1),transparent_60%)]" />
      
      <div className="max-w-2xl mx-auto relative">
        <motion.div
          className="text-center mb-12"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#F5F3FF" }}>
            Let's Talk About Your District
          </h2>
          <p style={{ color: "#B4B0C4" }}>
            Schedule a free 30-minute consultation. We'll identify your biggest pain point and map out what a cobuilding engagement could look like for your team.
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
              <input
                type="text"
                required
                placeholder="e.g., Superintendent, Director of Curriculum"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-600"
                style={{ backgroundColor: "#241E30", border: "1px solid #2A2435", color: "#F5F3FF" }}
                data-testid="input-role"
              />
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
          
          <p className="text-center text-sm" style={{ color: "#6B6580" }}>
            No pitch. No pressure. Just a conversation about what's possible for your district.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

function ConsultingFooter() {
  return (
    <footer className="py-8 px-6" style={{ backgroundColor: "#0A0612", borderTop: "1px solid #2A2435" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: "#6B6580" }}>© 2026 NovaPath</p>
        <div className="flex items-center gap-6">
          <a
            href="https://smarterbydesign.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:opacity-80"
            style={{ color: "#6B6580" }}
          >
            Newsletter
          </a>
          <a
            href="https://www.linkedin.com/in/danwhitlock/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:opacity-80"
            style={{ color: "#6B6580" }}
          >
            LinkedIn
          </a>
          <a
            href="mailto:hello@explorenovapath.com"
            className="text-sm transition-colors hover:opacity-80"
            style={{ color: "#6B6580" }}
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
