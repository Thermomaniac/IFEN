// Blog article "Mit dem falschen Maßstab gemessen" by Thomas Feiner, from the live blog
// neurofeedback-ifen.com/blog/neurofeedback-evidenz-forschung (published 20 Jul 2026,
// updated 27 Jul 2026, "12 Minuten"). Translated in full from the German; no paragraph is
// dropped. The source's dashes are set as commas, colons or brackets. "**" marks the
// source's bold terms. The source's table of contents is the "On This Page" nav, with short
// labels; the section headings are kept whole. The six sources are given as published.

import type { CategoriesContent, CourseHeroContent, Link } from "../coursePage";
import { LISTING_PATH } from "../coursePage";
import { ALL_OFFERS, BLOG_CRUMB, BLOG_CTA, BLOG_PATH, formatPostDate, LIVE_BLOG, POSTS, RELATED } from "./shared";

export type ArticleSectionId =
  | "manifesto"
  | "gold-standard"
  | "logic"
  | "blinding"
  | "comparison"
  | "studies"
  | "objections"
  | "research"
  | "what-matters"
  | "sources";

/** A paragraph, or an objection: the quoted claim in bold, then the answer. */
export type ArticleBlock = string | { claim: string; answer: string };

export type ArticleSection = { id: ArticleSectionId; label: string; heading: string; blocks: ArticleBlock[] };

export type ArticleSource = { text: string; links: Link[] };

const post = POSTS.evidence;

