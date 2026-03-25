"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "@/i18n/context";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  const navLinks = [
    { href: "#hero", label: t("home") },
    { href: "#services", label: t("services") },
    { href: "#about", label: t("about") },
    { href: "#stats", label: t("stats") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href={`/${locale}`} className="flex items-center">
            <Logo variant={scrolled ? "color" : "white"} height={36} />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={`text-sm font-medium transition-colors hover:text-[#E8763A] ${scrolled ? "text-gray-700" : "text-white/90"}`}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <div className={`flex items-center gap-1 rounded-full p-1 text-xs font-semibold ${scrolled ? "bg-gray-100" : "bg-white/10"}`}>
              {["en", "fr"].map((lang) => (
                <button key={lang} onClick={() => switchLocale(lang)} className={`px-2.5 py-1 rounded-full uppercase transition-all ${locale === lang ? "bg-[#E8763A] text-white shadow-sm" : scrolled ? "text-gray-500 hover:text-gray-900" : "text-white/70 hover:text-white"}`}>
                  {lang}
                </button>
              ))}
            </div>
            <a href="#contact" className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #E8763A 0%, #F4A472 100%)" }}>
              {t("cta")}
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <div className={`flex items-center gap-1 rounded-full p-1 text-xs font-semibold ${scrolled ? "bg-gray-100" : "bg-white/10"}`}>
              {["en", "fr"].map((lang) => (
                <button key={lang} onClick={() => switchLocale(lang)} className={`px-2 py-0.5 rounded-full uppercase transition-all ${locale === lang ? "bg-[#E8763A] text-white" : scrolled ? "text-gray-500" : "text-white/70"}`}>
                  {lang}
                </button>
              ))}
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className={`p-2 rounded-lg transition-colors ${scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"}`}>
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-0.5 rounded-full transition-all ${scrolled ? "bg-gray-700" : "bg-white"} ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 rounded-full transition-all ${scrolled ? "bg-gray-700" : "bg-white"} ${mobileOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 rounded-full transition-all ${scrolled ? "bg-gray-700" : "bg-white"} ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-2 rounded-b-2xl shadow-xl">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-gray-700 hover:text-[#E8763A] hover:bg-orange-50 rounded-xl font-medium transition-colors">
                {link.label}
              </a>
            ))}
            <div className="mt-3 px-4">
              <a href="#contact" onClick={() => setMobileOpen(false)} className="block w-full text-center px-5 py-3 rounded-full text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #E8763A 0%, #F4A472 100%)" }}>
                {t("cta")}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
