import { Card, CardContent } from "@/components/ui/card";
import { User, Sparkles, UserCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { InteractiveDemo } from "@/components/InteractiveDemo";

const steps = [
  {
    icon: User,
    title: "Human Inquiry",
    description: "A teacher initiates a workflow — attendance, check-in, alert. Every automation begins with a person.",
  },
  {
    icon: Sparkles,
    title: "AI Insight",
    description: "NovaPath drafts or analyzes, surfacing next steps. The system works in the background, but never decides alone.",
  },
  {
    icon: UserCheck,
    title: "Human Reflection",
    description: "Staff review, adjust, and approve. No automation is final until a human approves it.",
  },
];

export default function HowItWorks() {
  const reducedMotion = useReducedMotion();
  
  const container = {
    hidden: { opacity: reducedMotion ? 1 : 0 },
    show: {
      opacity: 1,
      transition: reducedMotion ? { duration: 0 } : {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: reducedMotion ? { duration: 0 } : undefined
    }
  };
  
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div 
          className="text-center mb-12"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4" data-testid="text-section-label">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-how-it-works-title">
            How Human Moments Become Intelligent Workflows
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-how-it-works-subtitle">
            Experience how NovaPath works. Click below to run an interactive demo.
          </p>
        </motion.div>

        {/* Interactive Demo */}
        <motion.div
          className="mb-16"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.2 }}
        >
          <InteractiveDemo />
        </motion.div>

        {/* Process Steps */}
        <motion.div 
          className="grid gap-8 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={index} variants={item}>
                <Card data-testid={`card-step-${index + 1}`} className="h-full hover-elevate bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="pt-6">
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-card border border-border/30">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground" data-testid={`text-step-title-${index + 1}`}>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`text-step-description-${index + 1}`}>
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
