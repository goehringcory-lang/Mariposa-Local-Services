// =============================================================
// AD CONFIGURATION
// =============================================================
// To add an ad, uncomment or add an entry to the appropriate array.
// Each ad needs at minimum: businessName and title.
// Optional fields: description, imageUrl, linkUrl
// A linkUrl starting with "/" stays on this site; anything else opens in a new tab.
//
// Example:
// {
//   businessName: "Mariposa Pizza Co.",
//   title: "Best Pizza in the Foothills!",
//   description: "Family-owned since 1985. Dine-in or takeout.",
//   imageUrl: "/ads/mariposa-pizza.jpg",
//   linkUrl: "https://mariposapizza.com",
// }
// =============================================================

export interface Ad {
  businessName: string;
  title: string;
  description?: string;
  imageUrl?: string;
  linkUrl?: string;
  /** Show as a large dark "spotlight" card with a glow and a button. */
  featured?: boolean;
  /** Spotlight only: second part of the headline, shown in bright blue. */
  titleAccent?: string;
  /** Spotlight only: small square logo shown next to the business name. */
  logoUrl?: string;
  /** Spotlight only: short selling points shown as pills. */
  highlights?: string[];
  /** Spotlight only: button text. */
  ctaLabel?: string;
}

/** Ads shown as a full-width banner between sections on the homepage */
export const HOMEPAGE_BANNER_ADS: Ad[] = [
  {
    businessName: "Gateway Intelligence",
    title: "Answer customers faster.",
    titleAccent: "Get hours back.",
    description:
      "AI help for local businesses. We build it into the work you already do: replies, quotes, schedules, and marketing.",
    logoUrl: "/gatewayintel/assets/favicon.svg",
    linkUrl: "/gatewayintel",
    featured: true,
    highlights: ["Set price", "Set plan", "Free 30-minute call"],
    ctaLabel: "See how it works",
  },
];

/** Ads shown in the sidebar grid on the homepage */
export const HOMEPAGE_SIDEBAR_ADS: Ad[] = [
  // Add sidebar ads here
];

/** Ads shown on category listing pages */
export const CATEGORY_ADS: Ad[] = [
  // Add category page ads here
];
