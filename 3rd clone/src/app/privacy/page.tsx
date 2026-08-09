import type { Metadata } from "next";
import LegalPage, { Clause } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="What we collect when you use the site, why we collect it, and how long we keep it."
    >
      <Clause heading="1. Information we collect">
        <p>
          When you request a report we collect your name, email address, optional phone number,
          country and the VIN you enter. When you contact support we collect the message you send
          us.
        </p>
        <p>
          Payment details are entered on PayPal&apos;s own systems. We receive only a transaction
          reference and the payment status — never your card number.
        </p>
      </Clause>

      <Clause heading="2. How we use it">
        <p>
          To produce and deliver your report, to answer support enquiries, to process refunds, and
          to keep records required for accounting and fraud prevention.
        </p>
      </Clause>

      <Clause heading="3. Sharing">
        <p>
          We share data with the processors needed to run the service — our payment provider, email
          delivery provider and hosting provider. We do not sell personal information.
        </p>
      </Clause>

      <Clause heading="4. Retention">
        <p>
          Order records are retained for as long as required by tax and accounting rules. Support
          messages and abandoned lookups are removed once they are no longer needed.
        </p>
      </Clause>

      <Clause heading="5. Your rights">
        <p>
          You may request a copy of your data, ask for corrections, or ask us to delete your
          account records. Email{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-[#1f6fa8] hover:underline">
            {site.email}
          </a>{" "}
          and we will respond within 30 days.
        </p>
      </Clause>

      <Clause heading="6. Security">
        <p>
          Traffic is encrypted in transit, access to production data is restricted, and payment
          data never touches our servers.
        </p>
      </Clause>
    </LegalPage>
  );
}
