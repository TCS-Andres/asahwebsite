import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import type { ServiceSection } from "@/lib/content";

/*
  A small set of line icons cycled across the body sections. They are quiet
  brand accents next to each section heading, decorative and aria-hidden.
  Paths follow the lucide 24 by 24 stroke style.
*/
const ICONS: string[][] = [
  ["M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"], // moon, restful sleep
  [
    "M12.8 19.6A2 2 0 1 0 14 16H2",
    "M17.5 8a2.5 2.5 0 1 1 2 4H2",
    "M9.8 4.4A2 2 0 1 1 11 8H2",
  ], // wind, airway and breathing
  ["M22 12h-4l-3 9L9 3l-3 9H2"], // activity, health
  [
    "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
    "m9 12 2 2 4-4",
  ], // shield check, safe and proactive
];

function SectionIcon({ index }: { index: number }) {
  const paths = ICONS[index % ICONS.length];
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage/12 text-sage"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    </span>
  );
}

export interface ServiceSectionsProps {
  slug: string;
  sections: ServiceSection[];
}

/*
  Renders the service body as alternating image and text rows, a ping pong
  layout. The image side and the background swap each row so the page reads
  with rhythm instead of one long column of text. Each row leads with a small
  section icon. Images live at /images/generated/{slug}-{n}.jpg.
*/
export function ServiceSections({ slug, sections }: ServiceSectionsProps) {
  return (
    <>
      {sections.map((section, index) => {
        const flip = index % 2 === 1;
        const background = index % 2 === 0 ? "cream" : "white";
        const imageSrc = `/images/generated/${slug}-${index + 1}.jpg`;

        return (
          <Section key={section.heading} background={background}>
            <Container>
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal className={flip ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4">
                    <SectionIcon index={index} />
                    <h2 className="text-h2 text-forest">{section.heading}</h2>
                  </div>
                  <div className="prose prose-lg mt-6 max-w-none prose-headings:font-display prose-headings:text-forest prose-h3:text-h3 prose-p:text-ink prose-li:text-ink prose-strong:text-forest prose-a:text-terracotta">
                    <Markdown remarkPlugins={[remarkGfm]}>
                      {section.body}
                    </Markdown>
                  </div>
                </Reveal>

                <Reveal
                  className={flip ? "lg:order-1" : ""}
                  delayMs={90}
                >
                  <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-soft-lg">
                    <Image
                      src={imageSrc}
                      alt={section.heading}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                </Reveal>
              </div>
            </Container>
          </Section>
        );
      })}
    </>
  );
}
