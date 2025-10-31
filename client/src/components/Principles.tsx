import { Card, CardContent } from "@/components/ui/card";
import { Eye, Shield, FileText, Globe, GraduationCap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const principles = [
  {
    icon: Eye,
    title: "Human Oversight",
    description: "Every workflow requires educator review and sign-off.",
  },
  {
    icon: Shield,
    title: "Privacy by Design",
    description: "Student data never trains external models; retention <30 days.",
  },
  {
    icon: FileText,
    title: "Transparency",
    description: "Every automation has a traceable log and visible rationale.",
  },
  {
    icon: Globe,
    title: "Equity & Access",
    description: "Multilingual, low-bandwidth modes built in.",
  },
  {
    icon: GraduationCap,
    title: "Professional Empowerment",
    description: "Training and reflection tools built into the interface.",
  },
];

export default function Principles() {
  const reducedMotion = useReducedMotion();
  
  const container = {
    hidden: { opacity: reducedMotion ? 1 : 0 },
    show: {
      opacity: 1,
      transition: reducedMotion ? { duration: 0 } : {
        staggerChildren: 0.15
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
    <section className="py-16 md:py-24 bg-card/30">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div 
          className="text-center mb-12"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4" data-testid="text-principles-label">
            Our Commitment
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-principles-title">
            Built on Human-Centered AI Principles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-principles-description">
            Every feature we build respects educators, protects students, and upholds the highest ethical standards.
          </p>
        </motion.div>
        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <motion.div key={index} variants={item}>
                <Card data-testid={`card-principle-${index + 1}`} className="h-full hover-elevate bg-card border-border/50">
                  <CardContent className="pt-6">
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid={`text-principle-title-${index + 1}`}>
                      {principle.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`text-principle-description-${index + 1}`}>
                      {principle.description}
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
