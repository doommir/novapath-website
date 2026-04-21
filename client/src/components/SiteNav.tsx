import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Approach", href: "/approach" },
  { label: "Sprints", href: "/sprints" },
  { label: "K–12", href: "/k12" },
  { label: "Work", href: "/work" },
  { label: "Field Notes", href: "/field-notes" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
      data-testid="site-nav"
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="font-serif text-xl font-semibold text-foreground hover:text-primary transition-colors no-underline"
          data-testid="link-logo"
        >
          NovaPath
        </Link>

        <nav className="hidden md:flex items-center gap-7 flex-1 justify-center">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-mono text-[11px] uppercase tracking-widest transition-colors no-underline ${
                location.startsWith(l.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`link-nav-${l.label.toLowerCase().replace(/[\s–]/g, "-")}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://calendly.com/novapath711/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center font-mono text-[11px] uppercase tracking-widest px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
          data-testid="link-book-call-nav"
        >
          Book a call
        </a>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          data-testid="button-mobile-menu"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-5 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground no-underline"
              onClick={() => setOpen(false)}
              data-testid={`link-mobile-${l.label.toLowerCase().replace(/[\s–]/g, "-")}`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://calendly.com/novapath711/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-widest text-primary"
          >
            Book a call →
          </a>
        </div>
      )}
    </header>
  );
}
