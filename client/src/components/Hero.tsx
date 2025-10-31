import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import demoVideo from "@assets/202510291134 (1)_1761779868970.mp4";

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
              Human-Centered AI for Schools That Still Believe in Teachers.
            </h1>
            <p className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed" data-testid="text-hero-subheadline">
              Human moments drive NovaPath's automations — turning teacher insights into transparent, ethical workflows that save time without losing trust.
            </p>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <Button 
                size="lg" 
                className="text-lg px-8 shadow-[0_0_40px_-5px_hsl(262,90%,66%,0.4)] hover:shadow-[0_0_60px_-5px_hsl(262,90%,66%,0.6)] transition-shadow duration-300" 
                onClick={onCtaClick}
                data-testid="button-join-waitlist"
              >
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 bg-background/20 backdrop-blur-sm border-border/50 hover:bg-background/30" 
                onClick={() => {
                  document.querySelector('[data-testid="text-section-label"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                data-testid="button-see-how-it-works"
              >
                See How It Works
              </Button>
            </div>
            <p className="text-sm text-foreground/70 mt-4 flex items-center justify-center md:justify-start gap-1" data-testid="text-pilot-trust">
              <Zap className="h-3.5 w-3.5 text-accent" /> Built with educators, for educators.
            </p>
          </motion.div>
          <div className="order-first md:order-last">
            <motion.div 
              className="group"
              initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
              whileHover={reducedMotion ? {} : { y: -8, scale: 1.02 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                <video 
                  src={demoVideo}
                  controls
                  loop
                  playsInline
                  preload="auto"
                  className="relative rounded-xl shadow-2xl w-full border-4 border-border"
                  data-testid="video-hero-demo"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
