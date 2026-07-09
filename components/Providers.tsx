"use client";

import { LanguageProvider } from "@/lib/i18n/context";
import { CartProvider } from "@/lib/cart-context";
import SmoothScroll from "./chrome/SmoothScroll";
import DawnBackground from "./chrome/DawnBackground";
import Grain from "./chrome/Grain";
import Cursor from "./chrome/Cursor";
import SwitchVeil from "./chrome/SwitchVeil";
import AnnouncementBar from "./chrome/AnnouncementBar";
import Navbar from "./chrome/Navbar";
import Footer from "./chrome/Footer";
import CartDrawer from "./chrome/CartDrawer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>
        <DawnBackground />
        <SmoothScroll />
        <Cursor />
        <Grain />
        <SwitchVeil />

        <div className="fixed inset-x-0 top-0 z-50">
          <AnnouncementBar />
          <Navbar />
        </div>

        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        <CartDrawer />
      </CartProvider>
    </LanguageProvider>
  );
}
