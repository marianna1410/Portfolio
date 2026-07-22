import { PROTOTYPES } from '../../lib/config';
import type { CaseData } from './types';

// Hero + section assets
import heroImage from '../../assets/projects/cases/vaia/hero.png';
import userFeedbackImage from '../../assets/projects/cases/vaia/user-feedback.png';
import problem1Image from '../../assets/projects/cases/vaia/Problem 1.png';
import problem2Image from '../../assets/projects/cases/vaia/Problem 2.png';
import problem3Image from '../../assets/projects/cases/vaia/Problem 3.png';
import before1Image from '../../assets/projects/cases/vaia/before/before-1.png';
import before2Image from '../../assets/projects/cases/vaia/before/before-2.png';
import before3Image from '../../assets/projects/cases/vaia/before/before-3.png';
import after1Image from '../../assets/projects/cases/vaia/after/after-1.png';
import after2Image from '../../assets/projects/cases/vaia/after/after-2.png';
import after3Image from '../../assets/projects/cases/vaia/after/after-3.png';

// Platform icons used inside the Research methodology callout
import iconAppStore from '../../assets/projects/cases/vaia/platforms/app store.png';
import iconGooglePlay from '../../assets/projects/cases/vaia/platforms/google play.png';
import iconTrustpilot from '../../assets/projects/cases/vaia/platforms/trustpilot.png';
import iconJustUseApp from '../../assets/projects/cases/vaia/platforms/just use app.png';
import iconReddit from '../../assets/projects/cases/vaia/platforms/reddit.png';

// Small preview image for the "Keep reading" card — Vaia points back to Lucida.
import lucidaPreview from '../../assets/projects/lucida-default.png';

