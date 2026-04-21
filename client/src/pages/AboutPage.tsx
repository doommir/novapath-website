import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ArrowRight } from "lucide-react";

const team = [
  {
    name: "Dan Whitlock",
    role: "CEO — K–12 Track Lead",
    bio: "Dan spent years as a vice principal before moving into technology and AI strategy for school systems. He's presented at ASU+GSV, been cited in Education Week, and served on California's SB 1288 AI Workgroup. He leads the K–12 track at NovaPath and works directly with district leaders on readiness assessments, pilot design, and policy navigation. He doesn't write about K–12 AI from the outside — he's been building it inside schools.",
    credentials: ["ASU+GSV Speaker", "Education Week", "SB 1288 AI Workgroup", "Navigator Schools"],
    contact: "Dan@explorenovapath.com",
    track: "K–12 Track",
  },
  {
    name: "Matt Varner",
    role: "COO — Sprint Track Lead",
    bio: "Matt is the operational backbone of NovaPath. He's a pattern-recognizer with a builder's instinct — the person who can look at a half-finished product, understand what's broken, and get it to a Friday demo in two weeks. He leads the sprint framework, runs SMB builds, and makes sure nothing ships without a real handoff. If Dan is the strategist, Matt is the one making sure the strategy becomes a working tool.",
    credentials: ["Sprint Framework", "SMB Builds", "Technical Operations"],
    contact: "[CONFIRM SMB EMAIL WITH MATT]",
    track: "Sprint Track",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">About</p>
        <h1 className="font-serif text-5xl md:text-6xl font-medium leading-[1.05] max-w-3xl">
          Two people.<br />No associates.<br />No offshore team.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
          NovaPath is Dan Whitlock and Matt Varner. Est. 2024. Murrieta, CA & remote across North America.
        </p>
      </section>

      {/* Team */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20 grid md:grid-cols-2 gap-12 md:gap-0">
          {team.map((person, i) => (
            <div
              key={i}
              className={i === 1 ? "md:border-l md:border-border md:pl-16" : "md:pr-16"}
              data-testid={`card-team-${i}`}
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4">{person.track}</p>
              <h2 className="font-serif text-3xl font-medium text-foreground mb-1">{person.name}</h2>
              <p className="text-sm text-muted-foreground mb-6">{person.role}</p>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">{person.bio}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {person.credentials.map((c, ci) => (
                  <span
                    key={ci}
                    className="font-mono text-[11px] uppercase tracking-widest px-3 py-1 border border-border text-muted-foreground rounded-full"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <a
                href={`mailto:${person.contact}`}
                className="font-mono text-[11px] uppercase tracking-widest text-primary"
              >
                {person.contact}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Why two people */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">Why two people</p>
          <h2 className="font-serif text-3xl font-medium text-foreground mb-6 leading-snug">
            We're not trying to be a firm. We're trying to do good work.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Staying small is a deliberate choice. When you work with NovaPath, you work directly with Dan or Matt — not an account manager, not a junior analyst. The people who scope the problem are the ones who build it.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            We take on a limited number of engagements at a time. That's how we stay useful to the ones we do take.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl font-medium text-foreground">Want to work together?</h2>
            <p className="text-base text-muted-foreground mt-2">Start with a conversation.</p>
          </div>
          <a
            href="https://calendly.com/novapath711/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-5 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity flex-shrink-0"
            data-testid="button-book-about"
          >
            Book a call <ArrowRight size={11} />
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
