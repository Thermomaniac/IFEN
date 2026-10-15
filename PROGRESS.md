# IFEN Remaining Pages Progress

Active phase: **Phase 3, IFEN pages** (not started). See `ROADMAP.md`.

## Phase 2: Neurofeedback content pages (completed 2026-10-15, pushed to staging)

Content-page pattern: ink hero (intro-only, or photo hero) then mist / cream / white bands built from `CourseArticles`, `FeatureGrid` and `Categories`, closing with `CtaFooter`. Shared paths, breadcrumb root, related cards and CTA live in `src/data/neurofeedback/shared.ts`.

Pages (data in `src/data/neurofeedback/`, routes in `src/app/neurofeedback/`):

- `/neurofeedback/what-is-neurofeedback` (`whatIsNeurofeedback.ts`). Source: neurofeedback-info.de/neurofeedback-de/was-ist-neurofeedback.html. Hero, "In brief" `CourseArticles variant="media"` (copy beside the source photo, mist), session steps `FeatureGrid numbered` (cream), Categories, CtaFooter.
- `/neurofeedback/applications` (`applications.ts`). Source: …/anwendungsgebiete.html. Photo hero, `CourseArticles panels` with both check lists and a highlighted `note` (mist, id `effects`), Categories, CtaFooter.
- `/neurofeedback/methods` (`methods.ts`). Source: …/themenbereiche.html. Hero, `CourseArticles rows numbered` with per-topic training `links` (mist), Categories with local QEEG courses, CtaFooter.
- `CourseArticles` extended with optional props, no new component: `media` variant + `image`, `numbered` rows, per-item `links`, section `note`.
- Nav: Neurofeedback now points at `/neurofeedback/what-is-neurofeedback`; children What Is Neurofeedback, Applications, Benefits (`/neurofeedback/applications#effects`), Methods. Nothing removed.
- Asset: `public/neurofeedback/what-is-neurofeedback.jpg` (source photo, 500×333).

Mobbin references: Superpower "What is biomarker testing?" (copy beside image, media variant), Biograph "How Biograph works" (numbered steps), Until "Our Approach" (numbered method rows), Sketch help topics (heading, text and link per topic).

Verification:

- `npx eslint .` clean; `npx tsc --noEmit` clean; `npm run build` passes (three routes static).
- Rendered with a production server at 1440, 390 and 320: no horizontal overflow, no console messages.

Open issues:

- Dead source links left out (404 on 2026-10-15): qeeg.neurofeedback-partner.de, vielight.neurofeedback-partner.de/index.php, /de/startseite/neuromeditation-munich.html, /de/termine-kursbuchung-seminare/neuromeditation-inter.html (EN version also 404). Neuromeditation has no link until IFEN supplies one.
- German-only training links on the source replaced with the live EN equivalents (qeeg-kurse-m, photobiomodulation, brainavatar).
- ISF has no link on the source; the ISF page arrives in Phase 5 and should be linked from Methods then.
- Applications source illustration is flat clip art, off-style; the hero uses the existing site photo `/about/metric-tile.jpg` instead.
- "Benefits" nav child used to point at the home discount section `/#benefits`; it now points at the Applications effects section. Revert if the discount anchor was intended.
- The What-is photo is only 500px wide and renders up to ~570px on desktop; ask IFEN for a larger original.
- Related card grid is 3 columns, so each page links 3 related cards.


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
