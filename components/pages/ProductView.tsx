"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Truck, Heart, X, Check } from "lucide-react";
import { getProduct, getRelated } from "@/lib/products";
import type { Product } from "@/lib/types";
import { useLang } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart-context";
import { useMoney } from "@/lib/currency";
import { cn, pick } from "@/lib/utils";
import Gallery from "@/components/product/Gallery";
import Swatches from "@/components/product/Swatches";
import SizeSelector from "@/components/product/SizeSelector";
import Accordion from "@/components/ui/Accordion";
import ProductGrid from "@/components/product/ProductGrid";
import Badge from "@/components/ui/Badge";

const MEAS: Record<string, { chest: number; waist: number; hip: number }> = {
  XS: { chest: 84, waist: 66, hip: 90 },
  S: { chest: 90, waist: 72, hip: 96 },
  M: { chest: 96, waist: 78, hip: 102 },
  L: { chest: 104, waist: 86, hip: 110 },
  XL: { chest: 112, waist: 94, hip: 118 },
  "2": { chest: 53, waist: 51, hip: 55 },
  "4": { chest: 56, waist: 53, hip: 58 },
  "6": { chest: 59, waist: 55, hip: 62 },
  "8": { chest: 63, waist: 58, hip: 66 },
  "10": { chest: 67, waist: 61, hip: 71 },
};

