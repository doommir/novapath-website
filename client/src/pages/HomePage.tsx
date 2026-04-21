import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">
          K–12 Districts + Founders — Murrieta, CA & Remote
        </p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] text-foreground max-w-4xl">
          We cobuild AI with<br className="hidden sm:block" /> the people who'll use it.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
          Two tracks, one firm. We embed with K–12 district leaders and founders with half-built products to ship working AI tools. No decks. No retainers. A working prototype and a real handoff.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="https://calendly.com/novapath711/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-mono text-[11px] uppercase tracking-widest px-5 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            data-testid="button-book-call-hero"
          >
            K–12 — Book a call
          </a>
          <Link
            href="/sprints"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-5 py-3 border border-border text-foreground rounded-md hover:border-primary hover:text-primary transition-colors no-underline"
            data-testid="link-sprints-hero"
          >
            Start a sprint <ArrowRight size={11} />
          </Link>
        </div>
      </section>

      {/* Two tracks */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20 grid md:grid-cols-2 gap-12 md:gap-0">
          <div className="md:pr-16">
            <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-5">K–12 Track — Dan Whitlock</p>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-4 leading-snug">
              Your district has the domain expertise. We have the build.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Teacher-in-the-loop pilot design. Procurement and policy review. A working tool your staff helped build — not one handed to them to adopt.
            </p>
            <Link
              href="/k12"
              className="font-mono text-[11px] uppercase tracking-widest text-primary inline-flex items-center gap-2 hover:gap-3 transition-all no-underline"
              data-testid="link-k12-track"
            >
              K–12 track <ArrowRight size={11} />
            </Link>
          </div>
          <div className="md:border-l md:border-border md:pl-16">
            <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-5">Sprint Track — Matt Varner</p>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-4 leading-snug">
              Your product is 60% done. Let's finish it.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Two-week timebox. Your stack, your repo, your call. Day 1 is a working setup. Day 10 is a handoff. We don't disappear after we ship.
            </p>
            <Link
              href="/sprints"
              className="font-mono text-[11px] uppercase tracking-widest text-primary inline-flex items-center gap-2 hover:gap-3 transition-all no-underline"
              data-testid="link-sprint-track"
            >
              Sprint track <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-10">How we work</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-5 max-w-3xl">
            {[
              { text: "We don't take retainers.", accent: false },
              { text: "We don't write reports.", accent: false },
              { text: "We ship working prototypes.", accent: false },
              { text: "We hand off the code.", accent: false },
              { text: "Your team runs it after we're gone.", accent: false },
              { text: "That's the point.", accent: true },
            ].map((item, i) => (
              <p
                key={i}
                className={`font-serif text-xl font-medium leading-snug ${
                  item.accent ? "text-primary" : "text-foreground"
                }`}
              >
                {item.text}
              </p>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/approach"
              className="font-mono text-[11px] uppercase tracking-widest text-primary inline-flex items-center gap-2 hover:gap-3 transition-all no-underline"
              data-testid="link-approach"
            >
              Read our approach <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </section>

      {/* Pull quote placeholder */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20">
          <blockquote className="max-w-2xl border-l-2 border-primary pl-8">
            <p className="font-serif text-2xl md:text-3xl font-medium text-muted-foreground italic leading-relaxed">
              [PULL QUOTE — COLLECT FROM CLIENT]
            </p>
            <footer className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              — [Client name, role, organization]
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Work teaser */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">Recent work</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground leading-snug">What we've shipped.</h2>
            <p className="text-base text-muted-foreground mt-3 max-w-md">
              Case studies in progress. We take permission seriously — we don't publish without it.
            </p>
          </div>
          <Link
            href="/work"
            className="font-mono text-[11px] uppercase tracking-widest text-primary inline-flex items-center gap-2 hover:gap-3 transition-all flex-shrink-0 no-underline"
            data-testid="link-work"
          >
            See the work <ArrowRight size={11} />
          </Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">Get in touch</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-3">Ready to start?</h2>
          <p className="text-base text-muted-foreground mb-8 max-w-sm leading-relaxed">
            No intake form. No automated reply. Just a real conversation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-5 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity no-underline"
            data-testid="link-contact-cta"
          >
            Contact us <ArrowRight size={11} />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
