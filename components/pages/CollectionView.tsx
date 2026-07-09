"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { products } from "@/lib/products";
import type { Bilingual, Product } from "@/lib/types";
import { useLang } from "@/lib/i18n/context";
import Filters, { type FilterState, type CatKey } from "@/components/product/Filters";
import ProductGrid from "@/components/product/ProductGrid";
import Button from "@/components/ui/Button";

const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "2", "4", "6", "8", "10"];

const DEFAULT: FilterState = {
  category: "all",
  sizes: [],
  colors: [],
  sort: "featured",
};

export default function CollectionView() {
  const { locale, t } = useLang();
  const params = useSearchParams();
  const [state, setState] = useState<FilterState>(DEFAULT);

  useEffect(() => {
    const cat = params.get("cat");
    if (cat === "adults" || cat === "kids" || cat === "family") {
      setState((s) => ({ ...s, category: cat as CatKey }));
    }
  }, [params]);

  const set = (patch: Partial<FilterState>) => setState((s) => ({ ...s, ...patch }));
  const clear = () => setState(DEFAULT);

  const colorOptions = useMemo(() => {
    const map = new Map<string, { id: string; hex: string; name: Bilingual }>();
    products.forEach((p) =>
      p.colors.forEach((c) => {
        if (!map.has(c.id)) map.set(c.id, { id: c.id, hex: c.hex, name: c.name });
      })
    );
    return [...map.values()];
  }, []);

  const sizeOptions = useMemo(() => {
    const s = new Set<string>();
    products.forEach((p) => p.sizes.forEach((x) => s.add(x)));
    return [...s].sort((a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b));
  }, []);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (state.category !== "all" && p.category !== state.category) return false;
      if (state.sizes.length && !p.sizes.some((s) => state.sizes.includes(s))) return false;
      if (state.colors.length && !p.colors.some((c) => state.colors.includes(c.id))) return false;
      return true;
    });
    const sorters: Record<FilterState["sort"], (a: Product, b: Product) => number> = {
      featured: (a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order,
      newest: (a, b) => b.order - a.order,
      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price,
    };
    return [...list].sort(sorters[state.sort]);
  }, [state]);

  const count = filtered.length;

  return (
    <div className="page-top">
      {/* Encabezado */}
      <header className="u-container pb-10 pt-6 text-center">
        <p className="eyebrow">{t.collection.eyebrow}</p>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-tight text-cacao">
          {t.collection.title}
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-taupe">{t.collection.subtitle}</p>
      </header>

      <div className="u-container grid gap-10 pb-24 lg:grid-cols-[240px_1fr] lg:gap-14">
        <Filters
          state={state}
          set={set}
          onClear={clear}
          colorOptions={colorOptions}
          sizeOptions={sizeOptions}
          count={count}
        />

        <div>
          <div className="mb-8 flex items-center justify-between border-b border-[var(--line)] pb-4">
            <p className="text-sm text-taupe">
              <span className="tabular font-semibold text-cacao">{count}</span>{" "}
              {count === 1 ? t.collection.resultsOne : t.collection.resultsMany}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {count > 0 ? (
              <motion.div
                key={`${state.category}-${state.sort}-${state.sizes.join()}-${state.colors.join()}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <ProductGrid products={filtered} className="md:grid-cols-2 xl:grid-cols-3" />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-5 py-24 text-center"
              >
                <h3 className="font-display text-2xl text-cacao">{t.collection.empty.title}</h3>
                <p className="max-w-sm text-taupe">{t.collection.empty.body}</p>
                <Button onClick={clear} variant="ghost">
                  {t.collection.empty.cta}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
