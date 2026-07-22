import { PROTOTYPES } from '../../lib/config';
import type { CaseData } from './types';

// Hero + section assets
import heroImage from '../../assets/projects/cases/lucida/hero.png';
import userFeedbackImage from '../../assets/projects/cases/lucida/user-feedback.png';
import problem1Image from '../../assets/projects/cases/lucida/Problem 1.png';
import problem2Image from '../../assets/projects/cases/lucida/Problem 2.png';
import problem3Image from '../../assets/projects/cases/lucida/Problem 3.png';
import before1Image from '../../assets/projects/cases/lucida/before/before-1.png';
import before2Image from '../../assets/projects/cases/lucida/before/before-2.png';
import before3Image from '../../assets/projects/cases/lucida/before/before-3.png';
import after1Image from '../../assets/projects/cases/lucida/after/after-1.png';
import after2Image from '../../assets/projects/cases/lucida/after/after-2.png';
import after3Image from '../../assets/projects/cases/lucida/after/after-3.png';

// Platform icons used inside the Research methodology callout
import iconLucida from '../../assets/projects/cases/lucida/platforms/lucida.png';
import iconPraktika from '../../assets/projects/cases/lucida/platforms/praktika.png';
import iconLangua from '../../assets/projects/cases/lucida/platforms/langua.png';
import iconSpeak from '../../assets/projects/cases/lucida/platforms/speak.png';
import iconLora from '../../assets/projects/cases/lucida/platforms/lora.png';
import iconAppStore from '../../assets/projects/cases/lucida/platforms/app store.png';
import iconGooglePlay from '../../assets/projects/cases/lucida/platforms/google play.png';
import iconTrustpilot from '../../assets/projects/cases/lucida/platforms/trustpilot.png';
import iconReddit from '../../assets/projects/cases/lucida/platforms/reddit.png';

// Small preview image for the "Keep reading" card at the end of this case —
// points at the NEXT case (Vaia), so we import Vaia's Works-style preview here.
import vaiaPreview from '../../assets/projects/vaia-default.png';

