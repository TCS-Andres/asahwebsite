import { EDUCATIONAL_DISCLAIMER, type Quiz, type Question } from "./types";
import { buildBearsScoring } from "./scoring";
import {
  BEARS_BEDTIME,
  BEARS_DAYTIME,
  BEARS_NIGHT_WAKING,
  BEARS_SCHEDULE,
  BEARS_SNORING,
  BEARS_SECTIONS,
  bearsDomainExplanations,
} from "./bears";

const SUBJECT = "child";

const questions: Question[] = [
  {
    id: "b1",
    section: BEARS_BEDTIME,
    prompt: "Does your child have any problems going to bed?",
    type: "yesno",
    required: true,
    flagWhen: "yes",
  },
  {
    id: "b2",
    section: BEARS_BEDTIME,
    prompt: "Does your child have any problems falling asleep?",
    type: "yesno",
    required: true,
    flagWhen: "yes",
  },
  {
    id: "e1",
    section: BEARS_DAYTIME,
    prompt: "Does your child seem overtired or sleepy a lot during the day?",
    type: "yesno",
    required: true,
    flagWhen: "yes",
  },
  {
    id: "e2",
    section: BEARS_DAYTIME,
    prompt: "Does your child still take naps?",
    helper: "Naps are normal at this age. This answer just helps us see the full picture.",
    type: "yesno",
    required: true,
    // Informational at this age: napping is expected and does not flag the domain on its own.
    flagWhen: "none",
  },
  {
    id: "a1",
    section: BEARS_NIGHT_WAKING,
    prompt: "Does your child wake up a lot at night?",
    type: "yesno",
    required: true,
    flagWhen: "yes",
  },
  {
    id: "r1",
    section: BEARS_SCHEDULE,
    prompt: "Does your child have a regular bedtime and wake time?",
    type: "yesno",
    required: true,
    // Positively worded: a "no" is the answer worth a closer look.
    flagWhen: "no",
  },
  {
    id: "r2",
    section: BEARS_SCHEDULE,
    prompt: "What time is bedtime?",
    type: "time",
    required: false,
    flagWhen: "none",
  },
  {
    id: "r3",
    section: BEARS_SCHEDULE,
    prompt: "What time is wake time?",
    type: "time",
    required: false,
    flagWhen: "none",
  },
  {
    id: "s1",
    section: BEARS_SNORING,
    prompt: "Does your child snore a lot or have difficulty breathing at night?",
    type: "yesno",
    required: true,
    flagWhen: "yes",
  },
];

export const ages2to5Quiz: Quiz = {
  slug: "ages-2-5",
  title: "Sleep Screening for Children Ages 2 to 5",
  audience: "Children ages 2 to 5",
  instrument: "bears",
  summary:
    "The BEARS screening for toddlers and young children, covering five simple areas of sleep.",
  intro: {
    heading: "A Sleep Screening for Children Ages 2 to 5",
    body:
      "This screening uses the BEARS tool, a gentle five part checklist that looks at bedtime, " +
      "daytime sleepiness, night waking, sleep schedule, and snoring. It helps you assess your " +
      "child's sleeping patterns and spot areas worth a closer look. Our team at Austin Sleep & " +
      "Airway Health will reach out with next steps.",
    timeEstimate: "Takes about 2 minutes",
  },
  sections: BEARS_SECTIONS,
  questions,
  scoring: buildBearsScoring({
    questions,
    sections: BEARS_SECTIONS,
    subject: SUBJECT,
    growthSentence:
      "The early years are a window when small changes make a lasting difference in how a child " +
      "grows, breathes, and sleeps.",
    domainExplanations: bearsDomainExplanations(SUBJECT),
  }),
  disclaimer: EDUCATIONAL_DISCLAIMER,
};
