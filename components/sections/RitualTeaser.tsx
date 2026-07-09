"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLang } from "@/lib/i18n/context";
import Button from "@/components/ui/Button";
import ProductArt from "@/components/art/ProductArt";

const STARS = Array.from({ length: 36 }, (_, i) => ({
  left: (i * 37 + 7) % 100,
  top: (i * 53 + 3) % 72,
  size: 1 + (i % 3),
  delay: (i % 7) * 0.45,
  dur: 2.6 + (i % 4) * 0.7,
}));

const ZS = [
  { left: "52%", top: "26%", size: "1.4rem", delay: "0s" },
  { left: "57%", top: "20%", size: "2rem", delay: "1.3s" },
  { left: "62%", top: "14%", size: "2.7rem", delay: "2.6s" },
];

export default function RitualTeaser() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const moonY = useTransform(scrollYProgress, [0, 1], [160, -70]);
  const moonScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.1]);
  const haloOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.6, 0.85]);
  const starsOpacity = useTransform(scrollYProgress, [0, 0.4], [0.1, 1]);
  const gownY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.05, 0.3], [40, 0]);

  const Scene = (
    <div className="relative flex h-full w-full items-center overflow-hidden">
      {/* Estrellas */}
      <motion.div className="absolute inset-0" style={reduced ? undefined : { opacity: starsOpacity }} aria-hidden>
        {STARS.map((s, i) => (
          <span
            key={i}
            className="ritual-star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Nubes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[-10%] top-[58%] h-40 w-[55%] rounded-full bg-nocturno-2/80 blur-3xl"
          style={{ animation: reduced ? undefined : "cloud-drift 22s ease-in-out infinite" }}
        />
        <div
          className="absolute right-[-8%] top-[70%] h-48 w-[50%] rounded-full bg-nocturno-2/70 blur-3xl"
          style={{ animation: reduced ? undefined : "cloud-drift 28s ease-in-out infinite reverse" }}
        />
      </div>

      {/* Luna + halo */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[22%] -translate-x-1/2"
        style={reduced ? undefined : { y: moonY, scale: moonScale }}
        aria-hidden
      >
        <motion.div
          className="absolute left-1/2 top-1/2 h-[42vmin] w-[42vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            opacity: reduced ? 0.6 : haloOpacity,
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-terracota-hi) 45%, transparent), transparent 62%)",
            filter: "blur(20px)",
          }}
        />
        <svg viewBox="0 0 100 100" className="relative h-[15vmin] w-[15vmin] min-h-24 min-w-24 drop-shadow-[0_0_30px_rgba(226,161,132,0.6)]">
          <defs>
            <radialGradient id="ritualMoon" cx="0.4" cy="0.35" r="0.75">
              <stop offset="0%" stopColor="#FBEFE2" />
              <stop offset="100%" stopColor="#E2A184" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="38" fill="url(#ritualMoon)" />
          <circle cx="38" cy="42" r="5" fill="#00000010" />
          <circle cx="60" cy="58" r="7" fill="#00000010" />
          <circle cx="55" cy="34" r="3.5" fill="#00000010" />
        </svg>

        {/* Zzz */}
        {!reduced &&
          ZS.map((z, i) => (
            <span
              key={i}
              className="ritual-z text-lino/70"
              style={{ left: z.left, top: z.top, fontSize: z.size, animationDelay: z.delay }}
            >
              z
            </span>
          ))}
      </motion.div>

      {/* Prenda flotante (desktop) */}
      <motion.div
        className="absolute right-[6%] top-1/2 hidden w-[24%] max-w-xs -translate-y-1/2 lg:block"
        style={reduced ? undefined : { y: gownY }}
        aria-hidden
      >
        <div className="overflow-hidden rounded-[24px] shadow-[0_50px_110px_-40px_rgba(0,0,0,0.7)]">
          <ProductArt garment="gown" hex="#8492A8" shade="#3F4A5E" className="aspect-[4/5] w-full" />
        </div>
      </motion.div>

      {/* Contenido */}
      <motion.div
        className="u-container relative z-10"
        style={reduced ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-xl">
          <p className="eyebrow text-terracota-hi">{t.home.ritual.eyebrow}</p>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] text-lino">
            {t.home.ritual.title}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-lino/70">{t.home.ritual.body}</p>
          <div className="mt-9">
            <Button href="/lookbook" size="lg" magnetic>
              {t.home.ritual.cta}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  if (reduced) {
    return (
      <section className="relative overflow-hidden bg-nocturno py-24 text-lino">
        <div className="h-[70vh]">{Scene}</div>
      </section>
    );
  }

  return (
    <section className="relative bg-nocturno text-lino">
      <div ref={trackRef} className="h-[190vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-nocturno">
          {Scene}
        </div>
      </div>
    </section>
  );
}
