import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_CONTACT_EMAIL, LEGAL_EFFECTIVE_DATE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Business Listing Terms | Mariposa Local Services",
  description:
    "The terms that apply to businesses listed in the Mariposa Local Services directory, including our policies on reviews and listing removal.",
};

export default function BusinessTermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2">
        Business Listing Terms
      </h1>
      <p className="text-lg text-gray-400 mb-6">
        Effective date: {LEGAL_EFFECTIVE_DATE}
      </p>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
        <div className="border-l-4 border-accent pl-6 py-2">
          <p className="text-lg text-gray-600">
            <strong>Please read Section 4 carefully.</strong> This directory
            exists so residents can share honest experiences with local
            businesses. Listings are not removed on request because a business
            received negative reviews.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            1. Who These Terms Apply To
          </h2>
          <p className="text-lg text-gray-500">
            These Business Listing Terms apply to anyone who submits or
            maintains a business listing on Mariposa Local Services, whether you
            are the business owner or someone submitting on the
            business&apos;s behalf. In these terms, &ldquo;Mariposa Local
            Services,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; and
            &ldquo;our&rdquo; mean this website together with its owner and
            operators, and &ldquo;you&rdquo; means the business and the person
            submitting for it.
          </p>
          <p className="text-lg text-gray-500 mt-3">
            These terms incorporate our{" "}
            <Link href="/terms" className="text-primary underline font-bold">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary underline font-bold">
              Privacy Policy
            </Link>
            , which also apply to you. If these terms conflict with the Terms of
            Use on a matter specific to listings, these terms control.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            2. What a Listing Is
          </h2>
          <p className="text-lg text-gray-500">
            A listing is a directory entry showing your business or contact
            name, phone number, description of services, and area served, along
            with a review section where members of the public can rate and
            comment on their experience with you. Your email address is used to
            contact you about your listing and is not displayed publicly.
          </p>
          <p className="text-lg text-gray-500 mt-3">
            Submitting the form is a request, not an automatic listing. We
            review every submission, and your listing appears in the directory
            only after we approve it. We may decline any submission for any
            reason.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            3. Your Representations
          </h2>
          <p className="text-lg text-gray-500">
            By submitting a listing, you represent and warrant that the
            information you provide is truthful, accurate, and not misleading;
            that you are authorized to submit it on behalf of the business; that
            you hold any license, registration, bond, or insurance the law
            requires for the services you offer; and that operating your
            business does not violate any law. You agree to keep your listing
            current and to email us at{" "}
            <a
              href={`mailto:${LEGAL_CONTACT_EMAIL}?subject=Mariposa Local Services — Update My Listing`}
              className="text-primary underline font-bold"
            >
              {LEGAL_CONTACT_EMAIL}
            </a>{" "}
            when your details change or you stop offering a service.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            4. Reviews of Your Business
          </h2>
          <p className="text-lg text-gray-500">
            This directory is built for transparency. Members of the public may
            post reviews and star ratings about your business, and{" "}
            <strong>those reviews may be negative</strong>. By listing here, you
            accept that as a condition of participation.
          </p>
          <p className="text-lg text-gray-500 mt-3">
            <strong>
              We will not remove your listing at your request because you
              received negative reviews or a low rating.
            </strong>{" "}
            The value of this directory to Mariposa residents depends on it
            reflecting real community experience — the good and the bad. A
            listing, once published, generally remains published for as long as
            your business operates in the area, along with the reviews attached
            to it.
          </p>
          <p className="text-lg text-gray-500 mt-3">
            Submitting a listing does not give you any right to require that we
            remove, hide, suspend, or edit your listing, your ratings, or any
            review of your business. Ratings and review history may remain
            visible even if your listing details change.
          </p>
          <p className="text-lg text-gray-500 mt-3">
            If you believe a specific review breaks the rules in Section 4 of
            our{" "}
            <Link href="/terms" className="text-primary underline font-bold">
              Terms of Use
            </Link>{" "}
            — for example, it is from someone who was never your customer, or it
            contains a false statement of fact rather than an opinion — you may
            report it by emailing{" "}
            <a
              href={`mailto:${LEGAL_CONTACT_EMAIL}?subject=Mariposa Local Services — Review Report`}
              className="text-primary underline font-bold"
            >
              {LEGAL_CONTACT_EMAIL}
            </a>{" "}
            with the details. We will consider your report at our sole
            discretion. We do not promise to investigate, respond, or remove
            anything, and disagreeing with a review is not grounds for removal.
          </p>
          <p className="text-lg text-gray-500 mt-3">
            You agree not to submit fake or incentivized reviews of your own
            business, to pay for or trade for reviews, to post reviews of your
            competitors, or to retaliate against, threaten, or harass anyone who
            reviews you. Doing so is grounds for removing your listing.
          </p>
          <p className="text-lg text-gray-500 mt-3">
            To the fullest extent permitted by law, you release Mariposa Local
            Services and its owner and operators from any claim, and waive any
            damages, arising out of a review of your business or the effect a
            review has on your reputation, revenue, or business relationships,
            including claims for defamation, trade libel, interference with
            business, or emotional distress. Your dispute over a review is
            between you and the person who wrote it.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            5. Our Rights: Approval, Editing, and Removal
          </h2>
          <p className="text-lg text-gray-500">
            <strong>
              We reserve the right to approve, decline, edit, reorder, suspend,
              or remove any listing at any time, for any reason or no reason, at
              our sole discretion, with or without notice.
            </strong>{" "}
            This includes removing a listing for inaccurate information, a
            business that has closed or left the area, unlawful or unsafe
            conduct, abuse of reviewers, or a violation of these terms — and it
            also includes removal for reasons we choose not to state.
          </p>
          <p className="text-lg text-gray-500 mt-3">
            We may edit listings for length, spelling, formatting, or category
            placement. We may also stop operating the directory, or any part of
            it, at any time. We have no obligation to keep any listing, review,
            or data available, and are not liable to you for removing a listing
            or for discontinuing the site.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">6. Fees</h2>
          <p className="text-lg text-gray-500">
            Basic listings are currently free. We reserve the right to introduce
            fees or paid features in the future; if we do, we will give you
            notice at the email address on your listing before any charge
            applies to you, and you may decline. Declining a future paid feature
            does not entitle you to removal of your basic listing or of any
            reviews.
          </p>
          <p className="text-lg text-gray-500 mt-3">
            Advertising placements are a separate arrangement made by email and
            governed by whatever terms we agree to at that time. See{" "}
            <Link
              href="/advertise"
              className="text-primary underline font-bold"
            >
              Advertise With Us
            </Link>
            . Paying for advertising does not affect how reviews are displayed,
            does not remove or reorder reviews, and does not grant any right to
            have a listing removed or a rating changed.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            7. No Endorsement; No Guarantee of Business
          </h2>
          <p className="text-lg text-gray-500">
            Being listed is not an endorsement, certification, or recommendation
            by us. We make no promise about how many people will see your
            listing, how many will contact you, or what business you will
            receive. Any contact statistics we share are estimates provided for
            convenience and are not guaranteed to be complete or accurate.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            8. License to Display Your Information
          </h2>
          <p className="text-lg text-gray-500">
            You grant us a non-exclusive, royalty-free, worldwide license to
            display, store, reproduce, format, and distribute the information
            you submit — including your business name, phone number,
            description, and area served — on and in connection with this site
            and its promotion. You keep ownership of your information and your
            trademarks.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            9. Indemnification
          </h2>
          <p className="text-lg text-gray-500">
            You agree to defend, indemnify, and hold harmless Mariposa Local
            Services and its owner and operators from any claim, demand, loss,
            liability, damage, judgment, cost, or expense (including reasonable
            attorneys&apos; fees) arising out of your listing or its contents,
            the services you provide, your dealings or disputes with customers
            or reviewers, your violation of these terms, or your violation of
            any law or third-party right.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            10. Disclaimers and Limitation of Liability
          </h2>
          <p className="text-lg text-gray-500">
            The site and your listing are provided &ldquo;as is&rdquo; and
            &ldquo;as available,&rdquo; without warranties of any kind. The
            disclaimer of warranties and limitation of liability in Sections 8
            and 9 of our{" "}
            <Link href="/terms" className="text-primary underline font-bold">
              Terms of Use
            </Link>{" "}
            apply fully to you and are incorporated here, including with respect
            to lost profits, lost business, and harm to reputation.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            11. Changes and Termination
          </h2>
          <p className="text-lg text-gray-500">
            We may update these terms from time to time; the current version is
            always posted here with its effective date. For material changes we
            will make a reasonable effort to notify you at the email address on
            your listing or by posting a notice on the site. Continuing to
            maintain your listing after an update means you accept the revised
            terms. Sections 4, 9, 10, and 12 survive the removal or termination
            of your listing.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            12. Governing Law and Venue
          </h2>
          <p className="text-lg text-gray-500">
            These terms are governed by the laws of the State of California,
            without regard to its conflict-of-laws rules. Any dispute will be
            brought exclusively in the state or federal courts located in or
            serving Mariposa County, California, and you consent to the personal
            jurisdiction of those courts. If any provision is found
            unenforceable, the rest remains in effect.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            13. Contact Us
          </h2>
          <p className="text-lg text-gray-500">
            Questions about these terms or your listing? Email us at{" "}
            <a
              href={`mailto:${LEGAL_CONTACT_EMAIL}?subject=Mariposa Local Services — Business Listing Terms`}
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
