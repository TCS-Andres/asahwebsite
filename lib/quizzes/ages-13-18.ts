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

const SUBJECT = "teen";

// This screening is answered by the teen. Only the snoring question is for the
// parent, which is why it carries a voice and the rest do not.
const questions: Question[] = [
  {
    id: "b1",
    section: BEARS_BEDTIME,
    prompt: "Do you have any problems falling asleep at bedtime?",
    type: "yesno",
    required: true,
    flagWhen: "yes",
  },
  {
    id: "e1",
    section: BEARS_DAYTIME,
    prompt: "Do you feel sleepy a lot during the day?",
    type: "yesno",
    required: true,
    flagWhen: "yes",
  },
  {
    id: "e2",
    section: BEARS_DAYTIME,
    prompt: "Do you feel sleepy while in school?",
    type: "yesno",
    required: true,
    flagWhen: "yes",
  },
  {
    id: "e3",
    section: BEARS_DAYTIME,
    prompt: "Do you feel sleepy while driving?",
    type: "yesno",
    required: true,
    flagWhen: "yes",
  },
  {
    id: "a1",
    section: BEARS_NIGHT_WAKING,
    prompt: "Do you wake up a lot at night?",
    type: "yesno",
    required: true,
    flagWhen: "yes",
  },
  {
    id: "a2",
    section: BEARS_NIGHT_WAKING,
    prompt: "Do you have trouble getting back to sleep?",
    type: "yesno",
    required: true,
    flagWhen: "yes",
  },
  {
    id: "r1",
    section: BEARS_SCHEDULE,
    prompt: "What time do you go to bed and get up on school days?",
    type: "text",
    required: false,
    flagWhen: "none",
  },
  {
    id: "r2",
    section: BEARS_SCHEDULE,
    prompt: "What time on weekends?",
    type: "text",
    required: false,
    flagWhen: "none",
  },
  {
    id: "r3",
    section: BEARS_SCHEDULE,
    prompt: "How much sleep do you usually get?",
    type: "text",
    required: false,
    flagWhen: "none",
  },
  {
    id: "s1",
    section: BEARS_SNORING,
    prompt: "Does your teenager snore loudly or nightly?",
    type: "yesno",
    required: true,
    voice: "parent",
    flagWhen: "yes",
  },
];

export const ages13to18Quiz: Quiz = {
  slug: "ages-13-18",
  title: "Sleep Screening for Teens Ages 13 to 18",
  audience: "Teens ages 13 to 18",
  instrument: "bears",
  summary: "The BEARS screening for teens, mostly answered by the teen.",
  intro: {
    heading: "A Sleep Screening for Teens Ages 13 to 18",
    body:
      "This screening uses the BEARS tool, a gentle five part checklist covering bedtime, daytime " +
      "sleepiness, night waking, sleep schedule, and snoring. Most questions are answered by the " +
      "teen. It helps assess sleeping patterns and spot areas worth a closer look. Our team at " +
      "Austin Sleep & Airway Health will reach out with next steps.",
    timeEstimate: "Takes about 2 minutes",
  },
  sections: BEARS_SECTIONS,
  questions,
  scoring: buildBearsScoring({
    questions,
    sections: BEARS_SECTIONS,
    subject: SUBJECT,
    growthSentence:
      "These years are a window when small changes make a lasting difference in how a young person " +
      "grows, breathes, and sleeps.",
    domainExplanations: bearsDomainExplanations(SUBJECT),
  }),
  disclaimer: EDUCATIONAL_DISCLAIMER,
};
