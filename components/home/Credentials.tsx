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
  Credentials strip: a quiet, desaturated row of certification and association
  badges. Purely a trust signal, so the logos sit muted until hovered.
*/
export function Credentials() {
  return (
    <Section background="cream">
      <Container>
        <Reveal>
          <ul
            aria-label="Certifications and professional affiliations"
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8"
          >
            {credentials.map((credential) => (
              <li key={credential.alt}>
                <Image
                  src={credential.src}
                  alt={credential.alt}
                  className="h-14 w-auto opacity-70 grayscale transition duration-200 ease-out hover:opacity-100 hover:grayscale-0 md:h-16"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
