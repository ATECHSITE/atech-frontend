"use client";

import Image from "next/image";

type LogoProps = {
  variant?: "color" | "white";
  height?: number;
  className?: string;
};

export default function Logo({ variant = "color", height = 36, className = "" }: LogoProps) {
  return (
    <Image
      src="/Logobg.png"
      alt="ATECH Solutions"
      width={200}
      height={height}
      style={{
        height: height,
        width: "auto",
        filter: variant === "white"
          ? "brightness(0) invert(1) drop-shadow(0 1px 2px rgba(0,0,0,0.2))"
          : "drop-shadow(0 1px 3px rgba(0,0,0,0.1))",
      }}
      className={className}
      priority
    />
  );
}
