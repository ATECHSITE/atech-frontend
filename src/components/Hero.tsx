"use client";

import { useTranslations } from "@/i18n/context";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRipple } from "@/hooks/useRipple";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function Hero() {
  const t = useTranslations("hero");
  const [currentImage, setCurrentImage] = useState(0);
  const { createRipple } = useRipple();
  const magneticCTA = useMagnetic(0.25);
  const magneticSecondary = useMagnetic(0.2);

  const images = [
    { src: "/images/male-engineer-analyzed-industry-40-system-smart-manufacturing-plant.jpg", label: "Maintenance Industrielle", keyword: "Digitaliser" },
    { src: "/images/network-switch-with-cables.jpg", label: "Intégration Technologique", keyword: "Moderniser" },
    { src: "/images/cyberpunk-location-tracking-mobile-device.jpg", label: "Suivi Electronique", keyword: "Transformer" },
    { src: "/images/programmer-home-office-concentrating-finding-bugs-while-he-codes.jpg", label: "Développement de solutions", keyword: "Digitaliser" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-screen background images with SLIDE animation (RIGHT to LEFT) */}
      <div className="absolute inset-0">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-all duration-[1200ms] ease-out"
            style={{
              transform: idx === currentImage
                ? 'translateX(0%) scale(1)'
                : idx < currentImage
                  ? 'translateX(-100%) scale(1.1)'
                  : 'translateX(100%) scale(1.1)',
              opacity: idx === currentImage ? 1 : 0,
              willChange: 'transform, opacity'
            }}
          >
            <Image
              src={img.src}
              alt={img.label}
              fill
              className="object-cover object-center"
              priority={idx === 0}
              quality={100}
              sizes="100vw"
              unoptimized={false}
              style={{ imageRendering: 'crisp-edges' }}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0F2540]/85 to-[#0F2540]/60" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="text-left">
            {/* Badge */}
           

            {/* Main Heading with dynamic keyword */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight tracking-tight mb-6">
              <span className="block text-white mb-2">Nous vous aidons à</span>

              {/* Dynamic keyword that changes with images - ALL IN BLUE */}
              <div className="relative h-[1.4em] overflow-visible pb-2">
                {images.map((img, idx) => (
                  <span
                    key={idx}
                    className="absolute left-0 top-0 block transition-all duration-700 ease-out whitespace-nowrap"
                    style={{
                      transform: idx === currentImage
                        ? 'translateX(0%)'
                        : idx < currentImage
                          ? 'translateX(-120%)'
                          : 'translateX(120%)',
                      opacity: idx === currentImage ? 1 : 0,
                      background: "linear-gradient(135deg, #1B3D6F 0%, #2A5298 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      paddingRight: "0.2em",
                      letterSpacing: "-0.02em"
                    }}
                  >
                    {img.keyword}.
                  </span>
                ))}
              </div>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-50/95 leading-relaxed mb-10 max-w-xl opacity-0"
               style={{ animation: 'slideInLeft 0.8s ease-out 0.4s forwards', willChange: 'transform, opacity' }}>
              {t("subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 opacity-0" style={{ animation: 'fadeInUp 0.8s ease-out 0.6s forwards', willChange: 'transform, opacity' }}>
              <a
                ref={magneticCTA.ref as React.RefObject<HTMLAnchorElement>}
                href="#services"
                onClick={createRipple}
                onMouseMove={magneticCTA.onMouseMove}
                onMouseLeave={magneticCTA.onMouseLeave}
                className="group px-8 py-4 rounded-full font-bold text-lg text-white transition-all duration-300 hover:shadow-2xl flex items-center justify-center gap-2 relative overflow-hidden transform-gpu"
                style={{ backgroundColor: "#1B3D6F", willChange: 'transform' }}
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className="relative">Découvrir nos services</span>
                <svg className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <a
                ref={magneticSecondary.ref as React.RefObject<HTMLAnchorElement>}
                href="#contact"
                onClick={createRipple}
                onMouseMove={magneticSecondary.onMouseMove}
                onMouseLeave={magneticSecondary.onMouseLeave}
                className="px-8 py-4 rounded-full font-semibold text-lg text-white border-2 border-white/40 transition-all hover:bg-white/10 hover:border-white/60 hover:-translate-y-1 hover:shadow-lg transform-gpu"
                style={{ willChange: 'transform' }}
              >
                Prise de rendez-vous
              </a>
            </div>
          </div>

          {/* Right side - space for image to show through */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
          <path d="M0 60V30C240 0 480 60 720 40C960 20 1200 60 1440 30V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
