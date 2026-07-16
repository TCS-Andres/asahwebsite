import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Markdown } from "@/components/Markdown";
import { siteConfig } from "@/lib/site";

/*
  HIPAA Notice of Privacy Practices. Live URL /hipaa-notice-of-privacy-practices/
  preserved. Copy is verbatim from content-source/legal-hipaa.md with these
  mandatory changes, logged in the worker output copy_changes:
  - H1 normalized to "HIPAA Notice of Privacy Practices" (matches the slug and
    title tag; the practice name prefix is dropped since it appears globally).
  - Privacy Officer contact email (the source "info@" address) replaced with
    hello@austinsleephealth.com. FLAG: this is a legal document.
  - Privacy Officer address normalized from "1701 Simond Ave, Unit 107A" to
    "1701 Simond Ave, Suite 107A" (Unit becomes Suite). FLAG: source discrepancy.
  - The contact block below is built from siteConfig, the single source of truth,
    so the normalized address and hello@ email are applied automatically.
  The source body contains no em dashes.
*/

const body = `## 1. About This Notice

Austin Sleep & Airway Health is committed to protecting the privacy of your health information. This Notice of Privacy Practices ("Notice") describes how we may use and disclose your Protected Health Information ("PHI") and explains your rights regarding that information. Protected Health Information is information that identifies you and relates to your past, present, or future health condition, the provision of healthcare to you, or payment for healthcare services.

We are required by the Health Insurance Portability and Accountability Act of 1996 ("HIPAA") and its implementing regulations to maintain the privacy of your PHI, to provide you with this Notice of our legal duties and privacy practices, and to follow the terms of the Notice currently in effect.

## 2. Who Will Follow This Notice

This Notice applies to all employees, staff, contractors, volunteers, and any third-party business associates of Austin Sleep & Airway Health who may access your PHI in the course of providing services or performing functions on behalf of the Practice. This includes Dr. Kacie M. Culotta and all clinical and administrative team members.

## 3. How We May Use and Disclose Your Protected Health Information

The following describes the ways we may use and disclose your PHI without your written authorization:

### For Treatment

We may use and disclose your PHI to provide, coordinate, or manage your healthcare and related services. This includes sharing information with other healthcare providers involved in your care, such as referring physicians, sleep specialists, ENTs, pediatricians, myofunctional therapists, speech therapists, lactation consultants, and other collaborative providers. For example, if Dr. Culotta refers you to a sleep physician or myofunctional therapist, we may share relevant portions of your health information to ensure coordinated care.

### For Payment

We may use and disclose your PHI to obtain payment for the services we provide. This may include submitting claims or verifying benefits with your dental or medical insurance plan, communicating with your insurance company regarding coverage and pre-authorization, and providing billing information to you or to a responsible party. For example, we may send your insurance company information about your oral appliance therapy or CBCT imaging so that your claim can be processed.

### For Healthcare Operations

We may use and disclose your PHI for our day-to-day healthcare operations. These activities include quality assessment and improvement, staff training and education, practice management and administrative functions, compliance activities and internal audits, and business planning and development. For example, we may use your health information to review the quality of care and outcomes provided by our Practice.

### Appointment Reminders and Health-Related Communications

We may use your PHI to contact you with appointment reminders, confirmations, or rescheduling communications by phone, email, text message, or mail. We may also contact you with information about treatment alternatives, health-related benefits, or services that may be of interest to you.

### Individuals Involved in Your Care

With your permission or when circumstances allow, we may disclose relevant PHI to a family member, close friend, or other person you identify as being involved in your care or in the payment for your care. If you are a minor, we may disclose PHI to your parent or legal guardian as permitted or required by law.

### As Required by Law

We may use or disclose your PHI when required to do so by federal, state, or local law.

## 4. Other Permitted and Required Disclosures

In addition to the uses described above, we may use or disclose your PHI without your authorization in the following situations, as permitted or required by law:

Public Health Activities: We may disclose PHI to public health authorities for purposes such as preventing or controlling disease, injury, or disability, and reporting adverse events or product defects.

Victims of Abuse, Neglect, or Domestic Violence: We may disclose PHI to appropriate government authorities if we reasonably believe a patient is a victim of abuse, neglect, or domestic violence, as required or authorized by law.

Health Oversight Activities: We may disclose PHI to health oversight agencies for activities authorized by law, including audits, investigations, inspections, and licensure actions.

Judicial and Administrative Proceedings: We may disclose PHI in response to a court order or, under certain conditions, in response to a subpoena, discovery request, or other lawful process.

Law Enforcement Purposes: We may disclose PHI to law enforcement officials under certain limited circumstances, such as in response to a court order, warrant, or grand jury subpoena, or to report certain types of wounds or injuries.

Coroners, Funeral Directors, and Organ Donation: We may disclose PHI to a coroner, medical examiner, or funeral director as necessary for them to carry out their duties, or to organizations involved in organ, eye, or tissue procurement and transplantation.

Research: Under certain circumstances, we may use or disclose PHI for research purposes, subject to approval by an Institutional Review Board or privacy board and applicable safeguards.

Serious Threats to Health or Safety: We may use or disclose PHI if we believe in good faith that it is necessary to prevent or lessen a serious and imminent threat to the health or safety of a person or the public.

Workers' Compensation: We may disclose PHI as authorized by and necessary to comply with workers' compensation laws.

Military and National Security: If you are a member of the armed forces, we may disclose PHI as required by military command authorities. We may also disclose PHI to authorized federal officials for national security and intelligence activities.

## 5. Uses and Disclosures That Require Your Written Authorization

For uses and disclosures not described in this Notice, we will obtain your written authorization before using or disclosing your PHI. This includes most uses and disclosures of psychotherapy notes (if applicable), uses and disclosures of PHI for marketing purposes, and any sale of your PHI.

You have the right to revoke your authorization in writing at any time. Revoking your authorization will not affect any uses or disclosures already made in reliance on your prior authorization.

## 6. Your Rights Regarding Your Protected Health Information

You have the following rights with respect to your PHI:

### Right to Access

You have the right to inspect and obtain a copy of your PHI maintained by the Practice, including your clinical and billing records. To request access, submit a written request to our Privacy Officer. We may charge a reasonable fee for the cost of copying, mailing, or other supplies associated with your request. In certain limited situations, we may deny your request, and if we do, we will explain the reason and inform you of your right to have the denial reviewed.

### Right to Request Amendment

If you believe that PHI we maintain about you is incorrect or incomplete, you may request that we amend it. Your request must be made in writing and must explain the reason for the requested amendment. We may deny your request under certain circumstances, such as if the information was not created by our Practice, is not part of the records we maintain, or is already accurate and complete. If we deny your request, we will provide you with a written explanation.

### Right to an Accounting of Disclosures

You have the right to request a list of certain disclosures of your PHI that we have made. This accounting does not include disclosures made for treatment, payment, or healthcare operations, disclosures made directly to you, disclosures made pursuant to your written authorization, or certain other disclosures. Your request must be made in writing and must specify the time period (which may not exceed six years prior to the date of the request).

### Right to Request Restrictions

You have the right to request that we restrict certain uses and disclosures of your PHI for treatment, payment, or healthcare operations, or disclosures to individuals involved in your care. We are not required to agree to your request except in one circumstance: if you pay for a service or item out of pocket in full and request that we not disclose PHI related to that service to your health plan for payment or healthcare operations purposes, we are required to honor that request.

### Right to Request Confidential Communications

You have the right to request that we communicate with you about your health information in a specific way or at a specific location. For example, you may ask that we contact you only at a particular phone number or send correspondence to a particular address. We will accommodate reasonable requests.

### Right to a Paper Copy of This Notice

You have the right to receive a paper copy of this Notice at any time, even if you previously agreed to receive it electronically. You may request a copy by contacting our Privacy Officer.

### Right to Be Notified of a Breach

You have the right to be notified in the event that the Practice discovers a breach of your unsecured PHI, in accordance with applicable federal and state law.

## 7. Our Legal Duties

We are required by law to maintain the privacy and security of your PHI, to provide you with this Notice of our legal duties and privacy practices with respect to your PHI, to notify you in the event of a breach of your unsecured PHI, and to follow the terms of the Notice that is currently in effect.

## 8. Changes to This Notice

We reserve the right to change the terms of this Notice and to make the new provisions effective for all PHI we maintain, including information created or received prior to the date of the change. If we make a material change to this Notice, we will post the revised Notice on our Website and make it available at our office. The revised Notice will include an updated effective date.

## 9. Complaints

If you believe your privacy rights have been violated, you may file a complaint with our Practice or with the U.S. Department of Health and Human Services.

To file a complaint with our Practice, contact our Privacy Officer using the information below.

To file a complaint with the U.S. Department of Health and Human Services, you may write to:

Office for Civil Rights U.S. Department of Health and Human Services 200 Independence Avenue, S.W. Washington, D.C. 20201

Or visit:

www.hhs.gov/ocr/privacy/hipaa/complaints

You will not be retaliated against for filing a complaint.`;