export const evidenceArticle = {
  meta: {
    title: "Neurofeedback Evidence: Measured by the Wrong Yardstick | IFEN Blog",
    description:
      "Why neurofeedback should not be judged by the yardstick of pharmacology. Scientifically grounded, critical and practical.",
  },

  hero: {
    title: post.title,
    breadcrumb: [{ label: "Home", href: "/" }, BLOG_CRUMB, { label: post.title }],
    badge: "Blog Article",
    description: [
      "Why neurofeedback needs research that fits the method. A manifesto. Scientifically grounded, critical and practical.",
    ],
    highlights: [
      { value: "Thomas Feiner", label: "Author" },
      { value: formatPostDate(post.date), label: "Published" },
      { value: `${post.minutes} min`, label: "Reading time" },
    ],
    image: post.image.src,
  } satisfies CourseHeroContent,

  book: { label: "View Course Dates", href: LISTING_PATH },

  sections: [
    {
      id: "manifesto",
      label: "A Manifesto",
      heading: "Why Neurofeedback Needs Research That Fits the Method: A Manifesto",
      blocks: [
        "Neurofeedback is measured against a standard that was designed for something entirely different: the testing of medicines. The randomised controlled, double-blind trial (RCT) is rightly the gold standard of pharmacology. But it is not a universal law of nature for efficacy research. It is a tool built for a particular kind of intervention, and neurofeedback is not that kind of intervention.",
        "If we test a learning method with the measuring instrument for pills and then find that the result is unsatisfactory, the first suspicion is obvious: perhaps the problem is not the method but the measuring instrument. That is exactly the thesis of this text. And it is not an excuse for weak evidence. It is a demand for the right evidence.",
      ],
    },
    {
      id: "gold-standard",
      label: "What the Gold Standard Measures",
      heading: "What the Gold Standard Actually Measures",
      blocks: [
        "The logic of the double-blind RCT is compelling, for medicines. An active substance is introduced into the body from outside. To separate its specific effect from the expectation effect, the control group is given an identical-looking pill without the active substance. Neither those treated nor those treating know who receives what. The difference that remains at the end is the pharmacological effect of the substance.",
        "This construction assumes three things: that the active substance can be cleanly separated from its “carrier”, that a truly inert placebo condition exists, and that the way the treatment is delivered contributes nothing to its effect. With a tablet, all three apply. The tablet works whether or not the doctor hands it over with conviction; the sugar pill really is ineffective; and the patient has to do nothing but swallow.",
        "With neurofeedback, none of these three assumptions applies. That is not a detail. That is the whole point.",
      ],
    },
    {
      id: "logic",
      label: "Where the Logic Breaks",
      heading: "Why This Logic Breaks Down With Neurofeedback",
      blocks: [
        "Neurofeedback is not a substance that is administered. It is a learning process. The brain receives feedback about its own activity and learns, through operant conditioning, to change this activity. The mechanism of action is the contingent feedback: the coupling between what the brain does and what the trainee sees on the screen.",
        "This is where the pharma analogy falls apart, at the decisive point. With a pill, the placebo control is the substance without the active ingredient. But what is the “substance without the active ingredient” in a learning process? You would have to give the brain feedback that is not real feedback, that is, sham feedback that is not coupled to actual brain activity. And this is exactly where the problem arises: feedback without a real coupling is not the inactive version of the same treatment. It is the removal of the mechanism of action itself.",
        "Brendan Parsons put this point precisely in 2026: sham neurofeedback is not inert. It provides structured sensory feedback that engages exactly the learning mechanisms that real training uses too. In purely arithmetical terms, a considerable share of functionally contingent feedback remains in many sham conditions; in Parsons’ analysis, in the order of around two thirds. A sham that works two thirds like the real treatment is not a placebo control. It is a weakened active condition. Anyone who tests real feedback against such sham feedback is not comparing treatment against nothing, but treatment against weakened treatment, and is then surprised by small effects.",
        "Harold Pigott and colleagues summed up the same idea for the ADHD studies: in many of these trials, both groups received a form of false feedback. What was compared was thus “two forms of false feedback, not operant conditioning of the EEG”. If no difference emerges, that says nothing about the efficacy of neurofeedback. It says that two variants of the same inadequate stimulus behave similarly.",
      ],
    },
    {
      id: "blinding",
      label: "The Blinding Problem",
      heading: "The Blinding Problem Cannot Be Solved, and That Is the Honest Answer",
      blocks: [
        "Even if the sham problem is set aside, blinding remains. Double blinding means that neither those treated nor those treating know which group they are in.",
        "Blinding the practitioner is practically impossible with neurofeedback. Whoever carries out the training sees the signals, sets protocols and responds to the person in front of them. This responsiveness is part of the method, not a confounding factor to be designed away, just as no one forbids a physiotherapist to see which exercise they are guiding.",
        "And those treated? Blinding them is tricky too. Some studies achieve it: in the large ADHD trial by Arnold and the Neurofeedback Collaborative Group (2020), only around a third of the children, parents and trainers guessed correctly which condition applied. So the blinding was successful. But it was successful precisely because the sham was so similar to the real treatment that no one noticed the difference. Here, successful blinding and a clean efficacy test almost exclude each other: the more convincing the sham, the more active it is, and the less able the study is to find a difference at all. That is not methodological carelessness that could be fixed. It is a structural contradiction in the design.",
      ],
    },
    {
      id: "comparison",
      label: "Psychotherapy, Physio, OT",
      heading: "The Comparison That Makes It Clear: Psychotherapy, Physiotherapy, Occupational Therapy",
      blocks: [
        "Neurofeedback is a treatment method like psychotherapy, except that devices are involved. In both cases it is about a process of learning and change in which the person treated takes an active part and which lives from the interaction with the practitioner.",
        "And now the decisive observation: for none of these related methods does anyone demand genuine double blinding. Psychotherapy cannot be double-blinded: the therapist knows they are doing therapy, and the client knows they are going to a therapist. Physiotherapy cannot be double-blinded: the physiotherapist sees which exercise they are guiding. The same applies to occupational therapy, speech therapy and rehabilitation sport.",
        "Yet no one seriously doubts that these methods work. They are considered evidence-based. They are reimbursed by payers. They appear in guidelines. The evidence for them does not come from double-blind placebo studies, which in principle cannot exist, but from designs that fit the method: assessor-blinded studies (those who assess the outcomes are blinded, not those who apply the treatment), comparisons against waiting lists or active control conditions, dose-response analyses and single-case experimental designs. Physiotherapy research discusses this openly: full blinding is often impossible with active interventions, and the field has agreed to acknowledge this rather than declare the methods ineffective. The same applies to psychotherapy: depression research, too, states that cognitive behavioural therapy cannot be double-blinded and is nevertheless established as effective.",
        "This is where the real injustice lies. We apply to neurofeedback a standard that we would never demand of any structurally related method. And then we interpret failure against this wrong standard as evidence against the method.",
      ],
    },
    {
      id: "studies",
      label: "What the Studies Show",
      heading: "What the “Gold Standard” Studies Really Show",
      blocks: [
        "The large ADHD trial of 2020 found no significant difference between real and sham neurofeedback. Both groups improved considerably. For critics, this was the proof: neurofeedback works no better than placebo.",
        "But what did the study show on closer inspection? There was no evidence that the children had learned to regulate their EEG at all. And without learning there is no learning effect: that is not a rescue hypothesis but the logical precondition of the method. Pigott and colleagues point to a widespread design problem: if reward thresholds are automatically readjusted to maintain a success rate of around 80% across all sessions, the brain is punished for actual learning. If the target activity improves, the reward is withdrawn and the threshold lowered. A design that actively prevents learning cannot test a learning-based method.",
        "The apparent null finding can therefore be explained well without having to consider neurofeedback ineffective: two forms of inadequate feedback were compared, in a set-up that made real learning harder, with a sham that was itself partly active. Notable is a side note from the same study that is often lost in the debate: at the end of follow-up, the neurofeedback group needed significantly less medication. That is not clean proof of efficacy, but it is the opposite of “nothing”.",
      ],
    },
    {
      id: "objections",
      label: "The Counterarguments",
      heading: "The Counterarguments, Taken Seriously and Answered",
      blocks: [
        "A manifesto that does not take the other side seriously convinces no one. So here are the strongest objections, addressed openly.",
        {
          claim: "“This is just a convenient excuse for weak evidence.”",
          answer:
            "It would be if we were saying: don’t test us. The opposite is the case. We are calling for stricter and methodologically more appropriate testing, not less. A learning-based method can be tested harder than through a mere group difference: one can require that trainees demonstrably learn to change their target activity, and that this regulation success is linked to clinical improvement. Exactly this link is a specific proof of efficacy that a pure placebo effect cannot explain. That is more demanding than what many RCTs even measure, not less.",
        },
        {
          claim: "“Without blinding, it’s all just placebo.”",
          answer:
            "Anyone who claims this consistently would have to declare psychotherapy, physiotherapy and occupational therapy placebo as well. No one does, and rightly so. Specificity can also be shown without blinding: through the link between neuronal regulation and outcome, through protocol-specific effects (training at site A changes target measure A, not the unrelated target measure B), through transfer measurements without feedback, and through animal models in which expectation plays no role. Blinding is one way of controlling expectation effects, not the only one.",
        },
        {
          claim: "“A renowned journal has said it is time to quit.”",
          answer:
            "It is true: after the sobering sham trials there were prominent voices, for example in the American Journal of Psychiatry, suggesting an end to neurofeedback research in ADHD. This position deserves respect, because it comes from sound scepticism. But it draws the wrong conclusion from the right finding. That studies with an unsuitable design find no effects is an argument against the design, not against the method. “Quitting” is the answer when a method fails a suitable test. Failing an unsuitable test is a mandate to change the test.",
        },
      ],
    },
    {
      id: "research",
      label: "Research That Fits",
      heading: "What Research That Fits the Method Looks Like",
      blocks: [
        "Research methods must be guided by what can be researched. For neurofeedback, this path already exists; it only needs to be recognised and followed consistently.",
        "The most important building block is **proof of regulation as a criterion of efficacy**. Instead of only asking “Did the group get better?”, one asks: “Did the trainees learn to change their target activity, and is this learning success linked to clinical improvement?” This manipulation check is superfluous in pill studies, but in learning methods it is the core of the whole. Whoever provides it shows specificity without blinding theatre.",
        "Added to this is **assessor-blinded rather than double-blinded testing**: those who assess the outcomes are blinded, while the practitioner is allowed to do their work properly, exactly the standard accepted in physiotherapy research. **Within-subject and single-case experimental designs (N-of-1, SCED)** are suitable as a complement; for individualised procedures they are often more meaningful than large parallel groups. And finally, **practice-based evidence** from systematic progress registries, which shows what happens under real conditions.",
        "This is not a wish list. Much of it is already consensus. The **CRED-nf checklist** (Ros et al., 2020, Brain), supported by a broad international group of experts, requires exactly these things: control conditions that fit the research question; documentation of neuronal change across sessions; linking regulation success to clinical outcome; transparency about threshold rules and expectations. Parsons (2026) also argues for a tiered-control approach that adapts the control condition to the research goal instead of reflexively using a sham that destroys the mechanism. The framework he proposes is explicitly that of **psychotherapy research**: the research that long ago learned to test interactive, adaptive procedures rigorously, without demanding an inert control that cannot exist.",
      ],
    },
    {
      id: "what-matters",
      label: "What It Is Really About",
      heading: "What It Is Really About",
      blocks: [
        "We are stuck: not because neurofeedback could not provide evidence, but because the evidence demanded is of a kind that this method in principle cannot provide and does not need to provide. As long as recognition remains tied to a standard made for pills, we will never meet it, any more than psychotherapy or physiotherapy ever have.",
        "The demand of this manifesto is therefore sober and by no means modest: efficacy must be tested with the methods that fit the subject. A procedure based on learning is tested through proof of learning: through the coupling of neuronal regulation and clinical change, through assessor-blinded designs, through single-case and progress research, and through the standards the professional community has already set for itself.",
        "This is not a lowering of standards. It is their refinement. And it is the only basis on which neurofeedback can gain the recognition that methodologically honest research deserves. Whoever keeps measuring a learning method with the yardstick for pills is not measuring its efficacy. They are only measuring how badly the yardstick fits.",
      ],
    },
  ] satisfies ArticleSection[],

  sources: {
    id: "sources" as const,
    label: "Sources",
    heading: "Sources",
    items: [
      {
        text: "Ros, T., Enriquez-Geppert, S., Zotev, V., et al. (2020). Consensus on the reporting and experimental design of clinical and cognitive-behavioural neurofeedback studies (CRED-nf checklist). Brain, 143(6), 1674–1685.",
        links: [
          { label: "academic.oup.com", href: "https://academic.oup.com/brain/article/143/6/1674/5807912" },
        ],
      },
      {
        text: "Parsons, B. (2026). Rethinking control conditions in clinical neurofeedback trials. Discover Neuroscience.",
        links: [{ label: "link.springer.com", href: "https://link.springer.com/article/10.1186/s13064-026-00252-x" }],
      },
      {
        text: "Pigott, H. E., et al. (2021). The Fallacy of Sham-Controlled Neurofeedback Trials: A Reply to Thibault and Colleagues (2018).",
        links: [{ label: "pmc.ncbi.nlm.nih.gov", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7783691/" }],
      },
      {
        text: "The Neurofeedback Collaborative Group / Arnold, L. E., et al. (2020). Double-Blind Placebo-Controlled Randomized Clinical Trial of Neurofeedback for Attention-Deficit/Hyperactivity Disorder With 13-Month Follow-up. Journal of the American Academy of Child & Adolescent Psychiatry.",
        links: [{ label: "pmc.ncbi.nlm.nih.gov", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7904968/" }],
      },
      {
        text: "Neurofeedback for ADHD: Time to Call It Quits? (Editorial, American Journal of Psychiatry).",
        links: [{ label: "psychiatryonline.org", href: "https://psychiatryonline.org/doi/full/10.1176/appi.ajp.20220861" }],
      },
      {
        text: "On blinding in non-pharmacological procedures: PEDro (Physiotherapy Evidence Database), Why is blinding important in a trial?; and Double-Blinding and Bias in Medication and Cognitive-Behavioral Therapy Trials for Major Depressive Disorder (2015).",
        links: [
          { label: "pedro.org.au", href: "https://pedro.org.au/english/why-is-blinding-important-in-a-trial/" },
          { label: "pmc.ncbi.nlm.nih.gov", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4732552/" },
        ],
      },
    ] satisfies ArticleSource[],
    note: {
      text: "Translated from the German original, published 20 July 2026 and updated 27 July 2026.",
      link: { label: "Read the original", href: `${LIVE_BLOG}/neurofeedback-evidenz-forschung` } satisfies Link,
    },
  },

  related: {
    label: "Explore further",
    heading: "Keep Reading",
    items: [RELATED.blog, RELATED.whatIs, ALL_OFFERS],
  } satisfies CategoriesContent,

  cta: { ...BLOG_CTA, secondary: { label: "Back to the Blog", href: BLOG_PATH } },
};
