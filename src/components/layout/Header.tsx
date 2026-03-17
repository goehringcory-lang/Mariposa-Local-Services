import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 min-h-[48px]">
            <div className="text-3xl font-bold leading-tight">
              Mariposa Local Services
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-lg font-medium hover:text-accent transition-colors min-h-[48px] flex items-center"
            >
              Home
            </Link>
            <Link
              href="/submit"
              className="text-lg font-medium hover:text-accent transition-colors min-h-[48px] flex items-center"
            >
              List Your Business
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium hover:text-accent transition-colors min-h-[48px] flex items-center"
            >
              About
            </Link>
          </nav>
          {/* Mobile menu button */}
          <MobileMenuButton />
        </div>
      </div>
    </header>
  );
}

function MobileMenuButton() {
  return (
    <div className="md:hidden">
      <details className="relative">
        <summary className="list-none cursor-pointer min-h-[48px] min-w-[48px] flex items-center justify-center">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </summary>
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl py-2 w-64 z-50">
          <Link
            href="/"
            className="block px-6 py-3 text-lg text-gray-700 hover:bg-gray-100"
          >
            Home
          </Link>
          <Link
            href="/submit"
            className="block px-6 py-3 text-lg text-gray-700 hover:bg-gray-100"
          >
            List Your Business
          </Link>
          <Link
            href="/about"
            className="block px-6 py-3 text-lg text-gray-700 hover:bg-gray-100"
          >
            About
          </Link>
        </div>
      </details>
    </div>
  );
}
