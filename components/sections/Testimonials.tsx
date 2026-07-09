"use client";

import { Star } from "lucide-react";
import { useLang } from "@/lib/i18n/context";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export default function Testimonials() {
  const { t } = useLang();

  return (
    <section className="u-container py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{t.home.testimonials.eyebrow}</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] text-cacao">
          {t.home.testimonials.title}
        </h2>
      </Reveal>

      <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
        {t.home.testimonials.items.map((item) => (
          <StaggerItem key={item.author}>
            <figure className="flex h-full flex-col rounded-3xl border border-[var(--line)] bg-algodon p-8">
              <div className="flex gap-0.5 text-terracota">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-xl italic leading-snug text-cacao">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-semibold text-cacao">{item.author}</p>
                <p className="text-sm text-taupe">{item.role}</p>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
