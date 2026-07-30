import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_CONTACT_EMAIL, LEGAL_EFFECTIVE_DATE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Mariposa Local Services",
  description:
    "What information Mariposa Local Services collects, how it is used, and the choices you have.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2">
        Privacy Policy
      </h1>
      <p className="text-lg text-gray-400 mb-6">
        Effective date: {LEGAL_EFFECTIVE_DATE}
      </p>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            1. Introduction
          </h2>
          <p className="text-lg text-gray-500">
            Mariposa Local Services is a community directory for Mariposa,
            California and the surrounding foothill communities. This policy
            explains what information we collect through this website, how we
            use it, and who we share it with. It applies to this site only, not
            to any business listed here or any site we link to.
          </p>
          <p className="text-lg text-gray-500 mt-3">
            We keep this simple on purpose: we do not sell personal information,
            and there are no user accounts or passwords for visitors or
            businesses.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            2. Information We Collect
          </h2>

          <h3 className="text-xl font-bold text-gray-600 mt-4 mb-2">
            When a business submits a listing
          </h3>
          <p className="text-lg text-gray-500">
            We collect the business or contact name, phone number, email
            address, description of services, service area, and the category
            selected. We also record the date and time you accepted our{" "}
            <Link
              href="/business-terms"
              className="text-primary underline font-bold"
            >
              Business Listing Terms
            </Link>
            . The name, phone number, description, and service area are{" "}
            <strong>displayed publicly</strong> in the directory once the
            listing is approved. The email address is{" "}
            <strong>not displayed publicly</strong> — it is used to contact you
            about your listing.
          </p>

          <h3 className="text-xl font-bold text-gray-600 mt-4 mb-2">
            When someone writes a review
          </h3>
          <p className="text-lg text-gray-500">
            We collect the name you enter, your star rating, your optional
            written comment, and the time of submission. The name you enter is{" "}
            <strong>displayed publicly</strong> alongside your review, so please
            use only a first name if you prefer not to be fully identified. We
            do not require an account or an email address to leave a review.
          </p>

          <h3 className="text-xl font-bold text-gray-600 mt-4 mb-2">
            When someone taps a phone number
          </h3>
          <p className="text-lg text-gray-500">
            So we can tell providers roughly how much interest the directory
            sent them, we record when a visitor taps a listed phone number,
            along with which page the tap came from. To count each visitor once
            rather than counting every tap, we store a{" "}
            <strong>salted, one-way hash of the visitor&apos;s IP address</strong>{" "}
            — the raw IP address is never stored, and the hash is used only for
            deduplication and rate limiting. It is not used to identify or track
            individual people.
          </p>

          <h3 className="text-xl font-bold text-gray-600 mt-4 mb-2">
            Automatically, as you browse
          </h3>
          <p className="text-lg text-gray-500">
            We use Google Analytics and Vercel Analytics to understand general
            usage — which pages are visited, roughly where visitors come from,
            and what devices they use. These services collect standard usage
            data and may set cookies or use similar technologies. Our web host
            also keeps ordinary server logs.
          </p>

          <h3 className="text-xl font-bold text-gray-600 mt-4 mb-2">
            When you email us
          </h3>
          <p className="text-lg text-gray-500">
            If you email us, we keep your message and email address so we can
            respond and keep a record of the request.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            3. How We Use Information
          </h2>
          <p className="text-lg text-gray-500">
            We use the information above to operate and display the directory,
            review and approve business submissions, publish listings and
            reviews, tell providers how many contacts the directory sent them,
            respond to your emails, keep the site secure and free of spam and
            abuse, and understand how the site is used so we can improve it. We
            do not use your information to build advertising profiles.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            4. Service Providers We Use
          </h2>
          <p className="text-lg text-gray-500">
            We rely on a small number of companies to run the site, and each
            receives only what it needs:
          </p>
          <ul className="text-lg text-gray-500 mt-3 space-y-2 list-disc pl-6">
            <li>
              <strong>Vercel</strong> — website hosting and site analytics.
            </li>
            <li>
              <strong>Google Analytics</strong> — usage analytics.
            </li>
            <li>
              <strong>Resend</strong> — sending notification emails about
              submissions.
            </li>
            <li>
              <strong>Our database host</strong> — storing listings, reviews,
              and contact-event records.
            </li>
          </ul>
          <p className="text-lg text-gray-500 mt-3">
            These companies handle information under their own privacy policies.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">5. Cookies</h2>
          <p className="text-lg text-gray-500">
            The analytics services described above may set cookies or use
            similar technologies to recognize returning visitors in aggregate.
            You can block or delete cookies in your browser settings; the
            directory will still work. You can also opt out of Google Analytics
            using Google&apos;s browser add-on at{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline font-bold"
            >
              tools.google.com/dlpage/gaoptout
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            6. Do Not Track
          </h2>
          <p className="text-lg text-gray-500">
            Some browsers offer a &ldquo;Do Not Track&rdquo; setting. Because
            there is no common industry standard for how to respond to it, this
            site does not currently respond to Do Not Track signals.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            7. How We Share Information
          </h2>
          <p className="text-lg text-gray-500">
            <strong>We do not sell your personal information.</strong> We share
            information only with the service providers listed in Section 4, in
            the public form you chose when you submitted a listing or review, or
            when we believe in good faith that disclosure is required by law,
            legal process, or a valid subpoena, or is necessary to protect the
            rights or safety of the public, our users, or the site.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            8. How Long We Keep Information
          </h2>
          <p className="text-lg text-gray-500">
            Listings and reviews are kept for as long as they remain useful to
            the directory&apos;s purpose. Contact-event records, which contain
            only hashed identifiers, are kept for statistics. Email
            correspondence is kept as long as needed for our records.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            9. Your Choices
          </h2>
          <p className="text-lg text-gray-500">
            You can email us at{" "}
            <a
              href={`mailto:${LEGAL_CONTACT_EMAIL}?subject=Mariposa Local Services — Privacy Request`}
              className="text-primary underline font-bold"
            >
              {LEGAL_CONTACT_EMAIL}
            </a>{" "}
            to ask what personal information we hold about you, to correct
            inaccurate information, or to ask us to remove the name you used on
            a review you wrote.
          </p>
          <p className="text-lg text-gray-500 mt-3">
            Please note: removal of a <strong>business listing</strong> is a
            separate matter governed by our{" "}
            <Link
              href="/business-terms"
              className="text-primary underline font-bold"
            >
              Business Listing Terms
            </Link>
            . Nothing in this Privacy Policy creates a right to have a listing
            or a review of a business taken down.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            10. Children&apos;s Privacy
          </h2>
          <p className="text-lg text-gray-500">
            This site is intended for adults and is not directed to children
            under 13. We do not knowingly collect personal information from
            children under 13. If you believe a child has provided us
            information, email us and we will delete it.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            11. Security
          </h2>
          <p className="text-lg text-gray-500">
            We take reasonable measures to protect the information we hold,
            including serving the site over an encrypted connection and storing
            visitor identifiers only in hashed form. No website or method of
            transmission is completely secure, however, and we cannot guarantee
            absolute security. Remember that anything you type into a public
            listing or review is visible to everyone.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            12. California Residents
          </h2>
          <p className="text-lg text-gray-500">
            This policy is provided in part to comply with the California Online
            Privacy Protection Act (CalOPPA). California residents may request
            to review and request changes to the personal information we hold
            about them by emailing us at the address in Section 14. We will
            respond within a reasonable time. We do not sell personal
            information, and we do not share personal information with third
            parties for their own direct marketing purposes.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            13. Changes to This Policy
          </h2>
          <p className="text-lg text-gray-500">
            If our practices change, we will update this page and revise the
            effective date shown at the top. Please check back from time to
            time.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            14. Contact Us
          </h2>
          <p className="text-lg text-gray-500">
            Questions about privacy? Email us at{" "}
            <a
              href={`mailto:${LEGAL_CONTACT_EMAIL}?subject=Mariposa Local Services — Privacy Policy`}
              className="text-primary underline font-bold"
            >
              {LEGAL_CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
