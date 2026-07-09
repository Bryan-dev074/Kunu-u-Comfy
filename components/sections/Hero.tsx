"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useLang } from "@/lib/i18n/context";
import Button from "@/components/ui/Button";
import ProductArt from "@/components/art/ProductArt";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -70]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -130]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -30]);

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE, delay },
        };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--header-h)]"
    >
      {/* Sol de amanecer */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] -z-[1] h-[42vmax] w-[42vmax] -translate-x-1/2 rounded-full opacity-70 blur-[10px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-terracota-luz) 32%, transparent), transparent 62%)",
        }}
      />

      <div className="u-container grid w-full items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Texto */}
        <div className="relative z-10 max-w-xl">
          <motion.p className="eyebrow" {...fade(0.1)}>
            {t.home.hero.eyebrow}
          </motion.p>

          <h1 className="mt-5 font-display text-[clamp(3rem,9vw,6.6rem)] leading-[0.98] tracking-tight text-cacao">
            {t.home.hero.titleLines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.18em] -mb-[0.14em]">
                <motion.span
                  className="block pb-[0.02em]"
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.95, ease: EASE, delay: 0.15 + i * 0.12 }}
                >
                  {i === t.home.hero.titleLines.length - 1 ? (
                    <span className="italic text-arcilla">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="mt-7 max-w-md text-lg leading-relaxed text-cacao-70" {...fade(0.6)}>
            {t.home.hero.subtitle}
          </motion.p>

          <motion.div className="mt-9 flex flex-wrap items-center gap-4" {...fade(0.75)}>
            <Button href="/coleccion" size="lg" magnetic>
              {t.home.hero.ctaPrimary}
            </Button>
            <Button href="/lookbook" variant="ghost" size="lg">
              {t.home.hero.ctaSecondary}
            </Button>
          </motion.div>
        </div>

        {/* Escena flotante */}
        <div className="relative hidden h-[62vh] min-h-[460px] lg:block">
          <motion.div
            style={{ y: y1 }}
            className="absolute right-[6%] top-0 w-[58%] animate-float"
          >
            <div className="overflow-hidden rounded-[26px] bg-arena/40 shadow-[0_50px_100px_-40px_rgba(36,26,19,0.4)]">
              <ProductArt garment="robe" hex="#C0674A" shade="#97482F" className="aspect-[4/5] w-full" />
            </div>
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-[4%] left-[2%] w-[46%]"
          >
            <div className="overflow-hidden rounded-[22px] bg-arena/40 shadow-[0_40px_90px_-40px_rgba(36,26,19,0.35)]">
              <ProductArt garment="family-set" hex="#8492A8" shade="#5C6A80" className="aspect-[4/5] w-full" />
            </div>
          </motion.div>
          <motion.div
            style={{ y: y3 }}
            className="absolute bottom-[26%] right-[0%] w-[30%]"
          >
            <div className="overflow-hidden rounded-[18px] bg-arena/40 shadow-[0_30px_70px_-30px_rgba(36,26,19,0.3)]">
              <ProductArt garment="kids-onesie" hex="#E4B4A2" shade="#C68974" className="aspect-[4/5] w-full" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-taupe md:flex"
        {...fade(1.1)}
      >
        <span className="text-[0.62rem] uppercase tracking-[0.3em]">{t.common.scroll}</span>
        <motion.span
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.div>
    </section>
  );
}
