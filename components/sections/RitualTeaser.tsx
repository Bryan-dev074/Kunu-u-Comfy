"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLang } from "@/lib/i18n/context";
import { Reveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import ProductArt from "@/components/art/ProductArt";

export default function RitualTeaser() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 50, reduced ? 0 : -50]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-nocturno text-lino">
      {/* Luna */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-40 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-terracota-luz) 40%, transparent), transparent 65%)",
        }}
      />
      <div className="u-container grid items-center gap-14 py-20 md:py-28 lg:grid-cols-2">
        <motion.div style={{ y }} className="order-2 lg:order-1">
          <div className="mx-auto max-w-md overflow-hidden rounded-[28px] shadow-[0_50px_110px_-40px_rgba(0,0,0,0.6)]">
            <ProductArt garment="gown" hex="#8492A8" shade="#3F4A5E" className="aspect-[4/5] w-full" />
          </div>
        </motion.div>

        <Reveal className="order-1 lg:order-2">
          <p className="eyebrow text-terracota-hi">{t.home.ritual.eyebrow}</p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.02] text-lino">
            {t.home.ritual.title}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-lino/70">{t.home.ritual.body}</p>
          <div className="mt-9">
            <Button href="/lookbook" size="lg">
              {t.home.ritual.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
