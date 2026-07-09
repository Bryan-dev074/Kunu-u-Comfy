"use client";

import { motion } from "motion/react";
import { useLang } from "@/lib/i18n/context";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsappIcon } from "@/components/icons/BrandIcons";

export default function FloatingWhatsApp() {
  const { t } = useLang();

  return (
    <motion.a
      href={whatsappLink(t.whatsapp.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.button}
      data-cursor={t.whatsapp.floatLabel}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.1, type: "spring", stiffness: 300, damping: 18 }}
      className="group fixed bottom-[4.75rem] right-4 z-[65] flex items-center sm:bottom-6 sm:right-6"
    >
      {/* Etiqueta que se despliega */}
      <span className="pointer-events-none mr-[-1.25rem] hidden max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-nocturno py-2.5 pl-4 pr-8 text-sm font-medium text-lino opacity-0 transition-all duration-500 group-hover:max-w-[220px] group-hover:opacity-100 sm:block">
        {t.whatsapp.floatLabel}
      </span>

      {/* Botón */}
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-terracota text-lino shadow-[0_14px_34px_-10px_rgba(192,103,74,0.8)] transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
        <span className="absolute inset-0 animate-ping rounded-full bg-terracota/40" style={{ animationDuration: "2.4s" }} />
        <WhatsappIcon size={26} />
        {/* Lunita de marca */}
        <svg viewBox="0 0 24 24" className="absolute -right-0.5 -top-0.5 h-4 w-4 text-algodon" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="var(--color-arcilla)" />
          <path d="M15.5 12a5 5 0 0 1-6-4.9 5 5 0 1 0 6 4.9Z" fill="currentColor" />
        </svg>
      </span>
    </motion.a>
  );
}
