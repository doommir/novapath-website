# NovaPath Landing Pages

## Overview

This application hosts two separate product landing pages under the NovaPath brand:

1. **NovaPath (Education Operations)** - A single-page landing site for an AI-powered education operations toolkit for K-12 schools. Its primary purpose is lead generation, capturing email addresses for an early access waitlist. The site features a modern SaaS design, including a hero section, an interactive voice-driven demo, and a lead capture form. It emphasizes a human-centered AI approach, promoting the idea that "AI supports your school — freeing educators to focus on what matters," with AI serving as a supportive tool built by and for educators.

2. **AI-Infused Science Kit** - A product landing page at `/science-kit` for a hands-on science experiment kit with an integrated AI assistant. The page features pre-order functionality, collecting email addresses, names, and quantity preferences. It showcases kit contents, learning outcomes, and testimonials from parents and teachers.

The application is a full-stack TypeScript project with a React frontend and an Express backend, designed with a mobile-first, responsive approach.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend uses React 18 with TypeScript, Vite for building, and Wouter for routing. UI components leverage Shadcn/ui (New York style), Radix UI primitives, and Tailwind CSS for styling with a mobile-first, dark-themed design (purple/violet with indigo-to-blue gradients, Inter font). Form management is handled by React Hook Form with Zod for validation. Key decisions include a single-page application structure, component-based architecture for reusability, and path aliasing for clear imports.

### Backend Architecture
The backend is built with Express.js and TypeScript, utilizing ESM for modern module management. It integrates Vite middleware for HMR during development and includes custom logging and error handling. Storage is abstracted with an `IStorage` interface, currently using in-memory storage but prepared for PostgreSQL via Drizzle ORM and Neon serverless. The API follows RESTful conventions with JSON for data transfer and uses shared, Drizzle-Zod generated schemas for type safety and validation.

### Database Schema
The system uses Drizzle ORM configured for PostgreSQL. Data models include:
- `Users` table (for authentication)
- `Leads` table (for NovaPath waitlist signups) - tracks email, role, optional school, and referrer
- `Preorders` table (for Science Kit pre-orders) - tracks email, name, and quantity

All tables use UUIDs, type-safe schemas, and Zod validation. Schema-first development ensures type safety, and separate insert schemas prevent manipulation of auto-generated fields.

### UI/UX Decisions
The design focuses on a mobile-first, responsive layout with a 9:16 mobile aspect ratio scaling to desktop. The color palette is dark-themed with purple/violet and indigo-to-blue gradients. Typography uses the Inter font, and spacing adheres to Tailwind's default scale. Components include hover and active elevation effects for interactivity. The interactive demo shifts perspective to a student experience ("Maya Chen"), using voice interaction (TTS and Web Speech API) to demonstrate AI workflows for attendance, counselor alerts, and peer support, with a teacher review dashboard emphasizing human oversight and transparency.

## External Dependencies

### Frontend Libraries
- **Radix UI**: Primitive component library (accordion, dialog, dropdown, select, toast, tooltip).
- **Lucide React**: Icon library.
- **Class Variance Authority (CVA)**: Component variant management.
- **CMDK**: Command palette component.
- **Embla Carousel React**: Carousel/slider functionality.
- **React Day Picker**: Date picker.
- **Vaul**: Drawer component primitive.
- **React Hook Form**: Form state management.
- **Zod**: Schema validation.
- **@hookform/resolvers**: Zod integration with React Hook Form.
- **Wouter**: Lightweight client-side routing.
- **TanStack Query (React Query)**: Server state management.

### Backend Services
- **Neon Database**: Serverless PostgreSQL provider (`@neondatabase/serverless`).
- **Drizzle ORM**: Type-safe database toolkit.
- **Connect PG Simple**: PostgreSQL session store (for future use).
- **OpenAI**: AI model integration via Replit AI Integrations (for emotional validation and peer prompt generation).

### Build Tools & Developer Experience
- **Vite**: Frontend build tool and dev server.
- **esbuild**: Production server bundling.
- **TSX**: TypeScript execution for Node.js.
- **PostCSS & Autoprefixer**: CSS processing.
- **Tailwind CSS**: Utility-first CSS framework.

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay.
- **@replit/vite-plugin-cartographer**: Development tooling.
- **@replit/vite-plugin-dev-banner**: Development environment banner.

