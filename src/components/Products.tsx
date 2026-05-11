"use client";

import { useTranslations, useLocale } from "@/i18n/context";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import Link from "next/link";

type ProductItem = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
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

export default function Products() {
  const t = useTranslations("products");
  const locale = useLocale();
  const { ref, isVisible } = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const allItems: ProductItem[] = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    name: t(`items.${i}.name`),
    tagline: t(`items.${i}.tagline`),
    description: t(`items.${i}.description`),
    features: [0, 1, 2, 3].map((j) => t(`items.${i}.features.${j}`)),
    image: productImages[i],
  }));

  // Rotation automatique toutes les 5 secondes
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 4) % allItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, allItems.length]);

  // Bloquer le scroll du site quand la modale est ouverte
  useEffect(() => {
    if (selectedProduct !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  // 4 produits visibles à la fois
  const visibleItems = [
    allItems[currentIndex % allItems.length],
    allItems[(currentIndex + 1) % allItems.length],
    allItems[(currentIndex + 2) % allItems.length],
    allItems[(currentIndex + 3) % allItems.length],
  ];

  const visibleImages = [
    productImages[currentIndex % allItems.length],
    productImages[(currentIndex + 1) % allItems.length],
    productImages[(currentIndex + 2) % allItems.length],
    productImages[(currentIndex + 3) % allItems.length],
  ];

  return (
    <>
      <section
        ref={ref as React.RefObject<HTMLElement>}
        id="products"
        className={`py-16 lg:py-20 bg-white transition-all duration-1000 transform-gpu ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ willChange: isVisible ? 'auto' : 'transform, opacity' }}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-[#1B3D6F] opacity-0" style={{ background: "rgba(27, 61, 111, 0.1)", animation: 'bounce-in 0.6s ease-out 0.1s forwards' }}>
            {t("badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F2540] mb-4">{t("title")}</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {visibleItems.map((item, i) => (
            <div
              key={`${currentIndex}-${i}`}
              className="group relative rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-700 cursor-pointer hover:-translate-y-2 transform-gpu"
              style={{
                animation: 'fadeInUp 0.7s ease-out forwards',
                animationDelay: `${i * 100}ms`,
                willChange: 'transform, opacity, border-color, box-shadow'
              }}
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={visibleImages[i]}
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
                  <button
                    onClick={() => setSelectedProduct(currentIndex + i)}
                    className="group/btn text-sm font-bold text-[#2A5298] flex items-center gap-2 hover:gap-4 transition-all"
                  >
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

        {/* Indicateurs de progression */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <div className="flex gap-2">
            {[0, 4].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-8 bg-[#1B3D6F]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Aller au groupe ${index / 4 + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bouton CTA vers la page complète */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white bg-[#1B3D6F] hover:bg-[#2A5298] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 transform-gpu"
            style={{ willChange: 'transform, box-shadow' }}
          >
            <span>Découvrir tous nos produits</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>

      {/* Modal */}
      {selectedProduct !== null && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={() => setSelectedProduct(null)}
          />

          {/* Modal Panel - Responsive */}
          <div
            className="fixed inset-x-4 top-20 bottom-4 md:right-6 md:left-auto md:top-24 md:bottom-6 w-auto md:max-w-lg bg-white z-50 shadow-2xl rounded-2xl overflow-y-auto"
            style={{
              animation: 'slideInRight 0.4s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style jsx>{`
              @keyframes slideInRight {
                from {
                  transform: translateX(100%);
                  opacity: 0;
                }
                to {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }
              .animate-fadeIn {
                animation: fadeIn 0.3s ease-out;
              }
            `}</style>

            {/* Header with Product Image */}
            <div className="sticky top-0 bg-[#0F2540] z-10">
              <div className="relative h-40">
                <Image
                  src={allItems[selectedProduct].image}
                  alt={allItems[selectedProduct].name}
                  fill
                  className="object-cover"
                  sizes="500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2540] via-[#0F2540]/60 to-transparent" />
              </div>
              <div className="px-6 py-5 flex items-center justify-between">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2" style={{ background: "rgba(42,82,152,0.95)", color: "white" }}>
                    {allItems[selectedProduct].name}
                  </div>
                  <h3 className="text-xl font-bold text-white">{allItems[selectedProduct].tagline}</h3>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors ml-4"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-lg font-semibold text-[#0F2540] mb-3">Présentation</h4>
                <p className="text-gray-600 leading-relaxed">{allItems[selectedProduct].description}</p>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-lg font-semibold text-[#0F2540] mb-4">Fonctionnalités Clés</h4>
                <div className="space-y-3">
                  {allItems[selectedProduct].features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <svg className="w-5 h-5 text-[#2A5298]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-600">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-6 border-t border-gray-100">
                <Link
                  href={`/${locale}#contact`}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-bold text-white bg-[#1B3D6F] hover:bg-[#2A5298] transition-all duration-300 hover:shadow-lg"
                  onClick={() => setSelectedProduct(null)}
                >
                  <span>Nous contacter</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
