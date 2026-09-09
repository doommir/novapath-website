import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { PUBLIC_INQUIRY_EMAIL } from "@shared/contact";

export function BrandIdentity() {
  return (
    <>
      <span className="edu-mark" aria-hidden="true" />
      NovaPath
    </>
  );
}

const HOME_LINKS = [
  { label: "Our approach", hash: "about" },
  { label: "Selected work", hash: "results" },
  { label: "Work with us", hash: "services" },
];

function siteHref(onHomePage: boolean, hash: string) {
  return onHomePage ? `#${hash}` : `/#${hash}`;
}

export function EducationHeader({
  onHomePage = false,
}: {
  onHomePage?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const onBlog = location.startsWith("/blog");
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("education-menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  const homeHref = onHomePage ? "#hero" : "/";
  const links = HOME_LINKS.map((l) => ({
    label: l.label,
    href: siteHref(onHomePage, l.hash),
  }));
  const contactHref = siteHref(onHomePage, "contact");

  return (
    <header className="edu-header">
      <div className="edu-container edu-header-row">
        <a href={homeHref} className="edu-brand" aria-label="NovaPath Education home">
          <BrandIdentity />
        </a>
        <nav className="edu-audience" aria-label="NovaPath audiences">
          <a href={homeHref} aria-current={onBlog ? undefined : "page"}>
            Education
          </a>
          <a href="https://novapath.dev/">
            Business <ArrowUpRight size={12} />
          </a>
        </nav>
        <nav className="edu-desktop-nav" aria-label="Main navigation">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <Link href="/blog" aria-current={onBlog ? "page" : undefined}>
            Blog
          </Link>
          <a className="edu-nav-cta" href={contactHref}>
            Let's talk <ArrowUpRight size={16} />
          </a>
        </nav>
        <button
          className="edu-menu-toggle"
          id="education-menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="education-mobile-nav"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <nav
          className="edu-mobile-nav"
          id="education-mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
              <ArrowUpRight size={18} />
            </a>
          ))}
          <Link href="/blog" onClick={() => setOpen(false)} aria-current={onBlog ? "page" : undefined}>
            Blog
            <ArrowUpRight size={18} />
          </Link>
          <a href={contactHref} onClick={() => setOpen(false)}>
            Let's talk <ArrowUpRight size={18} />
          </a>
        </nav>
      )}
    </header>
  );
}

export function EducationFooter({
  onHomePage = false,
}: {
  onHomePage?: boolean;
}) {
  const homeHref = onHomePage ? "#hero" : "/";
  return (
    <footer className="edu-footer">
      <div className="edu-container">
        <div className="edu-footer-top">
          <div>
            <a href={homeHref} className="edu-brand">
              <BrandIdentity />
            </a>
            <p>
              K–12 consulting, custom software,
              <br />
              and a clear way forward.
            </p>
            <a href={`mailto:${PUBLIC_INQUIRY_EMAIL}`}>{PUBLIC_INQUIRY_EMAIL}</a>
            <Link className="edu-footer-resource" href="/blog">
              Blog <ArrowUpRight size={16} />
            </Link>
          </div>
          <div>
            <p className="edu-eyebrow">Ideas for your school</p>
            <h3>Smarter by Design</h3>
            <p>Explore Dan's newsletter on AI and the work of education.</p>
            <a
              className="edu-text-link"
              href="https://smarterbydesign.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the newsletter <ArrowUpRight size={16} />
            </a>
            <a
              className="edu-footer-resource"
              href="https://checklist.smarterbydesign.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Take the AI readiness assessment <ArrowUpRight size={16} />
            </a>
          </div>
          <div>
            <p className="edu-eyebrow">One team. Two areas of focus.</p>
            <h3>Building for a business?</h3>
            <p>
              Explore our websites, apps, and workflow tools for businesses.
            </p>
            <a className="edu-text-link" href="https://novapath.dev/">
              NovaPath for Business <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="edu-footer-bottom">
          <small>© {new Date().getFullYear()} NovaPath</small>
          <p>Practical software. Built around people.</p>
          <div className="edu-footer-legal-links">
            <Link href="/blog">Blog</Link>
            <a
              href="https://www.linkedin.com/in/danwhitlock/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
