# IFEN Remaining Pages Roadmap

Five build phases (done), then the correction programme below (phases A to H, one session, each pushed to staging). Five phases, one phase per session. Read `PROGRESS.md` first to see which phase is active, and `DESIGN-SYSTEM.md` before building anything.

Branch: `phase-2` (staging deploy at ifen-staging.up.railway.app). Never push or merge to `main`. At the end of every phase, commit and push `phase-2` to deploy staging (see `CLAUDE.md`).

Live source site: https://www.neurofeedback-info.de (English paths under `/en`). Scrape sources with Firecrawl; never invent dates, prices, credentials or claims. Content is translated to English like the existing pages, keeping the course language as a fact.

## Phase 1: Course detail pages (done 2026-10-15)

Adapt two live courses to the existing detail-page patterns.

- Webinar "QEEG und Neurofeedback in der Psychotherapie: sinnvoll, ethisch, praxisnah": `/courses/webinar-qeeg-psychotherapy`. Source: `/termine-kursbuchung-seminare/qeeg-kurse-m/courses/1195-...`
- "qEEG Workshop: From Recording to Clinical Interpretation": `/courses/qeeg-workshop`. Source: `/termine-kursbuchung-seminare/qeeg-kurse-m/courses/1167-workshop-interpretazione-clinica-avanzata-del-qeeg.html`

## Phase 2: Neurofeedback content pages (done 2026-10-15)

What Is Neurofeedback, Applications, Topics/Methods. New archetype: long-form editorial content page. Research Mobbin for editorial and explainer layouts first. Build from `CourseSection`, `CourseArticles`, `FeatureGrid`, `FocusCards` and Reveal; extend with optional props before adding components.

## Phase 3: IFEN pages

About IFEN, lecturers index, Thomas Feiner lecturer detail. Lecturer profiles do not get the therapist mentorship booking flow. Reuse the therapist profile visual language where it fits, without booking.

## Phase 4: Blog

Blog index and the article "neurofeedback-evidenz-forschung". Research Mobbin for article index and reading layouts.

## Phase 5: Course Booking content pages

QEEG Courses, ISF Neurofeedback, Supervision/Internship/Mentoring (incl. TeamViewer), BCIA Board Certification, Webinars. Build one flexible, reusable content-page system (data-driven sections) rather than five bespoke pages.

## Navigation plan

Match the Figma hierarchy and point items at local routes as each phase creates them. Do not remove items or break routes. Current `navLinks` in `src/data/site.ts`:

| Nav item | Current target | Planned target |
| --- | --- | --- |
| Course Booking | `/#training` (Course Dates, Certification Path, Training Locations) | Phase 5 category pages; Course Dates to `/courses` |
| Neurofeedback | `/neurofeedback/what-is-neurofeedback` (What Is Neurofeedback, Applications, Benefits, Methods) | Done in Phase 2 |
| IFEN | `/#board` (Board Members, Partners, Testimonials) | Phase 3 About IFEN and lecturers |
| Shop | `#` | Unchanged (out of scope) |
| Therapist List | `/therapists` | Unchanged |
| Blog | `#` (Latest Articles) | Phase 4 blog index |

Footer links "About the institute" and "Lecturers overview" move to Phase 3 routes.

## Conventions for every phase

- Data in `src/data/`, typed with `satisfies`, one file per page. Header comment cites the source URL and translation.
- Route in `src/app/.../page.tsx` exporting `metadata` from the data file.
- Band order, section header, cards, CtaButton and breakpoints per `DESIGN-SYSTEM.md`.
- When a listing row's page is redesigned, switch its `href` in `src/data/schedule.ts` to the local path constant.
- Checks before handoff: `npx eslint .`, `npx tsc --noEmit`, `npm run build`, render at 1440 / 390 / 320, update `PROGRESS.md`.

## Correction programme (started 2026-10-18)

Architecture corrections, page improvements and missing pages after phases 1 to 5. Run A to H in order; after each phase run the checks, render 1440 / 390 / 320, update `PROGRESS.md`, commit that phase's files and push `phase-2`.

- **A. Audit.** Sources verified (raw HTML of the live pages, parsed locally, because accordions are hidden from Firecrawl markdown). Plan written here.
- **B. Navigation and IA.**
  - Neurofeedback: What Is Neurofeedback, Topics (themenbereiche, `/neurofeedback/topics`), Areas of Application (anwendungsgebiete, `/neurofeedback/areas-of-application`). Benefits and Methods go; old routes redirect.
  - IFEN: About IFEN, Lecturers, Training Courses in Neurofeedback. Board Members, Partners and Testimonials go. No Feedback page.
  - Blog: plain link to `/blog`, no "Latest Articles" child.
  - Course Booking: Certification Path and Training Locations go; module pages, BrainAvatar, BCIA and Photobiomodulation are added as their pages land (E, F).