### Fonts & Assets
- **Google Fonts (Inter)**: Primary typography.
- **Local Assets**: Hero dashboard mockup image (`attached_assets/generated_images/`).

### Key Integration Notes
- Database URL configured via `DATABASE_URL` environment variable.
- Form submission currently uses in-memory storage, designed for PostgreSQL migration.
- Referral tracking supports `?ref=` URL parameter.
- OpenAI integration uses Replit AI Integrations with graceful fallback.
- Demo API endpoints include `/api/demo/validate-emotion`, `/api/demo/peer-prompts`, `/api/demo/results-intro`, and `/api/demo/review-message`.

## Pages and Routes

- `/` - NovaPath Education Operations landing page with interactive demo
- `/science-kit` - AI-Infused Science Kit product page with pre-order form

## Recent Changes

### November 4, 2025 - AI-Infused Science Kit Landing Page
- **New Product Page**: Created separate landing page at `/science-kit`
  - Hero section with CTA and embedded demo video (autoplay loop)
  - What Makes Different section (AI Assistant, Tactile+Tech, Built for Learning)
  - What's Inside section (kit contents with icons)
  - Learning Outcomes section
  - Testimonials from parents and teachers
  - Pre-order form collecting email, name, and quantity
  - Footer with contact links
- **Database Updates**:
  - Added `preorders` table to schema
  - Created storage interface methods for preorder CRUD
  - Implemented POST `/api/preorders` endpoint with validation
- **Design**: Follows same dark theme with purple/violet gradients, mobile-first responsive layout
- **Video**: Two-column hero layout with text content left, demo video right (responsive)

### November 4, 2025 - Natural Group Check-In Flow & Dynamic Names
- **Restructured Demo Flow**: More realistic group check-in experience
  - First prompt asks for name + feeling word (e.g., "I'm Alex and I'm feeling stressed")
  - Shows 2 mock peer check-ins after user's initial share (Marcus, Jordan)
  - AI then asks user to share more details about their feelings
  - Detailed response triggers validation, facilitation, and results
  - Creates natural pacing: introduce → observe peers → share deeper → get support
- **Dynamic Name Throughout**: Completely removed hardcoded "Maya"
  - System extracts student name from initial check-in using regex
  - All API calls now pass dynamic `studentName` parameter
  - Validation, peer prompts, results, and review all use actual student name
  - Sample responses use "Alex" instead of "Maya" for clarity
  - Fallback messages are generic or use extracted name
- **New Demo Steps**: 
  - `initial_checkin`: First share (name + feeling word)
  - `peer_checkins`: Display 2 mock peers checking in
  - `ask_more`: AI prompts for more details
  - `listening_more`: User shares detailed concerns
  - All subsequent steps remain: validating, facilitating, results, review, complete
- **Backend Updates**:
  - `generatePeerPrompts()` now accepts `studentName` parameter
  - `/api/demo/peer-prompts` endpoint requires `studentName` in request body
  - All fallbacks and OpenAI prompts use dynamic student names

### November 4, 2025 - Voice Naturalness & Peer Support Fix
- **Fixed Peer Facilitation**: Resolved empty prompts array issue
  - Clarified OpenAI system prompt with explicit "CRITICAL" instruction to return one prompt per peer
  - Added validation to ensure non-empty prompts before returning
  - Enhanced error handling with contextual fallback messages
  - Peer support now working: Marcus gets contextual prompt based on student's check-in
- **More Human Voice**: Varied speech characteristics for different message types
  - Validation: Slower, warmer (rate: 1.05, pitch: 1.05) - empathetic tone
  - Peer prompts: Upbeat (rate: 1.1, pitch: 1.08) - encouraging
  - Results: Neutral (rate: 1.08, pitch: 1.02) - informative
  - Review: Calm (rate: 1.0, pitch: 1.03) - reassuring
  - Added 400ms natural pauses between voice segments for breathing room
  - Variation in pitch and rate makes each segment feel distinct, less robotic
- **Performance Optimizations**: 
  - Parallelized all API calls (validation, peer prompts, results intro run simultaneously)
  - Reduced animations: 0.2s transitions, 1.2s spinner, quick fade-ins
  - Streamlined visuals: concise titles, compact layouts, smaller icons
  - Total demo time: ~3-4 seconds from check-in to results