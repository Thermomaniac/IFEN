# IFEN Remaining Pages Progress

Active phase: **Phase 5, Course Booking content pages** (not started). See `ROADMAP.md`.

## Phase 4: Blog (completed 2026-10-18, pushed to staging)

Pages (data in `src/data/blog/`, routes in `src/app/blog/`). Paths in `src/data/blog/paths.ts`; post list, date format, related cards and CTA in `src/data/blog/shared.ts`.

- `/blog` (`index.ts`). Source: neurofeedback-ifen.com/blog (welcome text, featured Brodmann poster post, the five latest posts); post dates, categories, reading times and the 117-article count from its wp-json API. Photo hero, Featured band (mist) with a wide card, Latest Articles card grid (cream, 3 / 2 / 1 columns) with a "Browse All 117 Articles" link to the German blog, Categories, CtaFooter.
- `/blog/neurofeedback-evidence-research` (`evidence.ts`). Source: neurofeedback-ifen.com/blog/neurofeedback-evidenz-forschung (Thomas Feiner, published 20 Jul 2026, updated 27 Jul 2026). Full English translation, all nine sections and six sources, nothing trimmed; source dashes set as commas, colons or brackets; bold terms kept. Uses the profile layout: photo hero (author, date, reading time), "On This Page" nav (the source's table of contents, short labels), one card per section, the three objections as boxes, sources with links and a link to the German original.
- New component `src/components/blog/BlogPosts.tsx` (`FeaturedPost`, `PostGrid`): directory card treatment, Profile badge, date · read-time line, whole-card link with the #FBFFE9 hover wash, "German original" tag on external posts, dotted brain on ink for posts without a photo.
- `Profile.module.css`: added `.claim`, `.sources`, `.source` and bold styling in `.text` (additive; therapist and lecturer pages unchanged).
- Nav: Blog and "Latest Articles" now point at `/blog`.
- Assets: `public/blog/` (header, evidence, biofeedback, neuromeditation, photobiomodulation photos and the Brodmann poster, from the live blog).

Mobbin references: GitBook blog (featured wide card above a grid), Mural (featured post), Passionfroot (date · read-time meta), AngelList (category tag with date and read time) for the index; Codecademy (right-side Contents rail), Hashnode (table-of-contents card), Uxcel (title, author, read time, updated date) for the article.

Follow-up (2026-10-18): share row and previous post added to the article, as the last card ("Share This Article"), not in the "On This Page" nav. Facebook, X, LinkedIn and Email, as on the source; the URL is read in the browser (`ShareLinks`, client), so staging and production each share their own address. The source has only "Vorheriger Beitrag" (the newest post has no next one), so there is a "Previous Post" box to the biofeedback post, tagged German original (`PostNav` in `BlogPosts.tsx`). New `LinkedInIcon`. Mobbin references: The New York Times (share list, icon and label per network), Peerlist (share menu with X, LinkedIn), Hashnode (more articles at the article end).

Verification:

- `npx eslint .` clean; `npx tsc --noEmit` clean; `npm run build` passes (both routes static).
- Rendered with a production server at 1440, 390 and 320: no horizontal overflow on either page.

Open issues:

- Only the evidence article is translated. The other 116 posts stay in German on the live blog; the index cards and the archive link point there. Decide whether more posts get migrated.
- Excerpts for the German-linked posts are translations of the source excerpts, which end mid-sentence ("…"); kept as is.
- The hero welcome text links to www.neurofeedback-info.de on the source; here "see our course dates" is plain text and the CTA footer links the course listing.
- The Philosophy post has no image on the source; its card uses the dotted brain on ink.


## Phase 3: IFEN pages (completed 2026-10-18, pushed to staging)

Pages (data in `src/data/ifen/`, routes in `src/app/ifen/`). Paths, breadcrumb root, related cards and CTA live in `src/data/ifen/shared.ts`; the paths alone in `src/data/ifen/paths.ts` so `courses/shared.ts` can import them without a cycle.

- `/ifen/about` (`about.ts`). Source: neurofeedback-info.de/en/ifen-de/ueber-uns.html. Hero, "What Is IFEN?" `CourseArticles media` with the source photo (mist), director's message as a split card (cream), the six-point IFEN concept `FeatureGrid` (white), the team (Thomas Feiner, Alina Feiner, Maria Donaire, Leidy Cubillos) with full bios (mist), Categories, CtaFooter.
- `/ifen/lecturers` (`lecturers.ts`). Source: …/ifen-de/dozenten-m.html. Hero, all 25 lecturers in source order as a `Mentors grid` (mist), Categories, CtaFooter.
- `/ifen/lecturers/thomas-feiner` (`thomasFeiner.ts`). Source: …/dozenten-m/1-thomas-f-feiner-bcia-bcn-qeeg-d.html. The therapist profile layout without booking: hero with portrait, "On This Page" nav (CTA jumps to the courses), five text section cards, then his 18 course dates as the schedule's date cards. Dates are looked up from `scheduleDates` by code and the build fails if one is missing.
- Shared component changes, all optional props with unchanged defaults:
  - `Mentors`: `id`, `tone`, `grid` (wrapping grid, no carousel controls or placeholders).
  - `Instructor.tsx`: new `Team` export for several people with portrait and bio; `TeamContent` / `TeamMember` types in `coursePage.ts`.
  - `CourseSchedule.tsx`: `CourseCards` export (the date cards alone).
  - `Reveal`: `amount` (default 0.25). The lecturer grid and the course card pass "some"; a group taller than four viewports never reached 25% and stayed hidden on phones.
  - Therapist profile CSS moved to `src/components/directory/Profile.module.css` with a shared `ProfileSection`; the therapist page now uses it too, visually unchanged.
- Links: nav IFEN now points at `/ifen/about` with children About IFEN, Lecturers, Board Members, Partners, Testimonials. Footer "About the institute" and "Lecturers overview" go to the new pages. `FEINER` speaker card (course pages) and `LECTURERS_URL` point at the local pages.
- Assets: `public/about/ifen-neurofeedback.jpg`, `public/lecturers/*.jpg` (28 portraits from the live site). Feiner's large portraits use the existing `/board/member-1.png`.

Verification:

- `npx eslint .` clean; `npx tsc --noEmit` clean; `npm run build` passes (three routes static).
- Rendered with a production server at 1440, 390 and 320: no horizontal overflow on the three pages, the therapist profile or Module 1; no console messages.

Open issues:

- The live Feiner "Experience" text ends in an editor placeholder ("developed [a specific method/approach - context needed]. Training programs for children with learning difficulties."). Joined into one sentence ("developed training programs for children with learning difficulties"); confirm with IFEN.
- Alina Feiner has no role line on the source; "Research, innovation and training concepts at IFEN" is taken from her bio. Confirm.
- Lecturer cards show only a short role line; each is a summary of the opening sentence of the live profile. Only Thomas Feiner has a local page; the other 24 cards link to their live profiles.
- Several live portraits are small (Timo Skladny 81×100, Georg Handwerker and Mark Smith 125×156, Hanelore Branga 200×170). Ask IFEN for larger originals.
- The English Feiner page lists course codes ending in -EN; `schedule.ts` holds the same dates as -DE with German titles, so the course cards show the German titles.
- Home board cards still link to `#` and carry placeholder bios (from Paper); not changed this phase.
- `LECTURERS_URL` in `therapists.ts` is no longer used anywhere; kept as the exported constant.


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
