import { EDUCATIONAL_DISCLAIMER, type Quiz, type QuestionOption } from "./types";
import { buildEpworthScoring } from "./scoring";

const SLEEPINESS = "Daytime Sleepiness";
const SYMPTOMS = "Symptom Check";

const scaleOptions: QuestionOption[] = [
  { value: "0", label: "No chance of dozing", score: 0 },
  { value: "1", label: "Slight chance of dozing", score: 1 },
  { value: "2", label: "Moderate chance of dozing", score: 2 },
  { value: "3", label: "High chance of dozing", score: 3 },
];

const situations: Array<{ id: string; prompt: string }> = [
  { id: "sitting-reading", prompt: "How likely are you to doze off while sitting and reading?" },
  { id: "watching-tv", prompt: "How likely are you to doze off while watching TV?" },
  { id: "public-place", prompt: "How likely are you to doze off while sitting inactive in a public place?" },
  { id: "car-passenger", prompt: "How likely are you to doze off while being a passenger in a car for an hour?" },
  { id: "lying-afternoon", prompt: "How likely are you to doze off while lying down in the afternoon?" },
  { id: "talking", prompt: "How likely are you to doze off while sitting and talking to someone?" },
  { id: "after-lunch", prompt: "How likely are you to doze off while sitting quietly after lunch, with no alcohol?" },
  { id: "traffic", prompt: "How likely are you to doze off while stopped for a few minutes in traffic while driving?" },
];

const scaleQuestionIds = situations.map((s) => s.id);

const WITNESSED = "witnessed-apnea";
const symptomOptions: QuestionOption[] = [
  { value: "unrefreshed", label: "Waking up feeling unrefreshed and tired" },
  { value: "morning-headaches", label: "Often experience morning headaches" },
  { value: WITNESSED, label: "I choke, gasp, or stop breathing during sleep" },
];

export const adultQuiz: Quiz = {
  slug: "adult",
  title: "Sleep Apnea Screening for Adults",
  audience: "Adults",
  instrument: "epworth",
  summary:
    "The Epworth Sleepiness Scale, a quick look at how daytime sleepiness may be affecting you.",
  intro: {
    heading: "Sleep Apnea Screening for Adults",
    body:
      "In the following situations, how likely are you to doze off or fall asleep, in contrast to " +
      "just feeling tired? This short screening uses the Epworth Sleepiness Scale to get a sense of " +
      "your daytime sleepiness, then asks about a few common symptoms. Our team at Austin Sleep & " +
      "Airway Health will reach out with next steps.",
    timeEstimate: "Takes about 2 minutes",
  },
  sections: [SLEEPINESS, SYMPTOMS],
  questions: [
    ...situations.map((s) => ({
      id: s.id,
      section: SLEEPINESS,
      prompt: s.prompt,
      helper: "Choose how likely you are to doze off, not just feel tired.",
      type: "scale" as const,
      options: scaleOptions,
      required: true,
    })),
    {
      id: "symptoms",
      section: SYMPTOMS,
      prompt: "Do you have any of the following? Check all that apply.",
      helper: "It is fine to leave this empty if none apply to you.",
      type: "multi",
      options: symptomOptions,
      required: false,
    },
  ],
  scoring: buildEpworthScoring({
    scaleQuestionIds,
    symptomQuestionId: "symptoms",
    witnessedApneaValue: WITNESSED,
    otherSymptomValues: ["unrefreshed", "morning-headaches"],
  }),
  disclaimer: EDUCATIONAL_DISCLAIMER,
};
