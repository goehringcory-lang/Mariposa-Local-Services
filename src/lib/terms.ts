import { randomBytes } from "crypto";

/// Server-only helpers for the terms-acceptance backfill. Kept out of
/// `legal.ts` because that module is plain constants safe to import anywhere,
/// while this one pulls in node:crypto.

/**
 * Unguessable token for a one-click acceptance link. base64url so it survives a
 * URL without escaping, 32 bytes so it can't be brute-forced or enumerated —
 * the token is the only thing standing between a stranger and recording an
 * agreement in a business's name.
 */
export function generateTermsToken(): string {
  return randomBytes(32).toString("base64url");
}

/**
 * Absolute origin for links that leave the site (emails, copied acceptance
 * URLs). Vercel doesn't set a single canonical URL variable for production, so
 * prefer whatever the operator configured and fall back to the deployment URL.
 */
export function getSiteUrl(): string {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL;
  if (configured) return configured.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export function acceptTermsUrl(token: string): string {
  return `${getSiteUrl()}/accept-terms/${token}`;
}
