import type { Metadata } from "next";
import LegalPage, { Clause } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      intro="Please read these terms and conditions carefully before using Safe Auto Records."
    >
      <Clause heading="1. Agreement to Terms">
        <p>
          By accessing or using {site.brand}, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access our vehicle history services.
        </p>
      </Clause>

      <Clause heading="2. Vehicle History Reports & Data">
        <p>
          {site.brand} provides vehicle background and history reports compiled from official NMVTIS and independent database sources using the VIN (Vehicle Identification Number) provided by you. While we make every effort to maintain accurate and up-to-date records, we cannot guarantee 100% completeness due to varying reporting standards across different jurisdictions.
        </p>
        <p>
          Reports are intended for informational purposes and should not replace an independent mechanical inspection.
        </p>
      </Clause>

      <Clause heading="3. Payments & One-Time Fees">
        <p>
          All report purchases are final one-time fees processed securely through PayPal. We do not operate recurring subscription plans, and you will not be enrolled in any automatic monthly billing.
        </p>
      </Clause>

      <Clause heading="4. Refund Policy">
        <p>
          We stand by our reports with a 30-day money-back guarantee. If you encounter any issue or are unsatisfied with your report, contact support at {site.email} for a prompt refund.
        </p>
      </Clause>

      <Clause heading="5. Limitation of Liability">
        <p>
          In no event shall {site.brand}, its directors, employees, or partners be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our vehicle reports.
        </p>
      </Clause>

      <Clause heading="6. Contact Information">
        <p>
          For any questions regarding these Terms and Conditions, please contact us at{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-[#198754] hover:underline">
            {site.email}
          </a>
          .
        </p>
      </Clause>
    </LegalPage>
  );
}
