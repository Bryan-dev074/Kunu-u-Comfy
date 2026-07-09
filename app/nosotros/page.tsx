import type { Metadata } from "next";
import AboutView from "@/components/pages/AboutView";

export const metadata: Metadata = {
  title: "Nuestra historia",
  description:
    "Kunu'u nació buscando el pijama perfecto. Hoy hacemos poca ropa, muy bien hecha, para el ritual de descansar.",
};

export default function AboutPage() {
  return <AboutView />;
}
