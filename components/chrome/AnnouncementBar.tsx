"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useT } from "@/lib/i18n/context";

export default function AnnouncementBar() {
  const t = useT();
  const msgs = t.announce;
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setI((v) => (v + 1) % msgs.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [msgs.length]);

  const safe = i % msgs.length;

  return (
    <div className="bg-nocturno text-lino/85">
      <div className="u-container flex h-9 items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={msgs[safe]}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center text-[0.66rem] font-medium uppercase tracking-[0.22em]"
          >
            {msgs[safe]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
