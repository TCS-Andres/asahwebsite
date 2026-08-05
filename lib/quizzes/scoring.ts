/*
  Reusable scoring builders. Each quiz config imports the builder for its
  instrument and passes the small amount of data the builder needs. Keeping
  the logic here means the configs stay declarative and the same rules can
  power a future quiz of the same kind.

  Every scoring function is pure and framework free, so it runs identically on
  the client for the instant result screen and on the server for the integrity
  recompute in the submission handler.
*/

import type { Answers, AnswerValue, QuizResult, Question } from "./types";

const BRAND = "Austin Sleep & Airway Health";

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

function toNumber(v: AnswerValue | undefined): number {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function toBool(v: AnswerValue | undefined): boolean {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") return v.toLowerCase() === "yes" || v === "true";
  return false;
}

function toArray(v: AnswerValue | undefined): string[] {
  if (Array.isArray(v)) return v;
  if (typeof v === "string" && v !== "") return [v];
  return [];
}

/* Epworth Sleepiness Scale. Sums the eight 0 to 3 scale answers, then applies
   the standard bands. A witnessed apnea answer raises the result one band. */
export function buildEpworthScoring(params: {
  scaleQuestionIds: string[];
  symptomQuestionId: string;
  witnessedApneaValue: string;
  otherSymptomValues: string[];
}): (answers: Answers) => QuizResult {
  const bands = [
    { key: "normal", heading: "Your responses are in the normal range" },
    { key: "mild", heading: "Your responses suggest it is worth a closer look" },
    { key: "moderate", heading: "Your responses suggest an evaluation is a good idea" },
    { key: "severe", heading: "Your responses strongly suggest an evaluation" },
  ];

  function baseIndex(score: number): number {
    if (score <= 7) return 0;
    if (score <= 9) return 1;
    if (score <= 15) return 2;
    return 3;
  }

  return (answers: Answers): QuizResult => {
    const score = params.scaleQuestionIds.reduce(
      (sum, id) => sum + clamp(toNumber(answers[id]), 0, 3),
      0,
    );

    const symptoms = toArray(answers[params.symptomQuestionId]);
    const hasWitnessed = symptoms.includes(params.witnessedApneaValue);
    const otherChecked = params.otherSymptomValues.some((v) => symptoms.includes(v));

    let index = baseIndex(score);
    let elevated = false;
    if (hasWitnessed) {
      index = Math.min(index + 1, bands.length - 1);
      elevated = true;
    }

    const band = bands[index];
    const notes: string[] = [];
    let body: string;

    if (elevated) {
      body =
        `Your Epworth score is ${score} out of 24. You also noted that you choke, gasp, ` +
        "or stop breathing during sleep. Witnessed pauses in breathing are the strongest " +
        "signal on this screening, so we have raised the level of this result. This suggests " +
        "you should be evaluated by a qualified provider.";
    } else if (index === 0) {
      body =
        `Your Epworth score is ${score} out of 24, which falls in the normal range for daytime ` +
        "sleepiness. Even so, a baseline airway and sleep evaluation is a good idea. Airway " +
        "issues do not always show up as sleepiness, so an evaluation is a simple way to make " +
        "sure nothing is missed.";
      if (otherChecked) {
        body +=
          " You also checked one or more symptoms that can be linked to airway issues, which " +
          "makes that evaluation all the more worthwhile.";
      }
    } else if (index === 1) {
      body =
        `Your Epworth score is ${score} out of 24. Your responses suggest a mild level of ` +
        "excessive daytime sleepiness. Scheduling an evaluation is a good next step, so Dr. " +
        "Culotta can understand what may be affecting your sleep.";
    } else if (index === 2) {
      body =
        `Your Epworth score is ${score} out of 24. Your responses suggest a moderate level of ` +
        "excessive daytime sleepiness. This suggests you should be evaluated by a qualified provider.";
    } else {
      body =
        `Your Epworth score is ${score} out of 24. Your responses suggest a high level of ` +
        "excessive daytime sleepiness. This suggests you should be evaluated soon.";
    }

    const offerCall = index === bands.length - 1;
    if (offerCall) {
      notes.push(
        `Our team at ${BRAND} would be glad to call you and help you take the next step.`,
      );
    }

    return {
      band: band.key,
      heading: band.heading,
      body,
      score,
      maxScore: 24,
      elevated,
      offerCall,
      notes,
    };
  };
}

/* BEARS pediatric screen. Not numeric: any flagging answer in a domain flags
   that domain. Result copy leads with growth and developmental opportunity in
   every case, including zero flags, and never uses fear or symptom first framing. */
export function buildBearsScoring(params: {
  questions: Question[];
  sections: string[];
  subject: string;
  growthSentence: string;
  domainExplanations: Record<string, string>;
}): (answers: Answers) => QuizResult {
  return (answers: Answers): QuizResult => {
    const flagged = new Set<string>();

    for (const q of params.questions) {
      if (q.type !== "yesno") continue;
      const flagWhen = q.flagWhen ?? "yes";
      if (flagWhen === "none") continue;
      const answered = toBool(answers[q.id]);
      const isFlag = flagWhen === "yes" ? answered === true : answered === false;
      if (isFlag) flagged.add(q.section);
    }

    const orderedFlags = params.sections.filter((s) => flagged.has(s));
    const flaggedDomains = orderedFlags.map((domain) => ({
      domain,
      explanation: params.domainExplanations[domain] ?? "",
    }));

    if (flaggedDomains.length === 0) {
      return {
        band: "no-areas-flagged",
        heading: "A reassuring picture",
        body:
          "Your answers did not point to any of the five sleep areas we look at, which is " +
          `reassuring. ${params.growthSentence} A visit with Dr. Culotta is still a wonderful ` +
          `way to support healthy growth and make sure your ${params.subject}'s airway and ` +
          "sleep are on track, so scheduling an evaluation is a good next step.",
        flaggedDomains: [],
      };
    }

    return {
      band: "areas-flagged",
      heading: "A few areas worth a closer look",
      body:
        "A few of your answers point to areas worth a closer look. " +
        `${params.growthSentence} A short, friendly conversation is a good next step, and small ` +
        `changes now can support how your ${params.subject} grows, breathes, and sleeps.`,
      flaggedDomains,
    };
  };
}

/* TMJ and craniofacial checklist. Each checked item counts one. */
export function buildTmjScoring(params: {
  symptomQuestionId: string;
}): (answers: Answers) => QuizResult {
  return (answers: Answers): QuizResult => {
    const count = toArray(answers[params.symptomQuestionId]).length;

    let band: string;
    let heading: string;
    let body: string;

    if (count <= 2) {
      band = "low";
      heading = "Your responses suggest a lower likelihood of a jaw related issue";
      body =
        `You checked ${count} of the items on this list. Your responses suggest a lower chance ` +
        "that a temporomandibular or jaw joint issue is behind these symptoms. Even so, an " +
        "evaluation is a good idea, so a provider can take a closer look and make sure nothing " +
        "is overlooked.";
    } else if (count <= 5) {
      band = "moderate";
      heading = "Your responses suggest it is worth an evaluation";
      body =
        `You checked ${count} of the items on this list. Your responses suggest that a ` +
        "temporomandibular or craniofacial issue could be contributing to how you feel, and an " +
        "evaluation can help clarify what is going on.";
    } else {
      band = "high";
      heading = "Your responses suggest an evaluation is a good next step";
      body =
        `You checked ${count} of the items on this list. Your responses suggest that several ` +
        "signs often linked to temporomandibular and craniofacial issues are present. This " +
        "suggests you should be evaluated by a provider trained to treat these conditions.";
    }

    return { band, heading, body, score: count, maxScore: 14 };
  };
}