const vaia: CaseData = {
  slug: 'vaia',
  title: "Vaia — Restoring students' control and transparency over automated exam preparation · Marianna Delihioz",
  description:
    'Case study: redesigning Vaia to restore student control over the AI-driven exam-prep flow — uploads, generation depth, and study-plan scheduling.',

  hero: {
    tags: ['Mobile App', 'EdTech', 'Redesign Concept'],
    title:
      "Restoring students' control and transparency over automated exam preparation",
    image: heroImage,
    imageAlt:
      'Vaia mobile screens showing the flashcard study plan with focus levels and per-subtopic progress.',
  },

  overview: {
    paragraph:
      'Vaia is a mobile app that promises to handle exam prep automatically with AI-generated flashcards, spaced repetition, and a personalized daily study plan. This case study is about the moment that promise breaks, and how I fixed it.',
    role: ['UX Designer', 'Product Designer'],
    methods:
      'UX Audit · Competitive analysis · Journey mapping · Problem framing · User flows · Wireframing · Prototyping',
  },

  research: {
    methodsCaption: '{RESEARCH}',
    methodsHeadline: 'What students are actually frustrated about',
    methodsIntro: 'To find out, I ran two parallel analyses:',
    callouts: [
      {
        title: 'UX Audit',
        text: `I walked through the scenarios a student uses most (adding material, generating flashcards, following the daily plan, taking tests) and mapped breakdowns against Nielsen's heuristics.`,
      },
      {
        title: 'Review Analysis',
        text: 'I collected feedback from 5 platforms (App Store, Play Market, Trustpilot, Reddit, JustUseApp) and used AI to identify recurring patterns across 50+ reviews.',
        platforms: [
          {
            label: 'Platforms used:',
            icons: [
              { src: iconAppStore, alt: 'App Store' },
              { src: iconGooglePlay, alt: 'Google Play', bg: '#F4F4F3' },
              { src: iconTrustpilot, alt: 'Trustpilot', bg: '#F4F4F3' },
              { src: iconJustUseApp, alt: 'JustUseApp' },
              { src: iconReddit, alt: 'Reddit' },
            ],
          },
        ],
      },
    ],
    findingsHeading: 'The most frequently mentioned issues that surfaced',
    // 4 list items per Figma — item 4 is intentionally long, glued to the
    // audit-cause sentence as one compound list entry (Marianna's call).
    findingsItems: [
      'Low quality of generated flashcards.',
      'Limited control and customization of generations.',
      'Tight generation limits, even for users with a subscription.',
      'Daily study plan overloaded with task volume. The audit traced one cause: the app auto-schedules all new topic flashcards for today, with no warning.',
    ],
    findingsImage: userFeedbackImage,
    findingsImageAlt:
      'Grid of six highlighted user quotes from App Store, Play Market, Trustpilot, Reddit and JustUseApp reviews.',
    findingsCaption: "Key highlights from users' feedback.",
    findingsImageRatio: '868 / 424',
    selectionTitle: 'Criteria for selecting problems to solve',
    selectionDescription:
      'The selection of problems to solve was based on impact/effort, considering existing constraints and available data.',
    selectionImpactLeadBold: 'Impact',
    selectionImpactLeadPlain: 'is determined based on three questions:',
    selectionImpactBullets: [
      {
        bold: `Does this problem block the user's main "job"?`,
        plain:
          'The main task in Vaia is to study material and prepare for exams, with the routine automated. If the problem hinders this directly → high impact.',
      },
      {
        bold: 'How often does the user encounter this?',
        plain:
          'If the problem occurs in the daily flow (reviewing cards, daily plan) → high impact.',
      },
      {
        bold: 'Does the problem cause users to abandon the app?',
        plain: `If feedback includes signals like "I'll just do it myself" or "the feature is ruined" → high impact.`,
      },
    ],
    selectionEffortBold: 'Effort',
    selectionEffortPlain:
      '— how realistically the problems can be solved at the design solution level, based on the available information.',
  },

  problems: [
    {
      number: 1,
      headline: 'A 50-page chapter requires five uploads and waits to become flashcards',
      image: problem1Image,
      imageAlt:
        'Vaia upload flow: three mobile screens showing the 10-page selection cap and the repeated upload loop required for larger chapters.',
      paragraph: [
        { text: 'When ', bold: true },
        { text: 'users' },
        { text: ' try to ', bold: true },
        { text: 'add a new topic to the current exam' },
        { text: ', they encounter difficulties because ', bold: true },
        { text: 'the app allows uploading up to 10 pages at a time' },
        { text: ', which leads to ', bold: true },
        { text: 'wasting time on repeated actions to cover materials that have much larger volumes.' },
      ],
      reason: {
        heading: 'Why it happens',
        text: 'Technically, the 10-page cap makes sense, since generation runs against a finite context window. The problem is that the app passes the limit straight to the student. Each upload starts from a fresh, empty page selector, with nothing remembered from the previous round.',
      },
    },
    {
      number: 2,
      headline: 'No control over the number of flashcards generated or the depth of content coverage',
      image: problem2Image,
      imageAlt:
        'Vaia generation flow: a mobile screen presents a fixed "50 cards" count and pre-generation settings that only let the user choose format, not quantity or depth.',
      paragraph: [
        { text: 'When ', bold: true },
        { text: 'users' },
        { text: ' try to ', bold: true },
        { text: 'generate cards based on selected material' },
        { text: ', they face difficulties because ', bold: true },
        { text: `it's impossible to control the number of cards and questions generated` },
        { text: ', which leads to ', bold: true },
        { text: 'time spent deleting or adding cards manually.' },
      ],
    },
    {
      number: 3,
      headline: 'Every new topic a student adds in mid-plan lands all its cards on today, with no warning',
      image: problem3Image,
      imageAlt:
        'Vaia study-plan screens: adding a new topic silently shifts all of its cards onto the current day, overloading the planned schedule.',
      paragraph: [
        { text: 'When ', bold: true },
        { text: 'users' },
        { text: ' try to ', bold: true },
        { text: 'add a new topic to the current exam' },
        { text: ', they face difficulties because ', bold: true },
        { text: 'the app shifts the study of all new cards to the current day' },
        { text: ', which leads to ', bold: true },
        { text: 'loss of control over the study plan and overload.' },
      ],
    },
  ],

  solutions: [
    {
      number: 1,
      headline: 'Change the unit of work from page slices to subtopics',
      bullets: [
        'Removed the 10-page cap on selection. Students now pick once instead of redoing the flow every 10 pages, and generation runs in turns with visible progress.',
        'After selection, the system identifies subtopics within the chosen pages and runs generation per subtopic.',
        'Each subtopic has its own progress indicator, replacing the global spinner.',
        `The student can start reviewing the first subtopic's cards while the rest are still generating.`,
      ],
      beforeImage: before1Image,
      beforeImageAlt:
        'Before: Vaia upload screen with the 10-page selection cap forcing the student to repeat uploads.',
      beforeCaption: 'Only 10 pages at a time allowed.',
      videoSrc: '/videos/case-vaia/progressive-load.mp4',
      afterPoster: after1Image,
      videoLabel:
        'After: students select all pages at once and the generation process is split into per-subtopic chunks with visible progress.',
      afterCaption: 'Users can now select all pages at once; the generation process will be split into chunks.',
      prototypeUrl: PROTOTYPES.vaia.shared,
      hypotheses: [
        {
          label: '1',
          text: `The redesign will reduce total topic-add time and session count, if students can pick all the pages they need at once and review cards as each subtopic finishes. I'd validate this by comparing time, sessions, how often students use the chunk-by-chunk review, and drop-off rate against the original flow.`,
        },
      ],
    },
    {
      number: 2,
      headline: 'Let students choose how dense and how deep their card set should be',
      bullets: [
        'Added a focus level control with three options (Quick overview, Standard depth, or Deep dive), each with a card count range that adapts to the number of selected pages and content density.',
        'A review step sits between generation and save: students keep useful cards and discard the rest per subtopic.',
        'Excess cards never enter the study plan; the manual cleanup step disappears.',
      ],
      beforeImage: before2Image,
      beforeImageAlt:
        'Before: Vaia pre-generation screen offers format choices but no quantity or depth control.',
      beforeCaption: 'No control over card amount and depth.',
      videoSrc: '/videos/case-vaia/focus-level.mp4',
      afterPoster: after2Image,
      videoLabel:
        'After: three focus levels (Quick overview / Standard depth / Deep dive) let the student dial both the card count and how deeply the material is covered.',
      afterCaption: '3 levels of focus that allow the user to control the quantity and depth of flashcards.',
      prototypeUrl: PROTOTYPES.vaia.shared,
      hypotheses: [
        {
          label: '2.1',
          text: `The redesign will get a meaningful share of students to override the default focus level, if they get a control that bundles depth and card count before generation. I'd validate this by comparing focus level distribution, default override rate, and average cards saved per focus level.`,
        },
        {
          label: '2.2',
          text: `The redesign will sharply reduce manual card deletions inside the study plan, if students can review and curate cards before save. I'd validate this by comparing manual card deletions and review-step abandonment rate against the original flow.`,
        },
      ],
    },
    {
      number: 3,
      headline: 'Give students the plan before they commit to it',
      bullets: [
        'Added a scheduling step before new cards enter the plan.',
        'Suggested days with moderate existing load, instead of forcing everything onto today.',
        `Showed each suggested day's existing topics and card counts alongside the new addition.`,
        `Replaced silent scheduling with an explicit "Add to study plan" confirmation.`,
        'Made the daily pace adjustable, with a default based on topic size.',
      ],
      beforeImage: before3Image,
      beforeImageAlt:
        `Before: Vaia silently pushed every newly added topic's cards onto today's study plan.`,
      beforeCaption: `The app decided to add all the cards from the added topic to today's study plan, with no warning.`,
      videoSrc: '/videos/case-vaia/study-plan.mp4',
      afterPoster: after3Image,
      videoLabel:
        "After: a scheduling preview lets the student adjust start date and daily pace before saving, with smart defaults based on the current plan's load.",
      afterCaption: 'Planning with smart default based on current load.',
      prototypeUrl: PROTOTYPES.vaia.shared,
      hypotheses: [
        {
          label: '3',
          text: `The redesign will keep daily plan completion rates steady or higher after topic additions, if students can preview the schedule and adjust the start date and daily pace before saving. I'd validate this by comparing daily plan completion rate, schedule adherence, and topic-add abandonment rate against the original flow.`,
        },
      ],
    },
  ],

  summary: {
    description:
      'Vaia promises automated exam prep. The research revealed three points where this process needs improvement — scheduling chaos when adding topics, repeated uploads for material over 10 pages, and no control over what the AI generates. The redesign aims to give students control at the moments that matter.',
    // Figma stores this as one long paragraph with sentences glued by ". " —
    // split out by sentence to render as a numbered list (matches Lucida).
    approach: [
      `Walked through Vaia's main user flows (adding material, generating flashcards, following the daily plan, taking tests) and mapped breakdowns against Nielsen's heuristics.`,
      'Collected reviews from 5 platforms (App Store, Play Market, Trustpilot, Reddit, JustUseApp); used AI-assisted analysis to surface recurring patterns across 50+ reviews.',
      `Synthesized findings into three problem statements, prioritized by impact on Vaia's core promise and realistic implementation scope.`,
      'Analyzed the problematic user flow and identified the main pain points.',
      'Designed solutions for each problem with a clickable prototype.',
      'Framed each solution as a testable hypothesis with leading indicators and supporting metrics.',
    ],
    improvements: [
      'Removed the 10-page upload cap on selection: students pick all the pages they need in one pass, and generation runs in turns under the hood.',
      'Per-subtopic generation with visible progress; students can review the first batch while the rest still generates.',
      'Added a focus level (Quick overview / Standard depth / Deep dive) that bundles depth and card count, adapted to selected pages.',
      'Added a review step before save, so excess cards never reach the study plan.',
      'Added a scheduling preview so students adjust the start date and pace before any cards enter the plan.',
    ],
  },

  nextCard: {
    slug: 'lucida',
    tags: ['Mobile App', 'Language Learning', 'Redesign Concept'],
    headline:
      'Bringing structure and confidence to speaking practice through proven learning patterns',
    image: lucidaPreview,
    imageAlt: 'Lucida AI case study preview: speaking practice flow on mobile.',
  },
};

export default vaia;
