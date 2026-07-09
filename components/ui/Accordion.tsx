"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = { title: string; content: React.ReactNode };

export default function Accordion({
  items,
  className,
  defaultOpen = null,
}: {
  items: AccordionItem[];
  className?: string;
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className={cn("divide-y divide-[var(--line)]", className)}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-[family-name:var(--font-display)] text-lg text-cacao">
                {it.title}
              </span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] text-arcilla transition-colors">
                {isOpen ? <Minus size={15} /> : <Plus size={15} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-8 leading-relaxed text-taupe">
                    {it.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
