# IFEN Remaining Pages Roadmap

Five phases, one phase per session. Read `PROGRESS.md` first to see which phase is active, and `DESIGN-SYSTEM.md` before building anything.

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
