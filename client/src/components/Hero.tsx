import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@assets/generated_images/NovaPath_dashboard_interface_mockup_4885786c.png";

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(271,91%,65%)] via-[hsl(262,90%,50%)] to-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(262,90%,66%,0.3),transparent_50%)] animate-pulse-slow" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(188,94%,43%,0.15),transparent_50%)]" />
      
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white" data-testid="text-hero-headline">
              AI that runs your school — not just "helps" it.
            </h1>
            <p className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed" data-testid="text-hero-subheadline">
              NovaPath automates reports, attendance, and insights so your team can focus on teaching — not toggling tabs.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 w-full md:w-auto shadow-[0_0_20px_hsl(262,90%,66%,0.3)] hover:shadow-[0_0_30px_hsl(262,90%,66%,0.5)] transition-shadow duration-300" 
              onClick={onCtaClick}
              data-testid="button-join-waitlist"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-foreground/70 mt-4 flex items-center justify-center md:justify-start gap-1" data-testid="text-pilot-trust">
              <span className="text-accent">⚡</span> Trusted by early charter and district pilots.
            </p>
          </motion.div>
          <motion.div 
            className="order-first md:order-last group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
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
  );
}
