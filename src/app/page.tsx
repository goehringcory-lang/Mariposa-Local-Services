import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CategoryIcon from "@/components/categories/CategoryIcon";
import AdSlot from "@/components/ads/AdSlot";

export default async function Home() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: {
        select: {
          providers: {
            where: { status: "APPROVED" },
          },
        },
      },
    },
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-16 md:py-24 px-4 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/mariposa-hero.jpg')" }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Content */}
        <div className="relative mx-auto max-w-4xl text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
          >
            Find Trusted Local Services
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-100 mb-6"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
          >
            Your local directory for Mariposa, California
            <br className="hidden md:block" /> and surrounding foothill
            communities
          </p>
          <p
            className="text-lg text-gray-200"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
          >
            Browse by category below to find the help you need
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-3xl font-bold text-gray-700 mb-8 text-center">
          Browse Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 flex flex-col items-center text-center min-h-[180px] justify-center border-2 border-transparent hover:border-primary"
            >
              <div className="text-primary group-hover:text-primary-dark transition-colors mb-3">
                <CategoryIcon icon={category.icon} className="w-14 h-14" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 group-hover:text-primary mb-1">
                {category.name}
              </h3>
              <p className="text-base text-gray-400">
                {category._count.providers}{" "}
                {category._count.providers === 1 ? "provider" : "providers"}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Sponsored Ads */}
      <AdSlot placement="banner" />
      <AdSlot placement="sidebar" />

      {/* CTA Section */}
      <section className="bg-white py-10 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">
            Are You a Local Service Provider?
          </h2>
          <p className="text-xl text-gray-500 mb-6">
            Get listed in the Mariposa Local Services directory and let
            customers find you easily.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white text-xl font-bold px-8 py-4 rounded-xl transition-colors min-h-[56px] shadow-lg"
          >
            List Your Business
          </Link>
        </div>
      </section>
    </div>
  );
}
