"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Lock, ShoppingBag, Check, Info } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useLang } from "@/lib/i18n/context";
import { getProduct } from "@/lib/products";
import { useMoney } from "@/lib/currency";
import { pick, cn } from "@/lib/utils";
import ProductArt from "@/components/art/ProductArt";
import Button from "@/components/ui/Button";
import Wordmark from "@/components/chrome/Wordmark";

const FREE_SHIP = 120;

export default function CheckoutView() {
  const { items, subtotal, clear } = useCart();
  const { locale, t } = useLang();
  const { format } = useMoney();

  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [processing, setProcessing] = useState(false);
  const [order, setOrder] = useState<string | null>(null);

  const shipping = subtotal >= FREE_SHIP || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  function fmtCard(v: string) {
    return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }
  function fmtExp(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  }

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);
    window.setTimeout(() => {
      const code =
        "KU-" +
        Math.floor(100000 + Math.random() * 899999).toString(36).toUpperCase().slice(0, 6);
      setOrder(code);
      setProcessing(false);
      clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1300);
  }

  /* ---------- Confirmación ---------- */
  if (order) {
    return (
      <div className="page-top u-container flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <motion.span
          className="grid h-24 w-24 place-items-center rounded-full bg-terracota text-algodon"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <Check size={44} strokeWidth={2.4} />
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <p className="eyebrow mt-8">{t.checkout.confirmation.eyebrow}</p>
          <h1 className="mx-auto mt-4 max-w-2xl font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-tight text-cacao">
            {t.checkout.confirmation.title}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-taupe">{t.checkout.confirmation.body}</p>
          <p className="mt-6 inline-block rounded-full border border-[var(--line-strong)] bg-algodon px-5 py-2 text-sm">
            {t.checkout.confirmation.order}{" "}
            <span className="tabular font-semibold text-arcilla">{order}</span>
          </p>
          <div className="mt-9 flex justify-center">
            <Button href="/coleccion" size="lg" magnetic>
              {t.checkout.confirmation.cta}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ---------- Carrito vacío ---------- */
  if (items.length === 0) {
    return (
      <div className="page-top u-container flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-arena/60 text-arcilla">
          <ShoppingBag size={30} />
        </span>
        <p className="font-display text-2xl text-cacao">{t.cart.empty}</p>
        <Button href="/coleccion" variant="primary">
          {t.cart.emptyCta}
        </Button>
      </div>
    );
  }

  /* ---------- Checkout ---------- */
  return (
    <div className="page-top">
      <div className="u-container pb-24">
        <h1 className="pb-3 font-display text-[clamp(2.2rem,5vw,3.4rem)] text-cacao">
          {t.checkout.title}
        </h1>
        <p className="mb-10 flex items-center gap-2 rounded-xl bg-arena/50 px-4 py-2.5 text-sm text-cacao-70">
          <Info size={16} className="shrink-0 text-arcilla" />
          {t.checkout.demoNote}
        </p>

        <form onSubmit={placeOrder} className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Formulario */}
          <div className="flex flex-col gap-12">
            {/* Contacto */}
            <Section num="1" title={t.checkout.contact.title}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t.checkout.contact.email}>
                  <input required type="email" inputMode="email" autoComplete="email" className="luxe-input" />
                </Field>
                <Field label={t.checkout.contact.phone}>
                  <input type="tel" inputMode="tel" autoComplete="tel" className="luxe-input" />
                </Field>
              </div>
            </Section>

            {/* Entrega */}
            <Section num="2" title={t.checkout.delivery.title}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t.checkout.delivery.firstName}>
                  <input required autoComplete="given-name" className="luxe-input" />
                </Field>
                <Field label={t.checkout.delivery.lastName}>
                  <input required autoComplete="family-name" className="luxe-input" />
                </Field>
                <Field label={t.checkout.delivery.address} className="sm:col-span-2">
                  <input required autoComplete="street-address" className="luxe-input" />
                </Field>
                <Field label={t.checkout.delivery.city}>
                  <input required autoComplete="address-level2" className="luxe-input" />
                </Field>
                <Field label={t.checkout.delivery.state}>
                  <input autoComplete="address-level1" className="luxe-input" />
                </Field>
                <Field label={t.checkout.delivery.zip}>
                  <input required inputMode="numeric" autoComplete="postal-code" className="luxe-input" />
                </Field>
                <Field label={t.checkout.delivery.country}>
                  <input required autoComplete="country-name" defaultValue={locale === "pt" ? "Brasil" : "Argentina"} className="luxe-input" />
                </Field>
              </div>
            </Section>

            {/* Pago */}
            <Section num="3" title={t.checkout.payment.title}>
              {/* Wallets */}
              <div className="grid grid-cols-3 gap-3">
                <WalletBtn className="bg-nocturno text-lino"> Pay</WalletBtn>
                <WalletBtn className="border border-[var(--line-strong)] bg-white text-cacao">G Pay</WalletBtn>
                <WalletBtn className="bg-terracota text-algodon">Kunu&apos;u</WalletBtn>
              </div>

              <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-widest text-taupe">
                <span className="h-px flex-1 bg-[var(--line)]" />
                {t.checkout.payment.or}
                <span className="h-px flex-1 bg-[var(--line)]" />
              </div>

              {/* Preview de tarjeta */}
              <CardPreview number={card} name={name} exp={exp} />

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label={t.checkout.payment.cardNumber} className="sm:col-span-2">
                  <input
                    inputMode="numeric"
                    placeholder="4242 4242 4242 4242"
                    value={card}
                    onChange={(e) => setCard(fmtCard(e.target.value))}
                    className="luxe-input tabular"
                  />
                </Field>
                <Field label={t.checkout.payment.cardName} className="sm:col-span-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="cc-name"
                    className="luxe-input"
                  />
                </Field>
                <Field label={t.checkout.payment.expiry}>
                  <input
                    inputMode="numeric"
                    placeholder="08/28"
                    value={exp}
                    onChange={(e) => setExp(fmtExp(e.target.value))}
                    className="luxe-input tabular"
                  />
                </Field>
                <Field label={t.checkout.payment.cvc}>
                  <input
                    inputMode="numeric"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className="luxe-input tabular"
                  />
                </Field>
              </div>

              <p className="mt-5 flex items-center gap-2 text-sm text-taupe">
                <Lock size={15} className="text-arcilla" /> {t.checkout.payment.secure}
              </p>
            </Section>
          </div>

          {/* Resumen */}
          <aside className="lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:h-fit">
            <div className="rounded-3xl border border-[var(--line)] bg-algodon p-6">
              <h2 className="font-display text-xl text-cacao">{t.checkout.summary.title}</h2>
              <ul className="mt-5 flex flex-col gap-4">
                {items.map((it) => {
                  const p = getProduct(it.slug);
                  if (!p) return null;
                  const color = p.colors.find((c) => c.id === it.colorId) ?? p.colors[0];
                  return (
                    <li key={`${it.slug}-${it.colorId}-${it.size}`} className="flex gap-3">
                      <span className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-arena/50">
                        <ProductArt garment={p.garment} hex={color.hex} shade={color.shade} className="h-full w-full" />
                        <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-cacao text-[0.6rem] font-bold text-lino">
                          {it.qty}
                        </span>
                      </span>
                      <div className="flex flex-1 flex-col">
                        <span className="font-display text-sm leading-tight text-cacao">
                          {pick(p.name, locale)}
                        </span>
                        <span className="text-xs text-taupe">
                          {pick(color.name, locale)} · {it.size}
                        </span>
                        <span className="tabular mt-auto text-sm font-semibold text-cacao">
                          {format(p.price * it.qty)}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 space-y-2 border-t border-[var(--line)] pt-5 text-sm">
                <Row label={t.checkout.summary.subtotal} value={format(subtotal)} />
                <Row
                  label={t.checkout.summary.shipping}
                  value={shipping === 0 ? t.checkout.summary.free : format(shipping)}
                />
                <div className="flex items-center justify-between border-t border-[var(--line)] pt-3 text-base">
                  <span className="font-medium text-cacao">{t.checkout.summary.total}</span>
                  <span className="tabular font-display text-2xl text-cacao">
                    {format(total)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className={cn(
                  "mt-6 w-full rounded-full py-4 text-xs font-semibold uppercase tracking-[0.16em] text-algodon transition-all",
                  processing ? "bg-arcilla" : "bg-terracota hover:scale-[1.01] active:scale-95"
                )}
              >
                {processing ? t.checkout.processing : t.checkout.placeOrder}
              </button>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}

/* ---------- Subcomponentes ---------- */

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-6 flex items-center gap-3 font-display text-2xl text-cacao">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-terracota text-sm font-semibold text-algodon">
          {num}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-taupe">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-taupe">{label}</span>
      <span className="tabular text-cacao">{value}</span>
    </div>
  );
}

function WalletBtn({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center rounded-xl py-3 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95",
        className
      )}
    >
      {children}
    </button>
  );
}

function CardPreview({ number, name, exp }: { number: string; name: string; exp: string }) {
  const { t } = useLang();
  const shown = number || "•••• •••• •••• ••••";
  return (
    <div className="relative aspect-[1.6/1] w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-terracota via-arcilla to-nocturno p-5 text-lino shadow-[0_24px_50px_-20px_rgba(151,72,47,0.6)]">
      <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10" />
      <div className="flex items-center justify-between">
        <Wordmark className="text-base text-lino" />
        <span className="text-xs uppercase tracking-widest text-lino/70">Kunu&apos;u Pay</span>
      </div>
      <div className="mt-5 h-8 w-11 rounded-md bg-gradient-to-br from-lino/70 to-lino/30" />
      <p className="tabular mt-4 text-lg tracking-[0.12em] text-lino/95">{shown}</p>
      <div className="mt-3 flex items-end justify-between text-xs">
        <span className="uppercase tracking-wide text-lino/90">
          {name || t.checkout.payment.cardName}
        </span>
        <span className="tabular text-lino/80">{exp || "MM/AA"}</span>
      </div>
    </div>
  );
}