export default function ProductView({ slug }: { slug: string }) {
  const product = getProduct(slug)!;
  const { locale, t } = useLang();
  const { add } = useCart();
  const { format, formatIn } = useMoney();

  const [colorId, setColorId] = useState(product.colors[0].id);
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const color = product.colors.find((c) => c.id === colorId) ?? product.colors[0];
  const related = getRelated(slug);
  const isKids = product.category === "kids";

  function handleAdd() {
    if (!size) {
      setError(true);
      return;
    }
    add({ slug: product.slug, colorId, size, qty: 1 });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <div className="page-top">
      <div className="u-container pb-32 lg:pb-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 pb-8 text-sm text-taupe" aria-label="breadcrumb">
          <Link href="/" className="hover:text-cacao">{t.product.home}</Link>
          <ChevronRight size={14} />
          <Link href="/coleccion" className="hover:text-cacao">{t.product.collection}</Link>
          <ChevronRight size={14} />
          <span className="text-cacao">{pick(product.name, locale)}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Gallery product={product} color={color} />

          {/* Info */}
          <div className="lg:py-2">
            {product.badges.length > 0 && (
              <div className="mb-4 flex gap-2">
                {product.badges.map((b) => (
                  <Badge key={b} type={b} />
                ))}
              </div>
            )}

            <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight text-cacao">
              {pick(product.name, locale)}
            </h1>
            <p className="mt-2 text-lg italic text-taupe">{pick(product.tagline, locale)}</p>

            <div className="mt-5 flex items-baseline gap-3">
              {product.compareAt && (
                <span className="tabular text-lg text-taupe line-through">
                  {format(product.compareAt)}
                </span>
              )}
              <span className="tabular font-display text-3xl text-cacao">
                {format(product.price)}
              </span>
            </div>
            <p className="tabular mt-1.5 text-sm text-taupe">
              {formatIn(product.price, "USD")} · {formatIn(product.price, "PYG")} ·{" "}
              {formatIn(product.price, "BRL")}
            </p>

            <div className="mt-8 space-y-7">
              <Swatches colors={product.colors} value={colorId} onChange={setColorId} />
              <SizeSelector
                sizes={product.sizes}
                value={size}
                onChange={(s) => {
                  setSize(s);
                  setError(false);
                }}
                error={error}
                onOpenGuide={() => setGuideOpen(true)}
              />
            </div>

            {/* Añadir + wishlist */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={handleAdd}
                className={cn(
                  "group relative flex-1 overflow-hidden rounded-full py-4 text-xs font-semibold uppercase tracking-[0.16em] text-algodon transition-colors",
                  justAdded ? "bg-arcilla" : "bg-terracota"
                )}
              >
                <span className="flex items-center justify-center gap-2">
                  {justAdded ? (
                    <>
                      <Check size={16} /> {t.product.added}
                    </>
                  ) : (
                    t.product.addToBag
                  )}
                </span>
              </button>
              <button
                aria-label={t.product.wishlist}
                className="grid h-[54px] w-[54px] shrink-0 place-items-center rounded-full border border-[var(--line-strong)] text-cacao transition-colors hover:border-terracota hover:text-terracota"
              >
                <Heart size={20} />
              </button>
            </div>

            {/* Nota de fit */}
            <p className="mt-5 flex items-start gap-2 text-sm text-taupe">
              <Truck size={17} className="mt-0.5 shrink-0 text-arcilla" />
              {isKids ? t.product.modelNoteKids : t.product.modelNote}
            </p>

            {/* Acordeón */}
            <div className="mt-8">
              <Accordion
                defaultOpen={0}
                items={[
                  {
                    title: t.product.tabs.description,
                    content: pick(product.description, locale),
                  },
                  {
                    title: t.product.tabs.composition,
                    content: pick(product.composition, locale),
                  },
                  {
                    title: t.product.tabs.shipping,
                    content: t.product.shippingInfo,
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Completá el look */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="mb-10 text-center font-display text-[clamp(1.8rem,4vw,3rem)] text-cacao">
              {t.product.completeLook}
            </h2>
            <ProductGrid products={related} className="md:grid-cols-3 xl:grid-cols-3" />
          </section>
        )}
      </div>

      {/* Barra sticky móvil */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-lino/90 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-3">
          <span className="tabular font-display text-xl text-cacao">
            {format(product.price)}
          </span>
          <button
            onClick={handleAdd}
            className={cn(
              "flex-1 rounded-full py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-algodon transition-colors",
              justAdded ? "bg-arcilla" : "bg-terracota"
            )}
          >
            {justAdded ? t.product.added : t.product.addToBag}
          </button>
        </div>
      </div>

      {/* Guía de tallas */}
      <AnimatePresence>
        {guideOpen && (
          <SizeGuideModal product={product} onClose={() => setGuideOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function SizeGuideModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { t } = useLang();
  const m = t.product.sizeGuideModal;
  return (
    <motion.div className="fixed inset-0 z-[85] flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true">
      <motion.div
        className="absolute inset-0 bg-nocturno/45 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="relative w-full max-w-lg overflow-hidden rounded-t-3xl bg-lino p-7 sm:rounded-3xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-2xl text-cacao">{m.title}</h3>
            <p className="mt-1 text-sm text-taupe">{m.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            aria-label={m.close}
            className="grid h-9 w-9 place-items-center rounded-full text-cacao hover:bg-arena/70"
          >
            <X size={18} />
          </button>
        </div>

        <table className="mt-6 w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--line-strong)] text-left text-taupe">
              <th className="py-2 font-medium">{m.colSize}</th>
              <th className="py-2 font-medium">{m.colChest}</th>
              <th className="py-2 font-medium">{m.colWaist}</th>
              <th className="py-2 font-medium">{m.colHip}</th>
            </tr>
          </thead>
          <tbody className="tabular">
            {product.sizes.map((s) => {
              const meas = MEAS[s];
              return (
                <tr key={s} className="border-b border-[var(--line)]">
                  <td className="py-2.5 font-semibold text-cacao">{s}</td>
                  <td className="py-2.5 text-cacao-70">{meas?.chest ?? "—"}</td>
                  <td className="py-2.5 text-cacao-70">{meas?.waist ?? "—"}</td>
                  <td className="py-2.5 text-cacao-70">{meas?.hip ?? "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-6 rounded-2xl bg-arena/50 p-4">
          <p className="text-sm font-semibold text-cacao">{m.howTitle}</p>
          <p className="mt-1 text-sm text-taupe">{m.how}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
