"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="text-gray-300 hover:text-white text-base min-h-[48px]"
    >
      Sign Out
    </button>
  );
}
