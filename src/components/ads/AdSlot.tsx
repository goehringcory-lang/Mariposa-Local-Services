import Link from "next/link";
import {
  HOMEPAGE_BANNER_ADS,
  HOMEPAGE_SIDEBAR_ADS,
  CATEGORY_ADS,
  type Ad,
} from "@/config/ads";

interface AdSlotProps {
  placement: "sidebar" | "banner" | "category";
  // When there are no ads, render the "Your Business Here" CTA. Set to false to
  // render nothing so multiple empty slots on one page don't duplicate the CTA.
  showPlaceholderWhenEmpty?: boolean;
}

export default function AdSlot({
  placement,
  showPlaceholderWhenEmpty = true,
}: AdSlotProps) {
  const adsMap = {
    banner: HOMEPAGE_BANNER_ADS,
    sidebar: HOMEPAGE_SIDEBAR_ADS,
    category: CATEGORY_ADS,
  };

  const ads = adsMap[placement];

  // If no ads configured, show placeholder linking to /advertise
  if (ads.length === 0) {
    if (!showPlaceholderWhenEmpty) return null;
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Link href="/advertise" className="block">
          <div className="bg-amber-50 border-2 border-amber-200 border-dashed rounded-xl p-6 text-center hover:shadow-md transition-shadow">
            <p className="text-lg font-bold text-gray-600">
              Your Business Here
            </p>
            <p className="text-base text-gray-500 mt-1">
              Advertise with Mariposa Local Services — reach your neighbors!
            </p>
          </div>
        </Link>
      </div>
    );
  }

  if (placement === "banner") {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="space-y-4">
          {ads.map((ad, i) => (
            <AdCard key={i} ad={ad} variant="banner" />
          ))}
        </div>
      </div>
    );
  }

  if (placement === "sidebar") {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <p className="text-sm text-gray-400 uppercase tracking-wide font-bold mb-3">
          Local Sponsors
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ads.map((ad, i) => (
            <AdCard key={i} ad={ad} variant="sidebar" />
          ))}
        </div>
      </div>
    );
  }

  // category placement
  return (
    <div className="space-y-4">
      {ads.map((ad, i) => (
        <AdCard key={i} ad={ad} variant="category" />
      ))}
    </div>
  );
}

// Large dark card with a glow, hills, and a button. Used for `featured` ads.
// Its look lives in globals.css under ".ad-spotlight".
function SpotlightCard({ ad }: { ad: Ad }) {
  return (
    <div className="ad-spotlight">
      <div className="ad-spotlight__orb ad-spotlight__orb--a" aria-hidden="true" />
      <div className="ad-spotlight__orb ad-spotlight__orb--b" aria-hidden="true" />
      <svg
        className="ad-spotlight__ridge"
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <path
          fill="rgba(126,148,232,.16)"
          d="M0 320V210l70-34 60 22 80-70 50-18 46 30 70 54 90-40 84-78 40-8 38 26 60 92 96 30 110-64 70-40 56 8 60 60 90 36 100-56 74-24 96 50V320Z"
        />
        <path
          fill="rgba(22,44,62,.7)"
          d="M0 320V250l110-46 90 30 120-84 44-6 40 30 100 76 130 20 120-70 90-34 60 20 96 78 150 10 130-60 80-10 80 40V320Z"
        />
        <path
          fill="rgba(3,11,15,.8)"
          d="M0 320V286l160-40 150 28 170-56 130 44 190 20 180-52 150 30 170-34 140 30V320Z"
        />
      </svg>
      <div className="ad-spotlight__shine" aria-hidden="true" />

      <div className="ad-spotlight__inner">
        <div className="ad-spotlight__copy">
          <div className="ad-spotlight__brand">
            {ad.logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={ad.logoUrl} alt="" className="ad-spotlight__logo" />
            )}
            <span className="ad-spotlight__name">{ad.businessName}</span>
            <span className="ad-spotlight__tag">Sponsored</span>
          </div>
          <p className="ad-spotlight__title">
            {ad.title}{" "}
            {ad.titleAccent && (
              <span className="ad-spotlight__accent">{ad.titleAccent}</span>
            )}
          </p>
          {ad.description && (
            <p className="ad-spotlight__desc">{ad.description}</p>
          )}
          {ad.highlights && ad.highlights.length > 0 && (
            <ul className="ad-spotlight__pills">
              {ad.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
        </div>
        {ad.ctaLabel && (
          <span className="ad-spotlight__cta">
            {ad.ctaLabel} <span aria-hidden="true">&rarr;</span>
          </span>
        )}
      </div>
    </div>
  );
}

function AdCard({ ad, variant }: { ad: Ad; variant: string }) {
  const content = ad.featured ? (
    <SpotlightCard ad={ad} />
  ) : (
    <div
      className={`bg-amber-50 border-2 border-amber-200 rounded-xl overflow-hidden transition-shadow hover:shadow-md ${
        variant === "banner" ? "flex flex-col md:flex-row items-center" : ""
      }`}
    >
      {ad.imageUrl && (
        <div
          className={`relative ${
            variant === "banner"
              ? "w-full md:w-48 h-32 md:h-auto md:self-stretch"
              : "w-full h-40"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <p className="text-xs text-amber-600 font-bold uppercase tracking-wide mb-1">
          Sponsored
        </p>
        <p className="text-lg font-bold text-gray-700">{ad.businessName}</p>
        <p className="text-base font-medium text-gray-600">{ad.title}</p>
        {ad.description && variant !== "sidebar" && (
          <p className="text-base text-gray-500 mt-1">{ad.description}</p>
        )}
      </div>
    </div>
  );

  // Pages hosted on this site (e.g. /gatewayintel) open in the same tab. A
  // plain <a> (not next/link) because /gatewayintel is a static HTML page.
  if (ad.linkUrl?.startsWith("/")) {
    return (
      <a href={ad.linkUrl} className="block">
        {content}
      </a>
    );
  }

  if (ad.linkUrl) {
    return (
      <a
        href={ad.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}
