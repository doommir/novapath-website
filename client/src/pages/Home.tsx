import { useRef } from "react";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Principles from "@/components/Principles";
import SocialProof from "@/components/SocialProof";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { motion, useReducedMotion } from "framer-motion";
import heroImage from "@assets/generated_images/NovaPath_dashboard_interface_mockup_4885786c.png";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Brain, Shield, ArrowRight, Building2, CheckCircle2 } from "lucide-react";

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

      {/* System A + System B Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-black/50">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            className="text-center mb-16"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-4">
              Preventative Control Infrastructure
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" data-testid="text-system-ab-title">
              System A + System B
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Human + AI Collaborative Workflow at Scale
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
            >
              <Card className="h-full bg-card/50 border-teal-500/30">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-teal-500/20 flex items-center justify-center">
                      <Activity className="h-6 w-6 text-teal-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">System A</h3>
                  </div>
                  <p className="text-lg text-teal-400 font-medium mb-4">Measurement & Action</p>
                  <p className="text-foreground/80 mb-6">
                    The Coaching Operating System and Dashboards. Lives inside schools, used daily by all instructional staff.
                  </p>
                  <ul className="space-y-3 text-foreground/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
                      <span>Captures observations, scores, workflows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
                      <span>Executes human decisions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
                      <span>Live in 8 schools across 3 organizations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full bg-card/50 border-violet-500/30">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-violet-500/20 flex items-center justify-center">
                      <Brain className="h-6 w-6 text-violet-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">System B</h3>
                  </div>
                  <p className="text-lg text-violet-400 font-medium mb-4">Intelligence & Prediction</p>
                  <p className="text-foreground/80 mb-6">
                    Learns from System A's signals. Answers: "What happens next — and what single move prevents failure?"
                  </p>
                  <ul className="space-y-3 text-foreground/70">
                    <li className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-violet-400 mt-0.5 flex-shrink-0" />
                      <span>No teacher UI, no raw text, no PII</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-violet-400 mt-0.5 flex-shrink-0" />
                      <span>Models trajectory and inaction risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-violet-400 mt-0.5 flex-shrink-0" />
                      <span>Computes next-best move</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="text-center mb-16"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-4 text-foreground/60 text-lg">
              <span>Measure</span>
              <ArrowRight className="h-5 w-5 text-teal-400" />
              <span>Predict</span>
              <ArrowRight className="h-5 w-5 text-teal-400" />
              <span>Suggest</span>
              <ArrowRight className="h-5 w-5 text-teal-400" />
              <span>Act</span>
              <ArrowRight className="h-5 w-5 text-teal-400" />
              <span>Learn</span>
            </div>
            <p className="text-foreground/50 mt-4">No new tools. No extra dashboards.</p>
          </motion.div>

          <motion.div
            className="bg-card/30 border border-border/50 rounded-xl p-8 mb-16"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4 text-center">What Coaches See</h3>
            <div className="bg-black/50 rounded-lg p-6 max-w-md mx-auto border border-teal-500/20">
              <p className="text-sm text-foreground/50 mb-2">Suggested Next Move</p>
              <p className="text-white font-medium mb-3">Schedule one follow-up within 10 days</p>
              <p className="text-sm text-teal-400">Impact: ~40% reduction in regression risk</p>
            </div>
            <p className="text-center text-foreground/60 mt-6">System B suggests. Humans decide.</p>
          </motion.div>

          <motion.div
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-8 text-center">
              Currently Deployed In
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "TEAM Charter Schools", location: "Newark, NJ" },
                { name: "Navigator Schools", location: "California" },
                { name: "Clovis Global Academy", location: "Clovis, CA" }
              ].map((org, index) => (
                <motion.div
                  key={org.name}
                  initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-card/50 border-border/50 hover-elevate" data-testid={`org-card-${index}`}>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-4">
                        <Building2 className="h-6 w-6 text-teal-400" />
                      </div>
                      <h4 className="font-semibold text-white mb-1">{org.name}</h4>
                      <p className="text-sm text-foreground/60">{org.location}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <p className="text-2xl font-semibold text-white mb-2">
              System A measures and executes.
            </p>
            <p className="text-2xl font-semibold text-teal-400 mb-4">
              System B predicts and guides.
            </p>
            <p className="text-lg text-foreground/70">
              Together, they prevent failure instead of explaining it.
            </p>
          </motion.div>
        </div>
      </section>

      <SocialProof />
      <Footer />
    </div>
  );
}
