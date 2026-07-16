/*
  Shared BEARS domain labels and growth framed domain explanations. The three
  pediatric configs reuse these so the domain copy stays consistent across
  ages, with the child or teen subject filled in per quiz.

  Every explanation frames the area as an opportunity to support healthy growth
  and breathing, never as a warning and never symptom first.
*/

export const BEARS_BEDTIME = "Bedtime";
export const BEARS_DAYTIME = "Daytime Sleepiness";
export const BEARS_NIGHT_WAKING = "Night Waking";
export const BEARS_SCHEDULE = "Sleep Schedule";
export const BEARS_SNORING = "Snoring";

export const BEARS_SECTIONS = [
  BEARS_BEDTIME,
  BEARS_DAYTIME,
  BEARS_NIGHT_WAKING,
  BEARS_SCHEDULE,
  BEARS_SNORING,
];

export function bearsDomainExplanations(subject: string): Record<string, string> {
  return {
    [BEARS_BEDTIME]:
      `Trouble settling at bedtime can be about routine, and it can also be a sign that a ` +
      `${subject} is not breathing as easily as they could be at night. It is a gentle place to start.`,
    [BEARS_DAYTIME]:
      `Daytime sleepiness in a growing ${subject} can mean nighttime sleep is not as restful as it ` +
      "looks. Restful sleep supports mood, focus, and healthy growth.",
    [BEARS_NIGHT_WAKING]:
      `Frequent waking at night can interrupt the deep sleep a ${subject}'s body and brain use to ` +
      "grow and recharge. Understanding why is a helpful step.",
    [BEARS_SCHEDULE]:
      `Regular, full nights of sleep give a ${subject}'s development its steadiest footing. Small ` +
      "schedule adjustments often go a long way.",
    [BEARS_SNORING]:
      `Snoring or noisy breathing is worth a closer look, since easy, quiet breathing at night ` +
      `supports how a ${subject} grows, focuses, and feels during the day.`,
  };
}
