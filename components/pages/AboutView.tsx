"use client";

import { Leaf, HandHeart, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n/context";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import ProductArt from "@/components/art/ProductArt";

const VALUE_ICONS = [Leaf, HandHeart, Sparkles];

export default function AboutView() {
  const { t } = useLang();
  const a = t.about;

  return (
    <div className="page-top">
      {/* Hero */}
      <header className="u-container pb-14 pt-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{a.eyebrow}</p>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,5.2rem)] leading-[1.03] text-cacao">
            {a.title}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg italic text-taupe">{a.intro}</p>
        </Reveal>
      </header>

      {/* Historia */}
      <section className="u-container grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="overflow-hidden rounded-[28px] bg-arena/40 shadow-[0_50px_110px_-50px_rgba(36,26,19,0.4)]">
            <ProductArt garment="robe" hex="#C0674A" shade="#97482F" className="aspect-[4/5] w-full" />
          </div>
        </Reveal>
        <div className="flex flex-col gap-5">
          {a.story.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-lg leading-relaxed text-cacao-70">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Valores */}
      <section className="u-container py-16 md:py-24">
        <Reveal className="mb-12 text-center">
          <h2 className="font-display text-[clamp(1.9rem,4.5vw,3rem)] text-cacao">{a.values.title}</h2>
        </Reveal>
        <Stagger className="grid gap-8 md:grid-cols-3">
          {a.values.items.map((item, i) => {
            const Icon = VALUE_ICONS[i] ?? Sparkles;
            return (
              <StaggerItem key={item.title}>
                <div className="flex h-full flex-col rounded-3xl border border-[var(--line)] bg-algodon p-8">
                  <span className="grid h-13 w-13 place-items-center rounded-2xl bg-arena/70 p-3 text-arcilla">
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

      {/* Materiales */}
      <section className="bg-nocturno text-lino">
        <div className="u-container grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow text-terracota-hi">{a.materials.eyebrow}</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.6rem)] leading-tight text-lino">
              {a.materials.title}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-lino/70">{a.materials.body}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[28px] shadow-[0_50px_110px_-40px_rgba(0,0,0,0.6)]">
              <ProductArt garment="set-long" hex="#E4D5BE" shade="#B89A6D" view="detail" className="aspect-[4/3] w-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cierre */}
      <section className="u-container py-24 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-display text-[clamp(2rem,5vw,3.6rem)] leading-tight text-cacao">
            {a.closing.title}
          </h2>
          <div className="mt-9 flex justify-center">
            <Button href="/coleccion" size="lg" magnetic>
              {a.closing.cta}
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
