"use client";

import { useTranslations } from "@/i18n/context";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Link from "next/link";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

type ProductItem = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
};

// Images appropriées pour chaque produit
const productImages = [
  "/images/cyberpunk-location-tracking-mobile-device.jpg", // CONNECT - Digital Communication
  "/images/male-engineer-analyzed-industry-40-system-smart-manufacturing-plant.jpg", // DETECT - Risk Management
  "/images/tradeval.avif", // TRADEVAL
  "/images/programmer-home-office-concentrating-finding-bugs-while-he-codes.jpg", // REPORTER - Mobile inspection
  "/images/analyse.jpg", // ANALYTICA - BI
  "/images/pesage.png", // Weighing in Motion
  "/images/Drive.png", // Driver License & Vehicle Registration
  "/images/trafik.jpg", // SAFEROAD - Traffic Management
];

export default function ProductsPage() {
  const t = useTranslations("products");
  const { ref, isVisible } = useScrollAnimation();

  const items: ProductItem[] = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    name: t(`items.${i}.name`),
    tagline: t(`items.${i}.tagline`),
    description: t(`items.${i}.description`),
    features: [0, 1, 2, 3].map((j) => t(`items.${i}.features.${j}`)),
  }));

  return (
    <main className="min-h-screen bg-white">
      <ScrollProgress />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/solutions.jpg"
            alt="Nos Solutions"
            fill
            className="object-cover object-center"
            priority
            quality={100}
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F2540]/95 via-[#1B3D6F]/90 to-[#0F2540]/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 text-white" style={{ background: "rgba(255, 255, 255, 0.1)" }}>
            {t("badge")}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {t("title")}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>

          {/* Breadcrumb */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-blue-200">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">Nos Produits</span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className={`py-16 lg:py-24 transition-all duration-1000 transform-gpu ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ willChange: isVisible ? 'auto' : 'transform, opacity' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 opacity-0 animate-fade-in-up transform-gpu"
                style={{
                  animationDelay: `${i * 100}ms`,
                  animationFillMode: 'forwards',
                  willChange: 'transform, opacity, border-color, box-shadow'
                }}
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={productImages[i]}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ willChange: 'transform' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2540] via-[#0F2540]/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-4 left-5 right-5 z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 shadow-lg" style={{ background: "rgba(42,82,152,0.95)", color: "white" }}>
                      {item.name}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#2A5298] transition-colors">{item.tagline}</h3>
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 bg-gradient-to-br from-[#0F2540] to-[#1B3D6F]">
                  <p className="text-sm text-blue-100 leading-relaxed">{item.description}</p>
                </div>

                {/* Features list */}
                <div className="p-6 bg-white">
                  <div className="space-y-3">
                    {item.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3 group/feature">
                        <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all group-hover/feature:scale-110" style={{ background: "rgba(42,82,152,0.15)" }}>
                          <svg className="w-3 h-3 text-[#2A5298]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Call to action */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <button className="group/btn text-sm font-bold text-[#2A5298] flex items-center gap-2 hover:gap-4 transition-all">
                      En savoir plus
                      <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center bg-gradient-to-r from-[#0F2540] via-[#1B3D6F] to-[#0F2540] rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Intéressé par nos solutions ?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour découvrir comment nos produits peuvent transformer votre entreprise
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-[#1B3D6F] bg-white hover:bg-blue-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 transform-gpu"
              style={{ willChange: 'transform, box-shadow' }}
            >
              <span>Nous contacter</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
