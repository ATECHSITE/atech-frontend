"use client";

import { useTranslations, useLocale } from "@/i18n/context";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const legalLinks = [0, 1, 2, 3].map((i) => t(`legal.${i}`));

  const socials = [
    { name: "facebook", svg: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { name: "instagram", svg: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
    { name: "youtube", svg: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
    { name: "linkedin", svg: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
    { name: "twitter", svg: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
  ];

  return (
    <footer>
      {/* Newsletter & Social Section */}
      <div className="relative overflow-hidden">
        {/* Background Orange */}
        <div className="absolute inset-0 bg-[#E8763A]" />

        {/* Diagonal Blue Section */}
        <div className="absolute inset-0 hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="0,0 45,0 35,100 0,100" fill="#1B3D6F" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative flex flex-col md:flex-row">
          {/* Newsletter - Blue Section (40%) */}
          <div className="bg-[#1B3D6F] md:bg-transparent px-8 md:px-16 py-16 flex items-center justify-center md:w-[40%]">
            <div className="max-w-md w-full relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {t("newsletter.title")}
              </h3>
              <p className="text-blue-100/80 text-base mb-8">
                {t("newsletter.subtitle")}
              </p>
              <button className="bg-[#0F2540] px-8 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:bg-[#0a1a2e] hover:shadow-lg">
                {t("newsletter.button")}
              </button>
            </div>
          </div>

          {/* Social Media - Orange Section (60%) */}
          <div className="px-8 md:px-16 py-16 flex items-center justify-center md:w-[60%]">
            <div className="max-w-md w-full">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {t("social.title")}
              </h3>
              <p className="text-white/90 text-base mb-8">
                {t("social.subtitle")}
              </p>
              <div className="flex gap-4">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href="#"
                    className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-[#E8763A] transition-all"
                  >
                    <span className="w-5 h-5">{s.svg}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#0F2540] px-8 md:px-16 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-8">
              <Link href={`/${locale}`} className="flex items-center">
                <Logo variant="white" height={35} />
              </Link>
              <p className="text-blue-200/60 text-sm">
                © {new Date().getFullYear()} Automa Tech
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {legalLinks.map((link, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-blue-200/60 hover:text-white text-sm transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Language Selector */}
            <div className="flex gap-2">
              {["en", "fr"].map((lang) => (
                <Link
                  key={lang}
                  href={`/${lang}`}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    locale === lang
                      ? "bg-[#E8763A] text-white"
                      : "text-blue-200/50 hover:text-white border border-white/20"
                  }`}
                >
                  {lang.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
