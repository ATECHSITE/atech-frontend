"use client";

import { useTranslations, useLocale } from "@/i18n/context";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const companyLinks = [0, 1, 2, 3].map((i) => t(`company.${i}`));
  const serviceLinks = [0, 1, 2, 3].map((i) => t(`services.${i}`));
  const legalLinks   = [0, 1, 2].map((i) => t(`legal.${i}`));

  const socials = [
    { name: "linkedin", svg: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
    { name: "twitter", svg: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
    { name: "github", svg: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> },
  ];

  return (
    <footer style={{ background: "#0F2540" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center mb-5">
              <Logo variant="white" height={40} />
            </Link>
            <p className="text-sm text-blue-200/70 leading-relaxed max-w-xs mb-6 font-medium">{t("tagline")}</p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a key={s.name} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center text-blue-300/50 hover:text-[#E8763A] transition-colors border border-white/5 hover:border-orange-400/30" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <span className="w-4 h-4">{s.svg}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">{t("links.company")}</h4>
            <ul className="space-y-2.5">{companyLinks.map((link, i) => <li key={i}><a href="#" className="text-sm text-blue-200/60 hover:text-[#E8763A] transition-colors">{link}</a></li>)}</ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">{t("links.services")}</h4>
            <ul className="space-y-2.5">{serviceLinks.map((link, i) => <li key={i}><a href="#services" className="text-sm text-blue-200/60 hover:text-[#E8763A] transition-colors">{link}</a></li>)}</ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">{t("links.legal")}</h4>
            <ul className="space-y-2.5">{legalLinks.map((link, i) => <li key={i}><a href="#" className="text-sm text-blue-200/60 hover:text-[#E8763A] transition-colors">{link}</a></li>)}</ul>
            <div className="mt-8">
              <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Language</h4>
              <div className="flex gap-2">
                {["en", "fr"].map((lang) => (
                  <Link key={lang} href={`/${lang}`} className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${locale === lang ? "bg-[#E8763A] text-white" : "text-blue-200/50 hover:text-white border border-white/10"}`}>
                    {lang.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-blue-200/40">© {new Date().getFullYear()} ATECH Solutions. {t("rights")}</p>
          <div className="flex items-center gap-2 text-xs text-blue-200/30">
            <span>Made in</span>
            <span className="text-[#E8763A] font-semibold">Ouagadougou, Burkina Faso</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
