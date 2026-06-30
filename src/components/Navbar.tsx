"use client";

import { useState, useEffect, useRef, useMemo } from "react";
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
  const [activeLink, setActiveLink] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const navLinks = useMemo(() => [
    { href: "#hero",     label: t("home") },
    { href: "#services", label: t("services") },
    { href: "#products", label: t("products") },
    { href: "#about",    label: t("about") },
    { href: "#contact",  label: t("contact") },
  ], [t]);

  // Single merged scroll handler — passive + RAF throttle
  useEffect(() => {
    const ids = navLinks.map(l => l.href.slice(1));
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setScrolled(scrollY > 20);

        if (scrollY < 100) {
          setActiveLink(0);
        } else {
          const offset = scrollY + 100;
          for (let i = ids.length - 1; i >= 0; i--) {
            const el = document.getElementById(ids[i]);
            if (el && el.offsetTop <= offset) {
              setActiveLink(i);
              break;
            }
          }
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [navLinks]);

  // Update indicator position when active link changes
  useEffect(() => {
    const el = navRefs.current[activeLink];
    if (!el) return;
    const update = () => setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
    update();
    const timer = setTimeout(update, 100);
    return () => clearTimeout(timer);
  }, [activeLink, scrolled]);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16 lg:h-20">

          {/* Logo — gauche */}
          <Link href={`/${locale}`} className="flex items-center transition-all duration-300 relative z-10">
            <Logo variant={scrolled ? "color" : "white"} height={scrolled ? 38 : 42} />
          </Link>

          {/* Desktop Nav — centré en absolu */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-8 relative">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  ref={(el) => { navRefs.current[index] = el; }}
                  href={link.href}
                  onClick={() => setActiveLink(index)}
                  className={`text-sm font-medium transition-colors hover:text-[#2A5298] py-2 ${
                    scrolled ? "text-gray-700" : "text-white/90"
                  } ${activeLink === index ? (scrolled ? "text-[#2A5298]" : "text-white font-semibold") : ""}`}
                >
                  {link.label}
                </a>
              ))}
              {indicatorStyle.width > 0 && (
                <span
                  className="absolute bottom-0 h-0.5 bg-[#2A5298] transition-all duration-300 ease-out"
                  style={{
                    left: `${indicatorStyle.left}px`,
                    width: `${indicatorStyle.width}px`,
                  }}
                />
              )}
            </div>
          </div>

          {/* Droite : lang switcher (desktop) + mobile controls */}
          <div className="ml-auto flex items-center gap-3 relative z-10">
            {/* Desktop lang */}
            <div className={`hidden lg:flex items-center gap-1 rounded-sm p-1 text-xs font-semibold ${scrolled ? "bg-gray-100" : "bg-white/10"}`}>
              {["en", "fr"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => switchLocale(lang)}
                  className={`px-2.5 py-1 rounded-sm uppercase transition-all ${
                    locale === lang
                      ? "bg-[#1B3D6F] text-white shadow-sm"
                      : scrolled ? "text-gray-500 hover:text-gray-900" : "text-white/70 hover:text-white"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Mobile lang + burger */}
            <div className="flex lg:hidden items-center gap-3">
              <div className={`flex items-center gap-1 rounded-sm p-1 text-xs font-semibold ${scrolled ? "bg-gray-100" : "bg-white/10"}`}>
                {["en", "fr"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => switchLocale(lang)}
                    className={`px-2 py-0.5 rounded-sm uppercase transition-all ${
                      locale === lang ? "bg-[#1B3D6F] text-white" : scrolled ? "text-gray-500" : "text-white/70"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`p-2 transition-colors ${scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
              >
                <div className="w-5 flex flex-col gap-1.5">
                  <span className={`block h-0.5 rounded-full transition-all ${scrolled ? "bg-gray-700" : "bg-white"} ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                  <span className={`block h-0.5 rounded-full transition-all ${scrolled ? "bg-gray-700" : "bg-white"} ${mobileOpen ? "opacity-0" : ""}`} />
                  <span className={`block h-0.5 rounded-full transition-all ${scrolled ? "bg-gray-700" : "bg-white"} ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-2 shadow-xl">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveLink(index);
                  setMobileOpen(false);
                }}
                className={`block px-4 py-3 text-gray-700 hover:text-[#2A5298] hover:bg-blue-50 font-medium transition-colors relative ${
                  activeLink === index ? "text-[#2A5298] bg-blue-50" : ""
                }`}
              >
                {link.label}
                {activeLink === index && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#2A5298] rounded-r-full" />
                )}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
