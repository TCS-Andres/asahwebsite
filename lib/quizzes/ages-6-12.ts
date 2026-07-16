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
    prompt: "Does your child have any problems at bedtime?",
    type: "yesno",
    required: true,
    voice: "parent",
    flagWhen: "yes",
  },
  {
    id: "b2",
    section: BEARS_BEDTIME,
    prompt: "Do you have any problems going to bed?",
    type: "yesno",
    required: true,
    voice: "child",
    flagWhen: "yes",
  },
  {
    id: "e1",
    section: BEARS_DAYTIME,
    prompt: "Does your child have difficulty waking in the morning, seem sleepy during the day, or take naps?",
    type: "yesno",
    required: true,
    voice: "parent",
    flagWhen: "yes",
  },
  {
    id: "e2",
    section: BEARS_DAYTIME,
    prompt: "Do you feel sleepy a lot?",
    type: "yesno",
    required: true,
    voice: "child",
    flagWhen: "yes",
  },
  {
    id: "a1",
    section: BEARS_NIGHT_WAKING,
    prompt: "Does your child wake up a lot at night? Any sleepwalking or nightmares?",
    type: "yesno",
    required: true,
    voice: "parent",
    flagWhen: "yes",
  },
  {
    id: "a2",
    section: BEARS_NIGHT_WAKING,
    prompt: "Do you have trouble getting back to sleep?",
    type: "yesno",
    required: true,
    voice: "child",
    flagWhen: "yes",
  },
  {
    id: "r1",
    section: BEARS_SCHEDULE,
    prompt: "What time does your child go to bed and get up on school days?",
    type: "text",
    required: false,
    voice: "parent",
    flagWhen: "none",
  },
  {
    id: "r2",
    section: BEARS_SCHEDULE,
    prompt: "What time on weekends?",
    type: "text",
    required: false,
    voice: "parent",
    flagWhen: "none",
  },
  {
    id: "r3",
    section: BEARS_SCHEDULE,
    prompt: "Do you think your child is getting enough sleep?",
    type: "yesno",
    required: true,
    voice: "parent",
    // Positively worded: a "no" is the answer worth a closer look.
    flagWhen: "no",
  },
  {
    id: "s1",
    section: BEARS_SNORING,
    prompt: "Does your child have loud or nightly snoring, or any breathing difficulties at night?",
    type: "yesno",
    required: true,
    voice: "parent",
    flagWhen: "yes",
  },
];

export const ages6to12Quiz: Quiz = {
  slug: "ages-6-12",
  title: "Sleep Screening for Children Ages 6 to 12",
  audience: "Children ages 6 to 12",
  instrument: "bears",
  summary:
    "The BEARS screening for school age children, with a few questions for you and a few for your child.",
  intro: {
    heading: "A Sleep Screening for Children Ages 6 to 12",
    body:
      "This screening uses the BEARS tool, a gentle five part checklist covering bedtime, daytime " +
      "sleepiness, night waking, sleep schedule, and snoring. Some questions are for the parent and " +
      "some are for the child. It helps you assess your child's sleeping patterns and spot areas " +
      "worth a closer look. Our team at Austin Sleep & Airway Health will reach out with next steps.",
    timeEstimate: "Takes about 2 minutes",
  },
  sections: BEARS_SECTIONS,
  questions,
  scoring: buildBearsScoring({
    questions,
    sections: BEARS_SECTIONS,
    subject: SUBJECT,
    growthSentence:
      "Childhood is a window when small changes make a lasting difference in how a child grows, " +
      "breathes, and sleeps.",
    domainExplanations: bearsDomainExplanations(SUBJECT),
  }),
  disclaimer: EDUCATIONAL_DISCLAIMER,
};
