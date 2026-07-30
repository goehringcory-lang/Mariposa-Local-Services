import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LEGAL_CONTACT_EMAIL, LEGAL_EFFECTIVE_DATE } from "@/lib/legal";
import AcceptTermsButton from "@/components/terms/AcceptTermsButton";

export const metadata: Metadata = {
  title: "Confirm Your Listing Terms | Mariposa Local Services",
  robots: { index: false, follow: false },
};

// Keyed on a per-business token, so there is nothing cacheable here.
export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AcceptTermsPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const provider = await prisma.provider.findUnique({
    where: { termsToken: token },
    select: {
      name: true,
      acceptedTermsAt: true,
      acceptedTermsVersion: true,
    },
  });

  if (!provider) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-700 mb-4">
            This link isn&apos;t working
          </h1>
          <p className="text-lg text-gray-500 mb-4">
            We couldn&apos;t find a listing for this link. It may have been
            copied incompletely from your email — links are long, so check that
            you got the whole thing.
          </p>
          <p className="text-lg text-gray-500">
            You can also just email us at{" "}
            <a
              href={`mailto:${LEGAL_CONTACT_EMAIL}`}
              className="text-primary underline font-bold"
            >
              {LEGAL_CONTACT_EMAIL}
            </a>{" "}
            and we&apos;ll sort it out.
          </p>
        </div>
      </div>
    );
  }

  if (provider.acceptedTermsAt) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
          <div className="text-success text-6xl mb-4">&#10003;</div>
          <h1 className="text-3xl font-bold text-gray-700 mb-4">
            You&apos;re all set
          </h1>
          <p className="text-xl text-gray-500 mb-2">
            <strong>{provider.name}</strong> accepted the listing terms on{" "}
            {formatDate(provider.acceptedTermsAt)}.
          </p>
          <p className="text-lg text-gray-400 mb-6">
            Nothing else is needed. You can read the terms any time at the links
            in the footer of the site.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white text-lg font-bold px-6 py-3 rounded-xl transition-colors min-h-[48px]"
          >
            Visit the Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2">
        Confirm your listing terms
      </h1>
      <p className="text-xl text-gray-400 mb-6">
        For <strong className="text-gray-600">{provider.name}</strong>
      </p>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
        <p className="text-lg text-gray-500">
          Your business is listed in the Mariposa Local Services directory. We
          have written terms for listings now, and we&apos;re asking every
          business already in the directory to review and confirm them.
        </p>

        <div className="border-l-4 border-accent pl-6 py-2 space-y-3">
          <h2 className="text-2xl font-bold text-gray-600">
            The important parts
          </h2>
          <ul className="space-y-3 text-lg text-gray-600">
            <li>
              Your listing is <strong>free</strong>, and it stays published for
              as long as you&apos;re in business in the area.
            </li>
            <li>
              Residents can post reviews of your business, and{" "}
              <strong>those reviews can be negative</strong>.
            </li>
            <li>
              <strong>
                We do not remove a listing or a review because a business asks
                us to over a negative review.
              </strong>{" "}
              This directory exists so neighbors can share honest experiences,
              good and bad. You can report a review that breaks our rules — for
              example, one from someone who was never a customer — and
              we&apos;ll look at it, but we decide.
            </li>
            <li>
              We can edit, suspend, or remove any listing at our discretion.
            </li>
            <li>
              We don&apos;t endorse, vet, or license-check the businesses we
              list. You&apos;re responsible for your own work and your own
              claims.
            </li>
          </ul>
        </div>

        <p className="text-lg text-gray-500">
          The full documents are here:{" "}
          <Link
            href="/business-terms"
            target="_blank"
            rel="noopener"
            className="text-primary underline font-bold"
          >
            Business Listing Terms
          </Link>
          ,{" "}
          <Link
            href="/terms"
            target="_blank"
            rel="noopener"
            className="text-primary underline font-bold"
          >
            Terms of Use
          </Link>
          , and{" "}
          <Link
            href="/privacy"
            target="_blank"
            rel="noopener"
            className="text-primary underline font-bold"
          >
            Privacy Policy
          </Link>
          . They open in a new tab, so you won&apos;t lose this page.
        </p>

        <AcceptTermsButton token={token} businessName={provider.name} />

        <p className="text-base text-gray-400">
          Effective date of these terms: {LEGAL_EFFECTIVE_DATE}. Questions? Email{" "}
          <a
            href={`mailto:${LEGAL_CONTACT_EMAIL}`}
            className="text-primary underline"
          >
            {LEGAL_CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
