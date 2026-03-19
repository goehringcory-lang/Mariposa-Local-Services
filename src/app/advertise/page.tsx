import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertise With Us | Mariposa Local Services",
  description:
    "Reach your neighbors by advertising on Mariposa Local Services — the local directory for Mariposa, California.",
};

export default function AdvertisePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-4xl font-bold text-primary mb-6">
        Advertise With Us
      </h1>

      <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
        <p className="text-xl text-gray-700 leading-relaxed">
          Want to get your business in front of Mariposa locals? We offer
          affordable ad placements right here on the directory that your
          neighbors use to find services.
        </p>

        <div className="border-l-4 border-accent pl-6 py-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Available Ad Placements
          </h2>
          <ul className="space-y-4 text-lg text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold text-2xl leading-none mt-1">
                &#9654;
              </span>
              <div>
                <span className="font-bold">Homepage Banner</span> — Front and
                center on the main page, seen by every visitor.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold text-2xl leading-none mt-1">
                &#9654;
              </span>
              <div>
                <span className="font-bold">Homepage Sidebar</span> — Displayed
                alongside service categories on the main page.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold text-2xl leading-none mt-1">
                &#9654;
              </span>
              <div>
                <span className="font-bold">Category Pages</span> — Shown when
                people browse specific service categories.
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Interested?
          </h2>
          <p className="text-xl text-gray-700 mb-4">
            Send us an email and we&apos;ll get back to you with rates and
            availability. We keep it simple — no complicated contracts.
          </p>
          <a
            href="mailto:goehring.cory@gmail.com?subject=Advertising on Mariposa Local Services"
            className="inline-flex items-center gap-3 bg-primary text-white text-xl font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity min-h-[48px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            Email Us to Get Started
          </a>
        </div>
      </div>
    </main>
  );
}
