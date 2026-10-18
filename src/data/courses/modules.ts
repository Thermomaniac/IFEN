// The IFEN certification modules after Module 1: Module 2 (internship), Module 3 (supervision),
// Module 4 (examination) and the IFEN 100 written exam mentoring, plus the overview page that
// leads through all four. Content from the live German pages under
// neurofeedback-info.de/termine-kursbuchung-seminare/modul-1-4 and the FAQ (Itemid=1442),
// translated in full. Dates: the source tables, by course code, from `schedule.ts`.

import type { Category } from "../course";
import {
  LISTING_PATH,
  type ArticlesContent,
  type CategoriesContent,
  type CourseHeroContent,
  type CtaContent,
  type FaqContent,
  type FeaturesContent,
  type PathwayContent,
} from "../coursePage";
import { ALL_OFFERS, BOOKING_CRUMB, RELATED, datesFor, type BookingPage } from "../booking/shared";
import { lecturer } from "../ifen/lecturers";
import { IFEN100_PATH, MODULE1_PATH, MODULE2_PATH, MODULE3_PATH, MODULE4_PATH, MODULES_PATH } from "./modulePaths";

export { IFEN100_PATH, MODULE2_PATH, MODULE3_PATH, MODULE4_PATH, MODULES_PATH };

const LIVE_BOOKING = "https://www.neurofeedback-info.de/termine-kursbuchung-seminare/modul-1-4";
const TEAMVIEWER = "https://www.teamviewer.com/en/download/";
const CREDITS_URL =
  "https://www.neurofeedback-info.de/index.php?option=com_content&view=article&id=86&Itemid=1458&lang=de";

const MODULES_CRUMB = { label: "Certified Neurofeedback Therapist", href: MODULES_PATH };

const MODULE_CATEGORIES: Record<"m1" | "m2" | "m3" | "m4" | "ifen100" | "overview", Category> = {
  overview: { id: "modules", title: "All Modules", icon: { kind: "cap" }, href: MODULES_PATH },
  m1: { id: "module-1", title: "Module 1 Intensive Course", icon: { kind: "brain" }, href: MODULE1_PATH },
  m2: { id: "module-2", title: "Module 2 Internship", icon: { kind: "users" }, href: MODULE2_PATH },
  m3: { id: "module-3", title: "Module 3 Supervision", icon: { kind: "users" }, href: MODULE3_PATH },
  m4: { id: "module-4", title: "Module 4 Examination", icon: { kind: "cap" }, href: MODULE4_PATH },
  ifen100: { id: "ifen-100", title: "IFEN 100 Exam Mentoring", icon: { kind: "pulse" }, href: IFEN100_PATH },
};

function related(...items: Category[]): CategoriesContent {
  return { label: "Related", heading: "Keep Exploring", items };
}

const MODULES_CTA: CtaContent = {
  label: "Certified Neurofeedback Therapist",
  headingLines: ["Your Next Step", "Towards the Certificate"],
  action: { label: "View All Course Dates", href: LISTING_PATH },
  secondary: { label: "See All Modules", href: MODULES_PATH },
};

const DATES_HEAD = { label: "Dates", heading: "Book Your Place" };

/** The module cards shown on the overview and under Module 1 ("Overview of All Modules"). */
export const moduleCards: FeaturesContent = {
  label: "The Modules",
  heading: "Overview of All Modules",
  intro: ["Modules 2 and 3 can be completed in any order. IFEN 100 is an optional mock exam before Module 4."],
  items: [
    {
      eyebrow: "Module 2",
      heading: "Internship",
      text: "At least 5 units of hands-on practice in one of our certified partner practices.",
      link: { label: "View Module 2", href: MODULE2_PATH },
    },
    {
      eyebrow: "Module 3",
      heading: "Supervision",
      text: "At least 5 units online with a personal mentor while you work with your own clients.",
      link: { label: "View Module 3", href: MODULE3_PATH },
    },
    {
      eyebrow: "Module 4",
      heading: "Examination",
      text: "The online examination, about one hour, that completes your certification.",
      link: { label: "View Module 4", href: MODULE4_PATH },
    },
    {
      eyebrow: "IFEN 100",
      heading: "Written Exam Mentoring",
      text: "A 65-question practice test to check your knowledge before the examination.",
      link: { label: "View IFEN 100", href: IFEN100_PATH },
    },
  ],
};

