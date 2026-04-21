import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

const whatWeDo = [
  {
    title: "Readiness assessment",
    desc: "Before we build anything, we figure out where you actually are. Not where the RFP says you are — where the teachers are, where the data is, where the district is willing to go.",
  },
  {
    title: "Teacher-in-the-loop pilot design",
    desc: "We don't drop a tool into a classroom and measure adoption. We sit next to teachers in the design process. They tell us what breaks. We fix it before it ships.",
  },
  {
    title: "Procurement and policy review",
    desc: "FERPA. State policy. District guidelines. Student data privacy agreements. We help you navigate the compliance layer so the tool can actually be used — not just approved.",
  },
  {
    title: "Working pilot, not a slide deck",
    desc: "At the end of the engagement, you have a working tool your staff helped build. Not a recommendation. Not a framework. A working pilot.",
  },
];

const whatWeDontSell = [
  "PD subscriptions that expire",
  "AI platforms with no customization",
  "Pilots without a path to scale",
  "Tools your teachers weren't part of designing",
  "Reports that diagnose without building",
  "Six-month timelines for two-week problems",
];

export default function K12Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">K–12 Track — Dan Whitlock</p>
        <h1 className="font-serif text-5xl md:text-6xl font-medium leading-[1.05] max-w-4xl">
          Your teachers shape the tool.<br className="hidden sm:block" /> Your board signs the deck.<br className="hidden sm:block" /> Your district owns the code.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
          AI consulting for K–12 district leaders who are done waiting for the policy to catch up with the classroom.
        </p>
        <div className="mt-8">
          <a
            href="https://calendly.com/novapath711/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-5 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            data-testid="button-book-call-k12"
          >
            Book a call with Dan <ArrowRight size={11} />
          </a>
        </div>
      </section>

      {/* What we do */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-10">What we do</p>
          <div className="grid md:grid-cols-2 gap-10">
            {whatWeDo.map((item, i) => (
              <div key={i}>
                <div className="flex items-start gap-3 mb-3">
                  <span className="font-mono text-[11px] text-primary mt-1 flex-shrink-0">0{i + 1}</span>
                  <h3 className="font-serif text-xl font-medium text-foreground leading-snug">{item.title}</h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed pl-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher-in-the-loop callout */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">Teacher-in-the-loop</p>
          <h2 className="font-serif text-3xl font-medium text-foreground mb-6 leading-snug">
            The teachers are the experts. We're the builders.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            A tool designed by administrators and handed to teachers is a tool that will be quietly ignored. A tool designed with teachers — where their feedback shapes the build before it ships — is one that gets used.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            Teacher-in-the-loop isn't a process we follow. It's the reason the tools work.
          </p>
        </div>
      </section>

      {/* What we don't sell */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-10">What we don't sell</p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            {whatWeDontSell.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="font-mono text-xs text-muted-foreground mt-0.5 flex-shrink-0">—</span>
                <span className="text-base text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dan's credentials */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">About Dan</p>
          <h2 className="font-serif text-3xl font-medium text-foreground mb-6 leading-snug">
            He's not writing about K–12 AI from the outside.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Dan Whitlock spent years as a vice principal before moving into technology and AI strategy for school systems. He's presented at ASU+GSV, been cited in Education Week, and served on California's SB 1288 AI Workgroup.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            When he talks about what works in a K–12 AI rollout, he's talking about things he's built and watched fail and rebuilt. That's what you're getting access to.
          </p>
          <div className="mt-8">
            <Link
              href="/about"
              className="font-mono text-[11px] uppercase tracking-widest text-primary inline-flex items-center gap-2 hover:gap-3 transition-all no-underline"
            >
              About the firm <ArrowRight size={11} />
            </Link>
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
              [CASE STUDY PENDING — GET CLIENT PERMISSION]
            </p>
            <p className="font-serif text-xl text-muted-foreground italic max-w-xl">
              K–12 case studies are in progress. We're collecting permission from district partners before we publish.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-3">
            Ready to find out where your district actually is?
          </h2>
          <p className="text-base text-muted-foreground max-w-md mb-8 leading-relaxed">
            We start with an honest assessment — not a pitch. Book a call with Dan.
          </p>
          <a
            href="https://calendly.com/novapath711/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-5 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            data-testid="button-k12-cta-bottom"
          >
            Book a call with Dan <ArrowRight size={11} />
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
