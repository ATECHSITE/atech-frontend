"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200/30">
      <div
        ref={barRef}
        className="h-full"
        style={{
          width: "0%",
          background: "linear-gradient(90deg, #E8763A 0%, #F4A472 100%)",
          boxShadow: "0 0 8px rgba(232, 118, 58, 0.4)",
          transition: "width 120ms linear",
          willChange: "width",
        }}
      />
    </div>
  );
}
