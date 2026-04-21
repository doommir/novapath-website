import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export default function ApproachPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">Our approach</p>
        <h1 className="font-serif text-5xl md:text-6xl font-medium leading-[1.05] max-w-3xl">
          We don't consult.<br />We cobuild.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
          Most consultants hand you a deck. We hand you working code, built next to your team, in weeks.
        </p>
      </section>

      {/* What cobuilding means */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-10">What cobuilding means</p>
          <div className="space-y-10">
            {[
              {
                title: "You're in the room the whole time.",
                body: "Not brought in for a final demo. Not handed a finished product to adopt. You're in every design conversation, every decision point. Your team shapes the tool because they're the ones using it.",
              },
              {
                title: "Your team learns by building, not by watching.",
                body: "There's a meaningful difference between watching someone build an AI tool and building one with them. We choose the latter. You walk away with skill, not just software.",
              },
              {
                title: "Everything we ship is yours.",
                body: "Your stack, your repo, your call. No licensing. No dependency on us for updates. If you never call us again after the handoff, that's fine — that means we did it right.",
              },
            ].map((item, i) => (
              <div key={i}>
                <h3 className="font-serif text-xl font-medium text-foreground mb-2">{item.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we don't do */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-10">What we don't do</p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mb-10">
            {[
              "Retainers",
              "180-page reports",
              "Discovery phases that never end",
              "Pilots without a path to scale",
              "AI tools handed to staff to adopt",
              "Six-month engagements to diagnose a two-week problem",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="font-mono text-xs text-muted-foreground mt-0.5 flex-shrink-0">—</span>
                <span className="text-base text-foreground">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-base text-muted-foreground max-w-xl leading-relaxed italic font-serif text-lg">
            "Our expertise isn't development. Our expertise is sitting next to people who know their operation better than we do."
          </p>
        </div>
      </section>

      {/* Sprint defined */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">Sprint, defined</p>
          <h2 className="font-serif text-3xl font-medium mb-6 leading-snug text-foreground">
            A two-week timebox with a Friday demo at the end.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Day 1 is a working setup. Day 5 is a demo. Day 10 is a handoff. If it takes longer than two sprints, we scoped it wrong.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            We use sprints because timebox pressure produces clarity. Scoping a problem for two weeks is harder than scoping it for six months — and more honest about what can actually be built.
          </p>
          <div className="mt-8">
            <Link
              href="/sprints"
              className="font-mono text-[11px] uppercase tracking-widest text-primary inline-flex items-center gap-2 hover:gap-3 transition-all no-underline"
            >
              See sprint pricing <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </section>

      {/* Handoff defined */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">Handoff, defined</p>
          <h2 className="font-serif text-3xl font-medium mb-6 leading-snug text-foreground">
            The thing most consultants don't actually do.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            When we ship, we hand off: your code, documented, with a training session for your team. Not a Loom video. A real conversation where we walk through what we built, why we built it, and what you'd need to change it.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            You don't need us for maintenance. That's the point.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl font-medium text-foreground">Want to see it in practice?</h2>
            <p className="text-base text-muted-foreground mt-2">Pick the track that fits your context.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/k12"
              className="font-mono text-[11px] uppercase tracking-widest px-5 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity no-underline"
              data-testid="link-k12-cta"
            >
              K–12 track
            </Link>
            <Link
              href="/sprints"
              className="font-mono text-[11px] uppercase tracking-widest px-5 py-3 border border-border text-foreground rounded-md hover:border-primary hover:text-primary transition-colors no-underline"
              data-testid="link-sprints-cta"
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
