// =============================================================
// AD CONFIGURATION
// =============================================================
// To add an ad, uncomment or add an entry to the appropriate array.
// Each ad needs at minimum: businessName and title.
// Optional fields: description, imageUrl, linkUrl
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
}

/** Ads shown as a full-width banner between sections on the homepage */
export const HOMEPAGE_BANNER_ADS: Ad[] = [
  // Add banner ads here
];

/** Ads shown in the sidebar grid on the homepage */
export const HOMEPAGE_SIDEBAR_ADS: Ad[] = [
  // Add sidebar ads here
];

/** Ads shown on category listing pages */
export const CATEGORY_ADS: Ad[] = [
  // Add category page ads here
];
