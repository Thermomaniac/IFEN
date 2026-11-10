// Training FAQ, English. Source: https://www.neurofeedback-info.de/en/faq-fragen-und-antworten.html
// (German original: https://neurofeedback-info.de/index.php?option=com_content&view=article&id=32&Itemid=1442&lang=de),
// fetched 2026-11-10. Generated from the saved page: 12 topics from the page's own index plus its
// closing "Further information" block, questions and answers verbatim. Legacy links point at the
// redesigned route where one exists and at the live site otherwise; topic anchors become #faq-N.
// German sentences inside some English answers are on the live English page as published.
import type { FaqBlock } from "./coursePage";

export type FaqTopic = {
  /** Section id and jump-link target. */
  id: string;
  heading: string;
  items: { question: string; answer: string | FaqBlock[] }[];
};

export const FAQ_PATH = "/faq";

export const faqTopics = [
  {
    "id": "faq-0",
    "heading": "IFEN training: the essentials",
    "items": [
      {
        "question": "What are the requirements for the training?",
        "answer": [
          "Our training to become an IFEN-certified neurofeedback therapist comprises all four modules: the intensive course (Module 1), practicum (Module 2), mentoring (Module 3) and examination (Module 4). It is intended for professionals in medicine, psychotherapy, psychology, occupational therapy and other healthcare fields, as well as German Heilpraktiker practitioners. Basic knowledge of anatomy and physiology is helpful; we teach the remaining content step by step.",
          "Good to know: The IFEN certificate confirms your qualification in neurofeedback. In Germany, using neurofeedback to treat health conditions also requires the relevant professional authorisation, for example as a physician, licensed psychotherapist or Heilpraktiker practitioner. Occupational therapists work on a physician’s prescription.",
          "Even without a licence to practise medicine, you can make good use of neurofeedback, for example in coaching, competitive sports or for stress and performance regulation. We offer dedicated Peak Performance courses for this.",
          {
            "text": [
              "Would you like to offer QEEG and brain mapping in your practice? Then we recommend our ",
              {
                "label": "QEEG courses",
                "href": "https://www.neurofeedback-info.de/en/alle-kurse-zum-thema-qeeg"
              },
              " as a supplement."
            ]
          },
          "Not based in Germany? The rules on who may offer neurofeedback vary from country to country. We are happy to help, but we do not have complete information for every country. Please therefore check which regulations apply in your country before starting the training. This information is intended as general guidance and does not constitute legal advice."
        ]
      },
      {
        "question": "What makes neurofeedback training at IFEN special?",
        "answer": "We draw on the international standards of the Biofeedback Certification International Alliance (BCIA) and complement them with a broad range of practical continuing education courses. This includes intensive, individual support: every participant is paired with an experienced mentor who is actively working in practice. We also teach advanced methods such as Z-score training, sLORETA neurofeedback and ISF (infra-slow fluctuation)."
      },
      {
        "question": "How does the IFEN training prepare you for practical application?",
        "answer": [
          "Sound training combines scientific understanding with practical experience and professional guidance. You should learn to carry out recordings carefully, interpret results, develop well-founded training goals and evaluate progress in a comprehensible way.",
          "The IFEN basic training consists of four modules:",
          {
            "list": [
              "Intensive course",
              "Practical training",
              "Mentoring Programme",
              "Examination"
            ]
          },
          "Successful completion leads to the IFEN certificate. The practical training and mentoring provide space to apply what you have learned, discuss questions from practice and gain confidence in your professional approach.",
          "We also offer a QEEG course and further training on special topics, in which we also work with international experts.",
          "The IFEN certificate documents the successful completion of our qualification. Which diagnostic or therapeutic activities you may carry out depends on your primary profession, your professional authorisations and the applicable legal framework."
        ]
      },
      {
        "question": "How do I register for Module 1, and which formats are available?",
        "answer": [
          "We offer Module 1 in three formats so that you can easily combine it with your working life:",
          {
            "list": [
              "On site: 5-day intensive course in person, with plenty of hands-on work with the devices.",
              "Hybrid: 3 days online – live via Zoom or as self-study, depending on the course – and 2 practical days on site.",
              [
                "Online self-study: Our ",
                {
                  "label": "36-hour BCIA-accredited teaching methodology course",
                  "href": "https://module.neurofeedback-info.com/kurs"
                },
                "Entry possible at any time. Eine Anrechnung für den IFEN-Ausbildungsweg ist nicht automatisch möglich. Neben der Theorie sind praktische Kenntnisse im Umgang mit Geräten und Trainingsprotokollen erforderlich. Bitte lassen Sie Ihre Voraussetzungen vor der Buchung weiterer IFEN-Module individuell prüfen."
              ]
            ]
          },
          {
            "text": [
              "You can find all current dates in our ",
              {
                "label": "Module 1 course overview",
                "href": "/courses/module-1"
              },
              ", where you can register directly online."
            ]
          },
          "Our extra for you: Mit jeder Buchung von Modul 1 erhalten Sie für zwölf Monate kostenfrei Zugang zu unserem BCIA-anerkannten Grundkurs. This lays the foundation for later BCIA certification – an international qualification that significantly enhances your neurofeedback profile."
        ]
      },
      {
        "question": "What does the training to become a Certified Neurofeedback Therapist IFEN cost?",
        "answer": [
          {
            "list": [
              "Module 1 – 5-day course: 1.750,00 € / person",
              "Module 2 – Internship: €150,00 per 45-minute lesson. A minimum of 5 lessons of 45 minutes each per person is required. Total: 750,00 € / person",
              "Module 3 – Mentoring: €150,00 per 45-minute lesson. A minimum of 5 lessons of 45 minutes each per person is required. Total: 750,00 € / person",
              "Module 4 – Examination: flat rate 250,00 € / person",
              "In-house training: Flat rates with reasonable discounts depending on the number of participants"
            ]
          },
          "Note: The cost structure is modular, transparent and geared towards certification as a neurofeedback therapist (IFEN)."
        ]
      },
      {
        "question": "Are continuing education points available?",
        "answer": [
          {
            "text": [
              "Yes, for occupational therapists: our continuing education courses provide credits under Section 125 of Book V of the German Social Code (SGB V). The number is stated on your attendance certificate. We do not award continuing education credits for other professions. Further information is available ",
              {
                "label": "here",
                "href": "https://www.neurofeedback-info.de/en/fortbildungspunkte.html"
              },
              "."
            ]
          }
        ]
      },
      {
        "question": "What technical knowledge do I need?",
        "answer": "None in particular. If you use a computer in your everyday work, you will find the neurofeedback software easy to handle. You will learn how to use the device, electrodes and software step by step during the course – on real systems, with practical exercises and clear instructions."
      }
    ]
  },
  {
    "id": "faq-1",
    "heading": "EEG, QEEG and neurofeedback",
    "items": [
      {
        "question": "What are QEEG and brain mapping, and what will you learn about them at IFEN?",
        "answer": [
          "The electroencephalogram, or EEG for short, records electrical potential differences on the scalp that arise mainly from the activity of groups of nerve cells. The quantitative EEG, or QEEG for short, complements the visual inspection of EEG traces with mathematical and statistical analyses.",
          "This makes it possible to examine, for example, the strength of different frequency components, their spatial distribution and changes over time. Other methods describe statistical relationships between EEG signals.",
          "Brain mapping illustrates selected parameters as coloured maps. Such displays can help to identify distributions and differences. However, they are not anatomical images of the brain.",
          "In our training courses, you will learn to explore this information systematically and to interpret it professionally. This includes the quality of the raw data, the choice of suitable analysis methods and how to work with reference values.",
          "With NeuroPathfinder, we also offer a practical learning platform where you can work through EEG analyses and deepen your knowledge. This is how we combine theoretical knowledge with practical application."
        ]
      },
      {
        "question": "What can EEG and QEEG results tell us about a person?",
        "answer": [
          "EEG and QEEG provide access to the brain's electrical activity. They can show which characteristics are present under certain recording conditions and how these differ between situations or measurement points.",
          "EEG is an established examination method, particularly in neurology. Quantitative analyses can provide additional information for suitable questions. Their value comes from carefully combining measurement data, professional knowledge and the context of the examination.",
          "We take into account factors such as age, alertness, medication, recording conditions and possible interference. A deviation from reference values is not automatically a disease. Conversely, an unremarkable EEG does not rule out a disease.",
          "A clinical diagnosis requires assessment by a suitably qualified and professionally authorised specialist, taking into account the medical history, symptoms and other findings.",
          "In our training, we therefore attach great importance to keeping the person behind the data in view. EEG parameters complement the professional assessment; they do not fully reflect a person's personal experience and life situation."
        ]
      },
      {
        "question": "What are the goals of neurofeedback, and what role do experience and science play?",
        "answer": [
          "In EEG neurofeedback, selected features of brain activity are fed back with as little delay as possible, for example via images, games or acoustic signals. This feedback is intended to support learning self-regulation.",
          "In therapeutic use, the focus is on an everyday goal: helping people to cope better with their daily lives and achieve a better quality of life. Which changes are aimed for depends on personal needs and the respective professional question.",
          "From our many years of practical work, we know of a great deal of positive feedback. Many participants in our training courses also report patients who perceive improvements in their everyday lives and quality of life during their neurofeedback treatment. These experiences are an important driving force for our training work.",
          "Such feedback describes individual experiences. It does not replace controlled scientific studies and cannot be transferred to every person. That is why we combine practical experience with a differentiated view of research.",
          "Neurofeedback has been studied scientifically for decades. How robust the results are depends, among other things, on the field of application, the training method and the quality of the studies. Research examines both whether the intended regulation of brain activity is learned and whether symptoms and everyday functioning change.",
          "In our training courses, you will learn to bring together personal goals and scientific findings and to evaluate progress systematically. In addition to EEG features, this includes personal experience and concrete changes in everyday life. After all, a better quality of life is a key goal that practical work should be guided by."
        ]
      }
    ]
  },
  {
    "id": "faq-2",
    "heading": "Devices",
    "items": [
      {
        "question": "What do we look for when selecting our neurofeedback devices?",
        "answer": [
          "At IFEN, we only use devices for neurofeedback that are certified as medical devices. We have the relevant manufacturer documentation and the defined intended purposes.",
          "When selecting devices, we make sure they are suitable for the intended application. The manufacturer's intended purpose describes what a device is to be used for and under which conditions. The associated conformity documents demonstrate compliance with the applicable requirements.",
          "A CE mark alone does not identify a product as a medical device, as other product groups also bear this marking. What matters are the associated documents and the manufacturer's information.",
          "Just as important as suitable technology is skilled handling. That is why you will learn with us to make careful recordings, recognise interference and use the devices in accordance with their instructions for use."
        ]
      },
      {
        "question": "Is the training tied to specific devices or systems?",
        "answer": "No. The training is not tied to particular devices or manufacturers. You need your own neurofeedback equipment for the practicum and mentoring. We would be happy to discuss which combination of devices, software and accessories suits your practice and goals in a personal consultation—ideally before you make a purchase."
      },
      {
        "question": "How much do neurofeedback devices cost?",
        "answer": "Neurofeedback devices are affordable. High-quality, medically certified systems, including software, start at approximately €3.500,00 . We would be happy to advise you on selecting the right device for your needs."
      }
    ]
  },
  {
    "id": "faq-3",
    "heading": "Neurofeedback in practice",
    "items": [
      {
        "question": "How many sessions are usual, and how lasting is the training?",
        "answer": [
          "In practice, 20 to 30 sessions are often planned. Experience shows that first changes in the course of training often appear after about 10 sessions. The remaining sessions serve to consolidate what has been learned.",
          "The aim of the training is for clients to be able to use the self-regulation they have learned in everyday life, even after the training has ended. How quickly and how lastingly results appear varies from person to person. That is why progress is documented from the start and the training is adjusted accordingly. This is exactly what you learn in our training programme."
        ]
      },
      {
        "question": "How much does a neurofeedback session cost?",
        "answer": [
          "Prices vary considerably, as each practice sets its own fees freely. Factors include the region, the professional group, the length of the session and the type of neurofeedback, for example classic protocols, Z-score or QEEG-guided training.",
          "A QEEG assessment is usually charged separately."
        ]
      },
      {
        "question": "Is neurofeedback covered by health insurance?",
        "answer": [
          "This is one of the most frequently asked questions, and the answer depends on who offers neurofeedback and how patients are insured. Based on the information available to us (as of November 2026), the situation in Germany is as follows:",
          {
            "list": [
              "Occupational therapy: Neurofeedback can be used as a therapeutic tool within occupational therapy prescribed by a physician, for example in psychological-functional or sensorimotor-perceptual treatment. What is billed is the prescribed treatment.",
              "Psychotherapy: Within an approved course of psychotherapy, for example behavioural therapy, neurofeedback can be integrated as a method depending on the treatment plan.",
              "Physicians: For privately insured patients, neurofeedback is currently billed under the German fee schedule for physicians (GOÄ) using analogous codes. Good news for the future: the draft of the new GOÄ includes, for the first time, a dedicated fee code for bio- and neurofeedback. The new GOÄ is expected to come into force in 2028 at the earliest.",
              "Private health insurance and government allowance (Beihilfe): Many policies reimburse neurofeedback in full or in part. Ideally, patients should submit a cost estimate in advance.",
              "Heilpraktiker (state-licensed alternative practitioners): Statutory health insurance generally does not cover the costs, whereas private health and supplementary insurance may, depending on the policy.",
              "Self-payers: Neurofeedback can always be paid for privately. A QEEG is usually a private service."
            ]
          },
          "Whether and to what extent costs are covered is always decided by the respective payer on a case-by-case basis.",
          "Please note: this overview is intended as general guidance and does not constitute legal or billing advice. It describes the situation in Germany; other countries have their own rules on who may offer neurofeedback and how it is billed. Please check the regulations that apply to you."
        ]
      }
    ]
  },
  {
    "id": "faq-4",
    "heading": "Getting started and choosing the right course",
    "items": [
      {
        "question": "Which IFEN training course suits my goal?",
        "answer": "Modules 1–4 provide the training pathway for neurofeedback practice. Specialist courses deepen EEG recording, QEEG analysis or particular training methods. The right choice depends on your background, prior knowledge and intended role."
      },
      {
        "question": "What distinguishes neurofeedback training from a QEEG course?",
        "answer": "Neurofeedback training covers planning and delivering neurofeedback sessions. QEEG courses focus on recording, analysing and interpreting EEG data and using the findings in individual training planning."
      },
      {
        "question": "What information is helpful for career guidance?",
        "answer": "Please provide your profession and qualification, intended country of practice, previous EEG or neurofeedback training and learning goals. If you already use equipment, include the device and software details."
      },
      {
        "question": "Can I participate if I have an educational background?",
        "answer": "Please ask us to check the appropriate course and qualification before booking. Attending training and having permission to treat health conditions are separate matters. An IFEN course does not automatically extend your professional scope of practice."
      },
      {
        "question": "Am I allowed to treat illnesses independently after completing my training?",
        "answer": "Training or an IFEN certificate does not replace professional authorisation. Your qualification, scope of practice and the rules of your country determine how you may use neurofeedback clinically. Clarify these requirements before starting practice."
      },
      {
        "question": "Can I participate with a qualification from another country?",
        "answer": "Send us details of your qualification, professional authorisation and previous experience. IFEN checks course entry requirements; recognition of professional qualifications and permission to practise are matters for the relevant authorities."
      },
      {
        "question": "I've already learned about neurofeedback. Do I need to start again with Module 1?",
        "answer": "Send your certificates, course content and training hours. We will assess the appropriate entry point and any additional learning needed. Previous training is not automatically credited."
      }
    ]
  },
  {
    "id": "faq-5",
    "heading": "Structure, formats and organization",
    "items": [
      {
        "question": "What will I learn in Module 1?",
        "answer": "Topics include EEG and neurofeedback, electrode placement, signal quality, artefacts, assessment and training protocols. Theory and practical exercises depend on the format booked. The course description provides the detailed curriculum and duration."
      },
      {
        "question": "Can I complete Modules 2 and 3 in either order?",
        "answer": "Yes. After Module 1, you may complete the practicum (Module 2) and mentoring (Module 3) in either order. You need your own neurofeedback equipment for these modules so that you can practise independently and discuss your experience in mentoring."
      },
      {
        "question": "How long does the entire training take?",
        "answer": "Timing depends on course dates and your availability. All four modules must be completed within two years. Otherwise Module 1 must be repeated, which is possible at half the course price. Tell us about any funding deadlines before booking."
      },
      {
        "question": "What distinguishes live online teaching from self-paced learning?",
        "answer": "Live online sessions take place at set times and allow direct interaction. Self-paced learning lets you study provided materials during the agreed access period. Practical work, support and examinations depend on the specific offer."
      },
      {
        "question": "Can I complete the entire training exclusively online?",
        "answer": "An online theory course does not mean that all modules can be completed without guided practical work. Check each module's in-person, practical and live requirements. We can help identify a suitable combination for your location and goals."
      },
      {
        "question": "In which languages are the courses held?",
        "answer": "The course listing specifies teaching and any interpretation languages. An English course does not automatically include full translation. If language is essential to your participation, also confirm the language of materials and practical support before booking."
      },
      {
        "question": "Where can I find confirmed times and the venue?",
        "answer": "Use the current course description and your personal course information. Hybrid theory and practice days may have different times and locations. Ask us to resolve conflicting information before making travel arrangements."
      },
      {
        "question": "Can I miss a course segment and catch up later?",
        "answer": "Please tell us about planned absences in advance. Catch-up options depend on learning objectives, attendance requirements and availability. Recordings do not automatically replace practical exercises or required attendance."
      },
      {
        "question": "Can two people share a course place?",
        "answer": "No. Each person needs their own registration and personal proof of participation. For Module 2, each person must individually document at least 5 units of 45 minutes each of practical work, and for Module 3, at least 5 units of 45 minutes each of mentoring. Shared equipment or jointly attended appointments do not replace this personal proof; the hours cannot be split between two people."
      },
      {
        "question": "Are there individual training courses or offers for practice teams?",
        "answer": "Please send the number of participants, previous experience, preferred language, goals, available equipment and possible dates. We can assess whether a regular course, in-house training or individual mentoring fits your needs."
      }
    ]
  },
  {
    "id": "faq-6",
    "heading": "Internship, mentoring and examination",
    "items": [
      {
        "question": "Where do I register for the practical training and mentoring?",
        "answer": [
          "Vereinbaren Sie Ihren Termin zunächst direkt mit einer geeigneten Partnerpraxis beziehungsweise einer Mentorin oder einem Mentor. Melden Sie sich anschließend über das passende Angebot auf unserer Website an und geben Sie den vereinbarten Termin sowie den Namen der betreuenden Person beziehungsweise Partnerpraxis an. So können wir Ihre Buchung richtig zuordnen.",
          "Übermitteln Sie der betreuenden Person anschließend Ihren vollständigen Namen und Ihre IFEN-Rechnungsnummer, damit Ihre Teilnahme korrekt zugeordnet und mit IFEN abgerechnet werden kann. Ist das Modul bereits in einem Ausbildungspaket enthalten, lassen Sie die vorhandene Buchung zuordnen, statt erneut zu bezahlen."
        ]
      },
      {
        "question": "When does the exam take place?",
        "answer": "Die Prüfung ist bereits nach Modul 1 oder nach den weiteren Ausbildungsbestandteilen möglich. Modul 2 und Modul 3 müssen für den Prüfungstermin noch nicht abgeschlossen sein. Das IFEN-Abschlusszertifikat erhalten Sie erst nach vollständigem Nachweis aller erforderlichen Bestandteile. Vereinbaren Sie Prüfungsformat, Sprache und Termin mit dem IFEN-Team."
      },
      {
        "question": "What is the difference between an internship and mentoring?",
        "answer": "During the internship, you will deepen your practical experience and understanding of the associated workflows. Mentoring sessions will provide you with expert guidance as you reflect on your approach, questions, and case studies. Which achievements count towards your training certificate depends on the module you have booked and the applicable requirements."
      },
      {
        "question": "How do I find and book an internship?",
        "answer": [
          "Search our therapist list for practices marked with a hand symbol: these offer internships. Contact a suitable practice and arrange the dates, scope, and language. Then book Module 2 via IFEN, specifying the name of the internship provider. If you have already booked a training package, provide your IFEN invoice number and have the allocation confirmed instead of paying again.",
          {
            "text": [
              {
                "label": "Therapist list – internship positions marked with a hand symbol",
                "href": "https://therapeutenliste.neurofeedback-info.de/"
              }
            ]
          }
        ]
      },
      {
        "question": "What do I need before the internship starts?",
        "answer": "Confirm the dates, content, language, and the minimum of 5 personally documented 45-minute sessions with your internship provider. For Module 2, you will need your own neurofeedback equipment; please also clarify the technical requirements at the internship location. Submit your full name and IFEN invoice number and verify the actual appointments and hours completed with your supervisor."
      },
      {
        "question": "Do I need my own device for the internship and mentoring?",
        "answer": "Yes. You need your own neurofeedback equipment for Module 2 and Module 3. It enables you to practise independently, apply what you have learned and discuss practical experience and questions in mentoring."
      },
      {
        "question": "How do I prepare for a mentoring program?",
        "answer": "Prepare specific questions and, where relevant, device, software and workflow details. Protect personal data when preparing cases. Resolve installation problems beforehand where possible so that mentoring time can focus on professional learning."
      },
      {
        "question": "Are technical support and mentoring the same thing?",
        "answer": "No. Support covers matters such as installation, connections, licences and errors. Mentoring addresses professional decisions and application. Technical assistance does not automatically count as recognised mentoring for certification."
      },
      {
        "question": "I booked a complete package. Do I have to pay for the internship and mentoring again?",
        "answer": "Check exactly what your package includes. Provide the existing booking or invoice number when arranging sessions and ask for confirmation that they are allocated correctly. Do not book an included service a second time as a precaution."
      },
      {
        "question": "How are internships and mentoring programs documented and billed?",
        "answer": "First, arrange the dates with your internship provider or mentor and specify this person when booking with IFEN. Provide your supervisor with your full name and your IFEN invoice number. After each session, check the date and duration. The instructors need this information for their billing with IFEN. Each participant must personally document at least 5 teaching units (UE) of 45 minutes each for Module 2 and Module 3. If the module is already included in a package, have the existing booking assigned accordingly."
      },
      {
        "question": "How do I register for the final exam?",
        "answer": "After completing Module 1, book or arrange Module 4 with IFEN. You may take it immediately after Module 1, before Modules 2 and 3. Tell us your preferred language and availability. The final certificate requires successful completion of all four modules within two years."
      },
      {
        "question": "How does the online exam work?",
        "answer": "Your personal confirmation explains the video call and examination platform. Screen sharing may be required depending on the examination procedure. Follow the examiner's instructions and test your camera, microphone and connection beforehand."
      },
      {
        "question": "How long does the exam last and in which language is it conducted?",
        "answer": "The processing time and exam language for your appointment will be confirmed in advance. Do not rely on information from another course or person. If you have any special requirements or need support, please discuss this before scheduling your appointment."
      },
      {
        "question": "What is IFEN 100 and does the test replace the final exam?",
        "answer": "IFEN 100 ist ein freiwilliges Angebot zur Prüfungsvorbereitung und Wissensüberprüfung. Es ist nicht verpflichtend für den IFEN-Abschluss und ersetzt die Abschlussprüfung in Modul 4 nicht. Umfang, Zugangsbedingungen und mögliche Wiederholungen finden Sie in der Beschreibung des Vorbereitungsangebots."
      },
      {
        "question": "What do I do if my test access or exam result is missing?",
        "answer": "First, check your email inbox, including your spam folder. Then, write to us with your name, the email address you used, and the date and time of the test you booked. Describe whether you are missing access, activation, or your result so we can investigate further."
      },
      {
        "question": "When will I receive a certificate of participation or a certificate of completion?",
        "answer": [
          "Eine Teilnahmebescheinigung dokumentiert den jeweiligen Kurs oder Ausbildungsabschnitt. Das IFEN-Abschlusszertifikat stellen wir erst aus, wenn Sie alle vier Module erfolgreich abgeschlossen und die erforderlichen Nachweise vorgelegt haben. Bitte sammeln Sie Ihre Nachweise selbst und reichen Sie diese zur Zertifikatsausstellung bei IFEN ein.",
          "Die Prüfung können Sie bereits nach Modul 1 oder nach den weiteren Bestandteilen ablegen. Alle erforderlichen Teile müssen innerhalb von zwei Jahren abgeschlossen werden. Andernfalls müssen Sie Modul 1 zum halben Kurspreis wiederholen. Diese Regel dient der Qualitätssicherung."
        ]
      }
    ]
  },
  {
    "id": "faq-7",
    "heading": "IFEN degree, BCIA and recognition",
    "items": [
      {
        "question": "What do the BCIA designations Licensed, Performance and Technician mean?",
        "answer": "BCIA distinguishes three categories. Licensed (BCN-L for neurofeedback; BCB-L for biofeedback) identifies certificants with clinical professional licensure. Performance (BCN-P or BCB-P) is for appropriately qualified practitioners working in non-clinical performance enhancement. Technician refers to supporting work under the legally permitted supervision of a licensed, BCIA-certified professional. These categories describe professional roles, not successive levels of training."
      },
      {
        "question": "Which BCIA category applies to applicants from Germany and other countries outside the USA and Canada?",
        "answer": [
          "Under current BCIA rules, international applicants need a recognised qualification in a BCIA-accepted healthcare field and a valid government-issued licence or credential regulating their clinical practice. International certificants use BCN-L or BCB-L. The Performance and Technician pathways are currently limited to the USA and Canada. BCIA assesses each applicant’s eligibility; a professional title alone does not establish eligibility.",
          {
            "text": [
              {
                "label": "BCIA – International applicants",
                "href": "https://www.bcia.org/welcome"
              }
            ]
          }
        ]
      },
      {
        "question": "Does BCN-L or BCB-L extend my professional treatment license?",
        "answer": "No. BCIA certification does not replace state professional licensure and does not expand your legal scope of practice. Even with the \"Licensed\" designation, you may only work within your respective professional authorizations and expertise. Whether independent practice, regulation, or another form of cooperation is required depends on the rules of your profession and country of practice."
      },
      {
        "question": "Is the IFEN certificate the same as a BCIA certification?",
        "answer": "No. The IFEN qualification and certification by the Biofeedback Certification International Alliance (BCIA) are separate processes. BCIA decides on admission, recognition of credentials, and the granting of its certification. An IFEN qualification does not automatically lead to a BCIA qualification."
      },
      {
        "question": "Am I BCIA-certified after completing a 36-hour BCIA neurofeedback didactic course?",
        "answer": "No. An approved neurofeedback didactic course fulfils one educational component. BCIA also sets personal eligibility requirements and additional requirements for foundational knowledge, practical experience, mentoring and an examination. Please check your complete certification pathway directly with BCIA."
      },
      {
        "question": "Can a BCIA neurofeedback didactic course count as IFEN Module 1?",
        "answer": "Eine Anrechnung ist im Einzelfall möglich, erfolgt aber nicht automatisch. Der 36-stündige BCIA-anerkannte Didaktikkurs allein ersetzt die praktische Gerätearbeit und Protokollanwendung im klassischen IFEN-Modul 1 nicht eins zu eins. Für den Einstieg in die weiteren IFEN-Module benötigen Sie auch entsprechende praktische Kenntnisse und Erfahrung. Lassen Sie Ihre Voraussetzungen und eine mögliche Anrechnung deshalb vorab individuell durch IFEN prüfen. Die übrigen erforderlichen IFEN-Module bleiben Bestandteil des Ausbildungswegs."
      },
      {
        "question": "Do my previous IFEN modules automatically fulfil the BCIA didactic requirements?",
        "answer": "No. What matters are the specific course completed, its accreditation status, and the documentation accepted by BCIA. Even a full IFEN qualification does not automatically guarantee fulfillment of all BCIA requirements. Submit your documents to BCIA for individual review."
      },
      {
        "question": "Who checks whether I can be admitted for BCIA certification?",
        "answer": "BCIA assesses personal qualifications and the appropriate certification path. International applicants are subject to specific requirements regarding professional qualifications and admission. Please clarify these directly with BCIA before enrolling in any paid training modules; IFEN cannot preempt their decision."
      },
      {
        "question": "Does every mentoring session at IFEN automatically count towards BCIA?",
        "answer": "No. For BCIA accreditation, the mentor, content, documentation, and practical evidence must meet BCIA requirements. Therefore, please indicate when booking whether you require IFEN module hours, BCIA mentoring, or QEEG-specific support."
      },
      {
        "question": "Can I use educational leave or a funding program like KOMPASS?",
        "answer": "Funding or recognition as educational leave must be tailored to the specific program, course, and your individual circumstances. Clarify the requirements with the relevant advisory or approval agency before registering or making any payments. Inform us of the required documents and deadlines in a timely manner; IFEN cannot replace a funding commitment."
      }
    ]
  },
  {
    "id": "faq-8",
    "heading": "QEEG and specialist courses",
    "items": [
      {
        "question": "Do I need to complete the entire neurofeedback training before I can take a QEEG course?",
        "answer": "This question cannot be answered the same way for all QEEG courses. Basic and advanced courses require different levels of knowledge. Please send us information about your professional background and EEG experience; we will compare this with the prerequisites of the specific course. A full IFEN certification is not a general requirement for every course."
      },
      {
        "question": "Does a QEEG course qualify me to make diagnoses or sign clinical reports?",
        "answer": "A course imparts specialist knowledge and documents participation or a defined proof of performance. Which diagnostic activities and reports you are authorized to perform depends further on your professional qualifications and demonstrated competence. A course certificate alone does not grant any new diagnostic authorization."
      },
      {
        "question": "Are EEG recording, QEEG analysis, and neurofeedback the same service?",
        "answer": "No. The recording provides EEG data; the quantitative analysis calculates characteristics and, if necessary, comparisons from this data; and in neurofeedback, selected EEG characteristics are fed back to the user for training purposes. Accordingly, the learning objectives, practical requirements, and responsibilities of the respective courses differ."
      },
      {
        "question": "Do I need to buy a neurofeedback device before the first course?",
        "answer": "Purchasing equipment is not generally required before every course. For certain in-person basic courses, training equipment is provided; specialized or online practical formats may require your own equipment. Check the specific course information before purchasing any equipment or software."
      },
      {
        "question": "Can I participate with my existing device?",
        "answer": "Please specify the manufacturer, model, number of channels, software, and any existing licenses. Technical fundamentals are not limited to a single product; however, practical exercises, data formats, and specific procedures may require certain systems. Please have the suitability checked before booking."
      },
      {
        "question": "Are devices, software, and licenses included in the course price?",
        "answer": "A course booking includes the training services explicitly described. Equipment, perpetual software licenses, and technical services are only included if stated in the offer. For package deals, ask for a separate explanation of the individual training and equipment items."
      },
      {
        "question": "What equipment do I need for an ISF or sLORETA workshop?",
        "answer": "This depends on the specific procedure and course. The device, compatible software version, and required licenses must be checked beforehand. Use the preparation instructions for your booked workshop; a recommendation from a previous course does not automatically apply to a different date."
      },
      {
        "question": "Can I attend a course just to learn how to use the device software?",
        "answer": "Technical instruction and professional training have different objectives. If you primarily need installation, operation, or licensing, first clarify the appropriate instruction or support service. For assessment, training planning, and responsible application, additional professional qualifications are required."
      }
    ]
  },
  {
    "id": "faq-9",
    "heading": "Learning portal, documents and online participation",
    "items": [
      {
        "question": "How do I access my learning portal?",
        "answer": "Use the personal invitation or access link from your course communication and the email address you used to register. Depending on the course, a different learning environment may be used. If you have multiple accounts, first check which account has been activated for this specific booking."
      },
      {
        "question": "My access email hasn't arrived, or the invitation link has expired. What should I do?",
        "answer": "Please also check your spam folder for your course invitation. If the message is missing or the link has expired, please request that it be resent or reviewed, specifying the course name and your registration email address. Do not re-enroll in the course for this purpose."
      },
      {
        "question": "I can log in, but I can't see my course. What can I do?",
        "answer": "Please check that you are using the correct portal and the email address used for booking. Then, please provide us with the course name, booking number, and a description of the page displayed. A working user account does not automatically mean that all course entitlements have already been assigned."
      },
      {
        "question": "How long will I have access to the learning materials?",
        "answer": "Access time depends on the offer and begins at the time specified in your booking. Live courses, recording packages, and self-paced courses may have different durations. Please check your course information and save any released downloads within the specified time."
      },
      {
        "question": "My access seems to have expired too soon. What can I do?",
        "answer": "Please send us the course details, start date, registration address, and the error message displayed. We will check whether activation is possible within the agreed-upon duration. An extension beyond the booked period is a separate matter and must be arranged separately."
      },
      {
        "question": "Are all courses recorded?",
        "answer": "No, a recording is not guaranteed for every event or course segment. In particular, practical, in-person sessions may take place without a recording. Whether and for how long videos will be provided will be stated in the respective offer or in your course information."
      },
      {
        "question": "The video is private or the recording code isn't working. What should I send?",
        "answer": "Please specify the course, session, or video title and the affected link. Include the error message, and if possible, a screenshot without sensitive data. First, check that you are using the most recent login credentials you received. Do not send your own account password."
      },
      {
        "question": "What technology do I need for live online teaching?",
        "answer": "You will need a stable internet connection, a suitable computer, and working audio output. For active exercises or exams, a camera, microphone, and screen sharing may be required. Check the course requirements and test access before starting; a smartphone does not replace a dedicated computer for practice in every format."
      },
      {
        "question": "Am I allowed to share my login details or course recordings with colleagues?",
        "answer": "Course places and personal access are reserved for the registered individual. Sharing recordings, documents, or access data with other people requires explicit permission. If a team wishes to participate, please inquire about a suitable offer with separate certificates of participation."
      }
    ]
  },
  {
    "id": "faq-10",
    "heading": "Booking, costs and invoice",
    "items": [
      {
        "question": "Where can I find the current course costs and what should I budget for overall?",
        "answer": "Current prices are listed with each course or in your personalized offer. When choosing a training path, please check the included modules and any additional services required. Equipment, software, further mentoring sessions, as well as travel and accommodation may incur separate costs; flat-rate totals from previous emails are not a reliable basis for these costs."
      },
      {
        "question": "How do I register for a course?",
        "answer": "Select your desired date from the course overview and use the corresponding registration form. Ensure you provide the participant's name, personal email address, and correct billing information. If booking for employees, please distinguish between the participant and the invoice recipient."
      },
      {
        "question": "Online booking or payment isn't working. What should I do?",
        "answer": "Note the course, time, and error message, and check if you already have a booking or payment confirmation. Contact us with this information before booking or paying again. This will allow us to check the status and, if necessary, arrange an alternative booking or payment method."
      },
      {
        "question": "I made a booking but haven't received an invoice. Should I book again?",
        "answer": "Please do not rebook as a precaution. Check your spam folder and login email address, and send us the course name, booking date, and participant name. If you have a payment confirmation, please attach that as well. We will then check the existing booking and invoice."
      },
      {
        "question": "Can the invoice be sent to my employer or another institution?",
        "answer": "Please specify the desired invoice recipient with their full address when booking. The participant's name and personal course address should also be clearly identifiable. If funding conditions require an invoice in your own name, clarify this beforehand and submit the necessary information."
      },
      {
        "question": "My invoice contains an incorrect address or language. How can I get it corrected?",
        "answer": "Send the invoice number and all correct details to the IFEN team. Also, please indicate if the invoice language is unsuitable. Do not alter an issued invoice yourself; the issuer will correct it or issue a new one if necessary."
      },
      {
        "question": "I've already paid, but I've still received a payment reminder. What now?",
        "answer": "Do not make a second payment as a precaution. Please send us the invoice number, payment date, amount, and payment reference, or a payment receipt. If the payment was made under a different name, please also provide that name so we can allocate the payment correctly."
      },
      {
        "question": "What do I do in case of a double booking or double payment?",
        "answer": "Please provide us with the affected booking or invoice numbers and payment details. We will check which transactions belong together and how a correction needs to be made. Re-booking will not solve the problem and may create further duplicates."
      },
      {
        "question": "Is there a discount for repeat participants or is credit given for external basic courses?",
        "answer": "For certain courses, repeat participant rates or an individual assessment of external qualifications may be possible. To qualify, please submit proof of course completion, course content, number of hours, and your professional background before booking. The confirmed rate for the specific course applies; a general discount does not apply to all courses."
      }
    ]
  },
  {
    "id": "faq-11",
    "heading": "Changes, contact and next steps",
    "items": [
      {
        "question": "What happens if IFEN cancels or significantly changes a course?",
        "answer": "You will be informed about the change and the next steps. Depending on the situation, a replacement date or a refund may be possible, subject to the terms and conditions applicable to your booking. A credit or a different course will need to be explicitly agreed upon with you. Details are governed by the agreed terms and conditions and your statutory rights."
      },
      {
        "question": "Can I cancel, rebook, or name a substitute?",
        "answer": "Please notify us with your course name and booking number as soon as you are unable to attend. Whether a rebooking or transfer of your booking is possible, and what costs will be incurred, depends on the agreed terms and conditions and the individual case. A substitute participant requires the organizer's approval and must meet the participation requirements."
      },
      {
        "question": "What is the difference between a revocation and a cancellation request?",
        "answer": "A statutory right of withdrawal applies to certain consumer contracts and is governed by the applicable cancellation policy. Cancellation or rebooking is a separate matter and is subject to the terms and conditions of the contract or agreement. Business bookings do not automatically have the same right of withdrawal as consumer bookings."
      },
      {
        "question": "Who can help me with training, equipment purchases, or technical problems?",
        "answer": "For questions regarding courses, participation, exams, and certificates, please contact IFEN at info@neurofeedback-info.de. For questions about equipment and software, please contact our team. Report technical service issues via neurofeedback-support.de. Please specify whether your inquiry concerns a booking, a subject-related question, or a technical malfunction."
      },
      {
        "question": "How do I prepare for an individual consultation?",
        "answer": "Briefly describe your goal, your professional background, your current level of education, and any equipment you have available. Specify your preferred course language and time constraints. If you are already booked, please include the course name and booking number. This will allow your request to be directly assigned to the appropriate person."
      },
      {
        "question": "I'm looking for neurofeedback for myself or a family member. Is registering for a course the right way to go about it?",
        "answer": "Booking a training course is not a registration for an examination or treatment. For individual inquiries, please contact the relevant practice or use a therapist search tool. Whether a course is suitable will be determined in a personal consultation; a course description cannot provide an individual treatment recommendation."
      }
    ]
  },
  {
    "id": "faq-more",
    "heading": "Further information",
    "items": [
      {
        "question": "Where can I find out more about neurofeedback and training at IFEN?",
        "answer": [
          {
            "text": [
              "Our pages ",
              {
                "label": "“What is neurofeedback?”",
                "href": "/neurofeedback/what-is-neurofeedback"
              },
              " and ",
              {
                "label": "“Areas of application”",
                "href": "/neurofeedback/areas-of-application"
              },
              " are a good place to start, as is our ",
              {
                "label": "blog",
                "href": "/blog"
              },
              " with articles on neurofeedback, EEG and QEEG. If you have any questions about the training, ",
              {
                "label": "please write to us",
                "href": "https://www.neurofeedback-info.de/en/kontakt-ifen.html"
              },
              " – we will be happy to advise you personally."
            ]
          }
        ]
      },
      {
        "question": "Can I start without prior knowledge of neurofeedback?",
        "answer": "Yes. Module 1 provides the theoretical and practical foundations and is a prerequisite for Modules 2–4. You can take the exam for Module 4 directly after completing Module 1. To receive the IFEN certificate, you must complete all four modules within two years. If this period is exceeded, you will need to repeat Module 1. This is possible for half the course fee."
      },
      {
        "question": "How does IFEN differ from other training providers?",
        "answer": "At IFEN, you can combine fundamentals, guided practice, mentoring, and examinations in a modular training program and then delve deeper into specialized topics. When making your selection, compare the curriculum, practical exercises, support, prerequisites, and the specific qualification awarded. The course description details what is included in each offering."
      },
      {
        "question": "What technical knowledge do I need?",
        "answer": "No special computer skills are required to get started. You should be able to use basic computer functions. The use of the provided technology will be taught step-by-step during the course; any additional installation or technical support will need to be arranged separately, depending on the specific offer."
      },
      {
        "question": "How is the IFEN training structured?",
        "answer": "The standard training program comprises four modules: Module 1 covers the fundamentals, Module 2 focuses on practical application, Module 3 involves case-based mentoring or supervision, and Module 4 is the final examination. Individual specialized workshops are separate continuing education courses."
      },
      {
        "question": "Are there in-person, hybrid, and online options?",
        "answer": "Yes, different formats are offered depending on the course. In a hybrid course, online instruction and in-person practice are separate components with their own schedules. Therefore, please check all course dates and the explicitly stated format before booking."
      },
      {
        "question": "Will I receive continuing education credits or recognition from my chamber?",
        "answer": "IFEN offers continuing education credits for occupational therapists; the specific number is indicated for each course and documented on the certificate. Continuing education credits are not currently offered to other professional groups. Please check the current course description and our information on continuing education credits before booking. An IFEN certificate does not automatically imply professional accreditation or international recognition."
      },
      {
        "question": "What are QEEG and brain mapping?",
        "answer": "The EEG records electrical potential differences on the scalp. Quantitative EEG analysis (QEEG) calculates features such as frequency components and spatial distributions from this data. Brain maps graphically represent such values; they are not anatomical images of the brain. Their significance and interpretation depend on factors such as signal quality, reference point, age, and examination conditions."
      },
      {
        "question": "What can EEG and QEEG results tell us about a person?",
        "answer": "EEG and QEEG can provide expert-classified information on measured brain activity. Wakefulness, medication, and artifacts influence the results. A deviation from normal values does not, in itself, prove a disease; conversely, a normal finding does not rule out a disease. Interpretation should be considered in conjunction with medical history, symptoms, and further examinations, and should be performed by appropriately qualified and authorized professionals."
      },
      {
        "question": "What should I look for when choosing a neurofeedback device?",
        "answer": "Clarify the intended use, measurement quality, number of channels, suitable software and licenses, accessories, as well as training and service. For medical applications, the manufacturer's stated purpose and the associated regulatory documentation are decisive. A CE marking alone does not prove classification as a medical device or effectiveness for every application. Have the suitability for your specific use explained to you."
      },
      {
        "question": "How much do neurofeedback devices cost?",
        "answer": "The costs depend on the device, number of channels, software, licenses, and accessories. Request a current quote tailored to your specific application, taking into account training, maintenance, and ongoing license fees. Neurofeedback Partner can advise you on the right equipment."
      },
      {
        "question": "What are the goals of neurofeedback and how should the scientific evidence be assessed?",
        "answer": "Neurofeedback provides real-time feedback on selected features of measured brain activity, for example, via images or sound. The training aims to support self-regulation learning processes. Goals are individually agreed upon and reviewed based on daily life, well-being, and appropriate metrics. Scientific evidence varies depending on the research question, method, and study quality; practical experience does not replace controlled efficacy studies."
      },
      {
        "question": "How many sessions are required and how lasting are the results?",
        "answer": "A fixed number of sessions and lasting success cannot be guaranteed in general. The scope and progress depend on factors such as the goal, initial situation, training method, and individual response. Arrange regular check-ins with your treating or supervising professional and discuss whether the training should be continued or adjusted."
      },
      {
        "question": "How much does a neurofeedback session cost?",
        "answer": "The price is set by the individual practice. It depends, among other things, on the duration, scope of services, and required examinations. Before starting, ask for a transparent cost estimate and whether EEG recording, QEEG analysis, and consultation are included or charged separately."
      },
      {
        "question": "Will my health insurance cover the costs?",
        "answer": "Reimbursement cannot be guaranteed in general. It depends on factors such as the country, insurance contract, reason for treatment, the professional status of the treating physician, and the agreed-upon services. Clarify reimbursement with your insurance company before beginning treatment, using a cost estimate, and have any commitments confirmed in writing whenever possible. An IFEN certificate does not automatically grant the right to bill for services."
      },
      {
        "question": "Where can I find more information?",
        "answer": "Current content, prerequisites, and dates can be found in the IFEN course descriptions. Additional articles are available on the IFEN blog. For personal questions about the training, please write to info@neurofeedback-info.de; for treatment inquiries, please use our therapist directory."
      },
      {
        "question": "Online booking or PayPal payment isn't working. What should I do?",
        "answer": "Note the course, time, and error message, and check if you already have a booking or payment confirmation. Contact us with this information before booking or paying again. This will allow us to check the status and, if necessary, arrange an alternative booking or payment method."
      }
    ]
  }
] satisfies FaqTopic[];
