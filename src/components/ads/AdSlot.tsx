import Link from "next/link";
import {
  HOMEPAGE_BANNER_ADS,
  HOMEPAGE_SIDEBAR_ADS,
  CATEGORY_ADS,
  type Ad,
} from "@/config/ads";

interface AdSlotProps {
  placement: "sidebar" | "banner" | "category";
}

export default function AdSlot({ placement }: AdSlotProps) {
  const adsMap = {
    banner: HOMEPAGE_BANNER_ADS,
    sidebar: HOMEPAGE_SIDEBAR_ADS,
    category: CATEGORY_ADS,
  };

  const ads = adsMap[placement];

  // If no ads configured, show placeholder linking to /advertise
  if (ads.length === 0) {
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

function AdCard({ ad, variant }: { ad: Ad; variant: string }) {
  const content = (
    <div
      className={`bg-amber-50 border-2 border-amber-200 rounded-xl overflow-hidden transition-shadow hover:shadow-md ${
        variant === "banner" ? "flex flex-col md:flex-row items-center" : ""
      }`}
    >
      {ad.imageUrl && (
        <div
          className={`relative ${
            variant === "banner"
              ? "w-full md:w-48 h-32 md:h-full"
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
