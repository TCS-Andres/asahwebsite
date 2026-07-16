import { QuizCTA } from "@/components/QuizCTA";
import { Hero } from "@/components/home/Hero";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { OurServices } from "@/components/home/OurServices";
import { RootCauses } from "@/components/home/RootCauses";
import { MeetDoctor } from "@/components/home/MeetDoctor";
import { Credentials } from "@/components/home/Credentials";
import { Testimonials } from "@/components/home/Testimonials";
import { TakeTheFirstStep } from "@/components/home/TakeTheFirstStep";

/*
  Homepage. Sections alternate white and cream with a single forest band on the
  Meet Dr. Culotta section. Copy is the live homepage copy, with the approved
  edits applied in the section components.
*/
export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <WhyChooseUs />
      <OurServices />
      <RootCauses />
      <MeetDoctor />
      <Credentials />
      <Testimonials />
      <QuizCTA />
      <TakeTheFirstStep />
    </main>
  );
}
