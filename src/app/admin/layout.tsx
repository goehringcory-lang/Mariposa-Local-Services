import Link from "next/link";
import SignOutButton from "@/components/auth/SignOutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gray-700 text-white px-4 py-3">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-xl font-bold min-h-[48px] flex items-center">
              Admin Dashboard
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/admin/providers"
                className="hover:text-accent transition-colors min-h-[48px] flex items-center text-base"
              >
                Providers
              </Link>
              <Link
                href="/admin/categories"
                className="hover:text-accent transition-colors min-h-[48px] flex items-center text-base"
              >
                Categories
              </Link>
              <Link
                href="/admin/reviews"
                className="hover:text-accent transition-colors min-h-[48px] flex items-center text-base"
              >
                Reviews
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-gray-300 hover:text-white text-base min-h-[48px] flex items-center"
            >
              View Site
            </Link>
            <SignOutButton />
          </div>
        </div>
      </nav>
      <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
    </div>
  );
}
