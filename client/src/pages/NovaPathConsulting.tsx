import { useState, useEffect } from "react";
import { motion, useReducedMotion, MotionConfig } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import danPresenting from "@assets/copyofdan_1770090391461.png";

import { ArrowUpRight, ArrowRight, ArrowDown, Menu, X } from "lucide-react";
import "@/education.css";

const CALENDLY_URL = "https://calendly.com/novapath711/30min";

// Education palette retains the NovaPath identity with an editorial treatment.
const C = {
  bg: "#F8F6F1",
  bgAlt: "#F0EDE6",
  bgCard: "#FFFFFF",
  border: "#DAD4C9",
  borderMid: "#C8BEB1",
  white: "#1C1917",
  muted: "#68605A",
  faint: "#70675F",
  accent: "#48283F",
  accentDim: "#EDE6EB",
  accentBorder: "#CDBDC8",
  blue: "#48283F",
  blueDim: "#EDE6EB",
} as const;

function fade(delay = 0) {
  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, delay },
  };
}

function BrandIdentity() {
  return (
    <>
      <span className="edu-mark" aria-hidden="true" />
      NovaPath
    </>
  );
}

export default function NovaPathConsulting() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="edu-site">
        <a className="edu-skip" href="#main">
          Skip to content
        </a>
        <StickyNav />
        <main id="main" tabIndex={-1}>
          <Hero />
          <div id="about">
            <AboutDan />
          </div>
          <div id="results">
            <CaseStudies />
          </div>
          <Services />
          <div id="contact">
            <ContactForm />
          </div>
        </main>
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}

