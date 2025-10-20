# NovaPath Landing Page - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern SaaS leaders like Linear (clean typography, subtle animations), Stripe (trust-building design, clear CTAs), and Vercel (gradient accents, minimal aesthetic). This is a conversion-focused landing page requiring clear visual hierarchy and trustworthy design.

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- Background: Pure white (#FFFFFF)
- Gradient Accent: Soft indigo-to-blue gradient (230 60% 65% → 215 70% 60%)
- Primary CTA: Indigo (230 60% 55%)
- Text Primary: Near-black (220 15% 15%)
- Text Secondary: Medium gray (220 10% 45%)

**Accent & State Colors:**
- Success: Green (145 65% 45%)
- Error: Red (0 70% 55%)
- Border/Divider: Light gray (220 10% 90%)

### B. Typography

**Font Family:** Inter (Google Fonts) with system font fallback
- Headline (Hero): 700 weight, 48-56px desktop / 32-36px mobile, tight line-height (1.1)
- Subheadline: 400 weight, 18-20px desktop / 16-18px mobile, relaxed line-height (1.5)
- Section Labels: 600 weight, 11-12px, uppercase, wide letter-spacing (0.1em)
- Body: 400 weight, 16px, comfortable line-height (1.6)
- Button Text: 500 weight, 16px

### C. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Section vertical padding: py-16 mobile, py-24 desktop
- Component spacing: gap-6 to gap-8
- Container max-width: max-w-6xl with px-6 padding
- Form field spacing: space-y-4

**Grid Structure:**
- Single column mobile (base)
- 3-column grid for How It Works section (md:grid-cols-3)
- Form max-width: max-w-md

### D. Component Library

**Hero Section:**
- Centered layout with max-w-3xl for text content
- Gradient background applied to hero area only (indigo → blue, subtle, diagonal)
- Headline with strong hierarchy
- Subheadline in secondary text color
- Primary CTA button (rounded-lg, px-8, py-3) with scroll-to-form behavior
- Generous vertical spacing (py-20 to py-32)

**Lead Capture Form:**
- Clean input fields with border-2 and focus states (indigo ring)
- Dropdown select styled consistently with inputs
- Primary submit button (full-width on mobile)
- Inline success message (green background, rounded, with checkmark)
- Inline error message (red text, icon)
- Privacy promise text directly below form (text-sm, secondary color)
- Honeypot field (visually hidden)

**How It Works:**
- 3-card layout with icons/emojis at top
- Step number or icon in circle (indigo background)
- Short headline and description per card
- Subtle card borders or light background

**Social Proof Strip:**
- Light gray background section
- Grayscale placeholder logos (opacity 60-70%)
- Centered text with logo grid
- py-12 spacing

**Footer:**
- Minimal, centered layout
- Links separated by bullet points or vertical bars
- Secondary text color
- py-8 spacing

### E. Interactive Elements

**Buttons:**
- Primary: Indigo background, white text, rounded-lg, hover state (slightly darker)
- Outline (if needed): Border-2 indigo, indigo text, transparent background with blur if on images
- Focus states: Visible ring for accessibility

**Form Validation:**
- Required field indicators (asterisk or "Required" label)
- Real-time validation feedback
- Error states: red border, error message below field
- Success state: green checkmark, success message replaces form

**Scroll Behavior:**
- Smooth scroll to form on CTA click
- No distracting animations; keep interactions purposeful

## Images

**Hero Section Image:**
- Use a modern dashboard/interface screenshot or abstract geometric illustration showing data/automation
- Placement: Right side on desktop (50% width), below headline on mobile
- Style: Slightly elevated (shadow-xl), rounded corners (rounded-xl)
- Shows product interface or conceptual representation of workflows/data insights

**How It Works Icons:**
- Use emoji or simple line icons (Heroicons)
- Not photos; keep clean and minimal

## Special Requirements

**Mobile-First Implementation:**
- 9:16 mobile viewport must look polished
- Touch-friendly tap targets (min 44px height)
- Readable text without zooming

**Demo Features:**
- Pre-fill email field capability for demo (test+video@novapath.ai)
- URL parameter tracking (?ref=) stored in hidden field
- Clear visual feedback on form submission
- CTA below form: "Get the exact prompt + code by joining the email list" (text-sm, secondary color)

**Conversion Optimization:**
- Hero CTA button highly visible (color contrast, size)
- Form above the fold on desktop or one scroll away
- Clear value proposition in headline
- Trust signals (privacy promise, social proof) near form
- Minimal friction: only essential form fields