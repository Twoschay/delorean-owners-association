import { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <div className="container max-w-3xl py-16">
      <h1 className="font-display text-5xl text-white tracking-wide mb-8">
        TERMS OF <span className="text-amber">USE</span>
      </h1>
      <div className="prose prose-invert prose-sm max-w-none text-muted-foreground space-y-6">
        <p>Last updated: January 1, 2026</p>
        <p>
          By using this website and the DOA member portal, you agree to these terms of use.
        </p>
        <h2 className="font-display text-xl text-white tracking-wide">MEMBERSHIP</h2>
        <p>
          Membership is open to all DeLorean owners and enthusiasts. Annual dues are non-refundable.
          Memberships renew annually unless cancelled before the renewal date.
        </p>
        <h2 className="font-display text-xl text-white tracking-wide">ACCEPTABLE USE</h2>
        <p>
          Member forums and classifieds are for DeLorean-related content only. Spam, harassment,
          and off-topic commercial content will result in account suspension.
        </p>
        <h2 className="font-display text-xl text-white tracking-wide">INTELLECTUAL PROPERTY</h2>
        <p>
          DeLorean World Magazine content is copyright DOA. Member-submitted content is owned by
          the member but licensed to DOA for publication purposes.
        </p>
        <h2 className="font-display text-xl text-white tracking-wide">DISCLAIMER</h2>
        <p>
          The DOA provides technical information &quot;as-is&quot;. Always consult a qualified mechanic
          before performing work on your vehicle.
        </p>
        <h2 className="font-display text-xl text-white tracking-wide">CONTACT</h2>
        <p>
          For terms questions: info@deloreanowners.org
        </p>
      </div>
    </div>
  );
}
