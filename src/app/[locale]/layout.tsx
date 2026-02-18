import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { I18nProvider } from "@/i18n/context";
import "../globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AutomaTech — Digital Transformation & Software Development",
    template: "%s | AutomaTech",
  },
  description:
    "AutomaTech designs intelligent digital solutions that transform your business processes — from custom software to AI-powered automation.",
  keywords: ["software development", "automation", "cloud", "data analytics", "IT consulting", "Montreal"],
  openGraph: { type: "website", locale: "en_CA", siteName: "AutomaTech" },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "fr")) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${geist.variable} antialiased`}>
        <I18nProvider locale={locale} messages={messages}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
