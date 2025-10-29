import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const reducedMotion = useReducedMotion();
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-background to-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_1600px_1200px_at_50%_40%,hsl(188,94%,55%,0.35),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_1400px_1000px_at_70%_60%,hsl(300,75%,60%,0.32),transparent_50%)] animate-pulse-slow" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_1300px_900px_at_30%_50%,hsl(262,90%,75%,0.28),transparent_50%)]" />
      
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <motion.div 
            className="text-center md:text-left"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white" data-testid="text-hero-headline">
              AI that runs your school — not just "helps" it.
            </h1>
            <p className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed" data-testid="text-hero-subheadline">
              NovaPath automates reports, attendance, and insights so your team can focus on teaching — not toggling tabs.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 w-full md:w-auto shadow-[0_0_40px_-5px_hsl(262,90%,66%,0.4)] hover:shadow-[0_0_60px_-5px_hsl(262,90%,66%,0.6)] transition-shadow duration-300" 
              onClick={onCtaClick}
              data-testid="button-join-waitlist"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-foreground/70 mt-4 flex items-center justify-center md:justify-start gap-1" data-testid="text-pilot-trust">
              <Zap className="h-3.5 w-3.5 text-accent" /> Trusted by early charter and district pilots.
            </p>
          </motion.div>
          <motion.div 
            className="order-first md:order-last group"
            initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
            whileHover={reducedMotion ? {} : { y: -8, scale: 1.02 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <video 
                src="/demo-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="relative rounded-xl shadow-2xl w-full"
                data-testid="video-hero-demo"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
