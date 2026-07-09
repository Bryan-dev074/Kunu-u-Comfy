"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { products } from "@/lib/products";
import { useLang } from "@/lib/i18n/context";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { useMoney } from "@/lib/currency";
import { pick } from "@/lib/utils";
import ProductArt from "@/components/art/ProductArt";

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { locale, t } = useLang();
  const { format } = useMoney();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useScrollLock(open);

  useEffect(() => {
    if (open) {
      setQ("");
      const id = window.setTimeout(() => inputRef.current?.focus(), 120);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products.filter((p) => p.featured).slice(0, 4);
    return products
      .filter(
        (p) =>
          pick(p.name, locale).toLowerCase().includes(s) ||
          pick(p.tagline, locale).toLowerCase().includes(s)
      )
      .slice(0, 6);
  }, [q, locale]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[85]"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.search}
        >
          <motion.div
            className="absolute inset-0 bg-nocturno/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="absolute inset-x-0 top-0 mx-auto max-w-2xl px-4"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mt-[calc(var(--header-h)-1.5rem)] overflow-hidden rounded-3xl border border-[var(--line)] bg-lino shadow-[0_40px_90px_-30px_rgba(36,26,19,0.4)]">
              <div className="flex items-center gap-3 border-b border-[var(--line)] px-5">
                <Search size={20} className="text-arcilla" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={`${t.nav.search}…`}
                  className="h-16 flex-1 bg-transparent text-lg text-cacao outline-none placeholder:text-taupe/70"
                />
                <button
                  onClick={onClose}
                  aria-label={t.nav.close}
                  className="grid h-9 w-9 place-items-center rounded-full text-taupe hover:bg-arena/70 hover:text-cacao"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-3">
                {!q && (
                  <p className="px-3 pb-2 pt-1 text-xs uppercase tracking-[0.2em] text-taupe">
                    {t.home.featured.eyebrow}
                  </p>
                )}
                {results.length === 0 ? (
                  <p className="px-3 py-8 text-center text-taupe">
                    {t.collection.empty.title}
                  </p>
                ) : (
                  <ul className="flex flex-col">
                    {results.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/producto/${p.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-4 rounded-2xl p-2.5 transition-colors hover:bg-arena/50"
                        >
                          <span className="h-16 w-14 overflow-hidden rounded-xl bg-arena/50">
                            <ProductArt
                              garment={p.garment}
                              hex={p.colors[0].hex}
                              shade={p.colors[0].shade}
                              className="h-full w-full"
                            />
                          </span>
                          <span className="flex-1">
                            <span className="block font-display text-lg text-cacao">
                              {pick(p.name, locale)}
                            </span>
                            <span className="block text-sm text-taupe">
                              {pick(p.tagline, locale)}
                            </span>
                          </span>
                          <span className="tabular text-sm font-semibold text-arcilla">
                            {format(p.price)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
