import { Card, CardContent } from "@/components/ui/card";
import { Link2, Zap, BarChart3 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    icon: Link2,
    title: "Plug in what you already use.",
    description: "NovaPath syncs instantly with Google, Clever, and your SIS/LMS.",
  },
  {
    icon: Zap,
    title: "Let AI handle the boring parts.",
    description: "Attendance follow-ups, grading workflows, parent emails — all on autopilot.",
  },
  {
    icon: BarChart3,
    title: "See what's working, live.",
    description: "Dashboards reveal what's improving and where to focus next.",
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-how-it-works-title">
            Three steps to transform your school operations
          </h2>
        </motion.div>
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
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg">
                      <Icon className="h-6 w-6" />
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
