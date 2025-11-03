# NovaPath Landing Page

## Overview

NovaPath is a single-page landing site for an AI-powered education operations toolkit targeting K-12 schools. The application is a lead generation platform designed to capture email addresses for early access waitlist signups. It features a modern SaaS design with a hero section, interactive demo experience, human-centered AI principles, and a functional lead capture form. The site emphasizes a human-centered approach where "AI supports your school — freeing educators to focus on what matters." The messaging communicates that humans remain in control while AI serves as a supportive tool, built with educators for educators. The site is built as a full-stack TypeScript application with React frontend and Express backend, following a mobile-first responsive design approach.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Stack:**
- React 18 with TypeScript for component-based UI development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management

**UI Component System:**
- Shadcn/ui component library (New York style variant) for consistent design patterns
- Radix UI primitives providing accessible, unstyled components
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theming with HSL color values

**Design System:**
- Mobile-first responsive layout (9:16 mobile, scales to desktop)
- Color palette based on purple/violet dark theme with indigo-to-blue gradients
- Typography using Inter font family from Google Fonts
- Spacing system based on Tailwind's default scale (2, 4, 6, 8, 12, 16, 20, 24)
- Component library includes hover and active elevation effects

**Form Management:**
- React Hook Form for form state and validation
- Zod schemas for runtime type validation
- Hookform Resolvers for integrating Zod with React Hook Form
- Custom form components wrapping Radix UI primitives

**Key Design Decisions:**
- Single-page application minimizes complexity and load times for conversion optimization
- Component-based architecture enables reusability and maintainability
- Path aliasing (@/, @shared, @assets) provides clean imports and separation of concerns
- Test IDs embedded in components for easy testing and verification

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server and routing
- TypeScript for type safety across the stack
- ESM (ES Modules) for modern JavaScript module system

**Development Setup:**
- Vite middleware integration for HMR (Hot Module Replacement) in development
- Custom logging middleware for request/response tracking
- Error handling middleware for consistent error responses
- Separate build process using esbuild for production server bundle

**Storage Layer:**
- In-memory storage implementation (MemStorage class) for development
- Interface-based storage abstraction (IStorage) allows easy swapping to persistent storage
- Schema-first approach with Drizzle ORM types and validators
- Prepared for PostgreSQL via Neon serverless adapter (configured but not yet implemented)

**API Design:**
- RESTful conventions with /api prefix for all endpoints
- JSON request/response format
- Type-safe data transfer using shared schema definitions
- Validation using Drizzle-Zod generated schemas

**Key Design Decisions:**
- Storage interface pattern enables switching from in-memory to database without refactoring business logic
- Shared schema between client and server ensures type consistency
- Middleware-based architecture provides modularity and separation of concerns
- Development/production environment separation for optimal developer experience

### Database Schema

**Drizzle ORM Configuration:**
- PostgreSQL dialect configuration
- Schema location: `shared/schema.ts`
- Migration output directory: `./migrations`
- Neon serverless driver for PostgreSQL connectivity

**Data Models:**

*Users Table:*
- Primary purpose: Authentication and user management (foundational schema)
- Fields: id (UUID, auto-generated), username (unique), password
- Validation: Zod schema for insert operations

*Leads Table:*
- Primary purpose: Waitlist email capture and lead tracking
- Fields: id (UUID, auto-generated), email, role, school (optional), referrer (optional), submittedAt (timestamp)
- Validation: Email format validation, required role selection
- Supports referral tracking via URL parameters

**Key Design Decisions:**
- Schema-first development with Drizzle ensures type safety
- Separate insert schemas prevent clients from manipulating auto-generated fields
- Optional referrer field enables marketing attribution tracking
- Timestamp tracking for lead submission analytics

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Comprehensive primitive component library (accordion, dialog, dropdown, select, toast, tooltip, etc.)
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority (CVA)**: Component variant management
- **CMDK**: Command palette component
- **Embla Carousel React**: Carousel/slider functionality
- **React Day Picker**: Date picker component
- **Vaul**: Drawer component primitive

### Data & Forms
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation library
- **@hookform/resolvers**: Bridges React Hook Form with Zod validation

### Backend Services
- **Neon Database**: Serverless PostgreSQL provider (configured via @neondatabase/serverless)
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL support
- **Connect PG Simple**: PostgreSQL session store (for future session management)

### Build Tools & Developer Experience
- **Vite**: Frontend build tool and dev server
- **esbuild**: Production server bundling
- **TSX**: TypeScript execution for Node.js
- **PostCSS & Autoprefixer**: CSS processing
- **Tailwind CSS**: Utility-first CSS framework

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment banner

### Fonts & Assets
- **Google Fonts (Inter)**: Primary typography
- **Local Assets**: Hero dashboard mockup image stored in `attached_assets/generated_images/`

### Key Integration Notes
- Database URL configuration via environment variable (DATABASE_URL)
- Form submission currently uses in-memory storage but architected for easy migration to PostgreSQL
- Referral tracking supports `?ref=` URL parameter for marketing attribution

## Recent Changes

### November 3, 2025 - Voice-Interactive Student Demo Implementation
- **Perspective Shift**: Redesigned demo from administrator view to student perspective (visitor experiences check-in as "Maya Chen")
- **Voice Interaction**: 
  - Created TTS helper module (client/src/lib/tts.ts) with optimized browser voice selection and humanized speech patterns
  - Integrated Web Speech API for voice input with live transcription
  - Voice output at key transition points (greeting, processing, results, review)
  - Fallback options: "Use Sample Response" button and manual typing for accessibility
- **Three Automated Workflows**: One 30-second voice check-in generates:
  1. **Attendance Logging** (auto-approved): Timestamp, mood indicator, engagement level
  2. **Counselor Alert** (needs review): Medium priority academic stress flag with context and suggested action
  3. **Peer Support Facilitation** (needs review): Detected collaboration, partnership concerns, mentor suggestions
- **Human Oversight Dashboard**: Teacher review screen shows all three workflows with individual approve/decline controls
- **Complete Transparency**: Students see exactly what AI does with their data before any action is taken
- **State Management**: Includes cleanup for speech synthesis, recognition, and timeouts to ensure clean demo resets
- Updated Hero section with "See How It Works" secondary CTA button
- Changed "Equity & Access" to "Fairness & Access" in Principles section
- All interactive elements include data-testid attributes for testing
- Comprehensive end-to-end testing completed

### Design Philosophy
- Human-centered AI messaging throughout all sections
- Voice-interactive demo reinforces "AI suggests, humans decide" principle
- Complete transparency: students see exactly what AI processes from their check-in
- Every automation shows human oversight and final approval required
- Trust-building through visibility: nothing happens without teacher review
- Ethical workflow design built with educators for educators