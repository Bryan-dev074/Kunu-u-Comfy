"use client";

import { useState } from "react";
import { MessageCircle, Mail, Clock, Check } from "lucide-react";
import { useLang } from "@/lib/i18n/context";
import { Reveal } from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";

export default function ContactView() {
  const { t } = useLang();
  const c = t.contact;
  const [sent, setSent] = useState(false);

  const channels = [
    { icon: MessageCircle, label: c.channels.whatsapp, value: c.channels.whatsappValue },
    { icon: Mail, label: c.channels.email, value: c.channels.emailValue },
    { icon: Clock, label: c.channels.hours, value: c.channels.hoursValue },
  ];

  return (
    <div className="page-top">
      <header className="u-container pb-12 pt-8 text-center">
        <Reveal>
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-tight text-cacao">
            {c.title}
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-taupe">{c.subtitle}</p>
        </Reveal>
      </header>

      <div className="u-container grid gap-14 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        {/* Formulario */}
        <Reveal>
          {sent ? (
            <div className="flex h-full min-h-64 flex-col items-center justify-center gap-4 rounded-3xl border border-[var(--line)] bg-algodon p-10 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-arena/70 text-arcilla">
                <Check size={30} />
              </span>
              <p className="font-display text-2xl text-cacao">{c.form.sent}</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="flex flex-col gap-5"
            >
              <Field label={c.form.name}>
                <input required className="luxe-input" type="text" />
              </Field>
              <Field label={c.form.email}>
                <input required className="luxe-input" type="email" />
              </Field>
              <Field label={c.form.message}>
                <textarea required rows={5} className="luxe-input resize-none" />
              </Field>
              <button
                type="submit"
                className="mt-2 self-start rounded-full bg-terracota px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-algodon transition-transform hover:scale-[1.02] active:scale-95"
              >
                {c.form.send}
              </button>
            </form>
          )}
        </Reveal>

        {/* Canales */}
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-4">
            <p className="eyebrow">{c.channels.title}</p>
            {channels.map((ch) => (
              <div
                key={ch.label}
                className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-algodon p-5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-arena/70 text-arcilla">
                  <ch.icon size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-taupe">{ch.label}</p>
                  <p className="mt-0.5 font-medium text-cacao">{ch.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* FAQ */}
      <section className="border-t border-[var(--line)] bg-algodon/40 py-20">
        <div className="u-container max-w-3xl">
          <Reveal className="mb-8 text-center">
            <h2 className="font-display text-[clamp(1.9rem,4.5vw,3rem)] text-cacao">
              {c.faq.title}
            </h2>
          </Reveal>
          <Reveal>
            <Accordion
              items={c.faq.items.map((item) => ({ title: item.q, content: item.a }))}
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-taupe">{label}</span>
      {children}
    </label>
  );
}
