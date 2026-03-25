"use client";

import { useState, useEffect, useRef } from "react";
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

  const navLinks = [
    { href: "#hero",     label: t("home") },
    { href: "#services", label: t("services") },
    { href: "#products", label: t("products") },
    { href: "#about",    label: t("about") },
    { href: "#stats",    label: t("stats") },
    { href: "#contact",  label: t("contact") },
  ];
  

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Update indicator position when active link changes
    const updateIndicator = () => {
      const activeElement = navRefs.current[activeLink];
      if (activeElement) {
        setIndicatorStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
        });
      }
    };

    // Small delay to ensure elements are rendered
    updateIndicator();
    setTimeout(updateIndicator, 100);
  }, [activeLink, scrolled]);

  useEffect(() => {
    // Detect which section is in view on scroll
    const handleScroll = () => {
      const sections = navLinks.map((link) => {
        const id = link.href.substring(1); // Remove '#'
        return document.getElementById(id);
      });

      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      // If we're at the very top, always select home (index 0)
      if (window.scrollY < 100) {
        setActiveLink(0);
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveLink(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

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
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center transition-all duration-300">
            <Logo variant={scrolled ? "color" : "white"} height={scrolled ? 38 : 42} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 relative">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                ref={(el) => {
                  navRefs.current[index] = el;
                }}
                href={link.href}
                onClick={() => setActiveLink(index)}
                className={`text-sm font-medium transition-colors hover:text-[#E8763A] py-2 relative ${
                  scrolled ? "text-gray-700" : "text-white/90"
                } ${activeLink === index ? "text-[#E8763A]" : ""}`}
              >
                {link.label}
              </a>
            ))}
            {/* Animated indicator line */}
            {indicatorStyle.width > 0 && (
              <span
                className="absolute bottom-0 h-0.5 bg-[#E8763A] transition-all duration-300 ease-out"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
              />
            )}
          </div>

          {/* Right: lang switcher */}
          <div className="hidden lg:flex items-center">
            <div className={`flex items-center gap-1 rounded-full p-1 text-xs font-semibold ${scrolled ? "bg-gray-100" : "bg-white/10"}`}>
              {["en", "fr"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => switchLocale(lang)}
                  className={`px-2.5 py-1 rounded-full uppercase transition-all ${
                    locale === lang
                      ? "bg-[#E8763A] text-white shadow-sm"
                      : scrolled ? "text-gray-500 hover:text-gray-900" : "text-white/70 hover:text-white"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-3">
            <div className={`flex items-center gap-1 rounded-full p-1 text-xs font-semibold ${scrolled ? "bg-gray-100" : "bg-white/10"}`}>
              {["en", "fr"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => switchLocale(lang)}
                  className={`px-2 py-0.5 rounded-full uppercase transition-all ${
                    locale === lang ? "bg-[#E8763A] text-white" : scrolled ? "text-gray-500" : "text-white/70"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-lg transition-colors ${scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-0.5 rounded-full transition-all ${scrolled ? "bg-gray-700" : "bg-white"} ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 rounded-full transition-all ${scrolled ? "bg-gray-700" : "bg-white"} ${mobileOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 rounded-full transition-all ${scrolled ? "bg-gray-700" : "bg-white"} ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-2 rounded-b-2xl shadow-xl">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveLink(index);
                  setMobileOpen(false);
                }}
                className={`block px-4 py-3 text-gray-700 hover:text-[#E8763A] hover:bg-orange-50 rounded-xl font-medium transition-colors relative ${
                  activeLink === index ? "text-[#E8763A] bg-orange-50" : ""
                }`}
              >
                {link.label}
                {activeLink === index && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#E8763A] rounded-r-full" />
                )}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
