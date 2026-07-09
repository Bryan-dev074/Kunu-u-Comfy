"use client";

import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import NewsletterForm from "@/components/ui/NewsletterForm";
import Wordmark from "./Wordmark";
import LanguageToggle from "./LanguageToggle";

export default function Footer() {
  const t = useT();
  const year = 2026;

  const columns = [
    {
      title: t.footer.shop.title,
      links: t.footer.shop.links,
      hrefs: [
        "/coleccion?cat=adults",
        "/coleccion?cat=kids",
        "/coleccion?cat=family",
        "/lookbook",
        "/coleccion",
      ],
    },
    {
      title: t.footer.help.title,
      links: t.footer.help.links,
      hrefs: ["/contacto", "/contacto", "/contacto", "/contacto", "/contacto"],
    },
    {
      title: t.footer.brand.title,
      links: t.footer.brand.links,
      hrefs: ["/nosotros", "/nosotros", "/nosotros", "#newsletter"],
    },
  ];

  return (
    <footer className="relative mt-24 bg-nocturno text-lino/80">
      <div className="u-container grid gap-12 py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Marca + newsletter */}
        <div>
          <Wordmark className="text-2xl text-lino" showComfy />
          <p className="mt-5 max-w-xs text-lino/60">{t.footer.tagline}</p>
          <p className="mt-8 mb-3 text-xs uppercase tracking-[0.2em] text-lino/50">
            {t.footer.newsletterTitle}
          </p>
          <NewsletterForm
            variant="dark"
            placeholder={t.footer.newsletterPlaceholder}
            button={t.footer.newsletterButton}
            success={t.home.newsletter.success}
            className="max-w-sm"
          />
          <div className="mt-7 flex gap-3">
            {[Instagram, Facebook, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social"
                className="grid h-10 w-10 place-items-center rounded-full border border-lino/15 text-lino/70 transition-colors hover:border-terracota hover:bg-terracota hover:text-lino"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Columnas */}
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-lino/50">
              {col.title}
            </p>
            <ul className="flex flex-col gap-3">
              {col.links.map((label, i) => (
                <li key={label}>
                  <Link
                    href={col.hrefs[i] ?? "#"}
                    className="text-sm text-lino/70 transition-colors hover:text-terracota-hi"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-lino/10">
        <div className="u-container flex flex-col items-center justify-between gap-4 py-6 text-xs text-lino/45 sm:flex-row">
          <p>
            © {year} Kunu&apos;u Comfy. {t.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <span className="hidden sm:inline">{t.footer.madeWith}</span>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
