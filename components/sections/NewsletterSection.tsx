"use client";

import { useLang } from "@/lib/i18n/context";
import { Reveal } from "@/components/ui/Reveal";
import NewsletterForm from "@/components/ui/NewsletterForm";

export default function NewsletterSection() {
  const { t } = useLang();
  const n = t.home.newsletter;

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
          <p className="eyebrow">{n.eyebrow}</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.4rem)] leading-tight text-cacao">
            {n.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-taupe">{n.body}</p>
          <NewsletterForm
            placeholder={n.placeholder}
            button={n.button}
            success={n.success}
            className="mx-auto mt-8 max-w-md"
          />
          <p className="mt-4 text-xs text-taupe/80">{n.disclaimer}</p>
        </div>
      </Reveal>
    </section>
  );
}
