"use client";

import { useTranslations, useLocale } from "@/i18n/context";
import Link from "next/link";
import Logo from "./Logo";
import Image from "next/image";
import { useEffect, useState } from "react";

type Client = {
  name: string;
  logo: string;
};

type Partner = {
  name: string;
  logo: string;
};

type ClientsPartnersData = {
  clients: Client[];
  partners: Partner[];
};

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const [data, setData] = useState<ClientsPartnersData>({ clients: [], partners: [] });

  useEffect(() => {
    fetch('/data/clients-partners.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Error loading clients/partners:', err));
  }, []);

  const companyLinks = [
    { label: t("company.0"), href: `/${locale}#about` },
    { label: t("company.2"), href: `/${locale}#partners` },
    { label: t("company.3"), href: `/${locale}#contact` },
  ];
  const serviceLinks = [
    { label: t("services.0"), href: `/${locale}#services` },
    { label: t("services.1"), href: `/${locale}#services` },
    { label: t("services.2"), href: `/${locale}#services` },
    { label: t("services.3"), href: `/${locale}/products` },
  ];
  const legalLinks = [0, 1, 2, 3].map((i) => t(`legal.${i}`));

  return (
    <footer>
      {/* Clients & Partners Section */}
      <div style={{ background: "#F4F6FB" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">

          {/* Ils nous font confiance */}
          <div id="clients" className="mb-16 pb-16 scroll-mt-24" style={{ borderBottom: "1px solid #E2E6EF" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px" style={{ background: "#E8763A" }} />
              <span
                className="text-xs font-bold uppercase tracking-[0.18em]"
                style={{ color: "#E8763A" }}
              >
                {t("clients.title")}
              </span>
            </div>
            <p className="text-sm mb-8 max-w-md" style={{ color: "#6B7280" }}>
              {t("clients.subtitle")}
            </p>

            {data.clients.length > 0 ? (
              <div className={`grid gap-3 ${
                data.clients.length === 1 ? "grid-cols-1 max-w-[200px]" :
                data.clients.length === 2 ? "grid-cols-2 max-w-sm" :
                "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
              }`}>
                {data.clients.map((client, i) => (
                  <div
                    key={i}
                    className="group bg-white flex items-center justify-center p-5 transition-all duration-300 hover:shadow-md"
                    style={{ border: "1px solid #E2E6EF" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "#2A5298")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "#E2E6EF")}
                  >
                    <div className="relative w-full h-10">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        sizes="180px"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-16 w-32 animate-pulse"
                    style={{ background: "#E2E6EF" }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Nos Partenaires */}
          <div id="partners" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px" style={{ background: "#E8763A" }} />
              <span
                className="text-xs font-bold uppercase tracking-[0.18em]"
                style={{ color: "#E8763A" }}
              >
                {t("partners.title")}
              </span>
            </div>
            <p className="text-sm mb-8 max-w-md" style={{ color: "#6B7280" }}>
              {t("partners.subtitle")}
            </p>

            {data.partners.length > 0 ? (
              <div className={`grid gap-3 ${
                data.partners.length === 1 ? "grid-cols-1 max-w-[200px]" :
                data.partners.length === 2 ? "grid-cols-2 max-w-sm" :
                "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
              }`}>
                {data.partners.map((partner, i) => (
                  <div
                    key={i}
                    className="group bg-white flex items-center justify-center p-5 transition-all duration-300 hover:shadow-md"
                    style={{ border: "1px solid #E2E6EF" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "#E8763A")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "#E2E6EF")}
                  >
                    <div className="relative w-full h-10">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        sizes="180px"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-16 w-32 animate-pulse"
                    style={{ background: "#E2E6EF" }}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#0F2540] px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
            <div>
              <Link href={`/${locale}`} className="flex items-center">
                <Logo variant="white" height={35} />
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-blue-100/65">
                {t("tagline")}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { title: t("links.company"), links: companyLinks },
                { title: t("links.services"), links: serviceLinks },
              ].map((group) => (
                <div key={group.title}>
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white">
                    {group.title}
                  </h3>
                  <ul className="space-y-3">
                    {group.links.map((link, i) => (
                      <li key={i}>
                        <Link
                          href={link.href}
                          className="text-sm text-blue-100/55 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white">
                  {t("links.legal")}
                </h3>
                <ul className="space-y-3">
                  {legalLinks.map((link, i) => (
                    <li key={i}>
                      <span className="text-sm text-blue-100/35">
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-blue-100/45">
              © {new Date().getFullYear()} Automa Tech. {t("rights")}
            </p>

            <div className="flex gap-2">
              {["en", "fr"].map((lang) => (
                <Link
                  key={lang}
                  href={`/${lang}`}
                  className={`px-4 py-2 text-xs font-semibold transition-all ${
                    locale === lang
                      ? "bg-[#2A5298] text-white"
                      : "border border-white/15 text-blue-100/55 hover:text-white"
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
