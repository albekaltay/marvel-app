"use client";
// next
import Link from "next/link";

// ----------------------------------------------------------------------

export default function Header() {
  return (
    <header className="sticky top-0 z-50 transition-all bg-slate-950  h-16 flex justify-between items-center px-4 md:px-20 w-full">
      <Link href={"/"}>
        <img src="/logo/marvel.svg" />
      </Link>
      <div className="border-x-2 border-white px-4">
        <span className="flex flex-row items-center space-x-2 text-white font-semibold">
          ALBEK ALTAY
        </span>
      </div>
    </header>
  );
}
