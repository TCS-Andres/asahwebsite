import { EDUCATIONAL_DISCLAIMER, type Quiz, type QuestionOption } from "./types";
import { buildTmjScoring } from "./scoring";

const SYMPTOMS = "Symptoms";

const symptomOptions: QuestionOption[] = [
  { value: "headaches", label: "Headaches, recurring or chronic", score: 1 },
  { value: "ear", label: "Earache or ear stuffiness or ringing", score: 1 },
  { value: "neck", label: "Neck pain or stiffness", score: 1 },
  { value: "facial", label: "Facial pain", score: 1 },
  { value: "jaw-sounds", label: "Jaw joint sounds, clicking, popping, or grating", score: 1 },
  { value: "limited-motion", label: "Limited ability to open or close the mouth", score: 1 },
  { value: "jaw-locking", label: "Jaw locking, open or closed", score: 1 },
  { value: "teeth", label: "Sensitive, loose, or worn down teeth", score: 1 },
  { value: "tm-joint-pain", label: "Pain or soreness in the TM joints", score: 1 },
  { value: "dizziness-chewing", label: "Dizziness, or pain or difficulty chewing or swallowing", score: 1 },
  { value: "eye-pain", label: "Pain behind the eyes", score: 1 },
  { value: "light-sensitivity", label: "Extreme sensitivity to light", score: 1 },
  { value: "adhd", label: "ADHD", score: 1 },
  { value: "bed-wetting", label: "Bed wetting", score: 1 },
];

export const tmjQuiz: Quiz = {
  slug: "tmj-craniofacial-pain",
  title: "Craniofacial Pain and TMJ Screening",
  audience: "Adults and children",
  instrument: "tmj-checklist",
  summary:
    "A short checklist of jaw, head, and facial symptoms that can point to a TMJ or craniofacial issue.",
  intro: {
    heading: "Take a Craniofacial Pain and TMJ Screening",
    body:
      "If you or your child have symptoms that affect daily life, or you are taking pain medication " +
      "or sleep aids, these can sometimes be linked to a temporomandibular disorder. This short " +
      "checklist helps you see whether an evaluation by dentists trained to treat these conditions " +
      "may be worthwhile. Our team at Austin Sleep & Airway Health will reach out with next steps.",
    timeEstimate: "Takes about 1 minute",
  },
  sections: [SYMPTOMS],
  questions: [
    {
      id: "symptoms",
      section: SYMPTOMS,
      prompt: "Do you or your child have any of the following? Check all that apply.",
      helper: "It is fine to leave this empty if none apply.",
      type: "multi",
      options: symptomOptions,
      required: false,
    },
  ],
  scoring: buildTmjScoring({ symptomQuestionId: "symptoms" }),
  disclaimer: EDUCATIONAL_DISCLAIMER,
};
