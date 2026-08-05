import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { dentistSchema, websiteSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { QuizCTA } from "@/components/QuizCTA";
import { Hero } from "@/components/home/Hero";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { OurServices } from "@/components/home/OurServices";
import { RootCauses } from "@/components/home/RootCauses";
import { MeetDoctor } from "@/components/home/MeetDoctor";
import { Credentials } from "@/components/home/Credentials";
import { GoogleReviews } from "@/components/home/GoogleReviews";
import { TakeTheFirstStep } from "@/components/home/TakeTheFirstStep";

/*
  Homepage. Sections alternate white and cream with a single forest band on the
  Meet Dr. Culotta section. Copy is the live homepage copy, with the approved
  edits applied in the section components.
*/
/*
  The homepage title stays the layout default (no template suffix). Only the
  canonical is set here; description and Open Graph are inherited from the layout.
*/
export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

export default function Home() {
  return (
    <main className="flex-1">
      <JsonLd data={[dentistSchema(), websiteSchema()]} />
      <Hero />
      <WhyChooseUs />
      <OurServices />
      <RootCauses />
      <MeetDoctor />
      <Credentials />
      <GoogleReviews />
      <QuizCTA />
      <TakeTheFirstStep />
    </main>
  );
}
