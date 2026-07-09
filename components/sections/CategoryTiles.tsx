"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n/context";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

type Tile = { key: "adults" | "kids" | "family"; href: string; photo: string };

const TILES: Tile[] = [
  { key: "adults", href: "/coleccion?cat=adults", photo: "/products/robe.jpg" },
  { key: "kids", href: "/coleccion?cat=kids", photo: "/products/kids-set.jpg" },
  { key: "family", href: "/coleccion?cat=family", photo: "/products/family.jpg" },
];

export default function CategoryTiles() {
  const { t } = useLang();
  const cats = t.home.categories;

  return (
    <section className="u-container py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{cats.eyebrow}</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] text-cacao">{cats.title}</h2>
        <p className="mt-4 text-taupe">{cats.subtitle}</p>
      </Reveal>

      <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
        {TILES.map((tile) => (
          <StaggerItem key={tile.key}>
            <Link
              href={tile.href}
              className="group relative block aspect-[3/4] overflow-hidden rounded-3xl bg-arena/40"
              data-cursor={t.common.discover}
            >
              <Image
                src={tile.photo}
                alt={cats[tile.key].title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nocturno/75 via-nocturno/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-lino md:p-7">
                <h3 className="font-display text-3xl md:text-4xl">{cats[tile.key].title}</h3>
                <p className="mt-1.5 max-w-[26ch] text-sm text-lino/85">{cats[tile.key].desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
                  {t.common.shopNow}
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
