# IFEN Design System Reference

The permanent reference for building IFEN pages. Values are checked against `src/styles/tokens.css` (the coded source of truth, originally from Paper) and the Figma design-system variables (file `BOk1LkYrA0sJBdKGjykCUn`, design-system page). Where the two differ, code wins. Figma is used for content and intent only.

Source order: Paper frames (designed screens only) > coded system (`tokens.css` + `src/components/`) > existing pages > Figma (content) > Mobbin (cite screens) > generic.

## Typography

Family: Inter, set as Inter Display through `font-variation-settings: "opsz" 32` on headings. Figma calls it "Inter Display".

| Role | Size / line height | Weight | Tracking | Casing | Where |
| --- | --- | --- | --- | --- | --- |
| Hero (h1) | `--fs-hero` clamp(2rem, 0.75rem + 5.56vw, 5.75rem) / 0.957 | 700 | -0.022em | Sentence or title case | `CourseHero`, home hero. Figma display/xl 92/88 |
| Section heading (h2) | `--fs-h2` clamp(1.875rem, 1.45rem + 1.25vw, 2.625rem) / 1.238 | 500 | -0.015em | Title case | `SectionHeading`, color `--color-heading`. Figma heading/xl 42/52 |
| Heading lg | 32px | 500 | | | Figma heading/lg |
| Heading md bold | 28/32 | 700 | -0.42px | | Price in booking card |
| Card heading (h3) | 1.25rem / 26px | 600 | -0.02em | Sentence case | `FeatureGrid`, `FocusCards` |
| Heading sm | 24px | 600 | | | Figma heading/sm |
| Body xl | 20px | 500 | | | Lead paragraphs |
| Body lg | 18px | 500 | | | |
| Body | 16 / 26 | 400 | | | `--fs-body`, section intros (muted) |
| Body sm | 14 / 22 | 400 | | | Card text (muted) |
| Label | 14 / 24 | 400 | | | `SectionLabel` pill |
| Label sm | 14 / 16 | 600 | | | |
| Caption | 13 / 20 | 500 | 0.5px | | |
| Eyebrow / badge | 12 / 16 | 600 | 1px | UPPERCASE | Card eyebrows (subtle), hero badge |
| Button lg | 16 / 24 | 600 | | | `CtaButton` |
| Button md | 16 / 24 | 500 | | | `Button` |
| Index numeral | 42 / 52 | 500 | | | `FeatureGrid` numbered, `#d1d5dc` |

Long German compounds must wrap: section headings use `text-wrap: balance`; check DE copy at 320px and add `overflow-wrap` or `hyphens: auto` where a compound overflows. Never set fixed widths on text.

## Color

Tokens (`tokens.css`):

| Token | Value | Use |
| --- | --- | --- |
| `--color-ink` | #0b3941 | Hero band, primary text, dark buttons |
| `--color-deep` | #072a30 | Deeper ink surfaces |
| `--color-accent` | #ffc18c | Primary CTA fill |
| `--color-sparkle` | #cec075 | Label sparkles, hero stat values |
| `--color-tint-teal` | #94d2bd1f | Soft teal tint |
| `--color-white` | #ffffff | White band, cards |
| `--color-cream` | #f8f4e3 | Cream band |
| `--color-mist` | #f9fafb | Mist band |
| `--color-heading` | #4a5565 | Section headings |
| `--color-muted` | #6a7282 | Body copy, intros |
| `--color-subtle` | #99a1af | Eyebrows, meta |
| `--color-on-dark` | #d1d5dc | Text on ink |
| `--color-border` | #e5e7eb | Card borders |
| `--color-border-soft` | #f3f4f6 | Band dividers |
| `--color-hover-tint` | #f1fafa | Hover fill |
| `--color-overlay` / soft | #020618a3 / #02061852 | Modal scrims |

Used in CSS but not yet tokenized (present in Figma variables). Reuse the exact hex; tokenize only in a deliberate pass that checks every page:

- Sage #edf5c4 (lime icon circles, active fills; about 32 uses), sage-alt #e3eab8, #fbffe9
- Teal #009ba7 (Figma action/primary), teal-dark #0b4750, info #0f9fa9
- Gold text #b8a85e, brand gold #c8b100, brown #704d30, brand cream #f3edd2, sunken #f1ecd7
- Label warm border #ddd8d2, input error border #ffba8c
- Error reds #b4232a, #c0262d; Figma destructive #9f0712 / #ffe2e2

## Layout and spacing

- `--content-max` 81rem; inner width `calc(var(--content-max) + var(--gutter) * 2)`
- `--gutter` clamp(1rem, 5vw, 4.5rem)
- `--section-pad` clamp(4rem, 1rem + 7vw, 7rem); `--section-pad-sm` clamp(3rem, 0.75rem + 4.5vw, 4.5rem) (course bands)
- `--nav-h` 70px
- Section header: max-width 52rem (narrow 37.5rem), gap 16; section gap 32
- Figma spacing scale: 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 64, 72, 80

