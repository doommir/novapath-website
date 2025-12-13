import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Brain, Shield, ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";

export default function PreventativeControl() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col bg-background">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" data-testid="text-system-ab-title">
              System A + System B
            </h1>
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
                    <h2 className="text-2xl font-bold text-white">System A</h2>
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
                    <h2 className="text-2xl font-bold text-white">System B</h2>
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
                { name: "TEAM Charter Schools", location: "California" },
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

      <Footer />
    </div>
  );
}