export default function HipaaNoticePage() {
  const { address, phone, phoneHref, email } = siteConfig;

  return (
    <main className="flex-1">
      <Section background="white">
        <Container className="max-w-3xl">
          <h1 className="text-h1 text-forest">
            HIPAA Notice of Privacy Practices
          </h1>
          <p className="text-small mt-4 text-ink/70">
            Effective Date: March 2026
          </p>

          <p className="text-small mt-6 rounded-2xl border border-sage/30 bg-cream p-6 font-semibold text-forest">
            THIS NOTICE DESCRIBES HOW HEALTH INFORMATION ABOUT YOU MAY BE USED
            AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE
            REVIEW IT CAREFULLY.
          </p>

          <div className="mt-10">
            <Markdown>{body}</Markdown>
          </div>

          {/* Section 10: contact block built from siteConfig (single source of truth). */}
          <div className="mt-10">
            <h2 className="text-h2 font-display text-forest">
              10. Privacy Officer Contact Information
            </h2>
            <p className="text-body mt-4 text-ink">
              If you have any questions about this Notice, wish to exercise any
              of your rights, or would like to file a complaint, please contact:
            </p>
            <address className="text-body mt-4 not-italic text-ink">
              Privacy Officer: Dr. Kacie M. Culotta
              <br />
              Austin Sleep &amp; Airway Health
              <br />
              {address.street}, {address.suite}
              <br />
              {address.city}, {address.state} {address.zip}
              <br />
              Phone: <a href={phoneHref} className="text-terracotta font-medium">{phone}</a>
              <br />
              Email:{" "}
              <a href={`mailto:${email}`} className="text-terracotta font-medium">
                {email}
              </a>
            </address>
          </div>
        </Container>
      </Section>
    </main>
  );
}
