/*
  Shared types for the config driven quiz engine.
  One shared renderer is driven entirely by this config, so adding a sixth
  quiz later requires only a new config file plus a registry entry.
*/

export type QuestionType = "scale" | "yesno" | "multi" | "time" | "text";

/*
  Refinement: some BEARS trigger questions are positively worded, where a
  "no" is the concerning answer (for example a regular bedtime, or getting
  enough sleep). flagWhen states which answer flags the domain. "none" marks
  a question that never flags, used for informational time and text answers.
*/
export type FlagWhen = "yes" | "no" | "none";

/*
  Refinement: voice drives a small subhead on the question screen so a mixed
  parent and child quiz can label who answers, instead of an inline prefix.
*/
export type QuestionVoice = "parent" | "child";

export interface QuestionOption {
  /** Stored value for multi selections, or the string form of a scale step. */
  value: string;
  /** Display label. */
  label: string;
  /** Points contributed when selected. Scale steps carry 0 to 3. */
  score?: number;
}

export interface Question {
  id: string;
  /** Section label, also the BEARS domain label when relevant. */
  section: string;
  prompt: string;
  helper?: string;
  type: QuestionType;
  options?: QuestionOption[];
  required: boolean;
  scoreWeight?: number;
  voice?: QuestionVoice;
  flagWhen?: FlagWhen;
}

export type QuizInstrument = "epworth" | "bears" | "tmj-checklist";

export interface QuizIntro {
  heading: string;
  body: string;
  /** Shown on the intro screen, for example "Takes about 2 minutes". */
  timeEstimate: string;
}

/*
  An answer value covers every question type: scale stores a number, yesno a
  boolean, multi a list of selected option values, time and text a string.
*/
export type AnswerValue = number | boolean | string | string[];
export type Answers = Record<string, AnswerValue>;

export interface FlaggedDomain {
  /** Section or domain label. */
  domain: string;
  /** Plain language, growth framed explanation of what the area can indicate. */
  explanation: string;
}

export interface QuizResult {
  /** Machine key for the band, for example "moderate" or "areas-flagged". */
  band: string;
  heading: string;
  body: string;
  /** Numeric score where the instrument is numeric. */
  score?: number;
  maxScore?: number;
  /** Flagged BEARS domains with growth framed explanations. */
  flaggedDomains?: FlaggedDomain[];
  /** True when the adult result was elevated by a witnessed apnea answer. */
  elevated?: boolean;
  /** True when the result offers a call from the practice. */
  offerCall?: boolean;
  /** Extra lines shown after the main body, for example a call offer. */
  notes?: string[];
}

export interface Quiz {
  slug: string;
  title: string;
  audience: string;
  instrument: QuizInstrument;
  intro: QuizIntro;
  /** Short line for the hub card. */
  summary: string;
  sections: string[];
  questions: Question[];
  scoring: (answers: Answers) => QuizResult;
  disclaimer: string;
}

/*
  The compliance line that must appear on every result screen. It is stored on
  each quiz as its disclaimer so the renderer stays fully config driven.
*/
export const EDUCATIONAL_DISCLAIMER =
  "This screening is educational and is not a diagnosis. Only a qualified provider can diagnose a sleep-related breathing disorder. Dr. Culotta would be glad to review these results with you.";
