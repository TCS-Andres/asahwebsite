import Image, { type StaticImageData } from "next/image";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import tbi from "@/public/images/credentials/tbi-ambassador-badge.webp";
import texasDental from "@/public/images/credentials/texas-dental-association.webp";
import lightScalpel from "@/public/images/credentials/lightscalpel-co2-lasers-logo-ret.webp";
import ada from "@/public/images/credentials/ada-logo-400x200-m-1.webp";
import iatp from "@/public/images/credentials/iatp-400x200-m-1.webp";

interface Credential {
  src: StaticImageData;
  alt: string;
}

const credentials: Credential[] = [
  { src: tbi, alt: "The Breathe Institute Ambassador badge" },
  { src: texasDental, alt: "Texas Dental Association member logo" },
  { src: lightScalpel, alt: "LightScalpel CO2 lasers logo" },
  { src: ada, alt: "American Dental Association member logo" },
  {
    src: iatp,
    alt: "International Affiliation of Tongue-Tie Professionals logo",
  },
];

/*
  One group of logos. The visible group carries the real alt text and label.
  The duplicated group is aria-hidden so the marquee loops seamlessly without
  a screen reader announcing every badge twice. The trailing padding matches
  the inner gap so the seam between the two groups keeps an even rhythm.
*/
function LogoGroup({ clone = false }: { clone?: boolean }) {
  return (
    <ul
      aria-hidden={clone ? true : undefined}
      aria-label={
        clone ? undefined : "Certifications and professional affiliations"
      }
      className="flex shrink-0 items-center gap-x-14 pr-14 md:gap-x-20 md:pr-20"
    >
      {credentials.map((credential) => (
        <li key={credential.alt} className="shrink-0">
          <Image
            src={credential.src}
            alt={clone ? "" : credential.alt}
            className="h-16 w-auto transition-transform duration-300 ease-out hover:scale-105 md:h-20"
          />
        </li>
      ))}
    </ul>
  );
}

/*
  Affiliations and certifications marquee. A small strip that slides the trust
  badges in a seamless loop. The set is duplicated so the loop has no seam, the
  clone is aria-hidden, the slide pauses on hover, the edges fade out with a
  mask, and reduced motion users see a static row (handled in globals.css).
*/
export function Credentials() {
  return (
    <Section background="cream" className="py-14 md:py-16">
      <Container>
        <Reveal>
          <p className="text-eyebrow text-center text-sage">
            Affiliations and Certifications
          </p>
          <div className="asah-marquee group relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
            <div className="asah-marquee-track flex w-max">
              <LogoGroup />
              <LogoGroup clone />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
