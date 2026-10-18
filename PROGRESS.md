# IFEN Remaining Pages Progress

Active phase: 1 (interest capture), interest, account and design-system programme. Correction programme A to H complete (2026-10-18), all phases pushed to staging.

## Interest, account and design-system programme

### Phase 0: Audit (done 2026-10-18)

- Live prospect form (Seminarman, photobiomodulation interest list): Salutation select (optional; Herr, Frau, Mr., Mrs., Ms.), First Name, Last Name, Email, Phone (all required), required checkbox "I accept the General Terms and Conditions" linking `https://www.neurofeedback-info.de/de/agb-2018.html`. No marketing consent. It posts to Joomla with a CSRF token and session, so it cannot be posted cross-origin from this app.
- Live account screens (`mein-ifen.html`, Joomla com_users):
  - Login: username, password (show toggle, max 99), "Remember me", links to reset, remind and registration.
  - Registration: name, username, password and confirmation, email, reCAPTCHA v2. Password rules: at least 8 characters, 1 digit, 1 special character, 1 upper case and 1 lower case letter.
  - Reset and remind: email plus reCAPTCHA v2. Reset sends a verification code; remind sends the username.
  - The reCAPTCHA site key is bound to the live domain, so it cannot be reused on staging.
- No backend or auth exists in this app. Both features are built against route handlers that forward to an upstream set by environment variables, and never report success without one.
- Mobbin references:
  - Interest form: Headspace "Join the waitlist" (copy left, form right) https://mobbin.com/sites/sections/a4f79272-6385-4c1b-9dea-874c0b2797d9, Webflow waitlist with terms checkbox https://mobbin.com/sites/sections/b88c0a5c-ab0c-4fc4-ba95-08373f7178c2, Sana https://mobbin.com/sites/sections/eef24f82-acda-4a1b-9992-006602c5f0cc.
  - Login (split, photo right): Sprig https://mobbin.com/screens/35685629-5b55-4d94-bb70-fd34acea9848, Klaviyo (reCAPTCHA in the form) https://mobbin.com/screens/b913bc06-4fcf-4e33-adbd-cfd53f1ff898, Square https://mobbin.com/screens/51358a95-0a92-40ef-b433-8120fe1bf67e.
  - Registration (live password checklist): Dropbox Dash https://mobbin.com/screens/e96dc357-b8be-4d51-99dd-af253276d439, Uxcel https://mobbin.com/screens/69e77196-7b4d-4a0b-b499-564b5eb5fd3f.
  - Final step card: Duolingo test readiness and requirements https://mobbin.com/sites/sections/9b0aa4ab-3f00-4d58-b2df-468f6a34f898, https://mobbin.com/sites/sections/7fb9cdab-1d2a-4a6a-871c-a0dbf35a8bb7; HubSpot certification process https://mobbin.com/sites/sections/13833919-8bab-499c-b4f0-e18c5f125420.
- Figma "Hero Section" (node 40001128:108319): photo full-bleed on ink with a left radial fade. The photo is copied into `public/hero/` for the light variant; no Figma URL at runtime.

## Correction programme

### Phase A: Audit (done 2026-10-18)

- Sources fetched as raw HTML and parsed locally (Firecrawl markdown drops accordion content): modul-1-4, modul-1 (category), modul-2, modul-3, modul-4, ifen-100-pruefungs-mentoring, faq-fragen-und-antworten, alle-kurse-zum-thema-neurofeedback, brainavatar, photobiomodulation, bcia-board-certified-in-neurofeeedback, supervision-praktikum-mentoring-einzelne-tage, webinare-m, ifen-de/ueber-uns.
- The five sections to move to About IFEN (Warum Neurofeedback?, Warum IFEN?, Was Sie bei uns lernen, Das Grundwissen, Weiterführende Themen) are on the live Module 1 category page `modul-1.html`, not on the English course page (which returns 403). They were never in the local Module 1 page.
- No icon library is installed (no Phosphor, no "Foursquare"); icons stay in `src/components/icons`, with Phosphor-style paths added there by hand in one weight.
- The hero line SVG ends an open path at (1032, 869) of its 1528 viewBox; pages without a booking panel show the cut end.

### Phase B: Navigation and IA (done 2026-10-18, pushed to staging)

