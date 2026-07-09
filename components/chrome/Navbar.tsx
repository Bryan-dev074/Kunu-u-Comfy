"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import LanguageToggle from "./LanguageToggle";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";
import Wordmark from "./Wordmark";

export default function Navbar() {
  const t = useT();
  const pathname = usePathname();
  const { count, open, bump } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !isHome || scrolled;

  const links = [
    { label: t.nav.collection, href: "/coleccion" },
    { label: t.nav.lookbook, href: "/lookbook" },
    { label: t.nav.about, href: "/nosotros" },
    { label: t.nav.contact, href: "/contacto" },
  ];

  const catLinks = [
    { label: t.nav.adults, href: "/coleccion?cat=adults" },
    { label: t.nav.kids, href: "/coleccion?cat=kids" },
    { label: t.nav.family, href: "/coleccion?cat=family" },
  ];

  return (
    <>
      <div
        className={cn(
          "transition-all duration-500",
          solid
            ? "border-b border-[var(--line)] bg-lino/80 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <nav
          className="u-container flex items-center justify-between"
          style={{ height: "var(--nav-h)" }}
          aria-label="Principal"
        >
            {/* Izquierda: menú móvil */}
            <div className="flex flex-1 items-center gap-2 lg:hidden">
              <button
                onClick={() => setMenuOpen(true)}
                aria-label={t.nav.openMenu}
                className="grid h-10 w-10 place-items-center rounded-full text-cacao transition-colors hover:bg-arena/60"
              >
                <Menu size={20} />
              </button>
            </div>

            {/* Links desktop (izquierda) */}
            <div className="hidden flex-1 items-center gap-7 lg:flex">
              <div className="group relative">
                <Link
                  href="/coleccion"
                  className="link-underline py-2 text-[0.82rem] font-medium tracking-wide text-cacao"
                >
                  {t.nav.collection}
                </Link>
                <div className="invisible absolute left-0 top-full w-52 translate-y-1 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="glass rounded-2xl p-2 shadow-[0_24px_60px_-24px_rgba(36,26,19,0.3)]">
                    {catLinks.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block rounded-xl px-4 py-2.5 text-sm text-cacao transition-colors hover:bg-arena/70 hover:text-arcilla"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {links.slice(1).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="link-underline py-2 text-[0.82rem] font-medium tracking-wide text-cacao"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Centro: marca */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2"
              aria-label={t.meta.brand}
            >
              <Wordmark className="text-[1.35rem]" />
            </Link>

            {/* Derecha: acciones */}
            <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
              <div className="hidden sm:block">
                <LanguageToggle />
              </div>
              <button
                onClick={() => setSearchOpen(true)}
                aria-label={t.nav.search}
                data-cursor={t.nav.search}
                className="grid h-10 w-10 place-items-center rounded-full text-cacao transition-colors hover:bg-arena/60"
              >
                <Search size={19} />
              </button>
              <button
                onClick={open}
                aria-label={`${t.nav.cart} (${count})`}
                data-cursor={t.nav.cart}
                className="relative grid h-10 w-10 place-items-center rounded-full text-cacao transition-colors hover:bg-arena/60"
              >
                <ShoppingBag size={19} />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key={`count-${bump}`}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-terracota px-1 text-[0.6rem] font-bold text-algodon"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
        </nav>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={[...links]}
        catLinks={catLinks}
      />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
