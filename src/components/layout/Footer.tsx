import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-8 mt-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">Mariposa Local Services</h3>
            <p className="text-gray-300 text-base">
              Your trusted directory for finding local service providers in
              Mariposa, California and surrounding foothill communities.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white text-base min-h-[48px] inline-flex items-center"
                >
                  Browse Services
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="text-gray-300 hover:text-white text-base min-h-[48px] inline-flex items-center"
                >
                  List Your Business
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white text-base min-h-[48px] inline-flex items-center"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Service Area</h3>
            <p className="text-gray-300 text-base">
              Mariposa, Midpines, El Portal, Coulterville, Catheys Valley,
              Hornitos, Bear Valley, and surrounding foothill areas.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-600 text-center text-gray-400 text-base">
          &copy; {new Date().getFullYear()} Mariposa Local Services. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
