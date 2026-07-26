import { createHash } from "crypto";
import type { NextRequest } from "next/server";

// Call tracking is unauthenticated by necessity — a homeowner tapping a phone
// number isn't going to log in first. That makes the endpoint writable by
// anyone, so it needs a notion of "who" a visitor is, without actually storing
// anyone's IP address.
//
// The stakes are higher than ordinary spam: these counts are the numbers we
// show providers when selling placement. A number anyone can inflate with a
// refresh loop is worse than no number at all.

const IP_SALT = process.env.IP_HASH_SALT || "mariposa-local-services";

/**
 * Best-effort stable identifier for a visitor, salted and hashed so the raw
 * address never reaches the database. Returns null when no address can be
 * determined (some proxies strip it) — callers should treat that as
 * "unidentified" and fall back to their strictest limit.
 */
export function hashVisitor(request: NextRequest): string | null {
  // x-forwarded-for is a comma-separated chain; the client is the first entry.
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    null;

  if (!ip) return null;

  return createHash("sha256").update(`${IP_SALT}:${ip}`).digest("hex");
}
