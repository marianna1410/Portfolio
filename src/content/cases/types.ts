import type { ImageMetadata } from 'astro';

export type CaseSlug = 'lucida' | 'vaia';

export interface ParagraphPart {
  text: string;
  bold?: boolean;
}

export interface PlatformIcon {
  src: ImageMetadata;
  alt: string;
  bg?: string;
}

export interface PlatformGroup {
  label: string;
  icons: PlatformIcon[];
}

export interface ResearchCallout {
  title: string;
  text: string;
  platforms?: PlatformGroup[];
}

export interface CriteriaBullet {
  bold: string;
  plain: string;
}

export interface ProblemReason {
  heading: string;
  text: string;
}

export interface ProblemBlock {
  number: number;
  headline: string;
  image: ImageMetadata;
  imageAlt: string;
  paragraph: ParagraphPart[];
  /**
   * Optional "Why it happens" block rendered below the problem image —
   * a sub-heading + explanatory paragraph. Used on Vaia P1; absent on
   * Lucida problems.
   */
  reason?: ProblemReason;
}

export interface SolutionHighlight {
  quote: string;
  body: string;
}

/**
 * One hypothesis under a solution. `label` is the caption suffix —
 * single-hypothesis solutions use the solution's own number ("1"),
 * solutions with multiple hypotheses use composite labels ("2.1", "2.2").
 */
export interface HypothesisItem {
  label: string;
  text: string;
}

export interface SolutionBlock {
  number: number;
  headline: string;
  bullets: string[];
  beforeImage: ImageMetadata;
  beforeImageAlt: string;
  beforeCaption: string;
  videoSrc: string;
  /** Poster still (after-state screenshot) shown before the video plays and
   *  whenever autoplay is blocked — so the panel is never blank. */
  afterPoster: ImageMetadata;
  videoLabel: string;
  afterCaption: string;
  prototypeUrl: string;
  /**
   * Optional "research findings" block above the hypothesis. Present on
   * Lucida solutions (desk-research grounding), absent on Vaia solutions.
   * Both researchIntro AND highlights must be provided together, or both
   * omitted.
   */
  researchIntro?: string;
  highlights?: SolutionHighlight[];
  /** One or more hypotheses — labelled individually so captions can be 1 / 2.1 / 2.2. */
  hypotheses: HypothesisItem[];
}

export interface CaseHero {
  tags: string[];
  title: string;
  image: ImageMetadata;
  imageAlt: string;
}

export interface CaseOverview {
  paragraph: string;
  role: string[];
  methods: string;
}

export interface CaseResearch {
  methodsCaption: string;
  methodsHeadline: string;
  methodsIntro: string;
  callouts: ResearchCallout[];
  findingsHeading: string;
  findingsItems: string[];
  findingsImage: ImageMetadata;
  findingsImageAlt: string;
  findingsCaption: string;
  /**
   * Aspect ratio of the findings composite image as a CSS aspect-ratio
   * string (e.g. "868 / 536"). Optional — defaults to "868 / 536" (the
   * Lucida ratio). Vaia uses "868 / 424".
   */
  findingsImageRatio?: string;
  selectionTitle: string;
  selectionDescription: string;
  selectionImpactLeadBold: string;
  selectionImpactLeadPlain: string;
  selectionImpactBullets: CriteriaBullet[];
  selectionEffortBold: string;
  selectionEffortPlain: string;
}

export interface CaseSummary {
  description: string;
  approach: string[];
  improvements: string[];
}

/**
 * The "Keep reading" card shown at the end of THIS case, pointing the
 * reader at the next case. Owned by this case (not by the sibling) so a
 * case can be authored end-to-end without depending on sibling data.
 * Uses the small Works-style preview image of the *next* case, not the
 * hero image.
 */
export interface CaseNextCardMeta {
  /** Slug of the next case — drives the card href (/cases/{slug}). */
  slug: CaseSlug;
  tags: string[];
  headline: string;
  image: ImageMetadata;
  imageAlt: string;
}

export interface CaseData {
  slug: CaseSlug;
  title: string;
  description: string;
  hero: CaseHero;
  overview: CaseOverview;
  research: CaseResearch;
  problems: ProblemBlock[];
  solutions: SolutionBlock[];
  summary: CaseSummary;
  nextCard: CaseNextCardMeta;
}
