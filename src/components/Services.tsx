"use client";

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

  const items: ServiceItem[] = [0, 1, 2].map((i) => ({
    icon: t(`items.${i}.icon`),
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }));

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="services"
      className={`py-24 lg:py-32 transition-all duration-1000 bg-[#F8F9FC] transform-gpu ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ willChange: isVisible ? "auto" : "transform, opacity" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2540] mb-5">{t("title")}</h2>
          <p className="text-base text-gray-500 max-w-2xl leading-relaxed">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className="group relative bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${i * 120}ms`, animationFillMode: "both" }}
            >
              {/* Accent bar au hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1B3D6F] to-[#2A5298] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Icône */}
              <div className="relative w-14 h-14 rounded-sm flex items-center justify-center mb-6 bg-gray-50 group-hover:bg-blue-50 transition-colors duration-300">
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
                <div className="h-1 w-6 rounded-full bg-[#1B3D6F] opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-500" />
                <div className="h-1 w-1.5 rounded-full bg-[#2A5298] opacity-20 group-hover:opacity-60 transition-all duration-500 delay-75" />
                <div className="h-1 w-1.5 rounded-full bg-[#2A5298] opacity-10 group-hover:opacity-40 transition-all duration-500 delay-150" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
