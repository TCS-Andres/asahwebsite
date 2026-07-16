import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Markdown } from "@/components/Markdown";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions",
  description:
    "Review the terms and conditions for using the Austin Sleep and Airway Health website and services in Austin, TX, including our online screening tools.",
  path: "/terms-and-conditions/",
});

/*
  Terms and Conditions. Live URL /terms-and-conditions/ preserved. Copy is
  verbatim from content-source/legal-terms.md with these mandatory changes,
  each logged in the worker output copy_changes:
  - Title reduced to "Terms and Conditions" (source title em dash removed).
  - Every body em dash removed (Sections 3, 5, 6, 8, 9) via comma restructuring.
  - The source "info@" contact address replaced with hello@austinsleephealth.com
    (Section 8 Help line and Section 17 Contact). FLAG: this is a legal document.
  - Stray trailing hyphen removed from "Effective Date: September 2024 -".
*/

const body = `Welcome to Austin Sleep & Airway Health. These Terms and Conditions ("Terms") govern your access to and use of the Austin Sleep & Airway Health website located at austinsleephealth.com (the "Website"), our online tools and quizzes, our SMS/text messaging program, and any services, content, or communications provided by Austin Sleep & Airway Health ("we," "us," "our," or "the Practice"). By accessing our Website, using our services, completing any online form or quiz, or communicating with us through any channel, you agree to be bound by these Terms. If you do not agree, please do not use our Website or services.

## 1. About Austin Sleep & Airway Health

Austin Sleep & Airway Health is a specialized dental practice located in Austin, Texas, focused on airway health and sleep-related breathing disorders. The Practice is led by Dr. Kacie M. Culotta, a licensed dentist. The Practice provides dental sleep medicine services, including but not limited to oral appliance therapy, CBCT airway imaging, CO2 laser oral tie releases, myofunctional therapy collaboration, soft palate tightening, airway-focused dentistry, and TMJ Botox/neurotoxin treatments. The Practice does not provide general dentistry services such as routine cleanings, fillings, or restorative dental work.

## 2. Eligibility

By using our Website or services, you represent that you are at least 18 years of age or are accessing the Website under the supervision of a parent or legal guardian. If you are scheduling services or completing forms on behalf of a minor, you represent that you are the parent or legal guardian of that minor and are authorized to act on their behalf.

## 3. Website Use and Intellectual Property

All content on the Austin Sleep & Airway Health Website, including text, images, graphics, logos, videos, design elements, and other materials, is the property of Austin Sleep & Airway Health or its content providers and is protected by applicable copyright, trademark, and intellectual property laws. You may not reproduce, distribute, modify, display, or create derivative works from any content on our Website without prior written consent from Austin Sleep & Airway Health. The Austin Sleep & Airway Health name, logo, tagline, and all related marks are trademarks of the Practice. Unauthorized use of any trademark, logo, or content is strictly prohibited.

## 4. Medical and Health Disclaimer

The content provided on our Website, in our quizzes, in our blog posts, on our social media channels, and in any other communications is for general informational and educational purposes only. It is not intended as, and should not be construed as, medical advice, diagnosis, or treatment.

No content on our Website or in our communications creates a provider-patient relationship. A provider-patient relationship is established only when you are formally accepted as a patient of the Practice and have been seen for a clinical evaluation by Dr. Culotta.

Dr. Kacie M. Culotta is a licensed dentist, not a physician. All services are provided within the scope of dentistry as defined by applicable Texas state law. You should always consult with a qualified healthcare provider regarding any medical condition, symptom, or treatment decision. Never disregard professional medical advice or delay seeking it because of something you read or encountered through our Website or communications. If you are experiencing a medical emergency, call 911 or go to your nearest emergency room immediately.

## 5. Online Quizzes, Screening Tools, and Forms

Austin Sleep & Airway Health offers online quizzes, screening tools, and intake forms (collectively, "Online Tools") through our Website or affiliated platforms. These Online Tools, including but not limited to our Sleep Apnea Quiz, BEARS Pediatric Sleep Screening, and TMJ/Craniofacial Pain Checklist, are designed for general educational and screening purposes only.

These Online Tools do not provide a medical or dental diagnosis. Results from any quiz or screening tool are not a substitute for a clinical evaluation by Dr. Culotta or another qualified healthcare provider. The information you provide in these Online Tools will be collected and used in accordance with our Privacy Policy. By completing any Online Tool, you consent to being contacted by Austin Sleep & Airway Health regarding your results, including by phone, email, or text message, unless you opt out.

## 6. Appointment Scheduling and Patient Responsibilities

When you schedule an appointment with Austin Sleep & Airway Health, whether through our Website, by phone, by text, or through any other channel, you agree to provide accurate and complete information, arrive on time for scheduled appointments, provide at least 24 hours' notice if you need to cancel or reschedule (unless otherwise communicated), and understand that failure to provide adequate cancellation notice may result in a cancellation fee as outlined at the time of scheduling.

Austin Sleep & Airway Health reserves the right to reschedule, cancel, or decline appointments at its discretion.

## 7. Fees, Payment, and Insurance

Austin Sleep & Airway Health operates on a fee-for-service basis. Fees for services will be communicated to you prior to or at the time of your appointment. Payment is due at the time services are rendered unless other arrangements have been agreed upon in writing.

While the Practice may assist with insurance verification or claims submission as a courtesy, Austin Sleep & Airway Health does not guarantee insurance coverage for any service. You are ultimately responsible for understanding your insurance benefits and for payment of all fees, regardless of insurance reimbursement.

Pricing is subject to change. Any changes to pricing will be communicated to you before services are provided.

## 8. SMS/Text Messaging Terms

By providing your phone number to Austin Sleep & Airway Health, whether through our Website, intake forms, appointment scheduling, online quizzes, or by texting us directly, and opting in to receive text messages, you agree to the following.

Types of Messages: You may receive text messages related to appointment reminders and confirmations, follow-up care and post-treatment communications, responses to your questions and inquiries, health and wellness information related to our services, and promotional messages about our practice and services (only with your explicit consent).

Message Frequency: Message frequency varies depending on your appointment activity, inquiries, and communication preferences. You may receive recurring messages.

Message and Data Rates: Standard message and data rates may apply as determined by your mobile carrier. Austin Sleep & Airway Health is not responsible for any charges incurred from your carrier.

Opt-Out: You may opt out of text messages at any time by replying STOP to any message. You will receive a one-time confirmation that you have been unsubscribed. No further messages will be sent unless you re-enroll. Opting out of text messages will not affect your ability to receive care from our practice.

Help: Reply HELP to any message for assistance, or contact us at (512) 900-9715 or hello@austinsleephealth.com.

Supported Carriers: Our SMS program supports all major U.S. carriers, including but not limited to AT&T, Verizon, T-Mobile, and Sprint.

No Sharing of Opt-In Data: We do not sell, rent, lease, or share your phone number, opt-in consent, or any information collected through our text messaging program with third parties or affiliates for their marketing or promotional purposes.

## 9. User-Submitted Content and Communications

Any information, content, or materials you submit to Austin Sleep & Airway Health, including through our Website forms, quizzes, emails, text messages, or social media channels, are submitted voluntarily. You are responsible for ensuring that any information you provide is accurate, does not violate the rights of any third party, and does not contain any unlawful, harmful, or objectionable content.

By submitting a testimonial, review, photo, or other user-generated content to the Practice (whether solicited or unsolicited), you grant Austin Sleep & Airway Health a non-exclusive, royalty-free, perpetual right to use that content for marketing, educational, and promotional purposes, unless you notify us otherwise in writing.

## 10. Third-Party Links and Services

Our Website may contain links to third-party websites, platforms, or services that are not owned or controlled by Austin Sleep & Airway Health. We provide these links for your convenience and do not endorse or assume responsibility for the content, privacy practices, or policies of any third-party site. Your use of third-party websites is at your own risk and subject to the terms and conditions of those sites.

## 11. Limitation of Liability

To the fullest extent permitted by applicable law, Austin Sleep & Airway Health, Dr. Kacie M. Culotta, and their respective officers, employees, agents, and affiliates shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising from your use of the Website, reliance on any information provided through the Website or our communications, participation in any quiz, screening tool, or online form, any delay or disruption to the Website or services, or any unauthorized access to or use of your personal information, except as required by law.

The information on our Website is provided "as is" and "as available" without warranties of any kind, whether express or implied. We do not warrant that the Website will be uninterrupted, error-free, or free of viruses or harmful components.

## 12. Indemnification

You agree to indemnify and hold harmless Austin Sleep & Airway Health, Dr. Kacie M. Culotta, and their respective officers, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of your use of our Website or services, your violation of these Terms, or your violation of any rights of a third party.

## 13. Governing Law and Jurisdiction

These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions. Any disputes arising out of or related to these Terms or your use of our Website or services shall be resolved in the state or federal courts located in Travis County, Texas, and you consent to the personal jurisdiction of those courts.

## 14. Changes to These Terms

Austin Sleep & Airway Health reserves the right to update or modify these Terms at any time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of the Website or our services after any changes are posted constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.

## 15. Severability

If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.

## 16. Entire Agreement

These Terms, together with our Privacy Policy, constitute the entire agreement between you and Austin Sleep & Airway Health regarding your use of our Website and services, and supersede any prior agreements or understandings.

## 17. Contact Us

If you have any questions about these Terms and Conditions, please contact us:

Austin Sleep & Airway Health

Austin, Texas

Phone: (512) 900-9715

Email: hello@austinsleephealth.com

Website: austinsleephealth.com`;

export default function TermsAndConditionsPage() {
  return (
    <main className="flex-1">
      <Section background="white">
        <Container className="max-w-3xl">
          <h1 className="text-h1 text-forest">Terms and Conditions</h1>
          <p className="text-small mt-4 text-ink/70">
            Effective Date: September 2024. Last Updated: March 2026.
          </p>
          <div className="mt-10">
            <Markdown>{body}</Markdown>
          </div>
        </Container>
      </Section>
    </main>
  );
}
