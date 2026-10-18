# IFEN Remaining Pages Progress

Active phase: Follow-up corrections programme (phases 1 to 7, 2026-10-19), in progress. Interest, account and design-system programme complete (phases 0 to 6, 2026-10-18). Correction programme A to H complete (2026-10-18).

## Follow-up corrections programme

### Phase 4: Login screen (done 2026-10-19)

- Figma 40001147-110209: full screen split. Left, a white panel with the logo (links home), "Log In To IFEN" (32px semibold, muted), the fields in a 412px column with placeholders, Remember me and the recovery links on one row, the Login CtaButton, and "No account yet? Create an account" at the foot. Right, a 720px photo panel with the ink fade, the "Institute for EEG Neurofeedback" badge and the gradient headline; it is sticky, so it stays in view while the longer register form scrolls. Below 64rem only the form panel shows.
- The `/my-ifen` layout no longer renders the site header and CTA footer, as in the Figma frame; the logo is the way home. Applies to all four account screens so they stay one family.
- Photo: the Figma fill ("The BG 1") was downloaded once and cropped to the frame's visible area, saved as `public/account/login-photo.jpg` (839x1210, 96 KB). No Figma URL in code.
- Copy: login and register drop the intro (Figma); reset and remind keep theirs. Placeholder "Enter your passowrd" typo fixed. Submit reads "Login".
- Kept from the backend contract: username and password validation, error summary, password show/hide toggle, Remember me, the `/api/account/login` request and every failure path. `PasswordField` gained an optional `placeholder`.
- Figma vs backend: Figma shows one "Forget password?" link; the live account system has two recovery screens, so both "Forgot your password?" and "Forgot your username?" stay, stacked on the right of the row.
- Checks: eslint, tsc, build clean. Rendered at 1440 (matches the frame), 390 and 320 (no overflow); submit with empty fields shows both errors and focuses the summary; toggle switches the input to text with aria-pressed true; recovery and register links resolve. Register and remind checked at 1440 and 320 with the new shell (register styling is Phase 5).

### Phase 3: Module 1 pathway note (done 2026-10-19, pushed to staging)

