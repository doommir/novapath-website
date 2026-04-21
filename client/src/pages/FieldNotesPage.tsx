import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    title: "What wedge-and-expand actually looks like with a law firm",
    author: "Matt Varner",
    dek: "The theory sounds clean. The reality involves three pivot conversations, one near-cancellation, and a client who ended up expanding their scope twice.",
    date: "[DATE PENDING]",
    readTime: "[READ TIME PENDING]",
    track: "Sprint Track",
    slug: "#",
  },
  {
    title: "Why K–12 AI RFPs fail before they're written",
    author: "Dan Whitlock",
    dek: "Most RFPs describe the tool districts think they need, not the problem they're actually trying to solve. Here's what gets lost in that gap.",
    date: "[DATE PENDING]",
    readTime: "[READ TIME PENDING]",
    track: "K–12 Track",
    slug: "#",
  },
];

export default function FieldNotesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">Writing</p>
        <h1 className="font-serif text-5xl md:text-6xl font-medium leading-[1.05] max-w-2xl">
          Field Notes.
        </h1>
        <p className="mt-6 text-base text-muted-foreground max-w-xl leading-relaxed">
          Writing from inside the builds. What we're seeing, what we're learning, and what we think is worth saying plainly. Dan covers K–12. Matt covers SMB and sprint operations.
        </p>
      </section>

      {/* Posts */}
      <section className="max-w-5xl mx-auto px-6">
        <hr className="border-border" />
        <div className="py-20">
          <div className="space-y-0 border border-border rounded-md overflow-hidden">
            {posts.map((post, i) => (
              <a
                key={i}
                href={post.slug}
                className={`block p-8 group transition-colors hover:bg-card/60 ${i < posts.length - 1 ? "border-b border-border" : ""} no-underline`}
                data-testid={`link-post-${i}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-primary">{post.track}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] text-muted-foreground">{post.date}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{post.readTime}</span>
                  </div>
                </div>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">{post.dek}</p>
                <span className="font-mono text-[11px] uppercase tracking-widest text-primary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read <ArrowRight size={11} />
                </span>
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            More posts coming as we build and learn. Subscribe via{" "}
            <a
              href="https://smarterbydesign.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              Smarter by Design
            </a>{" "}
            for updates.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
