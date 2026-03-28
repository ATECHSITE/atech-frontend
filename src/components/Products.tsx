"use client";

import { useTranslations } from "@/i18n/context";
import Image from "next/image";

type ProductItem = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
};

// Images appropriées pour chaque produit depuis Unsplash
const productImages = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop", // E-governance dashboard
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop", // Analytics/Data visualization
  "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=800&auto=format&fit=crop", // GPS/Logistics tracking
  "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&auto=format&fit=crop", // Mobile app inspection
];

export default function Products() {
  const t = useTranslations("products");

  const items: ProductItem[] = [0, 1, 2, 3].map((i) => ({
    name: t(`items.${i}.name`),
    tagline: t(`items.${i}.tagline`),
    description: t(`items.${i}.description`),
    features: [0, 1, 2, 3].map((j) => t(`items.${i}.features.${j}`)),
  }));

  return (
    <section id="products" className="py-16 lg:py-20 bg-white">
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
            <div key={i} className="group relative rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={productImages[i]}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2540] via-[#0F2540]/50 to-transparent opacity-80" />
                <div className="absolute bottom-4 left-6 right-6 z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2" style={{ background: "rgba(232,118,58,0.9)", color: "white" }}>
                    {item.name}
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.tagline}</h3>
                </div>
              </div>

              {/* Description */}
              <div className="p-6 bg-gradient-to-br from-[#0F2540] to-[#1B3D6F]">
                <p className="text-sm text-blue-200/90 leading-relaxed">{item.description}</p>
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
