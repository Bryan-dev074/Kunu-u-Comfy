"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SlidersHorizontal, X, Check } from "lucide-react";
import type { Bilingual } from "@/lib/types";
import { useLang } from "@/lib/i18n/context";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { cn, pick } from "@/lib/utils";

export type SortKey = "featured" | "newest" | "priceAsc" | "priceDesc";
export type CatKey = "all" | "adults" | "kids" | "family";

export type FilterState = {
  category: CatKey;
  sizes: string[];
  colors: string[];
  sort: SortKey;
};

type ColorOpt = { id: string; hex: string; name: Bilingual };

type Props = {
  state: FilterState;
  set: (patch: Partial<FilterState>) => void;
  onClear: () => void;
  colorOptions: ColorOpt[];
  sizeOptions: string[];
  count: number;
};

function FilterControls({ state, set, colorOptions, sizeOptions }: Omit<Props, "onClear" | "count">) {
  const { locale, t } = useLang();
  const cats: CatKey[] = ["all", "adults", "kids", "family"];
  const sorts: SortKey[] = ["featured", "newest", "priceAsc", "priceDesc"];

  const toggle = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="eyebrow mb-3">{t.collection.filters.category}</p>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => set({ category: c })}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                state.category === c
                  ? "border-terracota bg-terracota text-algodon"
                  : "border-[var(--line-strong)] text-cacao hover:border-cacao"
              )}
            >
              {t.collection.categories[c]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-3">{t.collection.filters.size}</p>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((s) => (
            <button
              key={s}
              onClick={() => set({ sizes: toggle(state.sizes, s) })}
              className={cn(
                "tabular min-w-10 rounded-full border px-3 py-1.5 text-sm transition-colors",
                state.sizes.includes(s)
                  ? "border-terracota bg-terracota text-algodon"
                  : "border-[var(--line-strong)] text-cacao hover:border-cacao"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-3">{t.collection.filters.color}</p>
        <div className="flex flex-wrap gap-2.5">
          {colorOptions.map((c) => {
            const on = state.colors.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => set({ colors: toggle(state.colors, c.id) })}
                aria-label={pick(c.name, locale)}
                aria-pressed={on}
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full ring-1 ring-inset ring-black/10 transition-all",
                  on ? "outline outline-2 outline-offset-2 outline-terracota" : "hover:scale-105"
                )}
                style={{ backgroundColor: c.hex }}
              >
                {on && <Check size={14} className="text-white drop-shadow" />}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-3">{t.collection.filters.sort}</p>
        <div className="flex flex-col gap-1.5">
          {sorts.map((s) => (
            <button
              key={s}
              onClick={() => set({ sort: s })}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors",
                state.sort === s ? "text-arcilla" : "text-taupe hover:text-cacao"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  state.sort === s ? "bg-terracota" : "bg-[var(--line-strong)]"
                )}
              />
              {t.collection.sort[s]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Filters(props: Props) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  useScrollLock(open);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-[calc(var(--header-h)+1rem)] hidden h-fit lg:block">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-cacao">{t.collection.filters.title}</h2>
          <button
            onClick={props.onClear}
            className="text-sm text-taupe underline-offset-4 hover:text-terracota hover:underline"
          >
            {t.collection.filters.clear}
          </button>
        </div>
        <div className="mt-6">
          <FilterControls {...props} />
        </div>
      </aside>

      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-algodon px-5 py-2.5 text-sm font-medium text-cacao lg:hidden"
      >
        <SlidersHorizontal size={16} />
        {t.collection.filters.title}
      </button>

      {/* Mobile bottom-sheet */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] lg:hidden" role="dialog" aria-modal="true">
            <motion.div
              className="absolute inset-0 bg-nocturno/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-lino px-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-3"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-arena-2" />
              <div className="flex items-center justify-between pb-4">
                <h2 className="font-display text-2xl text-cacao">{t.collection.filters.title}</h2>
                <button
                  onClick={() => setOpen(false)}
                  aria-label={t.nav.close}
                  className="grid h-9 w-9 place-items-center rounded-full text-cacao hover:bg-arena/70"
                >
                  <X size={18} />
                </button>
              </div>
              <FilterControls {...props} />
              <div className="mt-8 flex gap-3">
                <button
                  onClick={props.onClear}
                  className="flex-1 rounded-full border border-[var(--line-strong)] py-3 text-sm font-semibold text-cacao"
                >
                  {t.collection.filters.clear}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="flex-[2] rounded-full bg-terracota py-3 text-sm font-semibold uppercase tracking-widest text-algodon"
                >
                  {t.collection.filters.apply} ({props.count})
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
