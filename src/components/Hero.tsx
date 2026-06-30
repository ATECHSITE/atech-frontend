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

  const keywords = (t.raw("keywords") as string[]) || ["Digitaliser", "Moderniser", "Transformer", "Optimiser"];
  const imageLabels = (t.raw("imageLabels") as string[]) || ["Maintenance Industrielle", "Intégration Technologique", "Suivi Electronique", "Développement de solutions"];
  const subtitles = (t.raw("subtitles") as string[]) || [t("subtitle"), t("subtitle"), t("subtitle"), t("subtitle")];

  const images = [
    { src: "/images/male-engineer-analyzed-industry-40-system-smart-manufacturing-plant.jpg", label: imageLabels[0], keyword: keywords[0] },
    { src: "/images/network-switch-with-cables.jpg", label: imageLabels[1], keyword: keywords[1] },
    { src: "/images/cyberpunk-location-tracking-mobile-device.jpg", label: imageLabels[2], keyword: keywords[2] },
    { src: "/images/programmer-home-office-concentrating-finding-bugs-while-he-codes.jpg", label: imageLabels[3], keyword: keywords[3] },
  ];

  // Réseau de nœuds (data flow) — viewBox 600x800
  const nodes = [
    { x: 90,  y: 180, r: 2.5, hub: false },
    { x: 220, y: 100, r: 2.5, hub: false },
    { x: 50,  y: 400, r: 2.5, hub: false },
    { x: 180, y: 360, r: 4.5, hub: true  }, // HUB central
    { x: 320, y: 280, r: 3,   hub: false },
    { x: 110, y: 560, r: 2.5, hub: false },
    { x: 260, y: 620, r: 2.5, hub: false },
    { x: 380, y: 480, r: 3,   hub: false },
    { x: 420, y: 180, r: 2.5, hub: false },
  ];
  const connections: Array<[number, number]> = [
    [0, 3], [1, 3], [2, 3], [4, 3], [5, 3], [6, 3],
    [0, 1], [1, 4], [4, 8], [5, 6], [6, 7], [4, 7], [4, 8],
  ];
  const packets = [
    { from: 0, to: 3, dur: 2.4, delay: 0   },
    { from: 3, to: 4, dur: 2.0, delay: 0.6 },
    { from: 4, to: 7, dur: 1.8, delay: 1.2 },
    { from: 5, to: 3, dur: 2.6, delay: 0.3 },
    { from: 3, to: 1, dur: 2.2, delay: 1.5 },
    { from: 4, to: 8, dur: 2.0, delay: 0.9 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentImage, images.length]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <style jsx>{`
        @keyframes zoomIn {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes nodeGlowPulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.95; }
        }
        @keyframes lineShimmer {
          0%, 100% { opacity: 0.18; }
          50% { opacity: 0.42; }
        }
        @keyframes floatDrift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(6px, -8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .data-flow * { animation: none !important; }
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

      {/* Data flow overlay — réseau de nœuds animés côté droit */}
      <div
        className="data-flow pointer-events-none absolute inset-0 z-[5] hidden md:block"
        aria-hidden="true"
        style={{ animation: 'floatDrift 14s ease-in-out infinite' }}
      >
        <svg
          className="absolute left-0 top-0 h-full w-full lg:left-[45%] lg:w-[55%]"
          viewBox="0 0 600 800"
          preserveAspectRatio="xMidYMid slice"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <defs>
            <radialGradient id="atech-node-glow">
              <stop offset="0%"   stopColor="#9EC9FF" stopOpacity="1" />
              <stop offset="40%"  stopColor="#4A7BC8" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#2A5298" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="atech-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#4A7BC8" stopOpacity="0.1" />
              <stop offset="50%"  stopColor="#9EC9FF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#4A7BC8" stopOpacity="0.1" />
            </linearGradient>
            <filter id="atech-packet-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connexions (lignes) */}
          {connections.map(([a, b], i) => (
            <line
              key={`l-${i}`}
              x1={nodes[a].x} y1={nodes[a].y}
              x2={nodes[b].x} y2={nodes[b].y}
              stroke="url(#atech-line-grad)"
              strokeWidth={1}
              style={{
                animation: `lineShimmer ${4 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${(i * 0.35) % 3}s`,
              }}
            />
          ))}

          {/* Nœuds : halo + cœur */}
          {nodes.map((n, i) => (
            <g key={`n-${i}`}>
              <circle
                cx={n.x} cy={n.y}
                r={n.hub ? 28 : 18}
                fill="url(#atech-node-glow)"
                style={{
                  animation: `nodeGlowPulse ${3 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `${(i * 0.4) % 2.5}s`,
                  transformOrigin: `${n.x}px ${n.y}px`,
                }}
              />
              <circle
                cx={n.x} cy={n.y}
                r={n.r}
                fill={n.hub ? "#FFFFFF" : "#BFDBFE"}
                opacity={0.9}
              />
            </g>
          ))}

          {/* Paquets de données voyageant le long de certaines arêtes */}
          {packets.map((p, i) => {
            const from = nodes[p.from];
            const to = nodes[p.to];
            return (
              <circle
                key={`p-${i}`}
                r={2}
                fill="#FFFFFF"
                opacity={0.95}
                filter="url(#atech-packet-glow)"
              >
                <animateMotion
                  dur={`${p.dur}s`}
                  begin={`${p.delay}s`}
                  repeatCount="indefinite"
                  path={`M${from.x},${from.y} L${to.x},${to.y}`}
                />
              </circle>
            );
          })}
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="text-left lg:max-w-md xl:max-w-lg">
            {/* Main Heading with dynamic keyword */}
            <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight mb-6">
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
            <div className="flex flex-col sm:flex-row gap-3 opacity-0" style={{ animation: 'fadeInUp 0.8s ease-out 0.6s forwards', willChange: 'transform, opacity' }}>
              <a
                ref={magneticCTA.ref as React.RefObject<HTMLAnchorElement>}
                href="#services"
                onClick={createRipple}
                onMouseMove={magneticCTA.onMouseMove}
                onMouseLeave={magneticCTA.onMouseLeave}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-base text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl transform-gpu"
                style={{ backgroundColor: "#E8763A", willChange: 'transform' }}
              >
                <span>{t("ctaMain")}</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <a
                ref={magneticSecondary.ref as React.RefObject<HTMLAnchorElement>}
                href="#contact"
                onClick={createRipple}
                onMouseMove={magneticSecondary.onMouseMove}
                onMouseLeave={magneticSecondary.onMouseLeave}
                className="inline-flex items-center justify-center px-7 py-3.5 font-semibold text-base text-white border border-white/40 transition-all duration-300 hover:bg-white/10 hover:border-white/60 hover:-translate-y-0.5 hover:shadow-xl transform-gpu"
                style={{ willChange: 'transform' }}
              >
                {t("ctaSecondary")}
              </a>
            </div>
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
