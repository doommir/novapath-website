import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

const pendingCaseStudies = [
  {
    client: "CrewFit",
    context: "SMB software build — fitness studio operations",
    challenge: "[CASE STUDY PENDING — GET CLIENT PERMISSION]",
    approach: "",
    outcome: "",
    track: "Sprint Track",
    lead: "Matt Varner",
  },
  {
    client: "Concord",
    context: "Financial services platform — Gabriela + Ruth",
    challenge: "[CASE STUDY PENDING — GET CLIENT PERMISSION]",
    approach: "",
    outcome: "",
    track: "Sprint Track",
    lead: "Matt Varner",
  },
  {
    client: "RMS / Jim Zimmerman",
    context: "Property-tech build — HouseCanary integration",
    challenge: "[CASE STUDY PENDING — GET CLIENT PERMISSION]",
    approach: "",
    outcome: "",
    track: "Sprint Track",
    lead: "Matt Varner",
  },
];

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">Our work</p>
        <h1 className="font-serif text-5xl md:text-6xl font-medium leading-[1.05] max-w-3xl">
          What we've shipped.
        </h1>
        <p className="mt-6 text-base text-muted-foreground max-w-xl leading-relaxed">
          Real builds. Real clients. Real code. Case studies are in progress — we don't publish without permission. Each one below is a placeholder for a story we're collecting.
        </p>
      </section>

      {/* Case study cards */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20">
          <div className="space-y-px border border-border rounded-md overflow-hidden">
            {pendingCaseStudies.map((cs, i) => (
              <div
                key={i}
                className={`p-8 ${i < pendingCaseStudies.length - 1 ? "border-b border-border" : ""} ${i % 2 === 0 ? "bg-background" : "bg-card/40"}`}
                data-testid={`card-work-${i}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-1">{cs.track} — {cs.lead}</p>
                    <h3 className="font-serif text-2xl font-medium text-foreground">{cs.client}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{cs.context}</p>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-widest px-3 py-1 border border-border text-muted-foreground rounded-full">
                    Pending permission
                  </span>
                </div>
                <p className="font-serif text-lg text-muted-foreground italic">{cs.challenge}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground max-w-md leading-relaxed">
            We take permission seriously. We don't publish a client's story without asking them first. Priority outreach is underway.
          </p>
        </div>
      </section>

      {/* K-12 note */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">K–12 track</p>
          <h2 className="font-serif text-2xl font-medium text-foreground mb-4 leading-snug">
            Live tools, not just stories.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            Some of what we've built in K–12 is already deployed and in use at Navigator Schools. Tools for instructional coaching, auto-grading, and staff compliance tracking. We're working on documenting these with the right level of permission and context.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            If you want to see the tools running before the case studies are ready, book a call — we'll show you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://calendly.com/novapath711/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-5 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
              data-testid="button-see-tools"
            >
              See the tools live
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
