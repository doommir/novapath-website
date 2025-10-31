import { useRef } from "react";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Principles from "@/components/Principles";
import SocialProof from "@/components/SocialProof";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { motion, useReducedMotion } from "framer-motion";
import heroImage from "@assets/generated_images/NovaPath_dashboard_interface_mockup_4885786c.png";

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const urlParams = new URLSearchParams(window.location.search);
  const prefillEmail = urlParams.get("demo") === "true" ? "test+video@novapath.ai" : undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <Hero onCtaClick={scrollToForm} />
      <HowItWorks />
      <Principles />
      
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <motion.div
              initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4" data-testid="text-dashboard-label">
                From Human Moments to Measurable Impact
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" data-testid="text-dashboard-title">
                Automation you can audit. Decisions you can trust.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-dashboard-description">
                See every workflow, review every decision, and track the impact of your team's human-centered approach — all in one transparent dashboard.
              </p>
            </motion.div>
            
            <motion.div 
              className="group"
              initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
              whileHover={reducedMotion ? {} : { y: -8, scale: 1.02 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                <img 
                  src={heroImage} 
                  alt="NovaPath dashboard showing automated workflows and data insights" 
                  className="relative rounded-xl shadow-2xl w-full"
                  data-testid="img-hero-dashboard"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-background" ref={formRef}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4" data-testid="text-waitlist-label">
              Get Early Access
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" data-testid="text-waitlist-title">
              Join the schools shaping Human-Centered AI
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-waitlist-description">
              Be part of a pilot program building AI that respects educators and empowers students. We'll keep you updated every step of the way.
            </p>
          </div>
          <LeadForm prefillEmail={prefillEmail} />
        </div>
      </section>

      <SocialProof />
      <Footer />
    </div>
  );
}
