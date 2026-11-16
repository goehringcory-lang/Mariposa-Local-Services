/// Maximum lengths for user-submitted text. Shared by the API routes (which
/// enforce them) and the public forms (which use them as `maxLength` so people
/// hit the limit while typing instead of after submitting).
export const LIMITS = {
  providerName: 120,
  providerEmail: 254,
  providerPhone: 30,
  providerDescription: 2000,
  areaServed: 200,
  reviewAuthorName: 80,
  reviewComment: 2000,
} as const;

/**
 * True when a phone number has a dialable US shape: 10 digits, or 11 with a
 * leading 1. The call button dials only the digits, so anything else (an
 * extension, a missing area code) would ring the wrong number.
 */
export function isValidUsPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 || (digits.length === 11 && digits[0] === "1");
}
