"use client";

import { useLang } from "@/lib/i18n/context";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsappIcon } from "@/components/icons/BrandIcons";

export default function NewsletterSection() {
  const { t } = useLang();
  const w = t.whatsapp;

  return (
    <section id="newsletter" className="u-container py-20 md:py-28">
      <Reveal className="relative overflow-hidden rounded-[32px] border border-[var(--line)] bg-[radial-gradient(120%_140%_at_50%_-10%,var(--color-arena),var(--color-algodon))] px-6 py-16 text-center md:px-16 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-terracota-luz) 30%, transparent), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-xl">
          <p className="eyebrow">{w.eyebrow}</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.4rem)] leading-tight text-cacao">
            {w.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-taupe">{w.body}</p>
          <a
            href={whatsappLink(w.message)}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor={w.floatLabel}
            className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-terracota px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-algodon shadow-[0_14px_34px_-14px_rgba(192,103,74,0.8)] transition-transform duration-300 hover:scale-[1.03] active:scale-95"
          >
            <WhatsappIcon size={19} />
            {w.button}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