- Neurofeedback menu: What Is Neurofeedback, Topics, Areas of Application. Benefits (`/neurofeedback/applications#effects`) and Methods removed.
- Routes renamed: `/neurofeedback/methods` → `/neurofeedback/topics`, `/neurofeedback/applications` → `/neurofeedback/areas-of-application`. Both old paths redirect (307, `next.config.ts`). Data files `topics.ts` and `areasOfApplication.ts`; constants `TOPICS_PATH` and `AREAS_PATH`; related cards, breadcrumbs, titles and the ISF and blog related cards relabelled.
- IFEN menu: About IFEN, Lecturers (Training Courses in Neurofeedback is added in phase F with its page). Board Members, Partners and Testimonials removed; the "Board Members" related card on About and Lecturers replaced with Find a Therapist.
- Blog: plain link to `/blog`, no child.
- Course Booking: Certification Path and Training Locations removed. Module, BrainAvatar and Photobiomodulation items are added with their pages (E, F) so the nav never points at a missing route.
- Desktop and mobile both read `navLinks`, so they stay in sync.
- Footer links "Advisory Board members" and "Research partnerships" still point at the home sections, which exist; not part of the menu brief.
- Checks: eslint clean, tsc clean, build passes. Production server: both redirects return 307 to the new paths; desktop menus and the mobile drawer list the new items; no overflow at 390.

### Phase C: About IFEN and lecturers (done 2026-10-18, pushed to staging)

- Hero metrics (`CourseHero`): labels never wrap, the row wraps as a whole, and below 48rem the metrics stack with the dividers hidden. About labels shortened so all three sit on one line at 1440.
- About IFEN: headings in title case ("Vision and Philosophy of IFEN", "Message From the Director"); vision shortened to two paragraphs. The director message uses a new `profile` variant of `CourseArticles`: a sticky portrait card (name, role) beside the full text, a compact row on phones. No quotes added.
- Modern Neurofeedback cards: `FeatureGrid` items take an optional `icon`; a 48px lime icon mark sits above the heading, rows keep equal heights. Six Phosphor-proportioned icons added by hand to `src/components/icons` (one weight). Icon lookup shared in `course/featureIcons.ts` (also used by `FormatSteps`).
- Moved from the live `modul-1.html`, translated: Why Neurofeedback?, Why IFEN?, What You Will Learn With Us (Basic Knowledge), Further Topics. The coded Module 1 page never had them, so nothing is removed there in this phase.
- Thomas Feiner: rebuilt on the therapist profile layout (`ProfileNav`, `ProfileSection`). Sections: Overview with stat cards, Training and Certifications rows, Clinical Focus and Methods badges, Experience, Research, Courses. Hero title shortened to the name, credentials moved to the subline. Every credential and number comes from the IFEN about page profile; no ratings or counts invented.
- `directory/ProfileParts.tsx` holds the shared profile pieces (Stats, Rows, Box, Badges, Group, List); the therapist profile now imports them.
- Checks: eslint clean, tsc clean, build passes. Rendered at 1440, 390 and 320: no horizontal overflow on About, Thomas Feiner, a therapist profile and Module 1.

### Phase D: Blog (done 2026-10-18, pushed to staging)

- Featured card: the border is an overlay (`.card::before`, z-index 1) so the poster can no longer paint over it at rest or on hover; the poster sits inset in its half. Applies to every blog card.
- Removed the featured "Read and Download the Poster" line, the "German" and "German original" badges (cards and previous post; screen readers still hear "in German, opens the IFEN blog").
- Latest: the twelve newest real posts from the blog's wp-json API (20 Jul 2026 back to 17 Mar 2026), shown six at a time by a client `PostGrid` ("Show 6 more articles", "6 of 12"), then "More Articles on the IFEN Blog". No article count anywhere; the "117 Articles" hero figure is gone. Focus moves to the first new card after "Show more". The 2022 philosophy post left the list and the data.
- New posts from April 2026 on only have text-on-image social graphics, so they use the dotted-brain tile.
- Evidence article: one white reading column (`ArticleBody` / `ArticleSection`, 42rem measure, 17/30 body, lead paragraph, objections as gold-rule pull quotes, sources numbered) beside the "On This Page" nav, which now also lists Share. Footer: sources, share row, previous post, then "Keep Reading: More From the Blog" (the three previous posts, link to the index). Category is "News" at the source, so no "More in Research" label.
- Checks: eslint, tsc, build clean; no overflow at 390 and 320 on /blog and the article.

### Phase E: Modules (done 2026-10-18, pushed to staging)

