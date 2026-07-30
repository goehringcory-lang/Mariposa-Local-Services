import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_CONTACT_EMAIL, LEGAL_EFFECTIVE_DATE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Use | Mariposa Local Services",
  description:
    "The terms that apply to everyone who uses the Mariposa Local Services directory, including visitors and people who write reviews.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2">
        Terms of Use
      </h1>
      <p className="text-lg text-gray-400 mb-6">
        Effective date: {LEGAL_EFFECTIVE_DATE}
      </p>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            1. Acceptance of These Terms
          </h2>
          <p className="text-lg text-gray-500">
            These Terms of Use are an agreement between you and Mariposa Local
            Services. In these terms, &ldquo;Mariposa Local Services,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; and &ldquo;our&rdquo; mean this
            website together with its owner and operators. By visiting this
            site, browsing listings, posting a review, or otherwise using the
            directory, you agree to these terms. If you do not agree, please do
            not use the site.
          </p>
          <p className="text-lg text-gray-500 mt-3">
            If you submit or maintain a business listing, our{" "}
            <Link
              href="/business-terms"
              className="text-primary underline font-bold"
            >
              Business Listing Terms
            </Link>{" "}
            also apply to you, in addition to these terms. Our{" "}
            <Link href="/privacy" className="text-primary underline font-bold">
              Privacy Policy
            </Link>{" "}
            explains what information we collect and how we handle it.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            2. Purpose of This Site
          </h2>
          <p className="text-lg text-gray-500">
            Mariposa Local Services is a community directory for Mariposa,
            California and the surrounding foothill communities. Its purpose is
            transparency: to help neighbors find local service providers, and to
            let residents share honest accounts of their experiences —
            <strong> both good and bad</strong>. Reviews on this site are meant
            to help the community decide who to hire and who to avoid.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            3. No Endorsement or Verification
          </h2>
          <p className="text-lg text-gray-500">
            Listings are provided for informational purposes only. We do not
            screen, vet, background-check, or verify the businesses listed here.
            We do not confirm that any provider holds a required license, bond,
            insurance, or certification, and a listing is not a recommendation,
            endorsement, or guarantee of any provider&apos;s honesty, quality,
            safety, pricing, or qualifications.
          </p>
          <p className="text-lg text-gray-500 mt-3">
            You are responsible for checking credentials, references, licensing,
            and insurance before hiring anyone. Any agreement, payment, work, or
            dispute is <strong>solely between you and the provider</strong>.
            Mariposa Local Services is not a party to it and has no
            responsibility for the outcome.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            4. Reviews and Other Content You Submit
          </h2>
          <p className="text-lg text-gray-500">
            You may post reviews of businesses listed in the directory. When you
            do, you agree that your review:
          </p>
          <ul className="text-lg text-gray-500 mt-3 space-y-2 list-disc pl-6">
            <li>
              is honest and reflects your own genuine, first-hand experience
              with that business;
            </li>
            <li>
              is not defamatory, threatening, harassing, obscene, or
              discriminatory;
            </li>
            <li>
              does not include another person&apos;s private information, such
              as a home address, personal phone number, or financial details;
            </li>
            <li>
              is not fake, paid for, incentivized, or written on behalf of
              someone else;
            </li>
            <li>
              is not a review of your own business, a business you work for, or
              a competitor;
            </li>
            <li>does not infringe anyone&apos;s rights or violate any law.</li>
          </ul>
          <p className="text-lg text-gray-500 mt-3">
            <strong>
              You are solely responsible for what you post, and you accept full
              legal responsibility for it.
            </strong>{" "}
            Reviews reflect the opinions and experiences of the people who write
            them, not the views of Mariposa Local Services. Please state facts
            accurately and make clear when you are expressing an opinion.
          </p>
          <p className="text-lg text-gray-500 mt-3">
            By submitting a review or any other content, you grant us a
            non-exclusive, royalty-free, worldwide license to display, store,
            reproduce, format, and distribute that content on and in connection
            with this site. You keep ownership of what you write.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            5. Our Role in User Content
          </h2>
          <p className="text-lg text-gray-500">
            Reviews and other user submissions are created by third parties, not
            by us. Mariposa Local Services is an interactive computer service as
            described in Section 230 of the Communications Decency Act, 47
            U.S.C. § 230, and is not the publisher or speaker of content
            provided by its users. We are not responsible or liable for user
            content, including negative reviews of any business.
          </p>
          <p className="text-lg text-gray-500 mt-3">
            We may — but are not obligated to — monitor, edit, refuse to post,
            or remove any content at our sole discretion, including content that
            violates these terms. Removing some content does not create any
            obligation to remove other content, and choosing to moderate does
            not make us the author of anything a user posts.
          </p>
          <p className="text-lg text-gray-500 mt-3">
            If you believe a review violates the rules in Section 4, you may
            report it by emailing us at{" "}
            <a
              href={`mailto:${LEGAL_CONTACT_EMAIL}?subject=Mariposa Local Services — Content Report`}
              className="text-primary underline font-bold"
            >
              {LEGAL_CONTACT_EMAIL}
            </a>
            . We will consider reports at our sole discretion. We do not promise
            that any particular review will be removed, and a review being
            unflattering is not by itself a violation.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            6. Things You May Not Do
          </h2>
          <p className="text-lg text-gray-500">
            When using this site, you agree not to: scrape, harvest, or copy the
            directory or its listings by automated means; impersonate another
            person or business; submit spam or advertising through the review or
            submission forms; attempt to gain unauthorized access to any part of
            the site or its systems; interfere with or disrupt the site; or use
            the site for any unlawful purpose.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            7. Intellectual Property
          </h2>
          <p className="text-lg text-gray-500">
            The site&apos;s design, layout, original text, and name are the
            property of Mariposa Local Services and are protected by applicable
            law. Content submitted by users and businesses remains theirs,
            licensed to us as described above.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            8. Disclaimer of Warranties
          </h2>
          <p className="text-lg text-gray-500">
            THE SITE AND ALL CONTENT ON IT, INCLUDING LISTINGS AND REVIEWS, ARE
            PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE,&rdquo; WITHOUT
            WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. TO THE FULLEST EXTENT
            PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING ANY IMPLIED
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
            TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE
            UNINTERRUPTED, SECURE, OR ERROR-FREE, OR THAT ANY LISTING, RATING,
            OR REVIEW IS ACCURATE, COMPLETE, OR RELIABLE.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            9. Limitation of Liability
          </h2>
          <p className="text-lg text-gray-500">
            TO THE FULLEST EXTENT PERMITTED BY LAW, MARIPOSA LOCAL SERVICES AND
            ITS OWNER AND OPERATORS WILL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES,
            OR FOR ANY LOSS OF PROFITS, BUSINESS, GOODWILL, REPUTATION, OR DATA,
            ARISING OUT OF OR RELATING TO:
          </p>
          <ul className="text-lg text-gray-500 mt-3 space-y-2 list-disc pl-6">
            <li>your use of, or inability to use, the site;</li>
            <li>
              any review, rating, listing, or other content posted by a user or
              business, including content you believe to be false, defamatory,
              or harmful to a business&apos;s reputation;
            </li>
            <li>
              your reliance on any information found on the site, or any
              decision to hire or not hire a provider;
            </li>
            <li>
              any dealings, transaction, dispute, injury, property damage, or
              loss involving a provider listed here;
            </li>
            <li>
              any removal of, refusal to remove, edit to, or unavailability of
              any listing or review.
            </li>
          </ul>
          <p className="text-lg text-gray-500 mt-3">
            To the fullest extent permitted by law, our total liability for any
            claim relating to the site will not exceed one hundred dollars
            ($100.00) or the amount you paid us in the twelve months before the
            claim, whichever is greater. You release Mariposa Local Services and
            its owner and operators from all claims, demands, and damages
            arising out of any dispute between you and any other user, reviewer,
            visitor, or listed business. Some jurisdictions do not allow certain
            limitations of liability, so parts of this section may not apply to
            you.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            10. Indemnification
          </h2>
          <p className="text-lg text-gray-500">
            You agree to defend, indemnify, and hold harmless Mariposa Local
            Services and its owner and operators from any claim, demand, loss,
            liability, damage, cost, or expense (including reasonable
            attorneys&apos; fees) arising out of content you submit, your use of
            the site, your violation of these terms, or your violation of any
            law or the rights of any third party.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            11. Changes to These Terms
          </h2>
          <p className="text-lg text-gray-500">
            We may update these terms from time to time. The current version is
            always posted on this page with its effective date. If you continue
            using the site after we post an update, you accept the revised
            terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            12. Governing Law and Venue
          </h2>
          <p className="text-lg text-gray-500">
            These terms are governed by the laws of the State of California,
            without regard to its conflict-of-laws rules. Any dispute arising
            out of these terms or your use of the site will be brought
            exclusively in the state or federal courts located in or serving
            Mariposa County, California, and you consent to the personal
            jurisdiction of those courts. If any provision of these terms is
            found unenforceable, the rest remains in effect.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            13. Contact Us
          </h2>
          <p className="text-lg text-gray-500">
            Questions about these terms? Email us at{" "}
            <a
              href={`mailto:${LEGAL_CONTACT_EMAIL}?subject=Mariposa Local Services — Terms of Use`}
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
