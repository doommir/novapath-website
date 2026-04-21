import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

const services = [
  { name: "Scoping call", duration: "60 min", price: "Free", note: "Problem framing, no pitch." },
  { name: "Diagnostic", duration: "1 week", price: "[PRICE PENDING]", note: "Deep assessment of what's broken and what to build." },
  { name: "Sprint build", duration: "2 weeks", price: "$1,500–$2,500", note: "Working prototype, Friday demo, full handoff." },
  { name: "Extended build", duration: "4–8 weeks", price: "Custom", note: "For larger scopes. Same sprint structure, more runway." },
  { name: "Office hours", duration: "4 weeks post-ship", price: "Included", note: "We don't disappear after the handoff." },
];

const sprintWeek = [
  { day: "Day 1", label: "Kickoff", desc: "Problem framing, stack setup, first commit. You're in the room." },
  { day: "Day 2–3", label: "Core build", desc: "Working skeleton. We build the thing that has to work." },
  { day: "Day 4", label: "Internal review", desc: "What's working, what's cut. You weigh in before we go further." },
  { day: "Day 5", label: "Demo", desc: "You see a working prototype. Not a mockup. A working prototype." },
  { day: "Day 6–8", label: "Polish", desc: "Edge cases, UX, integration with your existing stack." },
  { day: "Day 9", label: "Staging review", desc: "You test it yourself. Real data, real usage." },
  { day: "Day 10", label: "Handoff", desc: "Code + docs + training call. Your stack, your repo, your call." },
];

export default function SprintsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">Sprint Track — Matt Varner</p>
        <h1 className="font-serif text-5xl md:text-6xl font-medium leading-[1.05] max-w-3xl">
          Two weeks.<br />Your stack.<br />Friday demo. Done.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
          SMB software builds for founders, operators, and teams with a problem that needs solving — not a six-month engagement and a kickoff deck.
        </p>
        <div className="mt-8">
          <a
            href="https://calendly.com/novapath711/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-5 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            data-testid="button-scoping-call"
          >
            Book a scoping call — it's free <ArrowRight size={11} />
          </a>
        </div>
      </section>

      {/* Pricing table */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-10">What we offer</p>
          <div className="border border-border rounded-md overflow-hidden">
            <table className="w-full text-sm" data-testid="table-services">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="text-left font-mono text-[11px] uppercase tracking-widest text-muted-foreground px-6 py-4">Service</th>
                  <th className="text-left font-mono text-[11px] uppercase tracking-widest text-muted-foreground px-6 py-4 hidden sm:table-cell">Duration</th>
                  <th className="text-left font-mono text-[11px] uppercase tracking-widest text-muted-foreground px-6 py-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s, i) => (
                  <tr
                    key={i}
                    className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-card/50"}`}
                  >
                    <td className="px-6 py-5">
                      <div className="font-medium text-foreground">{s.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 sm:hidden">{s.duration}</div>
                      <div className="text-xs text-muted-foreground mt-1">{s.note}</div>
                    </td>
                    <td className="px-6 py-5 text-muted-foreground hidden sm:table-cell">{s.duration}</td>
                    <td className="px-6 py-5">
                      <span className={`font-mono text-xs font-medium ${s.price === "Free" || s.price === "Included" ? "text-primary" : "text-foreground"}`}>
                        {s.price}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sprint week breakdown */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">What a sprint week looks like</p>
          <p className="text-base text-muted-foreground max-w-xl mb-10">
            This is a two-week engagement. Here's how it actually runs.
          </p>
          <div className="space-y-0 border border-border rounded-md overflow-hidden">
            {sprintWeek.map((item, i) => (
              <div
                key={i}
                className={`flex gap-6 px-6 py-5 border-b border-border last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-card/50"}`}
              >
                <div className="flex-shrink-0 w-20">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary">{item.day}</span>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-1">{item.label}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case study placeholder */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-8">From the work</p>
          <div className="border border-border rounded-md p-8 bg-card/30">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
              [CASE STUDY PENDING — CrewFit / Concord / Jim Zimmerman]
            </p>
            <p className="font-serif text-xl text-muted-foreground italic">
              Case studies are in progress. We take permission seriously.
            </p>
            <div className="mt-6">
              <Link
                href="/work"
                className="font-mono text-[11px] uppercase tracking-widest text-primary inline-flex items-center gap-2 hover:gap-3 transition-all no-underline"
              >
                See all work <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-3">
            Start with a scoping call.
          </h2>
          <p className="text-base text-muted-foreground max-w-md mb-8 leading-relaxed">
            60 minutes. No pitch, no charge. We'll tell you if a sprint is the right tool for your problem — or if it isn't.
          </p>
          <a
            href="https://calendly.com/novapath711/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-5 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            data-testid="button-cta-bottom"
          >
            Book the call <ArrowRight size={11} />
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