// ---------- Module 2 ----------

export const module2 = {
  meta: {
    title: "Module 2, Internship | IFEN",
    description:
      "Module 2 of the IFEN certification: at least 5 units of hands-on neurofeedback practice in a certified partner practice, 5 CPD credits.",
  },

  hero: {
    title: "Module 2\nInternship",
    breadcrumb: [BOOKING_CRUMB, MODULES_CRUMB, { label: "Module 2" }],
    badge: "Module 2 of the IFEN Training",
    description:
      "Start the next chapter of your certification as an IFEN neurofeedback therapist with an internship in one of our certified partner practices.",
    highlights: [
      { value: "5 UE", label: "Minimum units" },
      { value: "Partner practice", label: "Your choice of venue" },
      { value: "5 credits", label: "Under § 125 SGB V" },
    ],
  },

  sections: [
    {
      kind: "articles",
      id: "about",
      variant: "panels",
      content: {
        label: "Module 2",
        heading: "Internship (5 UE)",
        items: [
          {
            heading: "Requirements for Taking Part",
            list: [
              "You should be familiar with the content of Module 1. It is the basis for this internship and is not taught again.",
              "You need access to neurofeedback equipment so that you can put what you learn into practice straight away.",
            ],
          },
          {
            heading: "What You Learn in Module 2",
            list: [
              "Individualised neurofeedback settings",
              "Intensive hands-on training with neurofeedback hardware and software",
              "Interpreting EEG data from the neurofeedback session",
              "Recognising and handling artefacts during the neurofeedback session",
            ],
          },
        ],
      },
    },
    {
      kind: "articles",
      id: "register",
      variant: "rows",
      content: {
        label: "Venue and Registration",
        heading: "Your Way to Registration",
        intro: [
          "The internship takes place in one of our certified partner practices. Our partner practices are listed in the therapist directory.",
        ],
        numbered: true,
        items: [
          {
            heading: "Choose a Partner Practice",
            paragraphs: [
              "Choose your internship provider from our therapist directory. All entries marked Internships & mentoring are accredited by IFEN as internship providers.",
            ],
            links: [{ label: "Find a Partner Practice", href: "/therapists" }],
          },
          {
            heading: "Agree a Date and Register",
            paragraphs: [
              "Agree a date with the internship provider, then register for this date with a binding booking through our registration.",
            ],
            links: [{ label: "Register for Module 2", href: `${LIVE_BOOKING}/modul-2/64-modul-2/15-modul-2-praktikum.html#appform` }],
          },
          {
            heading: "Pay the Invoice",
            paragraphs: ["The invoice for the internship must be paid before the agreed date."],
          },
          {
            heading: "Show Your Invoice Number",
            paragraphs: [
              "Please give the internship supervisor the invoice number and payment date so that they can bill their hours with IFEN correctly.",
            ],
          },
        ],
      },
    },
    {
      kind: "features",
      id: "note",
      content: {
        label: "Please Note",
        heading: "Before You Book",
        intro: [
          "It matters to us that you are well prepared and feel confident. If you have questions or need more information, we are always here to help.",
        ],
        items: [
          {
            icon: "calendar",
            heading: "Valid for One Year",
            text: "Your Module 2 booking should be used within one year. After that it is no longer valid.",
          },
          {
            icon: "refresh",
            heading: "All Four Modules Within a Year",
            text: "For a successful certification as an IFEN neurofeedback therapist, complete all four modules within one year. Otherwise the certification has to start again from the beginning.",
          },
          {
            icon: "books",
            heading: "No QEEG Analysis",
            text: "Module 2 does not teach QEEG analysis or evaluation. QEEG analysis requires successful participation in one of our QEEG courses.",
          },
          {
            icon: "clock",
            heading: "Choose Your Hours",
            text: "You decide how many internship hours you take. At least 5 UE are needed to complete the module.",
          },
        ],
      },
    },
    {
      kind: "dates",
      id: "dates",
      content: {
        ...DATES_HEAD,
        intro: [
          "Successful completion earns 5 CPD credits under § 125 SGB V. Subject to change.",
        ],
        items: datesFor("Module 2", ["M2-P-IFEN-DE"]),
      },
    },
    {
      kind: "speakers",
      id: "speakers",
      content: {
        label: "Internship Supervisors",
        heading: "Speakers",
        people: [
          "timo-skladny",
          "normen-schack",
          "hanelore-branga",
          "monique-breithaupt-peters",
          "lena-ehrhard",
          "annette-stolle",
        ].map(lecturer),
      },
    },
  ],

  related: related(MODULE_CATEGORIES.overview, MODULE_CATEGORIES.m3, RELATED.supervision),
  cta: MODULES_CTA,
} satisfies BookingPage;