- Figma 40000758-42181: on Module 1 only, the "Module 2 and Module 3 can be completed in any order." note sits on the soft grey fill (`--color-border-soft`, #f3f4f6) with no card edge. Sparkles, padding, type and the rise-in motion unchanged.
- Opt-in through `PathwayContent.noteTone: "soft"`, set only in `module1.ts`; `Pathway` passes it as `data-tone`. The Modules overview note stays white (checked).
- Checks: eslint, tsc, build clean. Rendered at 1440 (after the pinned sequence), 390 and 320 (no horizontal overflow).

### Phase 2: Training Modules flyout (done 2026-10-19, pushed to staging)

- Course Booking > "Training MODULES 1-4" is now a second-level flyout to the right of the dropdown, listing Module 1, Module 2, Module 3, Module 4 and IFEN 100 (routes checked against `src/data/courses/modulePaths.ts`; all five pages exist). The parent label still links to `/courses/modules`; a caret button next to it controls the flyout.
- Reuses the dropdown pattern in `MainNav`: same menu card, link style, Framer Motion fade (slide from the left instead of from the top). Opens on mouse hover with a 180ms close delay and an invisible bridge over the 17px gap, so the pointer can travel into it. Tap or click on the caret toggles it (touch never relies on hover). Keyboard: ArrowRight on the caret opens it and focuses Module 1; Escape or ArrowLeft closes only the flyout and returns focus to the caret; tabbing out closes it. The dropdown's document Escape handler now skips events the flyout already handled.
- Menus size to their content (`max-content`, 220px min, 20rem max), so no label wraps. Mobile drawer unchanged: the five modules stay listed under "Training MODULES 1-4" (a flyout makes no sense in a stacked drawer).
- Checks: eslint, tsc, build clean. Rendered 1440 (hover, pointer moved into the flyout), 1120 with touch emulation (tap, flyout right edge at 793px, no overflow), keyboard path at 1440, drawer at 390 and 320.

### Phase 1: Photo hero backgrounds (done 2026-10-19, pushed to staging)

- Figma "Hero Section" (node 40001128-108319) is the ink band with the listing photo (woman, man, waveform) on the right under the radial ink fade: the exact treatment the course listing hero already uses (same `.media`, `.fade` gradient stops 34% / 62.6% / 91.7%).
- `CourseHero`: the 17 heroes that Programme 4 made light (modules overview, Modules 2 to 4, IFEN 100, BCIA, BrainAvatar, ISF, Photobiomodulation, QEEG Courses, Supervision, Webinars, Training Courses, About IFEN, Lecturers, Topics, What Is Neurofeedback) now render that photo hero with `/training/training-offers-hero.jpg`. Copy, CTAs, breadcrumb, badge and highlights unchanged.
- The light tone CSS and `public/hero/ifen-hero-light.jpg` are removed (no remaining references). No new overlay style.
- Unchanged: booking heroes (line pattern), the Thomas Feiner and therapist portrait heroes, and the five heroes with their own photo.
- Checks: eslint, tsc, build clean. Rendered Module 4 at 1440 (matches Figma), About IFEN at 390 and 320 (photo strip under the copy, no horizontal overflow).

## Interest, account and design-system programme

### Phase 6: Bottom-anchored card CTAs (done 2026-10-18, pushed to staging)

- Shared `CourseArticles` pattern, with the Supervision Internship card as the reference: in default cards, panels and columns, the `links` row takes `margin-top: auto`, so buttons sit on the card's bottom padding and line up across cards in a row of uneven height. Cards without links keep their natural flow.
- Split cards (heading left, content right, from 64rem) no longer leave empty grid rows under the buttons: row-gap 0, with 16px margins between the content blocks.
- Pages checked (every page whose articles carry `links`): BCIA, Supervision/Internship/Mentoring, ISF, blog evidence article, Topics, What Is Neurofeedback, Modules 1 to 4.
- Checks: eslint, tsc, build clean. 1440 (BCIA, Supervision, Module 4: buttons on card padding, 32 to 40px), 390 and 320 (stacked, 24px card padding, no horizontal overflow).

### Phase 5: Module 4 "The Final Step" (done 2026-10-18, pushed to staging)

- The single card now answers four things in order, using only what the page already said: why it matters (the experience gathered, Module 4 is the last step to the certificate), what is already behind you (check rows: intensive course, internship, supervision), the examination (tiles: Online / Format, About 1 Hour / Duration, 2 CPD Credits / Under § 125 SGB V, the same figures as the hero) and the next action (primary "See Exam Dates" to `#dates`, secondary "Prepare With IFEN 100").
- `CourseArticles` default cards gained optional `listHeading` and `facts` (mist tiles, `dl`, value over label, auto-fit to one column on phones); `Link` gained `primary`. No other page sets them, so every other articles section renders as before.
- Mobbin references from Phase 0 (Duolingo test readiness, HubSpot certification process).
- Checks: eslint, tsc, build clean. 1440 (heading left, content right), 320 (tiles stacked, no overflow). Heading order h2 > h3 > h4.

### Phase 4: Light hero (done 2026-10-18, pushed to staging)

- `CourseHero` gains a light tone, chosen automatically: a hero with no booking panel, no portrait and no own `image` is light. Mist band, the Figma "Hero Section" IFEN photo (`public/hero/ifen-hero-light.jpg`, 2400×1043, 100 KB, copied from the Figma export; no Figma URL at runtime) covering the band pinned right, a mist fade from the left (solid behind the copy, clear by 66%), ink title, `--color-heading` breadcrumb, description and metric labels, ink metric values, badge on 8% ink. Content unchanged.
- Light on 17 heroes: modules overview, Modules 2 to 4, IFEN 100, BCIA, BrainAvatar, ISF, Photobiomodulation, QEEG Courses, Supervision, Webinars, Training Courses, About IFEN, Lecturers, Topics, What Is Neurofeedback.
- Unchanged: booking heroes (Module 1, QEEG pages, webinar detail pages) and the Thomas Feiner and therapist profiles (portrait). The five heroes that already carry their own photo (course listing, therapist directory, blog, blog article, Areas of Application) keep it under the ink fade: the listing and directory heroes are Paper/Figma designs, and swapping their photos would change content.
- Stacked (below 64rem) the photo becomes the shared bottom strip, fading up into mist.
- Checks: eslint, tsc, build clean. 1440 (faces clear of the copy), 390, 320 on all 24 hero routes with no horizontal overflow; reduced motion renders.

### Phase 3: Nav and modules overview (done 2026-10-18, pushed to staging)

- Course Booking menu: "Certified Neurofeedback Therapist IFEN" is now "Training MODULES 1-4" (one constant, `MODULES_TITLE` in `modulePaths.ts`). The parent links to the overview; Module 1, 2, 3, 4 and IFEN 100 sit in a nested list under it, indented with a hairline, in the desktop dropdown and the mobile drawer. Always visible rather than a flyout, so keyboard and touch reach it in plain tab order. Nav types gained one nesting level (`NavChild`).
- Overview hero title "Training / MODULES 1-4"; the old title moved into the badge. Breadcrumbs on the overview and on Modules 1 to 4 and IFEN 100, the Module 1 secondary CTA and the Training Courses link use the same name. Meta title leads with it.
- Pathway note "Module 2 and Module 3 can be completed in any order" on white with the standard card hairline (overview and Module 1).
- "Overview of All Modules" cards: Phosphor regular icons (UsersThree, ChalkboardTeacher, GraduationCap, ListChecks) in discs tinted with existing tokens (`--color-tint-teal`, `--color-cream`, lime, `--color-border-soft`); primary md buttons; subgrid rows so icon, eyebrow, title, text and button line up across a row, button at the foot. Falls back to the old flex column without subgrid.
- Checks: eslint, tsc, build clean. 1440 (dropdown, cards aligned, buttons at one baseline), 390 (drawer nesting), 320 (no overflow, title wraps), reduced motion.

### Phase 2: Account screens (done 2026-10-18, pushed to staging)

- Four routes under `/my-ifen` (log in, `/register`, `/reset`, `/remind`), `noindex`. Header Login and Register (desktop and drawer) and the footer "Login Portal" now point there. One layout (`AccountScreen`): mist band, white card with label, h1 and intro, form; IFEN photo (`/about/ifen-neurofeedback.jpg`) on the right from 64rem up, dropped below; the card goes edge to edge at 30rem.
- Fields exactly as the live Joomla pages: login username, password (show/hide toggle, max 99), Remember me, links to both recovery screens and to registration; register name, username, password with confirmation, email, reCAPTCHA v2; reset and remind email plus reCAPTCHA. Live password checklist (8+ characters, number, special character, upper and lower case) tied to the field with `aria-describedby`, each rule announced as met or not met.
- Shared pieces extended, not forked: `PasswordField`, `TextField` `maxLength`/`autoCapitalize`, `CheckboxField` `plain`, `SectionHeading` `as="h1"`, `EyeIcon`/`EyeSlashIcon`. Rules shared by client and server in `src/lib/accountForm.ts`, copy in `src/data/account.ts`.
- Integration boundary: `POST /api/account/[action]` validates again, verifies reCAPTCHA with `RECAPTCHA_SECRET_KEY` (register, reset, remind), forwards JSON to `${IFEN_AUTH_ENDPOINT}/<action>` (10 s timeout), passes the service's `Set-Cookie` through, and only accepts redirects to same-site paths or neurofeedback-info.de. Login 401/403 maps to "Username and password do not match"; 409/422 field errors are passed back for known fields only. Without the endpoint, or without the reCAPTCHA secret on a captcha form, it answers 503 and the form says the request was not sent, with a link to the live My IFEN page. Nothing here decides a login.
- Without `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` the captcha forms show a note instead of the widget; the server still refuses them (fail closed).
- **Open dependency:** IFEN must provide an account service (a Joomla bridge) answering `POST /login|/register|/reset|/remind` with JSON, setting the Joomla session cookie on login, and returning 401 for wrong credentials and 409/422 `{errors}` for taken usernames or emails. Then set `IFEN_AUTH_ENDPOINT`, plus a reCAPTCHA v2 key pair registered for the staging and production domains (`NEXT_PUBLIC_RECAPTCHA_SITE_KEY` at build, `RECAPTCHA_SECRET_KEY` at runtime). The live key is bound to neurofeedback-info.de and cannot be reused.
- Checks: eslint, tsc, build clean. API: 404 unknown action, 400 bad JSON, 422 missing fields, weak password and mismatch, 422 missing captcha, 503 unconfigured, 401 wrong credentials, 200 with session cookie passed through and an off-site redirect dropped (stand-in upstream), invalid captcha token rejected by Google's live siteverify. Not verified end to end: a passing captcha, since that needs a real key for the domain. Browser: 1440, 390, 320 with no overflow; empty submit focuses the summary; toggle switches type, `aria-pressed` and label; failure alert and success panel take focus; reduced motion renders.

### Phase 1: Interest capture (done 2026-10-18, pushed to staging)

- `InterestCapture` (`src/components/course/InterestCapture.tsx`) sits before Speakers on Module 1, BCIA QEEG Mentoring, QEEG for Your Practice, QEEG Workshop and both webinars. White band after a mist band (Module 1, BCIA), mist band after a white one (the rest). Standard section header, then one card (white on mist, mist on white).
- Fields as the live prospect form: Salutation (optional; Mr., Mrs., Ms.), First Name, Last Name, Email, Phone, required AGB checkbox linking the live AGB. No newsletter or marketing consent. The course (hero title, booking code, path) is read from the page and sent with the submission; it also shows next to the button.
- Booking stays primary: the submit uses the secondary button style. Copy in `src/data/interest.ts`; rules shared by client and server in `src/lib/interestForm.ts`. Checkbox moved into the shared `register/Fields.tsx` (`CheckboxField`); MentorBooking uses it too.
- States: errors on submit (summary focused) or on blur once filled, then live; sending (button disabled, spinner, `aria-busy`); success panel (`role="status"`, heading focused) only on a confirmed `{ok: true}`; failure alert (`role="alert"`, focused) with a mailto fallback carrying the course and code.
- Integration boundary: `POST /api/interest` validates again and forwards JSON `{course, salutation, firstName, lastName, email, phone, termsAccepted}` to `IFEN_INTEREST_ENDPOINT` (optional `IFEN_INTEREST_TOKEN` bearer, 10 s timeout). Without the variable it answers 503 and the form says the details were not sent.
- **Open dependency:** IFEN must provide a service that writes into the Seminarman prospect lists (the Joomla form needs a session and CSRF token, so it cannot be called from here), and say which list each course code maps to. Then set `IFEN_INTEREST_ENDPOINT` on Railway. Until then every submission shows the honest "not connected" message.
- Checks: eslint, tsc, build clean. API: 400 bad JSON, 422 invalid fields, 503 unconfigured, 200 with a stand-in upstream (payload and bearer verified), 502 on upstream error. Browser: 1440, 390, 320 with no horizontal overflow, long German surname wraps; empty submit focuses the summary; 503 and success states render and take focus.

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
