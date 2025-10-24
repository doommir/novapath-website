# NovaPath Landing Page - Design Guidelines

## Design Approach
**Sophisticated Dark Aesthetic**: Inspired by cutting-edge tech brands with a premium, minimal approach. Features a near-black background with soft glowing orbs in teal and purple/magenta, creating a sophisticated, immersive experience. This is a conversion-focused landing page requiring clear visual hierarchy and trust-building design.

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- Background: Near-black (240 10% 3%) - creates sophisticated, immersive base
- Primary: Vibrant purple (262 90% 66%) - for CTAs and key elements
- Accent: Bright teal/cyan (188 94% 43%) - for highlights and accents
- Text Primary: Pure white (0 0% 98%) - maximum contrast for readability
- Text Secondary: Light gray (240 5% 70%) - for supporting information

**Glowing Orb Effects:**
- Teal glow: Soft radial gradients using hsl(188, 94%, 55%) at 35% opacity, 1600x1200px ellipse
- Magenta glow: Soft radial gradients using hsl(300, 75%, 60%) at 32% opacity, 1400x1000px ellipse (animated pulse)
- Purple glow: Soft radial gradients using hsl(262, 90%, 75%) at 28% opacity, 1300x900px ellipse
- Large, diffuse ellipses with 50% gradient stop for concentrated, luminous glow
- Layered over black-to-background gradient base for enhanced contrast and visibility

**Accent & State Colors:**
- Success: Green (145 65% 50%)
- Error: Red (0 70% 55%)
- Border/Divider: Subtle dark gray (240 10% 12%)

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
- Near-black background with multiple soft glowing orbs positioned strategically
- Three overlapping radial gradients create depth (teal, purple, magenta)
- Centered layout with max-w-6xl container
- Pure white headline text with strong hierarchy
- Light gray subheadline
- Primary CTA button with purple glow shadow effect
- Generous vertical spacing (py-20 to py-32)
- Dashboard image with subtle glow effect on hover

**Lead Capture Form:**
- Clean input fields with border-2 and focus states (indigo ring)
- Dropdown select styled consistently with inputs
- Primary submit button (full-width on mobile)
- Inline success message (green background, rounded, with checkmark)
- Inline error message (red text, icon)
- Privacy promise text directly below form (text-sm, secondary color)
- Honeypot field (visually hidden)

**How It Works:**
- 3-card layout with minimal glass-morphism effect
- Icon containers with subtle borders (not gradient backgrounds)
- Purple-colored icons for visual consistency
- Semi-transparent card backgrounds with backdrop blur
- Subtle card borders for depth
- Short headline and description per card

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