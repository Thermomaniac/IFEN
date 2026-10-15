# IFEN Remaining Pages Progress

Active phase: **Phase 2, Neurofeedback content pages** (not started). See `ROADMAP.md`.

## Phase 1: Course detail pages (completed 2026-10-15, pushed to staging)

Pages:

- `/courses/webinar-qeeg-psychotherapy`: data `src/data/courses/webinarQeegPsychotherapy.ts`, route `src/app/courses/webinar-qeeg-psychotherapy/page.tsx`. Mirrors `/courses/webinar-stress-pain`: Hero, Overview, TopicLoop, Mentors (Thomas Feiner), Categories, CtaFooter.
- `/courses/qeeg-workshop`: data `src/data/courses/qeegWorkshop.ts`, route `src/app/courses/qeeg-workshop/page.tsx`. Hero, Overview (Book + Request Information mailto), FeatureGrid numbered (cream), TopicLoop (white), FeatureGrid learning objectives (mist), Instructor Silvia Fois (white), Mentors, Categories, CtaFooter.
- Asset: `public/speakers/silvia-fois.jpg` from the live site (`/images/Fois.jpg`).
- `src/data/schedule.ts`: rows WEB-080227-DE and QEEG-121226-EN now link to the local pages.
- Booking: both pages use `${REGISTER_PATH}/participant`, like every other course page.

Verification:

- `npx eslint .` clean; `npx tsc --noEmit` clean; `npm run build` passes (both routes static).
- Rendered with a production server at 1440, 390 and 320: no horizontal overflow, no console errors or warnings, 3 booking links per page, listing at `/courses` links to both local routes.

Open issues:

- Workshop source conflicts, left as on the live booking data: tagline says "Presenza" while the format is Online (Online used); the code `QEEG-121226-EN` has an EN suffix for an Italian course (kept verbatim); the live title is truncated ("Interpretatio"), corrected on the page but left as-is in the schedule row title.
- Live source has no date details beyond "12–13 dicembre" in the body; hero uses the booking data (Sat 12.12.2026 10:00 to Sun 13.12.2026 17:00).
- Silvia Fois credentials taken from her live lecturer page (BCIA neurofeedback certification, QEEG-D, BCIA mentor since 2023). Confirm the badge wording with IFEN.
- `Mentors` pads single-speaker rows with three "To be announced" cards (existing behaviour, same as the stress and pain webinar). The workshop shows Silvia Fois both in Instructor and Mentors, matching the QEEG page pattern.
- Known from before: tab title stays stale after client-side navigation (see `cloud.md`).
