@AGENTS.md

# IFEN project rules

- All new IFEN pages and sections must inherit the established visual language and Framer Motion interaction language of the existing website unless the user explicitly requests a different animation behavior for a specific section.

## Design System as the Default Source

The coded design system is the source of truth for anything without a Paper design. Screens that already have Paper frames (course payment and bank-transfer modals, Training & Other Offers filters, therapist directory, expanded map) are implemented to match Paper exactly, built with the coded system. Figma is not a visual reference.

Source order when deciding how something should look or behave:

0. Paper frames, for screens explicitly designed there.
1. Coded design system: `src/styles/tokens.css` and the components in `src/components/`.
2. Existing pages (home, BCIA Mentoring, Module 1, Webinar, QEEG, the course listing).
3. Figma, only to clarify content or intent, never as the visual reference.
4. Mobbin, for patterns the system does not cover yet. Cite the screens used.
5. Generic assumptions, last.

## Direct Design + Implementation Rule

Design new pages directly in code. Build from existing components and tokens first; extend a component with an optional prop or variant before creating a new one. A new component is allowed only when no existing one fits, and it must use the same tokens, card treatment, band order, type scale and Reveal motion. No generic SaaS layouts, random card grids, arbitrary gradients, glassmorphism, oversized type or decorative animation. Do not reinvent IFEN. Extend IFEN.

Keep content data-driven (`src/data/`), i18n-safe (EN/DE/ES/EL, long German compounds must wrap) and responsive. Do not trim source content.

## Consistency Rule

Every page uses the same band sequence (ink hero, then mist, cream and white bands), section header (label, heading, intro), card style (4px radius, white, 1px border shadow), CtaButton, form input style and breakpoints (64rem, 48rem, 34rem, 30rem). The same thing must look and behave the same everywhere. If a change to a shared component is needed, check every page that uses it.
