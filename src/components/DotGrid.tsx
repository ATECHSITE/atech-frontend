"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(InertiaPlugin);
}

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
}

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

function hexToRgb(hex: string) {
  const m = hex.replace("#", "").match(/.{1,2}/g);
  if (!m) return { r: 0, g: 0, b: 0 };
  return { r: parseInt(m[0], 16), g: parseInt(m[1], 16), b: parseInt(m[2], 16) };
}

export default function DotGrid({
  dotSize = 16,
  gap = 32,
  baseColor = "#5227FF",
  activeColor = "#5227FF",
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className,
  style,
}: DotGridProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({
    x: -9999, y: -9999, vx: 0, vy: 0, speed: 0,
    lastTime: 0, lastX: 0, lastY: 0,
  });

  const baseRgb = hexToRgb(baseColor);
  const activeRgb = hexToRgb(activeColor);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const rect = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    const cell = dotSize + gap;
    const cols = Math.max(1, Math.floor((rect.width + gap) / cell));
    const rows = Math.max(1, Math.floor((rect.height + gap) / cell));
    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const startX = (rect.width - gridW) / 2 + dotSize / 2;
    const startY = (rect.height - gridH) / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({
          cx: startX + x * cell,
          cy: startY + y * cell,
          xOffset: 0,
          yOffset: 0,
          _inertiaApplied: false,
        });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    buildGrid();
    const ro = new ResizeObserver(() => buildGrid());
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [buildGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const proxSq = proximity * proximity;

    const tick = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const { x: px, y: py } = pointerRef.current;
      const radius = dotSize / 2;

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const distSq = dx * dx + dy * dy;

        let fill = baseColor;
        if (distSq <= proxSq) {
          const t = 1 - Math.sqrt(distSq) / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          fill = `rgb(${r},${g},${b})`;
        }

        ctx.beginPath();
        ctx.arc(ox, oy, radius, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [
    baseColor, activeColor, proximity, dotSize,
    baseRgb.r, baseRgb.g, baseRgb.b,
    activeRgb.r, activeRgb.g, activeRgb.b,
  ]);

  useEffect(() => {
    const wrap = wrapperRef.current;
    if (!wrap) return;

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();
      const last = pointerRef.current;
      const dt = Math.max(now - last.lastTime, 1);
      const dx = x - last.lastX;
      const dy = y - last.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const s = maxSpeed / speed;
        vx *= s; vy *= s; speed = maxSpeed;
      }
      pointerRef.current = { x, y, vx, vy, speed, lastTime: now, lastX: x, lastY: y };

      if (speed > speedTrigger) {
        for (const dot of dotsRef.current) {
          const ddx = dot.cx - x;
          const ddy = dot.cy - y;
          if (ddx * ddx + ddy * ddy < proximity * proximity && !dot._inertiaApplied) {
            dot._inertiaApplied = true;
            const pushX = ddx * 0.05 + vx * 0.005;
            const pushY = ddy * 0.05 + vy * 0.005;
            gsap.to(dot, {
              inertia: { xOffset: pushX, yOffset: pushY, resistance },
              onComplete: () => {
                gsap.to(dot, {
                  xOffset: 0,
                  yOffset: 0,
                  duration: returnDuration,
                  ease: "elastic.out(1,0.75)",
                });
                dot._inertiaApplied = false;
              },
            });
          }
        }
      }
    };

    const onLeave = () => {
      pointerRef.current = { ...pointerRef.current, x: -9999, y: -9999 };
    };

    const onClick = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const dot of dotsRef.current) {
        const ddx = dot.cx - cx;
        const ddy = dot.cy - cy;
        const distSq = ddx * ddx + ddy * ddy;
        if (distSq < shockRadius * shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          const dist = Math.sqrt(distSq);
          const fall = Math.max(0, 1 - dist / shockRadius);
          const angle = Math.atan2(ddy, ddx);
          const pushX = Math.cos(angle) * shockStrength * fall * 50;
          const pushY = Math.sin(angle) * shockStrength * fall * 50;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: "elastic.out(1,0.75)",
              });
              dot._inertiaApplied = false;
            },
          });
        }
      }
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("pointerdown", onClick);
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointerdown", onClick);
    };
  }, [maxSpeed, speedTrigger, proximity, shockRadius, shockStrength, resistance, returnDuration]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ position: "relative", width: "100%", height: "100%", ...style }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
