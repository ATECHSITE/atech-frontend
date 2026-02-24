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
      src="/Logo.png"
      alt="AutomaTech"
      width={200}
      height={height}
      style={{
        height: height,
        width: "auto",
        filter: variant === "white" ? "brightness(0) invert(1)" : "none",
      }}
      className={className}
      priority
    />
  );
}
