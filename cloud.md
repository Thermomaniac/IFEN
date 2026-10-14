# Therapist profiles and booking (Phase 3, Stage 3)

Working notes for the therapist profile pages and the therapist booking flow. Read this before changing either, and before launch.

## What exists

- `/therapists/[id]`: one profile, for the fictional demo mentor (`lena-hartmann`). `generateStaticParams` returns only that id and `dynamicParams = false`, so every other id is a 404.
- Directory: the demo record is prepended as the first card (`src/app/therapists/page.tsx`). Every card shows the "View Profile" button and the same hover tint, but only records with `profileHref` link anywhere: the card, its name, the button and its map popup (`TherapistCard.tsx`, `TherapistMap.tsx`). On the 171 real practices the button is visual only, with no link and a default cursor.
- Page: ink hero (CourseHero, as the Figma frame), then a mist band with one white card per section (Professional Overview, Qualifications & Credentials, Neurofeedback Expertise, Professional Experience, Mentorship Offerings) and the "On This Page" card on the right, then Safety & FAQs (white) and the CTA footer. The hero, the nav card and the CTA footer each link "Register For Booking" to the booking flow. There is no practice section and no embedded booking.
- Section nav: `src/components/directory/ProfileNav.tsx`. Sticky card on desktop (ink title band, link list, booking CTA; the column is 17rem so the CTA stays on one line), sticky horizontal strip under the header below 64rem, scroll-spy via IntersectionObserver.
- Booking: a standalone flow at `/therapists/[id]/book`, which redirects to the first step: `book/format` (only when the mentor offers more than one format), `book/details`, `book/review`. The layout (`book/layout.tsx`) reuses the course registration frame (RegisterHeader, back link to the profile). Step forms: `src/components/directory/MentorBooking.tsx`; step order: `bookingSteps` in `src/data/therapistProfile.ts`; state: `src/lib/mentorBooking.ts` (sessionStorage, cleared on "Back to Therapist List" after a booking, which returns to the directory). No time picker: the mentor's schedule is shown and they confirm a time by email. Built on `Stepper`, `Form.module.css`, `OptionGroup`, `PaymentMark`, `Fields`, `ProcessingDialog`, `BankTransferDialog`.
- One session, one price (`DEMO_PROFILE.session`), formatted by `formatPrice`. The hero, info aside, review and Pay button all read it.
- Copy: `src/data/therapistProfile.ts`.

Sources: `Research Document/IFEN_Neurofeedback_Therapist_Mentor_Profile_Specification.pdf` (sections A to H) and `Research Document/ifen_mobbin_neurofeedback_profile_booking_report.html`.

## Demo fixture: replace before launch

`src/data/demo/demoTherapist.ts` holds a fictional mentor. Lena Hartmann and Praxis Hartmann do not exist. Every attribute is generated (`GENERATED_FIELDS`): name, practice, address, photo, credentials, level, experience, mentorship content, session price, formats, schedule and email (`example.com`, so nothing reaches a real inbox). The UI shows no sample banner, so this file is the only marker.

To remove it:

1. Delete `src/data/demo/`.
2. Drop `DEMO_THERAPIST` from `src/app/therapists/page.tsx`.
3. Point `src/app/therapists/[id]/page.tsx` and `src/app/therapists/[id]/book/**` (`getDemoProfile`, `generateStaticParams`) at the real profile source.

The portrait (`/therapists/placeholders/photo-2.jpg`) is a placeholder. The Figma frame shows a photo of a real practitioner; it is not used. A real profile needs a licensed or consented photo.

Payment is simulated: `ProcessingDialog` waits 2.4 s and shows the outcome. Nothing is charged, stored or sent. The outcome copy says so. The bank transfer dialog shows no account details, so no payee is invented.

## Data limits

The real directory records only: name, contact person, address, country, phone, email, website, methods, mentoring provider flag, IFEN expert level (some practices) and IFEN lecturers (some practices).

It does not record what the profile needs: professional qualification, experience, languages, formats, schedule, fees, mentorship content or accessibility. Real profiles need a profile backend (or a CMS) that practices fill and IFEN reviews. Live booking also needs a payment provider and a way for the mentor to confirm the time.

## Privacy (GDPR-aware, not a compliance guarantee)

The UI is designed to collect the minimum, but the UI alone does not make the service GDPR compliant. Before taking real bookings IFEN still needs, at least:

- a privacy notice and booking terms that the consent checkbox links to (the copy references them; the pages do not exist yet)
- a lawful basis and a data processing agreement between IFEN and each practice, since booking details go to the practice
- a decision on where booking data is stored, for how long, and who can access it
- a payment provider integration with its own processor terms
- a process for access, correction and deletion requests (the FAQ points practices and users to the IFEN contact email)

What the form does today:

- Collects first name, last name, email, preferred language, meeting format and an optional logistics note.
- Does not ask for diagnoses, symptoms, medication, medical history, EEG/qEEG files or client case details. The note hint and the FAQ tell users to leave them out. A free-text field can still receive them; real submission handling should treat the note accordingly.
- Privacy consent is required and unticked by default. Marketing consent is separate, optional and unticked.
- Mentoring is labelled as professional training, not therapy, wherever it appears.

## Deployment

- Staging: https://ifen-staging.up.railway.app, deployed by Railway from the `phase-2` branch.
- Production deploys from `main`. Do not merge or push to `main` for this work.
- The Railway CLI on this machine is not linked to a project, and the repo has no deploy config of its own. Staging deploys come from Railway's GitHub integration watching `phase-2`, so a push to `phase-2` is the deploy. No hook or script pushes automatically; pushes are manual and reviewed.
- If automatic staging deploys need to be confirmed or changed, do it in the Railway dashboard (service settings, source branch `phase-2`, staging environment). That needs dashboard access and is not something the repo can set safely.

## Checks

```bash
npx eslint .
npx tsc --noEmit
npm run build
```

Verified in the browser at 1440, 390 and 320: section nav and scroll-spy, the three "Register For Booking" links, the booking steps (format, details, review), the transfer dialog and its success state, "Back to Therapist List" clearing the store, price consistency, directory linking (one linked card) and 404 for other ids. The course registration steps (participant, billing, review) were rechecked after the shared register components gained optional props.

Known, not from this work: after a client-side navigation (for example the booking flow's back link) the browser tab keeps the previous page's title. The course registration back link does the same.
