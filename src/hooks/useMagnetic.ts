"use client";

import { useRef, MouseEvent } from "react";

export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    const element = ref.current;
    if (!element) return;

    element.style.transform = "translate(0px, 0px) scale(1)";
  };

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}
