# NovaPath Landing Pages

## Overview
This application hosts five distinct product landing pages under the NovaPath brand:
1.  **NovaPath (Education Operations)**: An AI-powered education operations toolkit for K-12 schools, focused on lead generation through an interactive, voice-driven demo and early access waitlist. It emphasizes human-centered AI, freeing educators to focus on core tasks.
2.  **AI-Infused Science Kit**: A product page for a hands-on science experiment kit with an integrated AI assistant, promoting AI literacy and human-in-the-loop design for K-5 students, aligned with NGSS. It includes pre-order functionality.
3.  **Professional Development**: A landing page for educator professional development sessions focused on AI literacy through cobuilding solutions to real school challenges (e.g., attendance tracking, parent communication), featuring a 4-step process and an inquiry form for custom sessions.
4.  **Navigator Auto-Grader**: A comprehensive landing page showcasing an AI-powered grading system that uses OCR (Google Vision) and speech recognition (Whisper) to provide instant, rubric-based feedback on handwritten student work, featuring an 8-step workflow, rubric framework, sample feedback, tech stack details, and demo inquiry form.
5.  **Math Moves**: A landing page for a movement-based math learning system that translates assessment data into physical PE lessons using AI analysis, featuring a 4-step workflow (pre-test, AI analysis, movement lesson, post-test), pilot results showing 43% → 93% mastery gains, embodied learning benefits, and pilot signup form.

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