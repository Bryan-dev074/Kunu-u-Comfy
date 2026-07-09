"use client";

import { LanguageProvider } from "@/lib/i18n/context";
import { CurrencyProvider } from "@/lib/currency";
import { CartProvider } from "@/lib/cart-context";
import SmoothScroll from "./chrome/SmoothScroll";
import DawnBackground from "./chrome/DawnBackground";
import Grain from "./chrome/Grain";
import Cursor from "./chrome/Cursor";
import SwitchVeil from "./chrome/SwitchVeil";
import TopStrip from "./chrome/TopStrip";
import Navbar from "./chrome/Navbar";
import Footer from "./chrome/Footer";
import CartDrawer from "./chrome/CartDrawer";
import FloatingWhatsApp from "./chrome/FloatingWhatsApp";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <CartProvider>
          <DawnBackground />
          <SmoothScroll />
          <Cursor />
          <Grain />
          <SwitchVeil />

          <div className="fixed inset-x-0 top-0 z-50">
            <TopStrip />
            <Navbar />
          </div>

          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>

          <CartDrawer />
          <FloatingWhatsApp />
        </CartProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}
