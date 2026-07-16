import Link from "next/link";
import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Section } from "@/components/Section";
import { Sunburst } from "@/components/Sunburst";
import type { NavLink } from "@/components/site-nav";

/*
  The homepage services list follows the live homepage order, which differs
  from the header dropdown and footer order. Each entry links to its service
  page, built in parallel by another worker.
*/
const homeServices: NavLink[] = [
  { label: "Sleep Appliances", href: "/services/sleep-appliances/" },
  { label: "CO2 Oral Tie Releases", href: "/services/co2-oral-tie-releases/" },
  {
    label: "CBCT and Airway Health Screenings",
    href: "/services/cbct-airway-screenings/",
  },
  { label: "TMJ Botox", href: "/services/tmj-botox/" },
  {
    label: "Soft Palate Tightening with Laser",
    href: "/services/soft-palate-tightening/",
  },
  {
    label: "Myofunctional Collaborative Space",
    href: "/services/myofunctional-collaborative-space/",
  },
  { label: "Airway-Focused Dentistry", href: "/services/airway-focused-dentistry/" },
];

/*
  Our Services: intro copy plus the numbered list of seven services.
*/
export function OurServices() {
  return (
    <Section background="cream" className="relative overflow-hidden">
      <Sunburst
        opacity={0.12}
        className="pointer-events-none absolute -top-10 right-0 h-40 w-80"
      />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <EyebrowHeading
              eyebrow="Our Services"
              heading="Personalized Treatments for a Healthier You"
            />
            <p className="text-body mt-6 text-ink/75">
              At Austin Sleep and Airway Health, we offer a range of services
              designed to help you breathe better and sleep soundly. From
              detailed airway evaluations and sleep studies to myofunctional
              therapy and non-invasive treatment options, we ensure that every
              patient, whether child or adult, receives individualized care. Dr.
              Kacie Culotta works closely with each patient to develop a plan
              that fits your lifestyle, helping you improve your sleep and
              overall health.
            </p>
          </div>

          <ol className="overflow-hidden rounded-3xl bg-white">
            {homeServices.map((service, index) => (
              <li key={service.href} className="border-b border-cream last:border-b-0">
                <Link
                  href={service.href}
                  className="group flex items-center gap-5 px-6 py-6 transition hover:bg-cream/60 focus-visible:outline-none focus-visible:bg-cream/60"
                >
                  <span className="font-display text-2xl text-sage tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-h3 flex-1 text-forest">
                    {service.label}
                  </span>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="shrink-0 text-terracotta transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
