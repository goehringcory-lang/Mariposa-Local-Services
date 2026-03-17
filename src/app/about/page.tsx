import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-6">
        About Mariposa Local Services
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            Why This Directory Exists
          </h2>
          <p className="text-lg text-gray-500">
            Here in Mariposa and the surrounding foothill communities, people are
            always looking for reliable local workers — electricians, handymen,
            cleaners, landscapers, mechanics, and more. But there&apos;s no easy,
            central place to find them.
          </p>
          <p className="text-lg text-gray-500 mt-3">
            Big websites like Angie&apos;s List don&apos;t serve our rural community
            well. Many folks here don&apos;t use those platforms, and they can be
            confusing to navigate. We built this directory to be the{" "}
            <strong>simplest possible way</strong> to find local help — like the
            phone book used to be, but online.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            How It Works
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <span className="bg-primary text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                1
              </span>
              <p className="text-lg text-gray-500">
                <strong>Browse by category</strong> to find the type of service
                you need.
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="bg-primary text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                2
              </span>
              <p className="text-lg text-gray-500">
                <strong>Find a provider</strong> — see their description,
                ratings, and reviews from other locals.
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="bg-primary text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                3
              </span>
              <p className="text-lg text-gray-500">
                <strong>Tap the green phone button</strong> to call them
                directly. That&apos;s it!
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-3">
            For Service Providers
          </h2>
          <p className="text-lg text-gray-500">
            If you provide services in the Mariposa area, you can get listed in
            this directory. Your listing
            includes your name, phone number, description of services, and a
            review section where customers can rate their experience.
          </p>
          <div className="mt-4">
            <Link
              href="/submit"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white text-lg font-bold px-6 py-3 rounded-xl transition-colors min-h-[48px]"
            >
              List Your Business
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
