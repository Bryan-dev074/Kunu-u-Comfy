"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLang } from "@/lib/i18n/context";
import { getFeatured } from "@/lib/products";
import { Reveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import ProductImage from "@/components/product/ProductImage";
import { pick } from "@/lib/utils";

const CH_PHOTOS = [
  "/products/gown.jpg",
  "/products/detail.jpg",
  "/products/family.jpg",
  "/products/robe2.jpg",
];

const STARS = Array.from({ length: 70 }, (_, i) => ({
  left: (i * 47 + 11) % 100,
  top: (i * 61 + 5) % 100,
  size: 1 + (i % 3),
  delay: (i % 9) * 0.4,
  dur: 2.6 + (i % 5) * 0.6,
}));

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
  const y = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 70, reduced ? 0 : -70]);
  const flip = index % 2 === 1;
  const photo = CH_PHOTOS[index % CH_PHOTOS.length];

  return (
    <div ref={ref} className="grid items-center gap-10 py-14 md:py-24 lg:grid-cols-2 lg:gap-20">
      <motion.div style={{ y }} className={flip ? "lg:order-2" : ""}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-lino/10 shadow-[0_50px_110px_-40px_rgba(0,0,0,0.7)]">
          <Image
            src={photo}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nocturno/55 via-transparent to-transparent" />
        </div>
      </motion.div>
      <Reveal className={flip ? "lg:order-1" : ""}>
        <span className="font-display text-6xl text-terracota-hi/40 md:text-7xl">{num}</span>
        <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-tight text-lino">
          {title}
        </h2>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-lino/65">{body}</p>
      </Reveal>
    </div>
  );
}

export default function LookbookView() {
  const { locale, t } = useLang();
  const reduced = useReducedMotion();
  const look = getFeatured().slice(0, 3);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const moonY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120]);
  const moonScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.3]);

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#2a1f17,#241a13_45%,#170f0a)] text-lino">
      {/* Campo de estrellas */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
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
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <header ref={heroRef} className="page-top u-container relative flex min-h-[80vh] flex-col items-center justify-center pb-16 text-center">
          <motion.div
            style={{ y: moonY, scale: moonScale }}
            className="pointer-events-none absolute top-[8%] left-1/2 -translate-x-1/2"
            aria-hidden
          >
            <div
              className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-terracota-hi) 50%, transparent), transparent 62%)",
              }}
            />
            <svg viewBox="0 0 100 100" className="relative h-28 w-28 drop-shadow-[0_0_30px_rgba(226,161,132,0.6)]">
              <defs>
                <radialGradient id="lbMoon" cx="0.4" cy="0.35" r="0.75">
                  <stop offset="0%" stopColor="#FBEFE2" />
                  <stop offset="100%" stopColor="#E2A184" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="34" fill="url(#lbMoon)" />
              <circle cx="40" cy="44" r="4" fill="#00000012" />
              <circle cx="60" cy="58" r="6" fill="#00000012" />
            </svg>
          </motion.div>

          <Reveal className="relative">
            <p className="eyebrow text-terracota-hi">{t.lookbook.eyebrow}</p>
            <h1 className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.8rem,8vw,6rem)] leading-[1.02] text-lino">
              {t.lookbook.title}
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg text-lino/60">{t.lookbook.subtitle}</p>
          </Reveal>
        </header>

        {/* Capítulos */}
        <div className="u-container flex flex-col gap-6 pb-16 md:gap-16">
          {t.lookbook.chapters.map((ch, i) => (
            <Chapter key={ch.num} index={i} num={ch.num} title={ch.title} body={ch.body} />
          ))}
        </div>

        {/* Shop the look */}
        <section className="border-t border-lino/10 py-20 md:py-28">
          <div className="u-container">
            <Reveal className="mb-12 text-center">
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-lino">
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
                  <div className="overflow-hidden rounded-3xl">
                    <ProductImage
                      product={p}
                      color={p.colors[0]}
                      className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-lg text-lino">{pick(p.name, locale)}</span>
                    <span className="text-sm text-terracota-hi">{t.common.viewProduct} →</span>
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
    </div>
  );
}
