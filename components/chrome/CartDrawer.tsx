"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useLang } from "@/lib/i18n/context";
import { getProduct } from "@/lib/products";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { useMoney } from "@/lib/currency";
import { pick, tpl } from "@/lib/utils";
import ProductImage from "@/components/product/ProductImage";
import Button from "@/components/ui/Button";

const FREE_SHIP = 120;

export default function CartDrawer() {
  const { items, isOpen, close, setQty, remove, subtotal, count } = useCart();
  const { locale, t } = useLang();
  const { format } = useMoney();
  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const remaining = Math.max(0, FREE_SHIP - subtotal);
  const progress = Math.min(1, subtotal / FREE_SHIP);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label={t.cart.title}>
          <motion.div
            className="absolute inset-0 bg-nocturno/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-lino shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--line)] px-6 py-5">
              <h2 className="font-display text-2xl text-cacao">
                {t.cart.title}
                {count > 0 && <span className="ml-2 text-base text-taupe">({count})</span>}
              </h2>
              <button
                onClick={close}
                aria-label={t.nav.close}
                className="grid h-10 w-10 place-items-center rounded-full text-cacao hover:bg-arena/70"
              >
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-arena/60 text-arcilla">
                  <ShoppingBag size={30} />
                </span>
                <div>
                  <p className="font-display text-2xl text-cacao">{t.cart.empty}</p>
                  <p className="mt-2 text-taupe">{t.cart.emptyBody}</p>
                </div>
                <Button href="/coleccion" onClick={close} variant="primary">
                  {t.cart.emptyCta}
                </Button>
              </div>
            ) : (
              <>
                {/* Barra de envío gratis */}
                <div className="border-b border-[var(--line)] px-6 py-4">
                  <p className="mb-2 text-center text-sm text-cacao">
                    {remaining > 0
                      ? tpl(t.cart.freeShippingProgress, {
                          amount: format(remaining),
                        })
                      : t.cart.freeShippingReached}
                  </p>
                  <div className="h-1.5 overflow-hidden rounded-full bg-arena">
                    <motion.div
                      className="h-full rounded-full bg-terracota"
                      initial={false}
                      animate={{ width: `${progress * 100}%` }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="flex flex-col gap-5">
                    <AnimatePresence initial={false}>
                      {items.map((item) => {
                        const p = getProduct(item.slug);
                        if (!p) return null;
                        const color = p.colors.find((c) => c.id === item.colorId) ?? p.colors[0];
                        return (
                          <motion.li
                            key={`${item.slug}-${item.colorId}-${item.size}`}
                            layout
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="flex gap-4"
                          >
                            <Link
                              href={`/producto/${p.slug}`}
                              onClick={close}
                              className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-arena/50"
                            >
                              <ProductImage
                                product={p}
                                color={color}
                                className="h-full w-full"
                                sizes="96px"
                              />
                            </Link>
                            <div className="flex flex-1 flex-col">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <Link
                                    href={`/producto/${p.slug}`}
                                    onClick={close}
                                    className="font-display text-lg leading-tight text-cacao"
                                  >
                                    {pick(p.name, locale)}
                                  </Link>
                                  <p className="mt-0.5 text-xs text-taupe">
                                    {pick(color.name, locale)} · {t.common.size} {item.size}
                                  </p>
                                </div>
                                <button
                                  onClick={() => remove(item.slug, item.colorId, item.size)}
                                  aria-label={t.cart.remove}
                                  className="text-taupe transition-colors hover:text-terracota"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                              <div className="mt-auto flex items-center justify-between pt-2">
                                <div className="flex items-center gap-3 rounded-full border border-[var(--line-strong)] px-1">
                                  <button
                                    onClick={() =>
                                      setQty(item.slug, item.colorId, item.size, item.qty - 1)
                                    }
                                    aria-label="-"
                                    className="grid h-7 w-7 place-items-center text-cacao hover:text-terracota"
                                  >
                                    <Minus size={13} />
                                  </button>
                                  <span className="tabular w-4 text-center text-sm">{item.qty}</span>
                                  <button
                                    onClick={() =>
                                      setQty(item.slug, item.colorId, item.size, item.qty + 1)
                                    }
                                    aria-label="+"
                                    className="grid h-7 w-7 place-items-center text-cacao hover:text-terracota"
                                  >
                                    <Plus size={13} />
                                  </button>
                                </div>
                                <span className="tabular font-semibold text-cacao">
                                  {format(p.price * item.qty)}
                                </span>
                              </div>
                            </div>
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                  </ul>
                </div>

                {/* Footer */}
                <div className="border-t border-[var(--line)] px-6 py-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-taupe">{t.cart.subtotal}</span>
                    <span className="tabular font-display text-2xl text-cacao">
                      {format(subtotal)}
                    </span>
                  </div>
                  <Button href="/checkout" onClick={close} variant="primary" size="lg" className="w-full">
                    {t.cart.checkout}
                  </Button>
                  <button
                    onClick={close}
                    className="mt-3 w-full text-center text-sm text-taupe underline-offset-4 hover:text-cacao hover:underline"
                  >
                    {t.cart.continueShopping}
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