- **C. About IFEN and lecturers.** Title case, shorter Vision and Philosophy, director section with portrait (no invented quotes), modern neurofeedback cards with the icon on top and equal heights, one-line hero metrics on desktop. Move Why Neurofeedback?, Why IFEN?, What You Will Learn With Us, Basic Knowledge and Further Topics from the live Module 1 category page (`modul-1.html`). Thomas Feiner: compact hero, summary card, source-backed facts only, related courses.
- **D. Blog.** Featured card border fix in the component, remove Read / poster / batch labels and "German original" badges, real load-more archive instead of the article count, article body in a reading layout (narrow measure, rhythm), footer with share, sources, previous post and Keep Reading.
- **E. Modules.** Overview (`/courses/modules`): progression M1 to M4 plus IFEN 100, dates with card/table toggle and filters, no tabs, FAQ (`faq-fragen-und-antworten.html`) with an anchor. Module 1: remove testimonials and pricing UI, add "Overview of All Modules". Detail pages for Module 2, 3, 4 and IFEN 100.
- **F. Course Booking gaps.** Training Courses in Neurofeedback (`alle-kurse-zum-thema-neurofeedback`), BrainAvatar (dates plus interest list), BCIA refinement, Photobiomodulation (interest list).
- **G. Supervision and webinars.** Supervision hero on two lines, TeamViewer as instructions with the official download. Webinars: card/table toggle and filters without tabs.
- **H. QA.** Title-case headings, shared 464px hero height (Figma "Hero Type 1"), hero line SVG never shows its path end, full checks across all routes.

## Interest, account and design-system programme (started 2026-10-18)

Run 0 to 6 in order; after each phase run the checks, render 1440 / 390 / 320, update `PROGRESS.md`, commit that phase's files and push `phase-2`.

- **0. Audit.** Live sources parsed as raw HTML: the Seminarman prospect form (photobiomodulation interest list) and the four com_users screens at `mein-ifen.html` (login, `view=registration`, `view=reset`, `view=remind`). Figma "Hero Section" (node 40001128:108319). Mobbin references cited in `PROGRESS.md`.
- **1. Interest capture.** A section on the six detail pages with a booking hero (Module 1, BCIA QEEG Mentoring, QEEG for Your Practice, QEEG Workshop, both webinars), placed before Speakers. Fields as on the live prospect form: Salutation (optional), First Name, Last Name, Email, Phone, and the required AGB checkbox. The course is taken from the hero (title and booking code). No newsletter or marketing consent. Submits to `/api/interest`, which validates again and forwards to `IFEN_INTEREST_ENDPOINT`; without it the route answers 503 and the form shows an error with the email fallback. Success only on a 2xx from the upstream.
- **2. Account screens.** `/my-ifen` (login), `/my-ifen/register`, `/my-ifen/reset`, `/my-ifen/remind`, with the live fields, password rules (8 characters, 1 digit, 1 special character, 1 upper case, 1 lower case, max 99) and reCAPTCHA v2 on registration, reset and remind. `/api/account/*` forwards to `IFEN_AUTH_ENDPOINT`; without it, a 503 and a link to the live screen. No auth logic is reimplemented in the client. Header, drawer and footer Login / Register links point at the new routes.
- **3. Navigation and modules overview.** "Certified Neurofeedback Therapist IFEN" becomes "Training MODULES 1-4": the parent links to the overview and opens a nested submenu (Module 1, 2, 3, 4, IFEN 100) on desktop and in the drawer. Overview hero title, meta and breadcrumbs follow. Pathway note on white. Module cards get icons, primary buttons, token tints and aligned buttons.
- **4. Light hero.** A `tone="light"` CourseHero variant from the Figma hero: light band, IFEN photo on the right (asset in `public/hero/`), light fade, ink type. Applied to every hero without a booking panel, except the lecturer profile.
- **5. Module 4 "The Final Step".** Why the step matters, what to expect, the exam facts already on the page, and the next action (IFEN 100 / dates). No new facts.
- **6. Bottom-anchored CTAs.** Card links sit at the card bottom in the shared article cards (Internship card on Supervision is the reference).
