"use client";

import { useLang } from "@/lib/i18n/context";
import { getFeatured } from "@/lib/products";
import { Reveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import ProductGrid from "@/components/product/ProductGrid";

export default function FeaturedCollection() {
  const { t } = useLang();
  const featured = getFeatured().slice(0, 4);

  return (
    <section className="u-container py-20 md:py-28">
      <Reveal className="flex flex-col items-end justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <p className="eyebrow">{t.home.featured.eyebrow}</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight text-cacao">
            {t.home.featured.title}
          </h2>
          <p className="mt-4 text-taupe">{t.home.featured.subtitle}</p>
        </div>
        <Button href="/coleccion" variant="ghost" className="hidden shrink-0 sm:inline-flex">
          {t.home.featured.cta}
        </Button>
      </Reveal>

      <div className="mt-14">
        <ProductGrid products={featured} />
      </div>

      <div className="mt-12 flex justify-center sm:hidden">
        <Button href="/coleccion" variant="ghost">
          {t.home.featured.cta}
        </Button>
      </div>
    </section>
  );
}
