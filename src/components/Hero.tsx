"use client";

import { useTranslations } from "@/i18n/context";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRipple } from "@/hooks/useRipple";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function Hero() {
  const t = useTranslations("hero");
  const [currentImage, setCurrentImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const { createRipple } = useRipple();
  const magneticCTA = useMagnetic(0.25);

  const images = [
    { src: "/images/male-engineer-analyzed-industry-40-system-smart-manufacturing-plant.jpg", label: "Maintenance Industrielle" },
    { src: "/images/network-switch-with-cables.jpg", label: "Intégration Technologique" },
    { src: "/images/cyberpunk-location-tracking-mobile-device.jpg", label: "Suivi Electronique" },
    { src: "/images/programmer-home-office-concentrating-finding-bugs-while-he-codes.jpg", label: "Développement de solutions" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #0F2540 0%, #1B3D6F 60%, #2A5298 100%)" }}>
      {/* Background decor with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 transition-transform duration-300"
          style={{
            background: "radial-gradient(circle, #E8763A 0%, transparent 70%)",
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.15}px)`
          }}
        />
        <div
          className="absolute bottom-0 -left-32 w-80 h-80 rounded-full opacity-10 transition-transform duration-300"
          style={{
            background: "radial-gradient(circle, #F4A472 0%, transparent 70%)",
            transform: `translate(${-scrollY * 0.08}px, ${-scrollY * 0.1}px)`
          }}
        />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight mb-6 opacity-0" style={{ animation: 'slideInLeft 0.8s ease-out 0.2s forwards' }}>
              {t("title")}{" "}
              <span className="block mt-2" style={{ background: "linear-gradient(135deg, #E8763A 0%, #F4A472 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {t("titleHighlight")}
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-blue-50/95 leading-relaxed mb-8 lg:mb-10 max-w-2xl mx-auto lg:mx-0 opacity-0" style={{ animation: 'slideInLeft 0.8s ease-out 0.4s forwards' }}>
              {t("subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0" style={{ animation: 'fadeInUp 0.8s ease-out 0.6s forwards' }}>
              <a
                ref={magneticCTA.ref as React.RefObject<HTMLAnchorElement>}
                href="#contact"
                onClick={createRipple}
                onMouseMove={magneticCTA.onMouseMove}
                onMouseLeave={magneticCTA.onMouseLeave}
                className="group px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:shadow-2xl flex items-center justify-center gap-2 relative overflow-hidden will-change-transform"
                style={{ background: "linear-gradient(135deg, #E8763A 0%, #F4A472 100%)" }}
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className="relative">{t("cta")}</span>
                <svg className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a
                href="#services"
                onClick={createRipple}
                className="px-8 py-4 rounded-full font-semibold text-white border-2 border-white/40 backdrop-blur-sm transition-all hover:bg-white/15 hover:border-white/60 hover:-translate-y-1 hover:shadow-lg"
              >
                {t("ctaSecondary")}
              </a>
            </div>

            {/* Mobile Image Showcase */}
            <div className="lg:hidden mt-10">
              <div className="relative w-full h-64 rounded-2xl overflow-hidden border-2 border-[#E8763A]/30 shadow-2xl">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      idx === currentImage ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-cover"
                      priority={idx === 0}
                      quality={85}
                      sizes="(max-width: 1024px) 100vw, 560px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2540]/80 via-transparent to-transparent" />
                  </div>
                ))}

                {/* Mobile info bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0F2540]/95 via-[#0F2540]/90 to-transparent">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-sm font-bold">
                      {images[currentImage].label}
                    </h3>
                    {/* Navigation dots */}
                    <div className="flex items-center gap-2">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImage(idx)}
                          className={`transition-all duration-300 rounded-full ${
                            idx === currentImage
                              ? "w-6 h-2 bg-[#E8763A]"
                              : "w-2 h-2 bg-white/30"
                          }`}
                          aria-label={`Image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Professional Image Showcase */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-[560px] h-[560px]">
              {/* Decorative corner accents */}
              <div className="absolute -top-5 -left-5 w-20 h-20 border-t-4 border-l-4 border-[#E8763A] rounded-tl-3xl opacity-80" />
              <div className="absolute -top-5 -right-5 w-20 h-20 border-t-4 border-r-4 border-[#E8763A] rounded-tr-3xl opacity-80" />
              <div className="absolute -bottom-5 -left-5 w-20 h-20 border-b-4 border-l-4 border-[#E8763A] rounded-bl-3xl opacity-80" />
              <div className="absolute -bottom-5 -right-5 w-20 h-20 border-b-4 border-r-4 border-[#E8763A] rounded-br-3xl opacity-80" />

              {/* Main frame with gradient border */}
              <div className="relative w-full h-full rounded-3xl p-1.5 bg-gradient-to-br from-[#E8763A] via-[#F4A472] to-[#E8763A] shadow-2xl">
                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[#0F2540]">
                  {/* Image container with fade transitions */}
                  <div className="relative w-full h-full">
                    {images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                          idx === currentImage ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Image
                          src={img.src}
                          alt={img.label}
                          fill
                          className="object-cover"
                          priority={idx === 0}
                        />
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2540]/60 via-transparent to-transparent" />
                      </div>
                    ))}
                  </div>

                  {/* Glass morphism info bar at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0F2540]/95 via-[#0F2540]/90 to-transparent backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white text-xl font-bold tracking-wide mb-2">
                          {images[currentImage].label}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#E8763A] animate-pulse" />
                          <span className="text-blue-200/70 text-sm font-medium">Solutions Professionnelles</span>
                        </div>
                      </div>

                      {/* Navigation dots */}
                      <div className="flex items-center gap-2.5">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImage(idx)}
                            className={`transition-all duration-300 rounded-full ${
                              idx === currentImage
                                ? "w-10 h-2.5 bg-[#E8763A]"
                                : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
                            }`}
                            aria-label={`Image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating decorative elements */}
                  
                </div>
              </div>

              {/* Floating stats cards */}
              

              {/* Subtle animated background circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#E8763A]/10 rounded-full animate-pulse pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] border border-white/5 rounded-full animate-pulse pointer-events-none" style={{ animationDelay: "1s" }} />
            </div>
          </div>
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
