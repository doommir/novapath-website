import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/NovaPath_dashboard_interface_mockup_4885786c.png";

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-chart-2/5 to-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-hero-headline">
              Run AI-First Schools, Without the Chaos.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-hero-subheadline">
              NovaPath gives K-12 teams automated workflows, data insights, and plug-and-play tools—no extra headcount.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8" 
              onClick={onCtaClick}
              data-testid="button-join-waitlist"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4" data-testid="text-prompt-offer">
              Get the exact prompt + code by joining the email list.
            </p>
          </div>
          <div className="order-first md:order-last">
            <img 
              src={heroImage} 
              alt="NovaPath dashboard showing automated workflows and data insights" 
              className="rounded-xl shadow-2xl w-full"
              data-testid="img-hero-dashboard"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