- New overview `/courses/modules` ("Certified Neurofeedback Therapist IFEN"): Welcome and Our Philosophy panels, the M1 to M4 pathway with each step linked, "Overview of All Modules" cards, then every module date in the `CourseSchedule` table (search, language, format and price filters, no tabs), Module 1 in English and Spanish as Join List cards, and the full FAQ (13 questions from Itemid=1442) at `#faq`.
- New pages `/courses/module-2`, `/courses/module-3`, `/courses/module-4`, `/courses/ifen-100` on `ContentPage` (data in `src/data/courses/modules.ts`). Module 2: requirements, four numbered registration steps, notes, dates, six lecturers. Module 3: focus, phone or online, TeamViewer (official download link), units, two date lines, five lecturers. Module 4 and IFEN 100: exam flow and dates.
- Module 1: pricing panel removed from the hero ("Next date" shows instead), breadcrumb runs through the overview, the pathway links to Modules 2 to 4, and the "Overview of All Modules" cards sit after it. Booking journey unchanged.
- Nav: Course Booking lists Certified Neurofeedback Therapist, Module 1 to 4 and IFEN 100.
- Shared changes: `CourseSchedule` takes optional `interest`, `notes` and `section`; tabs only show with interest entries; a filter only shows with more than one choice. `datesFor` and `interestFor` fail the build on a missing code. `DatesBand` (ContentPage) renders date or interest cards straight in a band. FAQ answers take blocks (lists, links). `FeatureGrid` items take a `link`; `Pathway` steps take an `href`. Module paths live in `modulePaths.ts` to keep imports acyclic.
- Kept as published: Module 3 text says 150 € per unit with Handwerker, Feiner or Schack, the schedule lists 250 € with Handwerker or Feiner. Needs IFEN to confirm.
- Checks: eslint, tsc, build clean. Rendered at 1440, 390, 320: no horizontal overflow on the overview, Module 1 to 4 and IFEN 100 (the Module 1 mentor row scrolls sideways by design).

### Phase F: Course pages (done 2026-10-18, pushed to staging)

- New `/ifen/training-courses` ("Training Courses in Neurofeedback", data `src/data/ifen/trainingCourses.ts`) on `ContentPage`: who the courses are for and what to expect (panels), Why Neurofeedback and Why IFEN (columns), the nine training dates, the five upcoming courses and webinars, the 13-question FAQ (shared with the modules overview), and a "Your Next Step" CTA. Left out: participant quotes and the orphaned "Für wen ist dieser Kurs geeignet?" block.
- New `/course-booking/brainavatar`: about BrainAvatar, five dates (the source also lists the BCIA foundation course), and a Join List card for AVA-INTER.
- New `/course-booking/photobiomodulation`: the four source paragraphs in two columns and a Join List card for PBM-INTER.
- BCIA: added the five certification requirements (numbered rows, with the 36-hour blueprint and the practical training counts), the recommended order, fees, certification through prior experience and the EEG brochure link. Related now includes BrainAvatar.
- Nav: Course Booking gains BrainAvatar and Photobiomodulation (source order); IFEN gains Training Courses in Neurofeedback.
- Shared: `ContentPage` renders a `faq` section kind.
- Not shown: the source's upcoming table lists WEB-071126-EN (Swingle assessment), which is not in `schedule.ts`.
- Checks: eslint, tsc, build clean. Rendered at 1440, 390, 320: no horizontal overflow on the four pages.

### Phase G: Supervision and Webinars (done 2026-10-18, pushed to staging)

- Supervision: hero title on two lines ("Supervision, Internship\nand Mentoring"). The TeamViewer tag is replaced by a TeamViewer card with what the session needs and a "Download TeamViewer" link to teamviewer.com/en/download. The set-up steps are generic usage steps; the source only says TeamViewer is required.
- Webinars: "How Does a Webinar Work?" is now three numbered steps (Register, Receive Your Invitation, Download the Software) built from the source paragraph. The 23 dates use the filterable `CourseSchedule` (search, type, language and price filters, table and card views); there are no tabs because webinars have no interest list.
- Shared: `DatesContent.schedule` switches a `dates` section from plain cards to `CourseSchedule`.
- Checks: eslint, tsc, build clean. Rendered at 1440, 390, 320: no horizontal overflow on either page.

### Phase H: Global (done 2026-10-18, pushed to staging)

- Title Case (AP style; "From" and "With" capitalised as before) for headings, labels, buttons, tags, card and schedule titles across `src/data/**`, page metadata and UI literals (hero eyebrows "Select Your Plan", "Course Fee", "Next Date"; filter labels "All Types", "All Languages", "All Formats", "Paid & Free", "All Countries", "All Practices"; "Course Dates"; "Back to Course Details"). Sentences, hints, placeholders, code values and mixed-case terms (qEEG, sLORETA) untouched.
- Schedule titles: all-caps prefixes normalised ("WEBINAR - " to "Webinar: ", "MODUL n - " to "Modul n: ", "MÓDULO 1 - " to "Módulo 1: ", "MODULE 1 - " to "Module 1: "). German and Spanish titles keep their own capitalisation. Fixed the truncated "Clinical Interpretatio" to "Interpretation". Em-dashes in titles and one fee note replaced.
- Hero height: from 64rem every `CourseHero` has a 464px minimum with content centred (Figma 40001123:38856); the line pattern uses Figma's offset. Heroes with more content grow: blog 594, article and therapists 498, modules / module-2 / module-4 490, module-3 514, heroes with a booking panel 549 to 665. Below 64rem height follows content (258 to 1425).
- Hero line: the open end of the third path is extended along its tangent past the band, so no page shows a cut end.
- Checks: eslint, tsc, build clean. All 49 routes return 200 (the two register / book index routes 307 to their first step). Rendered at 1440, 390 and 320 across every route: no horizontal overflow.

