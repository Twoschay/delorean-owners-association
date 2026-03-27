import { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl py-16">
      <h1 className="font-display text-5xl text-white tracking-wide mb-8">
        PRIVACY <span className="text-amber">POLICY</span>
      </h1>
      <div className="prose prose-invert prose-sm max-w-none text-muted-foreground space-y-6">
        <p>Last updated: January 1, 2026</p>
        <p>
          The DeLorean Owners Association (&quot;DOA&quot;) is committed to protecting your privacy. This
          policy describes how we collect, use, and protect your personal information.
        </p>
        <h2 className="font-display text-xl text-white tracking-wide">INFORMATION WE COLLECT</h2>
        <p>
          We collect information you provide when joining, including name, email, mailing address,
          and vehicle information. We may also collect usage data when you interact with our website.
        </p>
        <h2 className="font-display text-xl text-white tracking-wide">HOW WE USE YOUR INFORMATION</h2>
        <p>
          Your information is used to: process membership, deliver the magazine, communicate events,
          and maintain the member directory (with your consent for map display).
        </p>
        <h2 className="font-display text-xl text-white tracking-wide">DATA SHARING</h2>
        <p>
          We do not sell or rent your personal information to third parties. Member directory information
          is shared only with other verified DOA members and only as you consent.
        </p>
        <h2 className="font-display text-xl text-white tracking-wide">CONTACT</h2>
        <p>
          For privacy questions: privacy@deloreanowners.org
        </p>
      </div>
    </div>
  );
}
