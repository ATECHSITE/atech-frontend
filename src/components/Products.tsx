"use client";

import { useTranslations, useLocale } from "@/i18n/context";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type ProductItem = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  category: string;
};

const productImages = [
  "/images/test/Product-CONNECT.png",
  "/images/test/Produc-Gestion-des-risques.png",
  "/images/test/Product-TRADEVAL.png",
  "/images/test/Product-Inspections-REPORTER.png",
  "/images/test/Product-ANALYTICA.png",
  "/images/test/Product-Système de pesage.png",
  "/images/test/Product-Permis de conduire.png",
  "/images/test/Product-SAFE ROAD.png",
];

const productCategories = [
  "Douanes & Commerce",
  "Gestion des Risques",
  "Valorisation Douanière",
  "Inspection Mobile",
  "Business Intelligence",
  "Sécurité Routière",
  "Gestion Administrative",
  "Trafic & Sécurité",
];

export default function Products() {
  const t = useTranslations("products");
  const locale = useLocale();
  const { ref, isVisible } = useScrollAnimation();
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(productImages.length - 1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const allItems: ProductItem[] = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    name: t(`items.${i}.name`),
    tagline: t(`items.${i}.tagline`),
    description: t(`items.${i}.description`),
    features: [0, 1, 2, 3].map((j) => t(`items.${i}.features.${j}`)),
    image: productImages[i],
    category: productCategories[i],
  }));

  useEffect(() => {
    if (selectedProduct !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedProduct]);

  useEffect(() => {
    const updateCarouselBounds = () => {
      const visibleCards = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
      const nextMaxIndex = Math.max(0, allItems.length - visibleCards);

      setMaxIndex(nextMaxIndex);
      setActiveIndex((currentIndex) => Math.min(currentIndex, nextMaxIndex));
    };

    updateCarouselBounds();
    window.addEventListener("resize", updateCarouselBounds);

    return () => window.removeEventListener("resize", updateCarouselBounds);
  }, [allItems.length]);

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const targetIndex = Math.min(Math.max(index, 0), maxIndex);
    const cards = scrollRef.current.querySelectorAll("[data-card]");
    if (cards[targetIndex]) {
      cards[targetIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
    setActiveIndex(targetIndex);
  };

  const handlePrev = () => {
    const newIndex = Math.max(0, activeIndex - 1);
    scrollTo(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(maxIndex, activeIndex + 1);
    scrollTo(newIndex);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.scrollWidth / allItems.length;
    const index = Math.round(container.scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, maxIndex));
  };

  return (
    <>
      <section
        ref={ref as React.RefObject<HTMLElement>}
        id="products"
        className={`py-20 lg:py-28 transition-all duration-1000 transform-gpu ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ willChange: isVisible ? "auto" : "transform, opacity", background: "#FFFFFF" }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F2540] leading-tight">
                {t("title")}
              </h2>
              <p className="text-gray-500 mt-3 max-w-xl leading-relaxed">{t("subtitle")}</p>
            </div>

            {/* Desktop arrows */}
            <div className="hidden sm:flex absolute left-8 right-8 top-70 justify-between pointer-events-none z-10  flex-shrink-0">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="pointer-events-auto w-16 h-16 flex items-center justify-center text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)] transition-all hover:scale-110 hover:text-[#2A5298] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                disabled={activeIndex >= maxIndex}
                className="pointer-events-auto w-16 h-16 flex items-center justify-center text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)] transition-all hover:scale-110 hover:text-[#2A5298] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Cards horizontal scroll */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>

            {allItems.map((item, i) => (
              <div
                key={i}
                data-card
                className="flex-none w-[85vw] sm:w-[42vw] lg:w-[calc(33.33%-16px)] snap-start group cursor-pointer"
                onClick={() => setSelectedProduct(i)}
              >
                {/* Image */}
                <div className="relative w-full overflow-hidden bg-[#0F2540]" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu"
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 42vw, 33vw"
                    style={{ willChange: "transform" }}
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-[#0F2540]/0 group-hover:bg-[#0F2540]/20 transition-colors duration-500" />
                </div>

                {/* Card body */}
                <div className="bg-[#F8F9FC] p-6 flex flex-col gap-3 h-[280px]">
                  {/* Category tag */}
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-[#0F2540] border border-[#0F2540]/25 bg-white rounded-sm tracking-wide">
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="flex-1 overflow-hidden">
                    <h3 className="text-base font-bold text-[#0F2540] leading-snug mb-2 group-hover:text-[#2A5298] transition-colors duration-200 line-clamp-2">
                      {item.name} — {item.tagline}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-sm font-bold text-[#0F2540]">{t("learnMore")}</span>
                    <div className="w-9 h-9 border border-[#0F2540]/20 flex items-center justify-center group-hover:bg-[#0F2540] group-hover:border-[#0F2540] transition-all duration-300">
                      <svg
                        className="w-4 h-4 text-[#0F2540] group-hover:text-white transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots + CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    activeIndex === i
                      ? "w-8 h-2 bg-[#0F2540]"
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Aller au produit ${i + 1}`}
                />
              ))}
            </div>

            {/* CTA */}
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0F2540] border-b-2 border-[#0F2540] pb-0.5 hover:text-[#2A5298] hover:border-[#2A5298] transition-colors duration-200"
            >
              {t("breadcrumbProducts")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProduct !== null && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            style={{ animation: "fadeIn 0.3s ease-out" }}
            onClick={() => setSelectedProduct(null)}
          />
          <div
            className="fixed inset-x-4 top-20 bottom-4 md:right-6 md:left-auto md:top-24 md:bottom-6 w-auto md:max-w-lg bg-white z-50 shadow-2xl overflow-y-auto"
            style={{ animation: "slideInRight 0.4s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <style jsx>{`
              @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
            `}</style>

            {/* Modal header */}
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
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white border border-white/30 mb-2">
                    {allItems[selectedProduct].category}
                  </span>
                  <h3 className="text-xl font-bold text-white">{allItems[selectedProduct].name} — {allItems[selectedProduct].tagline}</h3>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors ml-4 flex-shrink-0"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal content */}
            <div className="px-6 py-6 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-[#0F2540] mb-3">{t("presentation")}</h4>
                <p className="text-gray-600 leading-relaxed">{allItems[selectedProduct].description}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#0F2540] mb-4">{t("keyFeatures")}</h4>
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
              <div className="pt-6 border-t border-gray-100">
                <Link
                  href={`/${locale}#contact`}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 font-bold text-white bg-[#1B3D6F] hover:bg-[#2A5298] transition-all duration-300 hover:shadow-lg"
                  onClick={() => setSelectedProduct(null)}
                >
                  <span>{t("contactUs")}</span>
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
