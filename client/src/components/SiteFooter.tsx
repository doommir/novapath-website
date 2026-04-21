import { Link } from "wouter";

const navLinks = [
  { label: "Approach", href: "/approach" },
  { label: "Sprints", href: "/sprints" },
  { label: "K–12", href: "/k12" },
  { label: "Work", href: "/work" },
  { label: "Field Notes", href: "/field-notes" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background mt-24">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div>
            <span className="font-serif text-xl font-semibold text-foreground">NovaPath</span>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mt-2">
              Est. 2024 — Murrieta, CA & remote
            </p>
            <p className="text-sm text-muted-foreground mt-4 max-w-xs leading-relaxed">
              We cobuild AI with the people who'll use it. K–12 districts and founders with half-built products.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">Navigate</p>
              <div className="flex flex-col gap-2">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors no-underline"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">Contact</p>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:Dan@explorenovapath.com"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Dan@explorenovapath.com
                </a>
                <a
                  href="https://calendly.com/novapath711/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Book a call →
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-wrap justify-between gap-4">
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
            © {new Date().getFullYear()} NovaPath. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
            Dan Whitlock + Matt Varner
          </p>
        </div>
      </div>
    </footer>
  );
}