function StickyNav() {
  const [open, setOpen] = useState(false);
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
  const links = [
    { label: "Our approach", href: "#about" },
    { label: "Selected work", href: "#results" },
    { label: "Work with us", href: "#services" },
  ];
  return (
    <header className="edu-header">
      <div className="edu-container edu-header-row">
        <a
          href="#hero"
          className="edu-brand"
          aria-label="NovaPath Education home"
        >
          <BrandIdentity />
        </a>
        <nav className="edu-audience" aria-label="NovaPath audiences">
          <a href="#hero" aria-current="page">
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
          <a className="edu-nav-cta" href="#contact">
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
          <a href="#contact" onClick={() => setOpen(false)}>
            Let's talk <ArrowUpRight size={18} />
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="edu-hero" id="hero">
      <div className="edu-container">
        <div className="edu-hero-kicker">
          <span>K–12 consulting & custom software</span>
          <span>Insight · Design · Implementation</span>
        </div>
        <div className="edu-hero-grid">
          <div>
            <h1>
              School expertise.
              <br />
              <em>
                Built into
                <br /> better systems.
              </em>
            </h1>
            <p className="edu-hero-intro">
              K–12 consulting, custom software, and implementation support
              grounded in how schools work.
            </p>
            <div className="edu-actions">
              <a className="edu-button" href="#contact">
                Discuss your school’s needs <ArrowUpRight size={18} />
              </a>
              <a className="edu-text-link" href="#results">
                Explore our work <ArrowDown size={16} />
              </a>
            </div>
          </div>
          <figure className="edu-product-study">
            <div className="edu-study-label">
              <span>Inside the work / 01</span>
              <span>CoachingOS</span>
            </div>
            <div className="edu-sample-sheet">
              <div className="edu-sheet-top">
                <span>INSTRUCTIONAL COACHING</span>
                <span>Illustrative example</span>
              </div>
              <h2>
                From observation
                <br />
                to a useful next step.
              </h2>
              <p className="edu-sheet-subtitle">
                A coaching cycle, made visible.
              </p>
              <div className="edu-evidence-row">
                <span>01</span>
                <div>
                  <h3>Observe</h3>
                  <p>
                    Students explain their thinking during a small-group
                    discussion.
                  </p>
                  <small>Classroom evidence</small>
                </div>
              </div>
              <div className="edu-evidence-row">
                <span>02</span>
                <div>
                  <h3>Identify a focus</h3>
                  <p>
                    Make space for every student to contribute an explanation.
                  </p>
                  <small>Instructional priority</small>
                </div>
              </div>
              <div className="edu-evidence-row">
                <span>03</span>
                <div>
                  <h3>Agree on an action</h3>
                  <p>
                    Plan a partner rehearsal before the next group discussion.
                  </p>
                  <small>Next coaching conversation</small>
                </div>
              </div>
              <div className="edu-sheet-bottom">
                <span>Evidence → Focus → Action</span>
                <span>NP / Education</span>
              </div>
            </div>
            <figcaption>
              CoachingOS connects observations and action steps. This sample
              illustrates the workflow using fictional classroom content.
            </figcaption>
          </figure>
        </div>
        <div className="edu-hero-foot">
          <span>Built alongside educators.</span>
          <p>
            Strategy that understands the classroom.
            <br />
            Software that supports the work around it.
          </p>
          <a href="#about" aria-label="Explore our approach">
            <ArrowDown size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      number: "01",
      title: "Strategic advisory",
      body: "Define the problem, make informed decisions about AI, and develop an implementation plan around your school’s priorities.",
      detail: "Priorities · Workflow discovery · Implementation planning",
    },
    {
      number: "02",
      title: "Custom software",
      body: "Build around the work your team actually does, from instructional coaching to assessment and program operations.",
      detail: "Collaborative design · Working prototypes · Refinement",
    },
    {
      number: "03",
      title: "Platform implementation",
      body: "Explore whether a tool such as CoachingOS fits your needs, then work through how it will support your people and practices.",
      detail: "Fit assessment · Introduction · Ongoing learning",
    },
  ];
  return (
    <section id="services" className="edu-services">
      <div className="edu-container edu-engagement-layout">
        <div>
          <p className="edu-eyebrow">Work with NovaPath</p>
          <h2>
            A thoughtful start.
            <br />
            <em>A practical way forward.</em>
          </h2>
          <p className="edu-engagement-intro">
            Start with the challenge you’re facing. Together, we can identify
            the right kind of support.
          </p>
          <a href="#contact" className="edu-text-link">
            Start a conversation <ArrowUpRight size={18} />
          </a>
        </div>
        <div>
          {services.map((service) => (
            <a key={service.number} href="#contact" className="edu-engagement">
              <span>{service.number}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <small>{service.detail}</small>
              </div>
              <ArrowUpRight size={20} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  const cases = [
    {
      name: "CoachingOS",
      area: "Instructional coaching",
      challenge:
        "Classroom observations and follow-up actions need a shared place to live.",
      built:
        "A system that brings coaching activity, observation records, and targeted action steps into view.",
      workflow:
        "Use classroom evidence to identify an instructional focus and make the next coaching conversation more useful.",
      evidence:
        "1,892 classroom observations and 2,185 targeted action steps recorded.",
      href: "/coachingOSdemo",
      link: "Explore CoachingOS",
    },
    {
      name: "NaviGrade",
      area: "Writing assessment",
      challenge:
        "Teachers need to see patterns across student writing and decide where to focus instruction.",
      built:
        "An AI-supported writing assessment tool that organizes responses and feedback for teacher review.",
      workflow:
        "Review writing feedback, identify areas that need attention, and use those insights to plan instruction.",
      evidence: "1,014 student writing responses analyzed over 90 days.",
      href: "/navigrade",
      link: "Explore NaviGrade",
    },
    {
      name: "Head Start Compliance",
      area: "Program operations",
      challenge:
        "Paper sign-ins and fragmented spreadsheets make training records difficult to manage.",
      built:
        "A live dashboard that organizes training records and compliance artifacts for monitoring and review.",
      workflow:
        "Bring records together so program teams can find and review the documentation they need.",
      evidence: "2,000+ compliance artifacts generated over six weeks.",
      href: "#contact",
      link: "Discuss a similar need",
    },
  ];
  return (
    <section className="edu-cases">
      <div className="edu-container">
        <div className="edu-work-heading">
          <div>
            <p className="edu-eyebrow">Selected work</p>
            <h2>
              School challenges.
              <br />
              <em>Considered solutions.</em>
            </h2>
          </div>
          <p>A closer look at the tools we build and the work they support.</p>
        </div>
        {cases.map((c, i) => (
          <article
            key={c.name}
            className="edu-case-study"
            data-testid={`card-case-study-${i}`}
          >
            <div className="edu-case-title">
              <span className="edu-case-index">
                0{i + 1} / {c.area}
              </span>
              <h3>{c.name}</h3>
              <a href={c.href} className="edu-text-link">
                {c.link} <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="edu-case-body">
              <div>
                <h4>The challenge</h4>
                <p>{c.challenge}</p>
              </div>
              <div>
                <h4>What we built</h4>
                <p>{c.built}</p>
              </div>
              <div>
                <h4>How it works</h4>
                <p>{c.workflow}</p>
              </div>
              <p className="edu-case-evidence">
                <span>From the project record</span>
                {c.evidence}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── About Dan ────────────────────────────────────────────────────────────────
function AboutDan() {
  const rm = useReducedMotion();
  const credentials = [
    "SB 1288 AI Workgroup",
    "Education Week",
    "ASU+GSV Speaker",
    "Navigator Schools",
  ];

  return (
    <section
      style={{
        paddingTop: "96px",
        paddingBottom: "96px",
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={rm ? {} : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={rm ? { duration: 0 } : { duration: 0.6 }}
          >
            <img
              src={danPresenting}
              alt="Dan Whitlock presenting"
              className="w-full"
              style={{ maxWidth: "440px", border: `1px solid ${C.border}` }}
              loading="lazy"
              data-testid="img-dan-bio"
            />
          </motion.div>

          <motion.div
            initial={rm ? {} : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={rm ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ color: C.accent, letterSpacing: "0.14em" }}
            >
              School experience, in practice
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-1"
              style={{ color: C.white, letterSpacing: "-0.02em" }}
              data-testid="text-dan-name"
            >
              Built with an educator’s perspective.
            </h2>
            <p className="text-sm mb-8" style={{ color: C.faint }}>
              Dan Whitlock · Founder, NovaPath
              <br />
              Technology Innovation Lead, Navigator Schools
            </p>

            <div
              className="space-y-5 mb-10"
              style={{ color: C.muted, fontSize: "15px", lineHeight: "1.75" }}
            >
              <p>
                Dan brings an educator's perspective to NovaPath's work. As
                Technology Innovation Lead at Navigator Schools, he builds tools
                alongside the teachers and school leaders who use them.
              </p>
              <p>
                He's built and deployed 8+ AI-powered tools in real K-12
                settings. He was selected for California's SB 1288 AI in
                Education Workgroup and was featured in Education Week. He
                speaks at major conferences including ASU+GSV Summit, FETC, and
                CSDC.
              </p>
              <p>
                Our approach connects that school experience with hands-on
                software development. We work through the problem together, show
                the work as it takes shape, and refine it around everyday use.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {credentials.map((c, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5"
                  style={{ border: `1px solid ${C.border}`, color: C.muted }}
                >
                  {c}
                </span>
              ))}
            </div>

            <a
              href="https://smarterbydesign.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ color: C.accent }}
              data-testid="link-newsletter-bio"
            >
              Read the newsletter →
            </a>

            <div
              className="mt-10 pt-8"
              style={{ borderTop: `1px solid ${C.border}` }}
            >
              <div
                className="text-4xl leading-none mb-4"
                style={{
                  color: C.accent,
                  opacity: 0.35,
                  fontFamily: "Georgia, serif",
                }}
              >
                "
              </div>
              <blockquote
                className="text-lg font-medium leading-relaxed mb-3"
                style={{ color: C.white, letterSpacing: "-0.01em" }}
                data-testid="text-edweek-quote"
              >
                The best professional development I've had in 20 years of
                education.
              </blockquote>
              <p className="text-xs" style={{ color: C.faint }}>
                Educator quoted in Education Week
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    district: "",
    email: "",
    challenge: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) =>
      apiRequest("POST", "/api/consulting-inquiries", data),
    onSuccess: () => {
      toast({
        title: "Thank you!",
        description: "We'll be in touch within 24 hours.",
      });
      setFormData({
        name: "",
        role: "",
        district: "",
        email: "",
        challenge: "",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description:
          "Please try again or email Dan@explorenovapath.com directly.",
      });
    },
  });

  const roleOptions = [
    "Superintendent",
    "Asst. Superintendent",
    "Technology Director",
    "Curriculum Director",
    "Principal",
    "Instructional Coach",
    "EdTech Company",
    "Other",
  ];

  const inputStyle = {
    backgroundColor: C.bgCard,
    border: `1px solid ${C.border}`,
    color: C.white,
    borderRadius: "2px",
    outline: "none",
    width: "100%",
    padding: "12px 16px",
    fontSize: "14px",
  };

  return (
    <section style={{ paddingTop: "96px", paddingBottom: "120px" }}>
      <div className="max-w-2xl mx-auto px-6">
        <motion.div {...fade()} className="mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ color: C.accent, letterSpacing: "0.14em" }}
          >
            Contact
          </p>
          <h2
            className="text-4xl font-bold mb-3"
            style={{ color: C.white, letterSpacing: "-0.025em" }}
          >
            Let’s start with your school.
          </h2>
          <p style={{ color: C.muted, fontSize: "15px" }}>
            Tell us about your school, district, or organization and what you
            want to improve.
          </p>
        </motion.div>

        <motion.form
          {...fade(0.1)}
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate(formData);
          }}
          className="space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="edu-name"
                className="block text-xs font-medium mb-2 uppercase tracking-wider"
                style={{ color: C.faint }}
              >
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                style={inputStyle}
                id="edu-name"
                data-testid="input-name"
              />
            </div>
            <div>
              <label
                htmlFor="edu-role"
                className="block text-xs font-medium mb-2 uppercase tracking-wider"
                style={{ color: C.faint }}
              >
                Role
              </label>
              <select
                required
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                style={{
                  ...inputStyle,
                  color: formData.role ? C.white : C.faint,
                }}
                id="edu-role"
                data-testid="select-role"
              >
                <option value="" disabled>
                  Select your role
                </option>
                {roleOptions.map((o) => (
                  <option
                    key={o}
                    value={o}
                    style={{ backgroundColor: C.bgCard, color: C.white }}
                  >
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="edu-district"
                className="block text-xs font-medium mb-2 uppercase tracking-wider"
                style={{ color: C.faint }}
              >
                District / Organization
              </label>
              <input
                type="text"
                required
                value={formData.district}
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
                style={inputStyle}
                id="edu-district"
                data-testid="input-district"
              />
            </div>
            <div>
              <label
                htmlFor="edu-email"
                className="block text-xs font-medium mb-2 uppercase tracking-wider"
                style={{ color: C.faint }}
              >
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                style={inputStyle}
                id="edu-email"
                data-testid="input-email"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="edu-challenge"
              className="block text-xs font-medium mb-2 uppercase tracking-wider"
              style={{ color: C.faint }}
            >
              What would you like to build or improve?
            </label>
            <textarea
              rows={4}
              value={formData.challenge}
              onChange={(e) =>
                setFormData({ ...formData, challenge: e.target.value })
              }
              style={{ ...inputStyle, resize: "none" }}
              id="edu-challenge"
              data-testid="input-challenge"
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-4 text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: C.accent, color: "#FFFFFF" }}
            data-testid="button-submit-consultation"
          >
            {mutation.isPending ? "Submitting..." : "Send inquiry"}
          </button>

          <p className="text-center text-xs" style={{ color: C.faint }}>
            We use these details to respond to your inquiry. This does not
            subscribe you to marketing emails.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function SiteFooter() {
  return (
    <footer className="edu-footer">
      <div className="edu-container">
        <div className="edu-footer-top">
          <div>
            <a href="#hero" className="edu-brand">
              <BrandIdentity />
            </a>
            <p>
              K–12 consulting, custom software,
              <br />
              and a clear way forward.
            </p>
            <a href="mailto:Dan@explorenovapath.com">Dan@explorenovapath.com</a>
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
          <small>© {new Date().getFullYear()} NovaPath Systems</small>
          <p>Practical software. Built around people.</p>
          <a
            href="https://www.linkedin.com/in/danwhitlock/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
