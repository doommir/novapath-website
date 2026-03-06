# NovaPath Consulting

## Overview
This application is a single-page consulting landing page for NovaPath, targeting K-12 district leaders for AI consulting services. The homepage (/) is the NovaPath Consulting page.

**Active Routes:**
1. **NovaPath Consulting** (Homepage at `/`): Premium dark-purple single-page consulting site for K-12 AI consulting services. Dark theme (#0F0A1A background, #7C5CFF primary accent), Inter font, framer-motion animations. Section order: Sticky Nav → Hero (text-only, gradient background) → Problem Cards → Readiness CTA → About Dan → Services (6 cards with Lucide icons) → Methodology (4-step) → Results (6 tools) → Stats Bar → Testimonials (EdWeek quote only) → Pricing Tiers (3 cards, middle "Go Deeper" featured) → FAQ Accordion → Bridge CTA → Contact Form → Footer.
2. `/consulting` → Client-side redirect to `/` (for backward compatibility)
3. `/coachingOSdemo` → CoachingOSDemo
4. `/navigrade` → NaviGradeDemo
5. `/about` → AboutUs (legacy)
6. `/*` → NotFound

**Key Design Decisions:**
- Hero: text-only, no headshot. Dan's photo lives in the About Dan section.
- All cards: clean dark `#1A1425` backgrounds, `1px solid rgba(255,255,255,0.06)` borders, no colored top borders
- Services: 6 cards in 3×2 grid with Lucide icons (Map, Hammer, FileText, BookOpen, Lightbulb, Library)
- Testimonials: only the real EdWeek quote, no placeholder "coming soon" cards
- Pricing: middle "Go Deeper" card featured with Most Popular badge and filled purple button
- FAQ: minimal Radix accordion with no heavy card styling
- Scroll: smooth scroll behavior via `html { scroll-behavior: smooth; }` in index.css
- Calendly: all CTAs link to `https://calendly.com/novapath`
- Nav: Services / Results / About anchor links + Newsletter (smarterbydesign.app) + AI Readiness (checklist.smarterbydesign.app) external links + "Book a Call" CTA

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built with React 18, TypeScript, Vite, and Wouter for routing. UI components utilize Shadcn/ui (New York style), Radix UI primitives, and Tailwind CSS, featuring a mobile-first, dark-themed design with purple/violet gradients and the Inter font. Framer-motion is used for scroll-triggered animations. It employs a single-page application structure and a component-based architecture with path aliasing.

### Backend Architecture
The backend uses Express.js and TypeScript with ESM. It integrates Vite middleware for HMR in development and includes custom logging and error handling. Storage is abstracted via an `IStorage` interface, supporting in-memory storage and prepared for PostgreSQL using Drizzle ORM and Neon serverless. The API is RESTful, uses JSON, and leverages shared, Drizzle-Zod generated schemas for type safety and validation.

### Database Schema
The system uses Drizzle ORM for PostgreSQL with the following data models:
-   `Users`: For authentication.
-   `Leads`: Stores email, role, optional school, and referrer for waitlist signups.
-   `Preorders`: Stores email, name, and quantity for Science Kit pre-orders.
-   `PdInquiries`: Stores email, name, school, role, and pain point for PD inquiries.
-   `AutograderInquiries`: Stores email, name, school, role, grade level, and optional additional info for Navigator Auto-Grader demo requests.
-   `MathMovesInquiries`: Stores email, name, school, role, grade level, and optional additional info for Math Moves pilot signups.
-   `InvestorInquiries`: Stores email, name, check size, accredited investor status (boolean), and optional notes for investor interest form submissions.
-   `ConsultingInquiries`: Stores name, role, district, email, and optional challenge for consulting page inquiry form submissions.
All tables use varchar IDs with gen_random_uuid(), type-safe schemas, and Zod validation, with schema-first development.

### UI/UX Decisions
Dark theme with #0F0A1A background, #1A1425 card backgrounds, #7C5CFF primary purple, #A78BFA secondary purple, #B4B0C4 body text, #FFFFFF headlines. Inter font. Framer-motion scroll animations. Mobile-first responsive layout.

## External Dependencies

### Frontend Libraries
-   **Radix UI**: Primitive component library (Accordion for FAQ).
-   **Lucide React**: Icon library (service card icons).
-   **Tailwind CSS**: Utility-first CSS framework.
-   **React Hook Form & Zod**: Form management and validation.
-   **Wouter**: Lightweight client-side routing.
-   **TanStack Query**: Server state management.
-   **Framer Motion**: Scroll-triggered animations.

### Backend Services
-   **Neon Database**: Serverless PostgreSQL provider.
-   **Drizzle ORM**: Type-safe database toolkit.
-   **OpenAI**: AI model integration (for CoachingOS demo and NovaPath demo).

### Build Tools & Developer Experience
-   **Vite**: Frontend build tool and dev server.
-   **esbuild**: Production server bundling.
-   **TSX**: TypeScript execution for Node.js.

### Replit-Specific Integrations
-   `@replit/vite-plugin-runtime-error-modal`
-   `@replit/vite-plugin-cartographer`
-   `@replit/vite-plugin-dev-banner`

### Fonts & Assets
-   **Google Fonts (Inter)**: Primary typography.
-   **Local Assets**: Dan Whitlock presenting photo (`copyofdan_1770090391461.png`).