// ---------- Module 3 ----------

export const module3 = {
  meta: {
    title: "Module 3, Supervision | IFEN",
    description:
      "Module 3 of the IFEN certification: at least 5 units of online supervision with a personal mentor while you work with your own clients, 5 CPD credits.",
  },

  hero: {
    title: "Module 3\nSupervision",
    breadcrumb: [BOOKING_CRUMB, MODULES_CRUMB, { label: "Module 3" }],
    badge: "Module 3 of the IFEN Training",
    description: [
      "Your next step towards Certified Neurofeedback Therapist IFEN. In this module you run neurofeedback sessions in your own practice for the first time, accompanied by a personal mentor.",
    ],
    highlights: [
      { value: "5 UE", label: "1 UE = 45 minutes" },
      { value: "Online", label: "Phone, Zoom or Skype" },
      { value: "5 credits", label: "Under § 125 SGB V" },
    ],
  },

  sections: [
    {
      kind: "articles",
      id: "about",
      variant: "panels",
      content: {
        label: "Module 3",
        heading: "Supervision (5 UE)",
        intro: ["Supervision covers at least 5 UE, where one UE is 45 minutes."],
        items: [
          {
            heading: "Focus",
            list: ["Discussing your own clients", "Advice on specific questions"],
          },
          {
            heading: "Registering for Supervision",
            paragraphs: [
              "You can book supervision online on this page. Choose Book, then enter your preferred date and supervisor in the message field.",
            ],
          },
        ],
      },
    },
    {
      kind: "articles",
      id: "how",
      variant: "rows",
      content: {
        label: "How It Works",
        heading: "How Does Supervision Work?",
        numbered: true,
        items: [
          {
            heading: "By Phone or Online",
            paragraphs: [
              "Supervision usually takes place by landline or online over Zoom, Skype or another channel. Please agree this with your mentor.",
              "In this concept, unique so far, you can also share your screen with your mentor. You can discuss and follow the session as if the trainer were sitting in the room. This gives you maximum freedom to arrange the sessions to suit your possibilities and needs.",
            ],
          },
          {
            heading: "Technical Requirements",
            paragraphs: [
              "A good internet connection and, optionally, screen-sharing software. We recommend TeamViewer, which is free to download.",
            ],
            links: [{ label: "Download TeamViewer", href: TEAMVIEWER }],
          },
          {
            heading: "Number of Units",
            paragraphs: [
              "As in Module 2 (internship), you decide how many supervision units you take in Module 3.",
              "Online sessions with Dr. Georg Handwerker, Thomas Feiner or Normen Schack cost 150.00 € per UE.",
            ],
          },
        ],
      },
    },
    {
      kind: "dates",
      id: "dates",
      content: {
        ...DATES_HEAD,
        intro: [
          "Successful completion earns 5 CPD credits under § 125 SGB V. Subject to change.",
        ],
        items: datesFor("Module 3", ["M3-S", "M3-Std"]),
      },
    },
    {
      kind: "speakers",
      id: "speakers",
      content: {
        label: "Supervisors",
        heading: "Speakers",
        people: [
          "normen-schack",
          "hanelore-branga",
          "monique-breithaupt-peters",
          "lena-ehrhard",
          "annette-stolle",
        ].map(lecturer),
      },
    },
  ],

  related: related(MODULE_CATEGORIES.overview, MODULE_CATEGORIES.m2, MODULE_CATEGORIES.m4),
  cta: MODULES_CTA,
} satisfies BookingPage;

