"use client";

import { useTranslations } from "@/i18n/context";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type ProductItem = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
};

// Images appropriées pour chaque produit
const productImages = [
  //"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop", // TRADEVAL - Analytics/Data visualization
  "/images/tradeval.avif",
  //"https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=800&auto=format&fit=crop", // SSEM - GPS/Logistics tracking
  "/images/ssem.avif",
  "/images/scanner_hcvg.jpg", // Scanners HCVG Smith Detection
  "/images/track.avif",
  //"https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&auto=format&fit=crop", // TRACK+ - GPS tracking device / Electronic beacon
];

export default function Products() {
  const t = useTranslations("products");
  const { ref, isVisible } = useScrollAnimation();

  const items: ProductItem[] = [0, 1, 2, 3].map((i) => ({
    name: t(`items.${i}.name`),
    tagline: t(`items.${i}.tagline`),
    description: t(`items.${i}.description`),
    features: [0, 1, 2, 3].map((j) => t(`items.${i}.features.${j}`)),
  }));

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="products"
      className={`py-16 lg:py-20 bg-white transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-[#E8763A] opacity-0" style={{ background: "rgba(232, 118, 58, 0.1)", animation: 'bounce-in 0.6s ease-out 0.1s forwards' }}>
            {t("badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F2540] mb-4">{t("title")}</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${i * 150}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={productImages[i]}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2540] via-[#0F2540]/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-4 left-5 right-5 z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 shadow-lg" style={{ background: "rgba(232,118,58,0.95)", color: "white" }}>
                    {item.name}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#E8763A] transition-colors">{item.tagline}</h3>
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
                      <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all group-hover/feature:scale-110" style={{ background: "rgba(232,118,58,0.15)" }}>
                        <svg className="w-3 h-3 text-[#E8763A]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Call to action */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="group/btn text-sm font-bold text-[#E8763A] flex items-center gap-2 hover:gap-4 transition-all">
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
      </div>
    </section>
  );
}
