"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { useScrollLock } from "@/lib/use-scroll-lock";
import LanguageToggle from "./LanguageToggle";
import Wordmark from "./Wordmark";

type LinkItem = { label: string; href: string };

export default function MobileMenu({
  open,
  onClose,
  links,
  catLinks,
}: {
  open: boolean;
  onClose: () => void;
  links: LinkItem[];
  catLinks: LinkItem[];
}) {
  const t = useT();
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] lg:hidden" aria-modal="true" role="dialog">
          <motion.div
            className="absolute inset-0 bg-nocturno/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-lino px-7 pb-[env(safe-area-inset-bottom)] pt-6 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between">
              <Wordmark className="text-xl" />
              <button
                onClick={onClose}
                aria-label={t.nav.close}
                className="grid h-10 w-10 place-items-center rounded-full text-cacao hover:bg-arena/70"
              >
                <X size={20} />
              </button>
            </div>

            <motion.nav
              className="mt-10 flex flex-1 flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
            >
              {links.map((l) => (
                <motion.div
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, x: 24 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={onClose}
                    className="block py-2 font-display text-3xl text-cacao transition-colors hover:text-arcilla"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-6 border-t border-[var(--line)] pt-5">
                <p className="eyebrow mb-3">{t.nav.collection}</p>
                <div className="flex flex-col gap-2">
                  {catLinks.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={onClose}
                      className="text-lg text-taupe transition-colors hover:text-cacao"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.nav>

            <div className="mt-6 flex items-center justify-between border-t border-[var(--line)] pt-5">
              <span className="text-sm text-taupe">{t.meta.tagline}</span>
              <LanguageToggle />
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
