import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { Clause } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund Policy"
      intro="A plain-language guarantee: if the report doesn't help you, you get your money back."
    >
      <Clause heading="30-day money-back guarantee">
        <p>
          If you are not satisfied with a report for any reason, request a refund within 30 days of
          purchase and we will return the full amount. You do not need to justify the request.
        </p>
      </Clause>

      <Clause heading="How to request one">
        <p>
          Email{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-[#1f6fa8] hover:underline">
            {site.email}
          </a>{" "}
          or call {site.phone} with your order number. You can find the order number on your
          receipt or through the{" "}
          <Link href="/orders" className="font-semibold text-[#1f6fa8] hover:underline">
            order lookup page
          </Link>
          .
        </p>
      </Clause>

      <Clause heading="Processing time">
        <p>
          Approved refunds are returned to the original PayPal account or funding source, usually
          within 5–10 business days depending on your bank.
        </p>
      </Clause>

      <Clause heading="No subscriptions to cancel">
        <p>
          Every package is a one-time purchase. There is no recurring plan attached to your order,
          so there is nothing to cancel after a refund is issued.
        </p>
      </Clause>
    </LegalPage>
  );
}