const lucida: CaseData = {
  slug: 'lucida',
  title: 'Lucida AI — Bringing structure and confidence to speaking practice · Marianna Delihioz',
  description:
    'Case study: redesigning Lucida AI to turn one-time lesson content into practiced, retained vocabulary and corrections.',

  hero: {
    tags: ['Mobile App', 'Language Learning', 'Redesign Concept'],
    title:
      'Bringing structure and confidence to speaking practice through proven learning patterns',
    image: heroImage,
    imageAlt:
      'Lucida AI lesson summary screen showing achievements: Duration, Expressions saved, Tasks completed, Elements repeated, Errors corrected.',
  },

  overview: {
    paragraph:
      'Lucida AI is a mobile app that lets users speak with an AI tutor, get real-time pronunciation and grammar corrections, and save unfamiliar words to a dictionary. This case study is about the moment the lesson ends and none of those corrections and new words actually stick, and the redesign that closes that gap.',
    role: ['UX Designer', 'Product Designer'],
    methods:
      'UX Audit  · Competitive analysis · Desk research · Journey mapping · Problem framing · User flows · Wireframing · Prototyping',
  },

  research: {
    methodsCaption: '{RESEARCH}',
    methodsHeadline: 'What practicing with an AI tutor actually leaves behind',
    methodsIntro: 'To find out, I ran three parallel analyses, each from a different angle:',
    callouts: [
      {
        title: 'UX Audit',
        text: `Walked through the core flows (taking a lesson with the AI tutor, reviewing mistakes during and after the lesson, learning new vocabulary via the dictionary and word practice) and mapped breakdowns against Nielsen's heuristics.`,
      },
      {
        title: 'Review Analysis',
        text: 'Collected feedback from 5 platforms (App Store, Play Market, Trustpilot, Reddit, Langua Forum) and used AI to identify recurring patterns across 100+ reviews of Lucida and 4 peer apps (Praktika, Langua, Speak, Loora AI).',
        platforms: [
          {
            label: 'App reviews analyzed:',
            icons: [
              { src: iconLucida, alt: 'Lucida' },
              { src: iconPraktika, alt: 'Praktika' },
              { src: iconLangua, alt: 'Langua', bg: '#FFECEC' },
              { src: iconSpeak, alt: 'Speak', bg: '#EDF0FD' },
              { src: iconLora, alt: 'Loora AI', bg: '#E4EAFD' },
            ],
          },
          {
            label: 'Platforms used:',
            icons: [
              { src: iconAppStore, alt: 'App Store' },
              { src: iconGooglePlay, alt: 'Google Play', bg: '#F4F4F3' },
              { src: iconTrustpilot, alt: 'Trustpilot', bg: '#F4F4F3' },
              { src: iconLangua, alt: 'Langua Forum', bg: '#FFECEC' },
              { src: iconReddit, alt: 'Reddit' },
            ],
          },
        ],
      },
      {
        title: 'Desk Research',
        text: `Read research on how to actually learn languages effectively to identify which mechanics Lucida's flow was missing. Users had asked for specific features (flashcards, grammar exercises). Those requests don't always match what actually helps users reach their goal, which is why the redesign leans on proven methods from research.`,
      },
    ],
    findingsHeading: 'The most frequently mentioned issues that surfaced',
    findingsItems: [
      'No retention or practice mechanic for words saved to the dictionary.',
      'Lesson mistakes corrected in the moment, with no reinforcement after.',
      'No grammar instruction or targeted exercises.',
      'No level test and no visible progress over time.',
      'AI has limited context regarding user’s goals and the user in general.',
    ],
    findingsImage: userFeedbackImage,
    findingsImageAlt:
      'Grid of seven highlighted user quotes from App Store, Play Market, Trustpilot, Reddit and Langua Forum reviews.',
    findingsCaption: "Key highlights from users' feedback.",
    selectionTitle: 'Criteria for selecting problems to solve',
    selectionDescription:
      'The selection of problems to solve was based on impact/effort, considering existing constraints and available data.',
    selectionImpactLeadBold: 'Impact',
    selectionImpactLeadPlain: 'is determined based on three questions:',
    selectionImpactBullets: [
      {
        bold: `Does this problem block the user's main "job"?`,
        plain:
          'The main task in Lucida is to help users become fluent, or at least more confident, speakers. If the problem hinders that directly → high impact.',
      },
      {
        bold: 'How often does this come up in reviews?',
        plain:
          'If the issue shows up consistently across user feedback (multiple platforms, across different competitors) → high impact.',
      },
      {
        bold: 'Does the problem cause users to abandon the app?',
        plain: `If feedback includes signals like "has to rely on third-party apps for this" or "it's not actually teaching me" → high impact.`,
      },
    ],
    selectionEffortBold: 'Effort',
    selectionEffortPlain:
      '— how realistically the problems can be solved at the design solution level, based on the available information.',
  },

  problems: [
    {
      number: 1,
      headline: 'Saved words collect in a list but never come back into use',
      image: problem1Image,
      imageAlt:
        'Lucida dictionary screen: a static list of saved words with no practice or recall exercises available.',
      paragraph: [
        { text: 'When ', bold: true },
        { text: 'users' },
        { text: ' try to ', bold: true },
        { text: 'learn the vocabulary they saved during lessons' },
        { text: ', they encounter difficulties because ', bold: true },
        { text: 'the dictionary is a static list with no practice or recall exercises' },
        { text: ', which leads to ', bold: true },
        { text: 'saved words never becoming part of active vocabulary.' },
      ],
    },
    {
      number: 2,
      headline: `Today's new words don't stay in memory for long`,
      image: problem2Image,
      imageAlt:
        'Lucida lesson screens showing newly saved words before and during a new lesson, with no scheduled review.',
      paragraph: [
        { text: 'When ', bold: true },
        { text: 'users' },
        { text: ' try to ', bold: true },
        { text: 'retain new vocabulary across sessions' },
        { text: ', they encounter difficulties because ', bold: true },
        { text: 'the app has no spaced practice or scheduled review of past material' },
        { text: ', which leads to ', bold: true },
        { text: `words fading from memory before they're reinforced.` },
      ],
    },
    {
      number: 3,
      headline: 'The same mistakes return lesson after lesson',
      image: problem3Image,
      imageAlt:
        'Lucida tutor flagging a grammar mistake during a lesson; correction is shown once and never revisited.',
      paragraph: [
        { text: 'When ', bold: true },
        { text: 'users' },
        { text: ' try to ', bold: true },
        { text: 'improve from the mistakes they make during a lesson' },
        { text: ', they encounter difficulties because ', bold: true },
        { text: `corrections only surface in the moment and aren't revisited afterward` },
        { text: ', which leads to ', bold: true },
        { text: 'the same mistakes returning in every following lesson.' },
      ],
    },
  ],

  solutions: [
    {
      number: 1,
      headline: 'Turn the dictionary from a static list into a training ground',
      bullets: [
        `Added an onboarding flow that introduces the dictionary's new role as a training ground.`,
        'Allowed users to pick which saved words to train per session, instead of running through the whole list.',
        'Designed a 4-task progression per session, from translation matching to using the word in a full sentence.',
        'Added hints on harder tasks: a tap surfaces a clue without giving the answer away.',
      ],
      beforeImage: before1Image,
      beforeImageAlt:
        'Before: Lucida dictionary — a static list of saved words with no practice or recall exercises.',
      beforeCaption: 'Users can only view new words in a static list.',
      videoSrc: '/videos/case-lucida/learn-new-words.mp4',
      afterPoster: after1Image,
      videoLabel:
        'After: redesigned dictionary turns saved words into a 4-task practice session with progressive difficulty and hints.',
      afterCaption:
        'Available interactive exercises of varying difficulty levels for reinforcement.',
      prototypeUrl: PROTOTYPES.lucida.problem1,
      researchIntro: 'Two findings from the desk research shaped this solution:',
      highlights: [
        {
          quote: '“ Active recall forms long-term memory better than rereading”  (Washington University).',
          body: 'Each task asks users to pull the word from memory rather than review it: typing the translation, completing a sentence, using the word in a full reply. The whole session runs as a series of retrievals from memory, not a passive review.',
        },
        {
          quote: '“ Language is stored as patterns and collocations, rather than as isolated words”  (Wray, 2002).',
          body: 'Tasks present each new word inside a sentence or paired with the words it usually appears with, so users practice the word the way it actually lives in language.',
        },
      ],
      hypotheses: [
        {
          label: '1',
          text: `The redesign will turn saved words from a collected list into actively practiced vocabulary, if users can take them through progressive recall tasks with hints when stuck. I'd validate this by tracking the % of saved words practiced and the session completion rate.`,
        },
      ],
    },
    {
      number: 2,
      headline: 'Replace one-time review with interval repetition for lasting retention',
      bullets: [
        'Added onboarding that explains why spaced repetition is important and how it works.',
        `Built a fixed schedule based on Ebbinghaus's forgetting curve: a day after first practice, then a week, then at longer intervals.`,
        'Reused the task progression from Vocab training, with one harder open-ended task added at the end.',
        'Surfaced 5 familiarity levels per word (Known, Buddy, Friend, Peer, Family), deepening with each repetition.',
      ],
      beforeImage: before2Image,
      beforeImageAlt:
        'Before: newly saved words sit in the list without any scheduled review.',
      beforeCaption: 'New words are saved in the list but are not remembered by users.',
      videoSrc: '/videos/case-lucida/spaced-repetition.mp4',
      afterPoster: after2Image,
      videoLabel:
        'After: a spaced repetition system schedules each word to return at expanding intervals.',
      afterCaption:
        'Implemented a repetition system to reinforce new words and expressions for the long term.',
      prototypeUrl: PROTOTYPES.lucida.problem2,
      researchIntro: 'One finding from the desk research shaped this solution:',
      highlights: [
        {
          quote: '“ Spaced practice significantly improves long-term retention”  (Roediger & Karpicke, 2006).',
          body: `The schedule is borrowed from Ebbinghaus's forgetting curve: a word returns a day after first practice, then a week later, then at progressively longer intervals. Each return lands when the word is most likely to have faded — that's exactly when retrieving it from memory does the most work.`,
        },
      ],
      hypotheses: [
        {
          label: '2',
          text: `The % of saved words that advance through at least one familiarity level within four weeks will increase, if users get each word back at the scheduled interval before it fades. I'd validate this by tracking that progression rate.`,
        },
      ],
    },
    {
      number: 3,
      headline: 'Surface past mistakes as exercises users can actually work through',
      bullets: [
        `Added a "Review mistakes" prompt at the end of every lesson, so corrections are accessible while the lesson is still fresh.`,
        'Built an onboarding screen that explains the three-step session before practice starts.',
        'Showed each mistake as a direct comparison: what the user said vs. the correct version, with a grammar rule and examples.',
        'Added two practice exercises per mistake: a multiple-choice task and a sentence-completion task that users answer by voice or keyboard.',
        'Added mid-session progress saving so users can return without starting over.',
      ],
      beforeImage: before3Image,
      beforeImageAlt:
        'Before: after a lesson, the user is prompted straight into the next lesson with no review of past mistakes.',
      beforeCaption:
        'The user sees their mistakes only during the lesson with the tutor, but after finishing, they are immediately prompted to start the next lesson.',
      videoSrc: '/videos/case-lucida/review-mistakes.mp4',
      afterPoster: after3Image,
      videoLabel:
        'After: an end-of-lesson review walks the user through each mistake with grammar context and practice tasks.',
      afterCaption: `After finishing the lesson, it's recommended to review mistakes and complete exercises to reinforce the correct answers. You can always come back to them later.`,
      prototypeUrl: PROTOTYPES.lucida.problem3,
      researchIntro: 'One finding from the desk research shaped this solution:',
      highlights: [
        {
          quote: '“ Effective language learning requires a balance of input (reading, listening), production (speaking, writing), targeted study (grammar, vocabulary), and fluency practice ”  (Nation, 2007).',
          body: `Lucida's lessons cover only the input and speaking parts. The mistakes review adds the missing targeted study layer: explicit grammar work tied directly to what the user got wrong in conversation.`,
        },
      ],
      hypotheses: [
        {
          label: '3',
          text: `The redesign will make mistake review a regular part of the learning routine, if users get grammar explanations and practice tasks tied to their own errors. I'd validate this by tracking the % of lessons followed by a completed review session and the average number of mistakes worked through per session.`,
        },
      ],
    },
  ],

  summary: {
    description:
      'Lucida AI lets users practice speaking with an AI tutor and get corrected in real time. The research revealed a consistent pattern: corrections land in the moment, new words get saved, but neither makes it into long-term memory. The redesign targets three flows that turn one-time lesson content into practiced, retained knowledge.',
    approach: [
      `Walked through Lucida's core learner flows and mapped breakdowns against Nielsen's heuristics.`,
      'Collected and analyzed 100+ reviews of Lucida and 4 peer apps across 5 platforms to identify recurring pain points.',
      'Read research on effective language learning to identify which mechanics the app was missing.',
      'Prioritized three problems based on impact (blocks fluency, appears across platforms, signals abandonment) and effort at design level.',
      'Designed three net-new flows: Vocab training, Spaced repetition, and Mistakes review.',
      'Grounded each solution in desk research findings to connect design decisions to learning science.',
    ],
    improvements: [
      'Turned the dictionary from a static word list into a practice session with progressive recall tasks, from translation matching to building full sentences.',
      `Introduced a spaced repetition schedule built on Ebbinghaus's forgetting curve, bringing each word back before memory drops.`,
      'Added a mistakes review flow that opens directly after every lesson, with grammar explanations and practice tasks for each error.',
    ],
  },

  nextCard: {
    slug: 'vaia',
    tags: ['Mobile App', 'EdTech', 'Redesign Concept'],
    headline:
      "Restoring students' control and transparency over automated exam preparation",
    image: vaiaPreview,
    imageAlt: 'Vaia case study preview: AI-driven exam preparation flow on mobile.',
  },
};

export default lucida;
