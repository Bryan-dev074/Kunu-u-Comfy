"use client";

import { Wind, Sparkles, Gift, RefreshCw } from "lucide-react";
import { useLang } from "@/lib/i18n/context";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const ICONS = [Wind, Sparkles, Gift, RefreshCw];

export default function Benefits() {
  const { t } = useLang();

  return (
    <section className="u-container py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-[clamp(1.8rem,4.5vw,3rem)] text-cacao">
          {t.home.benefits.title}
        </h2>
      </Reveal>

      <Stagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {t.home.benefits.items.map((item, i) => {
          const Icon = ICONS[i] ?? Sparkles;
          return (
            <StaggerItem key={item.title}>
              <div className="flex flex-col items-start">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-arena/60 text-arcilla">
                  <Icon size={24} strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-xl text-cacao">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-taupe">{item.desc}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
