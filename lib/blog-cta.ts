/*
  Closing CTA presets for blog posts. A post picks one with the optional `cta`
  frontmatter key; posts without one fall back to the sleep screening hub.
  Every preset routes to an educational screening, a service page, or the
  schedule page, and screenings are never described as diagnostic.
*/
import type { BlogPost } from "@/lib/blog";

export interface BlogCta {
  href: string;
  label: string;
  heading: string;
  body: string;
}

export const BLOG_CTAS: Record<string, BlogCta> = {
  "quiz-hub": {
    href: "/sleep-apnea-test/",
    label: "Take a Sleep Screening",
    heading: "Curious what your sleep is telling you?",
    body: "Our free educational screenings take a few minutes and help you decide whether an airway evaluation is worth a look.",
  },
  "quiz-adult": {
    href: "/sleep-apnea-test/adult/",
    label: "Take the Adult Sleep Screening",
    heading: "Wondering whether a sleep evaluation is right for you?",
    body: "Take our quick, educational adult sleep screening to better understand your risk factors and what to bring to a visit.",
  },
  "quiz-2-5": {
    href: "/sleep-apnea-test/ages-2-5/",
    label: "Take the Ages 2 to 5 Screening",
    heading: "Noticing something about your little one's sleep?",
    body: "Our educational screening for children ages 2 to 5 helps you sort out which night signs are worth mentioning at an evaluation.",
  },
  "quiz-6-12": {
    href: "/sleep-apnea-test/ages-6-12/",
    label: "Take the Ages 6 to 12 Screening",
    heading: "Wondering about your child's sleep and breathing?",
    body: "Our educational screening for children ages 6 to 12 takes a few minutes and helps you decide whether an airway evaluation is worth a look.",
  },
  "quiz-13-18": {
    href: "/sleep-apnea-test/ages-13-18/",
    label: "Take the Teen Sleep Screening",
    heading: "Is your teen running on empty?",
    body: "Our educational screening for ages 13 to 18 helps you and your teen notice sleep and breathing patterns worth discussing with a provider.",
  },
  "quiz-tmj": {
    href: "/sleep-apnea-test/tmj-craniofacial-pain/",
    label: "Take the TMJ Screening",
    heading: "Jaw, face, or head pain that keeps coming back?",
    body: "Our educational craniofacial pain and TMJ screening helps you organize your symptoms before an evaluation.",
  },
  "sleep-appliances": {
    href: "/services/sleep-appliances/",
    label: "Explore Oral Appliance Therapy",
    heading: "A comfortable option worth exploring",
    body: "Learn how a custom oral appliance gently supports an open airway during sleep, and how we work alongside your sleep physician.",
  },
  cbct: {
    href: "/services/cbct-airway-screenings/",
    label: "Explore CBCT Airway Screenings",
    heading: "See your airway in 3D",
    body: "A quick, low-dose CBCT airway screening shows structural details a routine exam can miss and helps guide the next step.",
  },
  "tie-release": {
    href: "/services/co2-oral-tie-releases/",
    label: "Explore CO2 Oral Tie Releases",
    heading: "Room for your tongue to do its job",
    body: "Learn how a functional evaluation, gentle CO2 laser release, and myofunctional therapy work together for older kids, teens, and adults.",
  },
  myofunctional: {
    href: "/services/myofunctional-collaborative-space/",
    label: "Explore Myofunctional Therapy",
    heading: "Retrain the muscles behind breathing and sleep",
    body: "See how our collaborative myofunctional space brings therapists and airway care together under one roof.",
  },
  "soft-palate": {
    href: "/services/soft-palate-tightening/",
    label: "Explore Soft Palate Tightening",
    heading: "A gentle, non-surgical option for snoring",
    body: "Learn how laser soft palate tightening works and whether a consultation makes sense for you.",
  },
  "tmj-botox": {
    href: "/services/tmj-botox/",
    label: "Explore TMJ Botox Therapy",
    heading: "Relief for overworked jaw muscles",
    body: "Learn how personalized TMJ neurotoxin therapy fits into a root-cause plan for jaw pain and tension.",
  },
  "airway-dentistry": {
    href: "/services/airway-focused-dentistry/",
    label: "Explore Airway-Focused Dentistry",
    heading: "Dentistry that looks at how you breathe",
    body: "See how airway-focused dental care for kids and adults connects jaw growth, tongue posture, and nasal breathing.",
  },
  schedule: {
    href: "/schedule/",
    label: "Schedule a Consultation",
    heading: "Ready to talk it through?",
    body: "Book a visit with Dr. Culotta to review your sleep, breathing, and airway, and map out a next step that fits you.",
  },
};

/* The three migrated posts predate the cta field, so they keep their original targets. */
const LEGACY_CTA: Record<string, string> = {
  "what-to-expect-at-an-austin-sleep-apnea-clinic-a-complete-patient-guide": "quiz-hub",
  "why-sleep-apnea-is-a-silent-health-crisis-in-austin-and-how-to-catch-it-early": "cbct",
  "how-oral-appliance-therapy-works-austins-most-comfortable-alternative-to-cpap": "sleep-appliances",
};

export function resolveBlogCta(post: Pick<BlogPost, "slug" | "cta">): BlogCta {
  const key = post.cta ?? LEGACY_CTA[post.slug] ?? "quiz-hub";
  return BLOG_CTAS[key] ?? BLOG_CTAS["quiz-hub"];
}