## Phase 5: Course Booking content pages (completed 2026-10-18, pushed to staging)

One reusable content-page system instead of five bespoke pages. Each page is a data object (`BookingPage` in `src/data/booking/shared.ts`): hero, an ordered list of sections, related cards and CTA. `src/components/course/ContentPage.tsx` renders it: ink hero, then each section in mist / cream / white order, Categories, CtaFooter. Section kinds:

- `articles`: `CourseArticles` (any variant).
- `features`: `FeatureGrid`.
- `dates`: section header plus the schedule's date cards (`CourseCards`). Rows come from `scheduleDates` by course code through `datesFor`, and the build fails if a code is missing.

Paths live in `src/data/booking/paths.ts` (a leaf module, so `site.ts` and `course.ts` import them without a cycle). The breadcrumb root is "Course Booking", which links to `/courses`.

Pages (data in `src/data/booking/`, routes in `src/app/course-booking/`):

- `/course-booking/qeeg-courses` (`qeegCourses.ts`). Source: neurofeedback-info.de/termine-kursbuchung-seminare/qeeg-kurse-m.html. The three paragraphs on quantitative EEG are in one card, followed by 8 dates.
- `/course-booking/isf-neurofeedback` (`isfNeurofeedback.ts`). Source: …/isf-neurofeedback-m.html. "What Is ISF Neurofeedback?" (the three paragraphs) has links to the further-information PDF, Mark L. Smith's NeuroConnections article and IFEN's German translation. 3 dates.
- `/course-booking/supervision-internship-mentoring` (`supervision.ts`). Source: …/supervision-praktikum-mentoring-einzelne-tage.html. The page has two cards:
  - Internship links to the local therapist directory, where partner practices carry the "Internships & mentoring" badge.
  - Supervision has a TeamViewer tag.
  - It has 6 flexible units.
- `/course-booking/bcia-certification` (`bcia.ts`). Source: …/bcia-board-certified-in-neurofeeedback.html. It has three sections:
  - The six facts as a numbered `FeatureGrid`.
  - "Certification Through IFEN Workshops", which links to the Thomas Feiner page.
  - The BCIA course and BCIA mentoring dates.
- `/course-booking/webinars` (`webinars.ts`). Source: …/webinare-m.html. "How Does a Webinar Work?" and 17 dates.
- All copy is translated from the German originals, and nothing is trimmed. The source's German-labelled QEEG banner diagram is left out.
- No shared component changed. `ContentPage` composes existing components, and `ContentPage.module.css` only resets the date list padding.
- Links:
  - Nav: Course Booking points at `/courses`. Its children are Course Dates (`/courses`), QEEG Courses, ISF Neurofeedback, Supervision, Internship and Mentoring, BCIA Certification and Webinars. Certification Path and Training Locations are kept.
  - Methods: ISF now links the ISF page, and QEEG links the local QEEG Courses page in place of the live qeeg-kurse-m.html.
  - BCIA Mentoring: the course page's "Supervision / Internship / Mentoring" category card links the new page, and its breadcrumb root goes to `/courses`.

Mobbin references:

- Meetup series dates list: https://mobbin.com/screens/ffae9f21-adba-4d25-808a-e168a4a1486b
- Uxcel certifications page with intro: https://mobbin.com/screens/46297401-e589-4f27-bdaa-96004cb3f750
- Magnific course intro then content list: https://mobbin.com/screens/ba0ea65e-e838-45b1-a9e7-c513f4b02e63

Verification:

- `npx eslint .` and `npx tsc --noEmit` are clean, and `npm run build` passes (five routes static).
- Rendered with a production server at 1440, 390 and 320: no horizontal overflow on any of the five pages.

Open issues:

- The BCIA source ends with the heading "Nähere Informationen zur internationalen BCIA-Zertifizierung", which has no text or link. It is left out; ask IFEN where it should point.
- The Categories icon set has only cap, users, brain, pulse and country flags. BCIA uses the cap and Webinars uses pulse, both repeated from other cards.
- The schedule rows still link to the individual live course pages (only category pages were redesigned), so `schedule.ts` is unchanged.
- The BCIA Mentoring page's other category cards (Further Training, the language trainings) still point at `/#training`.
- Course titles on the date cards stay as in `schedule.ts`, so many are German.


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
- ISF has no link on the source; linked to the local ISF page in Phase 5.
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
