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

export interface ProblemBlock {
  number: number;
  headline: string;
  image: ImageMetadata;
  imageAlt: string;
  paragraph: ParagraphPart[];
}

export interface SolutionHighlight {
  quote: string;
  body: string;
}

export interface SolutionBlock {
  number: number;
  headline: string;
  bullets: string[];
  beforeImage: ImageMetadata;
  beforeImageAlt: string;
  beforeCaption: string;
  videoSrc: string;
  videoLabel: string;
  afterCaption: string;
  prototypeUrl: string;
  researchIntro: string;
  highlights: SolutionHighlight[];
  hypothesis: string;
}

export interface CaseHero {
  number: string;
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
  number: string;
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