// ---------- Module 4 ----------

export const module4 = {
  meta: {
    title: "Module 4, Examination | IFEN",
    description:
      "Module 4 of the IFEN certification: the online examination, about one hour, that completes your training as a Certified Neurofeedback Therapist IFEN.",
  },

  hero: {
    title: "Module 4\nExamination",
    breadcrumb: [BOOKING_CRUMB, MODULES_CRUMB, { label: "Module 4" }],
    badge: "Module 4 of the IFEN Training",
    description:
      "Congratulations, you are almost there! Your last step to the certificate is an online examination of about one hour.",
    highlights: [
      { value: "Online", label: "Examination" },
      { value: "About 1 hour", label: "Duration" },
      { value: "2 credits", label: "Under § 125 SGB V" },
    ],
  },

  sections: [
    {
      kind: "articles",
      id: "about",
      content: {
        label: "Module 4",
        heading: "The Final Step",
        items: [
          {
            heading: "Congratulations, You Are Almost There!",
            paragraphs: [
              "You have completed the intensive course, the internship and the supervision, and gathered a lot of valuable experience on your way to Certified Neurofeedback Therapist IFEN.",
              "Your last step to the certificate is Module 4. For this you take an online examination that lasts about one hour.",
              "Successful completion earns 2 CPD credits under § 125 SGB V.",
            ],
            links: [{ label: "Prepare With IFEN 100", href: IFEN100_PATH }],
          },
        ],
      },
    },
    {
      kind: "dates",
      id: "dates",
      content: {
        ...DATES_HEAD,
        items: datesFor("Module 4", ["IFEN-100-DE", "M4-P"]),
      },
    },
  ],

  related: related(MODULE_CATEGORIES.overview, MODULE_CATEGORIES.ifen100, MODULE_CATEGORIES.m3),
  cta: MODULES_CTA,
} satisfies BookingPage;

// ---------- IFEN 100 ----------

export const ifen100 = {
  meta: {
    title: "IFEN 100, Written Exam Mentoring | IFEN",
    description:
      "IFEN 100: an online practice test of 65 questions from a pool of 105, 70 minutes, to check your knowledge before the IFEN certification examination.",
  },

  hero: {
    title: "IFEN 100\nWritten Exam Mentoring",
    breadcrumb: [BOOKING_CRUMB, MODULES_CRUMB, { label: "IFEN 100" }],
    badge: "Exam Preparation",
    description:
      "Check your knowledge with questions like those in the real examination, before Module 4 or simply to reflect on what you know.",
    highlights: [
      { value: "65 questions", label: "From a pool of 105" },
      { value: "70 minutes", label: "Time limit" },
      { value: "70%", label: "Pass mark" },
    ],
  },

  sections: [
    {
      kind: "articles",
      id: "about",
      variant: "panels",
      content: {
        label: "IFEN 100",
        heading: "About the Test",
        items: [
          {
            heading: "Why This Test?",
            paragraphs: [
              "The final examination for Certified Neurofeedback Therapist at IFEN covers many important areas of knowledge.",
              "With the IFEN 100 test you can check your level in a targeted way, with questions like those that can come up in the real examination.",
              "Even if you are not planning an examination (yet), the test is an ideal way to reflect on your expertise in practical terms.",
            ],
          },
          {
            heading: "What Does the Test Cover?",
            paragraphs: [
              "The test has 65 questions, chosen at random from a pool of 105. They cover these areas. Most questions are multiple choice, some are open. No aids are allowed.",
            ],
            list: [
              "History of neurofeedback",
              "Electrophysiology",
              "Neuroanatomy",
              "Therapy",
              "Psychology",
              "Psychopathology",
            ],
          },
        ],
      },
    },
    {
      kind: "articles",
      id: "process",
      variant: "rows",
      content: {
        label: "Process and Evaluation",
        heading: "How It Works",
        numbered: true,
        items: [
          {
            heading: "After Booking",
            paragraphs: ["After booking you receive by email:"],
            list: ["A link to the test", "The password you need", "Your invoice and bank details (for bank transfer)"],
          },
          {
            heading: "Taking the Test",
            paragraphs: [
              "The test starts as soon as you enter your name and email address. When you finish, you see your score straight away, with the correct answers to all questions.",
            ],
          },
          {
            heading: "Paying the Fee",
            paragraphs: [
              "If you do not pay with PayPal, please pay by bank transfer within 14 days. The payment details are in your booking confirmation and on the attached invoice.",
            ],
          },
        ],
      },
    },
    {
      kind: "articles",
      id: "details",
      content: {
        label: "Technical Details",
        heading: "Technical Details of the Test",
        items: [
          {
            heading: "Before You Start",
            list: [
              "65 questions from a pool of 105",
              "Time limit: 70 minutes",
              "The test must be completed in one sitting (no saving)",
              "One question per page",
              "You can go back and correct answers",
              "The test can only be finished once every question is answered",
              "Passed with at least 70% correct answers",
            ],
            paragraphs: [
              "The questions come in different modes: mostly multiple choice, less often questions that ask for a direct answer. No aids are allowed.",
            ],
          },
        ],
        note: "We wish you every success!",
      },
    },
    {
      kind: "dates",
      id: "dates",
      content: { ...DATES_HEAD, items: datesFor("IFEN 100", ["IFEN-100-DE"]) },
    },
  ],

  related: related(MODULE_CATEGORIES.overview, MODULE_CATEGORIES.m4, ALL_OFFERS),
  cta: MODULES_CTA,
} satisfies BookingPage;

