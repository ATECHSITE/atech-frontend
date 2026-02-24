"use client";

import { useTranslations } from "@/i18n/context";

type ProductItem = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
};

export default function Products() {
  const t = useTranslations("products");

  const items: ProductItem[] = [0, 1, 2, 3].map((i) => ({
    name: t(`items.${i}.name`),
    tagline: t(`items.${i}.tagline`),
    description: t(`items.${i}.description`),
    features: [0, 1, 2, 3].map((j) => t(`items.${i}.features.${j}`)),
  }));

  return (
    <section id="products" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-[#E8763A]" style={{ background: "rgba(232, 118, 58, 0.1)" }}>
            {t("badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F2540] mb-4">{t("title")}</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <div key={i} className="group relative rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-2xl transition-all duration-300">
              {/* Header with gradient */}
              <div className="relative p-8 pb-6" style={{ background: "linear-gradient(135deg, #0F2540 0%, #1B3D6F 100%)" }}>
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3" style={{ background: "rgba(232,118,58,0.2)", color: "#FFA366" }}>
                    {item.name}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.tagline}</h3>
                  <p className="text-sm text-blue-200/80 leading-relaxed">{item.description}</p>
                </div>
              </div>

              {/* Features list */}
              <div className="p-8 pt-6 bg-white">
                <div className="space-y-3">
                  {item.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(232,118,58,0.15)" }}>
                        <svg className="w-3 h-3 text-[#E8763A]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Call to action */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="text-sm font-semibold text-[#E8763A] flex items-center gap-2 hover:gap-3 transition-all">
                    En savoir plus
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
