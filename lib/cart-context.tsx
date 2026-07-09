"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProduct } from "./products";

export type CartItem = {
  slug: string;
  colorId: string;
  size: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (slug: string, colorId: string, size: string) => void;
  setQty: (slug: string, colorId: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** Se incrementa en cada "añadir", para animar el badge del nav. */
  bump: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "kunuu-cart";

function sameLine(a: CartItem, slug: string, colorId: string, size: string) {
  return a.slug === slug && a.colorId === colorId && a.size === size;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) =>
        sameLine(p, item.slug, item.colorId, item.size)
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + item.qty };
        return next;
      }
      return [...prev, item];
    });
    setBump((b) => b + 1);
    setIsOpen(true);
  }, []);

  const remove = useCallback(
    (slug: string, colorId: string, size: string) => {
      setItems((prev) =>
        prev.filter((p) => !sameLine(p, slug, colorId, size))
      );
    },
    []
  );

  const setQty = useCallback(
    (slug: string, colorId: string, size: string, qty: number) => {
      setItems((prev) =>
        prev
          .map((p) =>
            sameLine(p, slug, colorId, size) ? { ...p, qty } : p
          )
          .filter((p) => p.qty > 0)
      );
    },
    []
  );

  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const count = useMemo(
    () => items.reduce((n, i) => n + i.qty, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce((sum, i) => {
        const p = getProduct(i.slug);
        return sum + (p ? p.price * i.qty : 0);
      }, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      add,
      remove,
      setQty,
      clear,
      count,
      subtotal,
      isOpen,
      open,
      close,
      bump,
    }),
    [items, add, remove, setQty, clear, count, subtotal, isOpen, open, close, bump]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
