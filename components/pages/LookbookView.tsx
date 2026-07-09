"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Garment } from "@/lib/types";
import { useLang } from "@/lib/i18n/context";
import { getFeatured } from "@/lib/products";
import { Reveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import ProductArt from "@/components/art/ProductArt";
import { pick } from "@/lib/utils";

const SCENES: { garment: Garment; hex: string; shade: string }[] = [
  { garment: "gown", hex: "#8492A8", shade: "#4B586E" },
  { garment: "robe", hex: "#C0674A", shade: "#97482F" },
  { garment: "family-set", hex: "#A6B199", shade: "#7C886C" },
  { garment: "kids-onesie", hex: "#E4B4A2", shade: "#C68974" },
];

function Chapter({
  index,
  num,
  title,
  body,
}: {
  index: number;
  num: string;
  title: string;
  body: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 60, reduced ? 0 : -60]);
  const scene = SCENES[index % SCENES.length];
  const flip = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <motion.div
        style={{ y }}
        className={flip ? "lg:order-2" : ""}
      >
        <div className="overflow-hidden rounded-[28px] bg-arena/40 shadow-[0_50px_110px_-50px_rgba(36,26,19,0.4)]">
          <ProductArt garment={scene.garment} hex={scene.hex} shade={scene.shade} className="aspect-[4/5] w-full" />
        </div>
      </motion.div>
      <Reveal className={flip ? "lg:order-1" : ""}>
        <span className="font-display text-6xl text-terracota/30">{num}</span>
        <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-tight text-cacao">
          {title}
        </h2>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-taupe">{body}</p>
      </Reveal>
    </div>
  );
}

export default function LookbookView() {
  const { locale, t } = useLang();
  const look = getFeatured().slice(0, 3);

  return (
    <div className="page-top">
      {/* Hero */}
      <header className="u-container pb-16 pt-8 text-center">
        <Reveal>
          <p className="eyebrow">{t.lookbook.eyebrow}</p>
          <h1 className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.02] text-cacao">
            {t.lookbook.title}
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-taupe">{t.lookbook.subtitle}</p>
        </Reveal>
      </header>

      {/* Capítulos */}
      <div className="u-container flex flex-col gap-24 py-16 md:gap-36">
        {t.lookbook.chapters.map((ch, i) => (
          <Chapter key={ch.num} index={i} num={ch.num} title={ch.title} body={ch.body} />
        ))}
      </div>

      {/* Shop the look */}
      <section className="bg-algodon/50 py-20 md:py-28">
        <div className="u-container">
          <Reveal className="mb-12 text-center">
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-cacao">
              {t.lookbook.shopLook}
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {look.map((p) => (
              <Link
                key={p.slug}
                href={`/producto/${p.slug}`}
                className="group block"
                data-cursor={t.common.viewProduct}
              >
                <div className="overflow-hidden rounded-3xl bg-arena/40">
                  <ProductArt
                    garment={p.garment}
                    hex={p.colors[0].hex}
                    shade={p.colors[0].shade}
                    className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-lg text-cacao">{pick(p.name, locale)}</span>
                  <span className="text-sm text-arcilla">{t.common.viewProduct} →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Button href="/coleccion" size="lg" magnetic>
              {t.lookbook.cta}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
