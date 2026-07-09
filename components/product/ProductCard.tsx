"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { useLang } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart-context";
import { formatPrice, pick, cn } from "@/lib/utils";
import ProductArt from "@/components/art/ProductArt";
import Badge from "@/components/ui/Badge";

export default function ProductCard({
  product,
  priority,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { locale, t } = useLang();
  const { add } = useCart();
  const [ci, setCi] = useState(0);
  const [quickOpen, setQuickOpen] = useState(false);
  const color = product.colors[ci];
  const href = `/producto/${product.slug}`;

  function quickAdd(size: string) {
    add({ slug: product.slug, colorId: color.id, size, qty: 1 });
    setQuickOpen(false);
  }

  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-arena/40">
        <Link
          href={href}
          aria-label={pick(product.name, locale)}
          className="absolute inset-0 z-[1]"
        >
          <ProductArt
            garment={product.garment}
            hex={color.hex}
            shade={color.shade}
            view="front"
            className="absolute inset-0 h-full w-full transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05] group-hover:opacity-0"
          />
          <ProductArt
            garment={product.garment}
            hex={color.hex}
            shade={color.shade}
            view="detail"
            className="absolute inset-0 h-full w-full scale-[1.05] opacity-0 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>

        {/* Badges */}
        {product.badges.length > 0 && (
          <div className="pointer-events-none absolute left-3 top-3 z-[2] flex flex-col items-start gap-1.5">
            {product.badges.map((b) => (
              <Badge key={b} type={b} />
            ))}
          </div>
        )}

        {/* Quick add */}
        <div className="absolute inset-x-3 bottom-3 z-[3]">
          <AnimatePresence mode="wait">
            {quickOpen ? (
              <motion.div
                key="sizes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="glass flex items-center justify-center gap-1 rounded-full p-1.5"
              >
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => quickAdd(s)}
                    className="tabular min-w-8 rounded-full px-2 py-1.5 text-xs font-semibold text-cacao transition-colors hover:bg-terracota hover:text-algodon"
                  >
                    {s}
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.button
                key="btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={() => setQuickOpen(true)}
                data-cursor={t.common.quickAdd}
                className="glass flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cacao opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-lg:opacity-100"
              >
                <Plus size={15} /> {t.common.quickAdd}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link href={href} className="link-underline font-display text-lg leading-tight text-cacao">
            {pick(product.name, locale)}
          </Link>
          <p className="mt-0.5 truncate text-sm text-taupe">{pick(product.tagline, locale)}</p>
        </div>
        <div className="shrink-0 text-right">
          {product.compareAt && (
            <span className="tabular mr-1 text-xs text-taupe line-through">
              {formatPrice(product.compareAt, locale)}
            </span>
          )}
          <span className="tabular font-semibold text-cacao">
            {formatPrice(product.price, locale)}
          </span>
        </div>
      </div>

      {/* Swatches */}
      {product.colors.length > 1 && (
        <div className="mt-2.5 flex items-center gap-1.5">
          {product.colors.map((c, i) => (
            <button
              key={c.id}
              onMouseEnter={() => setCi(i)}
              onFocus={() => setCi(i)}
              onClick={() => setCi(i)}
              aria-label={pick(c.name, locale)}
              className={cn(
                "h-4 w-4 rounded-full ring-1 ring-inset ring-black/10 transition-transform",
                i === ci ? "scale-110 outline outline-1 outline-offset-2 outline-terracota" : "hover:scale-110"
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      )}
    </article>
  );
}
