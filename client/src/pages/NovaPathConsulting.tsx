import { useState } from "react";
import { motion, useReducedMotion, MotionConfig } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import danPresenting from "@assets/copyofdan_1770090391461.png";
import {
  EducationFooter,
  EducationHeader,
} from "@/components/EducationChrome";

import { ArrowUpRight, ArrowDown } from "lucide-react";
import "@/education.css";
import { PUBLIC_INQUIRY_EMAIL } from "@shared/contact";

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

export default function NovaPathConsulting() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="edu-site">
        <a className="edu-skip" href="#main">
          Skip to content
        </a>
        <EducationHeader onHomePage />
        <main id="main" tabIndex={-1}>
          <Hero />
          <Services />
          <div id="results">
            <CaseStudies />
          </div>
          <div id="about">
            <AboutDan />
          </div>
          <div id="contact">
            <ContactForm />
          </div>
        </main>
        <EducationFooter onHomePage />
      </div>
    </MotionConfig>
  );
}

function Hero() {
  return (
    <section className="edu-hero" id="hero">
      <div className="edu-container">
        <div className="edu-hero-kicker">
          <span>For schools, Head Start & nonprofits</span>
          <span>Insight · Design · Implementation</span>
        </div>
        <div className="edu-hero-grid">
          <div>
            <h1>
              Stronger teams.
              <br />
              <em>
                Better-run
                <br /> programs.
              </em>
            </h1>
            <p className="edu-hero-intro">
              Coaching software, wage and compensation studies, and training
              that help schools, Head Start programs, and nonprofits support
              their people and run their programs.
            </p>
            <div className="edu-actions">
              <a className="edu-button" href="#services">
                Find the right support <ArrowUpRight size={18} />
              </a>
              <a className="edu-text-link" href="#results">
                Explore our work <ArrowDown size={16} />
              </a>
            </div>
          </div>
          <div className="edu-featured-offers">
            <a className="edu-wage-feature" href="/wage-compensation-studies/">
              <span className="edu-feature-kicker">Wage & compensation studies</span>
              <div className="edu-wage-promise"><strong>5</strong><span>business days<br />to your study draft</span></div>
              <h2>Know where your pay stands.</h2>
              <p>Salary and benefits benchmarks. Careful position matching. Clear priorities for your next compensation decision.</p>
              <small>After scope and complete data are confirmed. Final revisions scheduled separately.</small>
              <span className="edu-feature-cta">Request your study proposal <ArrowUpRight size={20} /></span>
            </a>
            <div className="edu-coach-feature">
              <span className="edu-feature-kicker">CoachingOS</span>
              <h2>Make the next classroom visit count.</h2>
              <p>Keep the evidence, the agreed action, and the next conversation connected.</p>
              <div className="edu-coach-example">
                <span className="edu-feature-kicker">One coaching cycle · Illustrative example</span>
                <details open><summary>01 / What happened?</summary><p>Four students shared an explanation. Others listened without rehearsing their own response.</p></details>
                <details><summary>02 / What changes tomorrow?</summary><p>Give every student a partner rehearsal before asking for whole-group responses.</p></details>
                <details><summary>03 / What will we look for next?</summary><p>Return to the agreed action: are more students explaining their thinking before the discussion?</p></details>
              </div>
              <a href="#contact" className="edu-feature-cta">Bring your coaching model to life <ArrowUpRight size={20} /></a>
            </div>
          </div>
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
      id: "coachingos",
      title: "CoachingOS",
      body: "Give your coaching team one place to capture observations, identify a focus, and follow through on next steps. Implementation support connects the platform to your instructional model.",
      detail: "Classroom observations · Coaching cycles · Follow-through",
      href: "#contact",
    },
    {
      id: "wage-compensation-studies",
      title: "Wage & compensation studies",
      body: "Know how your pay compares and what to prioritize next. Receive a complete study draft within five business days after scope and complete data are confirmed.",
      detail: "Position matching · Salary and benefits benchmarks · Clear recommendations",
      href: "/wage-compensation-studies/",
    },
    {
      id: "training-compliance-courses",
      title: "Training & compliance courses",
      body: "Prepare staff for the work they need to do with training and compliance courses built around your program’s needs. Start with the topics, audience, and requirements you need to address.",
      detail: "Staff training · Compliance topics · Program-specific needs",
      href: "#contact",
    },
    {
      id: "custom-software",
      title: "Custom software",
      body: "Build around the work your team actually does, from instructional coaching to assessment and program operations.",
      detail: "Collaborative design · Working prototypes · Refinement",
      href: "#contact",
    },
    {
      id: "strategic-advisory",
      title: "Strategic advisory",
      body: "Define the problem, make informed decisions about AI, and develop an implementation plan around your organization’s priorities.",
      detail: "Priorities · Workflow discovery · Implementation planning",
      href: "#contact",
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
          {services.map((service, index) => (
            <a
              key={service.id}
              href={service.href}
              className="edu-engagement"
              id={service.id}
              aria-label={`Explore ${service.title}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
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
        "You leave a classroom with useful notes. By the next visit, the agreed next step can be hard to find.",
      built:
        "CoachingOS keeps observations, instructional focus, and action steps connected so each conversation builds on the last.",
      workflow:
        "Capture the evidence. Agree on one change to try. Return to it on the next visit and decide what comes next.",
      evidence:
        "1,892 classroom observations and 2,185 targeted action steps recorded.",
      href: "#contact",
      link: "Discuss your coaching model",
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
              Everyday challenges.
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
              Former Technology Innovation Lead, Navigator Schools
            </p>

            <div
              className="space-y-5 mb-10"
              style={{ color: C.muted, fontSize: "15px", lineHeight: "1.75" }}
            >
              <p>
                Dan brings an educator's perspective to NovaPath's work. As
                Technology Innovation Lead at Navigator Schools, he built tools
                alongside the teachers and school leaders who used them.
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
          `Please try again or email ${PUBLIC_INQUIRY_EMAIL} directly.`,
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
    "Head Start / Early Head Start Director",
    "Human Resources / Finance Leader",
    "Nonprofit Executive",
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
            Let’s start with your organization.
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
