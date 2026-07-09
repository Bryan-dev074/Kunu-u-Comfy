"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/lib/i18n/context";

/** Velo cálido y sutil durante el cambio de idioma. */
export default function SwitchVeil() {
  const { switching } = useLang();
  return (
    <AnimatePresence>
      {switching && (
        <motion.div
          key="switch-veil"
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[95] bg-[radial-gradient(circle_at_50%_40%,var(--color-algodon),var(--color-lino))]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.66 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </AnimatePresence>
  );
}
