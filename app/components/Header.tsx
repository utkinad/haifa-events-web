"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Афиша",            href: "/" },
  { label: "Создать событие",  href: "#coming-soon" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          {/* Bouncing dots */}
          <span className="flex items-end gap-1.5">
            {["#99CCFF","#FFC200","#31CDCF","#FF6B6B","#4CAF82"].map((color, i) => (
              <span
                key={i}
                className="inline-block rounded-full"
                style={{
                  backgroundColor: color,
                  width: 14,
                  height: 14,
                  animation: `bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </span>
          {/* Text */}
          <span className="font-extrabold text-lg tracking-tight text-[#1A1A2E] leading-none">
            haifa<span style={{ color: "#31CDCF" }}>.</span>events
          </span>
        </Link>

        {/* Right side — all together */}
        <div className="flex items-center gap-5">

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-500 hover:text-[#1A1A2E] transition-colors font-medium whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:info@haifa.events?subject=Сотрудничество"
              className="text-sm text-gray-500 hover:text-[#1A1A2E] transition-colors font-medium whitespace-nowrap"
            >
              Сотрудничество
            </a>
          </nav>

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-gray-200" />

          {/* Language switcher */}
          <div className="hidden sm:flex items-center gap-1 text-xs font-medium">
            <button className="px-2 py-1 rounded-md text-[#1A1A2E] font-semibold">HE</button>
            <button className="px-2 py-1 rounded-md text-gray-400 hover:text-gray-700">RU</button>
            <button className="px-2 py-1 rounded-md text-gray-400 hover:text-gray-700">EN</button>
          </div>

          {/* Sign in — primary action */}
          <a
            href="#coming-soon"
            className="hidden sm:inline-flex items-center text-sm font-medium px-4 py-1.5 rounded-full bg-[#1A1A2E] text-white hover:bg-[#2d2d4e] transition-all whitespace-nowrap"
          >
            Войти
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="w-5 h-0.5 bg-gray-700 mb-1" />
            <div className="w-5 h-0.5 bg-gray-700 mb-1" />
            <div className="w-5 h-0.5 bg-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-700 font-medium py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#coming-soon"
            className="text-sm font-semibold text-[#1A1A2E] py-1"
            onClick={() => setMenuOpen(false)}
          >
            Войти
          </a>
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            <button className="px-3 py-1 rounded-md text-[#1A1A2E] font-semibold text-xs">HE</button>
            <button className="px-3 py-1 rounded-md text-gray-400 text-xs">RU</button>
            <button className="px-3 py-1 rounded-md text-gray-400 text-xs">EN</button>
          </div>
        </div>
      )}
    </header>
  );
}
