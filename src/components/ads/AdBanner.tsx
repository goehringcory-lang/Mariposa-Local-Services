import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface AdBannerProps {
  placement: "sidebar" | "banner" | "category";
  limit?: number;
}

export default async function AdBanner({
  placement,
  limit = 3,
}: AdBannerProps) {
  const now = new Date();
  const ads = await prisma.ad.findMany({
    where: {
      active: true,
      placement,
      startDate: { lte: now },
      OR: [{ endDate: null }, { endDate: { gte: now } }],
    },
    orderBy: { sortOrder: "asc" },
    take: limit,
  });

  if (ads.length === 0) return null;

  if (placement === "banner") {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="space-y-4">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} variant="banner" />
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
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} variant="sidebar" />
          ))}
        </div>
      </div>
    );
  }

  // category placement - inline between listings
  return (
    <div className="space-y-4">
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={ad} variant="category" />
      ))}
    </div>
  );
}

interface Ad {
  id: string;
  title: string;
  businessName: string;
  imageUrl: string | null;
  linkUrl: string | null;
  description: string | null;
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
      <Link
        href={`/api/ads/${ad.id}/click`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </Link>
    );
  }

  return content;
}
