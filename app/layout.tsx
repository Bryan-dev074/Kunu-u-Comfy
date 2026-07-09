import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fraunces, mulish } from "./fonts";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://kunuu-comfy.vercel.app"),
  title: {
    default: "Kunu'u Comfy · El arte de descansar",
    template: "%s · Kunu'u Comfy",
  },
  description:
    "Ropa de dormir de lujo cálido para toda la familia. Algodones nobles, tejidos que abrazan, hechos para el ritual de descansar.",
  keywords: [
    "ropa de dormir",
    "pijamas premium",
    "loungewear",
    "pijamas familia",
    "roupa de dormir",
    "pijamas de luxo",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Kunu'u Comfy · El arte de descansar",
    description:
      "Ropa de dormir de lujo cálido para toda la familia. Curada, no infinita.",
    type: "website",
    locale: "es_AR",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4ede1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${mulish.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