// ---------- Overview ----------

export const modulesOverview = {
  meta: {
    title: "Certified Neurofeedback Therapist IFEN, Modules 1 to 4 | IFEN",
    description:
      "The four modules of the IFEN certification, from the 5-day intensive course through internship and supervision to the examination, with dates and FAQ.",
  },

  hero: {
    title: "Certified Neurofeedback\nTherapist IFEN",
    wide: true,
    breadcrumb: [BOOKING_CRUMB, { label: "Certified Neurofeedback Therapist" }],
    badge: "Training Modules 1 to 4",
    description:
      "Welcome! We are glad you are interested in our training concept. A varied and fulfilling career is waiting for you.",
    highlights: [
      { value: "4 modules", label: "Theory and practice" },
      { value: "5 days", label: "Module 1 intensive course" },
      { value: "1:1 mentor", label: "For every participant" },
    ],
  } satisfies CourseHeroContent,

  intro: {
    label: "Theory and Practice",
    heading: "Your Way to the Certificate",
    items: [
      {
        heading: "Welcome",
        paragraphs: [
          "Your way to Certified Neurofeedback Therapist IFEN is made up of four modules. You can complete Module 2 and Module 3 in any order.",
        ],
      },
      {
        heading: "Our Philosophy",
        paragraphs: [
          "Our training concept relies on classic, proven methods and training approaches based on normative databases, supplemented with biofeedback. Every client is unique; we know how important an individually tailored, holistic treatment is for therapy.",
          "Together with our many years of experience from our own practice and feedback from our graduates, we have developed a module system that takes you efficiently, safely and simply to Certified Neurofeedback Therapist IFEN.",
        ],
      },
    ],
  } satisfies ArticlesContent,

  pathway: {
    label: "Certification",
    heading: "The IFEN Certificate Pathway",
    steps: [
      { label: "Module 1", heading: "Intensive Course", text: "A 5-day intensive course that introduces the fundamentals of neurofeedback", href: MODULE1_PATH },
      { label: "Module 2", heading: "Internship", text: "At least 5 hours, also possible online at one of our many accredited partners", href: MODULE2_PATH },
      { label: "Module 3", heading: "Supervision", text: "5 hours with a certified expert who guides you step by step", href: MODULE3_PATH },
      { label: "Module 4", heading: "Examination", text: "The examination for neurofeedback therapist itself", href: MODULE4_PATH },
    ],
    note: "Module 2 and Module 3 can be completed in any order.",
  } satisfies PathwayContent,

  cards: moduleCards,

  dates: {
    label: "Dates",
    heading: "Module Dates",
    intro: ["Module 1 dates first, then the flexible units for Modules 2 and 3, IFEN 100 and Module 4."],
    codes: [
      "M1-051026-DE",
      "M1-231026-ES",
      "M1-091126-DE",
      "M1-220227-DE",
      "M1-070627-DE",
      "M1-221127-DE",
      "M1-210228-DE",
      "M1-201128-DE",
      "M2-P-IFEN-DE",
      "M3-S",
      "M3-Std",
      "IFEN-100-DE",
      "M4-P",
    ],
  },

  interest: {
    label: "Future Dates",
    heading: "Module 1 in English and Spanish",
    intro: ["No dates are set yet. Register your interest and we will let you know when a course is scheduled."],
    codes: ["M1-EN", "M1-ES"],
  },

  faq: {
    label: "FAQ",
    heading: "Questions About the Training",
    intro: [
      "Course costs, requirements for training and practice, and whether health insurers cover neurofeedback: answers to these and many other questions about the IFEN training and working as a neurofeedback therapist.",
    ],
    items: [
      {
        question:
          "How Does IFEN Training Differ From Other Neurofeedback Course Providers, Such as the German Society for Biofeedback?",
        answer: [
          "A key difference is the number and quality of training hours. IFEN follows international standards, including those of the Biofeedback Certification International Alliance (BCIA), and also offers a wide range of further training in neurofeedback.",
          "Our training concept is practical and scientifically grounded. The certification examination requires intensive study of the seminar materials, which stands for quality and credibility.",
          "Why are our graduates successful so quickly? Because we accompany them closely: with 1:1 mentoring, supervision and internships. Especially in the first months after the training blocks we stay in close contact and support them step by step.",
          "What sets IFEN apart: every participant gets a personal 1:1 mentor. Our mentors are experienced therapists with their own successful practice; our lecturers bring extensive practical experience.",
          "IFEN also teaches content that the German Society for Biofeedback (DGBFB) does not teach in this form, for example Z-score training, sLORETA neurofeedback and ISF (infra-slow fluctuation).",
          "The result: neurofeedback training at IFEN is practical, internationally recognised and prepares you specifically for certification and for working in practice.",
        ],
      },
      {
        question: "How Much Does the Training Cost (Certified Neurofeedback Therapist IFEN)?",
        answer: [
          {
            list: [
              "Module 1, 5-day course: 1,750.00 € per person",
              "Module 2, internship: 150.00 € per unit. At least 5 units required. Total: 750.00 € per person",
              "Module 3, supervision: 150.00 € per unit. At least 5 units required. Total: 750.00 € per person",
              "Module 4, examination: flat fee of 250.00 € per person",
              "In-house training: flat prices with suitable discounts depending on the number of participants",
            ],
          },
          "Note: the cost structure is modular, transparent and geared to certification as a neurofeedback therapist (IFEN).",
        ],
      },
      {
        question: "What Do I Need for the Training and for Practising?",
        answer: [
          "Clinical work as a neurofeedback therapist requires medical knowledge or a corresponding background. Non-medical practitioners (Heilpraktiker) can also practise neurofeedback.",
          "Without a medical background, we recommend the peak performance courses (performance enhancement, coaching, sport) so that you can use neurofeedback meaningfully and on a sound legal footing.",
        ],
      },
      {
        question: "I Know Nothing About Computers. Can I Still Learn Neurofeedback?",
        answer:
          "Yes. The software is intuitive and easy for beginners to learn. In the training we introduce the technical side step by step, with practical exercises and clear instructions.",
      },
      {
        question: "Are There CPD Credits?",
        answer: [
          "As a rule you can submit your IFEN certificate to receive CPD credits.",
          { links: [{ label: "More About CPD Credits", href: CREDITS_URL }] },
        ],
      },
      {
        question: "Where Do I Register for the Internship and Supervision? Online, by Phone or by Email?",
        answer:
          "You register for the internship and supervision online through our website, just like a seminar registration. This secures fixed dates and reliable planning.",
      },
      {
        question: "When Does the Examination Take Place?",
        answer:
          "The examination can take place in several formats: often during the internship, or online. With the new online examination platform you can also take it in your own practice, flexibly and with reliable planning.",
      },
      {
        question: "How Much Does Neurofeedback Equipment Cost?",
        answer:
          "Neurofeedback equipment is affordable. High-quality systems certified as medical devices cost from about 3,500.00 € including software. We are happy to advise you on the right equipment for your setting.",
      },
      {
        question: "Do Health Insurers Cover Neurofeedback Treatment?",
        answer:
          "Occupational therapists can use neurofeedback as a therapeutic tool within the overall treatment. Doctors and psychotherapists bill neurofeedback, among other things, in the context of behavioural therapy (depending on indication and conditions). For details, please check the billing rules that apply to you.",
      },
      {
        question: "Is the Training Tied to Particular Devices or Systems?",
        answer:
          "No. You can work with your own neurofeedback equipment. We do recommend buying only after advice, so that together we find a tailored solution (devices, software, accessories) for your goals.",
      },
      {
        question: "What Does a Neurofeedback Session Cost on Average?",
        answer:
          "As a private service, prices are usually between 40.00 € and about 100.00 €. The exact price depends on several factors (for example location, practice structure, indication). A QEEG (quantitative EEG) can cost up to 600.00 €.",
      },
      {
        question: "How Many Sessions Are Needed? Do the Results Last?",
        answer:
          "First improvements often show within 10 sessions. To stabilise the effects, about 20 further sessions are usually advisable. The number can vary with the condition. Many patients report lasting improvements in their symptoms.",
      },
      {
        question: "Where Can I Read Up Online Beforehand?",
        answer: [
          "These sources are in German.",
          {
            heading: "Neurofeedback Basics",
            links: [
              { label: "Wikipedia: Neurofeedback", href: "http://de.wikipedia.org/wiki/Neurofeedback" },
              {
                label: "Dissertation (German National Library, PDF)",
                href: "http://deposit.d-nb.de/cgi-bin/dokserv?idn=973071133&dok_var=d1&dok_ext=pdf&filename=973071133.pdf",
              },
              { label: "Wikipedia: Nerve Cell", href: "http://de.wikipedia.org/wiki/Nervenzelle" },
              {
                label: "Planet Wissen: Nerve Cells",
                href: "http://www.planet-wissen.de/natur_technik/anatomie_mensch/nerven/nervenzellen.jsp",
              },
            ],
          },
          {
            heading: "Learning Theory Basics",
            links: [
              { label: "Stangl: Conditioning", href: "http://www.stangl.eu/psychologie/definition/Konditionierung.shtml" },
              {
                label: "Stangl: Operant Conditioning",
                href: "http://www.stangl-taller.at/ARBEITSBLAETTER/LERNEN/KonditionierungOperant.shtml",
              },
              {
                label: "Stangl: Skinner's Conditioning",
                href: "http://www.stangl-taller.at/ARBEITSBLAETTER/LERNEN/KonditionierungSkinner.shtml",
              },
            ],
          },
          {
            heading: "Cognitive Function Basics",
            links: [
              { label: "Stangl: Memory", href: "http://arbeitsblaetter.stangl-taller.at/GEDAECHTNIS/" },
              { label: "Stangl: Attention", href: "http://arbeitsblaetter.stangl-taller.at/GEDAECHTNIS/Aufmerksamkeit.shtml" },
              { label: "Wikipedia: Executive Functions", href: "http://de.wikipedia.org/wiki/Exekutive_Funktionen" },
            ],
          },
          {
            heading: "Neuroanatomy Basics",
            links: [{ label: "Gehirn-Atlas", href: "http://www.gehirn-atlas.de/" }],
          },
        ],
      },
    ],
    help: {
      heading: "Still Have Questions?",
      text: "Write to us and we will get back to you.",
      email: "info@neurofeedback-info.de",
    },
  } satisfies FaqContent,

  related: related(MODULE_CATEGORIES.m1, RELATED.supervision, ALL_OFFERS),
  cta: {
    label: "Start Your Certification",
    headingLines: ["Begin With", "Module 1"],
    action: { label: "View Module 1", href: MODULE1_PATH },
    secondary: { label: "View All Course Dates", href: LISTING_PATH },
  } satisfies CtaContent,
};
