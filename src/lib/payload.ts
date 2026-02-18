/**
 * Payload CMS Integration Helpers
 * Set NEXT_PUBLIC_PAYLOAD_URL in .env.local to activate.
 * Example: NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
 */

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL ?? "";

export type Locale = "en" | "fr";

export interface PayloadMedia {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  mimeType: string;
}

export interface HeroContent {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaLabel: string;
  ctaSecondaryLabel: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface AboutContent {
  badge: string;
  title: string;
  description1: string;
  description2: string;
  highlights: string[];
  image?: PayloadMedia;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  order: number;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export interface SiteMeta {
  title: string;
  description: string;
  logo?: PayloadMedia;
}

interface PayloadListResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
}

async function fetchPayload<T>(path: string, locale: Locale = "en"): Promise<T | null> {
  if (!PAYLOAD_URL) return null;
  try {
    const res = await fetch(`${PAYLOAD_URL}/api/${path}?locale=${locale}&depth=2`, {
      next: { revalidate: 60 },
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

export async function getServices(locale: Locale = "en"): Promise<ServiceItem[]> {
  const data = await fetchPayload<PayloadListResponse<ServiceItem>>("services?sort=order", locale);
  return data?.docs ?? [];
}

export async function getHeroContent(locale: Locale = "en"): Promise<HeroContent | null> {
  return fetchPayload<HeroContent>("globals/hero", locale);
}

export async function getAboutContent(locale: Locale = "en"): Promise<AboutContent | null> {
  return fetchPayload<AboutContent>("globals/about", locale);
}

export async function getStats(locale: Locale = "en"): Promise<StatItem[]> {
  const data = await fetchPayload<PayloadListResponse<StatItem>>("stats?sort=order", locale);
  return data?.docs ?? [];
}

export async function getContactInfo(locale: Locale = "en"): Promise<ContactInfo | null> {
  return fetchPayload<ContactInfo>("globals/contact", locale);
}

export async function getSiteMeta(locale: Locale = "en"): Promise<SiteMeta | null> {
  return fetchPayload<SiteMeta>("globals/site-meta", locale);
}
