import { useRef } from "react";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import SocialProof from "@/components/SocialProof";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const urlParams = new URLSearchParams(window.location.search);
  const prefillEmail = urlParams.get("demo") === "true" ? "test+video@novapath.ai" : undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <Hero onCtaClick={scrollToForm} />
      <HowItWorks />
      
      <section className="py-16 md:py-24 bg-background" ref={formRef}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4" data-testid="text-waitlist-label">
              Get Early Access
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" data-testid="text-waitlist-title">
              Join the waitlist
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-waitlist-description">
              Be among the first to experience AI-powered school operations. We'll keep you updated on our progress.
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
