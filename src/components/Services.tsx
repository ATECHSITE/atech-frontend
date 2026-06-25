"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "@/i18n/context";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

const iconMap: Record<string, string> = {
  consulting: "/images/icones/planning.png",
  integration: "/images/icones/support.png",
  analytics: "/images/icones/developpement.png",
};

type ServiceItem = {
  icon: string;
  title: string;
  description: string;
};

export default function Services() {
  const t = useTranslations("services");
  const { ref, isVisible } = useScrollAnimation();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState([false, false, false]);

  const items: ServiceItem[] = [0, 1, 2].map((i) => ({
    icon: t(`items.${i}.icon`),
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }));

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isMobile || reduceMotion) {
      setVisibleCards([true, true, true]);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.index);
          setVisibleCards((current) =>
            current.map((visible, i) => (i === index ? entry.isIntersecting : visible))
          );
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="services"
      className={`py-24 lg:py-32 transition-all duration-1000 transform-gpu ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ willChange: isVisible ? "auto" : "transform, opacity", background: "#F4F6FB" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px" style={{ background: "#E8763A" }} />
            <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "#E8763A" }}>
              {t("badge")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F2540] mb-5 max-w-3xl leading-tight">
            {t("title")}
          </h2>
          <p className="text-base text-gray-500 max-w-2xl leading-relaxed">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              ref={(node) => {
                cardRefs.current[i] = node;
              }}
              data-index={i}
              className="group relative bg-white p-8 border border-gray-100 shadow-sm md:hover:shadow-xl md:hover:border-gray-200 md:hover:-translate-y-1.5 transition-all duration-300 overflow-hidden animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${i * 120}ms`, animationFillMode: "both" }}
            >
              {/* Accent bar au hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1B3D6F] to-[#2A5298] transition-transform duration-500 origin-left md:scale-x-0 md:group-hover:scale-x-100 ${
                  visibleCards[i] ? "scale-x-100" : "scale-x-0"
                }`}
              />

              {/* Icône */}
              <div
                className={`relative w-14 h-14 rounded-sm flex items-center justify-center mb-6 transition-colors duration-300 md:bg-gray-50 md:group-hover:bg-blue-50 ${
                  visibleCards[i] ? "bg-blue-50" : "bg-gray-50"
                }`}
              >
                <div className="relative w-8 h-8">
                  <Image
                    src={iconMap[item.icon] || "/images/icones/planning.png"}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="32px"
                    quality={100}
                    priority
                  />
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#0F2540] mb-3 relative">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed relative">{item.description}</p>

              {/* Indicateur bas animé */}
              <div className="flex gap-1.5 mt-6">
                <div
                  className={`h-1 rounded-full bg-[#1B3D6F] transition-all duration-500 md:w-6 md:opacity-20 md:group-hover:w-10 md:group-hover:opacity-100 ${
                    visibleCards[i] ? "w-10 opacity-100" : "w-6 opacity-20"
                  }`}
                />
                <div
                  className={`h-1 w-1.5 rounded-full bg-[#2A5298] transition-all duration-500 delay-75 md:opacity-20 md:group-hover:opacity-60 ${
                    visibleCards[i] ? "opacity-60" : "opacity-20"
                  }`}
                />
                <div
                  className={`h-1 w-1.5 rounded-full bg-[#2A5298] transition-all duration-500 delay-150 md:opacity-10 md:group-hover:opacity-40 ${
                    visibleCards[i] ? "opacity-40" : "opacity-10"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
