"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PendingProvider {
  id: string;
  name: string;
  email: string;
  status: string;
  link: string | null;
}

const SUBJECT = "Confirming the terms for your Mariposa Local Services listing";

/**
 * The outreach email. The negative-review policy is stated in the body itself,
 * not left behind a link — an agreement obtained by burying the one term a
 * business might object to is the kind that doesn't hold up.
 */
function buildEmailBody(name: string, link: string, siteUrl: string): string {
  return `Hi ${name},

Mariposa Local Services now has written terms for business listings, and I'm asking every business already in the directory to review and confirm them.

You can read them and confirm here — it takes about a minute:
${link}

The most important part, up front: the directory shows reviews written by residents, and those reviews can be negative. I do not remove a listing, or a review, because a business asks me to over a bad review. The point of the site is to give Mariposa residents an honest picture of local services. Your listing stays published for as long as you're in business.

The full documents:
Business Listing Terms: ${siteUrl}/business-terms
Terms of Use: ${siteUrl}/terms
Privacy Policy: ${siteUrl}/privacy

Listings are free. If you don't confirm, your listing stays published under these terms — but I'd appreciate having your confirmation on record.

Any questions, just reply to this email.

Cory
Mariposa Local Services`;
}

function gmailComposeUrl(to: string, body: string): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
    su: SUBJECT,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

function CopyButton({
  text,
  label,
  className,
}: {
  text: string;
  label: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={
        className ||
        "bg-white border-2 border-gray-200 hover:border-primary text-gray-600 font-bold px-4 py-2 rounded-lg text-base min-h-[48px]"
      }
    >
      {copied ? "Copied!" : label}
    </button>
  );
}

export default function TermsOutreach({
  pending,
  missingLinks,
  siteUrl,
}: {
  pending: PendingProvider[];
  missingLinks: number;
  siteUrl: string;
}) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleGenerate() {
    setGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/admin/terms/generate", { method: "POST" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate links");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setGenerating(false);
    }
  }

  if (pending.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-lg text-gray-600">
          Every listing has confirmed the terms. Nothing to send.
        </p>
      </div>
    );
  }

  const withLinks = pending.filter((p) => p.link);

  const csv = [
    "name,email,link",
    ...withLinks.map(
      (p) => `"${p.name.replace(/"/g, '""')}","${p.email}","${p.link}"`
    ),
  ].join("\n");

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-3">
          Not yet confirmed ({pending.length})
        </h2>
        <p className="text-lg text-gray-500 mb-4">
          Each business gets its own private link. Send them one at a time with
          the Gmail button, or copy the whole list as a spreadsheet for a mail
          merge. Nobody is unlisted for not responding — the email says the
          listing stays published under the terms either way.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-danger px-4 py-3 rounded-lg text-lg mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {missingLinks > 0 && (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating}
              className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-xl text-lg min-h-[48px] disabled:opacity-50"
            >
              {generating
                ? "Generating..."
                : `Generate ${missingLinks} missing link${missingLinks === 1 ? "" : "s"}`}
            </button>
          )}
          {withLinks.length > 0 && (
            <CopyButton
              text={csv}
              label="Copy all as spreadsheet (CSV)"
              className="bg-white border-2 border-gray-200 hover:border-primary text-gray-600 font-bold px-6 py-3 rounded-xl text-lg min-h-[48px]"
            />
          )}
        </div>

        {missingLinks > 0 && (
          <p className="text-base text-gray-400 mt-3">
            {missingLinks} listing{missingLinks === 1 ? " has" : "s have"} no
            link yet. Generate them before sending.
          </p>
        )}
      </div>

      <div className="space-y-3">
        {pending.map((p) => {
          const body = p.link ? buildEmailBody(p.name, p.link, siteUrl) : "";

          return (
            <div key={p.id} className="bg-white rounded-xl shadow p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="text-lg font-bold text-gray-600">{p.name}</p>
                    <span className="px-2 py-1 rounded text-sm font-bold bg-gray-100 text-gray-800">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-base text-gray-400 mt-1 break-all">
                    {p.email}
                  </p>
                  {p.link && (
                    <p className="text-sm text-gray-300 mt-1 break-all">
                      {p.link}
                    </p>
                  )}
                </div>

                {p.link ? (
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <a
                      href={gmailComposeUrl(p.email, body)}
                      target="_blank"
                      rel="noopener"
                      className="bg-primary hover:bg-primary-dark text-white font-bold px-4 py-2 rounded-lg text-base min-h-[48px] flex items-center"
                    >
                      Open in Gmail
                    </a>
                    <CopyButton text={body} label="Copy email" />
                    <CopyButton text={p.link} label="Copy link" />
                  </div>
                ) : (
                  <p className="text-base text-gray-400 shrink-0">
                    No link yet
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
