import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">Contact</p>
        <h1 className="font-serif text-5xl md:text-6xl font-medium leading-[1.05] max-w-2xl">
          Start a conversation.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
          No intake form. No automated reply. Two email addresses and a calendar link.
        </p>
      </section>

      {/* Contact options */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20 grid md:grid-cols-2 gap-12 md:gap-0">
          <div className="md:pr-16">
            <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-5">K–12 Track</p>
            <h2 className="font-serif text-2xl font-medium text-foreground mb-3">Dan Whitlock</h2>
            <p className="text-base text-muted-foreground mb-6 leading-relaxed">
              District readiness, pilot design, policy review, teacher-in-the-loop builds. If it's a K–12 context, start here.
            </p>
            <a
              href="mailto:Dan@explorenovapath.com"
              className="font-mono text-[11px] uppercase tracking-widest text-primary inline-flex items-center gap-2 hover:gap-3 transition-all"
              data-testid="link-email-dan"
            >
              Dan@explorenovapath.com <ArrowRight size={11} />
            </a>
          </div>

          <div className="md:border-l md:border-border md:pl-16">
            <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-5">Sprint Track</p>
            <h2 className="font-serif text-2xl font-medium text-foreground mb-3">Matt Varner</h2>
            <p className="text-base text-muted-foreground mb-6 leading-relaxed">
              SMB software builds, sprint scoping, half-finished products. If you have a build problem, start here.
            </p>
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              [CONFIRM EMAIL WITH MATT]
            </span>
          </div>
        </div>
      </section>

      {/* Calendly */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">Prefer a call?</p>
          <h2 className="font-serif text-3xl font-medium text-foreground mb-4 leading-snug">
            Book 30 minutes. No prep required.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-8">
            We use this for initial conversations — scoping calls, curiosity calls, "I'm not sure if we're the right fit" calls. No pitch. No slide deck. Just a real conversation.
          </p>
          <a
            href="https://calendly.com/novapath711/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-5 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            data-testid="button-calendly"
          >
            Book a 30-minute call <ArrowRight size={11} />
          </a>
        </div>
      </section>

      {/* What to include */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">What to include</p>
          <h2 className="font-serif text-2xl font-medium text-foreground mb-8 leading-snug">
            When you reach out, three things help us respond well.
          </h2>
          <div className="space-y-6">
            {[
              {
                num: "01",
                title: "What problem you're trying to solve",
                desc: "Not the tool you want — the problem underneath it. The more specific, the better.",
              },
              {
                num: "02",
                title: "What you've already tried",
                desc: "This tells us what didn't work and why. We won't suggest the same thing.",
              },
              {
                num: "03",
                title: "Your timeline",
                desc: "Is this urgent? Is it exploratory? Are you trying to hit a board meeting or a grant deadline? Timeline shapes everything.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <span className="font-mono text-[11px] text-primary mt-1 flex-shrink-0">{item.num}</span>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not sure which track? */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl font-medium text-foreground">Not sure which track fits?</h2>
            <p className="text-base text-muted-foreground mt-2">Read about the two tracks first.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/k12"
              className="font-mono text-[11px] uppercase tracking-widest px-5 py-3 border border-border text-foreground rounded-md hover:border-primary hover:text-primary transition-colors no-underline"
              data-testid="link-k12-contact"
            >
              K–12 track
            </Link>
            <Link
              href="/sprints"
              className="font-mono text-[11px] uppercase tracking-widest px-5 py-3 border border-border text-foreground rounded-md hover:border-primary hover:text-primary transition-colors no-underline"
              data-testid="link-sprints-contact"
            >
              Sprint track
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
