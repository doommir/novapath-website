# NovaPath Landing Pages

## Overview
This application hosts five distinct product landing pages under the NovaPath brand, with the Professional Development page as the homepage, plus Blog and About Us pages:

1.  **Professional Development** (Homepage at `/`): A landing page for educator professional development sessions focused on AI literacy through cobuilding solutions to real school challenges (e.g., attendance tracking, parent communication). Features include: hero video demo, "Why Cobuilding Builds AI Literacy That Lasts" section, two educator-built app examples (Loom embeds), 4-step cobuilding process with demonstration video showing actual AI coding agent usage, real solution examples, Google Calendar scheduling button for direct session booking, and inquiry form for custom sessions.
2.  **NovaPath (Education Operations)** (at `/novapath`): An AI-powered education operations toolkit for K-12 schools, focused on lead generation through an interactive, voice-driven demo and early access waitlist. It emphasizes human-centered AI, freeing educators to focus on core tasks.
3.  **AI-Infused Science Kit** (at `/science-kit`): A product page for a hands-on science experiment kit with an integrated AI assistant, promoting AI literacy and human-in-the-loop design for K-5 students, aligned with NGSS. It includes pre-order functionality.
4.  **Navigator Auto-Grader** (at `/autograder`): A comprehensive landing page showcasing an AI-powered grading system that uses OCR (Google Vision) and speech recognition (Whisper) to provide instant, rubric-based feedback on handwritten student work, featuring an 8-step workflow, rubric framework, sample feedback, tech stack details, and demo inquiry form.
5.  **Math Moves** (at `/math-moves`): A landing page for a movement-based math learning system that translates assessment data into physical PE lessons using AI analysis, featuring a 4-step workflow (pre-test, AI analysis, movement lesson, post-test), pilot results showing 43% → 93% mastery gains, embodied learning benefits, and pilot signup form.
6.  **Blog** (at `/blog`): A blog page that displays embedded LinkedIn posts with optional metadata (title, description, date). Users can easily add new posts by updating the posts array in Blog.tsx with LinkedIn embed URLs.
7.  **About Us** (at `/about`): An about page showcasing NovaPath's values (Educators First, Real Solutions, AI Literacy), featuring a highlighted EdWeek article about founder Dan Whitlock (August 2025), upcoming events section showing Dan's conference presentations (FETC 2026 and Charter Conference 2026), and embedded LinkedIn posts in a "Recent Updates" section. The EdWeek article "Want Teachers to Learn How to Use AI for Instruction? Let Them Design the Tools" profiles Dan's work at Navigator Schools. Upcoming events include: (1) FETC 2026 - "Rapid AI Micro-Pilots: Classroom to District in Ten Weeks" (January 13, 2026, Orlando, FL), and (2) Charter Schools Conference 2026 - "Designing the Future Before It Designs Us: AI at Navigator Schools" (February 24, 2026, Long Beach, CA).
8.  **Investor Portal** (at `/invest`): An investor portal for NovaPath's Rolling SAFE fundraise featuring: $7M valuation cap, check sizes from $5,000-$50,000, raise window through January 15. Includes investor interest form (name, email, check size selection, accredited investor confirmation, optional notes), SAFE terms display, "Why NovaPath" section with 6 investment reasons (Proven Traction, Experienced Leadership, Clear Market Opportunity, Unique Approach, Investor-Friendly Terms, Near-Term Milestones), and direct contact information for founder Dan Whitlock (founder@novapath.ai, 831-402-1133).
9.  **NovaPath Consulting** (at `/consulting`): A premium single-page consulting landing page for AI consulting services targeting K-12 districts. Features a dark purple theme (#0F0A1A background, #7C5CFF primary accent) with DM Sans font. Sections include: Hero with Dan's headshot and credibility bar, "The Problem" with 3 pain-point cards, "Meet Dan Whitlock" bio section, "Why Cobuilding" 3-column layout, "The Cobuilding Process" 4-step flow, "What We've Built" 6 solution cards, "What Districts Get" included/excluded lists, Testimonials, AI Readiness Checklist CTA (linking to checklist.smarterbydesign.app as a lower-commitment first step), and consultation inquiry form. Navigation includes anchor links to all major sections.

The project is a full-stack TypeScript application with a React frontend and an Express backend, designed for mobile-first responsiveness.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built with React 18, TypeScript, Vite, and Wouter for routing. UI components utilize Shadcn/ui (New York style), Radix UI primitives, and Tailwind CSS, featuring a mobile-first, dark-themed design with purple/violet and indigo-to-blue gradients, and the Inter font. Form management uses React Hook Form with Zod for validation. It employs a single-page application structure and a component-based architecture with path aliasing.

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
The design is mobile-first and responsive, featuring a dark theme with purple/violet and indigo-to-blue gradients. Typography uses the Inter font. Interactive elements include hover/active elevation effects. The interactive demo simulates a student experience (e.g., "Maya Chen") with voice interaction (TTS and Web Speech API) for AI-driven workflows (attendance, counselor alerts, peer support), emphasizing human oversight via a teacher review dashboard. The AI assistant uses sentiment analysis to adapt its tone and provides natural, human-like voice responses via OpenAI's TTS.

## External Dependencies

### Frontend Libraries
-   **Radix UI**: Primitive component library.
-   **Lucide React**: Icon library.
-   **Tailwind CSS**: Utility-first CSS framework.
-   **React Hook Form & Zod**: Form management and validation.
-   **Wouter**: Lightweight client-side routing.
-   **TanStack Query**: Server state management.
-   **Embla Carousel React**: Carousel functionality.
-   **React Day Picker**: Date picker.
-   **Vaul**: Drawer component primitive.

### Backend Services
-   **Neon Database**: Serverless PostgreSQL provider.
-   **Drizzle ORM**: Type-safe database toolkit.
-   **OpenAI**: AI model integration for emotional validation and peer prompt generation via Replit AI Integrations.

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
-   **Local Assets**: Hero dashboard mockup images.