## Radius, borders, shadow

- Cards: 4px radius, white, `box-shadow: inset 0 0 0 2px var(--color-border)` plus `filter: drop-shadow(0 1px 1px #0000000f)` (FeatureGrid); other cards use a 1px border shadow. 4px is the dominant radius.
- Buttons: `--radius-button` 2px. Pills: `--radius-pill` 100px.
- Mist and white bands carry a 1px `--color-border-soft` top border; cream has none.
- Figma elevation 1: 0 2 8 #1F0F110F. Elevation 3: 0 12 32 -4 #00000014 + 0 4 8 #0000000A. Shadow xs: 0 1 2 #0000000f.
- Focus ring: `0 0 0 2px white, 0 0 0 4px var(--color-ink)`.

## Breakpoints

64rem (desktop), 48rem (tablet), 34rem, 30rem. Written as `min-width: 64rem` / `max-width: 47.99rem` and so on. A few legacy queries exist at 39.99, 33.99, 70 and 74.99rem; do not add new ones.

## Band order

Every page: ink hero, then alternating mist, cream and white bands, then `CtaFooter` (photo CTA plus cream footer card). Course pages: `CourseHero` (ink), `CourseOverview decor` (mist), content bands, `Mentors` (cream), `Categories` (white), `CtaFooter`.

## Components

UI primitives (`src/components/ui/`):

- `SectionLabel`: pill with two sparkles, 14/24 muted, inset 1.2px border. Tones light, warm (#ddd8d2), dark, plain. `sm` = 8/16 padding.
- `SectionHeading`: h2 scale above.
- `CtaButton`: label block plus square arrow block, 16/24 semibold; variants accent, ink, light; arrow nudges 3px on hover. Use for lone primary actions.
- `Button`: 10/20 padding, 2px radius, 16/24 medium. Primary (accent) and secondary (white, 1px ink inset). Renders a plain `<a>`, so `mailto:` works.

Course sections (`src/components/course/`), all data-driven from `src/data/coursePage.ts` types:

| Component | Content type | Notes |
| --- | --- | --- |
| `CourseHero` | `CourseHeroContent` | Breadcrumb, badge, h1, description, 3 highlights, booking card (code, prices, 4 facts, CTA) |
| `CourseOverview` | `OverviewContent` | Label, heading, paragraphs, actions (first primary, rest secondary), aside fact list with lime icons, optional note |
| `TopicLoop` | `ArticlesContent` | Prose item plus auto-scrolling list item; pauses on hover/focus/offscreen; static with reduced motion |
| `FeatureGrid` | `FeaturesContent` | 3 or 4 cards; `numbered`; `variant="check"` |
| `FormatSteps` | `FeaturesContent` | Pinned columns with icons (clock, video, star, calendar) |
| `FocusCards` | `FeaturesContent` + image | Pinned photo with eyebrow cards |
| `Instructor` | `InstructorContent` | Portrait, label, heading, role, paragraphs, credential badges |
| `CourseArticles` | `ArticlesContent` | Variants panels, columns, rows, media (copy beside `image`); `numbered` rows; per-item `links` (secondary Buttons); section `note` (highlighted remark) |
| `Curriculum`, `Pathway`, `RoleMarquee`, `Faq` | matching types | Module 1 / QEEG patterns |
| `Mentors` | `SpeakersContent` | Carousel; always at least 4 cards, open seats show "To be announced" |
| `Categories` | `CategoriesContent` | Icon cards (cap, users, brain, pulse, flag) |
| `CtaFooter` | `CtaContent` | Lone action uses CtaButton; with `secondary`, two Buttons |

Booking: every course page books into the demo flow at `${REGISTER_PATH}/participant` (`REGISTER_PATH = /courses/bcia-qeeg-mentoring/register`). The `/courses` listing reads `src/data/schedule.ts`; a row's `href` is a local path once its page is redesigned, otherwise the live URL.

## Motion

- Scroll reveal: `Reveal` / `RevealItem`, opacity 0 to 1, y 24 to 0, 0.6s, ease [0.22, 1, 0.36, 1], viewport once, amount 0.25, stagger 0.08.
- Tokens: `--ease-out` cubic-bezier(0.22, 1, 0.36, 1), `--dur-fast` 180ms, `--dur-base` 320ms; `--ease-glide` (0.16, 1, 0.3, 1) / `--dur-step` 700ms; `--ease-reveal` (0.48, 0.002, 0.035, 0.996) / 250ms.
- Pinned sequences: `usePinnedSteps` + `PinStage`; nothing pins where the band does not fit the viewport.
- Reduced motion: `usePrefersReducedMotion`; everything shows complete and static.
- No decorative animation beyond these patterns.
