import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Section } from "@/components/Section";
import doctorImage from "@/public/images/doctor/dr-kacie-culotta.avif";

/*
  Meet Dr. Culotta: the personal, first person bio on the forest band. The
  eyebrow and heading colors are overridden to warm cream tones for the dark
  background.
*/
export function MeetDoctor() {
  return (
    <Section background="forest">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <EyebrowHeading
              eyebrow="Meet Your Expert, Dr. Kacie M. Culotta"
              heading="A Personal Commitment to Your Health"
              className="[&_h2]:text-cream [&_p]:text-salmon"
            />
            <p className="text-body mt-6 text-cream/85">
              As both a mom and a dentist focused on airway and sleep health, I
              understand how deeply these issues can impact your life and your
              family. My journey started with my own children’s needs, and it
              inspired me to dedicate my career to helping others find real,
              lasting solutions. At Austin Sleep and Airway Health, I bring over
              a decade of experience in personalized airway care to help you
              breathe better, sleep more soundly, and improve your overall
              well-being. My goal is to offer compassionate, expert care that
              treats the root cause of your issues, so you and your family can
              live healthier, happier lives. Together, we’ll create a plan that
              fits your unique needs and empowers you to thrive.
            </p>
            <div className="mt-9">
              <Button href="/about-us/">Get To Know Dr. Culotta</Button>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl lg:order-last">
            <Image
              src={doctorImage}
              alt="Dr. Kacie M. Culotta, airway and sleep dentist in Austin, Texas"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
