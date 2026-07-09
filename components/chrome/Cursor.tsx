"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const moonRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const moon = moonRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!moon || !ring || !label) return;

    document.documentElement.classList.add("moon-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    moon.style.transform = `translate(${mx}px, ${my}px)`;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      moon.style.transform = `translate(${mx}px, ${my}px)`;
      const target = (e.target as HTMLElement)?.closest?.(
        "a, button, [data-cursor], input, select, textarea, [role='button']"
      ) as HTMLElement | null;
      const active = Boolean(target);
      ring.classList.toggle("is-active", active);
      moon.classList.toggle("is-active", active);
      label.textContent = target?.dataset?.cursor ?? "";
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("moon-cursor");
    };
  }, []);

  return (
    <>
      <div ref={moonRef} className="cursor-moon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.6 15.3A8.4 8.4 0 0 1 8.9 3.7a8.4 8.4 0 1 0 11.7 11.6Z" />
        </svg>
      </div>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}
