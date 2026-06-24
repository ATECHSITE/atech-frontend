"use client";

import { useTranslations } from "@/i18n/context";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRipple } from "@/hooks/useRipple";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function Hero() {
  const t = useTranslations("hero");
  const [currentImage, setCurrentImage] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const { createRipple } = useRipple();
  const magneticCTA = useMagnetic(0.25);
  const magneticSecondary = useMagnetic(0.2);

  const keywords = (t.raw("keywords") as string[]) || ["Digitaliser", "Moderniser", "Transformer", "Optimiser"];
  const imageLabels = (t.raw("imageLabels") as string[]) || ["Maintenance Industrielle", "Intégration Technologique", "Suivi Electronique", "Développement de solutions"];
  const subtitles = (t.raw("subtitles") as string[]) || [t("subtitle"), t("subtitle"), t("subtitle"), t("subtitle")];

  const images = [
    { src: "/images/male-engineer-analyzed-industry-40-system-smart-manufacturing-plant.jpg", label: imageLabels[0], keyword: keywords[0] },
    { src: "/images/network-switch-with-cables.jpg", label: imageLabels[1], keyword: keywords[1] },
    { src: "/images/cyberpunk-location-tracking-mobile-device.jpg", label: imageLabels[2], keyword: keywords[2] },
    { src: "/images/programmer-home-office-concentrating-finding-bugs-while-he-codes.jpg", label: imageLabels[3], keyword: keywords[3] },
  ];

  useEffect(() => {
    setProgress(0);
    const DURATION = 10000;
    const TICK = 50;
    let elapsed = 0;

    if (progressRef.current) clearInterval(progressRef.current);

    progressRef.current = setInterval(() => {
      elapsed += TICK;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed >= DURATION) {
        clearInterval(progressRef.current!);
        setCurrentImage((prev) => (prev + 1) % images.length);
      }
    }, TICK);

    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentImage, images.length]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <style jsx>{`
        @keyframes zoomIn {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
      {/* Full-screen background images with SLIDE animation (RIGHT to LEFT) */}
      <div className="absolute inset-0">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="absolute inset-0"
            style={{
              zIndex: idx === currentImage ? 2 : 1,
              opacity: idx === currentImage ? 1 : 0,
              transition: 'opacity 1200ms ease-in-out',
              willChange: 'opacity'
            }}
          >
            <div
              className="w-full h-full"
              style={{
                animation: idx === currentImage ? 'zoomIn 10s ease-out forwards' : 'none'
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
                style={{ imageRendering: 'auto' }}
              />
            </div>
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F2540]/95 via-[#0F2540]/85 to-[#0F2540]/60" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="text-left">
            {/* Main Heading with dynamic keyword */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight tracking-tight mb-6">
              <span className="block text-white mb-2">{t("titlePrefix")}</span>

              {/* Dynamic keyword — fade + glisse verticale */}
              <div className="relative h-[1.4em] overflow-hidden pb-2">
                {images.map((img, idx) => (
                  <span
                    key={idx}
                    className="absolute left-0 top-0 block whitespace-nowrap"
                    style={{
                      transform: idx === currentImage
                        ? 'translateY(0px)'
                        : idx < currentImage
                          ? 'translateY(-10px)'
                          : 'translateY(10px)',
                      opacity: idx === currentImage ? 1 : 0,
                      transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms ease',
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

            {/* Subtitle — change avec chaque slide */}
            <div
              className="relative mb-10 max-w-xl opacity-0"
              style={{ minHeight: '5rem', animation: 'slideInLeft 0.8s ease-out 0.4s forwards', willChange: 'transform, opacity' }}
            >
              {subtitles.map((sub, idx) => (
                <p
                  key={idx}
                  className="absolute top-0 left-0 text-lg sm:text-xl text-blue-50/90 leading-relaxed"
                  style={{
                    transform: idx === currentImage ? 'translateY(0px)' : idx < currentImage ? 'translateY(-8px)' : 'translateY(8px)',
                    opacity: idx === currentImage ? 1 : 0,
                    transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms ease',
                  }}
                >
                  {sub}
                </p>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 opacity-0" style={{ animation: 'fadeInUp 0.8s ease-out 0.6s forwards', willChange: 'transform, opacity' }}>
              <a
                ref={magneticCTA.ref as React.RefObject<HTMLAnchorElement>}
                href="#services"
                onClick={createRipple}
                onMouseMove={magneticCTA.onMouseMove}
                onMouseLeave={magneticCTA.onMouseLeave}
                className="group px-8 py-4 font-bold text-lg text-white transition-all duration-300 hover:shadow-2xl flex items-center justify-center gap-2 relative overflow-hidden transform-gpu"
                style={{ backgroundColor: "#1B3D6F", willChange: 'transform' }}
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className="relative">{t("ctaMain")}</span>
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
                className="px-8 py-4 font-semibold text-lg text-white border-2 border-white/40 transition-all hover:bg-white/10 hover:border-white/60 hover:-translate-y-1 hover:shadow-lg transform-gpu"
                style={{ willChange: 'transform' }}
              >
                {t("ctaSecondary")}
              </a>
            </div>
          </div>

          {/* Right side — navigation slides avec barres de progression */}
          <div className="hidden lg:flex flex-col mt-100 ml-80  justify-center items-start gap-5 opacity-0" style={{ animation: 'slideInRight 0.8s ease-out 0.5s forwards' }}>
            {images.map((img, idx) => {
              const isActive = idx === currentImage;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className="group flex flex-col gap-2 text-left w-56 cursor-pointer"
                >
                  {/* Barre de progression */}
                  <div className="w-full h-[2px] bg-white/15 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-none"
                      style={{
                        width: isActive ? `${progress}%` : '0%',
                        backgroundColor: isActive ? '#2A5298' : 'transparent',
                        transition: isActive ? 'none' : 'width 300ms ease',
                      }}
                    />
                  </div>
                  {/* Label */}
                  <span
                    className="text-sm font-medium tracking-wide transition-all duration-500"
                    style={{
                      color: isActive ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.30)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {img.keyword}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
          <path d="M0 60V30C240 0 480 60 720 40C960 20 1200 60 1440 30V60H0Z" fill="#F4F6FB" />
        </svg>
      </div>
    </section>
  );
}
