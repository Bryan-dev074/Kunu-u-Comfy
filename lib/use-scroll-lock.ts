"use client";

import { useEffect } from "react";

type LenisLike = { stop?: () => void; start?: () => void };

/** Bloquea el scroll del body (y de Lenis) mientras `active` sea true. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    lenis?.stop?.();
    const prevOverflow = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPad;
      lenis?.start?.();
    };
  }, [active]);
}
