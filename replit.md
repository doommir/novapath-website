# NovaPath

## Overview
NovaPath is a two-person AI consultancy run by Dan Whitlock (CEO, K-12 track) and Matt Varner (COO, SMB/sprint track). The site is an 8-page editorial marketing site plus preserved demo tool pages. Est. 2024. Murrieta, CA & remote across North America.

**Active Routes:**
1. `/` → **HomePage**: Two-track editorial homepage. Hero: "We cobuild AI with the people who'll use it." Surfaces K-12 and Sprint tracks.
2. `/approach` → **ApproachPage**: Philosophy page. "We don't consult. We cobuild." Defines cobuilding, sprint, handoff.
3. `/sprints` → **SprintsPage**: SMB services. Pricing table, sprint week breakdown (day-by-day), scoping CTA.
4. `/k12` → **K12Page**: K-12 track. Dan Whitlock's domain. Readiness assessment, teacher-in-the-loop, policy review.
5. `/work` → **WorkPage**: Case studies (pending permission — CrewFit, Concord, Jim Zimmerman/RMS).
6. `/field-notes` → **FieldNotesPage**: Writing index. Two placeholder posts (Matt + Dan).
7. `/about` → **AboutPage**: Two-person firm. Dan Whitlock + Matt Varner bios.
8. `/contact` → **ContactPage**: Email + Calendly + soft-gate (3 questions to include).
9. `/consulting` → Redirect to `/`
10. `/cobuilder` → **CobuilderPage**: Legacy SMB landing page (preserved, dark purple theme)
11. `/coachingOSdemo` → **CoachingOSDemo** (preserved demo tool, dark purple theme)
12. `/navigrade` → **NaviGradeDemo** (preserved demo tool, dark purple theme)
13. `/*` → **NotFound**

**Key Design Decisions:**
- Design system: Ivory paper (#F7F3EC bg), deep forest green (#2D4A3E primary), warm ink (#1A1A1A body)
- Typography: Fraunces (display/headlines via font-serif), Geist (body via font-sans), JetBrains Mono (labels/meta via font-mono)
- Editorial posture: horizontal rules over shadows, no gradients, rules over cards
- Shared components: `SiteNav.tsx`, `SiteFooter.tsx`
- Demo pages (CoachingOSDemo, NaviGradeDemo, CobuilderPage) use hard-coded dark purple inline styles and are unaffected by CSS variable changes
- Calendly: https://calendly.com/novapath711/30min
- Email: Dan@explorenovapath.com (SMB email TBD — [CONFIRM WITH MATT])

**Brand Voice Rules (from brand brief):**
- Banned words: leverage, empower, unlock, journey, synergy, AI-powered, solutions, boutique, seamless, etc.
- Required vocab: Cobuild, Sprint, Ship (not deliver), Tool (not solution), Working prototype, Handoff, Teacher-in-the-loop
- Voice: Direct, warm, specific, first-person plural ("we"), contractions
- K-12 track: philosophical, outcomes-forward (Dan's voice)
- Sprint track: operational, timebox-and-price forward (Matt's voice)

**Pending items (not yet published):**
- Case studies: awaiting permission from CrewFit (Ben), Concord (Gabriela + Ruth), Jim Zimmerman
- Pull quote on homepage: [COLLECT FROM CLIENT]
- Matt's SMB email: [CONFIRM WITH MATT]
- Sprint diagnostic pricing: [PRICE PENDING]

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
React 18, TypeScript, Vite, Wouter routing. Shadcn/ui (New York style), Radix UI, Tailwind CSS. Light editorial theme — ivory paper / forest green / warm ink. Fraunces + Geist + JetBrains Mono fonts (Google Fonts). Mobile-first, no dark mode toggle needed (light-only site). Framer-motion used in legacy demo pages only.

### Backend Architecture
Express.js + TypeScript + ESM. Vite middleware for HMR in development. Storage abstracted via IStorage interface with PostgreSQL (Drizzle ORM + Neon serverless). RESTful JSON API with shared Drizzle-Zod schemas.

### Database Schema
- `Users`: Authentication
- `Leads`: Email/role/school/referrer for waitlist signups
- `Preorders`: Science Kit pre-orders
- `PdInquiries`: Professional development inquiries
- `AutograderInquiries`: Navigator Auto-Grader demo requests
- `MathMovesInquiries`: Math Moves pilot signups
- `InvestorInquiries`: Investor interest forms
- `ConsultingInquiries`: Consulting inquiry form submissions
- `CobuilderInquiries`: /cobuilder page form submissions

### UI/UX Decisions
Light theme: #F7F3EC ivory paper background, #2D4A3E forest green primary, #1A1A1A warm ink body text. Fraunces for display headlines. Geist for body. JetBrains Mono for labels and meta text. Horizontal rules as section dividers. Editorial, no gradients.

## External Dependencies

### Frontend Libraries
- **Radix UI**: Primitive component library (Accordion, Tooltip, etc.)
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form & Zod**: Form management and validation
- **Wouter**: Lightweight client-side routing
- **TanStack Query**: Server state management
- **Framer Motion**: Used in legacy demo pages

### Backend Services
- **Neon Database**: Serverless PostgreSQL
- **Drizzle ORM**: Type-safe database toolkit
- **OpenAI**: AI model integration (CoachingOS demo and NaviGrade demo)

### Fonts
- **Fraunces** (display/headlines): Google Fonts
- **Geist** (body): Google Fonts
- **JetBrains Mono** (labels/meta): Google Fonts

### Build Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Production server bundling
- **TSX**: TypeScript execution for Node.js

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal`
- `@replit/vite-plugin-cartographer`
- `@replit/vite-plugin-dev-banner`
