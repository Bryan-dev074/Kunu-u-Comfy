"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ColorOption, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import ProductImage from "./ProductImage";

const VIEWS = ["front", "detail"] as const;

export default function Gallery({
  product,
  color,
}: {
  product: Product;
  color: ColorOption;
}) {
  const [view, setView] = useState<(typeof VIEWS)[number]>("front");

  return (
    <div className="lg:sticky lg:top-[calc(var(--header-h)+1rem)]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-arena/40 shadow-[0_40px_90px_-40px_rgba(36,26,19,0.35)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${color.id}-${view}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <ProductImage
              product={product}
              color={color}
              view={view}
              className="h-full w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex gap-3">
        {VIEWS.map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            aria-label={v}
            className={cn(
              "aspect-[4/5] w-20 overflow-hidden rounded-xl bg-arena/40 ring-2 transition",
              view === v ? "ring-terracota" : "ring-transparent hover:ring-[var(--line-strong)]"
            )}
          >
            <ProductImage
              product={product}
              color={color}
              view={v}
              className="h-full w-full"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
