/*
  Shared navigation data for the site chrome (Header, MobileNav, Footer).
  Plain data module with no client directive so it can be imported by both
  server and client components. Every phone, email, and NAP value still comes
  from lib/site.ts. These are structural nav links only.
*/

export interface NavLink {
  label: string;
  href: string;
}

/*
  The seven services in the live header dropdown and footer Services column
  order. This order differs from the numbered list on the homepage, which uses
  its own live order and lives in the OurServices section component.
*/
export const services: NavLink[] = [
  { label: "Sleep Appliances", href: "/services/sleep-appliances/" },
  {
    label: "CBCT and Airway Health Screenings",
    href: "/services/cbct-airway-screenings/",
  },
  { label: "CO2 Oral Tie Releases", href: "/services/co2-oral-tie-releases/" },
  {
    label: "Myofunctional Collaborative Space",
    href: "/services/myofunctional-collaborative-space/",
  },
  {
    label: "Soft Palate Tightening with Laser",
    href: "/services/soft-palate-tightening/",
  },
  { label: "Airway-Focused Dentistry", href: "/services/airway-focused-dentistry/" },
  { label: "TMJ Botox", href: "/services/tmj-botox/" },
];

/*
  Primary top level nav that follows the Services dropdown, in live order.
*/
export const primaryNav: NavLink[] = [
  { label: "About Us", href: "/about-us/" },
  { label: "Sleep Apnea Quiz", href: "/sleep-apnea-test/" },
  { label: "Patient Resources", href: "/patient-resources/" },
  { label: "Contact Us", href: "/contact-us/" },
];

/*
  Footer Menu column, in live order. The footer labels the quiz destination
  "Sleep Apnea Test" while the header calls it "Sleep Apnea Quiz". Both point
  to the same quiz hub.
*/
export const footerMenu: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us/" },
  { label: "Patient Resources", href: "/patient-resources/" },
  { label: "Contact Us", href: "/contact-us/" },
  { label: "Sleep Apnea Test", href: "/sleep-apnea-test/" },
  { label: "Terms & Conditions", href: "/terms-and-conditions/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  {
    label: "HIPAA Notice of Privacy Practices",
    href: "/hipaa-notice-of-privacy-practices/",
  },
];
